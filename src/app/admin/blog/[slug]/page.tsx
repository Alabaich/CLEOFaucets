// app/blog/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import EditBlog from "./Components/EditBlog";

// Reuse your fetch function
const fetchBlogBySlug = async (slug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cleo-plumbing.web.app";
  const url = `${baseUrl}/api/get-blog-by-slug?slug=${encodeURIComponent(slug)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog");

  const data = await res.json();
  return data.blog;
};

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) {
    notFound();
  }
  return <EditBlog blog={blog} />;
}