import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { slugify } from "../../utils/slugify"; // Import your slugify function

// Initialize Firestore and Storage
const db = admin.firestore();
const storageBucket = admin.storage().bucket();

// Function to upload an image to Firebase Storage and convert it to webp
const uploadImageToStorage = async (imageUrl: string, folder: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
      throw new Error(`Invalid image content type: ${contentType}`);
    }

    const webpBuffer = await sharp(Buffer.from(buffer))
      .webp() // Convert to .webp format
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sku, title, description, collection, tags, images, variants } = req.body;

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
    for (const tag of tags as string[]) {
      const tagSlug: string = slugify(tag);
      const subCollectionRef = db.collection("SubCollections").doc(tagSlug);
      const subCollectionDoc = await subCollectionRef.get();

      if (!subCollectionDoc.exists) {
        // Create new subcollection
        await subCollectionRef.set({
          name: tag,
          slug: tagSlug,
          collections: [collectionSlug], // Reference collection slug
        });
      } else {
        // Update existing subcollection to include the new collectionSlug if not already present
        const existingCollections = subCollectionDoc.data()?.collections || [];
        if (!existingCollections.includes(collectionSlug)) {
          await subCollectionRef.update({
            collections: admin.firestore.FieldValue.arrayUnion(collectionSlug),
          });
        }
      }
    }

    // Update tags to use slugs
    const tagSlugs: string[] = (tags as string[]).map((tag) => slugify(tag));

    // Process images for product
    const processedImages = await Promise.all(images.map((img: string) => uploadImageToStorage(img, "products")));

    // Process variants and their images
    const processedVariants = await Promise.all(
      variants.map(async (variant: { sku: string; images: string | string[] }) => {
        const variantImages = Array.isArray(variant.images)
          ? variant.images
          : variant.images.split(",");
        const processedVariantImages = await Promise.all(variantImages.map((img: string) => uploadImageToStorage(img, "variants")));
        return { ...variant, images: processedVariantImages };
      })
    );

    // Check if product already exists
    const productRef = db.collection("Products").doc(sku);
    const productDoc = await productRef.get();

    if (productDoc.exists) {
      // Product exists, update it
      await productRef.update({
        title,
        slug: productSlug, // Add the product slug
        description,
        collection: collectionSlug,
        tags: tagSlugs,
        images: processedImages,
        variants: processedVariants,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: "Product updated successfully!" });
    } else {
      // Product doesn't exist, create it
      await productRef.set({
        title,
        slug: productSlug, // Add the product slug
        description,
        collection: collectionSlug,
        tags: tagSlugs,
        images: processedImages,
        variants: processedVariants,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: "Product uploaded successfully!" });
    }
  } catch (error: any) {
    console.error("Error processing upload:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
