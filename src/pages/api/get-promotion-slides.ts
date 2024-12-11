// src/pages/api/get-promotion-slides.ts
import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const slidesSnapshot = await db.collection("PromotionSlides").get();
    const slides = slidesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ slides });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching slides:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export default handler;
