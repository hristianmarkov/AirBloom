# Daily companion website — November 9, 2026

## Positioning and design

The homepage now starts with the everyday burden of recurring sinus symptoms and shows how the planned app connects a daily outlook, medication routines, personal patterns, and contextual AI conversations. ENT preparation is a supporting feature rather than the lead proposition.

The visual update retains the green/cream brand and adds restrained serif display typography, stronger contrast, more readable body text, new problem/solution sections, four detailed feature demonstrations, an everyday timeline, and planned Free/Premium pricing. The six-screen keyboard-accessible tour now includes treatment logging and an optional follow-up. The journal has four guides and distinct illustrations for daily conditions and routines.

Beta wording is removed outside the existing waitlist dialog. Availability remains accurate as early access; no download, clinical-effectiveness, or adoption evidence is invented. The waitlist popup copy/flow is unchanged. Its external store buttons use early-access labels and still preselect iOS or Android.

## Discovery

Next.js App Router remains the right stack for this website: statically rendered pages and articles expose their text without requiring JavaScript, while small client components handle interaction. Metadata, canonical URLs, Organization/WebSite/WebPage/FAQ/Article/Breadcrumb/Collection structured data, internal links, sitemap, crawl rules, and source-backed direct answers support discovery. There is no special AI ranking guarantee. See `SEO_AEO_REVIEW.md`.

## Product truthfulness

The supplied plan describes a future Flutter/Supabase app. Daily outlook percentages depend on validation; reminders follow an existing care plan, and AI explores recorded history. The website presents planned functionality and clearly illustrative app records. No fabricated testimonials, 12,000-user claim, ratings, or downloadable-app schema was added. Planned prices are $3.99/month or $29.99/year; no subscription is started by joining the waitlist.

## Validation

Production build, TypeScript and 15 unit tests passed. Sixteen desktop/mobile browser tests passed. Browser checks cover responsive layouts, tour keyboard behavior, all four articles, popup platform selection/focus, and success/error handling with mocked form responses. Visual inspection identified and fixed clipped preview content. Supabase waitlist implementation and configuration are unchanged by this marketing update. Live backend submission verification remains a separate previously documented limitation.
