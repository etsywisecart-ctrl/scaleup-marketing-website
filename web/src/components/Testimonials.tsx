"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/content";

const TONES = ["#10b981", "#8b5cf6", "#f59e0b", "#0ea5e9", "#ec4899"];

function Stars() {
  return (
    <span className="ts-stars" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20"><path d="m10 1.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8 1.7 7.8l5.8-.7Z" /></svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = testimonials.slice(0, 5);

  const card = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.3, 1] as const },
  });

  const who = (t: typeof featured, i: number) => (
    <figcaption className="ts-who">
      <span className="ts-av" style={{ background: `linear-gradient(135deg, ${TONES[i]}, color-mix(in srgb, ${TONES[i]} 55%, #000))` }}>{t.ini}</span>
      <span className="ts-name">
        <b>{t.name}</b>
        <em>{t.role}</em>
      </span>
      <span className="ts-verified">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
        {t.role.toLowerCase().includes("graduate") ? "Graduate" : "Verified client"}
      </span>
    </figcaption>
  );

  return (
    <section className="sec" style={{ background: "var(--sunk)" }}>
      <div className="wrap">
        <div className="split-head rv">
          <div>
            <span className="eyebrow"><i className="dot" />Client &amp; graduate stories</span>
            <h2 className="h2">The results speak.<br /><span className="accent">So do they.</span></h2>
          </div>
          <p className="lead">
            Founders, ops leads and graduates — in their own words, with the number that changed
            for them.
          </p>
        </div>

        <div className="ts-grid">
          <motion.figure className="ts-card ts-feature" style={{ "--c": TONES[0] } as CSSProperties} {...card(0)}>
            <span className="ts-quote-mark" aria-hidden="true">&ldquo;</span>
            <div className="ts-top"><Stars /><span className="ts-metric">{featured.metric}</span></div>
            <blockquote>{featured.q}</blockquote>
            <ul className="ts-did" aria-label="What we did">
              <li>Store rebuilt on a faster Shopify theme</li>
              <li>Meta ad account relaunched with new creatives</li>
              <li>Owner trained on a live revenue dashboard</li>
            </ul>
            <div className="ts-feature-stat" aria-hidden="true" data-order="stat">
              <div><small>Monthly revenue</small><b>3.4×</b></div>
              <svg viewBox="0 0 120 40" preserveAspectRatio="none">
                <path d="M0 36 L20 33 L40 34 L60 26 L80 18 L100 12 L120 4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {who(featured, 0)}
          </motion.figure>

          {rest.map((t, i) => (
            <motion.figure key={t.name} className="ts-card" style={{ "--c": TONES[i + 1] } as CSSProperties} {...card(i + 1)}>
              <div className="ts-top"><Stars /><span className="ts-metric">{t.metric}</span></div>
              <blockquote>{t.q}</blockquote>
              {who(t, i + 1)}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
