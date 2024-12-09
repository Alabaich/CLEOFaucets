"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
}

export default function CollectionPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug } = params || {};
  console.log("Resolved collectionSlug from URL:", collectionSlug);

  const [subcollections, setSubcollections] = useState<SubCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!collectionSlug) {
      console.error("Missing collectionSlug in the URL params!");
      return;
    }

    const fetchSubcollectionsData = async () => {
      try {
        console.log(`Fetching subcollections for collection: ${collectionSlug}`);

        const res = await fetch(
          `/api/get-subcollections-by-collection-slug?collectionSlug=${collectionSlug}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch subcollections");
        }
        const data = await res.json();
        console.log("Subcollections fetched:", data.subcollections);
        setSubcollections(data.subcollections);
      } catch (error) {
        console.error("Error fetching subcollections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcollectionsData();
  }, [collectionSlug]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (subcollections.length === 0) {
    return (
      <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
        <h1 className="text-3xl font-semibold text-white mt-2">
          No Subcollections Found
        </h1>
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => router.push(`/collections/${collectionSlug}/all-products`)}
        >
          Go To All Products
        </button>
      </div>
    );
  }

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <h1 className="text-3xl font-semibold text-white mt-2">
        Subcollections for {collectionSlug}
      </h1>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        onClick={() => router.push(`/collections/${collectionSlug}/all-products`)}
      >
        Go To All Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {subcollections.map((subcollection) => (
          <div key={subcollection.id} className="group">
            <div className="rounded-md overflow-hidden shadow-md group p-4 bg-white text-black">
              <h3 className="text-lg font-semibold">{subcollection.name}</h3>
              <p className="mt-2 text-sm">Slug: {subcollection.slug}</p>
              <button
                onClick={() =>
                  router.push(`/collections/${collectionSlug}/${subcollection.slug}`)
                }
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                View Subcollection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
