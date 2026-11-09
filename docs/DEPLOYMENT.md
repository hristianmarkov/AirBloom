# Deployment handoff

## Vercel

The website is ready for a Vercel project, with `apps/web` as its **Root Directory**. The monorepo lockfile is at the repository root. Settings live in `apps/web/vercel.json`: Next.js framework, `cd ../.. && npm ci` installation, and `npm run build` from `apps/web`. Keep Vercel's “Include source files outside of the Root Directory” enabled so npm can see the root lockfile and workspace.

1. Commit and push the reviewed repository to GitHub.
2. Import `hristianmarkov/FindEase` in your authorized Vercel account, selecting `apps/web` as Root Directory.
3. Production deployments now select public mode automatically; previews remain demo/non-indexed. Do not set `NEXT_PUBLIC_SITE_MODE=demo` in Production. Leave `SITE_URL` unset to use Vercel's stable production hostname, or set it to your final HTTPS domain. Redeploy after changing the address.
4. Add `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` securely after following `GOOGLE_SHEETS.md`.
5. For a public release, verify that Deployment Protection is disabled for the production domain so visitors and search engines can reach it. Restrict internal previews separately if desired.
6. Verify homepage, both articles, `/privacy`, app-store dialogs, and an actual Sheet write in the deployed environment.

The tagged service plugins were not exposed as callable tools during initial implementation. Deployment and connection status for the current release is recorded in `LAUNCH_STATUS.md`. Git operations can use the platform's existing HTTPS proxy without a separate token. Vercel account credentials, when needed, must be supplied securely rather than in chat.

## Search and answer-engine launch

The default internal demo intentionally cannot be indexed. Public launch is a separate switch:

- Confirm the brand name and final domain. Set `SITE_URL` to that HTTPS origin.
- The confirmed operator/contact are Leymora Studios and `hello@leymora.com`; review the published retention commitments with the administrator.
- Have the educational content reviewed and update attribution/review dates accurately. Do not invent clinical reviewer identities.
- Set `NEXT_PUBLIC_SITE_MODE=production` and rebuild. Fictional adoption numbers, ratings, and testimonials disappear; robots allows the public pages; the sitemap includes canonical URLs.
- Keep `/demo/` concept screens out of indexing; they remain explicitly marked as previews.
- Verify JSON-LD reflects visible content, Open Graph images load, and article source links work. FAQ markup does not guarantee rich results or AI citations.
- Submit `/sitemap.xml` using the owner's Search Console/Bing accounts when the canonical domain is live. Consider adding original, reviewed educational content over time.
- Validate the live waitlist end to end. Missing receiver configuration returns an error in production rather than a fake success.

## Supabase and future mobile app

The marketing site needs no Supabase credentials and will continue running independently of the future app backend. The supplied plan uses **Flutter for iOS/Android**, and **Supabase for Auth, Postgres, private Storage, and server-side jobs**. That is retained in this architecture.

An initial configuration and profile migration are provided in `infrastructure/supabase`. They have **not** been applied or tested against a running Supabase project. Authentication signup is disabled in the local configuration until the app's consent and identity flow is designed. Profiles enforce `auth.uid() = id` on all user operations and deny anonymous access.

When app development begins, provision a Supabase project in the approved region, review/apply migrations, verify RLS with two distinct users and an anonymous client, and keep service-role credentials server-side. Add health records, consent versioning, private report storage, and ownership constraints as reviewed migrations with security tests. Do not add health data collection to the marketing waitlist.

## Cloud workspace

Use the existing `/workspace/FindEase` checkout. Each cloud task is already isolated; do not create a Git worktree unless explicitly requested.

```sh
cd /workspace/FindEase
npm ci --cache /workspace/.cache/npm
npm test
npm run build
```

Start a fresh process for each task: `npm run dev` for development, or `npm run start` after a build for production behavior. Use internal local requests for readiness. Check for the homepage title, both articles, and the signup API's explicit demo status when no receiver is configured. The Node dependency cache lives outside the repository because this machine's default home cache is not writable. Never assume server processes or runtime credentials survive snapshots.
