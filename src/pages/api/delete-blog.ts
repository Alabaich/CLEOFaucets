// pages/api/delete-blog.ts

import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Allow only DELETE requests
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed. Use DELETE." });
  }

  try {
    const { id } = req.query;

    // Validate the blog ID
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid blog ID." });
    }

    // Check if the blog exists
    const blogRef = db.collection("Blogs").doc(id);
    const blogDoc = await blogRef.get();

    if (!blogDoc.exists) {
      return res.status(404).json({ error: "Blog not found." });
    }

    // Delete the blog
    await blogRef.delete();

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
