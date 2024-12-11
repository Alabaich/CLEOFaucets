import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { collection } = req.query;

  if (!collection || typeof collection !== "string") {
    console.error("Invalid or missing collection:", collection);
    return res.status(400).json({ error: "Invalid or missing collection parameter" });
  }

  try {
    // First, verify the slug exists in the `Collections` collection
    const collectionSnapshot = await db
      .collection("Collections")
      .where("slug", "==", collection)
      .get();

    if (collectionSnapshot.empty) {
      console.warn("Collection not found for slug:", collection);
      return res.status(404).json({ error: "Collection not found" });
    }

    // Query the `Products` collection for matching products
    const productsSnapshot = await db
      .collection("Products")
      .where("collection", "==", collection)
      .get();

    if (productsSnapshot.empty) {
      console.warn("No products found for collection slug:", collection);
      return res.status(404).json({ products: [] });
    }

    // Map products to an array
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export default handler;
