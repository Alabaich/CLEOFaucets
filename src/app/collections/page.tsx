"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  slug: string;
  image?: string | null; // Optional image field to handle missing images
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/get-collections");
        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await res.json();
        setCollections(data.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);

  if (loadingCollections) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (collections.length === 0) {
    return <p className="text-center text-white">No collections found.</p>;
  }

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <p className="text-sm font-bold uppercase text-white">Our Collections</p>
      <h1 className="text-3xl font-semibold text-white mt-2">Explore Our Collections</h1>
      <p className="text-lg text-gray-300 mt-1">Browse through our curated collections for products that inspire modern living.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {collections.map((collection) => (
          <div key={collection.id} className="group">
            <Link href={`/collections/${collection.slug}`} className="hover:no-underline block">
              <div className="rounded-md overflow-hidden shadow-md group p-4 bg-white text-black">
                <div className="relative">
                  <img
                    src={collection.image || "/placeholder.webp"} // Use placeholder if image is not available
                    alt={collection.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-4">{collection.name}</h3>
                <p className="mt-2 text-sm">Explore products in this collection.</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
