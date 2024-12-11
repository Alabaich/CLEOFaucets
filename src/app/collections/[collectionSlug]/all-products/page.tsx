"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  collection: string;
  images: string[];
  slug: string; // Add slug to the product type
}

export default function AllProductsPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug } = params || {};
  console.log("Resolved collectionSlug:", collectionSlug);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!collectionSlug) {
      console.error("Missing collectionSlug in the URL params!");
      return;
    }

    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for collection: ${collectionSlug}`);

        const res = await fetch(`/api/get-products-by-collection?collection=${collectionSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await res.json();
        console.log("Products data fetched:", productsData);
        setProducts(productsData.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionSlug]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-white">No products found for this collection.</p>;
  }

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
      <h1 className="text-3xl font-semibold text-white mt-2">
        All Products for Collection: {collectionSlug}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/collections/${collectionSlug}/products/${product.slug}`}
            className="group"
          >
            <div className="rounded-md overflow-hidden shadow-md p-4 bg-white text-black">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              {product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover mt-2"
                />
              )}
              <p className="mt-2 text-sm">Collection: {product.collection}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
