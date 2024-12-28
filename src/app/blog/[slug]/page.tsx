// app/blog/[slug]/page.tsx

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Return an empty array so Next.js doesn't try to pre-generate any slugs.
  return [];
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import he from "he";
import type { Metadata } from "next";

// ---- Fetch your Blog interface, etc.
interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content
  image: string;
  createdAt: any; // Firestore Timestamp
  tags: string[];
  readingTime: number;
}

// 1) Helper function to format date
const formatDate = (timestamp: any): string => {
  if (
    timestamp &&
    typeof timestamp._seconds === "number" &&
    typeof timestamp._nanoseconds === "number"
  ) {
    const fireBaseTime = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return fireBaseTime.toLocaleDateString("en-GB", options);
  } else {
    return "Unknown Date";
  }
};

// 2) Helper function to fetch blog data by slug
const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  // Use environment variable for base URL
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://cleo-plumbing.web.app";
  const url = `${baseUrl}/api/get-blog-by-slug?slug=${encodeURIComponent(slug)}`;

  const res = await fetch(url, { cache: "no-store" }); // "no-store" -> always fresh data

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await res.json();
  return data.blog;
};

// 3) Helper to extract the first paragraph from HTML (for meta description)
const getFirstParagraph = (htmlString: string): string => {
  // Decode first, in case there are HTML entities
  const decodedContent = he.decode(htmlString || "");
  // Simple RegEx to find the first <p>...</p> block
  const match = decodedContent.match(/<p>(.*?)<\/p>/i);
  if (match && match[1]) {
    // Optionally strip out any inner HTML
    const firstParagraph = match[1].replace(/<[^>]+>/g, "");
    return firstParagraph.trim();
  }
  // Fallback if no <p> found
  return "Read our latest blog article.";
};

// 4) generateMetadata function
export async function generateMetadata(
  // Note the Promise type on `params`
  { params: paramsPromise }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  // Await the promise
  const { slug } = await paramsPromise;

  let blog: Blog | null = null;
  try {
    blog = await fetchBlogBySlug(slug);
  } catch (err) {
    console.error("Error fetching blog for metadata:", err);
  }

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "We couldn't find the blog you were looking for.",
    };
  }

  // Derive description from the first paragraph
  const description = getFirstParagraph(blog.content);

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      url: `https://yourdomain.com/blog/${blog.slug}`,
      images: [
        {
          url: blog.image || "https://via.placeholder.com/1200x630",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [blog.image || "https://via.placeholder.com/1200x630"],
    },
  };
}

// 5) The actual BlogPost page component
export default async function BlogPost({
  // Again, note the Promise type for `params`
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params here, exactly like your product route
  const { slug } = await paramsPromise;

  // Now we have a plain string for `slug`
  if (!slug) {
    notFound();
  }

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      notFound();
    }

    return (
      <div className="p-4 fullWidth flex flex-col gap-4 md:gap-8">
        {/* Header Section */}
        <div className="text-center flex justify-center flex-col gap-6 mt-4">
          <p className="text-sm font-bold uppercase text-gray-400">
            {blog.tags[0] || "Uncategorized"}
          </p>
          <h1 className="text-4xl font-bold text-white">{blog.title}</h1>
          <span className="text-gray-300">Author: Kirill (Design Director)</span>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-400 mr-4">
              <span>{formatDate(blog.createdAt)}</span>
            </p>
            <span>|</span>
            <p className="text-sm text-gray-400 ml-4">
              <span>{blog.readingTime} min read</span>
            </p>
          </div>
        </div>

        <div className="mt-8 relative w-full h-[500px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-md"
            loading="eager"
          />
        </div>

        {/* Render HTML content */}
        <div className="articleContainer text-left max-w-[1100px] mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: he.decode(blog.content) }}
            className="text-lg mt-4"
          />
        </div>

        <div className="flex flex-wrap gap-4 md:pl-[150px] justify-start">
          {blog.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/${encodeURIComponent(tag)}`}
              className="text-white border border-white py-2 px-4 gap-4 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
              aria-label={`Filter blogs by ${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
