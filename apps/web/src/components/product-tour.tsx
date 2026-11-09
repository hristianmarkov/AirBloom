"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AppPreview, type PreviewVariant } from "./app-preview";
import { JoinButton } from "./waitlist";

const screens: {
  id: PreviewVariant;
  label: string;
  title: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "today",
    label: "Your day",
    title: "Start the day with a little less guesswork.",
    body: "Your recent symptoms, local conditions, and daily routine, together. The daily outlook we’re building is designed to put your own history to work, so you have more context for the day ahead.",
    points: [
      "Check how today compares with your recent days",
      "Keep air quality and your next reminder in view",
      "A quick check-in keeps the picture up to date",
    ],
  },
  {
    id: "history",
    label: "Your history",
    title: "Stop trying to remember which day was worse.",
    body: "That blocked morning. The week your sense of smell changed. The routine you started last month. Keep the details together and see your story without piecing it back together.",
    points: [
      "One timeline for symptoms, notes, and routines",
      "Mark flares and see how long they lasted",
      "Track every day or only when you need to",
    ],
  },
  {
    id: "routine",
    label: "Your routines",
    title: "One less thing to keep in your head.",
    body: "Keep the medication schedule and care routine you already follow in view. Log a treatment when you use it, check back on how you felt, and keep that history beside your symptoms.",
    points: [
      "Reminders for the times you choose",
      "Log ‘used now’ or add a treatment from earlier",
      "Compare symptoms over time and follow your prescribed directions",
    ],
  },
  {
    id: "insights",
    label: "Your patterns",
    title: "Find the patterns hiding in ordinary days.",
    body: "Are mornings harder? What else changed around a flare? Explore your history across symptoms, routines, and daily conditions, with the recorded days behind every observation.",
    points: [
      "Compare mornings, evenings, and recent weeks",
      "Look at symptoms alongside changes in your routine",
      "Follow the evidence without assuming every link is a cause",
    ],
  },
  {
    id: "ask",
    label: "Your companion",
    title: "A conversation that starts with you.",
    body: "Less explaining your history from scratch. The AI companion is being designed to draw on the entries you choose to share, explain patterns in plain language, and help you explore practical questions about your day.",
    points: [
      "Ask about your own symptoms and recorded routines",
      "Get context with the relevant entries attached",
      "Explore everyday tips and questions to discuss with your clinician",
    ],
  },
  {
    id: "report",
    label: "Your next visit",
    title: "And when it’s time to talk, you’re ready.",
    body: "Your everyday tracking can do more than help you look back. Bring a clear, editable summary to your next appointment, without spending the night before trying to remember everything.",
    points: [
      "Symptoms, flare dates, and routines in one summary",
      "Keep your important questions close",
      "Review every detail and choose what to share",
    ],
  },
];

export function ProductTour() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];

  function selectTab(index: number) {
    setSelected(index);
    document.getElementById(`tab-${screens[index].id}`)?.focus();
  }

  return (
    <section className="section product-tour" id="app-preview">
      <div className="container">
        <div className="section-heading centered">
          <span className="eyebrow">A CLOSER LOOK AT YOUR COMPANION</span>
          <h2>
            Your day. Your patterns.
            <br />
            <em>All connected.</em>
          </h2>

        </div>
        <div
          className="tour-tabs"
          role="tablist"
          aria-label="Explore app features"
        >
          {screens.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-controls="tour-panel"
              aria-selected={index === selected}
              tabIndex={index === selected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % screens.length
                    : event.key === "ArrowLeft"
                      ? (index + screens.length - 1) % screens.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? screens.length - 1
                          : null;
                if (next !== null) {
                  event.preventDefault();
                  selectTab(next);
                }
              }}
            >
              {String(index + 1).padStart(2, "0")} <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div
          className="tour-panel"
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tab-${screen.id}`}
          tabIndex={0}
        >
          <div className="tour-visual">
            <AppPreview key={screen.id} variant={screen.id} flat />
            <span className="preview-disclosure">
              Illustrative app preview · example records
            </span>
          </div>
          <div className="tour-copy">
            <span className="eyebrow">{screen.label}</span>
            <h3>{screen.title}</h3>
            <p>{screen.body}</p>
            <ul>
              {screen.points.map((point) => (
                <li key={point}>
                  <Check size={18} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <JoinButton>
              Get early access <ArrowRight size={17} />
            </JoinButton>
            <p className="tour-note">
              For iOS & Android. No payment details needed.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
