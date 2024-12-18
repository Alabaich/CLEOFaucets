import Link from "next/link";
import CollectionDetailsComponent from "@/components/CollectionDetailsComponent";
import { Metadata } from "next";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface CollectionDetails {
  name: string;
  description?: string | null;
  image?: string | null;
}

// Metadata Generation Function
// Metadata Generation Function
export async function generateMetadata({
  params,
}: {
  params: { collectionSlug: string };
}): Promise<Metadata> {
  const { collectionSlug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-collection-by-slug?slug=${collectionSlug}`, {
    next: { revalidate: 60 }, // Optional caching
  });

  if (!res.ok) {
    console.error("Error fetching metadata:", res.status, res.statusText);
    return {
      title: "Collection Not Found - Cleo Faucets",
      description: "The collection you are looking for does not exist.",
    };
  }

  const data = await res.json(); // Ensure this matches the API response
  const collection = data.collection; // Access 'collection' field correctly

  if (!collection) {
    console.error("Collection metadata not found in response:", data);
    return {
      title: "Collection Not Found - Cleo Faucets",
      description: "The collection you are looking for does not exist.",
    };
  }



  return {
    title: `${collection.name} - Cleo Faucets`,
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


// Fetch Collection Details
async function fetchCollectionDetails(collectionSlug: string): Promise<CollectionDetails | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/get-collection-by-slug?slug=${collectionSlug}`;
  const res = await fetch(apiUrl, { next: { revalidate: 60 } });

  if (!res.ok) {
    console.error("Error fetching collection:", res.status, res.statusText);
    return null;
  }

  const data = await res.json();

  return data.collection || null; // Return the collection field
}


// Fetch Subcollections
async function fetchSubcollections(collectionSlug: string): Promise<SubCollection[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-subcollections-by-collection-slug?collectionSlug=${collectionSlug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.subcollections || [];
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const resolvedParams = await params; // Await params if it's a Promise
  const { collectionSlug } = resolvedParams;

  const [collectionDetails, subcollections] = await Promise.all([
    fetchCollectionDetails(collectionSlug),
    fetchSubcollections(collectionSlug),
  ]);

  if (!collectionDetails) {
    return (
      <div className="text-center my-10 w-full mx-auto">
        <h1 className="text-3xl font-semibold text-white mt-2">Collection Not Found</h1>
        <div className="mt-4">
          {/* Use Link component for navigation */}
          <Link href="/collections" className="bg-white text-black py-2 px-4 rounded">
            Go Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CollectionDetailsComponent
      collection={collectionDetails}
      subcollections={subcollections}
      collectionSlug={collectionSlug}
    />
  );
}
