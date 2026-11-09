import { test } from "node:test";
import assert from "node:assert/strict";
import { GET, POST } from "../src/app/api/waitlist/route";

test("POST reads the same runtime settings as GET and emits redacted traceable errors", async () => {
  const originalFetch = globalThis.fetch;
  const originalLog = console.error;
  const original = { url: process.env.SUPABASE_URL, secret: process.env.SUPABASE_PUBLISHABLE_KEY };
  const logs: string[] = [];
  console.error = value => logs.push(String(value));
  const request = () => new Request("https://findease.vercel.app/api/waitlist", { method: "POST", headers: { origin: "https://findease.vercel.app", "content-type": "application/json" }, body: JSON.stringify({ email: "private@example.com", consent: true, platform: "android", requestId: "12345678-1234-1234-1234-123456789012" }) });
  try {
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PUBLISHABLE_KEY = "test-private-secret";
    assert.equal((await (await GET()).json()).configured, true);
    globalThis.fetch = async () => Response.json({ ok: true });
    assert.equal((await POST(request())).status, 200);
    globalThis.fetch = async () => Response.json({ code: "42501" }, { status: 403 });
    const failure = await POST(request());
    assert.equal(failure.status, 502);
    const body = await failure.json();
    assert.equal(body.code, "SUPABASE_HTTP_ERROR");
    assert.equal(failure.headers.get("X-Waitlist-Trace-Id"), body.traceId);
    assert.equal(JSON.parse(logs[0]).upstreamStatus, 403);
    assert.doesNotMatch(logs.join(""), /private@example.com|test-private-secret/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalLog;
    for (const [key, value] of [["SUPABASE_URL", original.url], ["SUPABASE_PUBLISHABLE_KEY", original.secret]]) {
      if (value === undefined) delete process.env[key!]; else process.env[key!] = value;
    }
  }
});
