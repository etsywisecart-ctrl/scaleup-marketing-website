import Link from "next/link";
import PlatformMark from "./PlatformMark";

/* Academy hero — dark stage with an animated constellation of the five
   course platforms orbiting a glowing certification seal. Pure CSS motion. */

const TILES = [
  { slug: "shopify-mastery", cls: "aht1", glow: "rgba(149,191,71,.55)" },
  { slug: "tiktok-shop", cls: "aht2", glow: "rgba(105,201,208,.55)" },
  { slug: "ebay-etsy", cls: "aht3", glow: "rgba(245,175,29,.5)" },
  { slug: "daraz", cls: "aht4", glow: "rgba(240,110,45,.5)" },
  { slug: "ai-marketing", cls: "aht5", glow: "rgba(124,92,252,.5)" },
];

export default function AcademyHero() {
  return (
    <section className="ahero">
      <div className="ahgridbg" aria-hidden="true" />
      <span className="ahglow ahglow1" aria-hidden="true" />
      <span className="ahglow ahglow2" aria-hidden="true" />

      <div className="wrap ahgrid">
        <div className="rv">
          <nav className="ahcrumb" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span className="ahcsep">/</span>
            <span className="ahccur">ACADEMY</span>
          </nav>
          <p className="eyebrow" style={{ color: "#7FE7CF", marginTop: 26 }}>
            Academy — learn to build
          </p>
          <h1 className="aht">
            Five tracks.
            <br />
            <span className="ahshimmer">One certification standard.</span>
          </h1>
          <p className="ahlead">
            Live cohorts online and at our Lahore campus, taught by the same senior team running
            client stores and ad accounts — not career instructors reading slides.
          </p>
          <div className="ahchips">
            <span className="ahchip">11-MODULE FLAGSHIP TRACK</span>
            <span className="ahchip">FREE 3-DAY DEMO</span>
            <span className="ahchip">1:1 MENTORSHIP</span>
          </div>
          <div className="hcta">
            <Link className="btn btnG" href="/#contact">
              Reserve a demo seat
            </Link>
            <a className="btn ahghost" href="#tracks">
              See all tracks
            </a>
          </div>
          <div className="ahlive">
            <span className="ahlivedot" />
            Next cohorts enrolling now — Lahore campus &amp; live online
          </div>
        </div>

        <div className="ahstage rv" aria-hidden="true">
          <span className="ahring ahring1" />
          <span className="ahring ahring2" />
          {/* certification seal */}
          <div className="ahseal">
            <span className="ahsealpulse" />
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#08251d" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" />
              <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
            </svg>
            <span className="ahseallab">CERTIFIED</span>
          </div>
          {/* floating platform tiles */}
          {TILES.map((t, i) => (
            <span
              key={t.slug}
              className={`ahtile ${t.cls}`}
              style={{ boxShadow: `0 18px 34px -12px ${t.glow}, inset 0 1px 0 rgba(255,255,255,.6)`, animationDelay: `${-i * 1.1}s` }}
            >
              <PlatformMark slug={t.slug} size={30} />
            </span>
          ))}
          {/* sparkles */}
          <span className="ahspark ahs1" />
          <span className="ahspark ahs2" />
          <span className="ahspark ahs3" />
          <span className="ahspark ahs4" />
        </div>
      </div>
    </section>
  );
}
