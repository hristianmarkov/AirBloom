import Link from "next/link";
import { BrandMark } from "./icons";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="brand" href="/">
              <BrandMark />
              <span>
                sinus<span className="brand-light">companion</span>
              </span>
            </Link>
            <p>A little clarity. More room for life.</p>
          </div>
          <div className="footer-links">
            <Link href="/#features">The app</Link>
            <Link href="/journal">The journal</Link>
            <Link href="/#questions">FAQs</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={`mailto:${site.contactEmail}`}>Contact</a>
          </div>
          <span className="footer-location">
            Made with care.
            <br />
            For your everyday.
          </span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sinus Companion</span>
          <span>Your day. Your patterns. Your companion.</span>
        </div>
        <p className="health-note">
          Sinus Companion is being developed for personal tracking and
          education. It does not provide diagnosis or treatment and is not a
          substitute for professional medical advice. App screens are
          illustrative concepts; features may change.
        </p>
      </div>
    </footer>
  );
}
