import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

const description =
  "Meet AirBloom, a sinus symptom companion in development from Leymora Studios, and learn who is responsible for the website and journal.";

export const metadata: Metadata = {
  title: "About AirBloom and Leymora Studios",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About AirBloom", description, url: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="container privacy-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              "@id": `${site.url}/about#page`,
              url: `${site.url}/about`,
              name: "About AirBloom and Leymora Studios",
              description,
              mainEntity: { "@id": `${site.url}/#organization` },
            },
            {
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              name: site.name,
              url: site.url,
              email: site.contactEmail,
              description: site.description,
              parentOrganization: {
                "@type": "Organization",
                "@id": `${site.url}/about#operator`,
                name: site.operator,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
              ],
            },
          ],
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">About</span>
      </nav>
      <span className="eyebrow">A LITTLE CLARITY ABOUT US</span>
      <h1>About <em>AirBloom.</em></h1>
      <div className="quick-answer">
        <span>WHO WE ARE</span>
        <p>
          AirBloom is a sinus symptom companion in development for iOS and Android,
          operated by {site.operator}. This website offers educational guides,
          practical recording templates, and an early-access waitlist.
        </p>
      </div>
      <h2>A clearer record of everyday life</h2>
      <p>
        Recalling weeks of symptoms in a short appointment can be difficult.
        AirBloom is being designed to bring brief check-ins, existing treatment
        routines, and personal observations into one history. Its purpose is to
        help people describe their experience and prepare better questions.
      </p>
      <p>
        The mobile app is not available to download yet. Screens on this website
        are illustrative concepts using fictional records. Planned features may
        change before release; a personal pattern is not proof of a cause, and a
        daily outlook is not a validated medical prediction.
      </p>
      <h2>Who publishes the journal?</h2>
      <p>
        The <Link href="/authors/airbloom-editorial-team">AirBloom editorial team</Link>{" "}
        is the collective publishing attribution for this website. {site.operator}{" "}
        is responsible for its content. Our <Link href="/editorial-policy">editorial policy</Link>{" "}
        explains sources, review status, corrections, and the distinction between
        educational material and individual medical advice.
      </p>
      <p>
        We have not identified a clinical reviewer for this collection. An
        editorial byline does not imply medical qualifications or clinical
        approval. Check the review status on the page you are reading.
      </p>
      <h2>Resources you can use now</h2>
      <p>
        Browse the <Link href="/journal">journal</Link> for focused guides and the{" "}
        <Link href="/resources">resource library</Link> for downloadable templates.
        You can use the materials without joining the waitlist. They support
        record keeping and conversations with a qualified professional; they do
        not diagnose symptoms or choose treatment.
      </p>
      <h2>Contact and privacy</h2>
      <p>
        For website questions or corrections, contact {site.operator} at{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Include the
        page address and the detail you would like us to check. Please do not send
        symptom histories, medical documents, or urgent care requests.
      </p>
      <p>
        The <Link href="/privacy">waitlist privacy notice</Link> explains what is
        collected when you ask for early access and how to request removal.
        Tracking should never delay care for new, persistent, or worsening
        symptoms.
      </p>
    </main>
  );
}
