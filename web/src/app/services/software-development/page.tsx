import type { Metadata } from "next";
import Link from "next/link";
import SolutionsHero from "@/components/SolutionsHero";
import FeatureList from "@/components/FeatureList";
import { LiveCodeTyping, LiveMetricBoard } from "@/components/LiveShowcases";
import RelatedLinks from "@/components/RelatedLinks";
import Process from "@/components/Process";
import { results } from "@/data/content";

export const metadata: Metadata = {
  title: "Web, SaaS & App Development — ScaleUp Marketing",
  description:
    "Business sites, SaaS platforms, and mobile apps — one senior product team from MVP to full launch.",
};

const softwareResults = results.filter((r) => ["SAAS — WORKFLOW OS", "FLUTTER APP"].includes(r.tag));

const webFeatures = [
  { t: "Business & marketing sites", d: "Fast, SEO-ready sites built on React, Next.js, or Laravel." },
  { t: "Custom web platforms", d: "Internal tools, booking systems, and portals built to your exact process." },
];

const saasFeatures = [
  { t: "MVP in 8–12 weeks", d: "Auth, billing, and core workflows shipped fast enough to get in front of real users." },
  { t: "Stripe billing & subscriptions", d: "Plans, metering, and invoicing wired in from day one, not bolted on later." },
  { t: "Cloud infrastructure on AWS", d: "Infra sized for today's traffic and cheap to scale when it grows." },
  { t: "The dashboard your users log into", d: "The actual product surface — not just the marketing site around it." },
];

const mobileFeatures = [
  { t: "One codebase, two platforms", d: "Flutter or React Native — iOS and Android from a single build." },
  { t: "Commerce, booking & internal apps", d: "Native-feeling apps for storefronts, bookings, or internal field teams." },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <SolutionsHero
        crumb="Web, SaaS & App Development"
        eyebrow="Solutions — Software"
        variant="software"
        title={
          <>
            One product team.
            <br />
            <span className="ahshimmer">Three ways to ship.</span>
          </>
        }
        lead="Business sites, full SaaS platforms, and mobile apps — built by the same senior engineers, on stacks chosen for year three, not week one."
        chips={["React", "Next.js", "Laravel", "Flutter", "Stripe billing", "AWS"]}
        ghostLabel="See timeline & process"
        ghostHref="#pricing"
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Web Development</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Sites and platforms that load fast and rank.
            </h2>
          </div>
          <FeatureList items={webFeatures} />
        </div>
      </section>

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">SaaS Product Development</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              MVP to full launch, on one dashboard.
            </h2>
          </div>
          <FeatureList items={saasFeatures} />
          <div className="priceband rv" id="pricing" style={{ maxWidth: 760 }}>
            <span className="pricev">Fixed quote, in writing, before we start</span>
            <span className="softline">Scoped on a free call · working demo every Friday</span>
          </div>
        </div>
      </section>

      <section className="sec vidsec">
        <div className="wrap vidwrap">
          <div className="rv">
            <p className="eyebrow">Real project, in motion</p>
            <h2 className="h2">From first commit to live operations.</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              RGM Stone&rsquo;s Workflow OS is a real SaaS platform this team built and runs in
              production today — quoting, factory pipeline, and billing for a stone-fabrication
              business, all in one dashboard.
            </p>
            <div className="vlist">
              <div className="vli">
                <span className="vnum">LIVE</span>In production — a real business runs on it daily
              </div>
              <div className="vli">
                <span className="vnum">1</span>One dashboard — jobs, warnings &amp; billing together
              </div>
              <div className="vli">
                <span className="vnum">42s</span>Commit-to-production deploys, fully automated
              </div>
            </div>
          </div>
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <LiveCodeTyping />
            <LiveMetricBoard />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Mobile App Development</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              iOS &amp; Android from one build.
            </h2>
          </div>
          <FeatureList items={mobileFeatures} />
        </div>
      </section>

      <Process />

      {softwareResults.length > 0 && (
        <section className="sec softband" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: 640 }}>
              <p className="eyebrow">Results</p>
              <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
                Proof, not promises.
              </h2>
            </div>
            <div className="rgrid">
              {softwareResults.map((r) => (
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
              Need the storefront too?
            </h2>
          </div>
          <RelatedLinks
            items={[
              { href: "/services/ecommerce", title: "Ecommerce Development", meta: "Shopify, WooCommerce & marketplaces" },
              { href: "/academy/ai-marketing", title: "AI & Digital Marketing (Academy)", meta: "Learn the growth stack · 8 weeks" },
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
