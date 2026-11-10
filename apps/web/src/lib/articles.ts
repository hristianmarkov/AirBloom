import content from "./journal-content.json";
import coverage from "./journal-coverage.json";

export type ArticleSource = { id: string; title: string; url: string };
export type ArticleDownload = { label: string; href: string; assetId: string };
export type ArticleSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  ordered?: boolean;
  quote?: string;
  tables?: { caption?: string; headers: string[]; rows: string[][] }[];
  links?: { label: string; href: string }[];
  sourceRefs?: string[];
  downloads?: ArticleDownload[];
};
export type Article = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  topic: string;
  readTime: number;
  art: "journal" | "visit" | "conditions" | "routine";
  heroImage: string;
  answer: string;
  answerSourceRefs?: string[];
  publishedAt: string;
  modifiedAt: string;
  author: { name: string; url: string };
  review: {
    status: "not-clinically-reviewed" | "clinically-reviewed";
    reviewer?: { name: string; url: string; credentials: string };
    reviewedAt?: string;
  };
  relatedSlugs: string[];
  briefNumbers?: number[];
  sections: ArticleSection[];
  sources: ArticleSource[];
  downloads?: ArticleDownload[];
  faqs?: { question: string; answer: string }[];
};

// The JSON contains supplied manuscripts and drafts developed from the supplied
// playbook briefs, never editorial benchmark notes.
// The imported drafts remain explicitly marked as not clinically reviewed.
export const articles = content as Article[];

export function validateArticles(records: Article[]) {
  const slugs = new Set<string>();
  for (const article of records) {
    if (slugs.has(article.slug)) throw new Error(`Duplicate article: ${article.slug}`);
    slugs.add(article.slug);
  }
  for (const article of records) {
    const sourceIds = new Set(article.sources.map((source) => source.id));
    const sections = new Set<string>();
    if (!article.title || !article.description || !article.answer || !article.sections.length) {
      throw new Error(`Incomplete article: ${article.slug}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(article.modifiedAt)) {
      throw new Error(`Invalid article dates: ${article.slug}`);
    }
    if (article.review.status === "clinically-reviewed" && (!article.review.reviewer || !article.review.reviewedAt)) {
      throw new Error(`Missing clinical review attribution: ${article.slug}`);
    }
    for (const related of article.relatedSlugs) {
      if (!slugs.has(related) || related === article.slug) throw new Error(`Invalid related article: ${article.slug} -> ${related}`);
    }
    for (const source of article.sources) {
      if (new URL(source.url).protocol !== "https:") throw new Error(`Invalid source URL: ${source.url}`);
    }
    for (const ref of article.answerSourceRefs ?? []) {
      if (!sourceIds.has(ref)) throw new Error(`Missing answer source: ${article.slug} -> ${ref}`);
    }
    for (const section of article.sections) {
      if (!section.id || sections.has(section.id)) throw new Error(`Duplicate section: ${article.slug}#${section.id}`);
      sections.add(section.id);
      for (const ref of section.sourceRefs ?? []) {
        if (!sourceIds.has(ref)) throw new Error(`Missing source: ${article.slug}#${section.id} -> ${ref}`);
      }
      for (const table of section.tables ?? []) {
        if (!table.headers.length || table.rows.some((row) => row.length !== table.headers.length)) {
          throw new Error(`Malformed table: ${article.slug}#${section.id}`);
        }
      }
    }
  }
  return true;
}

export type JournalBrief = {
  number: number;
  title: string;
  href: string;
  provenance: string;
  decision: string;
};

export const journalBriefs: JournalBrief[] = coverage;

export function validateJournalCoverage(records: Article[], briefs: JournalBrief[]) {
  const bySlug = new Map(records.map((article) => [article.slug, article]));
  const checkDestination = (href: string) => {
    if (!href.startsWith("/journal/")) return;
    const [slug, fragment] = href.slice("/journal/".length).split("#");
    const target = bySlug.get(slug);
    if (!target || (fragment && !target.sections.some((section) => section.id === fragment))) {
      throw new Error(`Broken journal destination: ${href}`);
    }
  };
  if (briefs.length !== 50 || new Set(briefs.map((brief) => brief.number)).size !== 50 ||
      briefs.some((brief) => brief.number < 1 || brief.number > 50)) {
    throw new Error("Every one of the 50 supplied briefs needs a canonical destination.");
  }
  for (const brief of briefs) checkDestination(brief.href);
  for (const article of records) {
    for (const section of article.sections) {
      for (const link of section.links ?? []) checkDestination(link.href);
    }
  }
  return true;
}

validateArticles(articles);
validateJournalCoverage(articles, journalBriefs);
