# Public release status

Requested by the owner on November 9, 2026.

## Prepared

- Public-mode website, confirmed operator **Leymora Studios**, contact **hello@leymora.com**.
- Vercel production automatically hides fictional social proof and permits indexing. Previews remain non-indexed by default.
- Canonicals use an explicitly configured HTTPS `SITE_URL` or Vercel's assigned production hostname, never localhost in public mode.
- Google Sheets receiver targets the owner's specified spreadsheet. A live receiver deployment is still required.

## External access

- Published the website source to `hristianmarkov/FindEase`, branch `main`, through the existing platform Git proxy. Initial release commit: `247e572`. This is repository publication, not a hosted website deployment.
- The Vercel plugin was tagged again by the owner, but no Vercel tool was present in the active tool inventory after rechecking.
- Vercel CLI 65.12.1 is available through the npm cache. With writable XDG directories configured, `vercel whoami` reports **Logged out**. No Vercel token, saved login, or project link is configured.
- A fresh HTTPS request to `https://api.vercel.com/v2/user` is denied by the environment proxy (**HTTP 403 CONNECT**). This occurs before Vercel can authenticate the request.
- Google credential metadata contains no configured fields. No owner-authorized Sheet write has been performed.
- Environment-draft reads return `INVALID_ARGUMENT`; an additive request to save the Vercel token requirement also returned `INVALID_ARGUMENT`. Draft persistence is **unconfirmed**; no network change is known to have applied.

## Required connection steps

Expose the authenticated Vercel deployment tools to this session, or securely configure a Vercel token in environment settings as `VERCEL_TOKEN`. Never send the token through chat. For CLI access, allow `api.vercel.com`; allow the resulting production `*.vercel.app` hostname for verification. `vercel.com` may be needed for the normal login flow.

For the specified Google Sheet, deploy the supplied Sheet-bound Apps Script using the owner's Google authorization, then securely configure `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` in the Vercel project. See `GOOGLE_SHEETS.md`. Cloud validation of that receiver needs `script.google.com` and `script.googleusercontent.com` added to the outbound allowlist. The script's private secret must not be posted in chat.

These requirements concern authentication and actual network policy, not permission to publish: the owner has already authorized public deployment. No temporary, expiring deployment is being presented as a permanent production release.

## Verified public build

- `npm test`: 12 tests passed, none skipped.
- Production build with Vercel-style production environment and a representative `.example` hostname: passed, including TypeScript and static page generation. The example hostname was used for local tests only; no public domain has been assigned.
- `TEST_PUBLIC=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`: 14 tests passed, none skipped, against the public-mode production server on desktop and mobile.
- HTTP checks confirmed public crawl rules, five canonical sitemap entries, and no fictional adoption/testimonial content.
- Missing live Sheet configuration correctly returns HTTP 503. Actual Google writes and a deployed Vercel URL remain unverified and incomplete.
