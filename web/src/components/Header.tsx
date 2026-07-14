"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const SERVICE_LINKS = [
  { href: "/services/ecommerce", label: "Ecommerce Development", sub: "Shopify, WooCommerce & marketplaces" },
  { href: "/services/software-development", label: "Web, SaaS & App Dev", sub: "Sites, platforms & mobile apps" },
  { href: "/#services", label: "All Solutions", sub: "AI, CRM/ERP, design, marketing & more" },
];

const MAIN_LINKS = [
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About Us" },
  { href: "/#work", label: "Work" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mServicesOpen, setMServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setMServicesOpen(false);
  };

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
            <div className="navdd">
              <Link className="nlink navddtrigger" href="/#services">
                Solutions
                <svg className="navddcaret" width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 4.5 6 8l3.5-3.5" />
                </svg>
              </Link>
              <div className="navddmenu">
                {SERVICE_LINKS.map((l) => (
                  <Link key={l.label} className="navddlink" href={l.href}>
                    {l.label}
                    <span className="navddsub">{l.sub}</span>
                  </Link>
                ))}
              </div>
            </div>
            {MAIN_LINKS.map((l) => (
              <Link key={l.href} className="nlink" href={l.href}>
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link className="btn btnG sm" href="/#contact">
              Free Consultation
            </Link>
          </nav>
          <div className="hdmob">
            <ThemeToggle />
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
        </div>
      </header>
      <div className={`mm${menuOpen ? " on" : ""}`}>
        <button
          className="mlink mgroup"
          onClick={() => setMServicesOpen((v) => !v)}
          aria-expanded={mServicesOpen}
        >
          Solutions
          <span className={`mgcaret${mServicesOpen ? " open" : ""}`}>+</span>
        </button>
        {mServicesOpen && (
          <div className="msub">
            {SERVICE_LINKS.map((l) => (
              <Link key={l.label} className="msublink" href={l.href} onClick={closeMenu}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
        {MAIN_LINKS.map((l) => (
          <Link key={l.href} className="mlink" href={l.href} onClick={closeMenu}>
            {l.label}
          </Link>
        ))}
        <Link className="btn btnG" href="/#contact" onClick={closeMenu} style={{ marginTop: 14 }}>
          Free Consultation
        </Link>
      </div>
    </>
  );
}
