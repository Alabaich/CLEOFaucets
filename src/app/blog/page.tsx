"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import he from "he";
import { slugify } from "../../utils/slugify"; // Adjust the path accordingly

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: any; // Firestore Timestamp
  tags: string[];
  readingTime: number;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>("All"); // State for selected tag
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const postsPerPage = 4; // Number of posts per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/get-blogs");
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await res.json();

        // Sort blogs by `createdAt` (latest first)
        const sortedBlogs = data.blogs.sort((a: Blog, b: Blog) => {
          const dateA = a.createdAt?._seconds || 0;
          const dateB = b.createdAt?._seconds || 0;
          return dateB - dateA;
        });

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [blogs]);

  // Format date as "DD MMM YYYY"
  const formatDate = (timestamp: any): string => {
    if (timestamp && timestamp._seconds !== undefined && timestamp._nanoseconds !== undefined) {
      const fireBaseTime = new Date(
        timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
      );

      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short", // e.g., "Dec"
        year: "numeric",
      };

      return fireBaseTime.toLocaleDateString("en-GB", options);
    } else {
      return "Unknown Date";
    }
  };

  // Extract and truncate the first <p> tag
  const extractFirstParagraph = (content: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const firstParagraph = doc.querySelector("p");
    if (firstParagraph) {
      return firstParagraph.innerHTML; // Get the inner HTML of the first <p> tag
    }
    return ""; // Return an empty string if no <p> tag is found
  };

  // Reset currentPage when selectedTag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  // Filter blogs based on selected tag
  const filteredBlogs = useMemo(() => {
    if (selectedTag === "All") return blogs;
    return blogs.filter((blog) => blog.tags.includes(selectedTag));
  }, [blogs, selectedTag]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredBlogs.length / postsPerPage);
  }, [filteredBlogs.length]);

  // Get current blogs for the current page
  const currentBlogs = useMemo(() => {
    const startIdx = (currentPage - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    return filteredBlogs.slice(startIdx, endIdx);
  }, [filteredBlogs, currentPage, postsPerPage]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
  };

  if (loadingBlogs) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (filteredBlogs.length === 0) {
    return (
      <p className="text-center text-white">
        No blogs found for &ldquo;{selectedTag}&ldquo;.
      </p>
    );
  }

  // Extract the first blog as featured and the rest as other blogs
  const featuredBlog = currentBlogs[0];
  const otherBlogs = currentBlogs.slice(1);

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <p className="text-sm font-bold uppercase text-white">Stay Updated</p>
      <h1 className="text-3xl font-semibold text-white mt-2">Cleo Faucets News</h1>
      <p className="text-lg text-gray-300 mt-1">
        Every detail matters when creating spaces that inspire. Explore the Cleo Faucets blog for
        fresh ideas and expert tips to transform your kitchen and bath into true reflections of
        modern living.
      </p>

      {/* Featured Blog */}
      {featuredBlog && (
        <div className="group">
          <Link href={`/blog/${slugify(featuredBlog.title)}`} className="hover:no-underline block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="col-span-full relative h-[400px] overflow-hidden group">
                <div
                  className="h-full bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${featuredBlog.image})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="h-full md:h-3/6 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/90 text-white p-4 flex justify-end flex-col text-left gap-2">
                  <p className="text-sm font-light">
                    <span className="mr-2">Kirill (Design Director)</span>•
                    <span className="ml-2">{formatDate(featuredBlog.createdAt)}</span>
                  </p>
                  <h4 className="font-semibold text-xl">{featuredBlog.title}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: he.decode(extractFirstParagraph(featuredBlog.content)),
                    }}
                    className="text-gray-200"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Other Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {otherBlogs.map((blog) => (
          <div key={blog.id} className="group">
            <Link href={`/blog/${slugify(blog.title)}`} className="hover:no-underline block">
              <div className="rounded-md overflow-hidden shadow-md group">
                <div
                  className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${blog.image})` }}
                ></div>
                <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
                  <p>
                    <span className="mr-2">Kirill (Design Director)</span>•
                    <span className="ml-2">{formatDate(blog.createdAt)}</span>
                  </p>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: he.decode(extractFirstParagraph(blog.content)),
                    }}
                    className=" text-gray-200"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
