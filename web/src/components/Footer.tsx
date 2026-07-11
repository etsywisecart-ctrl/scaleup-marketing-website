import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

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
          <div className="fsoc">
            <a href={social.linkedin}>LINKEDIN</a>
            <a href={social.instagram}>INSTAGRAM</a>
            <a href={social.youtube}>YOUTUBE</a>
            <a href={social.facebook}>FACEBOOK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
