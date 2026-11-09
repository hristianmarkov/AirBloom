import { ImageResponse } from "next/og";
export const alt = "Sinus Companion — Less sinus guesswork. More living.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#e9eee1",
        padding: "75px 85px",
        color: "#294a3c",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, marginBottom: 65 }}>
        sinus companion
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "serif",
          fontSize: 76,
          letterSpacing: -3,
          lineHeight: 1.05,
        }}
      >
        <span>Less sinus guesswork.</span>
        <span style={{ fontStyle: "italic", color: "#6d846d" }}>
          More living.
        </span>
      </div>
      <div style={{ fontSize: 23, marginTop: 42, display: "flex" }}>
        Your daily outlook. Your patterns. Your companion.
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 330,
          height: 330,
          borderRadius: "50%",
          right: -80,
          bottom: -140,
          background: "#ccd9bf",
        }}
      />
    </div>,
    size,
  );
}
