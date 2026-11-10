import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (site.demo) return [];
  return [
    ...[
      "",
      "/journal",
      "/resources",
      "/about",
      "/editorial-policy",
      "/authors/airbloom-editorial-team",
      "/privacy",
    ].map((path) => ({ url: `${site.url}${path}` })),
    ...articles.map((article) => ({
      url: `${site.url}/journal/${article.slug}`,
      lastModified: article.modifiedAt,
    })),
  ];
}
