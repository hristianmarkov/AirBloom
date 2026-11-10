# AirBloom SEO and AEO implementation

The November 10, 2026 playbook is implemented as one delivery, with no staged release schedule. Its merge decisions are retained so one useful page owns each search task. Historic “defer” labels in the coverage register describe the supplied audit, not a queue waiting for a later phase. Production release and live checks are handled separately from source preparation; record deployment evidence below rather than treating a successful build as a live-site result.

## Scope and provenance

The supplied playbook contains all 50 briefs. Despite the earlier conversation summary saying all 50 manuscripts were finished, the uploaded Word manuscript contains drafts 1–35. Drafts 36–50 were completed from the corresponding playbook briefs during this implementation. The workbook is the supplied two-week diary, with a blank tab and fictional example; additional resources are original assets based on the briefs. The repository does not contain copies of the full uploaded Word documents or private chat.

The resulting journal has 38 owning pages: the four existing guides plus 34 new pages. Sixteen briefs are incorporated into their designated owners rather than published as competing standalone URLs. All 50 are accounted for in [topic-coverage.csv](seo-aeo/topic-coverage.csv), including owner fragments, target queries and manuscript provenance. The journal links to all 38 owners. All health material remains explicitly **not clinically reviewed**; no personal reviewer, credentials, approval or review date has been invented.

The source implementation covers the www canonical origin and scoped legacy-host redirects; prerendered journal and resource pages; per-page dates, descriptions, direct answers and structured data; source-linked typed tables; topic-based related links; About, Editorial Policy and editorial attribution; generated sitemap/robots/llms discovery; printable PDFs, browser worksheets and editable sheets; and first-party aggregate engagement events. Preserve the existing in-development product description and fictional-example disclosures. None of these changes establishes a search ranking, indexing decision or answer-engine citation.

## Run the executable acceptance checks

From the repository root, use the existing project checks, then record live HTTP evidence after deployment:

```sh
npm run typecheck
npm test
npm run build
python docs/seo-aeo/check-launch.py --output /tmp/airbloom-launch-evidence.json
```

The HTTP checker reads the current article and resource registries when available; [launch-targets.json](seo-aeo/launch-targets.json) is a reviewable snapshot and fallback. It checks every public page and listed asset, journal links in initial HTML, exact public sitemap membership, canonical/OG origin, robots/llms discovery, asset signatures, image response, 404, demo noindex and an old-host path/query redirect. It writes observation time, checks and failures and exits nonzero on failures. It does not submit indexing requests or access private accounts. A network/authentication error is evidence of a blocked probe, not evidence that a page passed.

For local public-mode QA while preserving production metadata:

```sh
python docs/seo-aeo/check-launch.py --origin http://localhost:3000 --old-origin '' --output /tmp/airbloom-local-evidence.json
```

Follow [launch-evidence-checklist.md](seo-aeo/launch-evidence-checklist.md) for interactive worksheets, mobile, print, waitlist and account-backed checks that an HTTP probe cannot establish. Save actual evidence paths or URLs and dates. No production check is marked complete in these documents merely because its implementation exists.

## Work that needs people or authenticated services

These are current dependencies, not phased work:

| Task | Concrete next action | Evidence still needed |
| --- | --- | --- |
| Production release | Application commit `61200c7` deployed to the existing Vercel project and reached READY; canonical origin and both host redirects verified | Complete; evidence and verification limits are recorded below |
| Search Console | Owner confirms the site is already set up; use authorized access to submit `https://www.airbloom.app/sitemap.xml` and inspect representative URLs | Actual property inspection, submission receipt and selected canonical; browser access is currently blocked |
| Bing Webmaster Tools | Use an authorized account to verify/import the site and submit the corrected sitemap | Property access, submission result, crawl/index and AI Performance data when available |
| IndexNow | Configure a domain-controlled key if using the service, then submit changed canonical public URLs | Hosted key verification and actual submission response; no submission is assumed |
| Native Google Sheets diary | Review the prepared private template and decide its public copy/share permissions | Owner-approved public copy link and a signed-out access test; do not expose the separate waitlist spreadsheet |
| Clinical review | Assign an appropriate ENT/primary-care clinician; pharmacist for product/medicine text; surgical reviewer for postoperative material | Named person, credentials, date, exact scope and approved changes in the review register |
| Instrument permissions | Use the official SNOT licensing route before reproducing any questionnaire items or scoring tool | Written permission/terms if reproduction is proposed; current guide reproduces neither |
| Product/privacy evidence | Confirm released features, actual privacy data flows and any dated product-comparison tests before claiming them | Versioned product evidence; future app controls remain undescribed where unverified |
| Field performance | Run mobile PageSpeed on home/journal/a guide, then inspect real field data when enough exists | Dated reports and field p75 LCP/INP/CLS, separate from local screenshots |
| Citation benchmark | Execute the exact prompt template in fresh eligible search sessions | Real answer/citation observations, country, engine, date and evidence captures |
| Resource distribution | Review the prepared outreach drafts and choose recipients/authorization | Clinical review where relevant and explicit sending instructions; no outreach has been sent |

