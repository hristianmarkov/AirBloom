import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">A LITTLE OFF THE PATH</span>
      <h1>Let’s find your way back.</h1>
      <p>
        This page isn’t here, but a little clarity is just around the corner.
      </p>
      <Link className="button primary" href="/">
        Back to the everyday
      </Link>
    </main>
  );
}
