import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FilePenLine, Printer, Table2 } from "lucide-react";
import { resources } from "@/lib/resources";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Free sinus symptom diaries, logs & appointment templates",
  description: "Print or fill in free sinus symptom diaries, a one-page doctor summary, nasal routine logs and practical observation cards. PDF and editable spreadsheet downloads.",
  alternates: { canonical: "/resources" },
  openGraph: { title: "A little room for your story | AirBloom resources", description: "Free printable and editable diaries, routine logs and appointment worksheets.", url: `${site.url}/resources` },
};

export default function ResourcesPage() {
  return (
    <main id="main" className={`container ${styles.page}`}>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${site.url}/resources#collection`,
        name: "AirBloom free printable resources",
        url: `${site.url}/resources`,
        description: metadata.description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: resources.map((resource, i) => ({
            "@type": "ListItem", position: i + 1, name: resource.title,
            url: `${site.url}/resources#${resource.id}`,
          })),
        },
      }} />
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Resources</span></nav>
      <header className={styles.header}>
        <span className="eyebrow">SMALL TOOLS. A CLEARER STORY.</span>
        <h1>A place to<br /><em>put it into words.</em></h1>
        <p>Free diaries, routine logs and appointment worksheets. Start with a single row, keep the gaps visible, and take the details that matter to your next conversation.</p>
      </header>
      <div className={styles.answer}>
        <Printer size={25} aria-hidden="true" />
        <div><h2>How can I use these templates?</h2><p>Download a PDF to print, open a worksheet to fill in and print in your browser, or choose an editable spreadsheet. Everything is ungated. Browser worksheet entries stay in that tab and are lost when it closes; print or save a PDF to keep your notes.</p></div>
      </div>
      <section className={styles.start} aria-labelledby="start-here">
        <div><span className="eyebrow">A SIMPLE START</span><h2 id="start-here">A daily note. A useful handoff.</h2><p>The diary captures the details as they happen. The one-page summary helps you decide what to bring to your appointment.</p></div>
        <ol><li><a href="#sinus-symptom-diary">Collect a week of observations <ArrowUpRight size={18} /></a></li><li><a href="#sinus-summary-blank">Make a one-page summary <ArrowUpRight size={18} /></a></li><li><a href="#sinus-summary-example">See a worked fictional example <ArrowUpRight size={18} /></a></li></ol>
      </section>
      <div className={styles.sectionHeading}><h2>The worksheet collection</h2><span>{resources.length} practical resources</span></div>
      <div className={styles.grid}>
        {resources.map((resource) => (
          <section key={resource.id} id={resource.id} className={styles.card}>
            <span className={styles.resourceType}>{resource.example ? "FICTIONAL WORKED EXAMPLE" : resource.spreadsheet && !resource.pdf ? "EDITABLE SPREADSHEET" : "PRINTABLE & BROWSER EDITABLE"}</span>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <div className={styles.actions}>
              {resource.editable && <a href={resource.editable}><FilePenLine size={16} aria-hidden="true" /> Fill in & print <span className="sr-only">{resource.title}</span></a>}
              {resource.pdf && <a href={resource.pdf} download><Download size={16} aria-hidden="true" /> PDF <span className="sr-only">{resource.title}</span></a>}
              {resource.spreadsheet && <a href={resource.spreadsheet} download><Table2 size={16} aria-hidden="true" /> Excel <span className="sr-only">{resource.title}</span></a>}
              {resource.csv && <a href={resource.csv} download><Download size={16} aria-hidden="true" /> CSV <span className="sr-only">{resource.title}</span></a>}
            </div>
            <Link className={styles.guide} href={`/journal/${resource.articleSlug}`}>How to use this record <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </section>
        ))}
      </div>
      <aside className={styles.notes}>
        <h2>Your notes, in your hands.</h2>
        <p>Prefer Google Sheets? Import the Excel workbook or CSV into your own spreadsheet. Keep the same field order and labels, and review your file sharing permissions before adding personal notes.</p>
        <p>These worksheets do not upload your health information to AirBloom. Review a completed file before sharing it, remove details you do not need to send, and ask your clinic which sharing method it accepts. Store printed and digital copies somewhere you are comfortable keeping personal information.</p>
        <p>Examples are fictional. Worksheets are educational and have not been clinically reviewed. They cannot diagnose symptoms, establish a cause or choose treatment. Follow your care team’s instructions and the exact product leaflet; getting help takes priority over completing a record.</p>
        <Link href="/editorial-policy">Read our editorial policy <ArrowUpRight size={14} /></Link>
      </aside>
    </main>
  );
}