The [prepared native Google Sheets diary](https://docs.google.com/spreadsheets/d/15F8LYASXtCgEONnLv5blVQq_3b80kx3aMqF3S2QWuxY/edit) is private and awaits an owner sharing decision. Its metadata and bounded cells were verified for the Blank diary, Fictional example and Read me tabs. The connector cannot create general public sharing; the browser fallback failed with “Browser Use could not read requirements” and native input was unavailable through AT-SPI. No public Sheet link was added to the site. The public resource page already offers working XLSX/CSV imports for visitors' own accounts. A privately created template is not a publicly accessible Google Sheet. The owner confirms an existing Google Search Console setup, but browser access/submission could not be completed because of the same browser-control failure. Bing is not set up. Authenticated property actions and private analytics reports remain pending usable owner access. Do not invent DNS values, ownership receipts, selected canonicals or traffic results.

## Review, measurement and distribution

[clinical-source-register.csv](seo-aeo/clinical-source-register.csv) provides a source-to-page register with blank reviewer fields and explicit pending currency checks. Source links are not clinical approval. Record claim scope, jurisdiction and material changes during review; never backdate or manufacture a reviewer. The original playbook requests clinical approval for symptom, treatment, warning-sign, procedure and care-pathway material. Completing the content now does not supply that expertise. Higher-risk or high-traffic content should receive a six-month review interval after approval; other guides an annual interval, sooner when guidance changes.

[measurement.md](seo-aeo/measurement.md) defines the real event payloads, limitations and aggregate-log counting command. Runtime logs are usable evidence, not a durable analytics dashboard or a visitor-level conversion system. Search Console and Bing remain the sources for their own search/citation metrics. [citation-benchmark-template.csv](seo-aeo/citation-benchmark-template.csv) contains the exact 12 unbranded prompts from the playbook and no invented results. [outreach-drafts.md](seo-aeo/outreach-drafts.md) contains unsent review/resource messages only.

## Release evidence

- Source implementation: application commit `61200c7c4f34924694f50955f685f122a5dc077a`, pushed to `hristianmarkov/AirBloom` main.
- Production environment: www `SITE_URL` set; apex permanent redirect and www domain attachment verified.
- Production deployment: `dpl_2hYEVLyi5UaRGceiLxpkj6KupFg3` reached READY and assigned `https://www.airbloom.app`. The immutable deployment is `https://airbloom-5p50qpdqj-hristianmarkov-gmailcoms-projects.vercel.app` (preview-host protection may apply).
- Verification: production build, 23 unit tests and 25 browser tests passed. Three duplicated mobile HTTP matrices were intentionally skipped because they run once on desktop. The complete local HTTP audit passed 479 checks with no failures.
- Live connector acceptance: 76 checks passed with no failures, including all 45 sitemap URLs and 38 journal links, representative new guides and trust pages, host redirects, PDF/HTML/XLSX downloads, social image, correct 404/noindex behavior, and a configured waitlist health response matching the application revision. [release-evidence.json](seo-aeo/release-evidence.json) records the results. No error/fatal runtime log groups were returned for this deployment in the requested one-hour window.
- Verification limit: workspace egress denied direct custom-host requests. Live probes used the Vercel connector, which automatically authenticates; anonymous signed-out reachability was not independently tested. Vercel custom-domain settings permit public access. No real signup was written during this SEO change. Local download checks verified all 41 advertised files and their signatures; live probes sampled each relevant file type.
- Google Search Console: owner confirms setup exists; authenticated inspection/submission blocked by browser-control failure. Bing setup and both sitemap receipts remain pending.
- Clinical approvals: none supplied or obtained.
- Native Google Sheets public sharing: pending owner action; private template only.
- Search, citation and field-performance outcomes: not measured by this source change.
- Fresh SEO-provider checks returned no usable exact-query SERPs or were blocked when automatic approval review hit the account usage limit. No blocked action was bypassed. This delivery uses the supplied November 10 competitor research; see [research-refresh.json](seo-aeo/research-refresh.json).
