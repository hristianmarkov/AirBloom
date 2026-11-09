"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AppPreview, type PreviewVariant } from "./app-preview";
import { JoinButton } from "./waitlist";

const screens: { id: PreviewVariant; label: string; title: string; body: string; points: string[] }[] = [
  { id: "today", label: "Your day", title: "A check-in, not another chore.", body: "Capture how you feel while it’s fresh. Your recent symptoms and outdoor conditions give you a useful place to start each day.", points: ["Quick morning and evening check-ins", "Optional detail for congestion, pressure, and smell", "Track every day or only when symptoms flare"] },
  { id: "history", label: "Your history", title: "Remember the details. See the bigger picture.", body: "Was that flare last week or last month? Keep dates, notes, and routine changes on a single timeline you can return to.", points: ["See logged days and gaps clearly", "Mark the start and end of a flare", "Keep care milestones alongside your notes"] },
  { id: "insights", label: "Your patterns", title: "Turn scattered notes into useful questions.", body: "Look back at what changed in your recorded days. Personal summaries help you explore patterns without mistaking a coincidence for a cause.", points: ["See the records behind a summary", "Follow changes in symptoms and daily impact", "Bring observations to your care team"] },
  { id: "ask", label: "Your companion", title: "Ask a question. Start with your own story.", body: "The planned AI companion helps organize your history and draft questions for a visit. Review every suggestion before adding or sharing it.", points: ["Summarize the entries you choose", "Turn a thought into a draft diary note", "Prepare questions grounded in your history"] },
  { id: "report", label: "Your next visit", title: "Make “How have you been?” easier to answer.", body: "Bring a concise ENT Visit Pack built from the details you already recorded. Edit the summary and choose what your clinician sees.", points: ["Symptoms, flare dates, and routines together", "Your questions, ready for the appointment", "Review and remove details before sharing"] },
];

export function ProductTour() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  return <section className="section product-tour" id="app-preview">
    <div className="container">
      <div className="section-heading centered">
        <span className="eyebrow">TAKE A LOOK INSIDE</span>
        <h2>Less to keep in your head.<br /><em>More to bring to your care.</em></h2>
        <p>Five connected spaces, built around the moments that matter.</p>
      </div>
      <div className="tour-tabs" role="tablist" aria-label="Explore app features">
        {screens.map((item, index) => <button key={item.id} type="button" role="tab" id={`tab-${item.id}`} aria-controls="tour-panel" aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={e => {
          const next = e.key === "ArrowRight" ? (index + 1) % screens.length : e.key === "ArrowLeft" ? (index + screens.length - 1) % screens.length : e.key === "Home" ? 0 : e.key === "End" ? screens.length - 1 : null;
          if (next !== null) { e.preventDefault(); setSelected(next); document.getElementById(`tab-${screens[next].id}`)?.focus(); }
        }}>{String(index + 1).padStart(2, "0")} <span>{item.label}</span></button>)}
      </div>
      <div className="tour-panel" id="tour-panel" role="tabpanel" aria-labelledby={`tab-${screen.id}`}>
        <div className="tour-visual"><AppPreview key={screen.id} variant={screen.id} flat /><span className="preview-disclosure">Product concept · all records are fictional</span><a className="preview-download" href={`/app-previews/${screen.id}.png`} target="_blank" rel="noreferrer">View full-size screen ↗</a></div>
        <div className="tour-copy"><span className="eyebrow">{screen.label}</span><h3>{screen.title}</h3><p>{screen.body}</p><ul>{screen.points.map(point => <li key={point}><Check size={18} />{point}</li>)}</ul><JoinButton>Help shape the app <ArrowRight size={17} /></JoinButton><p className="tour-note">Join the closed-beta waitlist. No payment details needed.</p></div>
      </div>
      <p className="tour-status">A preview of the app we’re building. Features may change during beta. Sinus Companion supports tracking and visit preparation; it does not diagnose or prescribe treatment.</p>
    </div>
  </section>;
}
