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

    // Validate the blog slug
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid blog slug." });
    }

    // Query the Blogs collection for a document with a matching slug
    const blogsRef = db.collection("Blogs");
    const querySnapshot = await blogsRef.where("slug", "==", id).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Blog not found." });
    }

    // Delete the found document(s)
    // (Using a batch in case there are multiple documents, though ideally slug is unique.)
    const batch = db.batch();
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
