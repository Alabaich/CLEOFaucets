// app/blog/create/page.tsx

import React from "react";
import EditBlog from "../[slug]/Components/EditBlog";

interface Blog {
  title: string;
  slug: string;
  content: string;
  image: string;
  createdAt: any;
  tags: string[];
  readingTime: number;
  metaDescription: string;
  draft: boolean;
  updatedAt: { _seconds?: number; _nanoseconds?: number };
}

// Create a default blog object to indicate creation mode.
// Note that draft is now set to true.
const newBlog: Blog = {
  content: "",
  createdAt: { _seconds: 0, _nanoseconds: 0 },
  draft: true,
  metaDescription: "",
  readingTime: 0,
  tags: [],
  slug: "",
  title: "",
  image: "",
  updatedAt: { _seconds: 0, _nanoseconds: 0 },
};

export default function CreateBlogPage() {
  return <EditBlog blog={newBlog} />;
}
