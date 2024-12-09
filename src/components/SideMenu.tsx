"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for active link detection
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SideMenu = () => {
  const { user, loading } = useAuth();
  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/admin/login"; // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path: string) => pathname === path; // Check if the path matches the current URL

  return (
    <aside className="w-64 h-full bg-gray-800 text-gray-200 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4 flex flex-col">
          {/* Products Dropdown */}
          <div>
            <button
              onClick={() => setProductsMenuOpen(!isProductsMenuOpen)}
              className="w-full px-4 py-2 flex justify-between items-center hover:bg-gray-700"
            >
              <span>Products</span>
              {isProductsMenuOpen ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>
            {isProductsMenuOpen && (
              <div className="ml-4 flex flex-col border-l border-gray-600">
                <Link
                  href="/admin/products"
                  className={`px-4 py-2 hover:bg-gray-700 ${
                    isActive("/admin/products") ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  All Products
                </Link>
                <Link
                  href="/admin/collections"
                  className={`px-4 py-2 hover:bg-gray-700 ${
                    isActive("/admin/collections") ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  Collections
                </Link>
                <Link
                  href="/admin/subcollections"
                  className={`px-4 py-2 hover:bg-gray-700 ${
                    isActive("/admin/subcollections") ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  Subcollections
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/admin/change-slider"
            className={`px-4 py-2 hover:bg-gray-700 ${
              isActive("/admin/change-slider") ? "bg-gray-700 text-white" : ""
            }`}
          >
            Change Promotion Slider
          </Link>
          <Link
            href="/admin/blog"
            className={`px-4 py-2 hover:bg-gray-700 ${
              isActive("/admin/blog") ? "bg-gray-700 text-white" : ""
            }`}
          >
            Blog
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="flex flex-col items-start">
            <p className="mb-2">Logged in as:</p>
            <p className="font-bold">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </aside>
  );
};

export default SideMenu;
