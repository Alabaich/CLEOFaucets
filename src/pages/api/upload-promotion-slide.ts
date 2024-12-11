// pages/api/upload-promotion-slide.ts

import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

// Initialize Firestore
const db = admin.firestore();

interface PromotionSlide {
  id: string;
  imageUrl: string;
  link: string;
  createdAt: any; // Firestore Timestamp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { imageUrl, link } = req.body;

    // Basic validation
    if (!imageUrl || !link) {
      return res.status(400).json({ error: "Image URL and link are required." });
    }

    // Create a new document reference with a unique ID
    const slideRef = db.collection("PromotionSlides").doc();

    const slideData: Omit<PromotionSlide, "id"> = {
      imageUrl,
      link,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save slide to Firestore
    await slideRef.set(slideData);

    res.status(200).json({ message: "Promotion slide uploaded successfully!", slideId: slideRef.id });
  } catch (error: any) {
    console.error("Error processing promotion slide upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
