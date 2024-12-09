// app/blog/[slug]/page.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import he from 'he';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  createdAt: any; // Firestore Timestamp
  tags: string[];
  readingTime: number;
}

const formatDate = (timestamp: any): string => {
  if (
    timestamp &&
    typeof timestamp._seconds === 'number' &&
    typeof timestamp._nanoseconds === 'number'
  ) {
    const fireBaseTime = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short', // e.g., "Dec"
      year: 'numeric',
    };

    return fireBaseTime.toLocaleDateString('en-GB', options);
  } else {
    return "Unknown Date";
  }
};

// Helper function to fetch blog data by slug
const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  // Use environment variable for base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleo-plumbing.web.app';
  const url = `${baseUrl}/api/get-blog-by-slug?slug=${encodeURIComponent(slug)}`;

  const res = await fetch(url, {
    cache: 'no-store', // Ensure fresh data
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch blog');
  }

  const data = await res.json();
  return data.blog;
};

const BlogPost = async ({ params: paramsPromise }: { params: Promise<{ slug: string }> }) => {
  const params = await paramsPromise;

  if (!params || !params.slug) {
    notFound();
  }

  const { slug } = params;

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      notFound();
    }

    return (
      <div className="p-4 fullWidth flex flex-col gap-8">
        {/* Header Section */}
        <div className="text-center flex justify-center flex-col gap-6 mt-4">
          <p className="text-sm font-bold uppercase text-gray-500">
            {blog.tags[0] || "Uncategorized"}
          </p>
          <h1 className="text-4xl font-bold text-white">{blog.title}</h1>
          <span className="text-gray-300">Author: Kirill (Design Director)</span>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-500 mr-4">
              <span>{formatDate(blog.createdAt)}</span>
            </p>
            <span>|</span>
            <p className="text-sm text-gray-500 ml-4">
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
        <div className="text-left max-w-[1100px] mx-auto">
        <div
  dangerouslySetInnerHTML={{ __html: he.decode(blog.content) }}
  className="text-lg mt-4"
/>
</div>


        <div className="flex gap-4 w-full justify-center flex-wrap md:w-[1100px]">
          {blog.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/${encodeURIComponent(tag)}`}
              className="text-white border border-white py-2 px-4 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
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
};

  
  export default BlogPost;
  


