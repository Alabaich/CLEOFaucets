import { Metadata } from "next";

interface Params {
  collectionSlug: string;
  subcollectionSlug: string;
  productSlug: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  console.log("Generating metadata for:", params);
  console.log("Params received:", params);
  const { productSlug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-product-by-slug?slug=${productSlug}`);
  console.log("API response status:", res.status);

  if (!res.ok) {
    console.error("API error:", await res.text());
    return {
      title: "Product Not Found - Cleo Faucets",
      description: "The product you are looking for does not exist.",
    };
  }

  const data = await res.json();
  console.log("Product data:", data);

  if (!data.product) {
    return {
      title: "Product Not Found - Cleo Faucets",
      description: "The product you are looking for does not exist.",
    };
  }

  const product = data.product;

  return {
    title: `${product.title} - Cleo Faucets`,
    description: product.description.slice(0, 150),
    openGraph: {
      title: `${product.title} - Cleo Faucets`,
      description: product.description,
      url: `https://www.cleofaucets.com/collections/${params.collectionSlug}/${params.subcollectionSlug}/${params.productSlug}`,
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
