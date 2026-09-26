"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { results } from "@/data/content";

const STATS = [
  { to: 500, suf: "+", pre: "", l: "Students trained", s: "online & Lahore campus" },
  { to: 100, suf: "+", pre: "", l: "Projects delivered", s: "stores, apps & platforms" },
  { to: 40, suf: "K", pre: "", l: "App downloads", s: "in the first 90 days" },
  { to: 322, suf: "%", pre: "+", l: "Best YoY sales lift", s: "from a Shopify admin" },
];

const PROOF = [
  { ...results[0], c: "#10b981" },
  { ...results[2], c: "#f97316" },
  { ...results[3], c: "#8b5cf6" },
];

export default function Results() {
  const reduce = useReducedMotion();
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="split-head rv">
          <div>
            <span className="eyebrow"><i className="dot" />The proof</span>
            <h2 className="h2">Real numbers,<br /><span className="accent">from real dashboards.</span></h2>
          </div>
          <p className="lead">
            No vanity metrics — every figure below is pulled straight from a client&rsquo;s admin
            panel, ad account or app store listing.
          </p>
        </div>

        <div className="pr-stats rv">
          {STATS.map((s) => (
            <div className="pr-stat" key={s.l}>
              <b className="num" data-to={s.to} data-pre={s.pre} data-suf={s.suf}>{s.pre}0{s.suf}</b>
              <span>{s.l}</span>
              <small>{s.s}</small>
            </div>
          ))}
        </div>

        <div className="pr-grid">
          {PROOF.map((p, i) => (
            <motion.article
              key={p.name}
              className="pr-card"
              style={{ "--c": p.c } as CSSProperties}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.2, 0.7, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              <div className="pr-dash">
                <div className="pr-dash-top">
                  <span className="pr-live"><i />Live dashboard</span>
                  <span className="pr-delta">{p.delta}</span>
                </div>
                <small className="pr-unit">{p.unit}</small>
                <svg className="pr-chart" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`prg${i}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor={p.c} stopOpacity=".32" />
                      <stop offset="1" stopColor={p.c} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[10, 20, 30].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className="pr-grid-ln" />)}
                  <motion.polygon
                    points={`${p.pts} 100,40 0,40`}
                    fill={`url(#prg${i})`}
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                  />
                  <motion.polyline
                    points={p.pts}
                    fill="none"
                    stroke={p.c}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: "easeInOut" }}
                  />
                </svg>
                <div className="pr-axis"><span>Before</span><span>After ScaleUp</span></div>
              </div>

              <div className="pr-body">
                <span className="pr-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <div className="pr-kpis">
                  {p.kpis.map((k) => (
                    <div key={k.l}><b>{k.v}</b><span>{k.l}</span></div>
                  ))}
                </div>
                <div className="pr-work">{p.work.map((w) => <span key={w}>{w}</span>)}</div>
                <p className="pr-source">{p.more}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="pr-more rv">
          <Link className="btn btn-neu" href="/work">
            See all case studies
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
