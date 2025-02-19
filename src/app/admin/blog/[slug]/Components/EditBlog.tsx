// components/EditBlog.tsx
"use client";

import React, { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichtextEditor";
import Link from "next/link";

interface Blog {
    id?: string;
    title: string;
    slug: string;
    content: string;
    image: string;
    createdAt: any;
    tags: string[];
    readingTime: number;
    metaDescription?: string;
    draft?: boolean;
}

interface EditBlogProps {
    blog: Blog;
}

const EditBlog: React.FC<EditBlogProps> = ({ blog }) => {
    const isNew = !blog.id;
    
    const [title, setTitle] = useState(blog.title);
    const [slug, setSlug] = useState(blog.slug);
    const [content, setContent] = useState(blog.content);
    const [image, setImage] = useState(blog.image);
    const [readingTime, setReadingTime] = useState(blog.readingTime);
    const [tags, setTags] = useState(blog.tags.join(", "));
    const [metaDescription, setMetaDescription] = useState(blog.metaDescription || "");
    const [isDirty, setIsDirty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [draft, setDraft] = useState(blog.draft ?? false);


    // Update content state if blog.content changes
    useEffect(() => {
        setContent(blog.content);
    }, [blog.content]);

    // Optionally update meta description if blog changes
    useEffect(() => {
        setMetaDescription(blog.metaDescription || "");
    }, [blog.metaDescription]);

    // Check if any field has been modified
    useEffect(() => {
        if (
          title !== blog.title ||
          slug !== blog.slug ||
          content !== blog.content ||
          image !== blog.image ||
          readingTime !== blog.readingTime ||
          tags !== blog.tags.join(", ") ||
          metaDescription !== (blog.metaDescription || "") ||
          draft !== (blog.draft || false)
        ) {
          setIsDirty(true);
        } else {
          setIsDirty(false);
        }
      }, [title, slug, content, image, readingTime, tags, metaDescription, draft, blog]);
      

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepare payload: convert tags string to an array and include metaDescription
        const payload = {
            id: blog.id,
            title,
            content,
            image,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            readingTime,
            metaDescription,
            draft
        };

        setLoading(true);
        setMessage("");
        try {
            const endpoint = isNew ? "/api/upload-single-blog" : "/api/update-single-blog";
            const method = isNew ? "POST" : "PUT";
      
            const res = await fetch(endpoint, {
              method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.error || "An error occurred while updating the blog.");
            } else {
                setMessage(data.message || "Blog updated successfully!");
            }
        } catch (error: any) {
            console.error("Error updating blog:", error);
            setMessage("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 w-full mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flerx">         {message && <div className="mb-4 text-center text-[#2c2d2c]">{message}</div>}</div>
                <div className="flex gap-2">
                    <Link href={`/blog/${slug}`} className="text-blue-500 hover:underline py-2 px-4 bg-blue-50 hover:bg-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z" stroke="#2C2D2C" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z" stroke="#2C2D2C" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <label className="flex items-center gap-2 text-[#2c2d2c]">
    <input
      type="checkbox"
      checked={draft}
      onChange={(e) => setDraft(e.target.checked)}
      className="h-4 w-4"
    />
    Draft
  </label>
                    <button
                        type="submit"
                        disabled={!isDirty || loading}
                        className={`bg-blue-500 text-white py-2 px-4 rounded ${(!isDirty || loading) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Updating..." : "Update Blog"}
                    </button>
                </div>

            </div>

            <div className="flex justify-between w-full gap-6">
                <div className="w-[80%]">
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-bold mb-1 text-[#2c2d2c]">
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 w-full text-[#2c2d2c]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block font-bold mb-1 text-[#2c2d2c]">
                            Content:
                        </label>
                        <RichTextEditor
                            value={content}
                            onChange={(newContent: string) => setContent(newContent)}
                        />
                    </div>
                </div>
                <div className="w-[20%]">
                    <div className="mb-4">
                        <label htmlFor="slug" className="block font-bold mb-1 text-[#2c2d2c]">
                            Slug:
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="border p-2 w-full text-[#2c2d2c]"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-bold mb-1 text-[#2c2d2c]">
                            Image URL:
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="border p-2 w-full text-[#2c2d2c]"
                        />
                        <img src={`${image}`} alt="" className="w-full object-contain" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="readingTime" className="block font-bold mb-1 text-[#2c2d2c]">
                            Reading Time (min):
                        </label>
                        <input
                            id="readingTime"
                            type="number"
                            value={readingTime}
                            onChange={(e) => setReadingTime(Number(e.target.value))}
                            className="border p-2 w-full text-[#2c2d2c]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block font-bold mb-1 text-[#2c2d2c]">
                            Tags (comma separated):
                        </label>
                        <input
                            id="tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="border p-2 w-full text-[#2c2d2c]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="metaDescription" className="block font-bold mb-1 text-[#2c2d2c]">
                            Meta Description:
                        </label>
                        <textarea
                            id="metaDescription"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="border p-2 w-full text-[#2c2d2c]"
                            rows={3}
                        />
                    </div>
                </div>
            </div>

        </form>
    );
};

export default EditBlog;
