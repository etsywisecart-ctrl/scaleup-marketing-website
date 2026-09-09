import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FeatureList from "@/components/FeatureList";
import RelatedLinks from "@/components/RelatedLinks";
import { steps, results } from "@/data/content";

export const metadata: Metadata = {
  title: "Web, SaaS & App Development",
  description:
    "Business sites, SaaS platforms, and mobile apps — one senior product team from MVP to full launch.",
  alternates: { canonical: "/services/software-development" },
};

const softwareResults = results.filter((r) => ["SAAS — WORKFLOW OS", "FLUTTER APP"].includes(r.tag));

const webFeatures = [
  { t: "Business & marketing sites", d: "Fast, SEO-ready sites built on React, Next.js or Laravel." },
  { t: "Custom web platforms", d: "Internal tools, booking systems and portals built to your exact process." },
];
const saasFeatures = [
  { t: "MVP in 8–12 weeks", d: "Auth, billing and core workflows shipped fast enough to get in front of real users." },
  { t: "Stripe billing & subscriptions", d: "Plans, metering and invoicing wired in from day one — not bolted on later." },
  { t: "Cloud infrastructure on AWS", d: "Infra sized for today's traffic and cheap to scale when it grows." },
  { t: "The dashboard your users log into", d: "The actual product surface — not just the marketing site around it." },
];
const mobileFeatures = [
  { t: "One codebase, two platforms", d: "Flutter or React Native — iOS and Android from a single build." },
  { t: "Commerce, booking & internal apps", d: "Native-feeling apps for storefronts, bookings or internal field teams." },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <PageHero
        crumb="Web, SaaS & App Development"
        eyebrow="Solutions · Software"
        title={<>One product team.<br /><span className="accent">Three ways to ship.</span></>}
        lead="Business sites, full SaaS platforms and mobile apps — built by the same senior engineers, on stacks chosen for year three, not week one."
        chips={["React", "Next.js", "Laravel", "Flutter", "Stripe", "AWS"]}
        ghost={{ label: "See process & pricing", href: "#pricing" }}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Web development</span>
            <h2 className="h2">Sites and platforms that load fast and rank</h2>
          </div>
          <FeatureList items={webFeatures} />
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />SaaS product development</span>
            <h2 className="h2">MVP to full launch, on one dashboard</h2>
          </div>
          <FeatureList items={saasFeatures} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Mobile app development</span>
            <h2 className="h2">iOS &amp; Android from one build</h2>
          </div>
          <FeatureList items={mobileFeatures} />
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }} id="pricing">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />How we work</span>
            <h2 className="h2">Fixed quote. A demo every Friday.</h2>
            <p className="lead">Scoped on a free call, quoted in writing, with a working build in your hands every week.</p>
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

      {softwareResults.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow"><i className="dot" />Results</span>
              <h2 className="h2">Proof, not promises</h2>
            </div>
            <div className="grid grid-2" style={{ marginTop: 48 }}>
              {softwareResults.map((r, i) => (
                <div key={r.name} className={`card rv d${(i % 2) + 1}`}>
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
            <h2 className="h2">Need the storefront too?</h2>
          </div>
          <RelatedLinks
            items={[
              { href: "/services/ecommerce", title: "Ecommerce Development", meta: "Shopify, WooCommerce & marketplaces" },
              { href: "/academy/ai-marketing", title: "AI & Digital Marketing (Academy)", meta: "Learn the growth stack · 8 weeks" },
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
