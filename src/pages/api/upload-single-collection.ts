import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import { slugify } from "../../utils/slugify";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
      return res.status(400).json({ error: "Name, description, and image are required." });
    }

    const slug = slugify(name);

    const collectionData = {
      name,
      description,
      image,
      slug,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Create a new document
    const collectionRef = db.collection("Collections").doc();
    await collectionRef.set(collectionData);

    res.status(200).json({ message: "Collection created successfully!", id: collectionRef.id });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to create collection." });
  }
};

export default handler;
