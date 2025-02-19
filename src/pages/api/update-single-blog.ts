import { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";
import { slugify } from "@/utils/slugify";

const db = admin.firestore();

interface BlogUpdatePayload {
  id: string;       // ID of the blog doc in Firestore
  title: string;
  content: string;
  image: string;
  tags: string[];   // array of tag strings
  readingTime: number;
  metaDescription?: string;
  draft?: boolean;  // new field for draft status
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Allow only PUT or PATCH (or POST) for updates
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed. Use PUT or PATCH for updates." });
  }

  try {
    const { id, title, content, image, tags, readingTime, metaDescription, draft } = req.body as BlogUpdatePayload;

    if (!id) {
      return res.status(400).json({ error: "Missing blog ID in request body." });
    }

    // Basic validation
    if (!title || !content || !image) {
      return res.status(400).json({ error: "Title, content, and image are required." });
    }

    const blogRef = db.collection("Blogs").doc(id);
    const blogDoc = await blogRef.get();

    if (!blogDoc.exists) {
      return res.status(404).json({ error: "Blog not found." });
    }

    // If the title changed, we might want to update the slug.
    // Check if the new title is used by another blog
    const oldData = blogDoc.data();
    let newSlug = oldData?.slug;

    if (oldData?.title !== title) {
      const baseSlug = slugify(title);

      // Check if the new slug conflicts with an existing doc
      const duplicateSlugQuery = await db.collection("Blogs").where("slug", "==", baseSlug).get();
      if (!duplicateSlugQuery.empty && duplicateSlugQuery.docs[0].id !== id) {
        // Another doc uses this slug (and it's not the same blog)
        return res.status(400).json({ error: "A blog with a similar title (slug) already exists." });
      }

      newSlug = baseSlug;
    }

    // Prepare data to update, including the new draft field
    const updateData = {
      title,
      content,
      image,
      tags: tags || [],
      readingTime: readingTime || 0,
      slug: newSlug,
      metaDescription,
      draft: draft ?? false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Update the document in Firestore
    await blogRef.update(updateData);

    return res.status(200).json({
      message: "Blog updated successfully!",
      blogId: id,
      slug: newSlug,
    });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default handler;
