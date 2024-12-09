"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug, subcollectionSlug, productSlug } = params || {};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/get-product-by-slug?slug=${productSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await res.json();
        setProduct(productData.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (!product)
    return (
      <p className="text-center text-white">
        Product not found for slug "{productSlug}".
      </p>
    );

  return (
    <div className="text-center my-10 w-full mx-auto">
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
      <h1 className="text-3xl font-semibold text-white mt-2">{product.title}</h1>
      <p className="text-gray-300 mt-4">{product.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} - ${index}`}
            className="w-full h-60 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
