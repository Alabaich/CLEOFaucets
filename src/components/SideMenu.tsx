"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

const SideMenu = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/admin/login"; // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 h-full bg-gray-800 text-gray-200 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4 flex flex-col">
          <Link
            href="/admin/upload-products"
            className="px-4 py-2 hover:bg-gray-700"
          >
            Upload Products
          </Link>
          <Link
            href="/admin/change-slider"
            className="px-4 py-2 hover:bg-gray-700"
          >
            Change Promotion Slider
          </Link>
          <Link href="/admin/blog" className="px-4 py-2 hover:bg-gray-700">
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
