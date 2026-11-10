import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Download } from "lucide-react";
import { articles } from "@/lib/articles";
import { JournalBrowser } from "@/components/journal-browser";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sinus symptom guides, diaries & appointment tools",
  description:
    "Practical sinus symptom guides, printable diaries, treatment logs and appointment tools. Understand your records and prepare clearer questions for your clinician.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  return (
    <main id="main" className="container journal-hub">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${site.url}/journal#collection`,
          name: "The AirBloom Journal",
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
        <span className="eyebrow">THE AIRBLOOM JOURNAL</span>
        <h1>
          Sinus symptoms.
          <br />
          <em>Room to understand.</em>
        </h1>
        <p>
          Practical guides to tracking your symptoms, remembering routines and
          preparing for care. A clearer record starts with a little context.
        </p>
      </div>
      <Link href="/resources" className="journal-resource-banner">
        <Download size={24} aria-hidden="true" />
        <span>
          <strong>Something useful to take away.</strong>
          <span>Free symptom diaries, logs and appointment worksheets.</span>
        </span>
        <ArrowUpRight size={23} aria-hidden="true" />
      </Link>
      <p className="journal-editorial-note">
        Written by the <Link href="/authors/airbloom-editorial-team">AirBloom editorial team</Link>.
        {" "}General education; these guides have not been clinically reviewed.
        {" "}<Link href="/editorial-policy">How we handle sources and review</Link>.
      </p>
      <span className="journal-label">
        <BookOpen size={12} aria-hidden="true" /> The everyday collection · {articles.length} guides
      </span>
      <JournalBrowser articles={articles.map((article) => ({
        slug: article.slug,
        title: article.title,
        description: article.description,
        category: article.category,
        topic: article.topic,
        readTime: article.readTime,
        art: article.art,
      }))} />
    </main>
  );
}
