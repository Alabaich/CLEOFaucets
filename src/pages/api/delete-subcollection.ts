import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed. Use DELETE." });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Subcollection ID is required." });
    }

    await db.collection("SubCollections").doc(id).delete();

    res.status(200).json({ message: "Subcollection deleted successfully!" });
  } catch (error) {
    console.error("Error deleting subcollection:", error);
    res.status(500).json({ error: "Failed to delete subcollection." });
  }
};

export default handler;
