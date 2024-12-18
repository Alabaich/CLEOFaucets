import SubCollectionDetailsComponent from "../../../../components/SubCollectionDetailsComponent";
import { Metadata } from "next";
import Link from "next/link";

interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface Product {
  id: string;
  title: string;
  images: string[];
  slug: string;
}

async function fetchSubcollection(subcollectionSlug: string): Promise<SubCollection | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/get-subcollection-by-slug?subcollectionSlug=${subcollectionSlug}`;


  const res = await fetch(apiUrl, { next: { revalidate: 60 } });

  if (!res.ok) {
    console.error("Error fetching subcollection:", res.status, res.statusText);
    return null;
  }

  const data = await res.json();


  return data.subcollection || null;
}


async function fetchProductsByTag(tag: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-products-by-tag?tag=${tag}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.products || [];
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcollectionSlug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { subcollectionSlug } = resolvedParams;

  const subcollection = await fetchSubcollection(subcollectionSlug);

  if (!subcollection) {
    return {
      title: "Subcollection Not Found - Cleo Faucets",
      description: "The subcollection you are looking for does not exist.",
    };
  }

  return {
    title: `${subcollection.name} - Cleo Faucets`,
    description: `Explore the ${subcollection.name} subcollection.`,
    openGraph: {
      title: `${subcollection.name} - Cleo Faucets`,
      description: `Explore the ${subcollection.name} subcollection.`,
      url: `https://www.cleofaucets.com/subcollections/${subcollectionSlug}`,
      images: [
        {
          url: subcollection.image || "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/images%2FPlaceholder.webp?alt=media&token=28081801-2e80-4a97-a8af-c5f84a622d0b",
          width: 1200,
          height: 630,
          alt: subcollection.name,
        },
      ],
    },
  };
}

// Subcollection page component
export default async function SubCollectionPage({
  params,
}: {
  params: Promise<{ collectionSlug: string; subcollectionSlug: string }>;
}) {
  const resolvedParams = await params;
  const { collectionSlug, subcollectionSlug } = resolvedParams;

  const [subcollection, products] = await Promise.all([
    fetchSubcollection(subcollectionSlug),
    fetchProductsByTag(subcollectionSlug),
  ]);


  if (!subcollection) {
    return (
      <div className="text-center my-10">
        <h1 className="text-3xl font-semibold text-white">Subcollection Not Found</h1>
        <Link href={`/collections/${collectionSlug}`} className="mt-4 bg-white text-black py-2 px-4 rounded">
          Go Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <SubCollectionDetailsComponent
      subcollection={subcollection}
      products={products}
      collectionSlug={collectionSlug} // Correctly passing collectionSlug here
    />
  );
}
