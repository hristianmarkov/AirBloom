export type Signup = {
  email: string;
  platform: "ios" | "android" | "both";
  consent: boolean;
  website: string;
  requestId: string;
  action: "signup" | "removal-request";
};
export function parseSignup(input: unknown): Signup {
  if (!input || typeof input !== "object")
    throw new Error("Please check your signup details.");
  const data = input as Record<string, unknown>;
  const email =
    typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (
    email.length > 254 ||
    !/^[a-z0-9.!#$%&'*+\/?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(
      email,
    ) ||
    /^[=+\-@]/.test(email)
  )
    throw new Error("Please enter a valid email address.");
  const action =
    data.action === "removal-request" ? "removal-request" : "signup";
  const platform = data.platform || "both";
  if (!["ios", "android", "both"].includes(platform as string))
    throw new Error("Please choose iPhone, Android, or both.");
  if (action === "signup" && data.consent !== true)
    throw new Error("Please agree to receive beta access emails.");
  if (
    typeof data.requestId !== "string" ||
    !/^[a-zA-Z0-9-]{16,64}$/.test(data.requestId)
  )
    throw new Error("Please refresh this page and try again.");
  return {
    email,
    platform: platform as Signup["platform"],
    consent: data.consent === true,
    website: typeof data.website === "string" ? data.website : "",
    requestId: data.requestId,
    action,
  };
}

// Short-lived, per-process protection only. The Sheet receiver also enforces a global quota.
const buckets = new Map<string, { count: number; until: number }>();
export function allowRequest(key: string, now = Date.now()) {
  for (const [id, b] of buckets) if (b.until <= now) buckets.delete(id);
  const bucket = buckets.get(key);
  if (bucket && bucket.count >= 8) return false;
  if (bucket) bucket.count++;
  else if (buckets.size < 10000)
    buckets.set(key, { count: 1, until: now + 60_000 });
  else return false;
  return true;
}

export async function saveToSheet(
  signup: Signup,
  endpoint: string,
  secret: string,
) {
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
  )
    throw new Error("Invalid Google Sheets endpoint configuration.");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...signup, secret, consentVersion: "beta-v1" }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
    redirect: "follow",
  });
  if (!response.ok) throw new Error("Google Sheets receiver unavailable.");
  const result = (await response.json()) as { ok?: boolean };
  if (result.ok !== true)
    throw new Error("Google Sheets did not confirm the write.");
}
