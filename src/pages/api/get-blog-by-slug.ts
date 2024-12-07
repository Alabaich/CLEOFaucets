// pages/api/get-blog-by-slug.ts

import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Allow only GET requests
  if (req.method !== "GET") {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const { slug } = req.query;

  console.log("API called with slug:", slug);

  // Validate the slug parameter
  if (!slug || typeof slug !== "string") {
    console.log("Invalid slug parameter:", slug);
    return res.status(400).json({ error: "Slug is required and must be a string." });
  }

  try {
    // Query Firestore for a blog with the given slug
    const blogQuery = await db.collection("Blogs").where("slug", "==", slug).limit(1).get();

    console.log("Number of blogs found:", blogQuery.size);

    if (blogQuery.empty) {
      console.log("No blog found with slug:", slug);
      return res.status(404).json({ error: "Blog not found." });
    }

    const blogDoc = blogQuery.docs[0];
    const blogData = blogDoc.data();

    const blog = {
      id: blogDoc.id,
      ...blogData,
    };


    res.status(200).json({ blog });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching blog by slug:", error);
      res.status(500).json({ error: error.message || "Internal server error." });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

export default handler;
