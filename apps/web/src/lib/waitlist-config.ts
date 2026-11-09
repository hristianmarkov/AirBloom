const keys = ["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY"] as const;

// Resolve at request time, using the same lookup for health checks and writes.
export function getWaitlistConfig(env: Record<string, string | undefined> = process.env) {
  const values = keys.map(key => env[key]?.trim() ?? "");
  return { endpoint: values[0], secret: values[1], missing: keys.filter((_, index) => !values[index]) };
}
