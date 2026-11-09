import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CloudSun,
  Heart,
  LockKeyhole,
  MessageCircle,
  ScanLine,
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
export default function Home() {
  return (
    <main id="main">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          description: site.description,
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
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="beta-pill">
              <span /> BUILT FOR LIFE WITH SINUS SYMPTOMS{" "}
              <ArrowUpRight size={13} />
            </div>
            <h1>
              Know your patterns.
              <br />
              <em>Own your next visit.</em>
            </h1>
            <p className="hero-description">
              Stop piecing together how you felt last week. Track symptoms, see what changes, and bring a clear, personal summary to your next ENT appointment—all in one planned app.
            </p>
            <JoinButton className="button primary hero-join">Join the closed beta <ArrowRight size={18} /></JoinButton>
            <StoreButtons />
            <div className="hero-availability">
              <span className="status-dot" /> Coming to iOS & Android · Join the
              closed beta
            </div>

          </div>
          <div className="hero-visual">
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
                <Check size={16} />
              </span>
              <div>
                <strong>A moment for you.</strong>
                <span>Today’s check-in, done.</span>
              </div>
              <span className="sparkle-small">✦</span>
            </div>
            <div className="floating-card float-pattern">
              <span className="mini-eyebrow">
                <Sparkles size={12} /> SMALL STEPS, BIGGER PICTURE
              </span>
              <strong>Get to know your usual.</strong>
              <TrendChart />
              <div>
                <span>One day at a time.</span>
                <span className="mini-dot" />
              </div>
            </div>
            <div className="hero-caption">
              <ArrowUpRight className="hand-arrow" aria-hidden="true" /> A little support.
              <br />
              Right in your pocket.
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>LESS GUESSWORK. MORE LIVING.</span>
          <a href="#how-it-works">
            See how it works <ArrowDown size={14} />
          </a>
          <span>DESIGNED AROUND YOU</span>
        </div>
      </section>

      <section className="understand-strip">
        <div className="container">
          <p>
            For the days your sinuses
            <br />
            <em>take up too much space.</em>
          </p>
          <div>
            <Wind />
            <span>Persistent congestion</span>
          </div>
          <div>
            <CloudSun />
            <span>Unpredictable days</span>
          </div>
          <div>
            <Heart />
            <span>Feeling more like you</span>
          </div>
        </div>
      </section>

      <section className="section intro-section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">
              A COMPANION, NOT ANOTHER COMPLICATION
            </span>
            <h2>
              Your day has enough going on.
              <br />
              <em>Let’s make this part simpler.</em>
            </h2>
            <p>
              Less trying to remember how you felt last Tuesday.
              <br />
              More understanding what’s happening, one small check-in at a time.
            </p>
          </div>
          <div className="steps">
            <div>
              <span className="step-number">
                01 <span />
              </span>
              <div className="step-icon">
                <ScanLine />
              </div>
              <h3>Capture the day in a few taps.</h3>
              <p>
                Record congestion, pressure, smell, and how your day feels. Add detail when you want to, or just log a flare.
              </p>
            </div>
            <div>
              <span className="step-number">
                02 <span />
              </span>
              <div className="step-icon">
                <Sparkles />
              </div>
              <h3>See changes you might forget.</h3>
              <p>
                Keep symptoms, routine changes, and flare dates on one timeline. Look back at recorded days instead of relying on memory.
              </p>
            </div>
            <div>
              <span className="step-number">
                03 <span />
              </span>
              <div className="step-icon">
                <Heart />
              </div>
              <h3>Walk into your visit prepared.</h3>
              <p>
                Turn your history into an editable ENT Visit Pack. Choose what to share and keep your most important questions close.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <span className="eyebrow">
                THOUGHTFULLY MADE. FOR YOUR EVERYDAY.
              </span>
              <h2>
                A little support.
                <br />
                <em>In all the right places.</em>
              </h2>
            </div>
            <p>
              From the first check-in to your next appointment, your story stays
              together.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card feature-today">
              <div className="feature-copy">
                <span className="feature-label">
                  <CloudSun size={16} /> YOUR DAILY PICTURE
                </span>
                <h3>
                  Know where you are
                  <br />
                  <em>before the day begins.</em>
                </h3>
                <p>
                  Start with how you feel now. Keep your recent symptom trend and local air quality together, without searching through separate apps.
                </p>
                <span className="text-label">
                  A MOMENT OF YOUR DAY. ALL IN ONE PLACE.
                </span>
              </div>
              <div className="feature-phone">
                <AppPreview />
              </div>
              <div className="feature-cloud">
                <CloudSun size={24} />
                <span>
                  Outdoor air quality<strong>Good · AQI 28</strong>
                </span>
              </div>
            </div>
            <div className="feature-card feature-patterns">
              <span className="feature-label">
                <Sparkles size={16} /> YOUR PERSONAL PATTERNS
              </span>
              <h3>
                See what changed.
                <br />
                <em>Remember when.</em>
              </h3>
              <p>
                Notice changes in congestion, smell, and daily impact. Explore what happened around a flare or a routine change, with the recorded days behind every summary.
              </p>
              <div className="pattern-widget">
                <div>
                  <span>Your last 7 days</span>
                  <span className="pattern-badge">Your story, unfolding</span>
                </div>
                <TrendChart large />
                <div className="chart-days">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
                <div className="pattern-widget-note">
                  <span className="round-icon">
                    <Check size={13} />
                  </span>{" "}
                  More of your usual days this week.
                </div>
              </div>
            </div>
            <div className="feature-card feature-chat">
              <span className="feature-label">
                <MessageCircle size={16} /> ASK YOUR COMPANION
              </span>
              <h3>
                Your history.
                <br />
                <em>A helpful conversation.</em>
              </h3>
              <p>
                Ask your history a question. The planned AI companion helps summarize your entries and draft questions for your clinician, so you don’t start from a blank page.
              </p>
              <div className="chat-bubble user-bubble">
                What should I bring up at my next visit?
              </div>
              <div className="chat-bubble assistant-bubble">
                <BrandMark />
                <span>
                  Let’s start with what you’ve noticed. You mentioned changes in
                  smell — shall we add that to your questions?
                </span>
              </div>
              <span className="chat-caption">
                YOUR HISTORY. A THOUGHTFUL STARTING POINT.
              </span>
            </div>
            <div className="feature-card feature-visit">
              <div className="feature-copy">
                <span className="feature-label">
                  <ScanLine size={16} /> YOUR ENT VISIT PACK
                </span>
                <h3>
                  “How have you been?”
                  <br />
                  <em>Now you have the words.</em>
                </h3>
                <p>
                  Give your clinician more than “it’s been a rough month.” Review a concise summary of your symptoms, flare dates, routines, and questions before you share it.
                </p>
                <div className="feature-ticks">
                  <span>
                    <Check size={15} /> Review and make it yours
                  </span>
                  <span>
                    <Check size={15} /> Choose what to share
                  </span>
                </div>
              </div>
              <div className="visit-preview">
                <AppPreview variant="report" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTour />

      <section className="care-note">
        <div className="container">
          <div className="care-symbol">
            <LockKeyhole size={25} />
          </div>
          <div>
            <h3>Your story belongs to you.</h3>
            <p>
              Choose what to record. Choose what to share.
              <br />A thoughtful companion for your care, with you in control.
            </p>
          </div>
          <div className="care-divider" />
          <div className="care-manifesto">
            Built for understanding.
            <br />
            <em>Never for diagnosing.</em>
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
                A LITTLE KNOWLEDGE GOES A LONG WAY
              </span>
              <h2>
                Room to <em>understand.</em>
              </h2>
            </div>
            <Link className="text-link" href="/journal">
              Explore the journal <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
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
            <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
            <h2>
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
            <p>
              Because feeling informed
              <br />
              is a good place to start.
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
            YOUR NEXT CHAPTER STARTS WITH A LITTLE CLARITY
          </span>
          <h2>
            You’re more than
            <br />
            <em>your sinus symptoms.</em>
          </h2>
          <p>Help shape a simpler way to track your symptoms and prepare for care. Join the closed-beta waitlist.</p>
          <StoreButtons light />
          <span className="closing-note">
            Coming soon to iOS & Android. Join the closed beta.
          </span>
          <div className="closing-hill hill-a" />
          <div className="closing-hill hill-b" />
          <BrandMark className="closing-brand" />
        </div>
      </section>
    </main>
  );
}
