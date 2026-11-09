import { test } from "node:test";
import assert from "node:assert/strict";
import { getWaitlistConfig } from "../src/lib/waitlist-config";
import { parseSignup, saveToSupabase, SupabaseWriteError } from "../src/lib/waitlist";

test("health and submit configuration share a runtime lookup and reject blanks", () => {
  const env = { SUPABASE_URL: "  ", SUPABASE_PUBLISHABLE_KEY: " secret " };
  assert.deepEqual(getWaitlistConfig(env).missing, ["SUPABASE_URL"]);
  env.SUPABASE_URL = " https://test.supabase.co ";
  const config = getWaitlistConfig(env);
  assert.deepEqual(config.missing, []);
  assert.equal(config.endpoint, env.SUPABASE_URL.trim());
  assert.equal(config.secret, "secret");
});
