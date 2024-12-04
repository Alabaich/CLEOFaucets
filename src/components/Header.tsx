"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Header = () => {
  const pathname = usePathname();

  // Ref to detect clicks outside the dropdown (optional for click-based dropdowns)
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown links under "Collections"
  const collections = [
    { name: "Toilets", path: "/collections/toilets" },
    { name: "Faucets", path: "/collections/faucets" },
    { name: "Tub Fillers", path: "/collections/tub-fillers" },
    // Add more collections as needed
  ];

  // Close dropdown when clicking outside or pressing Escape (optional if implementing click-based dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Add logic if needed for dropdown state management
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Add logic if needed for dropdown state management
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="flex flex-col justify-center gap-4 w-full bg-gray-900 fixed top-0 left-0 z-50 fullWidth">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Cleo Plumbing Logo"
              width={120}
              height={60}
            />
          </Link>
        </div>
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 sm:mt-0">
          <Link
            href="/"
            className={`text-gray-300 hover:text-white ${
              pathname === "/" ? "text-white font-semibold" : ""
            }`}
          >
            Home
          </Link>

          {/* Collections Dropdown */}
          <div className="relative group" ref={dropdownRef}>
            {/* Dropdown Toggle Link */}
            <Link
              href="/collections"
              className={`text-gray-300 hover:text-white flex items-center ${
                pathname?.startsWith("/collections")
                  ? "text-white font-semibold"
                  : ""
              }`}
              aria-haspopup="true"
              aria-expanded={false} // Manage state as needed
            >
              Collections
              {/* Chevron Icon */}
              <svg
                className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-0 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <ul className="py-1">
                {collections.map((collection) => (
                  <li key={collection.name}>
                    <Link
                      href={collection.path}
                      className={`block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white ${
                        pathname === collection.path
                          ? "bg-gray-700 text-white"
                          : ""
                      }`}
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/about"
            className={`text-gray-300 hover:text-white ${
              pathname === "/about" ? "text-white font-semibold" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-gray-300 hover:text-white ${
              pathname === "/contact" ? "text-white font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
