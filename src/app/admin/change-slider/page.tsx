"use client";

import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const ChangePromotionSliderPage = () => {
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
    return null; // Return nothing if not logged in
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Change Promotion Slider</h2>
      <p className="mt-4 text-gray-600">This section is under construction.</p>
    </div>
  );
};

export default ChangePromotionSliderPage;
