import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FeatureList from "@/components/FeatureList";
import RelatedLinks from "@/components/RelatedLinks";
import { steps, results } from "@/data/content";

export const metadata: Metadata = {
  title: "Ecommerce Development",
  description:
    "Shopify, WooCommerce & custom storefronts engineered to convert — theme speed, checkout flow, and the ops behind them.",
  alternates: { canonical: "/services/ecommerce" },
};

const ecommerceResults = results.filter((r) => ["SHOPIFY BUILD", "EBAY ACCOUNT", "DARAZ STORE"].includes(r.tag));

const features = [
  { t: "Theme engineering & speed", d: "Custom Shopify / WooCommerce themes tuned for Core Web Vitals, not just visuals." },
  { t: "Catalog & data migration", d: "Products, variants and order history moved cleanly from your old platform or spreadsheet." },
  { t: "Payments & shipping setup", d: "Gateways, COD, shipping zones and tax rules configured for your actual markets." },
  { t: "Checkout & CRO", d: "Cart, upsell and checkout flow tightened for conversion — not just for launch." },
  { t: "Marketplace selling", d: "Daraz, eBay and Etsy seller accounts set up and synced alongside your main store." },
  { t: "Ops handoff & training", d: "Your team learns the admin panel before we hand over the keys — no black box." },
];

export default function EcommercePage() {
  return (
    <>
      <PageHero
        crumb="Ecommerce Development"
        eyebrow="Solutions · Ecommerce"
        title={<>Stores engineered<br /><span className="accent">to convert.</span></>}
        lead="Shopify, WooCommerce and marketplace storefronts built for speed and checkout conversion — with the ops training so your team can run it after we ship."
        chips={["Shopify Plus", "WooCommerce", "Daraz Seller", "Headless"]}
        ghost={{ label: "See process & pricing", href: "#pricing" }}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />What&rsquo;s included</span>
            <h2 className="h2">Everything between an idea and a first paid order</h2>
          </div>
          <FeatureList items={features} />
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }} id="pricing">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Pricing &amp; timeline</span>
            <h2 className="h2">Fixed quote. No hourly surprises.</h2>
            <p className="lead">Scoped on a free call · 2–4 week launch for a standard store · a working build every Friday.</p>
          </div>
          <div className="process rv" style={{ marginTop: 48 }}>
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <span className="step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {ecommerceResults.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow"><i className="dot" />Results</span>
              <h2 className="h2">Proof, not promises</h2>
            </div>
            <div className="grid grid-3" style={{ marginTop: 48 }}>
              {ecommerceResults.map((r, i) => (
                <div key={r.name} className={`card rv d${(i % 3) + 1}`}>
                  <div className="cc-top"><span className="cc-tag mono">{r.tag}</span><span className="cc-badge">{r.delta}</span></div>
                  <h3>{r.name}</h3>
                  <p>{r.line}</p>
                  <div className="kpis">
                    {r.kpis.map((k) => (<div key={k.l} className="kpi"><b>{k.v}</b><span>{k.l}</span></div>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Related</span>
            <h2 className="h2">Need software behind the store too?</h2>
          </div>
          <RelatedLinks
            items={[
              { href: "/services/software-development", title: "Web, SaaS & App Development", meta: "The product team behind your store" },
              { href: "/academy/shopify-mastery", title: "Shopify Mastery (Academy)", meta: "Learn to run it yourself · 12 weeks" },
            ]}
          />
          <div className="rv" style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-primary lg" href="/#contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
