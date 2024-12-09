import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { collectionSlug, subcollectionSlug } = req.query;

  try {
    if (collectionSlug && subcollectionSlug) {
      // Fetch a specific subcollection
      if (
        typeof collectionSlug !== "string" ||
        typeof subcollectionSlug !== "string"
      ) {
        return res
          .status(400)
          .json({ error: "Invalid query parameters for specific subcollection" });
      }

      const subcollectionSnapshot = await db
        .collection("SubCollections")
        .where("collections", "array-contains", collectionSlug)
        .where("slug", "==", subcollectionSlug)
        .get();

      if (subcollectionSnapshot.empty) {
        return res.status(404).json({ error: "Subcollection not found" });
      }

      const subcollection = subcollectionSnapshot.docs[0].data();
      return res.status(200).json({ subcollection });
    } else if (collectionSlug) {
      // Fetch all subcollections for a collectionSlug
      if (typeof collectionSlug !== "string") {
        return res
          .status(400)
          .json({ error: "Invalid query parameter for collectionSlug" });
      }

      const subcollectionsSnapshot = await db
        .collection("SubCollections")
        .where("collections", "array-contains", collectionSlug)
        .get();

      const subcollections = subcollectionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({ subcollections });
    } else {
      // Fetch all subcollections
      const subcollectionsSnapshot = await db.collection("SubCollections").get();

      const subcollections = subcollectionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({ subcollections });
    }
  } catch (error) {
    console.error("Error fetching subcollections:", error);
    return res.status(500).json({ error: "Failed to fetch subcollections" });
  }
};

export default handler;
