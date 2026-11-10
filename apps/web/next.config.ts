import type { NextConfig } from "next";
import { productionOrigin } from "./src/lib/site-config";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Exact host matching leaves private preview deployments and the www
    // canonical untouched. Next preserves :path* and the original query.
    return ["findease.vercel.app", "airbloom.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: `${productionOrigin}/:path*`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/downloads/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
