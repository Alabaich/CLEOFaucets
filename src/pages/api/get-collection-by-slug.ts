import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    // Query collection by slug
    const collectionsSnapshot = await db.collection("Collections").where("slug", "==", slug).get();

    if (collectionsSnapshot.empty) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const collectionDoc = collectionsSnapshot.docs[0];
    const collectionData = {
      id: collectionDoc.id,
      ...collectionDoc.data(),
    };

    res.status(200).json(collectionData);
  } catch (error) {
    console.error("Error fetching collection by slug:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
};

export default handler;
