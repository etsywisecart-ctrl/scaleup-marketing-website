import type { Metadata } from "next";
import Link from "next/link";
import SolutionsHero from "@/components/SolutionsHero";
import FeatureList from "@/components/FeatureList";
import { LiveBuildPlayer, LiveOrderFeed } from "@/components/LiveShowcases";
import ShopifyShowcase from "@/components/ShopifyShowcase";
import RelatedLinks from "@/components/RelatedLinks";
import Process from "@/components/Process";
import { results } from "@/data/content";

export const metadata: Metadata = {
  title: "Ecommerce Development",
  description:
    "Shopify, WooCommerce & custom storefronts engineered to convert — theme speed, checkout flow, and the ops behind them.",
  alternates: { canonical: "/services/ecommerce" },
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
      <SolutionsHero
        crumb="Ecommerce Development"
        eyebrow="Solutions — Ecommerce"
        variant="commerce"
        title={
          <>
            Stores engineered
            <br />
            <span className="ahshimmer">to convert.</span>
          </>
        }
        lead="Shopify, WooCommerce, and marketplace storefronts built for speed and checkout conversion — with the ops training so your team can run it after we ship."
        chips={["Shopify Plus", "WooCommerce", "Daraz Seller", "Headless"]}
        ghostLabel="See timeline & process"
        ghostHref="#pricing"
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

      <section className="sec vidsec">
        <div className="wrap vidwrap">
          <div className="rv">
            <p className="eyebrow">Real project, in motion</p>
            <h2 className="h2">Watch a real client store come together.</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Aurelia Skin is a live client build — theme, catalog, payments, and pixel wired by
              this team. The loop on the right replays the build; the feed below is what store
              ops look like once it ships.
            </p>
            <div className="vlist">
              <div className="vli">
                <span className="vnum">+322%</span>Gross sales growth year over year — A$19.8K
              </div>
              <div className="vli">
                <span className="vnum">1,138</span>Orders processed through the rebuilt store
              </div>
              <div className="vli">
                <span className="vnum">48h</span>From payment gateway approval to first live order
              </div>
            </div>
            <LiveOrderFeed />
          </div>
          <div className="rv">
            <LiveBuildPlayer />
          </div>
        </div>
      </section>

      <ShopifyShowcase />

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Pricing &amp; timeline</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Fixed quote. No hourly surprises.
            </h2>
          </div>
          <div className="priceband rv" id="pricing" style={{ maxWidth: 760 }}>
            <span className="pricev">Fixed quote, in writing, before we start</span>
            <span className="softline">Scoped on a free call · 2–4 week launch for a standard store</span>
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
