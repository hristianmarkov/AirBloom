import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

const description =
  "How the AirBloom Journal uses sources, discloses clinical review status, describes the app, and handles corrections.";

export const metadata: Metadata = {
  title: "Editorial policy and corrections",
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: { title: "AirBloom editorial policy", description, url: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <main id="main" className="container privacy-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${site.url}/editorial-policy#page`,
          name: "AirBloom editorial policy and corrections",
          url: `${site.url}/editorial-policy`,
          description,
          dateModified: "2026-11-10",
          publisher: { "@id": `${site.url}/#organization` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Editorial policy", item: `${site.url}/editorial-policy` },
            ],
          },
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Editorial policy</span>
      </nav>
      <span className="eyebrow">HOW WE PUBLISH</span>
      <h1>Our editorial <em>policy.</em></h1>
      <p>Published November 10, 2026</p>
      <div className="quick-answer">
        <span>OUR CURRENT REVIEW STATUS</span>
        <p>
          AirBloom publishes general education and practical recording resources.
          The journal has no confirmed clinical reviewer at present. Articles
          disclose their review status; publication and update dates are not
          clinical approval dates.
        </p>
      </div>
      <h2>Responsibility and attribution</h2>
      <p>
        {site.operator} operates AirBloom and is responsible for this website.
        The <Link href="/authors/airbloom-editorial-team">AirBloom editorial team</Link>{" "}
        is a collective attribution, not a named clinician. We do not invent
        qualifications, reviewer identities, endorsements, or patient outcomes.
      </p>
      <h2>Sources and uncertainty</h2>
      <p>
        Guides link to official public-health information, clinical guidelines,
        and other relevant primary or specialist sources. References let readers
        inspect the basis and limitations of a statement. We aim to put sources
        beside material health claims as well as in the reference list, and to
        identify country-specific care pathways where they differ.
      </p>
      <p>
        A diary records observations; it cannot establish diagnosis or prove
        that an exposure caused a symptom. Fictional examples are labeled.
        Missing entries stay missing rather than becoming symptom-free days.
        Personal diary scales are not presented as validated clinical scores.
      </p>
      <h2>Clinical review</h2>
      <p>
        We distinguish editorial checking of templates and product descriptions
        from clinical review of health information. Where a qualified clinician
        or pharmacist approves material, the page should name that person, their
        relevant role, the scope of review, and its date. Until that information
        exists, a page must not imply clinical approval.
      </p>
      <p>
        Content about medicines, procedures, diagnosis, or urgent symptoms needs
        particular care. Follow your own clinician’s instructions, the applicable
        product label, and current official guidance. AirBloom does not select
        medicines, set doses, prescribe, or assess whether an individual needs a
        test or treatment.
      </p>
      <h2>Product mentions</h2>
      <p>
        This journal is published by the organisation developing AirBloom. Guides
        may mention how planned app features relate to a recording task. The app
        remains in development; references to planned features do not mean they
        are available or clinically validated. Templates and educational material
        remain usable without signing up.
      </p>
      <h2>Updates and corrections</h2>
      <p>
        A publication date records when a guide first appeared. An update date
        records a substantive change, not an automatic freshness signal. Our
        review schedule is to revisit higher-risk or heavily used guides every
        six months and other guides annually, with earlier checks when a source
        or product claim changes. This schedule is a commitment, not evidence of
        a completed clinical review.
      </p>
      <p>
        To report an error, email{" "}
        <a href={`mailto:${site.contactEmail}?subject=AirBloom%20editorial%20correction`}>
          {site.contactEmail}
        </a>{" "}
        with the page address, the passage in question, and a supporting source
        if available. We will assess the report and correct substantiated errors.
        Do not include private health records. This contact is not monitored as
        a medical advice or emergency service.
      </p>
      <p>
        Learn more <Link href="/about">about AirBloom</Link> or read the{" "}
        <Link href="/privacy">waitlist privacy notice</Link>.
      </p>
    </main>
  );
}
