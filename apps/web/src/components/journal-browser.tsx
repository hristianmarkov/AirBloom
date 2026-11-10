"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { ArticleArt } from "@/components/article-art";

type GuideSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  topic: string;
  readTime: number;
  art: "journal" | "visit" | "conditions" | "routine";
};

// Only summaries cross the client boundary. Every guide link is present in the
// initial server-rendered list; filtering is an optional reading aid.
export function JournalBrowser({ articles }: { articles: GuideSummary[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const topics = [...new Set(articles.map((article) => article.topic))];
  const terms = query.trim().toLocaleLowerCase("en-GB").split(/\s+/).filter(Boolean);
  const visible = articles.filter((article) => {
    if (topic && article.topic !== topic) return false;
    const text = `${article.title} ${article.description} ${article.topic}`.toLocaleLowerCase("en-GB");
    return terms.every((term) => text.includes(term));
  });

  return (
    <div className="journal-browser">
      <div className="journal-filters" role="search" aria-label="Find a journal guide">
        <label className="journal-search" htmlFor="guide-search">
          <span>Search the guides</span>
          <span className="journal-search-input">
            <Search size={17} aria-hidden="true" />
            <input id="guide-search" type="search" placeholder="Try diary, sleep or appointment" value={query} onChange={(event) => setQuery(event.target.value)} />
          </span>
        </label>
        <label className="journal-topic" htmlFor="guide-topic">
          <span>Browse by topic</span>
          <select id="guide-topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">All topics</option>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="journal-results">
        <p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "guide" : "guides"}{topic ? ` in ${topic}` : " to explore"}</p>
        {(query || topic) ? <button type="button" onClick={() => { setQuery(""); setTopic(""); }}>Clear filters</button> : null}
      </div>
      {visible.length ? (
        <div className="article-grid journal-list">
          {visible.map((article) => (
            <Link className="article-card" href={`/journal/${article.slug}`} key={article.slug}>
              <ArticleArt kind={article.art} />
              <div className="article-meta"><span>{article.topic}</span><span>{article.readTime} min read</span></div>
              <div className="article-card-title">
                <h2 className="journal-card-heading">{article.title}</h2>
                <span className="round-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
              <p>{article.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="journal-empty"><h2>No guides match those words yet.</h2><p>Try a broader term or choose another topic.</p></div>
      )}
    </div>
  );
}
