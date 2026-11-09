export function resolveSiteConfig(env: Record<string, string | undefined>) {
  const demo = env.NEXT_PUBLIC_SITE_MODE
    ? env.NEXT_PUBLIC_SITE_MODE !== "production"
    : env.VERCEL_ENV !== "production";
  const hostname = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const rawUrl =
    env.SITE_URL ||
    (hostname ? `https://${hostname}` : "http://localhost:3000");
  const parsed = new URL(rawUrl);
  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(
      "SITE_URL must be a website origin, without credentials, path, query, or fragment.",
    );
  }
  if (
    !demo &&
    (parsed.protocol !== "https:" ||
      ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname))
  ) {
    throw new Error(
      "Public builds require an HTTPS SITE_URL or Vercel's production hostname.",
    );
  }
  return { demo, url: parsed.origin };
}
