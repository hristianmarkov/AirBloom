# Supabase waitlist

Project: FindEase (`nzxilhynyjdhtadkniml`), EU Ireland. Schema applied remotely as `create_marketing_waitlist`; a reference copy is in `infrastructure/supabase/waitlist-schema.sql` (do not reapply to an existing database).

Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` on Vercel and in `apps/web/.env.local`. These settings are read at request time by both GET health checks and POST writes. No service-role credentials are required. Redeploy after changing Vercel settings.

`public.waitlist` stores normalized unique email, platform, explicit consent, consent version, request ID, and creation time. Repeated emails are acknowledged without updating the original record. `public.waitlist_removal_requests` stores email, request ID, and creation time; administrators must process requests within 30 days and apply the published 12-month retention policy. No health data or IP addresses are stored in these tables.

Both tables have RLS enabled. The anonymous API role can insert only the form columns and cannot select, update, or delete records. Administrators review records in the Supabase Table Editor. Server-side validation, honeypot, request size limits, origin checks, and per-process rate limiting remain active. Rate limiting is not distributed and direct Data API inserts are possible with the publishable key; use an Edge Function with dedicated server credentials if stronger abuse controls become necessary.

Google Sheets is now an archived integration and receives no new submissions. Existing Sheet rows have not been migrated.
