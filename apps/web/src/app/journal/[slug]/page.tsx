import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
import { ArticleArt } from "@/components/article-art";
import { StructuredData } from "@/components/structured-data";
import { AppPreview } from "@/components/app-preview";
import { JoinButton, StoreButtons } from "@/components/waitlist";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      publishedTime: "2026-11-09",
      modifiedTime: "2026-11-09",
      authors: [site.name],
      images: ["/opengraph-image"],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = articles.find((b) => b.slug !== slug)!;
  return (
    <main id="main" className="container article-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: "2026-11-09",
          dateModified: "2026-11-09",
          author: {
            "@type": "Organization",
            name: "Sinus Companion editorial team",
            url: site.url,
          },
          publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
          },
          mainEntityOfPage: `${site.url}/journal/${a.slug}`,
          image: `${site.url}/opengraph-image`,
          inLanguage: "en-US",
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            {
              "@type": "ListItem",
              position: 2,
              name: "The journal",
              item: `${site.url}/journal`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: a.title,
              item: `${site.url}/journal/${a.slug}`,
            },
          ],
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={11} />
        <Link href="/journal">The journal</Link>
        <ChevronRight size={11} />
        <span>{a.category}</span>
      </nav>
      <header className="article-header">
        <div className="article-meta">
          <span>{a.category}</span>
          <span>{a.readTime} min read</span>
        </div>
        <h1>{a.title}</h1>
        <p>{a.description}</p>
        <div className="byline">
          Sinus Companion editorial team · November 9, 2026
          <br />
          {site.demo ? "Demo editorial content" : "Educational guide"} · Not
          clinically reviewed
        </div>
      </header>
      <ArticleArt kind={a.art} />
      <div className="article-layout">
        <aside className="article-toc">
          <strong>IN THIS GUIDE</strong>
          <a href="#quick-answer">The short answer</a>
          {a.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
          <a href="#sources">Sources & further reading</a>
        </aside>
        <article className="article-body">
          <div className="quick-answer" id="quick-answer">
            <span>THE SHORT ANSWER</span>
            <p>{a.answer}</p>
          </div>
          {a.sections.map((s) => (
            <section key={s.id}>
              <h2 id={s.id}>{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.items && (
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
              {s.quote && (
                <blockquote className="article-callout">{s.quote}</blockquote>
              )}
            </section>
          ))}
          <div className="article-sources" id="sources">
            <h3>Sources & further reading</h3>
            <ul>
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title} <ArrowUpRight size={11} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="article-disclaimer">
              This guide provides general education, not individual medical
              advice. It has not been clinically reviewed. Talk to a qualified
              clinician about persistent, new, or worsening symptoms. Follow
              your local emergency guidance for urgent concerns.
            </p>
          </div>
          <div className="article-cta">
            <span className="eyebrow">MAKE A LITTLE ROOM FOR YOU</span>
            <h3>Your story, together.</h3>
            <p>
              We’re building a calmer way to record your days and prepare for
              your next conversation.
            </p>
            <JoinButton>
              Join the closed beta <ArrowRight size={16} />
            </JoinButton>
          </div>
        </article>
        <aside className="article-product" aria-label="Discover Sinus Companion">
          <span className="eyebrow">FROM READING TO REMEMBERING</span>
          <h2>Your symptoms.<br />A clearer story.</h2>
          <p>Keep the details that matter between appointments.</p>
          <div className="sidebar-preview"><AppPreview variant="insights" flat /></div>
          <ul><li>Quick symptom check-ins</li><li>Flare and routine history</li><li>An editable ENT Visit Pack</li></ul>
          <StoreButtons />
          <p className="sidebar-note">Planned for iOS & Android. Both buttons open the closed-beta signup.</p>
          <span className="preview-disclosure">App concept · fictional records</span>
        </aside>
      </div>
      <div className="related-reading">
        <span>A LITTLE MORE TO EXPLORE</span>
        <Link href={`/journal/${related.slug}`}>
          {related.title}
          <ArrowUpRight size={24} />
        </Link>
      </div>
    </main>
  );
}
