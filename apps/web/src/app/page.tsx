import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CloudSun,
  Heart,
  LockKeyhole,
  MessageCircle,
  Moon,
  Plus,
  Sparkles,
  Wind,
} from "lucide-react";
import { AppPreview, TrendChart } from "@/components/app-preview";
import { ProductTour } from "@/components/product-tour";
import { ArticleArt } from "@/components/article-art";
import { BrandMark } from "@/components/icons";
import { JoinButton, StoreButtons } from "@/components/waitlist";
import { StructuredData } from "@/components/structured-data";
import { faqs, site } from "@/lib/site";
import { articles } from "@/lib/articles";

export const metadata = { alternates: { canonical: "/" } };

const everydayMoments = [
  {
    number: "01",
    icon: CloudSun,
    title: "The morning you can’t call.",
    problem:
      "Clear nose now. A rough afternoon later. Or the other way around.",
    answer:
      "A daily picture that brings your latest check-in, recent symptoms, and outdoor conditions together.",
  },
  {
    number: "02",
    icon: Bell,
    title: "The routine you meant to keep.",
    problem: "Was that spray this morning? When did I start the rinse?",
    answer:
      "Your own treatment schedule, gentle reminders, and a timeline of what you actually used.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "The pattern you can’t quite see.",
    problem: "Another flare. The same questions. Too many details to remember.",
    answer:
      "Symptoms, sleep, treatments, and conditions on one timeline, with your records behind every insight.",
  },
];

