import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request received:", req.method);

  if (req.method !== "GET") {
    console.warn("Invalid HTTP method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch all SubCollections
    const subcollectionsSnapshot = await db.collection("SubCollections").get();
    const subcollections = subcollectionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All SubCollections fetched:", subcollections);

    return res.status(200).json({ subcollections });
  } catch (error) {
    console.error("Error fetching all subcollections:", error);
    return res.status(500).json({ error: "Failed to fetch subcollections" });
  }
};

export default handler;
