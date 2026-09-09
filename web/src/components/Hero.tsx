import Link from "next/link";

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

        <div className="hero-visual rv d2">
          <div className="promo-card">
            <div className="promo-top">
              <span className="promo-badge"><i className="live-dot" />Now Enrolling</span>
              <span className="promo-seats">Limited seats</span>
            </div>
            <h2 className="promo-title"><span className="accent">Free</span> 3-Day<br />Demo Class</h2>
            <p className="promo-sub">
              Sit in a real live cohort before you pay a rupee — online or at our Lahore campus.
            </p>
            <div className="promo-feats">
              <span>Live cohorts</span>
              <span>Every marketplace</span>
              <span>Lifetime access</span>
            </div>
            <Link className="btn btn-primary promo-cta" href="/#contact">
              Reserve your seat
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
          <span className="chip float-chip fc1" aria-hidden="true">
            <i className="dot" />
            New batch open
          </span>
          <span className="chip float-chip fc2" aria-hidden="true">
            <i className="dot v" />
            Shopify Partner
          </span>
        </div>
      </div>
    </section>
  );
}
