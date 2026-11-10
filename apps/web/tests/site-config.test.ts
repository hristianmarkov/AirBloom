import { test } from "node:test";
import assert from "node:assert/strict";
import { productionOrigin, resolveSiteConfig } from "../src/lib/site-config";

test("local development remains a private demo", () => {
  assert.deepEqual(resolveSiteConfig({}), {
    demo: true,
    url: "http://localhost:3000",
  });
});
test("production uses the AirBloom domain even when Vercel supplies an old host", () => {
  assert.deepEqual(
    resolveSiteConfig({
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "findease.vercel.app",
      VERCEL_URL: "findease-random.vercel.app",
    }),
    { demo: false, url: productionOrigin },
  );
});
test("preview deployments remain non-indexed and never become canonical hosts", () => {
  assert.deepEqual(
    resolveSiteConfig({
      VERCEL_ENV: "preview",
      VERCEL_URL: "preview.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "findease.vercel.app",
    }),
    { demo: true, url: productionOrigin },
  );
  assert.deepEqual(
    resolveSiteConfig({
      NEXT_PUBLIC_SITE_MODE: "production",
      SITE_URL: `${productionOrigin}/`,
    }),
    { demo: false, url: productionOrigin },
  );
});
test("public builds reject any incorrect canonical origin", () => {
  for (const SITE_URL of [
    "http://localhost:3000",
    "http://www.airbloom.app",
    "https://airbloom.app",
    "https://findease.vercel.app",
    "https://sinus.example",
    "https://user:password@www.airbloom.app",
    "https://www.airbloom.app/subpath",
    "https://www.airbloom.app/?x=1",
    "https://www.airbloom.app/#section",
  ]) {
    assert.throws(() =>
      resolveSiteConfig({ NEXT_PUBLIC_SITE_MODE: "production", SITE_URL }),
    );
  }
});
