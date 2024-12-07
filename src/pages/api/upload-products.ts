import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

// Initialize Firestore and Storage
const db = admin.firestore();
const storageBucket = admin.storage().bucket();

// Multer configuration for handling file uploads
const upload = multer({ dest: path.join(process.cwd(), "/tmp") });

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser for file uploads
  },
};

// Function to upload an image to Firebase Storage
const uploadImageToStorage = async (imageUrl: string, folder: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
      throw new Error(`Invalid image content type: ${contentType}`);
    }

    const webpBuffer = await sharp(buffer)
      .webp() // Convert to .webp format
      .toBuffer();

    const fileName = `${folder}/${uuidv4()}.webp`;
    const file = storageBucket.file(fileName);

    await file.save(webpBuffer, { metadata: { contentType: "image/webp" } });
    await file.makePublic(); // Make the file publicly accessible

    return `https://storage.googleapis.com/${storageBucket.name}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image to storage.");
  }
};

// Define row structure
interface CsvRow {
  Type: "Product" | "Variant";
  sku: string;
  Title?: string;
  Tags?: string;
  ProductType?: string;
  description?: string;
  Images?: string;
}

interface ProcessedProduct {
  sku: string;
  title: string;
  description: string;
  collection: string;
  tags: string[];
  images: string[];
  variants: Variant[];
}

interface Variant {
  sku: string;
  images: string[];
}

// Utility function to process CSV and return structured data
const processCSV = async (filePath: string): Promise<ProcessedProduct[]> => {
  const products: ProcessedProduct[] = [];
  let currentProduct: ProcessedProduct | null = null;

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: CsvRow) => {
        try {
          if (row.Type === "Product") {
            if (!row.sku || !row.ProductType) {
              console.warn("Skipping product row due to missing critical fields:", row);
              return;
            }
            if (currentProduct) products.push(currentProduct);

            currentProduct = {
              sku: row.sku,
              title: row.Title || "",
              description: row.description || "",
              collection: row.ProductType || "",
              tags: row.Tags ? row.Tags.split(",").map((tag) => tag.trim()) : [],
              images: row.Images ? row.Images.split(",").map((img) => img.trim()) : [],
              variants: [],
            };
          } else if (row.Type === "Variant" && currentProduct) {
            if (!row.sku) {
              console.warn("Skipping variant row due to missing SKU:", row);
              return;
            }
            currentProduct.variants.push({
              sku: row.sku,
              images: row.Images ? row.Images.split(",").map((img) => img.trim()) : [],
            });
          } else {
            console.warn("Skipping row due to invalid Type or missing parent product:", row);
          }
        } catch (error) {
          console.error("Error processing row:", row, error);
        }
      })
      .on("end", () => {
        if (currentProduct) products.push(currentProduct);
        resolve(products);
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        reject(error || new Error("Unknown error while reading CSV file"));
      });
  });
};

// Main API handler for CSV upload
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the uploaded CSV
    await new Promise<void>((resolve, reject) => {
      upload.single("file")(req as any, {} as any, (err) => {
        if (err) {
          console.error("Error during file upload:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const file = (req as any).file;

    if (!file) {
      console.error("File not uploaded correctly.");
      return res.status(400).json({ error: "No file uploaded. Please try again." });
    }

    const filePath = file.path;

    // Process CSV
    const products: ProcessedProduct[] = await processCSV(filePath);

    // Save Products, Collections, and SubCollections
    for (const product of products) {
      const { sku, title, description, collection, tags, images, variants } = product;

      // Ensure Collection exists or create it
      const collectionRef = db.collection("Collections").doc(collection);
      const collectionDoc = await collectionRef.get();
      if (!collectionDoc.exists) {
        await collectionRef.set({
          name: collection,
          id: collection,
        });
      }

      // Ensure SubCollections exist and create them if needed
      for (const tag of tags) {
        const subCollectionRef = db.collection("SubCollections").doc(tag);
        const subCollectionDoc = await subCollectionRef.get();
        if (!subCollectionDoc.exists) {
          await subCollectionRef.set({
            name: tag,
            id: tag,
            collections: [collection], // Link the subcollection to the collection
          });
        }
      }

      // Process each image URL in the product and variants
      const processedImages = await Promise.all(images.map((imageUrl) => uploadImageToStorage(imageUrl, "products")));
      const processedVariants = await Promise.all(
        variants.map(async (variant) => {
          const processedVariantImages = await Promise.all(variant.images.map((imageUrl) => uploadImageToStorage(imageUrl, "variants")));
          return { ...variant, images: processedVariantImages };
        })
      );

      // Save the product to Firestore
      const productRef = db.collection("Products").doc(sku);

      await productRef.set({
        title,
        description,
        collection,  // Reference to the collection name
        tags,         // Reference to the subcollections (tags)
        images: processedImages, // Save the processed image URLs
        variants: processedVariants,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });


    }

    // Clean up temporary file
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Products uploaded and saved to Firestore successfully" });
  } catch (error: any) {
    console.error("Error processing upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
