"use client";

import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // 3 dots icon
import Link from "next/link";
import firebase from "firebase/compat/app"; // Ensure you import Firebase compat library

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: any; // This can be a Firestore Timestamp or undefined
  tags: string[];
  readingTime: number;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/get-blogs");
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (timestamp: any) => {
    console.log("Raw createdAt:", timestamp);  // Log raw value for debugging

    // Check if the timestamp contains the required 'seconds' and 'nanoseconds' fields
    if (timestamp && timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
      // Convert Firebase Timestamp to a JavaScript Date
      const fireBaseTime = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );

      const date = fireBaseTime.toDateString(); // Get the date as a string
      const atTime = fireBaseTime.toLocaleTimeString(); // Get the time as a string

      console.log("Formatted date:", date);
      console.log("Formatted time:", atTime);

      return `${date}, ${atTime}`; // Return both date and time in a readable format
    } else {
      console.error("Invalid or missing createdAt:", timestamp); // Log if invalid
      return "Unknown Date"; // Return a fallback message
    }
  };

  if (loadingBlogs) {
    return <p>Loading...</p>;
  }

  console.log(blogs[0].createdAt); // Check the createdAt field in the logs

  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <p className="text-sm font-bold uppercase text-gray-500">Blog Updates</p>
      <h1 className="text-3xl font-semibold text-gray-800 mt-2">Latest Blogs</h1>
      <p className="text-lg text-gray-600 mt-1">Stay updated with our latest posts</p>

      {/* First large news container */}
      {blogs.length > 0 ? (
        <Link href={`/blog/${blogs[0].id}`} className="hover:no-underline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="col-span-full relative h-[400px] overflow-hidden group">
              <div
                className="h-full bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${blogs[0].image})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="h-full md:h-3/6 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/90 text-white p-4 flex justify-end align-end flex-col text-left gap-2">
                <p className="text-sm font-light">
                  <span className="mr-2">Kirill (Design Director)</span>•
                  <span className="ml-2">{formatDate(blogs[0].createdAt)}</span>
                </p>
                <h4 className="font-semibold">{blogs[0].title}</h4>
                <p className="mb-2">{blogs[0].content.slice(0, 100)}...</p>
                <div className="flex gap-2">
                  {blogs[0].tags.map((tag) => (
                    <Link
                      href="#"
                      key={tag}
                      className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <p>No blogs found.</p>
      )}

      {/* Small news blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {blogs.slice(1).map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id} className="hover:no-underline">
            <div className="rounded-md overflow-hidden shadow-md group">
              <div
                className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${blog.image})` }}
              ></div>
              <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
                <p className="">
                  <span className="mr-2">Kirill (Design Director)</span>•
                  <span className="ml-2">{formatDate(blog.createdAt)}</span>
                </p>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p>{blog.content.slice(0, 100)}...</p>
                <div className="mt-2">
                  {blog.tags.map((tag) => (
                    <Link
                      href="#"
                      key={tag}
                      className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 w-full mx-auto flex justify-between items-center">
        <Link
          href="#"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
        >
          {"<"}
        </Link>

        <div className="flex gap-4">
          <Link
            href="#"
            className="active text-sm text-black bg-white px-4 py-2 border border-white border-[1px] rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            1
          </Link>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            2
          </Link>

          <span className="flex items-end text-sm text-white">...</span>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            9
          </Link>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            10
          </Link>
        </div>

        <Link
          href="#"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}
