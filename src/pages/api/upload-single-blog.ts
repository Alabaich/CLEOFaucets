import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

// Initialize Firestore and Storage
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, content, image, tags, readingTime } = req.body;

    const blogData = {
      title,
      content,
      image,
      tags,
      readingTime,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const blogRef = db.collection("Blogs").doc();

    // Save blog to Firestore
    await blogRef.set(blogData);

    res.status(200).json({ message: "Blog uploaded successfully!" });
  } catch (error: any) {
    console.error("Error processing blog upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
