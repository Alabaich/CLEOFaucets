// app/blog/[slug]/page.tsx

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { notFound } from 'next/navigation';

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
  if (timestamp && timestamp._seconds !== undefined && timestamp._nanoseconds !== undefined) {
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

// Define a helper function to fetch data from API
const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  // Construct the absolute URL
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.VERCEL_URL || 'localhost:3000'; // Adjust if deployed differently
  const url = `${protocol}://${host}/api/get-blog-by-slug?slug=${slug}`;

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

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto p-4">
        <Head>
          <title>{blog.title} | Your Site Name</title>
          <meta name="description" content={blog.content.slice(0, 150)} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.content.slice(0, 150)} />
          <meta property="og:image" content={blog.image} />
          {/* Add more meta tags as needed */}
        </Head>

        <h1 className="text-4xl font-bold text-white">{blog.title}</h1>
        <p className="text-gray-300 mt-2">
          <span>Kirill (Design Director)</span> • <span>{formatDate(blog.createdAt)}</span>
        </p>
        <div className="w-full h-auto mt-4 rounded-md relative">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
            priority={true} // Optional: Preload important images
          />
        </div>
        <div className="mt-6 text-white">
          {/* Assuming content is plain text. If it's HTML, use dangerouslySetInnerHTML */}
          <p>{blog.content}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <a
              key={tag}
              href={`/blog/${tag}`} // Adjust based on tag routing
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
              aria-label={`Filter blogs by ${tag}`}
            >
              {tag}
            </a>
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
