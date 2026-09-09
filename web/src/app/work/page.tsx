import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import WorkSlider from "@/components/WorkSlider";
import { portfolio } from "@/data/work";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected ecommerce stores, apps and software we've designed, built and scaled for clients — with the real numbers behind them.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumb="Work"
        eyebrow="Selected work"
        title={<>Projects we&rsquo;ve shipped,<br /><span className="accent">and the numbers behind them.</span></>}
        lead="Real stores, apps and platforms we designed, built and scaled — swipe through a few of them below."
        primary={{ label: "Start your project", href: "/#contact" }}
        ghost={{ label: "Explore services", href: "/#services" }}
        chips={["Ecommerce", "SaaS & apps", "Marketplaces"]}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rv">
            <WorkSlider />
          </div>
          <p className="wsl-count rv">
            {portfolio.length} featured — more shipping every month.
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Have something in mind?</span>
            <h2 className="h2">Let&rsquo;s make yours the next one</h2>
            <p className="lead">
              Tell us where you want to sell and grow — we&rsquo;ll scope it, quote it, and build it with you.
            </p>
          </div>
          <div className="rv" style={{ textAlign: "center", marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-primary lg" href="/#contact">Book a free scoping call</Link>
            <Link className="btn btn-neu lg" href="/academy">Learn to build it yourself</Link>
          </div>
        </div>
      </section>
    </>
  );
}
