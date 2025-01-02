import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";

const db = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const searchTerm = query.toString().toLowerCase();
    const searchTerms = searchTerm.split(/\s+/); // Split query into individual words

    // Fetch all products
    const productsRef = db.collection("Products");
    const snapshot = await productsRef.get();

    const results = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) => {
        const title = product.title?.toLowerCase() || "";
        const sku = product.sku?.toLowerCase() || "";

        const variants = product.variants || []; // Variants array

        const matchingVariants = variants.filter((variant: any) => {
          const variantSku = variant.sku?.toLowerCase() || "";
          return variantSku.includes(searchTerm);
        });

        // Check if all words in the search term are present in the title
        const matchesTitle = searchTerms.every((term) => title.includes(term));

        // Check if SKU or variants match the search term
        return matchesTitle || sku.includes(searchTerm) || matchingVariants.length > 0;
      });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
