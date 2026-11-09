import { test } from "node:test";
import assert from "node:assert/strict";
import { allowRequest, parseSignup, saveToSheet } from "../src/lib/waitlist";

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
test("only acknowledges a confirmed Sheet response and sends secrets in the body", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(
        String(url),
        "https://script.google.com/macros/s/test-deployment/exec",
      );
      const body = JSON.parse(options?.body as string);
      assert.equal(body.secret, "test-private-key");
      assert.equal(body.email, "jamie@example.com");
      return Response.json({ ok: true });
    };
    await saveToSheet(
      parseSignup(valid),
      "https://script.google.com/macros/s/test-deployment/exec",
      "test-private-key",
    );
    globalThis.fetch = async () => Response.json({ ok: false });
    await assert.rejects(
      saveToSheet(
        parseSignup(valid),
        "https://script.google.com/macros/s/test-deployment/exec",
        "key",
      ),
    );
    await assert.rejects(
      saveToSheet(parseSignup(valid), "http://example.com/exec", "key"),
    );
  } finally {
    globalThis.fetch = original;
  }
});
