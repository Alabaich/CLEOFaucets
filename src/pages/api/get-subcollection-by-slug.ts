import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subcollectionSlug } = req.query;

  if (!subcollectionSlug || typeof subcollectionSlug !== "string") {
    return res.status(400).json({ error: "Invalid or missing subcollectionSlug" });
  }

  try {


    // Query for the subcollection using only its slug
    const snapshot = await db
      .collection("SubCollections")
      .where("slug", "==", subcollectionSlug)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Subcollection not found" });
    }

    const subcollectionDoc = snapshot.docs[0];
    const subcollectionData = { id: subcollectionDoc.id, ...subcollectionDoc.data() };

    res.status(200).json({ subcollection: subcollectionData });
  } catch (error) {
    console.error("Error fetching subcollection:", error);
    res.status(500).json({ error: "Failed to fetch subcollection" });
  }
};

export default handler;
