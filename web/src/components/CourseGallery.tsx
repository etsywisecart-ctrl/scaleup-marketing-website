"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlatformMark from "./PlatformMark";
import type { courses as CoursesType } from "@/data/content";

/* Apple-style horizontal scroll-snap gallery of course cards. Native
   scroll (trackpad/swipe) with snap, plus floating prev/next controls
   that scroll one card at a time. Each card is an immersive, brand-
   colored panel. */

type Course = (typeof CoursesType)[number];

type Card = {
  key: string;
  href: string;
  mark: string;
  tag: string;
  badge?: string;
  title: string;
  sub: string;
  dur: string;
  level: string;
  acc: string; // vibrant brand accent (glow, arrow, badge)
  ink: string; // darker brand shade (readable accent text)
};

const THEME: Record<string, { acc: string; ink: string }> = {
  "shopify-mastery": { acc: "#8CC63F", ink: "#4E7A29" },
  "tiktok-shop": { acc: "#FE2C55", ink: "#D31742" },
  daraz: { acc: "#F85606", ink: "#C64304" },
  "ai-marketing": { acc: "#7C5CFC", ink: "#5B3FD0" },
};

// Expand the combined eBay/Etsy track into two distinct cards that both
// link to the same course page.
function buildCards(courses: Course[]): Card[] {
  const cards: Card[] = [];
  for (const c of courses) {
    if (c.slug === "ebay-etsy") {
      cards.push({
        key: "ebay",
        href: `/academy/${c.slug}`,
        mark: "ebay",
        tag: "EBAY",
        title: "eBay Global Selling",
        sub: "Cross-border stores that get paid from anywhere.",
        dur: c.dur,
        level: c.level,
        acc: "#0064D2",
        ink: "#0454B0",
      });
      cards.push({
        key: "etsy",
        href: `/academy/${c.slug}`,
        mark: "etsy",
        tag: "ETSY",
        title: "Etsy Handmade",
        sub: "Turn handmade & craft products into worldwide orders.",
        dur: c.dur,
        level: c.level,
        acc: "#F1641E",
        ink: "#C94E13",
      });
      continue;
    }
    const t = THEME[c.slug] || THEME["ai-marketing"];
    cards.push({
      key: c.slug,
      href: `/academy/${c.slug}`,
      mark: c.slug,
      tag: c.tag,
      badge: c.badge,
      title: c.title,
      sub: c.sub,
      dur: c.dur,
      level: c.level,
      acc: t.acc,
      ink: t.ink,
    });
  }
  return cards;
}

export default function CourseGallery({ courses }: { courses: Course[] }) {
  const cards = buildCards(courses);
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".cgcard");
    const step = card ? card.offsetWidth + 22 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="cgviewport rv">
      <div className="cgtrack" ref={trackRef}>
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="cgcard"
            style={{ "--acc": c.acc, "--ai": c.ink } as React.CSSProperties}
            aria-label={`${c.title} — view full curriculum`}
          >
            <div className="cgtop">
              <div className="cgtags">
                <span className="cgtag">{c.tag}</span>
                {c.badge ? <span className="cgbadge">{c.badge}</span> : null}
              </div>
              <h3 className="cgt">{c.title}</h3>
              <p className="cgs">{c.sub}</p>
            </div>

            <div className="cghero" aria-hidden="true">
              <span className="cghalo" />
              <span className="cgtile">
                <PlatformMark slug={c.mark} size={54} />
              </span>
            </div>

            <div className="cgfoot">
              <span className="cgmeta">
                {c.dur} · {c.level}
              </span>
              <span className="cgarr2" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button
        className="cgnav cgprev"
        onClick={() => scrollByCard(-1)}
        disabled={atStart}
        aria-label="Previous courses"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        className="cgnav cgnext"
        onClick={() => scrollByCard(1)}
        disabled={atEnd}
        aria-label="Next courses"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
