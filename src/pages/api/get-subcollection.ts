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

  if (
    !collectionSlug ||
    typeof collectionSlug !== "string" ||
    !subcollectionSlug ||
    typeof subcollectionSlug !== "string"
  ) {
    console.error(
      "Invalid or missing query parameters:",
      collectionSlug,
      subcollectionSlug
    );
    return res.status(400).json({ error: "Invalid or missing query parameters" });
  }

  try {
    console.log("Fetching subcollection for:", { collectionSlug, subcollectionSlug });

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
  } catch (error) {
    console.error("Error fetching subcollection:", error);
    return res.status(500).json({ error: "Failed to fetch subcollection" });
  }
};

export default handler;
