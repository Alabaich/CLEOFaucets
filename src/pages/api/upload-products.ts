import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { slugify } from "../../utils/slugify";

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
      .webp()
      .toBuffer();

    const fileName = `${folder}/${uuidv4()}.webp`;
    const file = storageBucket.file(fileName);

    await file.save(webpBuffer, { metadata: { contentType: "image/webp" } });
    await file.makePublic();

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
      return res.status(400).json({ error: "No file uploaded. Please try again." });
    }

    const filePath = file.path;
    const products: ProcessedProduct[] = await processCSV(filePath);

    for (const product of products) {
      const { sku, title, description, collection, tags, images, variants } = product;

      // Generate slug for collection
      const collectionSlug = slugify(collection);

      // Generate slug for the product
      const productSlug = slugify(title);

      // Ensure Collection exists or create it
      const collectionRef = db.collection("Collections").doc(collectionSlug);
      const collectionDoc = await collectionRef.get();
      if (!collectionDoc.exists) {
        await collectionRef.set({ name: collection, slug: collectionSlug });
      }

      // Ensure SubCollections exist and create/update them
      for (const tag of tags) {
        const tagSlug = slugify(tag);
        const subCollectionRef = db.collection("SubCollections").doc(tagSlug);
        const subCollectionDoc = await subCollectionRef.get();

        if (!subCollectionDoc.exists) {
          await subCollectionRef.set({
            name: tag,
            slug: tagSlug,
            collections: [collectionSlug],
          });
        } else {
          const existingCollections = subCollectionDoc.data()?.collections || [];
          if (!existingCollections.includes(collectionSlug)) {
            await subCollectionRef.update({
              collections: admin.firestore.FieldValue.arrayUnion(collectionSlug),
            });
          }
        }
      }

      const processedImages = await Promise.all(images.map((img) => uploadImageToStorage(img, "products")));
      const processedVariants = await Promise.all(
        variants.map(async (variant) => {
          const processedVariantImages = await Promise.all(variant.images.map((img) => uploadImageToStorage(img, "variants")));
          return { ...variant, images: processedVariantImages };
        })
      );

      const productRef = db.collection("Products").doc(sku);
      await productRef.set({
        title,
        slug: productSlug, // Add the product slug
        description,
        collection: collectionSlug,
        tags: tags.map((tag) => slugify(tag)),
        images: processedImages,
        variants: processedVariants,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Products uploaded and saved to Firestore successfully" });
  } catch (error: any) {
    console.error("Error processing upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;

