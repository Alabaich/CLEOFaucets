import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request received:", req.method, req.query);

  if (req.method !== "GET") {
    console.warn("Invalid HTTP method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { collectionSlug, subcollectionSlug } = req.query;

  try {
    if (collectionSlug && subcollectionSlug) {
      // Validate query parameters
      if (
        typeof collectionSlug !== "string" ||
        typeof subcollectionSlug !== "string"
      ) {
        console.error(
          "Invalid query parameters for specific subcollection:",
          { collectionSlug, subcollectionSlug }
        );
        return res
          .status(400)
          .json({ error: "Invalid query parameters for specific subcollection" });
      }

      console.log("Fetching specific subcollection:", {
        collectionSlug,
        subcollectionSlug,
      });

      // Query SubCollections with matching collectionSlug and subcollectionSlug
      const subcollectionSnapshot = await db
        .collection("SubCollections")
        .where("collections", "array-contains", collectionSlug) // Match collectionSlug in collections array
        .where("slug", "==", subcollectionSlug) // Match subcollection slug
        .get();

      if (subcollectionSnapshot.empty) {
        console.warn("No matching subcollection found");
        return res.status(404).json({ error: "Subcollection not found" });
      }

      // Extract the first matching subcollection
      const subcollection = subcollectionSnapshot.docs[0].data();
      console.log("Subcollection found:", subcollection);

      return res.status(200).json({ subcollection });
    } else {
      console.log("Fetching all subcollections");

      // Fetch all subcollections
      const subcollectionSnapshot = await db.collection("SubCollections").get();
      const subcollections = subcollectionSnapshot.docs.map((doc) => ({
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
