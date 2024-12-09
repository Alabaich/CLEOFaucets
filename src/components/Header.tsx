"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const collections = [
    { name: "Toilets", path: "/collections/toilets" },
    { name: "Faucets", path: "/collections/faucets" },
    { name: "Tub Fillers", path: "/collections/tub-fillers" },
  ];

  return (
    <header className="w-full bg-gray-900 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full p-4 sm:hidden">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cleo Plumbing Logo"
            width={120}
            height={60}
          />
        </Link>
        
        <button
          className="text-white bg-gray-900 border border-white hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <nav className={`${isMenuOpen ? "block" : "hidden"} ml-4 mr-4 mb-4 mt-2 sm:hidden flex flex-col gap-4`}>
        <Link
          href="/"
          className={`text-gray-300 hover:text-white ${
            pathname === "/" ? "text-white font-semibold" : ""
          }`}
        >
          Home
        </Link>

        <div className="relative">
          <Link
            href="/collections"
            className={`text-gray-300 hover:text-white flex items-center ${
              pathname?.startsWith("/collections")
                ? "text-white font-semibold"
                : ""
            }`}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            Collections
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
          <div className={`${isMenuOpen ? "block" : "hidden"} mt-2 w-full bg-gray-800 rounded-md shadow-lg`}>
            <ul className="py-1 w-full">
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
        <Link
          href="/blog"
          className={`text-gray-300 hover:text-white ${
            pathname === "/blog" ? "text-white font-semibold" : ""
          }`}
        >
          Blog
        </Link>
      </nav>

      <div className="hidden sm:flex items-center justify-between fullWidth p-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
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
          <Link
            href="/blog"
            className={`text-gray-300 hover:text-white ${
              pathname === "/blog" ? "text-white font-semibold" : ""
            }`}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
