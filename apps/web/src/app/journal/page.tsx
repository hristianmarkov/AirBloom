import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/articles";
import { ArticleArt } from "@/components/article-art";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "The journal — Everyday sinus understanding",
  description:
    "Thoughtful guides to sinus symptom tracking and preparing for your next ENT appointment. A little knowledge, more room for you.",
  alternates: { canonical: "/journal" },
};
export default function Journal() {
  return (
    <main id="main" className="container">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Sinus Companion Journal",
          url: `${site.url}/journal`,
          description: metadata.description,
        }}
      />
      <div className="journal-header">
        <span className="eyebrow">THE SINUS COMPANION JOURNAL</span>
        <h1>
          Room to
          <br />
          <em>understand.</em>
        </h1>
        <p>
          Small, thoughtful reads for life with sinus symptoms. Less overwhelm.
          A little more perspective.
        </p>
      </div>
      <span className="journal-label">
        <BookOpen size={12} /> The everyday collection · 2 guides
      </span>
      <div className="article-grid journal-list">
        {articles.map((a) => (
          <Link
            className="article-card"
            href={`/journal/${a.slug}`}
            key={a.slug}
          >
            <ArticleArt kind={a.art} />
            <div className="article-meta">
              <span>{a.category}</span>
              <span>{a.readTime} min read</span>
            </div>
            <div className="article-card-title">
              <h2
                style={{
                  fontSize: 32,
                  fontFamily: "var(--serif)",
                  letterSpacing: "-.5px",
                }}
              >
                {a.title}
              </h2>
              <span className="round-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <p>{a.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
