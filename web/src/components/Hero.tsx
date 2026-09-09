import Link from "next/link";

const BARS = [
  { h: "30%", c: "" },
  { h: "42%", c: "" },
  { h: "38%", c: "" },
  { h: "58%", c: "b" },
  { h: "76%", c: "a" },
  { h: "92%", c: "a" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-copy rv">
          <span className="eyebrow">
            <i className="dot" />
            Digital Agency × Training Academy
          </span>
          <h1 className="hero-title">
            Build. Automate.
            <br />
            <span className="accent">Scale.</span>
          </h1>
          <p className="hero-sub">
            We engineer digital businesses through ecommerce, AI and software —
            and train the next generation of Pakistani entrepreneurs to do the same.
          </p>
          <div className="hero-btns">
            <Link className="btn btn-primary lg" href="/#contact">
              Book a Strategy Call
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link className="btn btn-neu lg" href="/#services">
              Explore Solutions
            </Link>
          </div>
          <p className="hero-trust">
            <span className="stars">★★★★★</span>
            Trusted by 500+ students · 100+ projects delivered
          </p>
        </div>

        <div className="hero-visual rv d2" aria-hidden="true">
          <div className="growth-card">
            <div className="gc-head">
              <span>Revenue generated</span>
              <span className="gc-pill">▲ 312%</span>
            </div>
            <div className="gc-big">Rs 2.4 Cr+</div>
            <div className="gc-chart">
              {BARS.map((b, i) => (
                <span key={i} className={b.c} style={{ height: b.h, animationDelay: `${0.15 + i * 0.09}s` }} />
              ))}
            </div>
          </div>
          <span className="chip float-chip fc1">
            <i className="dot" />
            AI Automation
          </span>
          <span className="chip float-chip fc2">
            <i className="dot v" />
            Shopify Partner
          </span>
        </div>
      </div>
    </section>
  );
}
