import type { Metadata } from "next";
import { RemovalForm } from "@/components/removal-form";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Waitlist privacy notice",
  description:
    "What the Sinus Companion early-access waitlist collects, why, and how to request removal.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <main id="main" className="container privacy-page">
      <span className="eyebrow">YOUR STORY BELONGS TO YOU</span>
      <h1>
        A little clarity
        <br />
        <em>about privacy.</em>
      </h1>
      <p>Early-access waitlist notice · Updated November 9, 2026</p>
      <p>
        This website and early-access waitlist are operated by {site.operator}. For
        privacy questions, access, correction, or removal, contact{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
      <div className="quick-answer">
        <span>THE SHORT VERSION</span>
        <p>
          This marketing site asks for an email address and device preference to
          help organize early-access invitations. Please don’t submit symptoms,
          medical details, or other sensitive information.
        </p>
      </div>
      <h2>What we collect</h2>
      <p>
        A successful waitlist signup records your email address, platform
        preference (iOS, Android, or both), signup time, consent version, and a
        random request identifier in our Supabase database. Removal requests are
        recorded in a separate table. If the signup service is unavailable, the
        form displays an error and does not confirm that an address was saved.
      </p>
      <h2>Why we use it</h2>
      <p>
        We use your consent to contact you about early access and organize
        invitations for your device. Joining the waitlist is optional and is not
        an agreement to receive unrelated marketing. We do not sell waitlist
        addresses.
      </p>
      <h2>Where information goes</h2>
      <p>
        We use Vercel for website hosting and Supabase (EU Ireland region) for waitlist
        records. These providers process information needed to deliver the
        service. This website does not collect symptom records or create a
        medical profile. Provider infrastructure may process information outside
        your country; applicable safeguards and provider agreements govern those
        transfers.
      </p>
      <h2>Technical information</h2>
      <p>
        The site has no advertising cookies or third-party analytics scripts.
        Hosting providers may process technical request logs, including IP
        addresses, according to their own policies. The signup endpoint uses a
        temporary hash of a request’s IP address for in-memory rate limiting; it
        is not added to the database.
      </p>
      <h2>Access and retention</h2>
      <p>
        Access to waitlist records is limited to authorized administrators. We
        retain records for up to 12 months after signup, or remove them sooner
        when no longer needed or after a removal request. An administrator
        processes removal requests within 30 days. Deletion is handled by the
        administrator rather than automatically by this website.
      </p>
      <h2 id="remove">Change your mind?</h2>
      <p>
        Request removal below. The same form can be used to ask the
        administrator to contact you about access to or correction of your
        waitlist record. The administrator may need to verify your control of
        the email address before sharing any information.
      </p>
      <RemovalForm />
      <p>
        You can also send a request directly to{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> if this
        form is unavailable.
      </p>
      <h2>Your choices and rights</h2>
      <p>
        You can withdraw consent to access emails at any time by requesting
        removal. Depending on your location, you may also have rights to access,
        correct, erase, restrict, or receive a copy of your information, and to
        complain to your local data-protection authority. Contact{" "}
        {site.operator} at{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> to
        exercise these rights. The app will have a separate privacy notice and
        consent choices before it collects any health data.
      </p>
    </main>
  );
}
