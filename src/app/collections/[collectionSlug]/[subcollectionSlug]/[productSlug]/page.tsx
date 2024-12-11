"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import he from "he";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  variants: {
    sku: string;
    images: string[];
    options: { name: string; value: string }[];
  }[];
}

const groupOptionsByName = (variants: Product["variants"]) => {
  const groupedOptions: Record<string, { value: string; image?: string }[]> = {};

  variants.forEach((variant) => {
    variant.options.forEach((option) => {
      if (!groupedOptions[option.name]) {
        groupedOptions[option.name] = [];
      }
      const existingOption = groupedOptions[option.name].find(
        (opt) => opt.value === option.value
      );
      if (!existingOption) {
        groupedOptions[option.name].push({
          value: option.value,
          image: variant.images[0], // Use the first image for color options
        });
      }
    });
  });

  return groupedOptions;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug, subcollectionSlug, productSlug } = params || {};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const mainSwiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/get-product-by-slug?slug=${productSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await res.json();
        setProduct(productData.product);
        if (productData.product.variants.length > 0) {
          setSelectedVariant(productData.product.variants[0].sku); // Set default variant

          // Initialize selected options with default values
          const defaultOptions = productData.product.variants[0].options.reduce(
            (acc: Record<string, string>, option: { name: string; value: string }) => {
              acc[option.name] = option.value;
              return acc;
            },
            {}
          );
          setSelectedOptions(defaultOptions);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  useEffect(() => {
    if (product && Object.keys(selectedOptions).length > 0) {
      const matchingVariant = product.variants.find((variant) =>
        variant.options.every(
          (option) => selectedOptions[option.name] === option.value
        )
      );

      if (matchingVariant) {
        setSelectedVariant(matchingVariant.sku);

        // Update the active slide to the first image of the selected variant
        if (mainSwiperRef.current) {
          const variantIndex = product.variants.indexOf(matchingVariant);
          const offset = product.images.length; // Offset after product images
          mainSwiperRef.current.slideTo(offset + variantIndex);
        }
      }
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: optionValue,
    }));
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (!product)
    return (
      <p className="text-center text-white">
        Product not found for slug &quot;{productSlug}&quot;.
      </p>
    );

  const allImages = [
    ...product.images, // Product images
    ...product.variants.flatMap((variant) => variant.images), // All variant images
  ];

  const groupedOptions = groupOptionsByName(product.variants);

  return (
    <div className="fullWidth">
      <div className="flex justify-between flex-col md:flex-row w-full items-start md:items-center py-2">
        <button
          className="mb-4 bg-transparent hover:bg-transparent text-white py-0 px-0 rounded"
          onClick={() => router.back()}
        >
          Back
        </button>
        <Breadcrumbs />
      </div>
      <div className="w-full flex flex-col md:flex-row md:gap-10 items-start md:items-start text-white">
        {/* Images Slider */}
        <div className="w-full md:max-w-[40%]">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg overflow-hidden mb-4"
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          >
            {allImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${product.title} - ${index}`}
                  className="w-full object-contain h-auto rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={10}
            slidesPerView={5}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            className="rounded-lg overflow-hidden"
          >
            {allImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-full object-cover h-20 rounded-md cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Information Section */}
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          {selectedVariant && (
            <p className="text-md font-regular mb-2">
              SKU: {selectedVariant}
            </p>
          )}

          {/* Grouped Options */}
          <div className="mt-8">
            {Object.entries(groupedOptions).map(([optionName, values]) => (
              <div key={optionName} className="mb-4">
                <h4 className="text-md font-regular text-gray-300 mb-2">{optionName}:</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  {values.map((option) => (
                    <div
                      key={option.value}
                      className={`${
                        optionName.toLowerCase() === "color"
                          ? "w-12 h-12 rounded-full border-2"
                          : "text-sm px-4 py-2 rounded-md border-2"
                      } cursor-pointer ${
                        selectedOptions[optionName] === option.value
                          ? "border-white"
                          : "border-gray-600"
                      }`}
                      onClick={() => handleOptionChange(optionName, option.value)}
                    >
                      {optionName.toLowerCase() === "color" && option.image ? (
                        <img
                          src={option.image}
                          alt={option.value}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>{option.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: he.decode(product.description) }}
        className="text-lg mt-4"
      />
    </div>
  );
}