"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/academy", label: "Academy" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`hd${scrolled ? " sc" : ""}`}>
        <div className="wrap hdr">
          <Link href="/">
            <Image
              className="lg"
              src="/uploads/logo.png"
              alt="ScaleUp Marketing — Learn. Launch. Scale."
              width={200}
              height={46}
              style={{ height: 46, width: "auto" }}
              priority
            />
          </Link>
          <nav className="nav">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} className="nlink" href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link className="btn btnG sm" href="/#contact">
              Book a Call
            </Link>
          </nav>
          <button
            className="burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
        </div>
      </header>
      <div className={`mm${menuOpen ? " on" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} className="mlink" href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link className="btn btnG" href="/#contact" onClick={() => setMenuOpen(false)} style={{ marginTop: 14 }}>
          Book a Strategy Call
        </Link>
      </div>
    </>
  );
}
