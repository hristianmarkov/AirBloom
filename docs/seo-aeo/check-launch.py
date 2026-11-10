#!/usr/bin/env python3
"""Read-only public launch checks. Writes observed evidence; never submits indexing requests."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical, self.robots, self.og_urls = [], [], []
        self.h1 = 0
        self.hrefs = []
        self.description = []
        self.quick_answer = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonical.append(a.get('href', ''))
        if tag == 'meta' and a.get('name', '').lower() in ('robots', 'googlebot'):
            self.robots.append(a.get('content', ''))
        if tag == 'meta' and a.get('property') == 'og:url':
            self.og_urls.append(a.get('content', ''))
        if tag == 'meta' and a.get('name') == 'description':
            self.description.append(a.get('content', ''))
        if tag == 'a': self.hrefs.append(a.get('href', ''))
        if tag == 'h1': self.h1 += 1
        if a.get('id') == 'quick-answer': self.quick_answer = True

def targets():
    saved = json.loads((HERE / 'launch-targets.json').read_text())
    content_path = REPO / 'apps/web/src/lib/journal-content.json'
    resources_path = REPO / 'apps/web/src/lib/resources.ts'
    if content_path.exists() and resources_path.exists():
        articles = json.loads(content_path.read_text())
        saved['article_paths'] = ['/journal/' + a['slug'] for a in articles]
        base = [p for p in saved['public_paths'] if not p.startswith('/journal/')]
        saved['public_paths'] = base + saved['article_paths']
        saved['asset_paths'] = sorted(set(re.findall(r'"(/downloads/[^\"]+)"', resources_path.read_text())))
    return saved

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'AirBloom-Launch-Check/1.0'})
    opener = urllib.request.build_opener(NoRedirect())
    try:
        with opener.open(req, timeout=25) as response:
            return response.status, {key.lower(): value for key, value in response.headers.items()}, response.read()
    except urllib.error.HTTPError as response:
        return response.code, {key.lower(): value for key, value in response.headers.items()}, response.read()
    except Exception as error:
        return 0, {}, str(type(error).__name__).encode()

def main():
    t = targets()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--origin', default=t['canonical_origin'], help='HTTP origin to fetch (canonical URL by default).')
    parser.add_argument('--canonical-origin', default=t['canonical_origin'], help='Expected canonical origin; useful for local QA.')
    parser.add_argument('--old-origin', default=t['old_origin'], help='Old production hostname to test; blank skips this check.')
    parser.add_argument('--output', default='/tmp/airbloom-launch-evidence.json')
    args = parser.parse_args()
    origin, canonical = args.origin.rstrip('/'), args.canonical_origin.rstrip('/')
    rows = []
    cache = {}
    def check(name, ok, detail):
        rows.append({'check': name, 'passed': bool(ok), 'observed': detail})
    def get(path):
        if path not in cache: cache[path] = fetch(origin + path)
        return cache[path]
    all_paths = t['public_paths'] + t['asset_paths'] + ['/sitemap.xml', '/robots.txt', '/llms.txt', '/opengraph-image', t['known_private_path'], t['unknown_path']]
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda path: (path, fetch(origin + path)), all_paths))
    cache.update(results)
    for path in t['public_paths']:
        status, headers, body = get(path)
        text = body.decode('utf-8', 'replace')
        page = Page(); page.feed(text)
        expected = canonical + (path if path != '/' else '')
        check(path + ': status', status == 200, status)
        check(path + ': self-canonical', page.canonical in ([expected], [expected + '/']) if path == '/' else page.canonical == [expected], page.canonical)
        check(path + ': one H1', page.h1 == 1, page.h1)
        check(path + ': description', bool(page.description and all(page.description)), page.description)
        check(path + ': indexable', not any('noindex' in x.lower() for x in page.robots) and 'noindex' not in headers.get('x-robots-tag', '').lower(), page.robots)
        check(path + ': no legacy origin', 'findease.vercel.app' not in text, 'legacy origin present' if 'findease.vercel.app' in text else 'absent')
        if page.og_urls: check(path + ': OG URL', page.og_urls in ([expected], [expected + '/']) if path == '/' else page.og_urls == [expected], page.og_urls)
        if path in t['article_paths']:
            check(path + ': short answer in HTML', page.quick_answer, page.quick_answer)
            check(path + ': article JSON-LD', bool(re.search(r'"@type"\s*:\s*"Article"', text)), 'Article present' if 'Article' in text else 'missing')
    journal = Page(); journal.feed(get('/journal')[2].decode('utf-8', 'replace'))
    links = set(journal.hrefs)
    check('journal: all article links in server HTML', all(p in links for p in t['article_paths']), {'expected': len(t['article_paths']), 'linked': len([p for p in t['article_paths'] if p in links])})
    status, headers, body = get('/sitemap.xml')
    try:
        tree = ET.fromstring(body)
        urls = [x.text for x in tree.findall('.//{*}loc')]
        expected = {canonical + (p if p != '/' else '') for p in t['public_paths']}
        check('sitemap: valid XML and 200', status == 200, status)
        check('sitemap: exact public URL set', set(urls) == expected, {'expected_count': len(expected), 'actual_count': len(urls), 'missing': sorted(expected-set(urls)), 'unexpected': sorted(set(urls)-expected)})
    except ET.ParseError:
        check('sitemap: valid XML', False, 'XML parse failed')
    status, _, body = get('/robots.txt')
    robots = body.decode('utf-8', 'replace')
    check('robots: canonical sitemap', status == 200 and 'Sitemap: ' + canonical + '/sitemap.xml' in robots, {'status': status, 'canonical_sitemap_present': canonical + '/sitemap.xml' in robots})
    check('robots: API excluded and public demo noindex crawlable', 'Disallow: /api/' in robots and 'Disallow: /demo/' not in robots, robots)
    status, _, body = get('/llms.txt')
    llms = body.decode('utf-8', 'replace')
    check('llms: canonical guide URLs', status == 200 and all(canonical+p in llms for p in t['article_paths']) and 'findease.vercel.app' not in llms, {'status': status, 'expected_guides': len(t['article_paths'])})
    for path in t['asset_paths']:
        status, headers, body = get(path)
        check(path + ': available', status == 200 and bool(body), {'status': status, 'bytes': len(body)})
        if path.endswith('.pdf'): check(path + ': PDF signature', body.startswith(b'%PDF-'), body[:5].decode('ascii', 'replace'))
        if path.endswith('.xlsx'): check(path + ': ZIP signature', body.startswith(b'PK'), body[:2].decode('ascii', 'replace'))
        if path.endswith('.html'): check(path + ': noindex', 'noindex' in headers.get('x-robots-tag', '').lower() or bool(re.search(r'<meta[^>]+content=["\'][^"\']*noindex', body.decode('utf-8', 'replace'), re.I)), headers.get('x-robots-tag', 'HTML meta checked'))
    status, headers, body = get('/opengraph-image')
    check('OG image: available image', status == 200 and headers.get('content-type', '').startswith('image/'), {'status': status, 'content_type': headers.get('content-type')})
    status, headers, body = get(t['unknown_path'])
    errorpage = Page(); errorpage.feed(body.decode('utf-8', 'replace'))
    check('unknown URL: actual 404', status == 404, status)
    check('unknown URL: noindex', any('noindex' in x.lower() for x in errorpage.robots), errorpage.robots)
    status, headers, body = get(t['known_private_path'])
    private = Page(); private.feed(body.decode('utf-8', 'replace'))
    check('demo: inaccessible or noindex', status in (401, 403, 404) or any('noindex' in x.lower() for x in private.robots) or 'noindex' in headers.get('x-robots-tag', '').lower(), {'status': status, 'robots': private.robots})
    if args.old_origin:
        probe = '/journal?launch_check=path-preservation'
        status, headers, _ = fetch(args.old_origin.rstrip('/') + probe)
        check('old host: permanent path/query redirect', status in (301, 308) and headers.get('location') == canonical + probe, {'status': status, 'location': headers.get('location')})
    report = {'observed_at': datetime.now(timezone.utc).isoformat(), 'fetched_origin': origin, 'expected_canonical_origin': canonical, 'limitations': ['HTTP probes do not establish genuine crawler access, indexing, rankings, clinical approval, field Core Web Vitals or answer-engine citations.', 'Click/download analytics and real signup writes require separate interactive verification.'], 'passed': sum(r['passed'] for r in rows), 'failed': sum(not r['passed'] for r in rows), 'checks': rows}
    Path(args.output).write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({k: report[k] for k in ['observed_at', 'passed', 'failed']}) + '\nEvidence: ' + str(Path(args.output).resolve()))
    for row in rows:
        if not row['passed']: print('FAIL ' + row['check'] + ': ' + json.dumps(row['observed']))
    return 1 if report['failed'] else 0

if __name__ == '__main__': sys.exit(main())