export default function Home() {
  return (
    <main id="main">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              name: site.name,
              url: site.url,
              description: site.description,
              logo: `${site.url}/icon.svg`,
            },
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              name: site.name,
              url: site.url,
              inLanguage: "en",
              publisher: { "@id": `${site.url}/#organization` },
            },
            {
              "@type": "WebPage",
              "@id": `${site.url}/#webpage`,
              url: site.url,
              name: "Sinus Companion — Your Daily Sinusitis Companion",
              description: site.description,
              isPartOf: { "@id": `${site.url}/#website` },
              about: {
                "@type": "Thing",
                name: "Personal sinus symptom tracking",
              },
            },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <section className="hero daily-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="product-pill">
              <span className="status-dot" /> A LITTLE CLARITY. EVERY DAY.
            </div>
            <h1>
              Sinusitis takes enough.
              <br />
              <em>Take your day back.</em>
            </h1>
            <p className="hero-description">
              The blocked mornings. The broken sleep. The “why today?” moments.
              Meet the daily companion designed to connect the dots, keep your
              routine on track, and put your own history to work.
            </p>
            <div className="hero-actions">
              <JoinButton className="button primary hero-join">
                Get early access <ArrowRight size={18} />
              </JoinButton>
              <a href="#app-preview" className="hero-tour-link">
                Take a look inside <ArrowDown size={15} />
              </a>
            </div>
            <p className="hero-availability">
              <span className="status-dot" /> In development for iOS & Android.
              Join the waitlist.
            </p>
            <div className="hero-promises">
              <span>
                <Check size={14} /> Quick check-ins
              </span>
              <span>
                <Check size={14} /> Personal insights
              </span>
              <span>
                <Check size={14} /> Your data, your choice
              </span>
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Illustrative preview of the daily sinus dashboard"
          >
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-sun" />
            <div className="hero-landscape">
              <div />
              <div />
              <div />
            </div>
            <div className="hero-phone">
              <AppPreview />
            </div>
            <div className="floating-card float-check">
              <span className="round-icon">
                <Bell size={17} />
              </span>
              <div>
                <strong>One less thing to remember.</strong>
                <span>Your routine. At your time.</span>
              </div>
              <Check size={14} />
            </div>
            <div className="floating-card float-pattern">
              <span className="mini-eyebrow">
                <Sparkles size={12} /> YOUR WEEK, CONNECTED
              </span>
              <strong>
                Less “why again?”
                <br />
                More “now I see.”
              </strong>
              <TrendChart />
              <div>
                <span>Symptoms + sleep + routines</span>
                <span className="mini-dot" />
              </div>
            </div>
            <span className="hero-preview-label">
              APP PREVIEW · ILLUSTRATIVE DATA
            </span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>LESS GUESSWORK. MORE LIVING.</span>
          <a href="#how-it-works">
            Made for your everyday <ArrowDown size={14} />
          </a>
          <span>YOUR SINUSES DON’T GET THE WHOLE DAY.</span>
        </div>
      </section>

      <section className="capability-strip" aria-label="App features">
        <div className="container">
          <div>
            <CloudSun />
            <span>Your daily outlook</span>
          </div>
          <div>
            <Bell />
            <span>Your treatment routine</span>
          </div>
          <div>
            <Sparkles />
            <span>Your personal patterns</span>
          </div>
          <div>
            <MessageCircle />
            <span>A companion that knows your story</span>
          </div>
        </div>
      </section>

      <section className="section daily-problems" id="how-it-works">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <span className="eyebrow">SOUND FAMILIAR?</span>
              <h2>
                It’s not just a blocked nose.
                <br />
                <em>It’s everything around it.</em>
              </h2>
            </div>
            <p>
              When symptoms keep coming back, keeping track shouldn’t become
              another thing to deal with.
            </p>
          </div>
          <div className="problem-grid">
            {everydayMoments.map(
              ({ number, icon: Icon, title, problem, answer }) => (
                <div className="problem-card" key={number}>
                  <div className="problem-top">
                    <span>{number}</span>
                    <Icon size={23} />
                  </div>
                  <h3>{title}</h3>
                  <p className="problem-thought">{problem}</p>
                  <div className="problem-answer">
                    <ArrowRight size={17} />
                    <p>{answer}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className="section features-section daily-features"
        id="features"
      >
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <span className="eyebrow">ONE COMPANION. THE WHOLE PICTURE.</span>
              <h2>
                Understand your day.
                <br />
                <em>Find your way through it.</em>
              </h2>
            </div>
            <p>
              A closer look at what we’re building around your real, everyday
              questions.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card feature-today">
              <div className="feature-copy">
                <span className="feature-label">
                  <CloudSun size={17} /> YOUR DAILY OUTLOOK
                </span>
                <h3>
                  “What kind of day
                  <br />
                  <em>am I waking up to?”</em>
                </h3>
                <p>
                  Your latest symptoms, recent history, and local conditions.
                  One morning view, designed to help you make sense of today.
                </p>
                <div className="feature-tags">
                  <span>Pollen & air quality</span>
                  <span>Weather & sleep context</span>
                </div>
              </div>
              <div className="feature-phone">
                <AppPreview />
              </div>
              <div className="feature-cloud">
                <CloudSun size={23} />
                <span>
                  Start with how you feel
                  <strong>A clear nose? Update your check-in.</strong>
                </span>
              </div>
            </div>
            <div className="feature-card feature-routine">
              <span className="feature-label">
                <Bell size={17} /> ROUTINES THAT FIT YOUR LIFE
              </span>
              <h3>
                Less to remember.
                <br />
                <em>More room for you.</em>
              </h3>
              <p>
                Save the spray, rinse, or medication routine you already follow.
                Get a nudge when you choose, log a use in a tap, and look back
                at what changed.
              </p>
              <div className="routine-widget">
                <div className="routine-widget-heading">
                  <span>YOUR MORNING ROUTINE</span>
                  <span>08:00</span>
                </div>
                <div className="routine-widget-row">
                  <span className="routine-widget-icon">
                    <Check size={19} />
                  </span>
                  <div>
                    <strong>Nasal spray</strong>
                    <span>Your saved schedule · logged at 08:02</span>
                  </div>
                  <span className="routine-done">Done</span>
                </div>
                <div className="routine-widget-row">
                  <span className="routine-widget-icon peach">
                    <Wind size={20} />
                  </span>
                  <div>
                    <strong>Saline rinse</strong>
                    <span>Quick log · today, 08:10</span>
                  </div>
                  <Plus size={17} />
                </div>
                <div className="routine-followup">
                  <MessageCircle size={15} />
                  <span>After your rinse: how does your nose feel?</span>
                </div>
              </div>
              <span className="feature-fineprint">
                Reminders follow your existing plan, not new treatment advice.
                Illustrative routine.
              </span>
            </div>
            <div className="feature-card feature-patterns">
              <span className="feature-label">
                <Sparkles size={17} /> THE PATTERNS BEHIND YOUR DAYS
              </span>
              <h3>
                Stop keeping it all
                <br />
                <em>in your head.</em>
              </h3>
              <p>
                Was your sleep worse during a flare? What changed after you
                started a routine? Explore your recorded days side by side, with
                the dates and gaps kept in view.
              </p>
              <div className="pattern-widget">
                <div>
                  <span>Symptoms, in context</span>
                  <span className="pattern-badge">ILLUSTRATIVE WEEK</span>
                </div>
                <TrendChart large />
                <div className="chart-days">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                    (day) => (
                      <span key={day}>{day}</span>
                    ),
                  )}
                </div>
                <div className="pattern-widget-note">
                  <Moon size={15} />
                  <span>Explore sleep alongside your symptom history.</span>
                </div>
              </div>
            </div>
            <div className="feature-card feature-chat">
              <span className="feature-label">
                <MessageCircle size={17} /> ASK YOUR COMPANION
              </span>
              <h3>
                Finally, a conversation
                <br />
                <em>with some context.</em>
              </h3>
              <p>
                An AI companion designed around your records, not a blank chat
                box. Ask about your week, understand a pattern, or find a useful
                question to explore.
              </p>
              <div className="chat-bubble user-bubble">
                Were my mornings worse after poor sleep?
              </div>
              <div className="chat-bubble assistant-bubble">
                <BrandMark />
                <span>
                  Let’s compare your morning check-ins with the sleep you
                  recorded. I’ll show you the dates, so you can see the pattern
                  for yourself.<small>YOUR RECORDS, BEHIND THE ANSWER</small>
                </span>
              </div>
              <span className="chat-caption">
                Illustrative conversation · personal context, not a diagnosis
              </span>
            </div>
          </div>
          <p className="feature-context">
            Designed for personal tracking and understanding. Conditions are
            context, not a proven cause; a daily outlook is not an attack
            prediction.
          </p>
        </div>
      </section>

      <ProductTour />

      <section className="section everyday-section">
        <div className="container everyday-grid">
          <div>
            <span className="eyebrow">THE SMALL MOMENTS ADD UP</span>
            <h2>
              Useful on the rough days.
              <br />
              <em>Worth opening on the good ones.</em>
            </h2>
            <p>
              A companion should do more than collect symptoms. It should help
              you find the next useful thing, without demanding your whole
              morning.
            </p>
            <JoinButton className="button primary">
              Make room for clearer days <ArrowRight size={17} />
            </JoinButton>
          </div>
          <div className="day-timeline">
            <div>
              <span className="day-time">08:00</span>
              <span className="day-timeline-icon">
                <CloudSun />
              </span>
              <div>
                <h3>A clearer start.</h3>
                <p>
                  See what’s changed outside. Check in with “clear,” “my usual,”
                  or “worse.” Your own experience comes first.
                </p>
              </div>
            </div>
            <div>
              <span className="day-time">12:30</span>
              <span className="day-timeline-icon">
                <Heart />
              </span>
              <div>
                <h3>A little support, when you choose.</h3>
                <p>
                  Log a routine, note a flare, or answer an optional follow-up.
                  Quiet hours and reminder preferences stay yours.
                </p>
              </div>
            </div>
            <div>
              <span className="day-time">20:00</span>
              <span className="day-timeline-icon">
                <Moon />
              </span>
              <div>
                <h3>One less day lost to memory.</h3>
                <p>
                  A quick evening check-in becomes part of a history you can ask
                  questions about, learn from, and share when it helps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="plans">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <span className="eyebrow">
                A LITTLE LESS THAN YOUR NEXT COFFEE
              </span>
              <h2>
                Start with a clearer record.
                <br />
                <em>Go deeper when you’re ready.</em>
              </h2>
            </div>
            <p>
              Our planned launch plans. Join the waitlist today; there’s nothing
              to pay now.
            </p>
          </div>
          <div className="plan-grid">
            <div className="plan-card">
              <span className="plan-name">THE EVERYDAY ESSENTIALS</span>
              <div className="plan-price">
                Free<span>to start</span>
              </div>
              <p>
                A place for your symptoms, your routines, and your own story.
              </p>
              <ul>
                {[
                  "Unlimited symptom & treatment logs",
                  "Quick daily check-ins & basic reminders",
                  "Today’s available conditions & simple trends",
                  "Basic data export & a simple visit summary",
                ].map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>
              <JoinButton className="button plan-secondary">
                Get early access <ArrowRight size={16} />
              </JoinButton>
            </div>
            <div className="plan-card plan-premium">
              <div className="plan-heading">
                <span className="plan-name">YOUR PERSONAL COMPANION</span>
                <span className="plan-badge">PREMIUM</span>
              </div>
              <div className="plan-price">
                $3.99<span>/ month</span>
              </div>
              <p>
                Less piecing it together. More understanding what’s personal to
                you.
              </p>
              <ul>
                {[
                  "Everything in Free",
                  "Personal pattern reviews & deeper comparisons",
                  "Environmental history, where available",
                  "AI conversations grounded in your records",
                  "Tailored reminders & an enhanced visit report",
                ].map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="plan-year">
                Or $29.99 / year <span>Planned US pricing</span>
              </div>
              <JoinButton className="button primary">
                Join the waitlist <ArrowRight size={16} />
              </JoinButton>
            </div>
          </div>
          <p className="plan-note">
            Plans and features are in development and may change before launch.
            No subscription starts when you join the waitlist.
          </p>
        </div>
      </section>

      <section className="care-note">
        <div className="container">
          <div className="care-symbol">
            <LockKeyhole size={25} />
          </div>
          <div>
            <h3>Your history. Your choice.</h3>
            <p>
              Choose what to record and what to share.
              <br />
              The waitlist asks for an email, never your health history.
            </p>
          </div>
          <div className="care-divider" />
          <div className="care-manifesto">
            More understanding.
            <br />
            <em>You stay in control.</em>
          </div>
          <Link href="/privacy" className="text-link">
            Our approach to privacy <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section journal-section">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <span className="eyebrow">
                FOR THE QUESTIONS THAT KEEP COMING BACK
              </span>
              <h2>
                A little knowledge.
                <br />
                <em>A little less guesswork.</em>
              </h2>
            </div>
            <Link className="text-link" href="/journal">
              Explore the journal <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="article-grid">
            {articles
              .filter((a) => a.slug !== "prepare-for-your-ent-appointment")
              .slice(0, 3)
              .map((article) => (
                <Link
                  className="article-card"
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                >
                  <ArticleArt kind={article.art} />
                  <div className="article-meta">
                    <span>{article.category}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                  <div className="article-card-title">
                    <h3>{article.title}</h3>
                    <span className="round-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </div>
                  <p>{article.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="questions">
        <div className="container faq-grid">
          <div className="section-heading">
            <span className="eyebrow">NO GUESSWORK HERE</span>
            <h2>
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
            <p>
              What it does. What it doesn’t.
              <br />
              And how it fits into your day.
            </p>
            <BrandMark className="faq-mark" />
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <ChevronDown size={18} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="container">
          <div className="closing-orbit" />
          <span className="eyebrow">
            LESS SPACE FOR SYMPTOMS. MORE SPACE FOR YOU.
          </span>
          <h2>
            Your sinuses have a say.
            <br />
            <em>They don’t get the last word.</em>
          </h2>
          <p>
            Be first to hear when your daily companion is ready.
            <br />A clearer record. A steadier routine. More of your life.
          </p>
          <StoreButtons light />
          <span className="closing-note">
            Get early access for iOS & Android. No payment details needed.
          </span>
          <div className="closing-hill hill-a" />
          <div className="closing-hill hill-b" />
          <BrandMark className="closing-brand" />
        </div>
      </section>
    </main>
  );
}
