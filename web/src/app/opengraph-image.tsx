import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const alt = "ScaleUp Marketing — digital agency & training academy in Lahore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(150deg, #0b2438 0%, #0e3b52 55%, #0e4a44 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* glow accent */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "radial-gradient(circle, rgba(47,191,158,0.45), rgba(47,191,158,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#7FE7CF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "linear-gradient(145deg, #5fd6bc, #2fbf9e)",
              color: "#062a20",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            S
          </div>
          {siteConfig.name.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, letterSpacing: -3 }}>
            Build. Automate.
          </div>
          <div style={{ fontSize: 92, fontWeight: 900, color: "#5FD6BC", lineHeight: 1.05, letterSpacing: -3 }}>
            Scale.
          </div>
          <div style={{ fontSize: 30, color: "#B8CDD4", marginTop: 26, maxWidth: 900 }}>
            Digital agency + training academy — Ecommerce, AI, Software &amp; Growth. Lahore &amp; online.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Shopify & Ecommerce", "SaaS & Apps", "AI Automation", "Live Academy"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 600,
                color: "#CFEEE5",
                border: "1px solid rgba(127,231,207,0.4)",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
