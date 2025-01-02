"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Search from "@/components/Search";

interface Collection {
  id: string;
  slug: string;
  name: string;
}


const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/get-collections");
        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await res.json();
        setCollections(data.collections || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <header className="w-full bg-gray-900 fixed top-0 left-0 z-50">
      {/* Mobile Menu Button */}
      <div className="flex items-center justify-between w-full p-4 sm:hidden">
        <Link href="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2Flogo.webp?alt=media&token=8109231c-272d-4e0b-9cb6-b0aa2707eba2"
            alt="Cleo Plumbing Logo"
            width={120}
            height={60}
          />
        </Link>
        <button
          className="text-white bg-gray-900 border border-white hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          name="Toggle Menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search & Nav */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-900 w-full p-4">
          {/* Pass the pathname to Search to close dropdown on route change */}
          <Search pathname={pathname ?? ""} />
        </div>
      )}

      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-900 w-full`}>
        <nav className="flex flex-col gap-2 p-4 justify-center items-center">
          <Link
            href="/"
            className={`text-gray-300 hover:text-white ${
              pathname === "/" ? "text-white font-semibold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/collections"
            className={`text-gray-300 hover:text-white ${
              pathname?.startsWith("/collections")
                ? "text-white font-semibold"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className={`text-gray-300 hover:text-white ${
              pathname === "/about" ? "text-white font-semibold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-gray-300 hover:text-white ${
              pathname === "/contact" ? "text-white font-semibold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className={`text-gray-300 hover:text-white ${
              pathname === "/blog" ? "text-white font-semibold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
        </nav>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden sm:flex items-center justify-between fullWidth p-4 gap-4">
        <Link href="/" className="min-w-[120px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2Flogo.webp?alt=media&token=8109231c-272d-4e0b-9cb6-b0aa2707eba2"
            alt="Cleo Plumbing Logo"
            width={120}
            height={60}
          />
        </Link>
        <nav className="flex flex-row gap-2 sm:gap-6">
          <Link
            href="/"
            className={`text-gray-300 hover:text-white ${
              pathname === "/" ? "text-white font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <div className="relative group">
            <Link
              href="/collections"
              className={`text-gray-300 hover:text-white flex items-center ${
                pathname?.startsWith("/collections")
                  ? "text-white font-semibold"
                  : ""
              }`}
              aria-haspopup="true"
              aria-expanded={false}
            >
              Collections
              <svg
                className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <ul>
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className={`block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white ${
                        pathname === `/collections/${collection.slug}`
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
          <Link
            href="/blog"
            className={`text-gray-300 hover:text-white ${
              pathname === "/blog" ? "text-white font-semibold" : ""
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* Pass the pathname to Search so it can hide dropdown on route change */}
        <Search pathname={pathname ?? ""}  />
      </div>
    </header>
  );
};

export default Header;
