"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UploadSingleProduct from "@/components/UploadSingleProduct";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: string;
  title: string;
  images: string[];
  slug: string;
  description: string;
  collection: string;
  tags: string[];
  variants: any[];
}

const EditProductPage = () => {
    const params = useParams() as { productSlug: string };
    const { productSlug } = params;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Only fetch if productSlug exists
    if (!productSlug) return;

    const fetchProduct = async () => {
      // Using a relative URL since the API is on the same origin
      const url = `/api/get-product-by-slug?slug=${productSlug}`;
      console.log("Fetching product from:", url);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading || loadingProduct) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-6">
      <UploadSingleProduct productToEdit={product} />
    </div>
  );
};

export default EditProductPage;
