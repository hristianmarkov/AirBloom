import { test } from "node:test";
import assert from "node:assert/strict";
import { articles } from "../src/lib/articles";
import { resources } from "../src/lib/resources";
import { MAX_EVENT_BYTES, parseAnalyticsEvent, receiveAnalyticsEvent } from "../src/lib/analytics-events";

const asset = resources.find(resource => resource.editable)!;
const articlePath = `/journal/${articles[0].slug}`;
const valid = { event: "template_download", page_id: "/resources", asset_id: asset.id };
const origin = "https://www.airbloom.app";

function request(body: string, extraHeaders: Record<string, string> = {}) {
  return new Request(`${origin}/api/events`, {
    method: "POST",
    headers: { origin, "content-type": "application/json", ...extraHeaders },
    body,
  });
}

test("events accept only known public pages and resource identifiers", () => {
  assert.deepEqual(parseAnalyticsEvent(valid), valid);
  assert.deepEqual(parseAnalyticsEvent({ event: "article_view", page_id: articlePath }), {
    event: "article_view", page_id: articlePath,
  });
  assert.deepEqual(parseAnalyticsEvent({ event: "print_template", page_id: asset.editable, asset_id: asset.id }), {
    event: "print_template", page_id: asset.editable, asset_id: asset.id,
  });
  for (const input of [
    { ...valid, event: "custom_private_event" },
    { ...valid, page_id: "/unknown-page" },
    { ...valid, page_id: "/resources?email=private@example.com" },
    { ...valid, page_id: "/resources#private-note" },
    { ...valid, asset_id: "private@example.com" },
    { event: "template_download", page_id: "/resources" },
    { event: "article_view", page_id: "/resources" },
    { event: "waitlist_signup_success", page_id: "/", asset_id: asset.id },
    { event: "print_template", page_id: "/resources", asset_id: asset.id },
  ]) assert.throws(() => parseAnalyticsEvent(input));
});

test("unexpected data fields are rejected, never silently stripped", () => {
  for (const field of ["email", "symptoms", "notes", "referrer", "query", "user_id", "ip", "error"]) {
    assert.throws(() => parseAnalyticsEvent({ ...valid, [field]: "private content" }));
  }
  for (const input of [null, [], "template_download", true, 3]) {
    assert.throws(() => parseAnalyticsEvent(input));
  }
});

test("receiver rejects off-site, missing-origin, and unsupported media requests before logging", async () => {
  const logs: string[] = [];
  const options = { enabled: true, write: (entry: string) => logs.push(entry) };
  assert.equal((await receiveAnalyticsEvent(request(JSON.stringify(valid), { origin: "https://other.example" }), options)).status, 403);
  const missingOrigin = new Request(`${origin}/api/events`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(valid) });
  assert.equal((await receiveAnalyticsEvent(missingOrigin, options)).status, 403);
  assert.equal((await receiveAnalyticsEvent(request(JSON.stringify(valid), { "content-type": "text/plain" }), options)).status, 415);
  assert.equal(logs.length, 0);
});

test("receiver enforces body bytes independently of a declared Content-Length", async () => {
  const logs: string[] = [];
  const options = { enabled: true, write: (entry: string) => logs.push(entry) };
  const tooLong = JSON.stringify({ ...valid, notes: "x".repeat(MAX_EVENT_BYTES) });
  assert.equal((await receiveAnalyticsEvent(request(tooLong, { "content-length": "1" }), options)).status, 413);
  assert.equal((await receiveAnalyticsEvent(request(JSON.stringify(valid), { "content-length": "9999" }), options)).status, 413);
  assert.equal((await receiveAnalyticsEvent(request("not json"), options)).status, 400);
  assert.equal(logs.length, 0);
});

test("production log entries contain only the event tuple and count; previews write nothing", async () => {
  const logs: string[] = [];
  const body = JSON.stringify(valid);
  const response = await receiveAnalyticsEvent(request(body, {
    referer: `${origin}/journal/private?email=private@example.com`,
    "x-forwarded-for": "192.0.2.42",
    cookie: "session=private",
  }), { enabled: true, write: entry => logs.push(entry) });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(JSON.parse(logs[0]), { channel: "site_engagement", ...valid, count: 1 });
  assert.doesNotMatch(logs.join(""), /private|192\.0\.2|session|referer|cookie/);
  assert.equal((await receiveAnalyticsEvent(request(body), { enabled: false, write: entry => logs.push(entry) })).status, 204);
  assert.equal(logs.length, 1);
  assert.equal((await receiveAnalyticsEvent(request(JSON.stringify({ ...valid, email: "private@example.com" })), {
    enabled: true, write: entry => logs.push(entry),
  })).status, 400);
  assert.equal(logs.length, 1);
});
