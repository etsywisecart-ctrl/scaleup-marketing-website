import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/* Branded social pills — platform glyph in its brand color + the handle.
   Only platforms with a real URL in siteConfig.social are rendered. */
const SOCIAL_META: Record<string, { label: string; handle: string; color: string; glyph: React.ReactNode }> = {
  facebook: {
    label: "Facebook",
    handle: "scalesupmarketing",
    color: "#1877F2",
    glyph: (
      <path d="M13.4 21v-7h2.3l.45-2.8H13.4V9.4c0-.82.27-1.4 1.43-1.4h1.47V5.5c-.26-.03-1.13-.1-2.15-.1-2.13 0-3.58 1.3-3.58 3.68v2.12H8.2V14h2.37v7h2.83Z" />
    ),
  },
  instagram: {
    label: "Instagram",
    handle: "scalesupmarketing",
    color: "#E4405F",
    glyph: (
      <path d="M12 4.3c2.5 0 2.8 0 3.8.06 2.5.11 3.73 1.36 3.84 3.84.05 1 .06 1.3.06 3.8s-.01 2.8-.06 3.8c-.11 2.48-1.34 3.73-3.84 3.84-1 .05-1.3.06-3.8.06s-2.8-.01-3.8-.06c-2.5-.11-3.73-1.36-3.84-3.84-.05-1-.06-1.3-.06-3.8s.01-2.8.06-3.8C4.47 5.72 5.7 4.47 8.2 4.36c1-.05 1.3-.06 3.8-.06Zm0 3.4a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm0 2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Zm4.5-2.9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    ),
  },
  youtube: {
    label: "YouTube",
    handle: "scalesupmarketing",
    color: "#FF0000",
    glyph: (
      <path d="M21.6 8.2a2.5 2.5 0 0 0-1.76-1.77C18.28 6 12 6 12 6s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 8.2 26 26 0 0 0 2 12c0 1.28.13 2.56.4 3.8a2.5 2.5 0 0 0 1.76 1.77C5.72 18 12 18 12 18s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77c.27-1.24.4-2.52.4-3.8s-.13-2.56-.4-3.8ZM10 15V9l5.2 3L10 15Z" />
    ),
  },
  linkedin: {
    label: "LinkedIn",
    handle: "scalesupmarketing",
    color: "#0A66C2",
    glyph: (
      <path d="M6.94 8.5a1.94 1.94 0 1 0 0-3.88 1.94 1.94 0 0 0 0 3.88ZM5.34 10h3.2v9.5h-3.2V10Zm5.1 0h3.07v1.3h.04c.43-.77 1.47-1.58 3.03-1.58 3.24 0 3.84 2.06 3.84 4.74v5.04h-3.2v-4.47c0-1.07-.02-2.44-1.54-2.44-1.54 0-1.78 1.16-1.78 2.36v4.55h-3.2V10Z" />
    ),
  },
};

export default function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Image
              className="lg"
              src="/uploads/logo.png"
              alt="ScaleUp Marketing"
              width={230}
              height={52}
              style={{ height: 52, width: "auto" }}
            />
            <p className="ftag2">
              One ecosystem for digital growth — an agency that builds and an academy that
              teaches. Learn. Launch. Scale.
            </p>
          </div>
          <div className="fcol">
            <p className="fh">Solutions</p>
            <Link className="flink" href="/services/ecommerce">Ecommerce Development</Link>
            <Link className="flink" href="/services/software-development">Web Development</Link>
            <Link className="flink" href="/services/software-development">Mobile Apps</Link>
            <Link className="flink" href="/services/software-development">SaaS Products</Link>
            <Link className="flink" href="/#services">AI Automation</Link>
            <Link className="flink" href="/#services">CRM / ERP</Link>
            <Link className="flink" href="/#services">Digital Marketing</Link>
          </div>
          <div className="fcol">
            <p className="fh">Academy</p>
            <Link className="flink" href="/academy/shopify-mastery">Shopify Mastery</Link>
            <Link className="flink" href="/academy/tiktok-shop">TikTok Shop</Link>
            <Link className="flink" href="/academy/ebay-etsy">eBay &amp; Etsy International</Link>
            <Link className="flink" href="/academy/daraz">Daraz Local Commerce</Link>
            <Link className="flink" href="/academy/ai-marketing">AI &amp; Digital Marketing</Link>
            <Link className="flink" href="/academy#demo">Free 3-Day Demo</Link>
          </div>
          <div className="fcol">
            <p className="fh">Company</p>
            <Link className="flink" href="/about">About Us</Link>
            <Link className="flink" href="/#work">Results</Link>
            <Link className="flink" href="/#voices">Testimonials</Link>
            <Link className="flink" href="/#faq">FAQ</Link>
            <Link className="flink" href="/#contact">Free Consultation</Link>
          </div>
          <div className="fcol">
            <p className="fh">Contact</p>
            <a className="flink" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a className="flink" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="flink" href={contact.whatsappHref}>WhatsApp Business</a>
            <span className="flink" style={{ fontWeight: 500, color: "#7A8B92" }}>
              {contact.addressLine1}
              <br />
              {contact.addressLine2}
            </span>
            <span className="flink" style={{ fontWeight: 500, color: "#7A8B92" }}>{contact.hours}</span>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 SCALEUP MARKETING — LEARN. LAUNCH. SCALE.</span>
          {/* Social pills render only once real profile URLs are set in site.ts */}
          <div className="fsoc">
            {Object.entries(social)
              .filter(([key, href]) => href && !href.startsWith("#") && SOCIAL_META[key])
              .map(([key, href]) => {
                const s = SOCIAL_META[key];
                return (
                  <a
                    key={key}
                    className="socpill"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} — @${s.handle}`}
                    style={{ "--sc": s.color } as React.CSSProperties}
                  >
                    <span className="socico">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        {s.glyph}
                      </svg>
                    </span>
                    <span className="sochandle">@{s.handle}</span>
                    <svg className="socarr" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
}
