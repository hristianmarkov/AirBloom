import { test } from "node:test";
import assert from "node:assert/strict";
import { GET, POST } from "../src/app/api/waitlist/route";

test("POST reads the same runtime settings as GET and emits redacted traceable errors", async () => {
  const originalFetch = globalThis.fetch;
  const originalLog = console.error;
  const original = { url: process.env.GOOGLE_SHEETS_WEBHOOK_URL, secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET };
  const logs: string[] = [];
  console.error = value => logs.push(String(value));
  const request = () => new Request("https://findease.vercel.app/api/waitlist", { method: "POST", headers: { origin: "https://findease.vercel.app", "content-type": "application/json" }, body: JSON.stringify({ email: "private@example.com", consent: true, platform: "android", requestId: "12345678-1234-1234-1234-123456789012" }) });
  try {
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/test/exec";
    process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-private-secret";
    assert.equal((await (await GET()).json()).configured, true);
    globalThis.fetch = async () => Response.json({ ok: true });
    assert.equal((await POST(request())).status, 200);
    globalThis.fetch = async () => Response.json({ ok: false, code: "UNAUTHORIZED" });
    const failure = await POST(request());
    assert.equal(failure.status, 502);
    const body = await failure.json();
    assert.equal(body.code, "SHEET_WRITE_REJECTED");
    assert.equal(failure.headers.get("X-Waitlist-Trace-Id"), body.traceId);
    assert.equal(JSON.parse(logs[0]).receiverCode, "UNAUTHORIZED");
    assert.doesNotMatch(logs.join(""), /private@example.com|test-private-secret/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalLog;
    for (const [key, value] of [["GOOGLE_SHEETS_WEBHOOK_URL", original.url], ["GOOGLE_SHEETS_WEBHOOK_SECRET", original.secret]]) {
      if (value === undefined) delete process.env[key!]; else process.env[key!] = value;
    }
  }
});
