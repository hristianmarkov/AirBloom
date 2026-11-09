# Discovery and answer-readiness review

## Stack decision

Retain Next.js App Router on Vercel. The marketing and journal routes produce prerendered HTML, while the waitlist uses a server endpoint. Page text, headings, answers, source links, metadata, and structured data are available without waiting for client-side rendering. Changing frameworks would not solve a demonstrated crawl or rendering problem and would add deployment and form-integration risk.

DM Sans and Instrument Serif are self-hosted through installed font packages; no third-party font request is required. Interactive product tours remain client components, with their initial content rendered on the server. This architecture supports good performance, but measured field Core Web Vitals are still required before making performance claims.

## Implemented

- Repositioned root title around a sinusitis tracker and daily support, with large-image and unrestricted snippet previews for public Google indexing.
- Kept existing journal URLs, page canonicals, article metadata, and static route generation.
- Expanded the journal from two guides to four. New discovery pages answer daily symptom-pattern questions and medication routine/reminder questions. They include direct answers, descriptive headings, practical lists, and three supporting source links each.
- Kept clear editorial attribution and publication/update dates; no clinician identity or review was invented.
- Expanded Article data with IDs, category, abstract, citations, and free-access status. Breadcrumbs reflect the actual article title. The journal CollectionPage includes an ItemList of all guides.
- Added more related-article internal links. The journal count derives from content rather than a hardcoded number.
- Shifted journal CTAs and sidebar toward daily outlooks, personal patterns, routines, and contextual AI support. Early-access availability stays accurate.
- Updated Open Graph artwork to the daily-support proposition and restored the installed Instrument Serif font imports.
- Reworked llms.txt as an accurate supplemental page index with concise answers, product availability, and limitations. It is not a search requirement or a promise of citations.
- Retained production crawl access, preview noindex, sitemap, API/demo exclusions, and canonical-origin validation. The sitemap automatically includes every article.

## Content and evidence

The guides distinguish personal observations from clinical conclusions. Medication reminders follow an existing plan; they do not select a treatment or calculate a dose. Environmental context does not become a personal diagnosis or validated symptom forecast. Product previews are illustrative. Fake ratings, testimonial markup, adoption figures, and downloadable-app claims are excluded.

Sources checked November 9, 2026:

- NHS sinusitis: https://www.nhs.uk/conditions/sinusitis-sinus-infection/
- NHS allergic rhinitis: https://www.nhs.uk/conditions/allergic-rhinitis/
- NHS decongestants: https://www.nhs.uk/medicines/decongestants/
- NHS steroids: https://www.nhs.uk/medicines/steroids/
- AirNow AQI basics: https://www.airnow.gov/aqi/aqi-basics/
- NIDCD smell disorders: https://www.nidcd.nih.gov/health/smell-disorders
- Mayo Clinic chronic sinusitis: https://www.mayoclinic.org/diseases-conditions/chronic-sinusitis/diagnosis-treatment/drc-20351667

## AEO expectations and remaining work

Google's current guidance says standard SEO remains relevant for AI Overviews and AI Mode; no special AI schema or text file is required: https://developers.google.com/search/docs/appearance/ai-features . The useful work is crawlable text, focused answers, authoritative sources, descriptive links, and markup consistent with visible content. No ranking, indexation, AI citation, or FAQ rich-result outcome can be guaranteed.

After deployment, confirm the public pages return 200 without an authentication interstitial, verify the production canonical in rendered HTML, and submit the sitemap in Search Console and Bing Webmaster Tools through the owner's accounts. Track indexed pages, search queries, click-through, and completed waitlist submissions. Prioritize original research and qualified clinical review before expanding condition-specific medical claims. Pricing and feature access should stay aligned with the actual release.

## Validation

Next.js metadata and sitemap implementation checked against the installed framework documentation. Final public-mode production build and TypeScript passed. Fifteen unit tests and sixteen desktop/mobile browser tests passed, including all four journal articles. Public robots permit crawling, API/demo paths are excluded, and the sitemap contains seven canonical production URLs. Browser audit found no JavaScript errors or horizontal overflow at 360, 390, 768, and 1280 pixels. App preview layout fixes were visually checked; six updated concept screenshots were exported. Field Core Web Vitals and actual search indexing remain unmeasured.
