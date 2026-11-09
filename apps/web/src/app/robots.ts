import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: site.demo ? undefined : "/",
        disallow: site.demo ? "/" : ["/api/", "/demo/"],
      },
    ],
    sitemap: site.demo ? undefined : `${site.url}/sitemap.xml`,
  };
}
