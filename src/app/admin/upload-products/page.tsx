"use client";

import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const UploadProductsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Upload Products</h1>
      {/* Page content */}
    </div>
  );
};

export default UploadProductsPage;
