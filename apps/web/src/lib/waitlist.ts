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

// Short-lived, per-process protection only. Not a distributed rate limiter.
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

export class SupabaseWriteError extends Error {
  constructor(public code: string, public details: Record<string, string | number> = {}) {
    super(code);
    this.name = "SupabaseWriteError";
  }
}

export async function saveToSupabase(
  signup: Signup,
  endpoint: string,
  publishableKey: string,
) {
  const url = new URL(endpoint);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co") || url.pathname !== "/" || url.username || url.password || url.search || url.hash)
    throw new Error("Invalid Supabase endpoint configuration.");
  const removal = signup.action === "removal-request";
  url.pathname = `/rest/v1/${removal ? "waitlist_removal_requests" : "waitlist"}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(removal ? {
      email: signup.email,
      request_id: signup.requestId,
    } : {
      email: signup.email,
      platform: signup.platform,
      consent: signup.consent,
      consent_version: "beta-v1",
      request_id: signup.requestId,
    }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
    redirect: "error",
  });
  // Duplicate signups and retried removal requests receive the same acknowledgement.
  // No public SELECT/UPDATE access is needed and existing preferences are preserved.
  if (response.status === 409) {
    const error = await response.json() as { code?: string };
    if (error.code === "23505") return;
  }
  if (!response.ok) throw new SupabaseWriteError("SUPABASE_HTTP_ERROR", { upstreamStatus: response.status });
}
