import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tag } = req.query;

  if (!tag || typeof tag !== "string") {
    console.error("Invalid or missing tag:", tag);
    return res.status(400).json({ error: "Invalid or missing tag" });
  }

  try {
    console.log("Fetching products with tag:", tag);

    // Query Firestore for products with the given tag in their `tags` array
    const productsSnapshot = await db
      .collection("Products")
      .where("tags", "array-contains", tag)
      .get();

    console.log("Query executed. Matching documents count:", productsSnapshot.size);

    if (productsSnapshot.empty) {
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
