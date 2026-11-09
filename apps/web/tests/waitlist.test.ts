import { test } from "node:test";
import assert from "node:assert/strict";
import { allowRequest, parseSignup, saveToSupabase } from "../src/lib/waitlist";

const valid = {
  email: "  Jamie@Example.com ",
  platform: "ios",
  consent: true,
  requestId: "12345678-1234-1234-1234-123456789012",
};
test("normalizes email and preserves explicit consent and platform", () => {
  const result = parseSignup(valid);
  assert.equal(result.email, "jamie@example.com");
  assert.equal(result.platform, "ios");
  assert.equal(result.action, "signup");
  assert.equal(result.consent, true);
});
test("rejects missing consent, invalid platforms, invalid IDs, and formula-like addresses", () => {
  for (const change of [
    { consent: false },
    { consent: "yes" },
    { platform: "windows" },
    { requestId: "<script>" },
    { email: "not-an-email" },
    { email: "=sum@example.com" },
    { email: "+cmd@example.com" },
    { email: "a@" + "x".repeat(255) + ".com" },
  ])
    assert.throws(() => parseSignup({ ...valid, ...change }));
});
test("allows a removal request without signup consent", () => {
  const result = parseSignup({
    email: "j@example.com",
    action: "removal-request",
    requestId: valid.requestId,
  });
  assert.equal(result.action, "removal-request");
  assert.equal(result.consent, false);
});
test("limits attempts, then expires the request window", () => {
  for (let i = 0; i < 8; i++)
    assert.equal(allowRequest("unit-test-ip", 1000), true);
  assert.equal(allowRequest("unit-test-ip", 1000), false);
  assert.equal(allowRequest("unit-test-ip", 62000), true);
});
test("saves signups and removal requests without exposing or updating stored records", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(String(url), "https://test.supabase.co/rest/v1/waitlist");
      const body = JSON.parse(options?.body as string);
      assert.equal(body.email, "jamie@example.com");
      assert.equal(body.consent_version, "beta-v1");
      assert.equal(body.platform, "ios");
      assert.equal((options?.headers as Record<string,string>).apikey, "test-key");
      assert.equal((options?.headers as Record<string,string>).Prefer, "return=minimal");
      assert.equal(body.website, undefined);
      return new Response(null, { status: 201 });
    };
    await saveToSupabase(parseSignup(valid), "https://test.supabase.co", "test-key");
    globalThis.fetch = async (url, options) => {
      assert.equal(String(url), "https://test.supabase.co/rest/v1/waitlist_removal_requests");
      assert.deepEqual(Object.keys(JSON.parse(options?.body as string)).sort(), ["email", "request_id"]);
      return new Response(null, { status: 201 });
    };
    await saveToSupabase(parseSignup({...valid, action: "removal-request"}), "https://test.supabase.co", "key");
    globalThis.fetch = async () => Response.json({code: "23505"}, {status:409});
    await saveToSupabase(parseSignup(valid), "https://test.supabase.co", "key");
    globalThis.fetch = async () => Response.json({code: "42501"}, {status:403});
    await assert.rejects(saveToSupabase(parseSignup(valid), "https://test.supabase.co", "key"));
    await assert.rejects(saveToSupabase(parseSignup(valid), "http://example.com", "key"));
  } finally { globalThis.fetch = original; }
});
