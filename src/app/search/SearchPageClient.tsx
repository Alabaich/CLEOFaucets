// app/search/SearchPageClient.tsx (Client Component)
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  sku: string;
  [key: string]: any;
  slug: string;
}

const placeholderImage = "https://via.placeholder.com/150"; // placeholder

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/searchProducts?query=${query}`);
        if (!res.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4 mt-20 min-h-[80vh] fullWidth">
      <h1 className="text-2xl font-semibold">Search Results</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>No products found for &quot;{query}&quot;.</p>
      )}
      <ul className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="rounded overflow-hidden shadow-md p-0 bg-transparent text-white border border-gray-700">
              <div className="w-full aspect-square overflow-hidden mb-4">
                <img
                  src={product.images?.[0] || placeholderImage}
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
      </ul>
    </div>
  );
}
