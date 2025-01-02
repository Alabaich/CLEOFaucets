import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";

const db = admin.firestore();



// 1. Create an interface describing your product fields
interface ProductDoc {
  id: string;
  title?: string;
  sku?: string;
  variants?: Array<{
    sku?: string;
    [key: string]: any;
  }>;
  [key: string]: any; // if there may be other fields
}

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
    const searchTerms = searchTerm.split(/\s+/);

    // Fetch all products
    const productsRef = db.collection("Products");
    const snapshot = await productsRef.get();

    // 2. Map each Firestore doc to a typed ProductDoc
    const allProducts: ProductDoc[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...(data as Omit<ProductDoc, "id">), // spread the rest of the fields
      };
    });

    // 3. Filter the typed products
    const results = allProducts.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const sku = product.sku?.toLowerCase() || "";
      const variants = product.variants || [];

      // Filter variants to see if any variant.sku includes the searchTerm
      const matchingVariants = variants.filter((variant) => {
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
