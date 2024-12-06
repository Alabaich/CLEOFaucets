import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch all blogs from Firestore
    const blogsSnapshot = await db.collection("Blogs").get();
    const blogs = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ blogs });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // TypeScript now knows that error is an instance of Error
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export default handler;
