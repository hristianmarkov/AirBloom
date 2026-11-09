# Independent marketing site, shared product direction

```text
Search / social / visitors
          |
          v
Next.js marketing website on Vercel
  | static homepage, journal, FAQ, metadata
  | browser signup dialog
  v
POST /api/waitlist (Node server)
  | validation, origin checks, bounded payload, basic rate limits
  | private shared secret (server only)
  v
Google Apps Script receiver
  | auth, script lock, deduplication, quota
  v
Owner's Google Sheet: Waitlist / Removal requests

Future Flutter iOS + Android app (not implemented)
          |
          v
Supabase Auth / RLS Postgres / private Storage / privileged workers
```

## Decisions

- Next.js App Router and static generation deliver actual HTML to crawlers. Interactive JavaScript is limited to navigation, signup, and removal forms. Journal content is typed source data, easy to move to a content platform when editorial volume warrants it.
- The marketing site is not a Flutter web build. It has its own deployment lifecycle and can publish articles independently of mobile releases.
- The website has no authentication, billing, health questionnaires, or AI chat. The app screens are carefully labeled visual concepts, not a working app or validated forecast.
- Google Sheets is the requested destination for waitlist emails. A server mediator keeps the shared secret out of the frontend. Signup confirmation requires an affirmative receiver response after a flushed Sheet write.
- No speculative medical prediction is implemented. The product plan's clinical validation requirements remain future app work. No fictional rating is emitted as structured data.
- Supabase is reserved for authenticated app data; the only migration included is an owner-protected profile foundation. Health-record schema and workers are separate future milestones.
- Site mode is a build-time setting. Internal demonstrations contain fictional social proof and block indexing. Public mode hides that content. Avoid changing the mode without rebuilding and reviewing the resulting site.

## Next milestones

1. Owner-authorized Google receiver deployment and Vercel preview; verify a real write.
2. Final brand/domain, operator details, reviewed editorial content, and public waitlist controls.
3. Flutter app scaffold and consent-first authentication; Supabase ownership tests.
4. Symptom records and history, then editable ENT summaries with private export/sharing.
5. Companion and qualitative insights, with explicit source provenance and consent.
6. Any numeric outlook only after the product plan's prospective validation gates.
