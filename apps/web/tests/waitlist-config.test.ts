import { test } from "node:test";
import assert from "node:assert/strict";
import { getWaitlistConfig } from "../src/lib/waitlist-config";
import { parseSignup, saveToSheet, SheetWriteError } from "../src/lib/waitlist";

test("health and submit configuration share a runtime lookup and reject blanks", () => {
  const env = { GOOGLE_SHEETS_WEBHOOK_URL: "  ", GOOGLE_SHEETS_WEBHOOK_SECRET: " secret " };
  assert.deepEqual(getWaitlistConfig(env).missing, ["GOOGLE_SHEETS_WEBHOOK_URL"]);
  env.GOOGLE_SHEETS_WEBHOOK_URL = " https://script.google.com/macros/s/test/exec ";
  const config = getWaitlistConfig(env);
  assert.deepEqual(config.missing, []);
  assert.equal(config.endpoint, env.GOOGLE_SHEETS_WEBHOOK_URL.trim());
  assert.equal(config.secret, "secret");
});

test("upstream diagnostics classify failures without retaining response bodies or secrets", async () => {
  const original = globalThis.fetch;
  const signup = parseSignup({ email: "private@example.com", consent: true, platform: "ios", requestId: "12345678-1234-1234-1234-123456789012" });
  try {
    for (const [response, code, receiver] of [
      [new Response("private upstream page", { status: 403 }), "SHEET_HTTP_ERROR", undefined],
      [new Response("private login page"), "SHEET_INVALID_RESPONSE", undefined],
      [Response.json({ ok: false, code: "UNAUTHORIZED" }), "SHEET_WRITE_REJECTED", "UNAUTHORIZED"],
      [Response.json({ ok: false, code: "private@example.com" }), "SHEET_WRITE_REJECTED", "UNKNOWN"],
    ] as const) {
      globalThis.fetch = async () => response;
      await assert.rejects(saveToSheet(signup, "https://script.google.com/macros/s/test/exec", "private-secret"), error => {
        assert.ok(error instanceof SheetWriteError);
        assert.equal(error.code, code);
        if (receiver) assert.equal(error.details.receiverCode, receiver);
        assert.doesNotMatch(JSON.stringify(error), /private/);
        return true;
      });
    }
  } finally { globalThis.fetch = original; }
});
