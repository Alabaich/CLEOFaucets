import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin"; // Ensure this file is properly configured

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid or missing collection slug" });
  }

  try {
    // Query Firestore for the collection by slug
    const collectionSnapshot = await db
      .collection("Collections") // Replace with your actual collection name
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (collectionSnapshot.empty) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Get the first matching document
    const collectionDoc = collectionSnapshot.docs[0];
    const collectionData = collectionDoc.data();

    // Return the collection details
    return res.status(200).json({
      collection: {
        id: collectionDoc.id,
        name: collectionData.name || "Untitled Collection",
        description: collectionData.description || null,
        image: collectionData.image || null,
      },
    });
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
