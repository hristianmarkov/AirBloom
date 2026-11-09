import {
  Activity,
  Bell,
  Clock3,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  House,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { useId } from "react";
import { BrandMark } from "./icons";

export function TrendChart({ large = false }: { large?: boolean }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 300 100"
      className={large ? "trend-chart large" : "trend-chart"}
      role="img"
      aria-label="Illustrative symptom trend, easing across seven days"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#accdc1" stopOpacity=".5" />
          <stop offset="100%" stopColor="#accdc1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 50, 80].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="300"
          y2={y}
          stroke="#dde4dd"
          strokeDasharray="3 5"
        />
      ))}
      <path
        d="M3 27C23 27 28 54 49 54S72 28 96 35 115 76 145 64 163 41 191 56 215 78 240 72 269 53 296 70V100H3Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M3 27C23 27 28 54 49 54S72 28 96 35 115 76 145 64 163 41 191 56 215 78 240 72 269 53 296 70"
        fill="none"
        stroke="#648c7b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="296"
        cy="70"
        r="4"
        fill="#315b4a"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  );
}

export type PreviewVariant =
  | "today"
  | "history"
  | "routine"
  | "insights"
  | "ask"
  | "report";

export function AppPreview({
  variant = "today",
  flat = false,
}: {
  variant?: PreviewVariant;
  flat?: boolean;
}) {
  return (
    <div
      role="img"
      className={`phone phone-${variant} ${flat ? "flat" : ""}`}
      aria-label={`Illustrative app concept: ${variant === "today" ? "daily symptom context, check-in, and saved routine reminder" : variant === "history" ? "calendar, recorded flares, and care milestones" : variant === "ask" ? "AI companion exploring morning symptoms using recorded notes" : variant === "insights" ? "personal symptom history and recorded patterns" : variant === "routine" ? "medication and care reminders set by the user" : "editable ENT visit summary with symptom history and questions"}. All data is fictional.`}
    >
      <div className="phone-camera" />
      <div className="phone-status">
        <span>9:41</span>
        <span className="status-glyphs">
          ▂▄▆ <span>◒</span> ▰
        </span>
      </div>
      <div className="phone-body">
        {variant === "today" ? (
          <>
            <div className="app-top">
              <span className="app-wordmark">
                <BrandMark /> sinus companion
              </span>
              <span className="app-avatar">J</span>
            </div>
            <p className="app-date">MONDAY, MAY 18</p>
            <h3>
              Good morning, Jamie <span className="tiny-sun">☀</span>
            </h3>
            <p className="app-subtitle">
              Your day, with a little more context.
            </p>
            <div className="outlook-card">
              <div className="outlook-top">
                <span>
                  <span className="status-dot" /> YOUR DAILY OUTLOOK
                </span>
                <CloudSun size={24} />
              </div>
              <h4>
                Your day,
                <br />
                in focus.
              </h4>
              <p>
                Recent mornings: mostly mild.
                <br />
                Add today’s check-in to see what changed.
              </p>
              <div className="outlook-landscape">
                <span />
                <span />
                <span />
              </div>
              <div className="outlook-bottom">
                Recent check-ins + local conditions <ArrowUpRight size={13} />
              </div>
            </div>
            <div className="checkin-heading">
              <h4>How’s your nose today?</h4>
              <span>Just a tap</span>
            </div>
            <div className="checkin-options">
              <span>
                <span>☀</span>Clear
              </span>
              <span className="selected">
                <span>◡</span>My usual
              </span>
              <span>
                <span>☁</span>More blocked
              </span>
            </div>
            <div className="app-section-heading">
              <h4>Your week, at a glance</h4>
              <ChevronRight size={13} />
            </div>
            <div className="mini-trend">
              <span>
                Your symptom trend <span>Last 7 days</span>
              </span>
              <TrendChart />
              <div className="chart-days">
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
                <span>M</span>
              </div>
            </div>
            <div className="app-conditions today-routine">
              <Bell size={17} />
              <div>
                <strong>Your morning reminder</strong>
                <span>Medication · Your saved schedule</span>
              </div>
              <span className="air-number">08:00</span>
            </div>
          </>
        ) : variant === "history" ? (
          <>
            <div className="app-top">
              <span className="app-wordmark">
                <BrandMark /> your history
              </span>
              <Plus size={17} />
            </div>
            <p className="app-date">EVERY DAY HAS CONTEXT</p>
            <h3>Your month, together.</h3>
            <p className="app-subtitle">
              The details you don’t have to remember.
            </p>
            <div className="history-calendar">
              <strong>
                May 2026 <ChevronLeft size={12} />
                <ChevronRight size={12} />
              </strong>
              <div className="calendar-grid">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span className="calendar-label" key={`d${i}`}>
                    {d}
                  </span>
                ))}
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={`blank${i}`} aria-hidden="true" />
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i === 17
                        ? "calendar-selected"
                        : [4, 5, 6, 7].includes(i)
                          ? "calendar-flare"
                          : i < 18 && i % 4 !== 0
                            ? "calendar-logged"
                            : ""
                    }
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="calendar-key">
                ● Logged day <span>● Flare</span> · Blank = unrecorded
              </div>
            </div>
            <div className="app-section-heading">
              <h4>Monday, May 18</h4>
              <span>2 entries</span>
            </div>
            <div className="timeline-entry">
              <span>08:10</span>
              <strong>Morning check-in</strong>
              <p>Nose: my usual · Smell: reduced</p>
            </div>
            <div className="timeline-entry">
              <span>18:30</span>
              <strong>Evening check-in</strong>
              <p>Overall symptoms: mild</p>
            </div>
          </>
        ) : variant === "routine" ? (
          <>
            <div className="app-top">
              <span className="app-wordmark">
                <BrandMark /> your routine
              </span>
              <Bell size={17} />
            </div>
            <p className="app-date">MONDAY, MAY 18</p>
            <h3>Less to remember.</h3>
            <p className="app-subtitle">Your schedule. A gentle nudge.</p>
            <div className="routine-summary">
              <span className="eyebrow">TODAY’S ROUTINE</span>
              <h4>One thing at a time.</h4>
              <div className="routine-progress">
                <span />
              </div>
              <span className="record-source">
                Times and reminders chosen by you
              </span>
            </div>
            <div className="app-section-heading">
              <h4>Your saved reminders</h4>
              <Clock3 size={13} />
            </div>
            <div className="routine-item done">
              <span className="routine-time">08:00</span>
              <div>
                <strong>Morning medication</strong>
                <p>Follow your prescribed directions</p>
              </div>
              <span className="routine-check">
                <Check size={13} />
              </span>
            </div>
            <div className="routine-actions">
              <span>
                <Plus size={11} /> Used now
              </span>
              <span>
                <Clock3 size={11} /> Log earlier
              </span>
            </div>
            <div className="routine-item">
              <span className="routine-time">20:00</span>
              <div>
                <strong>Evening check-in</strong>
                <p>How did today feel?</p>
              </div>
              <span className="routine-check">
                <Bell size={12} />
              </span>
            </div>
            <div className="routine-followup">
              <span className="app-date">AFTER YOUR LOGGED ROUTINE</span>
              <h4>Did that help?</h4>
              <p>Check in on how you feel now.</p>
              <div className="routine-actions">
                <span>A little clearer</span>
                <span>About the same</span>
              </div>
            </div>
            <p className="chat-safety">
              Follow your prescribed directions. Compare maintenance routines
              across days.
            </p>
          </>
        ) : variant === "ask" ? (
          <>
            <div className="app-top">
              <span className="app-wordmark">
                <BrandMark /> your companion
              </span>
              <MessageCircle size={17} />
            </div>
            <p className="app-date">START WITH YOUR OWN STORY</p>
            <h3>What’s on your mind?</h3>
            <p className="app-subtitle">
              Make more of the history you’ve kept.
            </p>
            <div className="preview-chat user">
              Why were my mornings harder last week?
            </div>
            <div className="preview-chat assistant">
              <BrandMark />
              <p>
                You recorded more congestion on 3 mornings. Your notes mention
                poor sleep on 2 of those nights.
              </p>
              <strong>Something to explore</strong>
              <p>
                That overlap doesn’t prove a cause. Try noting your sleep and
                bedroom conditions alongside your next check-in.
              </p>
              <span className="record-source">
                From your May 12, 14 & 16 entries
              </span>
            </div>
            <div className="draft-question">
              <span>KEEP THE CONVERSATION GOING</span>
              <p>“What changed on the mornings that felt easier?”</p>
              <strong>
                <Sparkles size={12} /> Explore your recorded days
              </strong>
            </div>
            <div className="preview-chat-input">
              Ask about your records <ArrowUpRight size={15} />
            </div>
            <p className="chat-safety">
              AI can make mistakes. Not medical advice.
            </p>
          </>
        ) : variant === "insights" ? (
          <>
            <div className="app-top">
              <span className="app-wordmark">
                <BrandMark /> your insights
              </span>
              <Sparkles size={18} />
            </div>
            <p className="app-date">THE BIGGER PICTURE</p>
            <h3>Your days tell a story.</h3>
            <p className="app-subtitle">
              Small entries. Meaningful perspective.
            </p>
            <div className="insight-summary">
              <span className="eyebrow">YOUR RECENT CHECK-INS</span>
              <h4>
                More of your
                <br />
                <em>usual days.</em>
              </h4>
              <TrendChart large />
              <div className="chart-days">
                <span>12 May</span>
                <span>18 May</span>
              </div>
            </div>
            <div className="app-section-heading">
              <h4>What you’ve recorded</h4>
              <span>7 days</span>
            </div>
            <div className="app-insight-row">
              <span className="insight-emoji">☀</span>
              <div>
                <strong>4 days felt like your usual</strong>
                <p>Out of 6 recorded evenings</p>
              </div>
            </div>
            <div className="app-insight-row">
              <span className="insight-emoji peach">◡</span>
              <div>
                <strong>Smell felt clearer on 2 days</strong>
                <p>From your optional notes</p>
              </div>
            </div>
            <div className="app-note">
              <Sparkles size={16} />
              <p>
                See the recorded days behind each pattern. A link is not always
                a cause.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="app-top">
              <span>
                <ChevronLeft size={16} /> Your care
              </span>
              <span className="app-avatar">
                <Plus size={14} />
              </span>
            </div>
            <p className="app-date">FEEL A LITTLE MORE PREPARED</p>
            <h3>Your ENT visit pack.</h3>
            <p className="app-subtitle">Your story. Ready to share.</p>
            <div className="visit-paper">
              <span className="app-wordmark">
                <BrandMark /> sinus companion
              </span>
              <div className="paper-rule" />
              <span className="app-date">PERSONAL VISIT SUMMARY</span>
              <h4>Jamie’s last 30 days</h4>
              <p>Prepared for your next conversation</p>
              <div className="paper-tags">
                <span>Symptoms</span>
                <span>Routines</span>
                <span>Questions</span>
              </div>
              <h5>A snapshot of your days</h5>
              <TrendChart />
              <div className="paper-lines">
                <span />
                <span />
                <span />
              </div>
              <h5>Things I’d like to ask</h5>
              <p>What could explain the changes in my sense of smell?</p>
              <p>
                Which parts of my symptom history would be helpful to discuss?
              </p>
            </div>
            <div className="report-ready">
              <Check size={16} /> Review and edit before sharing
            </div>
          </>
        )}
      </div>
      <div className="app-tabs">
        <span className={variant === "today" ? "active" : ""}>
          <House />
          Today
        </span>
        <span className={variant === "history" ? "active" : ""}>
          <Activity />
          History
        </span>
        <span className={variant === "insights" ? "active" : ""}>
          <Sparkles />
          Insights
        </span>
        <span className={variant === "ask" ? "active" : ""}>
          <MessageCircle />
          Ask
        </span>
        <span
          className={
            variant === "report" || variant === "routine" ? "active" : ""
          }
        >
          <Bell />
          Routine
        </span>
      </div>
      <div className="phone-home" />
    </div>
  );
}
