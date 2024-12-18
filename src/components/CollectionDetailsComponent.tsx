"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface CollectionDetails {
  name: string;
  description?: string | null;
  image?: string | null;
}

export default function CollectionDetailsComponent({
  collection,
  subcollections,
  collectionSlug,
}: {
  collection: CollectionDetails;
  subcollections: SubCollection[];
  collectionSlug: string;
}) {
  const router = useRouter();
  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2FPlaceholder.webp?alt=media&token=28081801-2e80-4a97-a8af-c5f84a622d0b";

  return (
    <div className="text-center my-10 w-full mx-auto">
      {/* Full-width image */}
      <div className="w-full h-80 bg-gray-200">
        <img
          src={collection.image || placeholderImage}
          alt={collection.name || "Placeholder"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Collection name */}
      <h1 className="text-4xl font-semibold text-white mt-6">{collection.name}</h1>

      {/* Collection description */}
      {collection.description && (
        <p className="text-lg text-gray-300 mt-4 px-4 md:px-20">{collection.description}</p>
      )}

      {/* Subcollections */}
      {subcollections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {subcollections.map((subcollection) => (
            <div
              key={subcollection.id}
              className="relative rounded overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => router.push(`/collections/${collectionSlug}/${subcollection.slug}`)}
            >
              <img
                src={subcollection.image || placeholderImage}
                alt={subcollection.name}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-4 px-2">
                <h3 className="text-lg font-semibold text-white">{subcollection.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <h1 className="text-3xl font-semibold text-white mt-2">No Subcollections Found</h1>
          <button
            className="mt-4 bg-white text-black py-2 px-4 rounded"
            onClick={() => router.push(`/collections/${collectionSlug}/all-products`)}
          >
            Go To All Products
          </button>
        </div>
      )}
    </div>
  );
}
