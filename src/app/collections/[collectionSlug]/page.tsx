"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string | null; // Add optional image property
}

interface CollectionDetails {
  name: string; // The collection's title
  description?: string | null;
  image?: string | null;
}

export default function CollectionPage() {
  const params = useParams() || {}; // Ensure params is never null
  const router = useRouter();

  // Safely extract collectionSlug
  const collectionSlug =
    typeof params.collectionSlug === "string" ? params.collectionSlug : params.collectionSlug?.[0];

  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails | null>(null);
  const [subcollections, setSubcollections] = useState<SubCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!collectionSlug) {
      console.error("Missing collectionSlug in the URL params!");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch collection details
        const collectionDetailsRes = await fetch(`/api/get-collection-details?slug=${collectionSlug}`);
        if (!collectionDetailsRes.ok) {
          throw new Error("Failed to fetch collection details");
        }
        const collectionDetailsData = await collectionDetailsRes.json();
        setCollectionDetails(collectionDetailsData.collection);

        // Fetch subcollections
        const subcollectionsRes = await fetch(
          `/api/get-subcollections-by-collection-slug?collectionSlug=${collectionSlug}`
        );
        if (!subcollectionsRes.ok) {
          throw new Error("Failed to fetch subcollections");
        }
        const subcollectionsData = await subcollectionsRes.json();
        setSubcollections(subcollectionsData.subcollections);
      } catch (error) {
        console.error("Error fetching collection or subcollections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionSlug]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!collectionDetails) {
    return (
      <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
        <h1 className="text-3xl font-semibold text-white mt-2">Collection Not Found</h1>
        <button
          className="mt-4 bg-white text-black py-2 px-4 rounded"
          onClick={() => router.push(`/collections`)}
        >
          Go Back to Collections
        </button>
      </div>
    );
  }

  if (subcollections.length === 0) {
    return (
      <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
        <h1 className="text-3xl font-semibold text-white mt-2">
          No Subcollections Found
        </h1>
        <button
          className="mt-4 bg-white text-black py-2 px-4 rounded"
          onClick={() => router.push(`/collections/${collectionSlug}/all-products`)}
        >
          Go To All Products
        </button>
      </div>
    );
  }

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      {/* Full-width image */}
      <div className="w-full h-80 bg-gray-200">
        <img
          src={collectionDetails.image || "/placeholder.webp"} // Placeholder if image is missing
          alt={collectionDetails.name || "Placeholder"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Collection name */}
      <h1 className="text-4xl font-semibold text-white mt-6">
        {collectionDetails.name}
      </h1>

      {/* Collection description */}
      {collectionDetails.description && (
        <p className="text-lg text-gray-300 mt-4 px-4 md:px-20">
          {collectionDetails.description}
        </p>
      )}

      {/* Subcollections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {subcollections.map((subcollection) => (
          <div
            key={subcollection.id}
            className="relative rounded overflow-hidden shadow-lg group cursor-pointer"
            onClick={() =>
              router.push(`/collections/${collectionSlug}/${subcollection.slug}`)
            }
          >
            <img
              src={subcollection.image || "/placeholder.webp"} // Placeholder if image is missing
              alt={subcollection.name}
              className="w-full h-full object-cover aspect-square"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-4 px-2">
              <h3 className="text-lg font-semibold text-white">
                {subcollection.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}