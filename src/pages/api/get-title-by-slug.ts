import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

// Define the expected structure of the document data
interface FirestoreDocument {
  slug: string;
  name: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug, type } = req.query;

  if (!slug || typeof slug !== "string" || !type || typeof type !== "string") {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  try {
    let collectionName: string;

    // Determine the collection to query based on the type
    if (type === "collection") {
      collectionName = "Collections";
    } else if (type === "subcollection") {
      collectionName = "SubCollections";
    } else {
      return res.status(400).json({ error: "Invalid type parameter" });
    }

    // Query the collection or subcollection by slug
    const snapshot = await db.collection(collectionName).where("slug", "==", slug).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: `${type} not found` });
    }

    const doc = snapshot.docs[0];
    const data = doc.data() as FirestoreDocument; // Cast to the defined interface

    res.status(200).json({ title: data.name });
  } catch (error) {
    console.error(`Error fetching ${type} by slug:`, error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;
