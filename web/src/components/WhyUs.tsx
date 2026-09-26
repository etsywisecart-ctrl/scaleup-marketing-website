"use client";

import { motion, useReducedMotion } from "framer-motion";

const POINTS = [
  { t: "Fixed quotes, in writing", d: "You approve a line-itemed price before a single hour is billed. No hourly surprises, ever." },
  { t: "A working demo every Friday", d: "You see real, clickable progress every week — from the very first sprint." },
  { t: "Operators, not lecturers", d: "The people who teach are the same people who ship client stores and run the ad accounts." },
  { t: "One team, the whole journey", d: "Build, launch, market and train under a single roof — no vendor hand-offs." },
];

const LINES = [
  { d: "Shopify store — design & build", v: "180,000" },
  { d: "Meta & TikTok ads setup", v: "45,000" },
  { d: "Product photography (40 SKUs)", v: "30,000" },
  { d: "WhatsApp AI order agent", v: "35,000" },
];

export default function WhyUs() {
  const reduce = useReducedMotion();
  const up = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay: d, ease: [0.2, 0.7, 0.3, 1] as const },
  });

  return (
    <section className="sec wy">
      <div className="wrap wy-grid">
        <div className="wy-copy">
          <div className="rv">
            <span className="eyebrow"><i className="dot" />Why ScaleUp</span>
            <h2 className="h2">A partner,<br /><span className="accent">not a vendor.</span></h2>
            <p className="lead">Four promises we put in writing on every project — and keep.</p>
          </div>
          <ol className="wy-list">
            {POINTS.map((p, i) => (
              <motion.li key={p.t} {...up(0.08 * i)}>
                <span className="wy-n">0{i + 1}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="wy-visual" aria-hidden="true">
          {/* the fixed quote */}
          <motion.div className="wy-doc" {...up(0.1)}>
            <div className="wy-doc-head">
              <div>
                <b>ScaleUp Marketing</b>
                <small>Quotation · Q-2026-041</small>
              </div>
              <span className="wy-doc-date">26 Sep 2026</span>
            </div>
            <div className="wy-doc-to"><small>Prepared for</small><b>Aurelia Skincare</b></div>
            <div className="wy-doc-lines">
              {LINES.map((l, i) => (
                <motion.div key={l.d} className="wy-doc-line" {...up(0.3 + i * 0.12)}>
                  <span>{l.d}</span><b>PKR {l.v}</b>
                </motion.div>
              ))}
            </div>
            <div className="wy-doc-total"><span>Fixed total</span><b>PKR 290,000</b></div>
            <div className="wy-doc-foot">
              <span className="wy-sign">Hamza R.</span>
              <small>Client signature</small>
            </div>
            <motion.span
              className="wy-stamp"
              initial={reduce ? false : { opacity: 0, scale: 1.8, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              Approved
            </motion.span>
          </motion.div>

          {/* the Friday demo notification */}
          <motion.div className="wy-note" {...up(0.7)}>
            <span className="wy-note-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </span>
            <div>
              <b>Friday demo · Week 3 is live 🚀</b>
              <span>Checkout + WhatsApp agent ready to review</span>
            </div>
            <em>Now</em>
          </motion.div>

          {/* one team */}
          <motion.div className="wy-team" {...up(0.9)}>
            <div className="wy-avatars">
              {["#10b981", "#8b5cf6", "#0ea5e9", "#f59e0b"].map((c, i) => (
                <i key={c} style={{ background: c }}>{["S", "D", "E", "G"][i]}</i>
              ))}
            </div>
            <span>Strategy · Design · Engineering · Growth — <b>one team</b></span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
