"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadProducts from "../../../components/UploadProducts";

interface Product {
  id: string;
  title: string;
  description: string;
  collection: string;
  tags: string[];
  images: string[];
}

const UploadProductsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/get-products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Upload Products</h1>
      <UploadProducts />
      <h2 className="text-2xl font-semibold mt-8 mb-4">Existing Products</h2>
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-md">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800">
                <strong>Collection:</strong> {product.collection}
              </p>
              <p>
                <strong>Tags:</strong> {product.tags.join(", ")}
              </p>
              <div className="flex space-x-2 mt-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.title}
                    className="w-20 h-20 object-cover"
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default UploadProductsPage;
