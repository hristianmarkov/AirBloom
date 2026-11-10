#!/usr/bin/env python3
"""Count allowlisted aggregate events from a runtime-log JSONL export on stdin."""
import collections,csv,json,sys
EVENTS={'article_view','template_download','worksheet_open','print_template','resource_next_click','waitlist_open','waitlist_signup_success','waitlist_signup_error'}
counts=collections.Counter()
for raw in sys.stdin:
    try:
        item=json.loads(raw)
        # Accept the raw event or a platform JSON log envelope. Do not print envelopes.
        if isinstance(item,dict) and item.get('channel')!='site_engagement':
            message=item.get('message')
            if not isinstance(message,str): continue
            item=json.loads(message)
        if not isinstance(item,dict) or item.get('channel')!='site_engagement': continue
        if set(item)-{'channel','event','page_id','asset_id','count'}: continue
        event,page,asset=item.get('event'),item.get('page_id'),item.get('asset_id','')
        if event not in EVENTS or not isinstance(page,str) or not page.startswith('/') or any(v in page for v in ['?','#','@']):continue
        if not isinstance(asset,str) or item.get('count')!=1: continue
        counts[(event,page,asset)]+=1
    except (ValueError,TypeError):continue
writer=csv.writer(sys.stdout)
writer.writerow(['event','page_id','asset_id','event_count'])
for key,count in sorted(counts.items()): writer.writerow([*key,count])
