"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  tags: string[];
  images: string[];
  slug: string;
  variants?: {
    sku: string;
    images: string[];
    options: { name: string; value: string }[];
  }[];
}

const colorImageMap: { [key: string]: string } = {
  black: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fblack.webp?alt=media&token=c12c00b1-64e9-4f60-819e-b9d61c761a3e",
  bronze: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fbronze.webp?alt=media&token=fa0c0dd3-56e0-48c2-b89a-e95984d44447",
  chrome: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fchrome.webp?alt=media&token=2cd79155-97f6-437c-a6b2-ecda2a11455d",
  gold: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fgold.webp?alt=media&token=37304564-1f39-41c4-a545-28280e414d4a",
  nickel: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fnickel.webp?alt=media&token=0be22ed2-3e6d-4c98-afaa-8927e7848615",
  white: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/Colors%2Fwhite.webp?alt=media&token=c3344fba-dc45-4b74-ae76-78928aaaae2c",
};

export default function SubCollectionPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug, subcollectionSlug } = params || {};

  const [subcollection, setSubcollection] = useState<SubCollection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!collectionSlug || !subcollectionSlug) {
      console.error("Missing collectionSlug or subcollectionSlug in the URL params!");
      return;
    }

    const fetchSubcollectionAndProducts = async () => {
      try {
        const resSubcollection = await fetch(
          `/api/get-subcollection?collectionSlug=${collectionSlug}&subcollectionSlug=${subcollectionSlug}`
        );
        const subcollectionData = await resSubcollection.json();
        setSubcollection(subcollectionData.subcollection);

        const resProducts = await fetch(
          `/api/get-products-by-tag?tag=${subcollectionSlug}`
        );
        const productsData = await resProducts.json();
        setProducts(productsData.products);
      } catch (error) {
        console.error("Error fetching subcollection and products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcollectionAndProducts();
  }, [collectionSlug, subcollectionSlug]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (!subcollection)
    return (
      <p className="text-center text-white">
        Subcollection not found for collection &quot;{collectionSlug}&quot; and
        subcollection &quot;{subcollectionSlug}&quot;.
      </p>
    );

  return (
    <div className="text-center my-10 w-full mx-auto px-4">
      <button
        className="mb-4 bg-transparent hover:bg-transparent text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
      <h1 className="text-3xl font-semibold text-white mt-2">{subcollection.name}</h1>

      <h2 className="text-2xl font-semibold text-white mt-8">Related Products</h2>
      {products.length === 0 ? (
        <p className="text-white mt-4">No products found for this subcollection.</p>
      ) : (
        <div className="fullWidth grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${collectionSlug}/${subcollectionSlug}/${product.slug}`}
              className="group  "
            >
              <div className="rounded  overflow-hidden shadow-md p-0 bg-transparent text-white border border-gray-700">
                <div className="w-full aspect-square overflow-hidden mb-4">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  )}
                </div>
                <div className="p-2    ">
                  <h3 className="text-lg font-semibold mb-2 text-left   hover:   ">{product.title}</h3>

                  {/* Variants as square images for color options only */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.variants
                        .filter((variant) =>
                          variant.options.some((option) => option.name.toLowerCase() === "color")
                        )
                        .slice(0, 4)
                        .map((variant, index) => {
                          const colorOption = variant.options.find(
                            (option) => option.name.toLowerCase() === "color"
                          );
                          const colorValue = colorOption?.value.toLowerCase();

                          // Determine color image by matching substring
                          let colorImage = null;
                          if (colorValue) {
                            if (colorValue.includes("black")) {
                              colorImage = colorImageMap["black"];
                            } else if (colorValue.includes("bronze")) {
                              colorImage = colorImageMap["bronze"];
                            } else if (colorValue.includes("chrome")) {
                              colorImage = colorImageMap["chrome"];
                            } else if (colorValue.includes("gold")) {
                              colorImage = colorImageMap["gold"];
                            } else if (colorValue.includes("nickel")) {
                              colorImage = colorImageMap["nickel"];
                            } else if (colorValue.includes("white")) {
                              colorImage = colorImageMap["white"];
                            }
                          }

                          return (
                            <div
                              key={index}
                              className="relative w-12 h-6 border border-gray-500 rounded-md overflow-hidden"
                            >
                              {colorImage ? (
                                <img
                                  src={colorImage}
                                  alt={colorOption?.value}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                variant.images[0] && (
                                  <img
                                    src={variant.images[0]}
                                    alt={colorOption?.value || `Variant ${index}`}
                                    className="w-full h-full object-cover"
                                  />
                                )
                              )}
                              {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-[8px] text-white p-1 text-center">
                                {colorOption?.value || "Unknown Color"}
                              </div> */}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
