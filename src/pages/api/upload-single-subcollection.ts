import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import { slugify } from "../../utils/slugify";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { name, description, image, collections } = req.body;

    if (!name || !description || !image || !collections) {
      return res.status(400).json({
        error: "Name, description, image, and associated collections are required.",
      });
    }

    const slug = slugify(name);

    const subcollectionData = {
      name,
      description,
      image,
      slug,
      collections,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Create a new document
    const subcollectionRef = db.collection("SubCollections").doc();
    await subcollectionRef.set(subcollectionData);

    res.status(200).json({ message: "Subcollection created successfully!", id: subcollectionRef.id });
  } catch (error) {
    console.error("Error creating subcollection:", error);
    res.status(500).json({ error: "Failed to create subcollection." });
  }
};

export default handler;
