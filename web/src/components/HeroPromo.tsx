/* Right-side hero promo — a cinematic Pakistan Independence Day (14 August,
   79th) film rendered entirely in CSS/SVG. One continuous, slowly pushed-in
   shot: a night sky warms into dawn over a parallax mountain range and a
   silhouette of national landmarks (Minar-e-Pakistan, Faisal Mosque); a
   crescent moon and star glow overhead; an abstract green-and-white aurora
   ribbon drifts across the sky; lanterns of light rise from the city; the
   rising sun throws soft god-rays and a finale bloom before the loop breathes
   back to night. Green-and-white identity kept subtle and elegant — no literal
   flag. Autoplays, silent, loops, respects reduced-motion (.nomotion). */

import Link from "next/link";

const STARS = [
  { left: "12%", top: "14%", delay: "0s" },
  { left: "24%", top: "9%", delay: "-1.3s" },
  { left: "37%", top: "18%", delay: "-2.1s" },
  { left: "58%", top: "11%", delay: "-0.7s" },
  { left: "69%", top: "20%", delay: "-1.8s" },
  { left: "83%", top: "8%", delay: "-2.6s" },
  { left: "90%", top: "24%", delay: "-1.1s" },
];

// rising lanterns / embers of light — hue: g(green) w(white) o(warm gold)
const LANTERNS = [
  { left: "10%", size: 6, delay: "0s", dur: "9s", hue: "g" },
  { left: "20%", size: 4, delay: "-3.4s", dur: "11s", hue: "w" },
  { left: "31%", size: 7, delay: "-6.1s", dur: "10s", hue: "o" },
  { left: "43%", size: 5, delay: "-1.8s", dur: "12s", hue: "g" },
  { left: "52%", size: 4, delay: "-8.2s", dur: "10.5s", hue: "w" },
  { left: "63%", size: 7, delay: "-4.7s", dur: "9.5s", hue: "g" },
  { left: "72%", size: 5, delay: "-10.3s", dur: "11.5s", hue: "o" },
  { left: "81%", size: 4, delay: "-2.6s", dur: "10s", hue: "w" },
  { left: "90%", size: 6, delay: "-7.1s", dur: "12s", hue: "g" },
  { left: "6%", size: 4, delay: "-5.5s", dur: "11s", hue: "w" },
];

export default function HeroPromo() {
  return (
    <div className="promowrap">
      <div className="promo">
        {/* cinematic Independence Day scene */}
        <div className="idscene" aria-hidden="true">
          <div className="idcamera">
            {/* sky + atmosphere */}
            <div className="idsky" />
            <div className="idaurora" />
            <div className="idsunglow" />
            <div className="idrays" />

            {/* stars */}
            {STARS.map((s, i) => (
              <span key={i} className="idstar" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
            ))}

            {/* crescent moon + star (subtle national symbol) */}
            <div className="idmoon">
              <svg viewBox="0 0 60 60" width="60" height="60">
                <defs>
                  <radialGradient id="idmoong" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#dff7ee" />
                  </radialGradient>
                  <mask id="idcrescent">
                    <rect width="60" height="60" fill="#000" />
                    <circle cx="27" cy="30" r="15" fill="#fff" />
                    <circle cx="34" cy="27" r="13" fill="#000" />
                  </mask>
                </defs>
                <circle cx="27" cy="30" r="15" fill="url(#idmoong)" mask="url(#idcrescent)" />
                <path className="idmoonstar" d="M45 22 l1.7 4.3 4.6.3-3.6 2.9 1.2 4.5-3.9-2.5-3.9 2.5 1.2-4.5-3.6-2.9 4.6-.3z" fill="#ffffff" />
              </svg>
            </div>

            {/* far mountain range — parallax */}
            <svg className="idmountains idmountains-far" viewBox="0 0 400 120" preserveAspectRatio="none">
              <path d="M0,86 L40,54 L78,78 L120,40 L168,74 L210,44 L250,80 L300,50 L344,78 L400,58 L400,120 L0,120 Z" />
            </svg>
            <svg className="idmountains idmountains-near" viewBox="0 0 400 120" preserveAspectRatio="none">
              <path d="M0,98 L52,66 L96,92 L150,58 L200,90 L250,62 L306,94 L356,70 L400,92 L400,120 L0,120 Z" />
            </svg>

            {/* city skyline of national landmarks */}
            <svg className="idskyline" viewBox="0 0 400 170" preserveAspectRatio="xMidYMax meet">
              <defs>
                <linearGradient id="idsil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0c5a3d" />
                  <stop offset="1" stopColor="#04271a" />
                </linearGradient>
              </defs>
              <g fill="url(#idsil)">
                {/* left city fill */}
                <rect x="0" y="140" width="26" height="30" />
                <rect x="26" y="132" width="18" height="38" />

                {/* Faisal Mosque — tent shell + 4 pencil minarets */}
                <rect x="60" y="60" width="4" height="110" />
                <rect x="150" y="60" width="4" height="110" />
                <rect x="80" y="72" width="3.5" height="98" />
                <rect x="131" y="72" width="3.5" height="98" />
                <path d="M76,150 L107,84 L138,150 Z" />
                <path d="M88,150 L107,104 L126,150 Z" />
                <rect x="74" y="150" width="66" height="20" />

                {/* mid city fill */}
                <rect x="158" y="128" width="16" height="42" />

                {/* Minar-e-Pakistan — tapering tower on a stepped platform */}
                <rect x="182" y="158" width="44" height="12" />
                <rect x="188" y="150" width="32" height="10" />
                <path d="M197,150 L200,58 L208,58 L211,150 Z" />
                <circle cx="204" cy="52" r="4.5" />
                <path d="M201.5,50 a4.5,4.5 0 1,0 5,-2 a3.2,3.2 0 1,1 -5,2 Z" />
                <rect x="234" y="134" width="14" height="36" />

                {/* right — Mughal dome mosque + minarets (Badshahi feel) */}
                <rect x="286" y="86" width="4" height="84" />
                <rect x="342" y="86" width="4" height="84" />
                <rect x="292" y="120" width="48" height="50" />
                <path d="M292,120 Q316,86 340,120 Z" />
                <rect x="314" y="96" width="4" height="12" />
                <circle cx="316" cy="94" r="3.2" />

                {/* right city fill */}
                <rect x="352" y="138" width="20" height="32" />
                <rect x="372" y="146" width="28" height="24" />
              </g>
            </svg>

            {/* rising lanterns of light */}
            {LANTERNS.map((l, i) => (
              <span
                key={i}
                className={`idlantern idl-${l.hue}`}
                style={{ left: l.left, width: l.size, height: l.size, animationDelay: l.delay, animationDuration: l.dur }}
              />
            ))}

            {/* light sweep + finale bloom */}
            <span className="idsweep" />
            <span className="idbloom" />

            {/* cinematic finish */}
            <div className="idgrain" />
            <div className="idvignette" />
          </div>
        </div>

        {/* readability veil */}
        <div className="promoveil" aria-hidden="true" />

        {/* promo content */}
        <span className="probadge">🌙 Jashn-e-Azadi · 14 August</span>
        <div className="promeat">
          <p className="proeyebrow">Independence Day Offer</p>
          <h3 className="protitle">
            Freedom to learn — <span className="prooff">50% OFF</span>
          </h3>
          <p className="prosub">
            79 years of Pakistan, a new beginning for you. Start your skill journey this Azadi. Offer ends 14 August.
          </p>
          <Link className="probtn" href="/#contact">
            Claim Azadi Offer
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
