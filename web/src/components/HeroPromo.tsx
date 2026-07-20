/* Right-side hero promo — glassmorphism card over a CSS/SVG animated
   "AI-powered growth" scene: a neural network fires a data pulse into a
   glowing AI core, which rockets a rising revenue chart into the top-right
   corner and bursts into a "+312%" scale-up. On-trend for 2026 (AI agents +
   growth) and on-brand (Build. Automate. Scale.). Pure CSS, autoplays,
   silent, loops, respects reduced-motion (.nomotion). */

import Link from "next/link";

// drifting data particles
const PARTICLES = [
  { left: "12%", top: "30%", delay: "0s" },
  { left: "26%", top: "58%", delay: "-1.6s" },
  { left: "44%", top: "22%", delay: "-3.1s" },
  { left: "60%", top: "50%", delay: "-0.8s" },
  { left: "78%", top: "34%", delay: "-2.4s" },
  { left: "88%", top: "60%", delay: "-4s" },
];

const STARS = [
  { left: "10%", top: "8%", delay: "0s" },
  { left: "32%", top: "13%", delay: "-1.1s" },
  { left: "52%", top: "6%", delay: "-2.2s" },
  { left: "70%", top: "12%", delay: "-0.6s" },
  { left: "90%", top: "9%", delay: "-1.6s" },
];

// neural-net nodes (percent coords inside the net box)
const NODES = [
  { cx: 16, cy: 34, r: 3.2, d: "0s" },
  { cx: 18, cy: 74, r: 2.6, d: "-0.7s" },
  { cx: 48, cy: 20, r: 2.8, d: "-1.1s" },
  { cx: 52, cy: 56, r: 3.4, d: "-0.4s" },
  { cx: 46, cy: 92, r: 2.4, d: "-1.5s" },
  { cx: 84, cy: 40, r: 3.6, d: "-0.9s" },
  { cx: 82, cy: 78, r: 2.6, d: "-1.9s" },
];

export default function HeroPromo() {
  return (
    <div className="promowrap">
      <div className="promo">
        {/* animated AI-growth scene */}
        <div className="aiscene" aria-hidden="true">
          <div className="aigrid" />
          <div className="aiglow aiglow1" />
          <div className="aiglow aiglow2" />

          {/* night-sky sparks */}
          {STARS.map((s, i) => (
            <span key={i} className="astar" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
          ))}

          {/* neural network firing into the core */}
          <svg className="ainet" viewBox="0 0 100 110" preserveAspectRatio="none">
            <g className="ainetlinks" stroke="rgba(127,231,207,.5)" strokeWidth="0.7" fill="none">
              <line x1="16" y1="34" x2="52" y2="56" />
              <line x1="18" y1="74" x2="52" y2="56" />
              <line x1="48" y1="20" x2="52" y2="56" />
              <line x1="46" y1="92" x2="52" y2="56" />
              <line x1="52" y1="56" x2="84" y2="40" />
              <line x1="52" y1="56" x2="82" y2="78" />
              <line x1="48" y1="20" x2="84" y2="40" />
              <line x1="18" y1="74" x2="46" y2="92" />
            </g>
            {NODES.map((n, i) => (
              <circle key={i} className="ainetnode" cx={n.cx} cy={n.cy} r={n.r}
                      fill="#7fe7cf" style={{ animationDelay: n.d }} />
            ))}
            {/* signal pulse travelling toward the core */}
            <circle className="ainetpulse" r="2.4" fill="#eafff8" />
          </svg>

          {/* central AI core */}
          <div className="aicore">
            <span className="aicorering" />
            <span className="aicorering aicorering2" />
            <span className="aicoreorb">
              <span className="aicoremark">AI</span>
            </span>
            <span className="aicorepulse" />
          </div>

          {/* rising growth chart climbing into the top-right corner */}
          <svg className="aichart" viewBox="0 0 180 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="aiarea" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="rgba(47,191,158,0)" />
                <stop offset="1" stopColor="rgba(47,191,158,.42)" />
              </linearGradient>
              <linearGradient id="ailine" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#2FBF9E" />
                <stop offset="1" stopColor="#8affdf" />
              </linearGradient>
            </defs>
            {/* baseline bars ghosting up */}
            <g className="aibars" fill="rgba(127,231,207,.16)">
              <rect x="12"  y="118" width="12" height="24" rx="2" style={{ animationDelay: "-0.1s" }} />
              <rect x="44"  y="104" width="12" height="38" rx="2" style={{ animationDelay: "-0.35s" }} />
              <rect x="76"  y="86"  width="12" height="56" rx="2" style={{ animationDelay: "-0.6s" }} />
              <rect x="108" y="60"  width="12" height="82" rx="2" style={{ animationDelay: "-0.85s" }} />
              <rect x="140" y="30"  width="12" height="112" rx="2" style={{ animationDelay: "-1.1s" }} />
            </g>
            {/* area + trend line drawing up-right */}
            <path className="aiarea" d="M6,132 L48,112 L90,94 L128,60 L168,16 L168,150 L6,150 Z" fill="url(#aiarea)" />
            <path className="ailinepath" d="M6,132 L48,112 L90,94 L128,60 L168,16"
                  fill="none" stroke="url(#ailine)" strokeWidth="3.4"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* rocket spark riding the trend line into the corner */}
          <div className="aiflight">
            <span className="airocket">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 2c3.6 1.4 6 5 6 9.2 0 2.2-.7 3.9-1.6 5.2l-2.1-1.2c.5-1.2.8-2.5.8-4C15.1 8 13.8 5.4 12 3.9 10.2 5.4 8.9 8 8.9 11.2c0 1.5.3 2.8.8 4l-2.1 1.2C6.7 15.1 6 13.4 6 11.2 6 7 8.4 3.4 12 2Z" fill="#eafff8"/>
                <circle cx="12" cy="10.5" r="1.7" fill="#0e3a42"/>
                <path d="M9.4 17.6 12 22l2.6-4.4a6 6 0 0 1-5.2 0Z" fill="#F5A623"/>
              </svg>
              <span className="airockettrail" />
            </span>
          </div>

          {/* peak target ring in the corner */}
          <span className="aitarget" />

          {/* growth burst at the peak */}
          <span className="aiburst">+312%</span>
          <span className="aispark aispark1" />
          <span className="aispark aispark2" />
          <span className="aispark aispark3" />
          <span className="aispark aispark4" />
          <span className="aispark aispark5" />

          {/* sweeping scan light */}
          <span className="aiscan" />

          {/* drifting particles */}
          {PARTICLES.map((p, i) => (
            <span key={i} className="apart" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
          ))}
        </div>

        {/* readability veil */}
        <div className="promoveil" aria-hidden="true" />

        {/* promo content */}
        <span className="probadge">✦ AI Growth Season · Limited-Time</span>
        <div className="promeat">
          <p className="proeyebrow">Exclusive Student Discount</p>
          <h3 className="protitle">
            Up to <span className="prooff">50% OFF</span> every course
          </h3>
          <p className="prosub">
            Master AI-powered ecommerce &amp; marketing — get store-ready before the Q4 rush. Offer ends soon.
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
