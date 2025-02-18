
"use client";

import { usePathname } from "next/navigation";

interface Collection {
  id: string;
  slug: string;
  name: string;
}


const SkipLink = () => {
    const pathname = usePathname() ?? "";

    if (pathname?.startsWith("/admin")) {
        return null;
      }
      

  return (
<a href="#main-content" className="skip-link text-[#000000]">
Skip to main content
</a>


  );
};

export default SkipLink;
