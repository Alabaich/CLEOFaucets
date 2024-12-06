"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadSingleProduct from "../../../components/UploadSingleProduct";
import UploadProducts from "../../../components/UploadProducts";
import { FaEllipsisV } from "react-icons/fa"; // 3 dots icon

interface Product {
  id: string; // This is the unique identifier for the product
  title: string;
  images: string[];
}

const UploadProductsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUploadSingleProduct, setShowUploadSingleProduct] = useState<boolean>(false);
  const [showBulkUpload, setShowBulkUpload] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

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

  const handleMenuClick = (option: string) => {
    if (option === "addProduct") {
      setShowUploadSingleProduct(true);
      setShowBulkUpload(false);
    } else if (option === "bulkUpload") {
      setShowBulkUpload(true);
      setShowUploadSingleProduct(false);
    }
    setShowMenu(false); // Close menu after selection
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);  // Set the product to edit
    setShowUploadSingleProduct(true);  // Open the upload form for the selected product
    setShowBulkUpload(false);  // Close the bulk upload
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Products</h1>
        <div className="relative">
          <FaEllipsisV
            className="cursor-pointer fill-black stroke-black"
            size={20}
            onClick={() => setShowMenu((prev) => !prev)}
          />
          {showMenu && (
            <div className="absolute top-6 right-0 bg-white shadow-md rounded-md p-2 w-40">
              <button
                className="w-full text-left py-2 px-4 text-sm bg-white hover:bg-blue-100"
                onClick={() => handleMenuClick("addProduct")}
              >
                Add Product
              </button>
              <button
                className="w-full text-left py-2 px-4 text-sm bg-white hover:bg-blue-100"
                onClick={() => handleMenuClick("bulkUpload")}
              >
                Bulk Upload
              </button>
            </div>
          )}
        </div>
      </div>
          <div className="py-6">
          {showUploadSingleProduct && (
        <UploadSingleProduct productToEdit={productToEdit} />
      )}
      {showBulkUpload && <UploadProducts />}
          </div>


      {loadingProducts ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="flex flex-col flex-wrap gap-4 w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg w-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.images[0]} // Show first image
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h5 className="text-md font-semibold text-black">{product.title}</h5>
                  <p className="text-sm text-gray-600">SKU: {product.id}</p> {/* Display product ID */}
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default UploadProductsPage;
