/* Right-side hero promo — glassmorphism card over a CSS/SVG animated
   football pitch. Pure CSS animation: autoplays, loops, silent, no controls. */

import Link from "next/link";

export default function HeroPromo() {
  return (
    <div className="promowrap">
      <div className="promo">
        {/* animated football scene */}
        <div className="promopitch" aria-hidden="true">
          <div className="ppstripes" />
          <div className="ppcircle" />
          <div className="ppflare ppflare1" />
          <div className="ppflare ppflare2" />
          <div className="pscene">
            {/* player mid-kick */}
            <svg className="pplayer" viewBox="0 0 140 176">
              <circle cx="48" cy="32" r="11.5" fill="#fff" />
              {/* jersey: torso + arms (teal) */}
              <g fill="none" stroke="#2FBF9E" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                <path d="M49 44 L60 98" />
                <path d="M54 60 L40 74 L30 65" />
                <path d="M54 58 L70 68 L83 57" />
              </g>
              {/* legs (white) */}
              <g fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                <path d="M60 98 L52 132 L45 164" />
              </g>
              <g className="kickleg" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                <path d="M60 98 L86 114 L110 106" />
              </g>
            </svg>
            {/* colorful football */}
            <span className="pball">
              <span className="pballspin">
                <svg className="pballsvg" viewBox="0 0 100 100">
                  <defs>
                    <radialGradient id="pbsh" cx="38%" cy="30%" r="78%">
                      <stop offset="0" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#eef3f4" />
                    </radialGradient>
                    <clipPath id="pbclip">
                      <circle cx="50" cy="50" r="46" />
                    </clipPath>
                  </defs>
                  <circle cx="50" cy="50" r="47" fill="url(#pbsh)" stroke="#0E2A38" strokeWidth="1.4" />
                  <g clipPath="url(#pbclip)">
                    <polygon points="50,35 64.3,45.4 58.8,62.1 41.2,62.1 35.7,45.4" fill="#2FBF9E" />
                    <polygon points="50,-6 60,6 50,15 40,6" fill="#F5A623" />
                    <polygon points="104,31 92,44 82,36 89,23" fill="#FF6B6B" />
                    <polygon points="88,98 74,87 82,73 96,79" fill="#3B82F6" />
                    <polygon points="12,98 26,73 34,87 20,98" fill="#7C5CFC" />
                    <polygon points="-4,31 11,23 18,36 8,44" fill="#F5A623" />
                  </g>
                  <g clipPath="url(#pbclip)" stroke="#0E2A38" strokeWidth="1.5" fill="none">
                    <line x1="50" y1="35" x2="50" y2="5" />
                    <line x1="64.3" y1="45.4" x2="90" y2="34" />
                    <line x1="58.8" y1="62.1" x2="74" y2="84" />
                    <line x1="41.2" y1="62.1" x2="26" y2="84" />
                    <line x1="35.7" y1="45.4" x2="10" y2="34" />
                  </g>
                </svg>
              </span>
            </span>
          </div>
          <span className="pdot pdot1" />
          <span className="pdot pdot2" />
          <span className="pdot pdot3" />
          <span className="pdot pdot4" />
        </div>

        {/* readability veil */}
        <div className="promoveil" aria-hidden="true" />

        {/* promo content */}
        <span className="probadge">⚽ FIFA Football Season · Limited-Time</span>
        <div className="promeat">
          <p className="proeyebrow">Exclusive Student Discount</p>
          <h3 className="protitle">
            Up to <span className="prooff">50% OFF</span> every course
          </h3>
          <p className="prosub">
            Kick off your ecommerce career this season — the offer ends soon.
          </p>
          <Link className="probtn" href="/#contact">
            Claim Student Offer
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <p className="pronote">No card required · Free 3-day demo included</p>
        </div>
      </div>
    </div>
  );
}
