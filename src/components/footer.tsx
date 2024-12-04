"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-6 w-full bg-gray-900 text-gray-300 py-8">
      {/* Logo Section */}
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cleo Plumbing Logo"
            width={120}
            height={60}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/collections"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Collections
        </Link>
        <Link
          href="/about"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Contact
        </Link>
      </nav>

      {/* Copyright Section */}
      <div className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Cleo Plumbing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
