import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (site.demo) return [];
  return [
    "",
    "/journal",
    "/privacy",
    ...articles.map((a) => `/journal/${a.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    ...(path.startsWith("/journal/") ? { lastModified: "2026-11-09" } : {}),
  }));
}
