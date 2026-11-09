import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/articles";
import { ArticleArt } from "@/components/article-art";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Sinusitis guides — symptoms, patterns & daily routines",
  description:
    "Practical guides to sinus symptom tracking, daily patterns, medication reminders, and making sense of life with recurring congestion.",
  alternates: { canonical: "/journal" },
};
export default function Journal() {
  return (
    <main id="main" className="container">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${site.url}/journal#collection`,
          name: "The Sinus Companion Journal",
          url: `${site.url}/journal`,
          description: metadata.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: article.title,
              url: `${site.url}/journal/${article.slug}`,
            })),
          },
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
          Understand your patterns. Make routines easier to follow. Find
          practical answers for the days your sinuses get in the way.
        </p>
      </div>
      <span className="journal-label">
        <BookOpen size={12} /> The everyday collection · {articles.length}{" "}
        guides
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
