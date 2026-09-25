import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const { contact, social } = siteConfig;

const COLS = [
  { h: "Solutions", links: [["Web Development", "/services/software-development"], ["App Development", "/services/software-development"], ["SaaS Products", "/services/software-development"], ["AI Engineering", "/services/software-development"]] },
  { h: "Academy", links: [["All courses", "/academy"], ["Shopify Mastery", "/academy/shopify-mastery"], ["Free demo class", "/#contact"]] },
  { h: "Company", links: [["About", "/about"], ["Our work", "/work"], ["Contact", "/#contact"], ["FAQ", "/#faq"]] },
] as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="hd-logo footer-logo" href="/" aria-label="ScaleUp Marketing home">
              <Image className="logo-img logo-light" src="/uploads/logo.png" alt="ScaleUp Marketing" width={128} height={51} />
              <Image className="logo-img logo-dark" src="/uploads/logo-white.png" alt="ScaleUp Marketing" width={128} height={51} />
            </Link>
            <p>We design, build and scale digital products for ambitious businesses.</p>
            <div className="footer-offices">
              <div className="footer-office">
                <span className="footer-office-label">Dubai Office</span>
                <span>Dubai South Free Zone, Sector W6<br />Dubai, United Arab Emirates</span>
                <a href="tel:+971569663543">+971 56 966 3543</a>
              </div>
              <div className="footer-office">
                <span className="footer-office-label">Australia Office</span>
                <span>31/10 Yato Road<br />Prestons, NSW 2170, Australia</span>
              </div>
            </div>
            <div className="footer-contact">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneDisplay}`}>{contact.phoneDisplay}</a>
            </div>
          </div>
          <div className="footer-cols">
            {COLS.map((c) => (
              <div className="footer-col" key={c.h}>
                <h4>{c.h}</h4>
                {c.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <span>© {new Date().getFullYear()} ScaleUp Marketing · Learn. Launch. Scale.</span>
          <div className="footer-social">
            {social.facebook && !social.facebook.startsWith("#") && <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener">f</a>}
            {social.instagram && !social.instagram.startsWith("#") && <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener">◎</a>}
            {social.tiktok && !social.tiktok.startsWith("#") && <a href={social.tiktok} aria-label="TikTok" target="_blank" rel="noopener">♪</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
