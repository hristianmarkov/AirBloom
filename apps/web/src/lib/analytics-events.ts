import { articles } from "./articles";
import { resources } from "./resources";

export type AnalyticsEventName =
  | "article_view"
  | "template_download"
  | "worksheet_open"
  | "print_template"
  | "resource_next_click"
  | "waitlist_open"
  | "waitlist_signup_success"
  | "waitlist_signup_error";

export type AnalyticsEvent = {
  event: AnalyticsEventName;
  page_id: string;
  asset_id?: string;
};

const eventNames = new Set<string>([
  "article_view", "template_download", "worksheet_open", "print_template",
  "resource_next_click", "waitlist_open", "waitlist_signup_success", "waitlist_signup_error",
]);
const articlePaths = new Set(articles.map(article => `/journal/${article.slug}`));
const documentPaths = new Set([
  "/", "/journal", "/resources", "/about", "/editorial-policy",
  "/authors/airbloom-editorial-team", "/privacy", ...articlePaths,
]);
const assetIds = new Set(resources.map(resource => resource.id));
const editablePaths = new Map(
  resources.flatMap(resource => resource.editable ? [[resource.editable, resource.id] as const] : []),
);
const assetEvents = new Set(["template_download", "worksheet_open", "print_template"]);

// Reject unexpected properties rather than silently dropping potentially sensitive data.
export function parseAnalyticsEvent(input: unknown): AnalyticsEvent {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid event.");
  const object = input as Record<string, unknown>;
  if (Object.keys(object).some(key => !["event", "page_id", "asset_id"].includes(key))) {
    throw new Error("Unexpected event field.");
  }
  if (
    typeof object.event !== "string" || !eventNames.has(object.event) ||
    typeof object.page_id !== "string" ||
    (!documentPaths.has(object.page_id) && !editablePaths.has(object.page_id)) ||
    ("asset_id" in object && (typeof object.asset_id !== "string" || !assetIds.has(object.asset_id)))
  ) throw new Error("Unknown event identifier.");
  const event = object.event as AnalyticsEventName;
  const page_id = object.page_id;
  const asset_id = object.asset_id as string | undefined;
  if (assetEvents.has(event) && !asset_id) throw new Error("An asset is required.");
  if (event === "article_view" && !articlePaths.has(page_id)) throw new Error("An article is required.");
  if (event === "print_template" && editablePaths.get(page_id) !== asset_id) {
    throw new Error("A matching printable worksheet is required.");
  }
  if (event.startsWith("waitlist_") && (!documentPaths.has(page_id) || asset_id !== undefined)) {
    throw new Error("Invalid waitlist event.");
  }
  if (event === "article_view" && asset_id !== undefined) throw new Error("Unexpected article asset.");
  return { event, page_id, ...(asset_id === undefined ? {} : { asset_id }) };
}

export const MAX_EVENT_BYTES = 512;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const requestUrl = new URL(request.url);
  const allowed = new Set([requestUrl.origin]);
  // Next's local bind address can differ from the browser's Host header.
  const host = request.headers.get("host");
  if (host && /^[a-zA-Z0-9.:[\]-]+$/.test(host)) allowed.add(`${requestUrl.protocol}//${host}`);
  return allowed.has(origin);
}

// Logging consists only of allowlisted event/page/asset counts. No IDs, IPs, cookies,
// query strings, referrers, form values, or symptom records are read or retained here.
export async function receiveAnalyticsEvent(
  request: Request,
  options: { enabled: boolean; write?: (entry: string) => void },
): Promise<Response> {
  const headers = { "Cache-Control": "no-store" };
  const fail = (status: number) => new Response(null, { status, headers });
  if (!sameOrigin(request)) return fail(403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return fail(415);
  }
  const length = request.headers.get("content-length");
  if (length && /^\d+$/.test(length) && Number(length) > MAX_EVENT_BYTES) return fail(413);
  let event: AnalyticsEvent;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_EVENT_BYTES) {
        await reader.cancel();
        return fail(413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    event = parseAnalyticsEvent(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
  } catch {
    return fail(400);
  }
  if (options.enabled) {
    (options.write ?? console.info)(JSON.stringify({ channel: "site_engagement", ...event, count: 1 }));
  }
  return new Response(null, { status: 204, headers });
}
