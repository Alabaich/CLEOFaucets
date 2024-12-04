/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import * as XLSX from "xlsx";
import admin from "../../../src/utils/firebaseAdmin"; // Firebase Admin SDK

// Custom type for Multer-enhanced request
interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

// Product type for the parsed Excel data
interface Product {
  name: string;
  description: string;
  price: number | string;
  collection: string;
}

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Wrap Multer in a Promise
const multerWrapper = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) => {
    upload.single("file")(req as any, res as any, (err: unknown) => {
      if (err instanceof Error) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const handler = async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Wait for Multer to process the file
    await multerWrapper(req, res);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Parse the uploaded Excel file
    const buffer = req.file.buffer;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const products = XLSX.utils.sheet_to_json<Product>(worksheet);

    // Validate and upload each product
    for (const product of products) {
      if (!product.name || !product.description || !product.price || !product.collection) {
        console.warn("Skipping invalid product row:", product);
        continue;
      }

      // Save the product to Firestore
      await admin
        .firestore()
        .collection("collections")
        .doc(product.collection)
        .collection("products")
        .add({
          name: product.name,
          description: product.description,
          price: Number(product.price),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }

    res.status(200).json({ message: "Products uploaded successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing upload:", error.message);
    } else {
      console.error("Unknown error during upload:", error);
    }
    res.status(500).json({ error: "Failed to process upload" });
  }
};

export default handler;
