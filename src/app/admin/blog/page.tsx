"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadSingleBlog from "../../../components/UploadSingleBlog";
import { FaEllipsisV } from "react-icons/fa"; // 3 dots icon
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  image: string;
  updatedAt: { _seconds?: number; _nanoseconds?: number };
}

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

const UploadBlogsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  // Remove showMenu and blogToEdit if no longer needed
  // const [showMenu, setShowMenu] = useState<boolean>(false);
  // const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/get-blogs");
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await res.json();
        console.log("Raw fetched data:", data.blogs);
        const sortedBlogs = data.blogs.sort((a: Blog, b: Blog) => {
          const dateA =
            typeof a.updatedAt === "string"
              ? new Date(a.updatedAt).getTime()
              : ((a.updatedAt?._seconds || 0) * 1000);
          const dateB =
            typeof b.updatedAt === "string"
              ? new Date(b.updatedAt).getTime()
              : ((b.updatedAt?._seconds || 0) * 1000);
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

  const handleEditClick = (blog: Blog) => {
    router.push(`/admin/blog/${blog.slug}`);
  };

  const handleDeleteClick = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/delete-blog?id=${blogId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Blogs</h1>
        <Link
          href="/admin/blog/create"
          className="text-black text-sm py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-md"
        >
          Add Blog
        </Link>
      </div>

      {/* Remove the UploadSingleBlog component if not needed here */}
      {/* {showUploadSingleBlog && <UploadSingleBlog blogToEdit={blogToEdit} />} */}

      {loadingBlogs ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.slug} className="bg-gray-800 p-4 rounded-lg">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2 text-white">{blog.title}</h3>
              <p className="text-sm text-gray-400">Updated: {formatDate(blog.updatedAt)}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => handleEditClick(blog)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteClick(blog.slug)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default UploadBlogsPage;