import type { CSSProperties } from "react";
import { BRANDS, BrandIcon } from "./BrandIcon";

/* Two opposing marquees of the platforms we build, sell and teach on —
   every logo in the same gradient brand-tile language as the Academy. */
const ROW_A = ["shopify", "tiktok", "daraz", "ebay", "etsy", "amazon"];
const ROW_B = ["woo", "meta", "whatsapp", "payoneer", "flutter", "openai"];

function Row({ keys, reverse }: { keys: string[]; reverse?: boolean }) {
  const items = [...keys, ...keys, ...keys];
  return (
    <div className="bm-track">
      <div className={`bm-row${reverse ? " rev" : ""}`}>
        {items.map((k, i) => {
          const b = BRANDS[k];
          return (
            <span className="bm-item" key={i} style={{ "--c1": b.c1, "--c2": b.c2 } as CSSProperties}>
              <span className="bm-ic"><BrandIcon name={b.ic} /></span>
              {b.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="sec-tight bm" aria-label="Platforms we work with">
      <div className="wrap rv">
        <p className="bm-label">
          <span>12 platforms</span>we build, sell and teach on every week
        </p>
      </div>
      <Row keys={ROW_A} />
      <Row keys={ROW_B} reverse />
    </section>
  );
}
