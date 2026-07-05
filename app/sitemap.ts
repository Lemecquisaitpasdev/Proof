import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now, priority: 0.9 },
    ...products.map((p) => ({
      url: `${SITE_URL}/shop/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/story`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/science`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/help`, lastModified: now, priority: 0.5 },
  ];
}
