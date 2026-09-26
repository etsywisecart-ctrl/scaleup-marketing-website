"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/data/work";

const AUTO_MS = 5500;

function Frame({ img, title, url }: { img: string; title: string; url?: string }) {
  return (
    <div className="wsl-frame">
      <div className="wsl-bar">
        <i /><i /><i />
        <span className="wsl-url">{url ? url.replace(/^https?:\/\//, "") : "wescaleupmarketing.com"}</span>
      </div>
      <div className="wsl-screen">
        {img ? (
          <Image src={img} alt={title} fill sizes="(max-width:900px) 100vw, 620px" style={{ objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <span className="wsl-ph" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export default function WorkSlider() {
  const n = portfolio.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => setIdx(((i % n) + n) % n), [n]);
  const next = useCallback(() => setIdx((v) => (v + 1) % n), [n]);
  const prev = useCallback(() => setIdx((v) => (v - 1 + n) % n), [n]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduce || n <= 1) return;
    const t = setTimeout(next, AUTO_MS);
    return () => clearTimeout(t);
  }, [idx, paused, reduce, n, next]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  return (
    <div
      className="wsl"
      ref={regionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKey}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
    >
      {!reduce && n > 1 && (
        <div className="wsl-prog" aria-hidden="true">
          <span key={idx} className={paused ? "paused" : ""} />
        </div>
      )}

      <div className="wsl-stage">
        <div className="wsl-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {portfolio.map((p, i) => (
            <article className="wsl-slide" key={p.title} aria-hidden={i !== idx}>
              <div className="wsl-shot">
                <Frame img={p.img} title={p.title} url={p.url} />
              </div>
              <div className="wsl-info">
                <div className="wsl-metaline">
                  <span className="wsl-cat">{p.cat}</span>
                  <span className="wsl-year">{p.year}</span>
                </div>
                <h3 className="wsl-title">{p.title}</h3>
                <p className="wsl-desc">{p.desc}</p>
                <div className="wsl-metrics">
                  {p.metrics.map((m) => (
                    <div className="wsl-metric" key={m.l}>
                      <b>{m.v}</b>
                      <span>{m.l}</span>
                    </div>
                  ))}
                </div>
                <div className="wsl-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.url && (
                  <Link className="wsl-visit" href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit live
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h7v7M13 3 4 12" /></svg>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {n > 1 && (
          <>
            <button className="wsl-arrow prev" onClick={prev} aria-label="Previous project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className="wsl-arrow next" onClick={next} aria-label="Next project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="wsl-thumbs" role="tablist" aria-label="Choose a project">
          {portfolio.map((p, i) => (
            <button
              key={p.title}
              className={`wsl-thumb${i === idx ? " active" : ""}`}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={p.title}
            >
              {p.img ? (
                <Image src={p.img} alt="" fill sizes="130px" style={{ objectFit: "cover", objectPosition: "top" }} />
              ) : (
                <span className="wsl-ph" aria-hidden="true" />
              )}
              <span className="wsl-thumb-label">{p.cat}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
