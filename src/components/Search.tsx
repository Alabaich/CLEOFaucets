"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  sku: string;
  slug: string;
}

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery.trim()}`);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        setIsDropdownOpen(false);
        return;
      }

      try {
        const res = await fetch(`/api/searchProducts?query=${searchQuery.trim()}`);
        if (!res.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await res.json();
        setResults(data.slice(0, 4)); // Limit to first 4 results
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleResultClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="border border-gray-200 rounded-full flex justify-between items-center gap-4 p-2 py-[4px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search by title or SKU"
          className="search-input bg-transparent p-[0] text-[0.875rem]"
        />
        <button type="submit" className="p-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11.25 11.25L15.75 15.75M7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute bg-white border border-gray-300 mt-2 w-full">
          {results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id} className="p-2 hover:bg-gray-100" onClick={() => handleResultClick(product.slug)}>
                  {product.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;