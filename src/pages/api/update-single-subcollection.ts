import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import { slugify } from "../../utils/slugify";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed. Use PATCH." });
  }

  try {
    const { id, name, description, image, collections } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Subcollection ID is required." });
    }

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
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Update the document
    const subcollectionRef = db.collection("SubCollections").doc(id);
    const doc = await subcollectionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Subcollection not found." });
    }

    await subcollectionRef.update(subcollectionData);

    res.status(200).json({ message: "Subcollection updated successfully!" });
  } catch (error) {
    console.error("Error updating subcollection:", error);
    res.status(500).json({ error: "Failed to update subcollection." });
  }
};

export default handler;
