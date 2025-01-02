import { Metadata } from "next";
import ProductComponent from "@/components/ProductComponent";

interface Params {
  productSlug: string;
}

/** 
 * Metadata generation function
 * - Notice we now type params as Promise<Params> and then await it
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await params; // Await the Promise
  const { productSlug } = resolvedParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-product-by-slug?slug=${productSlug}`
  );
  if (!res.ok) {
    return {
      title: "Product Not Found - Cleo Faucets",
      description: "The product you are looking for does not exist.",
    };
  }

  const data = await res.json();
  const product = data.product;

  return {
    title: `${product.title} - Cleo Faucets`,
    description: product.description.slice(0, 150),
    openGraph: {
      title: `${product.title} - Cleo Faucets`,
      description: product.description,
      url: `https://www.cleofaucets.com/products/${productSlug}`,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Cleo Faucets`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

/**
 * Page Component
 * - Same idea: destructure `productSlug` after awaiting `params`.
 */
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params; // Await the Promise
  const { productSlug } = resolvedParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-product-by-slug?slug=${productSlug}`
  );
  if (!res.ok) {
    return <div>Product not found</div>;
  }

  const data = await res.json();
  if (!data.product) {
    return <div>Product not found</div>;
  }

  return <ProductComponent product={data.product} />;
}
