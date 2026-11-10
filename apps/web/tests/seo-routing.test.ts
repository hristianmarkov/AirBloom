import { test } from "node:test";
import assert from "node:assert/strict";
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server";
import config from "../next.config";
import { productionOrigin } from "../src/lib/site-config";

test("old production hosts redirect permanently with the full path and query", async () => {
  for (const host of ["findease.vercel.app", "airbloom.app"]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/journal/how-to-keep-a-sinus-symptom-diary?source=organic&topic=sinus`,
      nextConfig: config,
    });
    assert.equal(response.status, 308);
    assert.equal(
      response.headers.get("location"),
      `${productionOrigin}/journal/how-to-keep-a-sinus-symptom-diary?source=organic&topic=sinus`,
    );
  }
});
test("canonical, local and private preview hosts do not redirect", async () => {
  for (const host of ["www.airbloom.app", "airbloom-preview.vercel.app", "localhost", "airbloomXapp"]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/journal?source=qa`,
      nextConfig: config,
    });
    assert.equal(response.headers.get("location"), null);
  }
});
test("download copies are noindex without preventing resource-page indexing", async () => {
  const download = await unstable_getResponseFromNextConfig({
    url: `${productionOrigin}/downloads/sinus-diary.pdf`,
    nextConfig: config,
  });
  assert.equal(download.headers.get("x-robots-tag"), "noindex");
  const resource = await unstable_getResponseFromNextConfig({
    url: `${productionOrigin}/resources`,
    nextConfig: config,
  });
  assert.equal(resource.headers.get("x-robots-tag"), null);
});
