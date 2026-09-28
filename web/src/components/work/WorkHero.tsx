"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { portfolio } from "@/data/work";

/* ------------------------------------------------------------------
   Canvas constellation — drifting nodes linked by light threads that
   lean toward the pointer. Pauses off-screen; draws one still frame
   when the visitor prefers reduced motion.
   ------------------------------------------------------------------ */
function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS = ["52,211,153", "139,92,246", "14,165,233", "45,212,191"];

    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let pts: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const LINK = 130;
      for (const p of pts) {
        if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
          const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
          if (d < 160) { p.x += dx * 0.004; p.y += dy * 0.004; }
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK) * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - md / 180) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${a.c},0.9)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (still) draw(); else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const host = cv.parentElement!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => { resize(); if (still) draw(); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      ro.disconnect(); io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="wk-canvas" aria-hidden="true" />;
}

/* ------------------------------------------------------------------
   Fanned stack of real project screens that deals itself every few
   seconds and tilts with the pointer.
   ------------------------------------------------------------------ */
const SHOTS = portfolio.filter((p) => p.img);
const SLOTS = [
  { x: 0, y: 0, r: 0, s: 1, z: 3, o: 1 },
  { x: 70, y: -44, r: 6, s: 0.9, z: 2, o: 0.85 },
  { x: -64, y: -30, r: -7, s: 0.86, z: 1, o: 0.7 },
];

function ScreenStack() {
  const reduce = useReducedMotion();
  const [top, setTop] = useState(0);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce || SHOTS.length < 2) return;
    const t = setInterval(() => setTop((v) => (v + 1) % SHOTS.length), 3600);
    return () => clearInterval(t);
  }, [reduce]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const cur = SHOTS[top];

  return (
    <div className="wk-stack-wrap" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div className="wk-stack" style={{ rotateX: rx, rotateY: ry }}>
        <AnimatePresence initial={false}>
        {SLOTS.map((_, k) => {
          // render back-to-front so the top card paints last
          const slotIdx = SLOTS.length - 1 - k;
          const p = SHOTS[(top + slotIdx) % SHOTS.length];
          const s = SLOTS[slotIdx];
          return (
            <motion.div
              key={p.title}
              className="wk-shot"
              initial={{ x: -110, y: -40, rotate: -12, scale: 0.8, opacity: 0 }}
              exit={{ x: 220, y: 60, rotate: 14, scale: 0.9, opacity: 0, transition: { duration: 0.5 } }}
              animate={{ x: s.x, y: s.y, rotate: s.r, scale: s.s, opacity: s.o }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              style={{ zIndex: s.z }}
            >
              <div className="wk-shot-bar"><i /><i /><i /><span>{p.url ? p.url.replace(/^https?:\/\//, "") : "wescaleupmarketing.com/work"}</span></div>
              <div className="wk-shot-img">
                <Image src={p.img} alt="" fill sizes="(max-width:900px) 90vw, 520px" style={{ objectFit: "cover", objectPosition: "top" }} priority={slotIdx === 0} />
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cur.title}
          className="wk-stack-cap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <span className="wk-live" />
          <div><b>{cur.title}</b><small>{cur.cat} · {cur.year}</small></div>
        </motion.div>
      </AnimatePresence>

      <div className="wk-stack-dots" aria-hidden="true">
        {SHOTS.map((p, i) => <i key={p.title} className={i === top ? "on" : ""} />)}
      </div>
    </div>
  );
}

const STATS = [
  { to: portfolio.length, suf: "", l: "Featured builds" },
  { to: 100, suf: "+", l: "Projects delivered" },
  { to: 12, suf: "", l: "Platforms shipped on" },
  { to: 322, pre: "+", suf: "%", l: "Best YoY growth" },
];

export default function WorkHero() {
  const reduce = useReducedMotion();
  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.2, 0.7, 0.3, 1] as const } };

  return (
    <section className="wk-hero">
      <Constellation />
      <div className="wk-hero-glow" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap wk-hero-inner">
        <div className="wk-hero-copy">
          <motion.nav className="wk-crumb" aria-label="Breadcrumb" {...fade(0)}>
            <Link href="/">Home</Link><span>/</span><b>Work</b>
          </motion.nav>
          <motion.span className="wk-eyebrow" {...fade(0.05)}><i />Selected work · 2024 — 2026</motion.span>
          <motion.h1 {...fade(0.12)}>
            Work that ships.<br />
            <span className="wk-grad">Numbers that move.</span>
          </motion.h1>
          <motion.p {...fade(0.2)}>
            Stores, AI agents, POS systems and SaaS platforms — designed, engineered and scaled by
            one team. Every screen below is a real build.
          </motion.p>
          <motion.div className="wk-hero-btns" {...fade(0.28)}>
            <a className="btn btn-primary lg" href="#projects">
              Explore projects
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
            </a>
            <Link className="btn btn-ghost-light lg" href="/#contact">Start your project</Link>
          </motion.div>
          <motion.div className="wk-stats" {...fade(0.36)}>
            {STATS.map((s) => (
              <div key={s.l}>
                <b className="num" data-to={s.to} data-pre={s.pre ?? ""} data-suf={s.suf}>{(s.pre ?? "") + s.to + s.suf}</b>
                <small>{s.l}</small>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="wk-hero-visual"
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <ScreenStack />
        </motion.div>
      </div>
      <a href="#projects" className="wk-scroll" aria-label="Scroll to projects"><span /></a>
    </section>
  );
}
