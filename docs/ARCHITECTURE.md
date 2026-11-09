# Marketing website architecture

The discovery website uses Next.js App Router on Vercel. Homepage, journal, privacy page, and metadata are statically rendered. Client components are limited to navigation, product tour, signup and removal forms. Installed font packages are self-hosted. The site does not load an advertising or analytics SDK.

The website is independent from the planned Flutter iOS/Android application. The marketing site does not collect health data or expose a working AI chat; its phone screens use illustrative records. An opt-in mobile health-data flow, integrations, subscriptions, and validated personal outlooks are separate application work.

## Waitlist

Browser signup dialog → server-only POST `/api/waitlist` → Supabase Data API → `public.waitlist` / `public.waitlist_removal_requests`.

The server validates bounded JSON, explicit consent, platform, origin, and honeypot; it also applies basic per-process rate limiting. Insert-only publishable-key access is constrained by database grants and RLS. Public reads, updates and deletes are denied. Google Sheets is archived and receives no new submissions. See `SUPABASE_WAITLIST.md` for table and administrator responsibilities.

## Search and answer discovery

Next.js serves headings, article answers, source citations and structured data in HTML. Canonicals use the stable production domain; preview builds are non-indexed. Sitemap entries derive from the article catalog, and API/demo routes are excluded from crawling. `llms.txt` is supplemental navigation, not a ranking control. See `SEO_AEO_REVIEW.md` for implementation and remaining owner-side Search Console steps.
