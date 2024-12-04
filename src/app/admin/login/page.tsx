"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/upload-products");
    }
  }, [user, router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
