"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string | null; // Allow null in case the image is missing
}

const HorizontalScroller = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollerRef.current?.scrollBy({
      left: -480,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({
      left: 480,
      behavior: "smooth",
    });
  };

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
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading collections...</p>;
  }

  if (collections.length === 0) {
    return <p className="text-center text-white">No collections found.</p>;
  }

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Cleo Faucets Collections</h1>
      </div>

      <div className="group relative w-full">
        {/* Hide buttons on small screens */}
        <button
          onClick={scrollLeft}
          className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-4 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-auto"
          aria-label="Scroll Left"
        >
          <img
            src="/svgs/arrowSlider.svg"
            alt="Scroll Left"
            className="w-6 h-6 rotate-180"
          />
        </button>

        <div
          ref={scrollerRef}
          className="pl-[50px] md:pl-[150px] pr-[50px] md:pr-[150px] rf-cards-scroller w-full overflow-x-auto flex space-x-8 snap-x snap-mandatory touch-pan-x"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="rf-cards-scroller-item flex-shrink-0 w-[250px] md:w-[480px] h-[150px] md:h-[350px] flex items-center justify-center snap-center"
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="h-full w-full rf-ccard block rounded-lg overflow-hidden text-decoration-none transform transition-all duration-300 ease-in-out hover:scale-105"
                style={{ textDecoration: "none" }}
              >
                <div className="relative h-full">
                  <img
                    src={collection.image || "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2FPlaceholder.webp?alt=media&token=28081801-2e80-4a97-a8af-c5f84a622d0b"} // Use placeholder if no image
                    alt={collection.name}
                    className="w-full h-[100%] md:h-72 object-cover"
                  />
                  <div className="absolute top-4 left-4 text-black z-10 bg-white bg-opacity-75 p-2 rounded-md">
                    <h3 className="text-lg font-bold">{collection.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-4 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-auto"
          aria-label="Scroll Right"
        >
          <img
            src="/svgs/arrowSlider.svg"
            alt="Scroll Right"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroller;
