import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const { contact, social } = siteConfig;

const columns = [
  {
    title: "Services",
    links: [
      ["Web Development", "/services/software-development"],
      ["App Development", "/services/software-development"],
      ["SaaS Products", "/services/software-development"],
      ["AI Engineering", "/services/software-development"],
    ],
  },
  {
    title: "Academy",
    links: [
      ["All Courses", "/academy"],
      ["Shopify Mastery", "/academy/shopify-mastery"],
      ["Free Demo Class", "/#contact"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Our Work", "/work"],
      ["Contact", "/#contact"],
      ["FAQ", "/#faq"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-intro">
            <Link className="footer-logo" href="/" aria-label="ScaleUp Marketing home">
              <Image
                className="logo-img logo-light"
                src="/uploads/logo.png"
                alt="ScaleUp Marketing"
                width={128}
                height={51}
              />
              <Image
                className="logo-img logo-dark"
                src="/uploads/logo-white.png"
                alt="ScaleUp Marketing"
                width={128}
                height={51}
              />
            </Link>

            <p className="footer-tagline">
              We build digital products, growth systems and practical skills that help businesses move forward.
            </p>

            <div className="footer-contact-simple">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneDisplay}`}>{contact.phoneDisplay}</a>
            </div>
          </div>

          <div className="footer-links">
            {columns.map((column) => (
              <div className="footer-column" key={column.title}>
                <h4>{column.title}</h4>
                {column.links.map(([label, href]) => (
                  <Link href={href} key={label}>{label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-offices-simple">
          <div className="footer-office-simple">
            <span>Dubai</span>
            <p>Dubai South Free Zone, Sector W6<br />Dubai, United Arab Emirates</p>
            <a href="tel:+971569663543">+971 56 966 3543</a>
          </div>

          <div className="footer-office-simple">
            <span>Australia</span>
            <p>31/10 Yato Road<br />Prestons, NSW 2170, Australia</p>
            <a href="tel:+61494389727">+61 494 389 727</a>
          </div>

          <div className="footer-social-simple">
            <span>Follow us</span>
            <div>
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

        <div className="footer-bottom-simple">
          <span>© {new Date().getFullYear()} ScaleUp Marketing</span>
          <span>Learn. Launch. Scale.</span>
        </div>
      </div>
    </footer>
  );
}
