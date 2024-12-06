"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadSingleBlog from "../../../components/UploadSingleBlog";
import { FaEllipsisV } from "react-icons/fa"; // 3 dots icon

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  tags: string[];
  readingTime: number;
}

const UploadBlogsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUploadSingleBlog, setShowUploadSingleBlog] = useState<boolean>(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

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
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleMenuClick = (option: string) => {
    if (option === "addBlog") {
      setShowUploadSingleBlog(true);
    }
    setShowMenu(false); // Close menu after selection
  };

  const handleEditClick = (blog: Blog) => {
    setBlogToEdit(blog);
    setShowUploadSingleBlog(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Blogs</h1>
        <div className="relative">
          <FaEllipsisV
            className="cursor-pointer fill-black stroke-black"
            size={20}
            onClick={() => setShowMenu((prev) => !prev)}
          />
          {showMenu && (
            <div className="absolute top-6 right-0 bg-white shadow-md rounded-md p-2 w-40">
              <button
                className="w-full text-left py-2 px-4 text-sm bg-white hover:bg-blue-100"
                onClick={() => handleMenuClick("addBlog")}
              >
                Add Blog
              </button>
            </div>
          )}
        </div>
      </div>

      {showUploadSingleBlog && (
        <UploadSingleBlog blogToEdit={blogToEdit} />
      )}

      {loadingBlogs ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg w-full md:w-1/4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={blog.image} // Show image
                  alt={blog.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-400">Reading time: {blog.readingTime} min</p>
                  <p className="text-sm text-gray-400">Tags: {blog.tags.join(", ")}</p>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(blog)}
              >
                Edit
              </button>
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
