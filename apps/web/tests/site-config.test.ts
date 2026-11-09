import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveSiteConfig } from "../src/lib/site-config";

test("local development remains a private demo", () => {
  assert.deepEqual(resolveSiteConfig({}), {
    demo: true,
    url: "http://localhost:3000",
  });
});
test("Vercel production selects public mode and the stable production hostname", () => {
  assert.deepEqual(
    resolveSiteConfig({
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "sinus-companion.vercel.app",
      VERCEL_URL: "sinus-companion-random.vercel.app",
    }),
    { demo: false, url: "https://sinus-companion.vercel.app" },
  );
});
test("a preview stays non-indexed, and an explicit canonical domain wins", () => {
  assert.equal(
    resolveSiteConfig({
      VERCEL_ENV: "preview",
      VERCEL_URL: "preview.vercel.app",
    }).demo,
    true,
  );
  assert.deepEqual(
    resolveSiteConfig({
      NEXT_PUBLIC_SITE_MODE: "production",
      SITE_URL: "https://sinus.example/",
      VERCEL_PROJECT_PRODUCTION_URL: "fallback.vercel.app",
    }),
    { demo: false, url: "https://sinus.example" },
  );
});
test("public builds reject localhost and unsafe canonical URLs", () => {
  for (const SITE_URL of [
    "http://localhost:3000",
    "http://public.example",
    "https://user:password@example.com",
    "https://example.com/subpath",
    "https://example.com/?x=1",
  ]) {
    assert.throws(() =>
      resolveSiteConfig({ NEXT_PUBLIC_SITE_MODE: "production", SITE_URL }),
    );
  }
});
