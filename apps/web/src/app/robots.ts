import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: site.demo ? undefined : "/",
        // Public concept screens carry noindex. Let crawlers see that directive.
        // Wildcard access also covers Bing and OAI-SearchBot; avoid bot-specific
        // groups accidentally dropping these private endpoint exclusions.
        disallow: site.demo ? "/" : ["/api/"],
      },
    ],
    sitemap: site.demo ? undefined : `${site.url}/sitemap.xml`,
  };
}
