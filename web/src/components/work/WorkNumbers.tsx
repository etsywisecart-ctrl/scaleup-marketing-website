"use client";

import { motion, useReducedMotion } from "framer-motion";
import { results } from "@/data/content";

const TINTS = ["#10b981", "#0ea5e9", "#f97316", "#8b5cf6", "#14b8a6", "#ec4899"];

/* The results wall — every outcome from the dashboards, drawn as a live
   screen: area chart that traces itself in, weekly bars and three KPIs. */
export default function WorkNumbers() {
  const reduce = useReducedMotion();

  return (
    <section className="sec wn">
      <div className="wn-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="split-head rv">
          <div>
            <span className="eyebrow wn-eyebrow"><i className="dot" />Outcomes</span>
            <h2 className="h2 wn-h2">The numbers, <span className="wn-grad">straight from the dashboards.</span></h2>
          </div>
          <p className="lead wn-lead">Shopify, eBay, Daraz, app stores and SaaS — the same team, measured on the same thing: what it did for the business.</p>
        </div>

        <div className="wn-grid">
          {results.map((r, i) => {
            const c = TINTS[i % TINTS.length];
            const area = `0,40 ${r.pts} 100,40`;
            return (
              <motion.article
                key={r.name}
                className="wn-card"
                style={{ ["--c" as string]: c }}
                initial={reduce ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <div className="wn-top">
                  <span className="wn-tag">{r.tag}</span>
                  <span className="wn-delta">{r.delta}</span>
                </div>
                <h3>{r.name}</h3>
                <p>{r.line}</p>

                <div className="wn-chart">
                  <small>{r.unit}</small>
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id={`wn-g${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={c} stopOpacity=".38" />
                        <stop offset="1" stopColor={c} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[10, 20, 30].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className="wn-gl" />)}
                    <motion.polygon points={area} fill={`url(#wn-g${i})`}
                      initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
                    <motion.polyline points={r.pts} fill="none" stroke={c} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
                      initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }} />
                  </svg>
                  <div className="wn-bars">
                    {r.bars.map((h, k) => (
                      <motion.i key={k} style={{ height: `${h}%` }}
                        initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + k * 0.05 }} />
                    ))}
                  </div>
                </div>

                <div className="wn-kpis">
                  {r.kpis.map((k) => <div key={k.l}><b>{k.v}</b><small>{k.l}</small></div>)}
                </div>
                <div className="wn-work">{r.work.map((w) => <span key={w}>{w}</span>)}</div>
                <small className="wn-src">{r.more}</small>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
