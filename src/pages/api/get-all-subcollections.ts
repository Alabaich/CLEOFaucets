import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch all subcollections
    const subcollectionsSnapshot = await db.collection("SubCollections").get();
    const subcollections = subcollectionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ subcollections });
  } catch (error) {
    console.error("Error fetching subcollections:", error);
    return res.status(500).json({ error: "Failed to fetch subcollections" });
  }
};

export default handler;
