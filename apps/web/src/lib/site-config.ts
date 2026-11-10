export const productionOrigin = "https://www.airbloom.app";

export function resolveSiteConfig(env: Record<string, string | undefined>) {
  const demo = env.NEXT_PUBLIC_SITE_MODE
    ? env.NEXT_PUBLIC_SITE_MODE !== "production"
    : env.VERCEL_ENV !== "production";
  const rawUrl =
    env.SITE_URL ||
    (!demo || env.VERCEL_ENV ? productionOrigin : "http://localhost:3000");
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
    !demo && parsed.origin !== productionOrigin
  ) {
    throw new Error(
      `Public builds require SITE_URL=${productionOrigin}. Vercel deployment hostnames are not canonical origins.`,
    );
  }
  return { demo, url: parsed.origin };
}
