# Validation — November 9, 2026

## Passed in this workspace

- `npm test`: **8 tests passed**, none skipped. Runs input-validation and rate-limit checks, confirmed/failing Sheet responses, and the actual Apps Script receiver against a mocked Sheets API. Checks authentication, consent, duplicates, combined platform preferences, and removal requests.
- `npm run build`: **passed**, including TypeScript and static generation of the homepage, journal index, both article pages, privacy notice, and app concept gallery.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`: **14 tests passed**, none skipped, against the production server. Seven scenarios each on desktop Chromium and a mobile viewport: readable homepage/FAQ, both store buttons, selected device and consent submission, confirmation/error states, focus restoration, real unconfigured demo API, invalid origins/consent, article metadata/sources, privacy request flow, and mobile navigation.
- Additional browser capture: **zero runtime/console errors**, no mobile horizontal overflow. Desktop homepage, mobile homepage, an article, and the waitlist dialog were captured and visually inspected.
- Open Graph image request: **HTTP 200**, PNG generated without external font requests.
- Internal-demo `robots.txt`: **Disallow: /**.
- Separate public-mode server-render check: fictional usage/testimonials absent; crawl rules allow public content; sitemap has five URLs using the configured canonical origin; missing Sheet receiver returns **HTTP 503** rather than a saved confirmation.
- Three high-resolution app concept screenshots generated from the actual preview components, saved in `apps/web/public/app-previews`.

## Not verified remotely

- No real email was written to the Google Sheet. Requires the owner-authorized Apps Script deployment and two server environment variables; see `GOOGLE_SHEETS.md`. The current cloud network also denies Google API access. Local receiver mocks are not proof of a real write.
- No Vercel project/deployment or Supabase project was provisioned. The tagged service tools were not callable. Deployment settings and the initial Supabase profile migration are source artifacts only.
- The Supabase migration has not been executed against a database, and mobile apps have not been built. These are future work.
- No GitHub push, live-domain search indexing, Search Console submission, real-user performance measurements, or clinical review was performed.

## Review images

Cloud workspace artifacts:

- `/workspace/artifacts/home-desktop.png`
- `/workspace/artifacts/home-hero.png`
- `/workspace/artifacts/home-mobile.png`
- `/workspace/artifacts/waitlist.png`
- `/workspace/artifacts/article.png`

App concepts can be regenerated with a local server running and `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run capture --workspace @sinus/web`. The live production server in this task runs on port 3000; processes should be restarted in future tasks.
