// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import admin from "@/utils/firebaseAdmin";

// Helper to convert Firestore timestamps to ISO dates.
function toISODate(timestamp: any): string {
  if (!timestamp) return new Date().toISOString();
  if (timestamp.toDate) return timestamp.toDate().toISOString();
  if (timestamp._seconds !== undefined) {
    const ms = timestamp._seconds * 1000 + (timestamp._nanoseconds || 0) / 1e6;
    return new Date(ms).toISOString();
  }
  return new Date().toISOString();
}

// Helper to build one <url> XML element.
function buildUrlElement(loc: string, lastmod?: string): string {
  return `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod || new Date().toISOString()}</lastmod>
</url>`;
}

export async function GET() {
  try {
    const db = admin.firestore();

    // Fetch your Firestore data in parallel.
    const [blogsSnap, productsSnap, collectionsSnap, subCollectionsSnap] = await Promise.all([
      db.collection("Blogs").get(),
      db.collection("Products").get(),
      db.collection("Collections").get(),
      db.collection("SubCollections").get(),
    ]);

    // Define your production domain.
    const domain = "https://cleofaucet.ca";
    const urls: string[] = [];

    // Process Blogs – assuming they have a slug field or using document ID.
    blogsSnap.docs.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      const lastmod = toISODate(data.updatedAt || data.createdAt);
      urls.push(buildUrlElement(`${domain}/blog/${slug}`, lastmod));
    });

    // Process Products.
    productsSnap.docs.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      const lastmod = toISODate(data.updatedAt || data.createdAt);
      urls.push(buildUrlElement(`${domain}/products/${slug}`, lastmod));
    });

    // Process Collections.
    collectionsSnap.docs.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      const lastmod = toISODate(data.updatedAt || data.createdAt);
      urls.push(buildUrlElement(`${domain}/collections/${slug}`, lastmod));
    });

    // Process SubCollections.
    subCollectionsSnap.docs.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      const lastmod = toISODate(data.updatedAt || data.createdAt);
      urls.push(buildUrlElement(`${domain}/subcollections/${slug}`, lastmod));
    });

    // Construct the final XML sitemap.
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new NextResponse(sitemapXML, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
