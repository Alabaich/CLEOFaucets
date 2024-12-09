import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Define the structure of SubCollections
interface SubCollection {
  id: string;
  name: string;
  slug: string;
  collections: string[]; // Ensure this matches your Firestore schema
}

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "GET") {
    console.warn("Invalid HTTP method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { collectionSlug } = req.query;

  if (!collectionSlug || typeof collectionSlug !== "string") {
    console.error("Invalid or missing collectionSlug:", collectionSlug);
    return res.status(400).json({ error: "Invalid or missing collection slug" });
  }



  try {
    // Fetch all SubCollections for debugging purposes
    const allSubcollectionsSnapshot = await db.collection("SubCollections").get();
    const allSubcollections: SubCollection[] = allSubcollectionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SubCollection, "id">), // Type assertion for Firestore data
    }));



    // Log collections field for all subcollections

    // Query SubCollections where the collection slug exists in the `collections` array
    const subcollectionsSnapshot = await db
      .collection("SubCollections")
      .where("collections", "array-contains", collectionSlug)
      .get();


    if (subcollectionsSnapshot.empty) {
      console.warn("No subcollections found for slug:", collectionSlug);
      return res.status(404).json({ subcollections: [] });
    }

    // Map matching subcollections
    const subcollections: SubCollection[] = subcollectionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SubCollection, "id">), // Type assertion for Firestore data
    }));


    return res.status(200).json({ subcollections });
  } catch (error) {
    console.error("Error fetching subcollections:", error);
    return res.status(500).json({ error: "Failed to fetch subcollections" });
  }
};

export default handler;
