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
        <div className="h-[150px] md:h-[350px] relative rounded overflow-hidden shadow-md group bg-black">
          {/* Full background image */}
          <img
            src={collection.image || "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2FPlaceholder.webp?alt=media&token=28081801-2e80-4a97-a8af-c5f84a622d0b"} // Use placeholder if image is not available
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Gradient and collection name */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="uppercase text-lg font-semibold text-white">{collection.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>


    </div>
  );
}
