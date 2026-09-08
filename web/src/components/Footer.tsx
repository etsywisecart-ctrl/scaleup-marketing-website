import Link from "next/link";
import { siteConfig } from "@/config/site";

const { contact, social } = siteConfig;

const COLS = [
  { h: "Solutions", links: [["Ecommerce", "/services/ecommerce"], ["Software & apps", "/services/software-development"], ["All solutions", "/#services"]] },
  { h: "Academy", links: [["All courses", "/academy"], ["Shopify Mastery", "/academy/shopify-mastery"], ["Free demo class", "/#contact"]] },
  { h: "Company", links: [["About", "/about"], ["Work", "/#work"], ["Contact", "/#contact"], ["FAQ", "/#faq"]] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="hd-logo" href="/"><span className="mk">S</span>Scale Up</Link>
            <p>
              {contact.addressLine1} {contact.addressLine2}
              <br />
              {contact.email}
              <br />
              {contact.phoneDisplay}
            </p>
          </div>
          <div className="footer-cols">
            {COLS.map((c) => (
              <div className="footer-col" key={c.h}>
                <h4>{c.h}</h4>
                {c.links.map(([label, href]) => (
                  <Link key={label} href={href}>{label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <span>© {new Date().getFullYear()} ScaleUp Marketing · Learn. Launch. Scale.</span>
          <div className="footer-social">
            {social.facebook && !social.facebook.startsWith("#") && (
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener">f</a>
            )}
            {social.instagram && !social.instagram.startsWith("#") && (
              <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener">◎</a>
            )}
            {social.tiktok && !social.tiktok.startsWith("#") && (
              <a href={social.tiktok} aria-label="TikTok" target="_blank" rel="noopener">♪</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
