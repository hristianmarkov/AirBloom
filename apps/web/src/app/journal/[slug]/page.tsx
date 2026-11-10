import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronRight, Download } from "lucide-react";
import { articles, type Article } from "@/lib/articles";
import { resources } from "@/lib/resources";
import { site } from "@/lib/site";
import { ArticleArt } from "@/components/article-art";
import { StructuredData } from "@/components/structured-data";
import { AppPreview } from "@/components/app-preview";
import { JoinButton, StoreButtons } from "@/components/waitlist";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export const dynamicParams = false;

function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).href;
}

function readableDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(date));
}

function SourceRefs({ refs, sources }: { refs?: string[]; sources: Article["sources"] }) {
  const cited = sources.filter((source) => refs?.includes(source.id));
  if (!cited.length) return null;
  return (
    <p className="journal-source-refs">
      <span>Source{cited.length === 1 ? "" : "s"}: </span>
      {cited.map((source, index) => (
        <span key={source.id}>
          {index ? "; " : ""}<a href={`#source-${source.id}`}>{source.title}</a>
        </span>
      ))}
    </p>
  );
}

type DownloadLink = { label: string; href: string; assetId?: string };

function DownloadLinks({ downloads }: { downloads?: DownloadLink[] }) {
  if (!downloads?.length) return null;
  return (
    <ul className="journal-download-links">
      {downloads.map((download) => (
        <li key={download.href}>
          <a href={download.href} data-template-id={download.assetId}>
            <Download size={17} aria-hidden="true" />{download.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function DownloadPanel({ downloads }: { downloads: DownloadLink[] }) {
  return <section id="downloads" className="journal-download-panel">
    <span className="eyebrow">A LITTLE HELP ON PAPER</span><h2>Free templates for this guide</h2>
    <p>Open a worksheet to fill in and print, or download a blank copy. Keep completed records private and share them only with people you choose.</p>
    <DownloadLinks downloads={downloads} />
  </section>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const title = article.seoTitle || article.title;
  const image = article.heroImage || "/opengraph-image";
  return {
    title,
    description: article.description,
    alternates: { canonical: `/journal/${article.slug}` },
    authors: [{ name: article.author.name, url: absoluteUrl(article.author.url) }],
    openGraph: {
      title,
      url: `${site.url}/journal/${article.slug}`,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [absoluteUrl(article.author.url)],
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title, description: article.description, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = article.relatedSlugs.map((relatedSlug) => articles.find((item) => item.slug === relatedSlug)).filter((item): item is Article => Boolean(item));
  const matchedResources = resources.filter((resource) => resource.articleSlug === article.slug);
  const resourceDownloads: DownloadLink[] = matchedResources.flatMap((resource) => [
    ...(resource.editable ? [{ label: `${resource.title} — fill in or print`, href: resource.editable, assetId: resource.id }] : []),
    ...(resource.pdf ? [{ label: `${resource.title} (PDF)`, href: resource.pdf, assetId: resource.id }] : []),
    ...(resource.spreadsheet ? [{ label: `${resource.title} (Excel)`, href: resource.spreadsheet, assetId: resource.id }] : []),
    ...(resource.csv ? [{ label: `${resource.title} (CSV)`, href: resource.csv, assetId: resource.id }] : []),
  ]);
  const downloadMap = new Map([...(article.downloads || []), ...resourceDownloads].map((download) => [download.href, download]));
  const downloads = [...downloadMap.values()].sort((a, b) => Number(b.href.endsWith(".html")) - Number(a.href.endsWith(".html")));
  const downloadAfterIndex = Math.max(0, article.sections.findIndex((section) => section.tables?.length));
  const pageUrl = `${site.url}/journal/${article.slug}`;

  return (
    <main id="main" className="container article-page">
      <StructuredData data={{
        "@context": "https://schema.org", "@type": "Article", "@id": `${pageUrl}#article`,
        headline: article.title, articleSection: article.topic,
        abstract: article.answer, citation: article.sources.map((source) => source.url),
        description: article.description, datePublished: article.publishedAt, dateModified: article.modifiedAt,
        author: { "@type": "Organization", "@id": `${absoluteUrl(article.author.url)}#author`, name: article.author.name, url: absoluteUrl(article.author.url) },
        publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
        mainEntityOfPage: pageUrl, image: absoluteUrl(article.heroImage || "/opengraph-image"),
        inLanguage: "en-GB", isAccessibleForFree: true,
      }} />
      <StructuredData data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "The journal", item: `${site.url}/journal` },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
        ],
      }} />
      {article.faqs?.length ? <StructuredData data={{
        "@context": "https://schema.org", "@type": "FAQPage", "@id": `${pageUrl}#questions`,
        mainEntity: article.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }} /> : null}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={11} aria-hidden="true" />
        <Link href="/journal">The journal</Link><ChevronRight size={11} aria-hidden="true" />
        <span aria-current="page">{article.title}</span>
      </nav>
      <header className="article-header">
        <div className="article-meta"><span>{article.topic}</span><span>{article.readTime} min read</span></div>
        <h1>{article.title}</h1>
        <div className="quick-answer" id="quick-answer">
          <span>THE SHORT ANSWER</span><p>{article.answer}</p>
          <SourceRefs refs={article.answerSourceRefs} sources={article.sources} />
        </div>
        <p>{article.description}</p>
        <div className="byline">
          By <Link href={article.author.url}>{article.author.name}</Link>
          {" · "}Published <time dateTime={article.publishedAt}>{readableDate(article.publishedAt)}</time>
          {article.modifiedAt !== article.publishedAt ? <> · Updated <time dateTime={article.modifiedAt}>{readableDate(article.modifiedAt)}</time></> : null}
          <br />
          {site.demo ? "Preview educational guide" : "Educational guide"} · Not clinically reviewed
          {" · "}<Link href="/editorial-policy">Sources & review policy</Link>
        </div>
      </header>
      <ArticleArt kind={article.art} />
      <div className="article-layout">
        <aside className="article-toc">
          <strong>IN THIS GUIDE</strong>
          <a href="#quick-answer">The short answer</a>
          {downloads.length ? <a href="#downloads">Free templates</a> : null}
          {article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          {article.faqs?.length ? <a href="#questions">Common questions</a> : null}
          <a href="#sources">Sources & further reading</a>
        </aside>
        <article className="article-body">
          {article.sections.map((section, sectionIndex) => (
            <Fragment key={section.id}><section>
              <h2 id={section.id}>{section.title}</h2>
              {section.paragraphs?.map((paragraph, index) => <p key={`${section.id}-p-${index}`}>{paragraph}</p>)}
              {section.items ? (section.ordered ? <ol>{section.items.map((item, index) => <li key={`${section.id}-li-${index}`}>{item}</li>)}</ol> : <ul>{section.items.map((item, index) => <li key={`${section.id}-li-${index}`}>{item}</li>)}</ul>) : null}
              {section.tables?.map((table, index) => <div className="journal-table-scroll" role="region" aria-label={table.caption || `${section.title} table ${index + 1}`} tabIndex={0} key={`${section.id}-table-${index}`}>
                <table>
                  {table.caption ? <caption>{table.caption}</caption> : null}
                  <thead><tr>{table.headers.map((header, cell) => <th scope="col" key={`${index}-header-${cell}`}>{header}</th>)}</tr></thead>
                  <tbody>{table.rows.map((row, rowIndex) => <tr key={`${index}-row-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>)}
              {section.quote ? <blockquote className="article-callout">{section.quote}</blockquote> : null}
              <SourceRefs refs={section.sourceRefs} sources={article.sources} />
              {section.links?.length ? <ul className="journal-context-links">{section.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></Link></li>)}</ul> : null}
              <DownloadLinks downloads={section.downloads} />
            </section>
            {downloads.length && sectionIndex === downloadAfterIndex ? <DownloadPanel downloads={downloads} /> : null}
            </Fragment>
          ))}
          {article.faqs?.length ? <section id="questions" className="journal-article-faqs"><h2>Common questions</h2>{article.faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section> : null}
          <div className="article-sources" id="sources">
            <h2>Sources & further reading</h2>
            <ul>{article.sources.map((source) => <li key={source.id} id={`source-${source.id}`}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <ArrowUpRight size={11} aria-hidden="true" /></a></li>)}</ul>
            <p className="article-disclaimer">This guide provides general education, not individual medical advice. It has not been clinically reviewed. Talk to a qualified clinician about persistent, new or worsening symptoms. Follow your local emergency guidance for urgent concerns.</p>
            <p className="journal-correction-link">Spotted an error? <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Journal correction: ${article.title}`)}`}>Tell the editorial team</a>.</p>
          </div>
          <div className="article-cta">
            <span className="eyebrow">MAKE A LITTLE ROOM FOR YOU</span><h3>Your story, together.</h3>
            <p>AirBloom is in development for iOS and Android, bringing symptom records and existing routines into one place. Join the early-access waitlist.</p>
            <JoinButton>Get early access <ArrowRight size={16} aria-hidden="true" /></JoinButton>
          </div>
        </article>
        <aside className="article-product" aria-label="Discover AirBloom">
          <span className="eyebrow">FROM READING TO REMEMBERING</span><h2>Your symptoms.<br />A clearer story.</h2>
          <p>Less guesswork about your day. More context from your own history.</p>
          <div className="sidebar-preview"><AppPreview variant="insights" flat /></div>
          <ul><li>Quick symptom check-ins</li><li>Patterns from your own history</li><li>Existing routine reminders</li><li>An AI companion with context</li></ul>
          <StoreButtons /><p className="sidebar-note">In development for iOS & Android. Join the early-access waitlist.</p>
          <span className="preview-disclosure">App concept · fictional records</span>
        </aside>
      </div>
      <div className="related-reading">
        <span>A LITTLE MORE TO EXPLORE</span>
        {related.map((item) => <Link key={item.slug} href={`/journal/${item.slug}`}>{item.title}<ArrowUpRight size={24} aria-hidden="true" /></Link>)}
        <Link href="/resources">Free printable diaries & worksheets<ArrowUpRight size={24} aria-hidden="true" /></Link>
        <Link href="/journal">Browse every guide<ArrowUpRight size={24} aria-hidden="true" /></Link>
      </div>
    </main>
  );
}
