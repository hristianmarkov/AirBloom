import { getWaitlistConfig } from "@/lib/waitlist-config";
import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { allowRequest, parseSignup, saveToSheet, SheetWriteError } from "@/lib/waitlist";
import { site } from "@/lib/site";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

// Report configuration presence only; never expose values or accept writes via GET.
export async function GET() {
  const { missing } = getWaitlistConfig();
  return NextResponse.json(
    { configured: missing.length === 0, missing, revision: process.env.VERCEL_GIT_COMMIT_SHA ?? "local" },
    { status: missing.length ? 503 : 200, headers },
  );
}

export async function POST(request: Request) {
  const traceId = randomUUID();
  const responseHeaders = { ...headers, "X-Waitlist-Trace-Id": traceId };
  const revision = process.env.VERCEL_GIT_COMMIT_SHA ?? "local";
  function log(event: string, details: Record<string, unknown> = {}) {
    console.error(JSON.stringify({ event, traceId, revision, ...details }));
  }
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin]);
  // Next may bind request.url to 0.0.0.0; browsers use the actual Host.
  const host = request.headers.get("host");
  if (host && /^[a-zA-Z0-9.:[\]-]+$/.test(host))
    allowed.add(`${new URL(request.url).protocol}//${host}`);
  if (process.env.SITE_URL) {
    try {
      allowed.add(new URL(process.env.SITE_URL).origin);
    } catch {}
  }
  if (!origin || !allowed.has(origin))
    return NextResponse.json(
      { error: "Please submit from the website." },
      { status: 403, headers },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json(
      { error: "Expected a JSON request." },
      { status: 415, headers },
    );
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "local";
  const key = createHash("sha256").update(ip).digest("hex");
  if (!allowRequest(key))
    return NextResponse.json(
      { error: "A few too many tries. Please wait a minute." },
      { status: 429, headers: { ...headers, "Retry-After": "60" } },
    );
  let input: unknown;
  try {
    // Enforce the byte limit while streaming, rather than trusting Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 4096) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Request too large." },
          { status: 413, headers },
        );
      }
      chunks.push(chunk.value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json(
      { error: "Please check your signup details." },
      { status: 400, headers },
    );
  }
  let signup;
  try {
    signup = parseSignup(input);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Please check your details." },
      { status: 400, headers },
    );
  }
  if (signup.website) return NextResponse.json({ ok: true }, { headers });
  const { endpoint, secret, missing } = getWaitlistConfig();
  if (missing.length) {
    log("waitlist.configuration_missing", { missing, requestId: signup.requestId });
    if (site.demo)
      return NextResponse.json({ ok: true, demo: true }, { headers });
    return NextResponse.json(
      {
        error:
          "The waitlist is temporarily unavailable. Please try again later.",
        code: "WAITLIST_CONFIG_MISSING",
        traceId,
        revision,
      },
      { status: 503, headers: responseHeaders },
    );
  }
  try {
    await saveToSheet(signup, endpoint, secret);
    return NextResponse.json({ ok: true }, { headers: responseHeaders });
  } catch (error) {
    const code = error instanceof SheetWriteError ? error.code : "SHEET_UNEXPECTED_ERROR";
    log("waitlist.sheet_write_failed", { code, requestId: signup.requestId, ...(error instanceof SheetWriteError ? error.details : {}) });
    return NextResponse.json(
      { error: "We couldn’t save your request. Please try again in a moment.", code, traceId, revision },
      { status: 502, headers: responseHeaders },
    );
  }
}
