import type { Metadata } from "next";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FeatureList from "@/components/FeatureList";
import RelatedLinks from "@/components/RelatedLinks";
import Process from "@/components/Process";
import { results } from "@/data/content";

export const metadata: Metadata = {
  title: "Ecommerce Development — ScaleUp Marketing",
  description:
    "Shopify, WooCommerce & custom storefronts engineered to convert — theme speed, checkout flow, and the ops behind them.",
};

const ecommerceResults = results.filter((r) =>
  ["SHOPIFY BUILD", "EBAY ACCOUNT", "DARAZ STORE"].includes(r.tag)
);

const features = [
  { t: "Theme engineering & speed", d: "Custom Shopify/WooCommerce themes tuned for Core Web Vitals, not just visuals." },
  { t: "Catalog & data migration", d: "Product, variant, and order history moved cleanly from your old platform or spreadsheet." },
  { t: "Payments & shipping setup", d: "Gateways, COD, shipping zones, and tax rules configured for your actual markets." },
  { t: "Checkout & CRO", d: "Cart, upsell, and checkout flow tightened for conversion, not just for launch." },
  { t: "Marketplace selling", d: "Daraz, eBay, and Etsy seller accounts set up and synced alongside your main store." },
  { t: "Ops handoff & training", d: "Your team learns the admin panel before we hand over the keys — no black box." },
];

export default function EcommercePage() {
  return (
    <>
      <SubHero
        crumbs={[{ label: "Services" }, { label: "Ecommerce Development" }]}
        eyebrow="Services — Ecommerce"
        title={
          <>
            Stores engineered <span className="grad">to convert.</span>
          </>
        }
        lead="Shopify, WooCommerce, and marketplace storefronts built for speed and checkout conversion — with the ops training so your team can run it after we ship."
        chips={["Shopify Plus", "WooCommerce", "Daraz Seller", "Headless"]}
        ctas={
          <>
            <Link className="btn btnG" href="/#contact">
              Book a free scoping call
            </Link>
            <a className="btn btnO" href="#pricing">
              See pricing &amp; timeline
            </a>
          </>
        }
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">What&rsquo;s included</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Everything between an idea and a first paid order.
            </h2>
          </div>
          <FeatureList items={features} />
        </div>
      </section>

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Pricing &amp; timeline</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Fixed quote. No hourly surprises.
            </h2>
          </div>
          <div className="priceband rv" id="pricing" style={{ maxWidth: 760 }}>
            <span className="pricev">Ecommerce builds start from $2.5K</span>
            <span className="softline">Fixed quote after a free scoping call · 2–4 week launch for a standard store</span>
          </div>
        </div>
      </section>

      <Process />

      {ecommerceResults.length > 0 && (
        <section className="sec softband" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: 640 }}>
              <p className="eyebrow">Results</p>
              <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
                Proof, not promises.
              </h2>
            </div>
            <div className="rgrid">
              {ecommerceResults.map((r) => (
                <div key={r.name} className="rtile rv">
                  <div className="rhead">
                    <h3 className="rname">{r.name}</h3>
                    <span className="rtag">{r.tag}</span>
                  </div>
                  <p className="rline">{r.line}</p>
                  <svg className="spark" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polyline points={r.pts} fill="none" stroke="#2FBF9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points={r.base} fill="none" stroke="#E0EBE8" strokeWidth="1.5" strokeDasharray="3 4" />
                  </svg>
                  <div className="rfoot">
                    <span className="rdelta">{r.delta}</span>
                    <span className="rmore">{r.more}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Related</p>
            <h2 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>
              Need software behind the store too?
            </h2>
          </div>
          <RelatedLinks
            items={[
              { href: "/services/software-development", title: "Web, SaaS & App Development", meta: "The product team behind your store" },
              { href: "/academy/shopify-mastery", title: "Shopify Mastery (Academy)", meta: "Learn to run it yourself · 12 weeks" },
            ]}
          />
          <div className="secta rv">
            <Link className="btn btnG" href="/#contact">
              Book a free scoping call
            </Link>
            <Link className="softline" href="/#work">
              See more results →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
