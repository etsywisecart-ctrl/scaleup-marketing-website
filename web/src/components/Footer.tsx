"use client";

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { courses } from "@/data/content";
import { BrandIcon } from "./BrandIcon";

const { contact, social } = siteConfig;

const COLUMNS = [
  {
    title: "Services",
    links: [
      ["Ecommerce stores", "/services/ecommerce"],
      ["AI & software", "/services/software-development"],
      ["Digital marketing", "/#services"],
      ["Store management", "/#services"],
      ["Design & branding", "/#services"],
      ["Consulting & systems", "/#services"],
    ],
  },
  {
    title: "Academy",
    links: [
      ["All courses", "/academy"],
      ...courses.slice(0, 4).map((c) => [c.title, `/academy/${c.slug}`]),
      ["Free 3-day demo", "/#contact"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Our work", "/work"],
      ["How we work", "/#process"],
      ["FAQ", "/#faq"],
      ["Contact", "/#contact"],
    ],
  },
] as { title: string; links: string[][] }[];

const OFFICES = [
  { code: "PK", city: "Lahore", tag: "HQ & campus", tz: "Asia/Karachi", lines: [contact.addressLine1, contact.addressLine2], phone: contact.phoneDisplay, href: contact.phoneHref },
  { code: "AE", city: "Dubai", tag: "Middle East", tz: "Asia/Dubai", lines: ["Dubai South Free Zone, Sector W6", "Dubai, United Arab Emirates"], phone: "+971 56 966 3543", href: "tel:+971569663543" },
  { code: "AU", city: "Sydney", tag: "Australia", tz: "Australia/Sydney", lines: ["31/10 Yato Road", "Prestons, NSW 2170"], phone: "+61 494 389 727", href: "tel:+61494389727" },
];

const SOCIAL_ICONS: Record<string, ReactElement> = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21Z" /></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.4a5.8 5.8 0 1 0 5 5.8V9.1a7 7 0 0 0 4 1.3V7.3a4 4 0 0 1-4-4.3Z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.7H3.8V20h3.1ZM5.3 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.2 13.4c0-3.1-1.7-4.9-4.3-4.9a3.7 3.7 0 0 0-3.3 1.8V8.7H9.6V20h3.1v-5.9c0-1.6.8-2.6 2.1-2.6s2 .9 2 2.6V20h3.1Z" /></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3Z" /></svg>,
};

const Ic = {
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
};

/* Live local time per office — rendered only after mount so the server and
   client markup always match. */
function LocalTime({ tz }: { tz: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tz]);
  return <span className="ft-time">{Ic.clock}{t ?? "—"}</span>;
}

export default function Footer() {
  const socials = Object.entries(social).filter(([, url]) => url && !url.startsWith("#"));

  return (
    <footer className="ft">
      <div className="ft-glow" aria-hidden="true" />
      <div className="wrap ft-inner">
        {/* closing call to action */}
        <div className="ft-cta">
          <div>
            <b>Ready when you are.</b>
            <span>Start with a free 3-day demo class — or book a free strategy call.</span>
          </div>
          <div className="ft-cta-btns">
            <Link className="btn btn-primary" href="/#contact">
              Book a strategy call
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
            <Link className="btn ft-btn-ghost" href="/academy">Free demo class</Link>
          </div>
        </div>

        {/* main */}
        <div className="ft-main">
          <div className="ft-brand">
            <Link className="ft-logo" href="/" aria-label="ScaleUp Marketing home">
              <Image src="/uploads/logo-white.png" alt="ScaleUp Marketing" width={136} height={54} />
            </Link>
            <p>
              A digital agency and training academy under one roof — we build stores, software and
              growth systems, and teach the skills behind them.
            </p>
            <div className="ft-contact">
              <a href={`mailto:${contact.email}`}><span>{Ic.mail}</span>{contact.email}</a>
              <a href={contact.phoneHref}><span>{Ic.phone}</span>{contact.phoneDisplay}</a>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer"><span className="wa"><BrandIcon name="whatsapp" /></span>WhatsApp us</a>
            </div>
            {socials.length > 0 && (
              <div className="ft-social">
                {socials.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className={`s-${name}`}>
                    {SOCIAL_ICONS[name]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="ft-cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div className="ft-col" key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map(([label, href]) => (
                  <Link href={href} key={label}>{label}</Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* offices */}
        <div className="ft-offices">
          {OFFICES.map((o) => (
            <div className="ft-office" key={o.city}>
              <div className="ft-office-top">
                <span className="ft-code">{o.code}</span>
                <div>
                  <b>{o.city}</b>
                  <small>{o.tag}</small>
                </div>
                <LocalTime tz={o.tz} />
              </div>
              <p>{o.lines[0]}<br />{o.lines[1]}</p>
              <a href={o.href}>{o.phone}</a>
            </div>
          ))}
        </div>

        {/* bottom */}
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} ScaleUp Marketing · Lahore · Dubai · Sydney</span>
          <span className="ft-tag">Learn. Launch. Scale.</span>
          <a href="#top" className="ft-top">
            Back to top
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M4 7l4-4 4 4" /></svg>
          </a>
        </div>
      </div>
      <div className="ft-wordmark" aria-hidden="true">SCALE UP</div>
    </footer>
  );
}
