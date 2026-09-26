"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { steps } from "@/data/content";

/* "How we work" as a short film: a ring of six stages plays like a video.
   The progress arc sweeps around the circle, the active stage lights up and
   the screen beside it plays a small animated scene of that stage. */

const DUR = 4200; // ms per stage
const R = 150; // ring radius in the 400×400 SVG
const C = 2 * Math.PI * R;

const META = [
  { c: "#10b981", ic: "search", out: ["Business audit", "Market & numbers", "Baseline report"] },
  { c: "#8b5cf6", ic: "map", out: ["Roadmap", "Tech stack", "Fixed quote"] },
  { c: "#0ea5e9", ic: "layout", out: ["User flows", "UI system", "Clickable prototype"] },
  { c: "#f59e0b", ic: "code", out: ["Weekly sprints", "Friday demos", "Code reviews"] },
  { c: "#ec4899", ic: "rocket", out: ["QA & testing", "Go-live", "First real order"] },
  { c: "#14b8a6", ic: "trend", out: ["Ads & automation", "Live revenue data", "Iteration"] },
];

function StageIcon({ name }: { name: string }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "search": return <svg {...s}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>;
    case "map": return <svg {...s}><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" /><path d="M9 4v14M15 6v14" /></svg>;
    case "layout": return <svg {...s}><rect x="3.5" y="4" width="17" height="16" rx="2.5" /><path d="M3.5 9h17M9.5 9v11" /></svg>;
    case "code": return <svg {...s}><path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5l-3 14" /></svg>;
    case "rocket": return <svg {...s}><path d="M5 15c-1.3 1.3-1.8 4.2-1.8 4.2S6.1 18.7 7.4 17.4M14 5.5c2.5-1.5 5.2-1.7 5.2-1.7s-.2 2.7-1.7 5.2l-5.8 5.8-3.5-3.5L14 5.5Z" /><path d="M9.2 10.5 6 10.3l-2 2 3.7.8M13.5 14.8l.2 3.2-2 2-.8-3.7" /></svg>;
    default: return <svg {...s}><path d="M3.5 17.5 9.5 11.5l4 4 7-7.5" /><path d="M15 8h5.5v5.5" /></svg>;
  }
}

/* ---------- one small animated scene per stage ---------- */
function Scene({ i }: { i: number }) {
  const t = (d: number, dur = 0.6) => ({ delay: d, duration: dur, ease: [0.2, 0.7, 0.3, 1] as const });
  if (i === 0)
    return (
      <div className="sc sc-discover">
        <div className="sc-bars">
          {[42, 68, 35, 82, 56, 74].map((h, k) => (
            <motion.span key={k} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={t(0.15 + k * 0.1)} />
          ))}
        </div>
        <motion.div className="sc-lens" initial={{ x: 0, y: 30, opacity: 0 }} animate={{ x: [0, 90, 170, 110], y: [30, 0, 20, 5], opacity: 1 }} transition={{ duration: 3.4, ease: "easeInOut" }}>
          <StageIcon name="search" />
        </motion.div>
        <motion.div className="sc-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(1.6)}>Baseline: 2.1% conversion</motion.div>
      </div>
    );
  if (i === 1)
    return (
      <div className="sc sc-strategy">
        <div className="sc-road">
          <motion.span className="sc-road-fill" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={t(0.2, 2.4)} />
          {["Audit", "Build", "Launch", "Grow"].map((m, k) => (
            <motion.div key={m} className="sc-mile" style={{ left: `${k * 33.3}%` }} initial={{ scale: 0.4, opacity: 0.3 }} animate={{ scale: 1, opacity: 1 }} transition={t(0.3 + k * 0.6, 0.4)}>
              <i /><span>{m}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="sc-stamp" initial={{ scale: 1.8, opacity: 0, rotate: -14 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} transition={t(2.6, 0.35)}>Fixed quote ✓ approved</motion.div>
      </div>
    );
  if (i === 2)
    return (
      <div className="sc sc-design">
        <div className="sc-wire">
          {["hd", "hero", "c1", "c2", "c3"].map((b, k) => (
            <motion.span key={b} className={`w-${b}`} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={t(0.2 + k * 0.28, 0.45)} />
          ))}
        </div>
        <motion.svg className="sc-cursor" viewBox="0 0 16 16" initial={{ x: 20, y: 90 }} animate={{ x: [20, 150, 90, 200], y: [90, 30, 110, 70] }} transition={{ duration: 3.2, ease: "easeInOut" }}>
          <path d="M2 1l11 6-5 1.4L6 14z" fill="#fff" stroke="#0f172a" strokeWidth="1" />
        </motion.svg>
      </div>
    );
  if (i === 3)
    return (
      <div className="sc sc-dev">
        {([
          [["k", "const"], ["v", " store"], ["p", " = "], ["f", "launch"], ["p", "({"]],
          [["i", "  pages"], ["p", ": "], ["s", "'checkout'"], ["p", ","]],
          [["i", "  payments"], ["p", ": "], ["s", "'EasyPaisa'"], ["p", ","]],
          [["i", "  ai"], ["p", ": "], ["k", "true"]],
          [["p", "});"]],
        ] as [string, string][][]).map((line, k) => (
          <motion.div key={k} className="sc-line" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={t(0.2 + k * 0.45, 0.5)}>
            <em>{k + 1}</em>
            <code>{line.map(([cls, txt], j) => <span key={j} className={`tk-${cls}`}>{txt}</span>)}</code>
          </motion.div>
        ))}
        <motion.div className="sc-badge" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(2.7)}>✓ Friday demo shipped</motion.div>
      </div>
    );
  if (i === 4)
    return (
      <div className="sc sc-launch">
        <motion.div className="sc-rocket" initial={{ y: 60, rotate: -45 }} animate={{ y: -40, rotate: -45 }} transition={{ duration: 2.6, ease: [0.4, 0, 0.2, 1] }}>
          <StageIcon name="rocket" />
        </motion.div>
        <motion.div className="sc-trail" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 2.6 }} />
        <motion.div className="sc-order" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={t(2.2, 0.45)}>
          <b>🎉 First order!</b><span>#1001 · PKR 4,999 · Karachi</span>
        </motion.div>
      </div>
    );
  return (
    <div className="sc sc-scale">
      <svg viewBox="0 0 260 120" preserveAspectRatio="none" className="sc-chart">
        <motion.path d="M0 110 L40 96 L80 100 L120 74 L160 64 L200 36 L260 10" fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: "easeInOut" }} />
      </svg>
      <motion.div className="sc-kpi k1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(1.4)}>ROAS <b>4.8×</b></motion.div>
      <motion.div className="sc-kpi k2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(2)}>Sales <b>+322%</b></motion.div>
    </div>
  );
}

