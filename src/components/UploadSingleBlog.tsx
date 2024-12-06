"use client";

import { useState, useEffect } from "react";

const UploadSingleBlog = ({ blogToEdit }: { blogToEdit: any }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [readingTime, setReadingTime] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImage(blogToEdit.image);
      setTags(blogToEdit.tags.join(", "));
      setReadingTime(blogToEdit.readingTime || 0);
    }
  }, [blogToEdit]);

  const handleUpload = async () => {
    if (!title || !content || !image || !tags || !readingTime) {
      setMessage("Please fill out all the fields.");
      return;
    }

    setIsUploading(true);

    const blogData = {
      title,
      content,
      image,
      tags: tags.split(",").map((tag) => tag.trim()),
      readingTime,
    };

    try {
      const res = await fetch("/api/upload-single-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Blog uploaded successfully!");
        setTitle("");
        setContent("");
        setImage("");
        setTags("");
        setReadingTime(0);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during upload:", error.message);
        setMessage(`An unexpected error occurred: ${error.message}`);
      } else {
        console.error("Unknown error during upload:", error);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md text-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Upload Single Blog</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Reading Time (minutes)</label>
        <input
          type="number"
          value={readingTime}
          onChange={(e) => setReadingTime(Number(e.target.value))}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadSingleBlog;
