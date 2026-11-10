# Public release status — November 10, 2026

AirBloom is live at https://www.airbloom.app. Vercel project `airbloom` is linked to `hristianmarkov/AirBloom`; application commit `61200c7` reached READY in deployment `dpl_2hYEVLyi5UaRGceiLxpkj6KupFg3`. The apex and legacy `findease.vercel.app` hosts permanently redirect with the requested path and query. Production `SITE_URL` is the www origin.

All 50 SEO/AEO briefs are covered by 38 canonical guides. The public resource hub contains 20 resources, including 19 PDF/browser-editable worksheets, matching seven-day spreadsheet/CSV and the original two-week workbook. Trust pages, review disclosures, source links and privacy-limited engagement counts are implemented. The uploaded manuscript contained only drafts 1–35; remaining drafts were completed from the playbook briefs.

The production build, 23 unit tests, 25 browser tests and 479 local HTTP checks passed. Live connector checks passed 76 assertions across representative pages/files, complete sitemap and hub coverage, redirects, noindex/404 behavior and matching waitlist configuration health. No error/fatal log groups were returned for the new deployment in the requested one-hour window. The connector automatically authenticates; signed-out reachability was not independently verified because workspace egress denied direct custom-host requests. No real signup was inserted for this change.

See [the implementation record](SEO_AEO_IMPLEMENTATION.md) and [sanitized release evidence](seo-aeo/release-evidence.json). Search Console exists but account-backed sitemap submission was blocked by browser access; Bing setup, native Sheet public sharing, clinical approval and actual search/citation/field-performance measurements remain outstanding. All guide review labels remain truthful.

## Earlier release history

### November 9, 2026

The website is hosted on Vercel at https://findease.vercel.app. Project `findease` in `hristianmarkov-gmailcoms-projects` is linked to `hristianmarkov/FindEase`, with `apps/web` as the root directory. The initial production deployment of `main` commit `41b20c7` reached READY and returned HTTP 200 through the Vercel connector.

## Marketing update

The marketing improvements are described in `MARKETING_REVIEW.md`. Fictional endorsements have been removed entirely. Public builds permit indexing and preview builds remain non-indexed. All mobile screens are labeled as concepts using fictional data.

## Supabase waitlist — November 9, 2026

The waitlist now uses the FindEase Supabase project (`nzxilhynyjdhtadkniml`, EU Ireland). The `create_marketing_waitlist` migration created RLS-protected `waitlist` and `waitlist_removal_requests` tables. Vercel Production, Preview, and Development have `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` configured. Google Sheets receives no new writes; existing Sheet records were not migrated.

Code commit `77cb318` deployed to production and reached READY. The live `/api/waitlist` health check returned HTTP 200, `configured: true`, `missing: []`, and the matching commit revision.

## Validation

15 unit tests passed and the production build with TypeScript passed. Transactional database tests inserted both a signup and a removal request as the anonymous role, then rolled back the test rows. Permission checks confirmed anonymous and signed-in roles cannot read signup records and anonymous clients cannot update them. Unit tests exercise duplicate acknowledgement, removal payloads, rejected writes, and redacted diagnostics.

Eight focused desktop/mobile browser tests passed for platform payloads, success/error rendering, and removal UI using mocked responses. A live browser-to-Vercel-to-Supabase submission remains unverified: the cloud network policy denies outbound access to the project API and browser automation could not connect.

Supabase advisors reported two pre-existing warnings for the provider-created `public.rls_auto_enable()` event-trigger function's execute grants; no waitlist-table warnings were reported. The function was not changed as part of this integration.
