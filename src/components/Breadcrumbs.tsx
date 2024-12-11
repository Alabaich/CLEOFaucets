"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Breadcrumb {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    if (!pathname) return;

    const fetchBreadcrumbs = async () => {
      const pathSegments = pathname.split("/").filter(Boolean);
      const breadcrumbList: Breadcrumb[] = [];

      for (const [index, segment] of pathSegments.entries()) {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");

        // By default, use the slug as the label
        let label = segment.replace(/-/g, " ");

        // Fetch dynamic titles for collection and subcollection slugs
        if (index === 1) {
          // Assuming collections are the second segment
          const res = await fetch(`/api/get-title-by-slug?slug=${segment}&type=collection`);
          const data = await res.json();
          if (res.ok) label = data.title;
        } else if (index === 2) {
          // Assuming subcollections are the third segment
          const res = await fetch(`/api/get-title-by-slug?slug=${segment}&type=subcollection`);
          const data = await res.json();
          if (res.ok) label = data.title;
        }

        breadcrumbList.push({ label: label.charAt(0).toUpperCase() + label.slice(1), href });
      }

      setBreadcrumbs(breadcrumbList);
    };

    fetchBreadcrumbs();
  }, [pathname]);

  if (!breadcrumbs.length) return null;

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ul className="flex items-center space-x-2 text-white flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="inline-flex items-center">
            {index < breadcrumbs.length - 1 ? (
              <Link href={breadcrumb.href} className="text-grey-50 underline">
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="text-gray-50">{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
