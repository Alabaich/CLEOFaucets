// app/search/page.tsx (Server Component)
import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

// You can optionally define any server-only metadata, but 
// you said you don't want metadata for this page,
// so we won't define generateMetadata or export metadata here.

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
