# Sinus Companion

A calm, editorial marketing website for the Sinus Companion product concept. Built from the supplied product specification; the website is independent of the future Flutter iOS and Android app.

## Run locally

Node 24 and npm are used in this workspace. From the repository root:

```sh
npm ci
cp .env.example apps/web/.env.local
npm run dev
```

Open the local server on port 3000. The root commands target `apps/web`.

```sh
npm test                 # signup validation + Google Apps Script receiver tests
npm run build            # production compilation, types, static pages
npm run start            # serve the production build
npm run test:e2e          # desktop + mobile Chromium flows
```

For browser tests, install Chromium with `cd apps/web && npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium executable. In this cloud instance it is `/usr/bin/chromium`. Browser tests use an already-running local server outside CI. Stop the dev server and run the tests after building to check the production server.

## What is included

- Responsive homepage with bespoke app UI concepts, original CSS illustrations, feature stories, FAQ, internal-demo social proof, and beta CTAs.
- Both App Store and Google Play buttons open an accessible signup dialog with the right platform selected.
- Two full, statically rendered journal articles with direct answers, editorial attribution, references, breadcrumbs, and Article structured data.
- SEO infrastructure: unique titles/descriptions, canonicals, Open Graph image, sitemap, robots, semantic HTML, Organization/FAQ structured data, and a supplementary `llms.txt` file. `llms.txt` is not a guarantee of AI retrieval or ranking.
- Server-only Google Sheets receiver integration, input limits, consent validation, origin checks, basic in-memory rate limits, honeypot, duplicate handling, and removal requests.
- Vercel project settings, GitHub Actions checks, and an initial RLS-protected Supabase profile migration for the future app.

## Internal-demo mode

Local development and Vercel previews default to demo mode. Vercel production deployments automatically select public mode, unless `NEXT_PUBLIC_SITE_MODE` explicitly overrides it. In demo mode the requested 12,000+ users, 4.9 rating, personas, and testimonials are **fictional**, labeled in the UI, and excluded from structured ratings. Search indexing is disabled and the sitemap is empty.

If the Google receiver is unconfigured, the form explicitly states that the address was **not saved**. There is no filesystem, browser-storage, or ephemeral server fallback masquerading as a saved signup.

Public mode removes fictional social proof and enables crawling. A rebuild is required when changing modes. The canonical origin is `SITE_URL` when explicitly set; otherwise Vercel's stable production hostname is used. Public builds reject localhost and non-HTTPS canonicals. Leymora Studios and `hello@leymora.com` are the confirmed public operator and contact. See the [launch instructions](docs/DEPLOYMENT.md).

## Connect the waitlist

The receiver is preconfigured for the Sheet you supplied:

`1H8JpqxDnDcwEtOUaJMsz3CNsqnLDEZNHk7__8VHA0wo`

The live connection needs a one-time Apps Script deployment by the Sheet owner. Follow [Google Sheets setup](docs/GOOGLE_SHEETS.md), then set the two server-only variables from `.env.example`. No Supabase project is needed to run this marketing site.

## Repository map

```text
apps/web/                         Next.js / TypeScript marketing website
  src/app/                        static pages, metadata, signup endpoint
  src/components/                 design system, app concepts, signup dialog
  src/lib/articles.ts             typed article content
  public/app-previews/            generated app concept screenshots
  tests/                          unit/receiver tests + browser flows
infrastructure/google-sheets/     bound Apps Script receiver
infrastructure/supabase/          future app configuration and profile migration
docs/                            architecture, deployment, Google setup
.github/workflows/web.yml         website CI
```

The integration code is tested locally; an actual Google Sheet write still requires the owner-authorized deployment. See [deployment status](docs/LAUNCH_STATUS.md) for completed external operations and outstanding connection requirements.
