# Launch evidence checklist

Run all applicable checks now. A dependency requiring an account, DNS permission, a qualified reviewer or real traffic is recorded as pending, not rescheduled into a phase. Use a UTC timestamp and production revision for each captured result. Keep private account screenshots, test email addresses and clinical records outside the repository.

| Check | Action | Pass evidence | Current evidence |
| --- | --- | --- | --- |
| Build and types | `npm run typecheck`, `npm test`, `npm run build` | Exit zero with the tested revision | Task owner records actual result |
| Live public surfaces | `python docs/seo-aeo/check-launch.py --output /tmp/airbloom-launch-evidence.json` | Every emitted check passed, with observed origin and timestamp | Pending production release |
| Canonical origin | Inspect initial HTML for home, journal, privacy, editorial/about and every guide | One self-canonical; canonical/OG/JSON-LD use `https://www.airbloom.app` | Executable checker + spot-check JSON-LD |
| Redirects | GET apex and old production host with a deep path and query | Permanent redirect preserving path/query; target 200; no www loop | Old-host probe in executable checker; apex also verify hosting |
| Unknown URL | Fetch a deliberately nonexistent route | Actual HTTP 404 and noindex | Executable checker |
| Crawler discovery | Fetch sitemap, robots and llms | Valid sitemap with all 45 current canonical pages; no legacy host; public crawl access and private exclusions | Executable checker; genuine bot access still needs logs |
| Mobile articles | Inspect 360px and 390px widths, keyboard navigation and tables | Readable answer, scrollable tables, no page-wide overflow; links and focus usable | Record real browser result |
| All merged briefs | Follow coverage map fragments from the journal | Each owner section exists; no separate duplicate page needed | Source coverage register and live fragment checks |
| Diary semantics | Open blank and example files; try clear/usual/worse/unknown/blank | Two-week example: week 1 recorded5/worse2/clear1/unknown2/blank0; week 2 recorded6/worse4/clear0/unknown1/blank0; blanks never become clear | Record file/formula verification |
| Seven-day diary | Compare HTML, PDF, XLSX/CSV field order | Same intended fields, usable blank rows and fictional example | Record asset verification |
| One-page report | Fill the browser report with fictional text and print/save PDF | Date/coverage/uncertainty/impact/questions legible on one page; mobile form usable | Record print settings and page count |
| Routine log | Try unknown use and missing before-check | No false zero, no implied effect, no dosing calculation | Record interactive result |
| Optional nights | Compare recollection with device estimate and missed checks | Distinct fields, missing nights remain missing | Record asset verification |
| Face/flight cards | Inspect map alternative text and separate ear/facial fields | Location only, no diagnostic zones; clear printed labels | Record visual/text check |
| Browser worksheet privacy | Enter fictional notes, inspect network, close/reopen tab | Notes not posted to AirBloom; no persistence promise; tabs disclose loss on close | Record network/behavior check |
| Download indexing | Inspect PDF/worksheet headers | Download copies noindex; canonical landing page remains indexable | Executable checker + header spot-check |
| Aggregate events | Use production article/resource and trigger safe actions | Validated `site_engagement` logs with only fixed event/page/asset/count | No visitor health data or identifiers |
| Event rejection | Run analytics unit tests and POST unknown/extra-property payload in controlled QA | 4xx, no private payload logged; preview emits no aggregate log | Record tests and safe QA response |
| Waitlist result | With authorized test address, submit actual configured production form | Success only after confirmed receiver write; duplicate/error behavior remains truthful | Existing waitlist ops guide; do not invent live write |
| Clinical status | Inspect byline, notes, sources and source register | Clearly unreviewed until actual scoped signoff; no false credentials/review dates | Current content is unreviewed |
| Google/Bing | Google setup exists per owner; use authenticated properties to submit canonical sitemap and inspect sample URLs; set up Bing | Actual receipts and selected canonical/crawl evidence | Browser-control failure blocks Google access/submission; Bing setup pending |
| Public Sheets copy | Owner reviews private template and sets intended sharing | Signed-out reader can make a copy; no access to waitlist records | Private template awaits owner sharing |
| Performance | Run mobile PageSpeed and inspect field data if present | Dated results; good field thresholds LCP≤2.5s, INP≤200ms, CLS≤0.1 when real data exists | No field results assumed |
| AI citations | Run all exact prompts per benchmark instructions | Captured answers/cited URLs or explicit no-answer outcome | Blank template; no results assumed |

`check-launch.py` is read-only. A fake crawler user-agent request can establish only an HTTP response, not that Googlebot/Bingbot/OAI-SearchBot actually crawled or indexed the page. Search engine selected canonicals and citation reports require their real data.
