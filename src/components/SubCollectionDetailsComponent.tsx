"use client";

import React from "react";
import Link from "next/link";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface Product {
  id: string;
  title: string;
  images: string[];
  slug: string;
}

export default function SubCollectionDetailsComponent({
  subcollection,
  products,
  collectionSlug,
}: {
  subcollection: SubCollection;
  products: Product[];
  collectionSlug: string;
}) {
  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2FPlaceholder.webp?alt=media&token=28081801-2e80-4a97-a8af-c5f84a622d0b";

  return (
    <div className="text-center my-10 w-full mx-auto px-4">
      {/* Back Button */}
      <a href={`/collections/${collectionSlug}`} className="mb-4 inline-block text-white">
        &larr; Back to Collection
      </a>

      {/* Subcollection Details */}
      <div className="w-full h-80 bg-gray-200 mb-6">
        <img
          src={subcollection.image || placeholderImage}
          alt={subcollection.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-semibold text-white mb-8">{subcollection.name}</h1>

      {/* Products */}
      <h2 className="text-2xl font-semibold text-white">Related Products</h2>
      {products.length === 0 ? (
        <p className="text-white mt-4">No products found for this subcollection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${collectionSlug}/${subcollection.slug}/${product.slug}`}
              className="group"
            >
              <div className="rounded overflow-hidden shadow-md p-0 bg-transparent text-white border border-gray-700">
                <div className="w-full aspect-square overflow-hidden mb-4">
                  <img
                    src={product.images[0] || placeholderImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
