import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FeatureList from "@/components/FeatureList";
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
      <SubHero
        crumbs={[{ label: "Services" }, { label: "Web, SaaS & App Development" }]}
        eyebrow="Services — Software"
        title={
          <>
            One product team. <span className="grad">Three ways to ship.</span>
          </>
        }
        lead="Business sites, full SaaS platforms, and mobile apps — built by the same senior engineers, on stacks chosen for year three, not week one."
        chips={["React", "Next.js", "Laravel", "Flutter", "Stripe billing", "AWS"]}
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
          <div className="rv" style={{ maxWidth: 760, marginTop: 32 }}>
            <div className="shot">
              <div className="shotbar">
                <span className="tl" style={{ background: "#FF5F57" }} />
                <span className="tl" style={{ background: "#FEBC2E" }} />
                <span className="tl" style={{ background: "#28C840" }} />
                <span className="shoturl">RGM Stone — Workflow OS · built &amp; delivered by ScaleUp</span>
              </div>
              <Image
                className="shotimg"
                src="/uploads/rgm-dashboard.png"
                alt="RGM Stone Workflow OS dashboard — a SaaS product built by ScaleUp Marketing"
                width={900}
                height={560}
              />
            </div>
            <div className="fstat">Live in production — jobs, factory pipeline &amp; billing in one dashboard</div>
          </div>
          <div className="priceband rv" id="pricing" style={{ maxWidth: 760 }}>
            <span className="pricev">Business sites from $1.5K · SaaS MVPs from $8K</span>
            <span className="softline">Fixed quote after a free scoping call · working demo every Friday</span>
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
