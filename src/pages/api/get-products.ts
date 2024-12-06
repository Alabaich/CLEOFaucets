import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const productsSnapshot = await db.collection("Products").get();
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ products });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export default handler;
