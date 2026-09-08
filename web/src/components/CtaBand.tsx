import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="cta-panel rv">
          <span className="cta-eyebrow">LEARN · LAUNCH · SCALE</span>
          <h2 className="cta-title">
            Ready to build, automate
            <br />
            &amp; scale your business?
          </h2>
          <p className="cta-sub">
            Book a free strategy call — no retainer required. Let’s map your next 90 days.
          </p>
          <div className="cta-btns">
            <Link className="btn btn-primary lg" href="/#contact">
              Book a Strategy Call
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link className="btn btn-ghost lg" href="/#work">
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
