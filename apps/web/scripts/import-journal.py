#!/usr/bin/env python3
"""Import the supplied AirBloom manuscripts without editorial research notes.

This is an editorial one-off, not part of the web build. Inputs are explicit files;
output is committed, reviewed JSON so deployment never depends on private uploads.
Usage: python scripts/import-journal.py --manuscript drafts.docx --decisions decisions.json
       --existing original-articles.json [--missing missing-drafts.json]
"""
import argparse, copy, hashlib, json, math, re, unicodedata, zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
W, R = '{'+NS['w']+'}', '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
DAY = '2026-11-10'
parser = argparse.ArgumentParser()
for key in ['manuscript','decisions','existing']: parser.add_argument('--'+key, required=True)
parser.add_argument('--missing')
parser.add_argument('--output',default='src/lib/journal-content.json')
args=parser.parse_args()
decisions={d['number']:d for d in json.loads(Path(args.decisions).read_text())}
old=json.loads(Path(args.existing).read_text())


def slug(text):
    return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',text).encode('ascii','ignore').decode().lower()).strip('-')


def source_id(url): return 's-'+hashlib.sha256(url.encode()).hexdigest()[:10]


def owner(n): return decisions[n]['Page owner'].split('/journal/')[1].split(' ')[0].strip()

# Stable fragments preserve references in the original manuscript.
fragments={4:'sinus-flare-up-timeline',8:'saline-rinse-log',9:'sinus-sleep-diary',11:'rating-sinus-symptoms',15:'before-and-after-nasal-spray',26:'clear-usual-and-unknown-days',29:'nasal-spray-discomfort',33:'wildfire-smoke-log',36:'throat-clearing',42:'morning-facial-pressure',43:'compare-two-weeks',44:'treatment-questions',45:'medication-list',46:'sinus-tracker-spreadsheet',49:'symptoms-after-a-cold',50:'indoor-irritants'}
resource_ids={1:'sinus-symptom-diary',3:'sinus-summary-blank',7:'nasal-routine-log',9:'sinus-sleep-diary',10:'pollen-symptom-diary',13:'headache-note-card',14:'bedtime-congestion-card',20:'sinus-episode-gap-log',21:'air-quality-symptom-log',23:'facial-pressure-card',32:'room-conditions-log',34:'flight-symptom-card'}


def route(n): return '/journal/'+owner(n)+(('#'+fragments[n]) if n in fragments else '')


def local_url(url):
    if url.startswith(('https://www.airbloom.app','https://airbloom.app')):
        return re.sub(r'^https://(?:www\.)?airbloom\.app','',url) or '/'
    return url


z=zipfile.ZipFile(args.manuscript)
rels={p.attrib['Id']:p.attrib.get('Target','') for p in ET.fromstring(z.read('word/_rels/document.xml.rels'))}
blocks=[]
for child in ET.fromstring(z.read('word/document.xml')).find('w:body',NS):
    if child.tag==W+'p':
        text=''.join(t.text or '' for t in child.findall('.//w:t',NS)).strip()
        style=child.find('w:pPr/w:pStyle',NS)
        if not text: continue
        links=[]
        for h in child.findall('.//w:hyperlink',NS):
            label=''.join(t.text or '' for t in h.findall('.//w:t',NS)).strip()
            url=rels.get(h.get(R+'id'),'')
            anchor=h.get(W+'anchor','')
            if anchor.startswith('draft'): url=route(int(anchor[5:]))
            elif anchor.startswith('sheet'):
                if anchor=='sheet03worked': url='/resources#sinus-summary-example'
                elif anchor[5:].isdigit(): url='/resources#'+resource_ids.get(int(anchor[5:]),'')
            if url: links.append({'label':label,'href':local_url(url)})
        blocks.append({'text':text,'style':style.get(W+'val','') if style is not None else '', 'links':links})
    elif child.tag==W+'tbl':
        rows=[[' '.join(''.join(t.text or '' for t in p.findall('.//w:t',NS)) for p in cell.findall('w:p',NS)) for cell in row.findall('w:tc',NS)] for row in child.findall('w:tr',NS)]
        if rows: blocks.append({'table':rows})

# Read metadata from the manuscript's benchmark notes, but never publish the notes.
metadata={}
active=None
for b in blocks:
    if b.get('style')=='Reviewheading':
        m=re.match(r'^(\d{2})\s',b['text']); active=int(m[1]) if m else None
    if active and b.get('text','').startswith('SEO title.'):
        m=re.match(r'SEO title\. (.*?)\s+Meta description\. (.*)',b['text'])
        if m: metadata[active]={'seoTitle':m[1].replace(' | AirBloom',''),'description':m[2]}

