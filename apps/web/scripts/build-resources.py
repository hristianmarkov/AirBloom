"""Regenerate printable and browser-editable worksheets from the extracted manuscript.
Requires reportlab and openpyxl. The supplied two-week workbook is preserved separately.
No worksheet data is collected, stored, or transmitted by these files.
"""
from pathlib import Path
from html import escape
import json
import csv
import shutil
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/downloads'
OUT.mkdir(parents=True,exist_ok=True)
FONT=Path('/usr/share/fonts/truetype/dejavu')
pdfmetrics.registerFont(TTFont('Diary',str(FONT/'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('DiaryBold',str(FONT/'DejaVuSans-Bold.ttf')))
pdfmetrics.registerFontFamily('Diary',normal='Diary',bold='DiaryBold',italic='Diary',boldItalic='DiaryBold')
styles=getSampleStyleSheet()
for style in styles.byName.values(): style.fontName='Diary'
styles['Title'].fontName='DiaryBold';styles['Title'].fontSize=22;styles['Title'].leading=28;styles['Title'].textColor=colors.HexColor('#244a3a')
styles['Heading2'].fontName='DiaryBold';styles['Heading2'].fontSize=13;styles['Heading2'].leading=17
styles['BodyText'].fontSize=9;styles['BodyText'].leading=13
styles.add(ParagraphStyle(name='SummaryPrompt',fontName='DiaryBold',fontSize=12,leading=15,spaceBefore=4,spaceAfter=2))
styles.add(ParagraphStyle(name='Cell',fontName='Diary',fontSize=7.2,leading=10))
styles.add(ParagraphStyle(name='Small',fontName='Diary',fontSize=7.5,leading=11,textColor=colors.HexColor('#59675e')))
DISCLAIMER='Personal observations only. Not clinically reviewed. These sheets do not diagnose symptoms or replace your care team’s instructions. Do not delay care to complete a diary.'
DATA=json.loads((ROOT/'scripts/resource-worksheets.json').read_text())
META=[
('sinus-symptom-diary','Seven-day sinus symptom diary','A blank seven-day record and a completed fictional week, keeping clear, usual and missed days separate.','sinus-symptom-diary-template'),
('sinus-summary-blank','One-page sinus summary','A fillable appointment handoff for dates, coverage, changes, daily impact, routines and questions.','sinus-symptom-summary-for-doctor'),
('sinus-summary-example','Worked sinus summary','A fictional two-week example with 11 of 14 mornings recorded and missing follow-up kept visible.','sinus-symptom-summary-for-doctor'),
('nasal-routine-log','Nasal spray and rinse routine log','Separate spray, rinse, follow-up and pharmacist handoff tables. Record existing instructions; do not use the sheet to choose doses.','nasal-spray-log'),
('sinus-sleep-diary','Optional nights worksheet','Bedtime, overnight and waking observations, with wearable estimates in a separate field.','sinus-symptom-diary-template'),
('pollen-symptom-diary','Pollen and nasal symptom diary','Pair the named provider and pollen level with time outside, symptoms and missing readings.','pollen-symptom-diary'),
('headache-note-card','Headache and nasal symptom note card','Describe the order, duration, location and impact of headache and nasal observations.','sinus-headache-vs-migraine'),
('bedtime-congestion-card','Bedtime congestion observation card','Compare how you felt before lying down, after settling and when next upright.','nasal-congestion-at-night'),
('sinus-episode-gap-log','Sinus episode and gap worksheet','Record stretches of symptoms and whether the gaps were clear, ongoing or unknown.','recurrent-vs-chronic-sinusitis'),
('air-quality-symptom-log','Air quality and nasal symptoms log','Keep the reading time separate from your check-in time, and record the provider, index and setting.','air-pollution-and-nasal-congestion'),
('facial-pressure-card','Facial pressure note card','An accessible face map and three-part handoff for location, timing and impact.','describe-facial-pressure-to-doctor'),
('room-conditions-log','Room conditions and nasal symptoms log','Log indoor measurements, room context, noticed irritants and symptoms without assuming a cause.','dry-air-and-nasal-congestion'),
('flight-symptom-card','Flight and landing symptom card','Separate ear and facial observations across boarding, climb, cruise, descent and after landing.','sinus-pressure-when-flying'),
]
def para(text,style='BodyText'):
 return Paragraph(escape(text).replace('\n','<br/>'),styles[style])
def table(rows):
 widths=[(A4[0]-76)/len(rows[0])]*len(rows[0])
 cells=[[para(c,'Cell') for c in row] for row in rows]
 t=Table(cells,colWidths=widths,repeatRows=1,minRowHeights=[30]+[39]*(len(rows)-1))
 t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e6eee7')),('GRID',(0,0),(-1,-1),.5,colors.HexColor('#aebfb1')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
 return t

def footer(canvas,doc):
 canvas.saveState();canvas.setFont('Diary',7);canvas.setFillColor(colors.HexColor('#59675e'));canvas.drawString(38,27,'AirBloom · airbloom.app/resources · Educational worksheet');canvas.drawRightString(A4[0]-38,27,str(doc.page));canvas.restoreState()

def write_resource(meta,blocks):
 id,title,description,slug=meta
 story=[para('AIRBLOOM  /  PERSONAL RECORD','Small'),Spacer(1,10)]
 htmlblocks=[]
 for block in blocks:
  kind=block['type']
  if kind=='p':
   text=block['text'];style=block['style']
   if style=='Heading 1':
    story.append(para(text,'Title'));htmlblocks.append('<h1>'+escape(text)+'</h1>')
   elif style=='Heading 2':
    if 'completed week' in text.lower():story.append(PageBreak())
    story.append(para(text,'Heading2'));htmlblocks.append('<h2>'+escape(text)+'</h2>')
   elif style=='Worksheet prompt':
    story.append(para(text,'SummaryPrompt' if id=='sinus-summary-blank' else 'Heading2'));htmlblocks.append('<h2>'+escape(text)+'</h2>')
   elif style=='Worksheet fill':
    if set(text.strip())=={'_'}:
     story.extend([Spacer(1,8),HRFlowable(width='100%',thickness=.4,color=colors.HexColor('#bac6bd')),Spacer(1,4)]);htmlblocks.append('<p class="write-line" contenteditable="true" aria-label="Write your note">&nbsp;</p>')
    else:
     story.append(para(text));htmlblocks.append('<p contenteditable="true">'+escape(text)+'</p>')
   else:
    story.append(para(text,'Small' if style=='Meta' else 'BodyText'));htmlblocks.append('<p>'+escape(text)+'</p>')
   story.append(Spacer(1,5))
  elif kind=='table':
   story.extend([table(block['rows']),Spacer(1,12)])
   rows=block['rows'];htmlblocks.append('<div class="table-scroll"><table><thead><tr>'+''.join('<th scope="col">'+escape(x)+'</th>' for x in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td contenteditable="true">'+(escape(x) if x else '&nbsp;')+'</td>' for x in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>')
  elif kind=='image':
   story.extend([Image(str(OUT/block['src']),width=450,height=188),Spacer(1,8)])
   htmlblocks.append('<figure><img src="'+block['src']+'" alt="'+escape(block['alt'])+'"><figcaption>'+escape(block['alt'])+'</figcaption></figure>')
 story.extend([Spacer(1,12),para(DISCLAIMER,'Small')])
 SimpleDocTemplate(str(OUT/(id+'.pdf')),pagesize=A4,rightMargin=38,leftMargin=38,topMargin=32,bottomMargin=40,title=title,author='AirBloom editorial team').build(story,onFirstPage=footer,onLaterPages=footer)
 html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>'''+escape(title)+''' | AirBloom worksheet</title><style>
 *{box-sizing:border-box}body{font:15px/1.5 system-ui,sans-serif;color:#203c30;background:#f4f7f0;margin:0}.sheet{max-width:1000px;background:white;margin:30px auto;padding:32px}h1{font:36px Georgia,serif;line-height:1.1}h2{font-size:18px;margin:24px 0 8px}p{margin:8px 0}.tools{background:#e5eee6;padding:16px;display:flex;gap:16px;flex-wrap:wrap;align-items:center}button,a{color:#174d35}button{font:inherit;padding:9px 14px;cursor:pointer;background:white;border:1px solid #809b87;border-radius:4px}.notice{font-size:13px;color:#526357}.table-scroll{overflow:auto;margin:16px 0}table{border-collapse:collapse;width:100%;table-layout:fixed;min-width:650px}th,td{border:1px solid #a9baae;text-align:left;vertical-align:top;padding:9px;overflow-wrap:anywhere;font-size:12px}th{background:#e6eee7}td{height:55px}[contenteditable]{outline-offset:2px}[contenteditable]:focus{outline:2px solid #2f7550;background:#f4f9f2}.write-line{border-bottom:1px solid #b3c0b6;min-height:26px}figure{margin:16px 0}img{max-width:100%;height:auto}figcaption{font-size:12px;color:#526357}.footnote{font-size:12px;margin-top:24px}@media(max-width:600px){.sheet{margin:0;padding:20px}h1{font-size:30px}}@media print{@page{size:A4;margin:12mm}body{background:white}.sheet{margin:0;padding:0;max-width:none}.tools{display:none}h1{font-size:23px}h2{font-size:15px;margin:16px 0 6px}p{font-size:11px}table{min-width:0}th,td{font-size:9px;padding:6px}td{height:36px}tr,figure{break-inside:avoid}.table-scroll{overflow:visible}figcaption,.footnote{font-size:9px}.write-line{min-height:18px;margin:3px 0}img{max-height:180px;width:auto}}
 </style></head><body><main class="sheet"><div class="tools"><button type="button" onclick="printWorksheet()">Print / Save as PDF</button><a href="'''+id+'''.pdf">Download ready-to-print PDF</a><a href="/resources">All worksheets</a><p class="notice">Edit cells and underlined areas in this browser tab. Nothing you type is uploaded or saved. Print or save as PDF before closing.</p></div>'''+''.join(htmlblocks)+'<p class="footnote">'+escape(DISCLAIMER)+'</p><p class="footnote">AirBloom · airbloom.app/resources</p></main></body></html>'
 html=html.replace('</body>', '<script>function printWorksheet(){if(location.protocol==="https:"||location.protocol==="http:"){fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"print_template",page_id:"/downloads/'+id+'.html",asset_id:"'+id+'"}),keepalive:true,referrerPolicy:"no-referrer"}).catch(function(){});}window.print();}</script></body>')
 (OUT/(id+'.html')).write_text(html)
 return {'id':id,'title':title,'description':description,'pdf':'/downloads/'+id+'.pdf','editable':'/downloads/'+id+'.html','articleSlug':slug,'example':id=='sinus-summary-example'}

resources=[]
for meta,section in zip(META,DATA):resources.append(write_resource(meta,section['blocks']))

# Additional task-specific worksheets required by the playbook, without prescriptive care instructions.
EXTRA=[
('morning-congestion-card','Morning congestion observation card','Compare on-waking symptoms with a later check; include mornings without symptoms.','waking-up-with-a-stuffy-nose',['Date','On waking: time, side, symptoms','Later check: time and observations','Bedtime context or unknown']),
('cold-air-transition-card','Cold-air transition observation card','Record a temperature transition and a comparable trip without symptoms.','cold-air-runny-nose',['Date and place','Indoors to outdoors: onset','Outdoors to indoors: change','Recovery or comparison with no symptoms']),
('nasal-spray-label-worksheet','Nasal spray label-reading worksheet','Copy the exact country-specific label and your questions for a pharmacist; this is not a product recommendation.','decongestant-vs-steroid-nasal-spray',['Country and exact product','Active ingredient and strength as labelled','Label instructions and limits','Questions for pharmacist']),
('ent-medication-list','Medication list for an ENT visit','Bring the exact product, how you actually used it and uncertain details to your appointment.','prepare-for-your-ent-appointment',['Exact product / active ingredient','How I actually used it','Most recent use / timing','Who advised it / uncertainty']),
('sinus-surgery-followup','Sinus surgery follow-up observations','Your surgical team’s instructions and contact pathway come first. Record observations for their review.','sinus-surgery-recovery-diary',['Date and time','What I noticed / daily impact','My team’s instructions for this situation','Action, contact and response']),
('smell-change-log','Smell change observation log','Describe what changed, when and whether it was noticed or not checked.','sinusitis-and-loss-of-smell',['Date / onset or estimate','What changed in my own words','Other nasal observations','Impact / question for clinician']),
]
for id,title,desc,slug,head in EXTRA:
 blocks=[{'type':'p','style':'Heading 1','text':title},{'type':'p','style':'Worksheet fill','text':'Date range ____________________    Name or initials (optional) ____________________'}]
 if id=='sinus-surgery-followup':blocks.append({'type':'p','style':'Worksheet fill','text':'My surgical team contact ____________________    Urgent contact instructions ____________________'})
 if id=='nasal-spray-label-worksheet':
  blocks.append({'type':'p','style':'BodyText','text':'UK and US product names, ingredients, strengths and permitted use can differ. Read the exact local package and leaflet. A UK label saying “xylometazoline” and a US label saying “oxymetazoline” describe different ingredients; do not treat a brand or the word decongestant as the full instruction. Ask a pharmacist to verify your own product. Steroid labels may name fluticasone or mometasone; this worksheet does not choose between them.'})
 if id=='nasal-spray-label-worksheet':
  blocks.append({'type':'p','style':'Meta','text':'Official label references: NHS decongestants — nhs.uk/medicines/decongestants/; US DailyMed current product labels — dailymed.nlm.nih.gov. Verify your own package, country and active ingredient with your pharmacist.'})
 blocks.extend([{'type':'table','rows':[head]+[['']*len(head) for _ in range(7)]},{'type':'p','style':'Meta','text':'Mark a missed check “not recorded”. Mark uncertain times as estimates. A pattern does not establish a cause. Follow the product leaflet and your own care instructions.'},{'type':'p','style':'Worksheet prompt','text':'My question'},{'type':'p','style':'Worksheet fill','text':'________________________________________________________________________________'}])
 resources.append(write_resource((id,title,desc,slug),blocks))

# Matching editable seven-day spreadsheet; field order exactly matches the PDF and HTML diary.
rows=next(b['rows'] for b in DATA[0]['blocks'] if b['type']=='table')
worked=[b['rows'] for b in DATA[0]['blocks'] if b['type']=='table'][1]
with (OUT/'seven-day-sinus-diary.csv').open('w',newline='') as f:csv.writer(f).writerows(rows)
wb=Workbook();wb.remove(wb.active)
for name,values in [('Blank diary',rows),('Fictional example',worked)]:
 ws=wb.create_sheet(name)
 for row in values:ws.append(row)
 ws.freeze_panes='B2';ws.auto_filter.ref=ws.dimensions
 for cell in ws[1]:cell.font=Font(bold=True,color='244A3A');cell.fill=PatternFill('solid',fgColor='E6EEE7')
 for col in ws.columns:ws.column_dimensions[col[0].column_letter].width=25
 for row in ws:
  for cell in row:cell.alignment=Alignment(wrap_text=True,vertical='top')
 for i in range(2,9):ws.row_dimensions[i].height=52
 ws.sheet_properties.pageSetUpPr.fitToPage=True;ws.page_setup.orientation='landscape';ws.page_setup.paperSize=ws.PAPERSIZE_A4;ws.page_setup.fitToWidth=1;ws.page_setup.fitToHeight=1
 ws.print_title_rows='1:1'
notes=wb.create_sheet('Read me');notes.append(['AirBloom seven-day sinus symptom diary']);notes.append(['Use clear, my usual, better than usual, worse than usual, or not recorded.']);notes.append(['The fictional example is not a real person or medical outcome.']);notes.append([DISCLAIMER]);notes.append(['No information entered in this workbook is sent to AirBloom.']);notes.column_dimensions['A'].width=100
for row in notes:
 row[0].alignment=Alignment(wrap_text=True)
wb.save(OUT/'seven-day-sinus-diary.xlsx')
resources[0]['spreadsheet']='/downloads/seven-day-sinus-diary.xlsx'
resources[0]['csv']='/downloads/seven-day-sinus-diary.csv'
# Keep the original uploaded workbook byte-identical when a source path is supplied.
import sys
if len(sys.argv)>1:shutil.copyfile(sys.argv[1],OUT/'AirBloom_Sinus_Symptom_Diary.xlsx')
resources.append({'id':'two-week-sinus-diary','title':'Two-week sinus symptom diary','description':'The supplied editable workbook, with a fictional example and separate counts for recorded days, missed checks and blank rows.','spreadsheet':'/downloads/AirBloom_Sinus_Symptom_Diary.xlsx','articleSlug':'sinus-symptom-diary-template'})
(OUT/'manifest.json').write_text(json.dumps(resources,indent=2,ensure_ascii=False))
(ROOT/'src/lib/resources.ts').write_text('export type Resource = {\n  id: string;\n  title: string;\n  description: string;\n  pdf?: string;\n  editable?: string;\n  spreadsheet?: string;\n  csv?: string;\n  articleSlug: string;\n  example?: boolean;\n};\n\nexport const resources: Resource[] = '+json.dumps(resources,ensure_ascii=False,indent=2)+';\n')
print('Generated',len(resources),'resources')
