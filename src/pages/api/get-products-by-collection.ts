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
    console.log("Fetching products for collection:", collection);

    // Query Firestore for products where the `collection` field matches the given collectionSlug
    const productsSnapshot = await db
      .collection("Products")
      .where("collection", "==", collection)
      .get();

    console.log("Query executed. Matching documents count:", productsSnapshot.size);

    if (productsSnapshot.empty) {
      console.warn("No products found for collection:", collection);
      return res.status(404).json({ products: [] });
    }

    // Map products to an array
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Products found:", products);

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export default handler;