raw={}
current=None
for b in blocks:
    if b.get('style')=='Kicker':
        m=re.match(r'^(\d{2})\s+/',b['text'])
        current=int(m[1]) if m else None
        if current: raw[current]={'number':current,'sections':[],'sources':[],'answerSourceRefs':[]}
        continue
    if not current: continue
    a=raw[current]
    if b.get('style')=='Heading1': a['title']=b['text'];continue
    # Strip bare citation labels appended to standfirsts. Keep prose hyperlinks as prose.
    if b.get('style')=='Standfirst':
        answer=b['text']
        for link in reversed(b.get('links',[])):
            if answer.endswith(link['label']): answer=answer[:-len(link['label'])].rstrip(' ·')
        a['answer']=answer
        refdest=a['answerSourceRefs']
    else:
        if b.get('style') in ['Heading2','Heading3']:
            a['sections'].append({'id':slug(b['text']),'title':b['text'],'paragraphs':[]})
            continue
        if not a['sections']: a['sections'].append({'id':'what-to-record','title':'What to record','paragraphs':[]})
        section=a['sections'][-1]
        if 'table' in b:
            section.setdefault('tables',[]).append({'caption':section['title'],'headers':b['table'][0],'rows':b['table'][1:]})
            continue
        section.setdefault('paragraphs',[]).append(b['text'])
        refdest=section.setdefault('sourceRefs',[])
    for link in b.get('links',[]):
        if link['href'].startswith('http'):
            id=source_id(link['href'])
            if id not in refdest: refdest.append(id)
            if not any(s['id']==id for s in a['sources']): a['sources'].append({'id':id,'title':link['label'],'url':link['href']})
        elif a['sections']:
            dest=a['sections'][-1].setdefault('links',[])
            if link not in dest: dest.append(link)

# The interim format-comparison draft had no external link. Its visit-preparation
# section links to the same official notes/medicine-list guidance as the summary.
if 12 in raw and not raw[12]['sources']:
    url='https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/'
    id=source_id(url)
    raw[12]['sources']=[{'id':id,'title':'NHS: What to ask your doctor','url':url}]
    raw[12]['sections'][-1]['sourceRefs']=[id]

# Manuscript 01–35 is complete. Missing later briefs are separately authored, with
# provenance kept in the editorial record rather than reader-facing article text.
if args.missing:
    for a in json.loads(Path(args.missing).read_text()):
        refs={s['id']:source_id(s['url']) for s in a['sources']}
        for source in a['sources']:source['id']=refs[source['id']]
        for section in a['sections']:
            section['sourceRefs']=[refs.get(ref,ref) for ref in section.get('sourceRefs',[])]
        a['answerSourceRefs']=[refs.get(ref,ref) for ref in a.get('answerSourceRefs',[])]
        if not a.get('answerSourceRefs') and a['sections']:
            a['answerSourceRefs']=a['sections'][0].get('sourceRefs',[])
        raw[a['number']]=a

tracking={1,3,4,9,11,12,26,43,46,47}
visits={2,23,35,42,44,45,48}
routines={7,8,15,17,27,28,29,30}
environment={5,10,21,31,32,33,34,50}
conditions={16,18,20,25,37,38,40,41,49}

def topic(n):
    if n in tracking:return 'Tracking and templates'
    if n in visits:return 'Preparing for appointments'
    if n in routines:return 'Nasal routines'
    if n in environment:return 'Weather and environment'
    if n in conditions:return 'Understanding sinus conditions'
    return 'Symptoms and patterns'


def enrich(a,n=None):
    a.setdefault('publishedAt','2026-11-09' if n is None else DAY)
    a['modifiedAt']=DAY
    a['author']={'name':'AirBloom editorial team','url':'/authors/airbloom-editorial-team'}
    a['review']={'status':'not-clinically-reviewed'}
    a['heroImage']='/opengraph-image'
    a['topic']=topic(n) if n else ('Tracking and templates' if 'diary' in a['slug'] else 'Preparing for appointments' if 'appointment' in a['slug'] else 'Nasal routines' if 'reminder' in a['slug'] else 'Symptoms and patterns')
    a['category']=a['topic']
    a['readTime']=max(2,math.ceil(len(json.dumps(a.get('sections',[])).split())/200))
    for s in a['sources']: s.setdefault('id',source_id(s['url']))
    a.setdefault('answerSourceRefs',[])
    return a

articles={a['slug']:enrich(a) for a in old}
# Attach the existing four-guide source lists to their consequential passages.
inherited_refs={
    'why-sinus-symptoms-change-day-to-day':{
        'start-with-what-you-feel':['s-47bc9e6bc5','s-38ebba89ab'],
        'outdoor-context':['s-38ebba89ab','s-064a43d06e'],
        'make-the-next-step-smaller':['s-47bc9e6bc5']},
    'sinus-medication-routine-reminders':{
        'one-reliable-list':['s-1ba612bebc','s-05552160bf'],
        'taken-missed-not-sure':['s-1ba612bebc'],
        'check-product-specific-limits':['s-1ba612bebc']}}
for a in articles.values():
    for section in a['sections']:
        refs=inherited_refs.get(a['slug'],{}).get(section['id'])
        if refs:section['sourceRefs']=refs
        if a['slug']=='sinus-medication-routine-reminders' and section['id']=='check-product-specific-limits':
            section['paragraphs'][0]='The NHS warns that prolonged use of decongestant nasal sprays and drops can worsen a blocked nose. Check the limit in your exact product leaflet or ask a pharmacist. This warning is specific to decongestants; it is not a general schedule for all nasal products.'
