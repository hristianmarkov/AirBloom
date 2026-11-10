import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

const description =
  "The AirBloom editorial team is the collective publishing attribution for practical sinus recording guides from Leymora Studios.";

export const metadata: Metadata = {
  title: "AirBloom editorial team",
  description,
  alternates: { canonical: "/authors/airbloom-editorial-team" },
  openGraph: {
    title: "AirBloom editorial team",
    description,
    url: "/authors/airbloom-editorial-team",
  },
};

export default function EditorialTeamPage() {
  const url = `${site.url}/authors/airbloom-editorial-team`;
  return (
    <main id="main" className="container privacy-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${url}#profile`,
          url,
          name: "AirBloom editorial team",
          description,
          mainEntity: {
            "@type": "Organization",
            "@id": `${url}#author`,
            name: "AirBloom editorial team",
            url,
            description,
            email: site.contactEmail,
            parentOrganization: { "@id": `${site.url}/#organization` },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "AirBloom editorial team", item: url },
            ],
          },
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Editorial team</span>
      </nav>
      <span className="eyebrow">WHO IS BEHIND THE WORDS</span>
      <h1>AirBloom <em>editorial team.</em></h1>
      <div className="quick-answer">
        <span>COLLECTIVE PUBLISHING ATTRIBUTION</span>
        <p>
          This byline identifies the AirBloom website’s editorial work under
          {" "}{site.operator}. It does not identify an individual clinician or
          imply clinical review.
        </p>
      </div>
      <h2>What this team publishes</h2>
      <p>
        The journal focuses on keeping useful symptom records, understanding
        the limits of personal observations, and preparing questions for care
        appointments. Its templates are designed to make dates, routines, daily
        impact, and missing information easier to describe.
      </p>
      <p>
        The website is published by the organisation developing AirBloom, so
        guides may include relevant mentions of the planned app. The app is
        still in development and its screens are illustrative concepts.
      </p>
      <h2>Expertise and review status</h2>
      <p>
        No individual professional credentials are claimed for this collective
        byline. No clinical reviewer has been confirmed for the collection.
        Sources and page-level review disclosures help readers distinguish
        general educational material from clinically reviewed advice.
      </p>
      <p>
        Read the <Link href="/editorial-policy">editorial policy</Link> for our
        source standards, planned review schedule, and correction process. For
        individual symptoms or treatment questions, speak to a qualified health
        professional.
      </p>
      <h2>Contact the publisher</h2>
      <p>
        Contact {site.operator} at{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> about a
        factual error or the website. Include the guide’s address and the detail
        to check, without sending personal health information.
      </p>
      <p>
        <Link href="/journal">Explore the journal</Link> ·{" "}
        <Link href="/resources">Browse practical templates</Link> ·{" "}
        <Link href="/about">About AirBloom</Link>
      </p>
    </main>
  );
}
