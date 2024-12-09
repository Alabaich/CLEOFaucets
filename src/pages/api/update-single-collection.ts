import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import { slugify } from "../../utils/slugify";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed. Use PATCH." });
  }

  try {
    const { id, name, description, image } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Collection ID is required." });
    }

    if (!name || !description || !image) {
      return res.status(400).json({ error: "Name, description, and image are required." });
    }

    const slug = slugify(name);

    const collectionData = {
      name,
      description,
      image,
      slug,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Update the document
    const collectionRef = db.collection("Collections").doc(id);
    const doc = await collectionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Collection not found." });
    }

    await collectionRef.update(collectionData);

    res.status(200).json({ message: "Collection updated successfully!" });
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Failed to update collection." });
  }
};

export default handler;
