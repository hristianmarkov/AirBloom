# Measurement dictionary and operating notes

The implementation sends a bounded first-party POST to `/api/events` in public production mode. It uses no browser storage, cookies, user/session IDs, query strings, referrers, emails, symptom fields, medication details or free text. The server requires same-origin JSON, limits bodies to 512 bytes, rejects extra properties and validates known page/asset identifiers. Preview events are not written. Browser delivery is best effort and blocked requests are not retried into a queue.

The runtime console receives exactly this aggregate event form:

```json
{"channel":"site_engagement","event":"template_download","page_id":"/resources","asset_id":"sinus-symptom-diary","count":1}
```

| Event | Trigger | Allowed identifiers | Interpretation |
| --- | --- | --- | --- |
| `article_view` | Public journal route is entered through the App Router | Known article path | Page entry event; not a unique reader or confirmed full read |
| `template_download` | Reader clicks a known PDF/XLSX/CSV link | Current public page + known asset | Download intent; does not establish completed transfer, opening or use |
| `worksheet_open` | Reader clicks a known browser worksheet link | Current public page + known asset | Worksheet-open intent; no entered values collected |
| `print_template` | Browser worksheet requests printing | Matching worksheet path + asset | Print-dialog intent; does not confirm a completed print or PDF save |
| `resource_next_click` | A related-reading/resource-next link is clicked | Current known public page | Navigation intent; target URL and personal context are not logged |
| `waitlist_open` | Waitlist dialog opens | Known public page | Dialog-open event; no email/platform recorded in analytics |
| `waitlist_signup_success` | Existing server signup request confirms success | Known public page | Confirmed-response event; repeat submissions are not unique new people |
| `waitlist_signup_error` | Signup returns an error/fails | Known public page | Failed attempt; no exception message, form values or health data retained |

The operational waitlist receiver remains the source for persisted signup counts and deduplication. A missing browser success event does not prove the signup was absent. Existing receiver diagnostics are separate from these aggregate engagement events.

## Count real runtime logs

In the production Vercel project's Runtime Logs, filter for `site_engagement` and the release/time interval being examined. Export the relevant JSONL using the platform's supported export method. Respect the account's actual log retention. Store private exports outside the repository; the reducer below prints only event/page/asset counts and ignores envelopes with unexpected event properties.

```sh
python docs/seo-aeo/summarize-engagement.py < /path/to/runtime-export.jsonl > /tmp/airbloom-event-counts.csv
```

The reducer accepts raw JSON event lines or export objects with the event JSON in a `message` field. Confirm your export structure before treating an empty result as zero activity. It does not connect to a provider or invent a dashboard. Counts can be biased by reloads, repeated clicks, retries, JavaScript blockers and log retention. No user deduplication or attribution is available from this payload.

Use `template_download` counts alongside article entries for a rough event ratio, labeled **download clicks per article entry**, never a unique-visitor conversion rate. A download from `/resources` has that page ID; do not attribute it to an earlier article without evidence. `resource_next_click` counts intent rather than completed destination reads. No referrer source is captured, so these logs alone cannot identify organic downloads or ChatGPT referrals.

## Search and citation evidence

- Google Search Console: verify indexing first, compare declared and Google-selected canonical, and group nonbrand impressions/clicks by owner task and country. Compare CTR at similar position bands and use comparable 28-day windows. Record the actual reporting window and available data; do not fill unavailable reports with estimated zeroes.
- Bing Webmaster Tools: use verified crawl/index evidence and AI Performance citation/grounding data where available in the authorized account. A citation is not a click and an impression is not a visit.
- Field performance: record actual mobile p75 LCP/INP/CLS when available. Local browser QA and a lab score do not establish production field Core Web Vitals.
- Citation benchmark: copy the 12-row template for each engine/country run. Use fresh sessions with Google AI Mode where available, ChatGPT Search and Copilot. Record UTC timestamp, country/device, exact query, answer eligibility, cited URLs, AirBloom mention/citation and inaccuracies with a real evidence location. Blank means unobserved, not no citation. Monthly repetition is an operating recommendation; no automation was created by this implementation.

For a benchmark run, the citation rate is prompts citing an AirBloom canonical page divided by eligible prompts for which an answer actually appeared. Exclude unavailable engines/no-answer prompts from the denominator and report them separately. Keep clicks, signups and referrals as separate measures. No private Google/Bing results or citation observations have been obtained for this code change.
