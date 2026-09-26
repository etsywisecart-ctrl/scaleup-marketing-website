"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* The marketplaces our graduates learn to build and sell on. Each tile uses
   the same gradient icon language as the Services cards: a white glyph on the
   platform's own brand gradient (drawn inline, no external assets). */
const PLATFORMS = [
  { name: "Shopify", ic: "shopify", c1: "#7ab55c", c2: "#4a7a32" },
  { name: "TikTok Shop", ic: "tiktok", c1: "#fe2c55", c2: "#25104a" },
  { name: "Daraz", ic: "daraz", c1: "#f85606", c2: "#c2410c" },
  { name: "Etsy", ic: "etsy", c1: "#f1641e", c2: "#b8430f" },
  { name: "eBay", ic: "ebay", c1: "#e53238", c2: "#0064d2" },
  { name: "Amazon", ic: "amazon", c1: "#ff9900", c2: "#232f3e" },
];

function PlatformIcon({ name }: { name: string }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shopify": // shopping bag
      return <svg {...s}><path d="M6.5 8h11l-1 11.5H7.5L6.5 8Z" /><path d="M9 8V6.6a3 3 0 0 1 6 0V8" /></svg>;
    case "tiktok": // music note
      return <svg {...s}><path d="M13 4v10.5a3 3 0 1 1-2.3-2.92" /><path d="M13 4.5c.4 2.1 1.9 3.5 4 3.7" /></svg>;
    case "daraz": // cart
      return <svg {...s}><path d="M4 5h2l1.5 9.4a1.3 1.3 0 0 0 1.3 1.1h7.4a1.3 1.3 0 0 0 1.3-1L19.6 8H6.3" /><circle cx="9.5" cy="19" r="1.15" /><circle cx="16.5" cy="19" r="1.15" /></svg>;
    case "etsy": // storefront
      return <svg {...s}><path d="M4.5 9 6 5h12l1.5 4" /><path d="M5.5 9.2v9.3h13V9.2" /><path d="M4.5 9a1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0" /></svg>;
    case "ebay": // price tag
      return <svg {...s}><path d="M4.3 12.4 11.4 5.3a1 1 0 0 1 .7-.3H18a1 1 0 0 1 1 1v5.9a1 1 0 0 1-.3.7l-7.1 7.1a1 1 0 0 1-1.4 0l-5.9-5.9a1 1 0 0 1 0-1.4Z" /><circle cx="15.2" cy="8.8" r="1.25" /></svg>;
    default: // amazon smile
      return <svg {...s}><path d="M5 14.5c4.2 3 9.8 3 14 0" /><path d="M16.8 13c1 .6 1.7 1.6 1.9 3" /></svg>;
  }
}

export default function PlatformStrip() {
  const reduce = useReducedMotion();
  const row: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };
  const tile: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22, scale: reduce ? 1 : 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
  };

  return (
    <div className="ac-logos" aria-label="Marketplaces our graduates build and sell on">
      <span className="ac-logos-label">Master every marketplace</span>
      <motion.div
        className="ac-plat-row"
        variants={row}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {PLATFORMS.map((p) => (
          <motion.div
            className="ac-plat"
            key={p.name}
            variants={tile}
            whileHover={reduce ? undefined : { y: -6, scale: 1.08 }}
            style={{ "--c1": p.c1, "--c2": p.c2 } as CSSProperties}
          >
            <span className="ac-plat-ic">
              <PlatformIcon name={p.ic} />
            </span>
            <span className="ac-plat-name">{p.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
