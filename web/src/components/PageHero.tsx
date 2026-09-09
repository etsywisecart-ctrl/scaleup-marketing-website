import Link from "next/link";
import type { ReactNode } from "react";

type Cta = { label: string; href: string };

export default function PageHero({
  crumb,
  eyebrow,
  title,
  lead,
  chips,
  primary = { label: "Book a free call", href: "/#contact" },
  ghost,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  chips?: string[];
  primary?: Cta;
  ghost?: Cta;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav className="crumb rv" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="crumb-cur">{crumb}</span>
        </nav>
        <span className="eyebrow rv"><i className="dot" />{eyebrow}</span>
        <h1 className="h1 page-hero-title rv d1">{title}</h1>
        <p className="lead page-hero-lead rv d2">{lead}</p>
        {chips && chips.length > 0 && (
          <div className="hero-chips rv d2">
            {chips.map((c) => (
              <span className="chip" key={c}><i className="dot" />{c}</span>
            ))}
          </div>
        )}
        <div className="page-hero-btns rv d3">
          <Link className="btn btn-primary lg" href={primary.href}>
            {primary.label}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          {ghost && (
            <Link className="btn btn-neu lg" href={ghost.href}>{ghost.label}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
