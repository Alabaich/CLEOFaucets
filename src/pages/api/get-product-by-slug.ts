import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid or missing product slug" });
  }

  try {
    const productSnapshot = await db
      .collection("Products")
      .where("slug", "==", slug)
      .get();

    if (productSnapshot.empty) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productSnapshot.docs[0].data();
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