export default function Process() {
  const N = steps.length;
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const idxRef = useRef(0);
  const prog = useMotionValue(0); // 0..1 within the current stage
  const total = useMotionValue(0); // 0..1 across the whole film

  useEffect(() => { if (reduce) setPlaying(false); }, [reduce]);

  const jump = (i: number) => {
    idxRef.current = i;
    setIdx(i);
    prog.set(0);
    total.set(i / N);
  };

  useAnimationFrame((_, delta) => {
    if (!playing || !inView) return;
    let p = prog.get() + delta / DUR;
    if (p >= 1) {
      p = 0;
      const ni = (idxRef.current + 1) % N;
      idxRef.current = ni;
      setIdx(ni);
    }
    prog.set(p);
    total.set((idxRef.current + p) / N);
  });

  const dash = useTransform(total, (v) => C * (1 - v));
  const segW = useTransform(prog, (v) => `${v * 100}%`);
  const m = META[idx];
  const cur = steps[idx];

  return (
    <section className="sec process-film" id="process">
      <div className="wrap" ref={rootRef}>
        <div className="split-head rv">
          <div>
            <span className="eyebrow"><i className="dot" />How we work</span>
            <h2 className="h2">From messy idea to<br /><span className="accent">working system.</span></h2>
          </div>
          <p className="lead">
            Every project runs the same six-stage loop — press play and watch an idea become a
            store that takes real orders.
          </p>
        </div>

        <div className="pf-stage">
          {/* ---- the ring ---- */}
          <div className="pf-ring-wrap">
            <svg className="pf-ring" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r={R} className="pf-track" />
              <motion.circle
                cx="200" cy="200" r={R}
                className="pf-progress"
                style={{ strokeDasharray: C, strokeDashoffset: dash, stroke: m.c }}
                transform="rotate(-90 200 200)"
              />
            </svg>
            {steps.map((s, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + (R / 400) * 100 * Math.cos(a);
              const y = 50 + (R / 400) * 100 * Math.sin(a);
              const state = i === idx ? " is-active" : i < idx ? " is-done" : "";
              return (
                <button
                  key={s.n}
                  className={`pf-node${state}`}
                  style={{ left: `${x}%`, top: `${y}%`, "--c": META[i].c } as CSSProperties}
                  onClick={() => jump(i)}
                  aria-label={`Stage ${s.n}: ${s.t}`}
                >
                  <StageIcon name={META[i].ic} />
                  <span className="pf-node-label">{s.t}</span>
                </button>
              );
            })}
            <div className="pf-core" style={{ "--c": m.c } as CSSProperties}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  className="pf-core-in"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.35 }}
                >
                  <small>Stage {cur.n}</small>
                  <b>{cur.t}</b>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---- the screen ---- */}
          <div className="pf-screen" style={{ "--c": m.c } as CSSProperties}>
            <div className="pf-screen-top">
              <span className="pf-rec"><i />{playing ? "PLAYING" : "PAUSED"}</span>
              <span>Stage {cur.n} / 0{N}</span>
            </div>
            <div className="pf-view">
              <AnimatePresence mode="wait">
                <motion.div key={idx} className="pf-view-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Scene i={idx} />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} className="pf-caption" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <h3>{cur.t}</h3>
                <p>{cur.d}</p>
                <div className="pf-out">{m.out.map((o) => <span key={o}>{o}</span>)}</div>
              </motion.div>
            </AnimatePresence>

            {/* ---- video controls ---- */}
            <div className="pf-controls">
              <button className="pf-play" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
                )}
              </button>
              <div className="pf-timeline">
                {steps.map((s, i) => (
                  <button key={s.n} className="pf-seg" onClick={() => jump(i)} aria-label={`Go to ${s.t}`}>
                    {i < idx && <span className="pf-seg-fill" style={{ width: "100%", background: META[i].c }} />}
                    {i === idx && <motion.span className="pf-seg-fill" style={{ width: segW, background: META[i].c }} />}
                  </button>
                ))}
              </div>
              <span className="pf-time">0{idx + 1}:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
