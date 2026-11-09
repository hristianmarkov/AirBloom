import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/icons";
export const alt = "AirBloom — Less sinus guesswork. More living.";
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
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, marginBottom: 65 }}>
        <BrandMark width={43} height={43} /> AirBloom
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          fontSize: 76,
          letterSpacing: -3,
          lineHeight: 1.05,
        }}
      >
        <span>Less sinus guesswork.</span>
        <span style={{ fontStyle: "normal", color: "#6d846d" }}>
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
