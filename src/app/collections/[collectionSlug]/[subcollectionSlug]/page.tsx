"use client"

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
  slug: string; // Add slug to the product type
}

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
        Subcollection not found for collection "{collectionSlug}" and subcollection "{subcollectionSlug}".
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
      <h1 className="text-3xl font-semibold text-white mt-2">{subcollection.name}</h1>

      <h2 className="text-2xl font-semibold text-white mt-8">Related Products</h2>
      {products.length === 0 ? (
        <p className="text-white mt-4">No products found for this subcollection.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${collectionSlug}/${subcollectionSlug}/products/${product.slug}`}
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
                <p className="mt-2 text-sm">Tags: {product.tags.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
