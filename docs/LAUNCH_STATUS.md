# Public release status — November 9, 2026

The website is hosted on Vercel at https://findease.vercel.app. Project `findease` in `hristianmarkov-gmailcoms-projects` is linked to `hristianmarkov/FindEase`, with `apps/web` as the root directory. The initial production deployment of `main` commit `41b20c7` reached READY and returned HTTP 200 through the Vercel connector.

## Marketing update

The marketing improvements are described in `MARKETING_REVIEW.md`. Fictional endorsements have been removed entirely. Public builds permit indexing and preview builds remain non-indexed. All mobile screens are labeled as concepts using fictional data.

## Signup blocker

The Google Drive connector verified access to the requested Sheet and prepared its original gid 0 as **Waitlist**, with the five required headers. Vercel currently has no environment variables. The Sheet-bound Apps Script receiver still needs owner-authorized deployment, followed by `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` in Vercel and a redeployment. See `GOOGLE_SHEETS.md`.

The Drive connector cannot deploy Apps Script, and browser access failed. No end-to-end Google signup write has been verified. Production submissions return HTTP 503 until configuration exists; the form does not pretend to save an address. Do not begin paid acquisition until this flow is verified.

## Validation

Production build and TypeScript passed; 12 unit tests and 16 desktop/mobile browser tests passed. The browser tests verify the UI, request payloads, success/error rendering with mocks, and the real unconfigured API. Five 3× app concept screenshots were captured. No released mobile app, clinical effectiveness, search indexing result, or real-user performance result is claimed.
