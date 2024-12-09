// pages/api/upload-single-blog.ts

import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import { slugify } from "../../utils/slugify"; // Ensure the correct path

// Initialize Firestore
const db = admin.firestore();

// Define the Blog interface (optional but recommended for TypeScript)
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { title, content, image, tags, readingTime } = req.body;

    // Basic validation
    if (!title || !content || !image) {
      return res.status(400).json({ error: "Title, content, and image are required." });
    }

    // Check for duplicate title to ensure slug uniqueness
    const duplicateTitleQuery = await db.collection("Blogs").where("title", "==", title).get();

    if (!duplicateTitleQuery.empty) {
      return res.status(400).json({ error: "A blog with this title already exists." });
    }

    // Generate slug from title
    const baseSlug = slugify(title);

    // Optional: Check if the generated slug already exists (additional safety)
    const duplicateSlugQuery = await db.collection("Blogs").where("slug", "==", baseSlug).get();

    if (!duplicateSlugQuery.empty) {
      return res.status(400).json({ error: "A blog with a similar title (slug) already exists." });
    }

    // Create a new document reference with a unique ID
    const blogRef = db.collection("Blogs").doc();

    const blogData: Omit<Blog, "id"> = {
      title,
      content,
      image,
      tags: tags || [],
      readingTime: readingTime || 0,
      slug: baseSlug, // Slug based solely on title
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save blog to Firestore
    await blogRef.set(blogData);

    res.status(200).json({ message: "Blog uploaded successfully!", blogId: blogRef.id, slug: baseSlug });
  } catch (error: any) {
    console.error("Error processing blog upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
