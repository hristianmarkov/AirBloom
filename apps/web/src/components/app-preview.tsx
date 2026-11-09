import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  House,
  MessageCircle,
  Plus,
  Sparkles,
  Wind,
} from "lucide-react";
import { BrandMark } from "./icons";

export function TrendChart({ large = false }: { large?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 100"
      className={large ? "trend-chart large" : "trend-chart"}
      role="img"
      aria-label="Illustrative symptom trend, easing across seven days"
    >
      <defs>
        <linearGradient
          id={large ? "fade-large" : "fade"}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
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
        fill={`url(#${large ? "fade-large" : "fade"})`}
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

export function AppPreview({
  variant = "today",
  flat = false,
}: {
  variant?: "today" | "insights" | "report";
  flat?: boolean;
}) {
  return (
    <div
      role="img"
      className={`phone phone-${variant} ${flat ? "flat" : ""}`}
      aria-label={`Illustrative app concept: ${variant === "today" ? "daily check-in, recent symptom trend, and outdoor air quality" : variant === "insights" ? "personal symptom history and recorded patterns" : "editable ENT visit summary with symptom history and questions"}. All data is fictional.`}
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
            <p className="app-subtitle">A little check-in. A clearer day.</p>
            <div className="outlook-card">
              <div className="outlook-top">
                <span>
                  <span className="status-dot" /> YOUR DAILY OUTLOOK
                </span>
                <CloudSun size={24} />
              </div>
              <h4>
                A little brighter
                <br />
                ahead.
              </h4>
              <p>
                Your outlook is learning.
                <br />
                Every check-in adds a little clarity.
              </p>
              <div className="outlook-landscape">
                <span />
                <span />
                <span />
              </div>
              <div className="outlook-bottom">
                Your story, one day at a time <ArrowUpRight size={13} />
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
                Finding your rhythm <span>Last 7 days</span>
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
            <div className="app-conditions">
              <Wind size={17} />
              <div>
                <strong>A little fresh air</strong>
                <span>Outdoor air quality · Good</span>
              </div>
              <span className="air-number">28</span>
            </div>
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
                Patterns are a starting point for a conversation, not a
                diagnosis.
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
        <span>
          <Activity />
          History
        </span>
        <span className={variant === "insights" ? "active" : ""}>
          <Sparkles />
          Insights
        </span>
        <span>
          <MessageCircle />
          Ask
        </span>
        <span className={variant === "report" ? "active" : ""}>
          <BrandMark />
          Care
        </span>
      </div>
      <div className="phone-home" />
    </div>
  );
}
