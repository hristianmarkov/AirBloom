# Validation — November 9, 2026

- `npm test`: 12 tests passed. Covers signup validation, rate limiting, receiver authentication, duplicate handling, platform merging, consent, and removal requests. Apps Script is exercised against a mocked Sheets API.
- Production `npm run build`: passed, including TypeScript and all static pages.
- `TEST_PUBLIC=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`: 16 tests passed. Covers desktop/mobile homepage and articles, no horizontal overflow, both device-specific store buttons, popup submission payloads and focus restoration, error behavior, public crawl metadata, the real unconfigured API, privacy requests, navigation, tour keyboard operation, and the blog sidebar.
- Desktop/mobile screenshots were captured and inspected. Five app concept screenshots were saved at 3× resolution in `apps/web/public/app-previews`. Regenerate with a local server on port 3000 and `npm run capture --workspace @sinus/web`.
- Initial live Vercel deployment reached READY and homepage returned HTTP 200 through the Vercel connector.
- Google Drive verified the requested spreadsheet and read back the prepared Waitlist headers. This is not an end-to-end signup write. Receiver deployment and Vercel configuration remain required; see `GOOGLE_SHEETS.md` and `LAUNCH_STATUS.md`.

No real-user analytics, clinical review, or mobile-app build was performed. Supabase source artifacts have not been applied to a database.
