// src/app/admin/page.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Upload Products by default
    router.push('/admin/upload-products');
  }, [router]);

  return null; // Or a loading indicator if preferred
};

export default AdminDashboardPage;
