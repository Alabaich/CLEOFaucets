"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  tags: string[];
  images: string[];
  slug: string;
  variants?: { 
    sku: string; 
    images: string[]; 
    options: { name: string; value: string }[] 
  }[]; 
}

export default function SubCollectionPage() {
  const params = useParams();
  const router = useRouter();

  const { collectionSlug, subcollectionSlug } = params || {};

  const [subcollection, setSubcollection] = useState<SubCollection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!collectionSlug || !subcollectionSlug) {
      console.error("Missing collectionSlug or subcollectionSlug in the URL params!");
      return;
    }

    const fetchSubcollectionAndProducts = async () => {
      try {
        const resSubcollection = await fetch(
          `/api/get-subcollection?collectionSlug=${collectionSlug}&subcollectionSlug=${subcollectionSlug}`
        );
        const subcollectionData = await resSubcollection.json();
        setSubcollection(subcollectionData.subcollection);

        const resProducts = await fetch(
          `/api/get-products-by-tag?tag=${subcollectionSlug}`
        );
        const productsData = await resProducts.json();
        setProducts(productsData.products);
      } catch (error) {
        console.error("Error fetching subcollection and products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcollectionAndProducts();
  }, [collectionSlug, subcollectionSlug]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (!subcollection)
    return (
      <p className="text-center text-white">
        Subcollection not found for collection &quot;{collectionSlug}&quot; and
        subcollection &quot;{subcollectionSlug}&quot;.
      </p>
    );

  return (
    <div className="text-center my-10 w-full mx-auto px-4">
      <button
        className="mb-4 bg-transparent hover:bg-transparent text-white py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
      <h1 className="text-3xl font-semibold text-white mt-2">{subcollection.name}</h1>

      <h2 className="text-2xl font-semibold text-white mt-8">Related Products</h2>
      {products.length === 0 ? (
        <p className="text-white mt-4">No products found for this subcollection.</p>
      ) : (
        <div className=" fullWidth grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${collectionSlug}/${subcollectionSlug}/${product.slug}`}
              className="group"
            >
              <div className=" rounded overflow-hidden shadow-md p-0 bg-transparent text-white border border-gray-700">
                <div className="w-full aspect-square overflow-hidden mb-4">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  )}
                </div>
                <div className="p-2">
                <h3 className="text-lg font-semibold mb-2 text-left">{product.title}</h3>
                <p className="text-sm mb-2 text-left">Tags: {product.tags.join(", ")}</p>

                {/* Variants as square images */}
                {product.variants && product.variants.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="relative w-16 h-10 border border-gray-500 rounded-md overflow-hidden"
                      >
                        {/* Variant Image */}
                        {variant.images[0] && (
                          <img
                            src={variant.images[0]}
                            alt={`Variant ${index}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Option Values */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-[8px] text-white p-1 text-center">
                          {variant.options.map((option) => option.value).join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
