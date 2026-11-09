import { AppPreview } from "@/components/app-preview";
export const metadata = {
  title: "App concept screens",
  robots: { index: false, follow: false },
};
export default function Screens() {
  return (
    <main id="main" className="container" style={{ padding: "60px 0" }}>
      <span className="eyebrow">ILLUSTRATIVE PRODUCT CONCEPTS</span>
      <h1 style={{ fontSize: 55 }}>A little clarity, in your pocket.</h1>
      <p>
        Concept screens for the planned iOS and Android app. All records and
        conditions shown are fictional.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          marginTop: 35,
          justifyContent: "center",
        }}
      >
        {(["today", "history", "routine", "insights", "ask", "report"] as const).map((variant) => (
          <AppPreview variant={variant} flat key={variant} />
        ))}
      </div>
    </main>
  );
}