for n,a in raw.items():
    if n in fragments: continue
    a=copy.deepcopy(a)
    a['slug']=owner(n)
    a.update(metadata.get(n,{}))
    if n==12:a['description']='Compare paper, spreadsheets and phone apps for recording sinus symptoms, keeping missing entries visible and preparing a record for your next visit.'
    a.setdefault('description',a['answer'][:157].rsplit(' ',1)[0]+'.')
    a['art']='visit' if n in visits else 'routine' if n in routines else 'conditions' if n in environment or n in conditions else 'journal'
    a['briefNumbers']=[n]
    articles[a['slug']]=enrich(a,n)

for n,fragment in fragments.items():
    if n not in raw:continue
    source=copy.deepcopy(raw[n]); a=articles[owner(n)]
    # A section introduction carries the original short answer and anchors the topic.
    first={'id':fragment,'title':source['title'],'paragraphs':[source['answer']]}
    if source.get('answerSourceRefs'):first['sourceRefs']=source['answerSourceRefs']
    a['sections'].append(first)
    for section in source['sections']:
        section['id']=fragment+'-'+section['id']
        a['sections'].append(section)
    for s in source['sources']:
        if not any(x['url']==s['url'] for x in a['sources']):a['sources'].append(s)
    a.setdefault('briefNumbers',[]).append(n)

# Keep one relevant app mention per owner after merged drafts are integrated.
for a in articles.values():
    mentions=0
    for s in a['sections']:
        paragraphs=[]
        for p in s.get('paragraphs',[]):
            if 'AirBloom' in p:
                mentions+=1
                if mentions>1 and a['slug']!='sinus-diary-privacy':continue
            paragraphs.append(p)
        s['paragraphs']=paragraphs
    # Exact source IDs remain resolvable after deduplication across merged topics.
    by_url={}; id_map={}
    for s in a['sources']:
        if s['url'] in by_url:id_map[s['id']]=by_url[s['url']]['id']
        else:by_url[s['url']]=s
    a['sources']=list(by_url.values())
    for s in a['sections']:
        if 'sourceRefs' in s:s['sourceRefs']=list(dict.fromkeys(id_map.get(i,i) for i in s['sourceRefs']))
    a['answerSourceRefs']=list(dict.fromkeys(id_map.get(i,i) for i in a.get('answerSourceRefs',[])))
    # Suggested handoff links are topic-specific and always point to existing owners.
    n=next(iter(a.get('briefNumbers',[])),None)
    related=[]
    if n:
        for token in re.findall(r'(?<!\w)(E[1-4]|\d{2})(?!\w)',decisions[n].get('Editorial handoff','').split('Related when live')[-1]):
            target={'E1':old[0]['slug'],'E2':old[1]['slug'],'E3':old[2]['slug'],'E4':old[3]['slug']}.get(token)
            if not target and token.isdigit():target=owner(int(token))
            if target and target in articles and target!=a['slug'] and target not in related:related.append(target)
    if not related:
        related=[b['slug'] for b in articles.values() if b['topic']==a['topic'] and b['slug']!=a['slug']][:3]
    a['relatedSlugs']=related[:4]
    # Always connect the practical owner to relevant template outputs.
    if a['slug']=='how-to-keep-a-sinus-symptom-diary':a['relatedSlugs']=['sinus-symptom-diary-template','sinus-symptom-summary-for-doctor','recurrent-vs-chronic-sinusitis']
    if a['slug']=='prepare-for-your-ent-appointment':a['relatedSlugs']=['first-ent-appointment-sinus-symptoms','sinus-symptom-summary-for-doctor','nasal-spray-log']
    if a['slug']=='sinus-medication-routine-reminders':a['relatedSlugs']=['nasal-spray-log','decongestant-vs-steroid-nasal-spray','prepare-for-your-ent-appointment']
    words=sum(len(' '.join(s.get('paragraphs',[])+s.get('items',[])).split())+sum(len(' '.join(r).split()) for t in s.get('tables',[]) for r in t['rows']) for s in a['sections'])
    a['readTime']=max(2,math.ceil(words/200))
    # Question headings become visible FAQ entries only when the manuscript answers them.
    a['faqs']=[{'question':s['title'],'answer':s['paragraphs'][0]} for s in a['sections'] if s['title'].endswith('?') and s.get('paragraphs')][:3]

result=list(articles.values())
# The content file is a deployment artifact, not an archive of editorial instructions.
Path(args.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
coverage=[{'number':n,'title':decisions[n]['title'],'href':route(n),'provenance':'supplied manuscript' if n<=35 else 'new draft from supplied playbook brief','decision':decisions[n]['decision']} for n in sorted(raw)]
Path(args.output).with_name('journal-coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
print(f'Imported {len(raw)} briefs into {len(result)} canonical pages: {sum(len(a["sections"]) for a in result)} sections.')
