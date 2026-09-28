"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { portfolio, type Project } from "@/data/work";
import { BUCKET_COLOR, FILTERS, bucket, type Filter } from "./workCats";

const host = (p: Project) => (p.url ? p.url.replace(/^https?:\/\//, "") : `wescaleupmarketing.com/work`);

function Browser({ p, sizes, priority }: { p: Project; sizes: string; priority?: boolean }) {
  return (
    <div className="wg-browser">
      <div className="wg-bar"><i /><i /><i /><span>{host(p)}</span></div>
      <div className="wg-screen">
        {p.img ? (
          <Image src={p.img} alt={`${p.title} — screenshot`} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <span className="wg-ph" aria-hidden="true">{p.title.slice(0, 1)}</span>
        )}
      </div>
    </div>
  );
}

/* Card with a soft 3D tilt that follows the pointer. */
function Card({ p, i, size, onOpen }: { p: Project; i: number; size: "" | "feature" | "wide" | "full"; onOpen: () => void }) {
  const feature = size === "feature";
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 160, damping: 20 });
  const b = bucket(p);

  return (
    <motion.article
      layout={!reduce}
      className={`wg-card${size ? " " + size : ""}`}
      style={{ "--c": BUCKET_COLOR[b], rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry } as unknown as CSSProperties}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.06, ease: [0.2, 0.7, 0.3, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
    >
      <button type="button" className="wg-hit" onClick={onOpen} aria-label={`Open case study: ${p.title}`} />
      <div className="wg-media">
        <Browser p={p} sizes={size ? "(max-width:900px) 100vw, 760px" : "(max-width:900px) 100vw, 380px"} priority={i < 2} />
        <span className="wg-open" aria-hidden="true">
          View case study
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11 11 5M6 5h5v5" /></svg>
        </span>
      </div>
      <div className="wg-body">
        <div className="wg-meta">
          <span className="wg-cat"><i />{p.cat}</span>
          <span className="wg-year">{p.year}</span>
        </div>
        <h3>{p.title}</h3>
        {size && <p>{p.desc}</p>}
        <div className="wg-metrics">
          {p.metrics.slice(0, 3).map((m) => (
            <div key={m.l}><b>{m.v}</b><small>{m.l}</small></div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* Full-screen case-study viewer with keyboard + arrow navigation. */
function CaseModal({ list, idx, setIdx, onClose }: { list: Project[]; idx: number; setIdx: (i: number) => void; onClose: () => void }) {
  const p = list[idx];
  const n = list.length;
  const go = useCallback((d: number) => setIdx((idx + d + n) % n), [idx, n, setIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  const b = bucket(p);

  return (
    <motion.div className="wg-modal" role="dialog" aria-modal="true" aria-label={p.title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="wg-sheet"
        style={{ "--c": BUCKET_COLOR[b] } as CSSProperties}
        initial={{ y: 60, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="wg-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m4 4 8 8M12 4l-8 8" /></svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div key={p.title} className="wg-sheet-grid"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}>
            <div className="wg-sheet-media">
              <Browser p={p} sizes="(max-width:900px) 100vw, 700px" priority />
            </div>
            <div className="wg-sheet-copy">
              <span className="wg-cat"><i />{p.cat} · {p.year}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="wg-sheet-metrics">
                {p.metrics.slice(0, 3).map((m) => (
                  <div key={m.l}><b>{m.v}</b><small>{m.l}</small></div>
                ))}
              </div>
              <div className="wg-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="wg-sheet-btns">
                {p.url && (
                  <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit live
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11 11 5M6 5h5v5" /></svg>
                  </a>
                )}
                <a className="btn btn-neu" href="/#contact" onClick={onClose}>Build something similar</a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="wg-sheet-nav">
          <button onClick={() => go(-1)} aria-label="Previous project">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <span>{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <button onClick={() => go(1)} aria-label="Next project">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* First card is the 2×2 feature; the last card stretches so the
   3-column grid never ends with a hole (feature takes 4 cells). */
function sizeFor(i: number, n: number): "" | "feature" | "wide" | "full" {
  if (i === 0) return n > 1 ? "feature" : "full";
  if (i !== n - 1) return "";
  const rem = (n + 3) % 3;
  return rem === 2 ? "wide" : rem === 1 ? "full" : "";
}

export default function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: portfolio.length };
    portfolio.forEach((p) => { const k = bucket(p); c[k] = (c[k] ?? 0) + 1; });
    return c;
  }, []);
  const tabs = FILTERS.filter((f) => counts[f]);
  const list = useMemo(() => (filter === "All" ? portfolio : portfolio.filter((p) => bucket(p) === filter)), [filter]);

  return (
    <section className="sec wg" id="projects">
      <div className="wrap">
        <div className="split-head rv">
          <div>
            <span className="eyebrow"><i className="dot" />The portfolio</span>
            <h2 className="h2">Every build, <span className="accent">up close.</span></h2>
          </div>
          <p className="lead">Filter by what you&rsquo;re building, then open any project for the full case study — stack, scope and the numbers behind it.</p>
        </div>

        <div className="wg-filters rv" role="tablist" aria-label="Filter projects">
          {tabs.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {filter === f && <motion.span layoutId="wg-pill" className="wg-pill" transition={{ type: "spring", stiffness: 300, damping: 28 }} />}
              <span className="wg-f-l">{f}</span>
              <span className="wg-f-n">{counts[f]}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="wg-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.title} p={p} i={i} size={sizeFor(i, list.length)} onOpen={() => setOpen(i)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="wg-foot rv">{portfolio.length} featured builds — more shipping every month.</p>
      </div>

      <AnimatePresence>
        {open !== null && list[open] && (
          <CaseModal list={list} idx={open} setIdx={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
