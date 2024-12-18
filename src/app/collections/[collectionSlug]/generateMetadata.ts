import { Metadata } from "next";

interface CollectionParams {
  collectionSlug: string;
}

export async function generateMetadata({ params }: { params: CollectionParams }): Promise<Metadata> {
  const { collectionSlug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-collection-by-slug?slug=${collectionSlug}`, {
    next: { revalidate: 60 }, // Optional caching
  });

  if (!res.ok) {
    return {
      title: "Collection Not Found - Cleo Faucets",
      description: "The collection you are looking for does not exist.",
    };
  }

  const collection = await res.json(); // Use flat response directly
  console.log("Fetched Metadata Collection:", collection);

  return {
    title: `${collection.name} - Cleo Here`,
    description: collection.description || "Explore our wide range of products in this collection.",
    openGraph: {
      title: `${collection.name} - Cleo Faucets`,
      description: collection.description || "Explore our wide range of products in this collection.",
      url: `https://www.cleofaucets.com/collections/${collectionSlug}`,
      images: [
        {
          url: collection.image || "https://via.placeholder.com/1200x630",
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.name} - Cleo Faucets`,
      description: collection.description || "Explore our wide range of products in this collection.",
      images: [collection.image || "https://via.placeholder.com/1200x630"],
    },
  };
}
