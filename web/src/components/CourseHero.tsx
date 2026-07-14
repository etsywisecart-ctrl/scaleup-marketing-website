import Link from "next/link";
import PlatformMark from "./PlatformMark";

/* Course hero — the platform's own mark glowing at the center of the
   dark stage, ringed by the course meta as orbiting glass chips, with a
   CERTIFIED seal. Accent color is drawn from the platform brand. */

const ACCENT: Record<string, string> = {
  "shopify-mastery": "#95BF47",
  "tiktok-shop": "#FE2C55",
  "ebay-etsy": "#F1641E",
  daraz: "#F85606",
  "ai-marketing": "#7C5CFC",
};

export default function CourseHero({
  slug,
  tag,
  badge,
  title,
  sub,
  dur,
  level,
  modules,
}: {
  slug: string;
  tag: string;
  badge?: string;
  title: string;
  sub: string;
  dur: string;
  level: string;
  modules: number;
}) {
  const accent = ACCENT[slug] || "#2FBF9E";

  return (
    <section className="ahero" style={{ "--acc": accent } as React.CSSProperties}>
      <div className="ahgridbg" aria-hidden="true" />
      <span className="ahglow ahglow1" aria-hidden="true" style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }} />
      <span className="ahglow ahglow2" aria-hidden="true" />

      <div className="wrap ahgrid">
        <div className="rv">
          <nav className="ahcrumb" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span className="ahcsep">/</span>
            <Link href="/academy">ACADEMY</Link>
            <span className="ahcsep">/</span>
            <span className="ahccur">{title.toUpperCase()}</span>
          </nav>
          <p className="eyebrow" style={{ color: "#7FE7CF", marginTop: 26 }}>
            {tag} · {badge || "TRAINING TRACK"}
          </p>
          <h1 className="aht">
            <span className="ahshimmer">{title}</span>
          </h1>
          <p className="ahlead">{sub}</p>
          <div className="ahchips">
            <span className="ahchip">{dur}</span>
            <span className="ahchip">{level}</span>
            <span className="ahchip">{modules} MODULES</span>
            <span className="ahchip">CERTIFICATE</span>
          </div>
          <div className="hcta">
            <Link className="btn btnG" href="/#contact">
              Get the full syllabus
            </Link>
            <Link className="btn ahghost" href="/#contact">
              Reserve a free demo seat
            </Link>
          </div>
          <div className="ahlive">
            <span className="ahlivedot" />
            Starts with a free 3-day demo — live online &amp; Lahore campus
          </div>
        </div>

        <div className="ahstage chstage rv" aria-hidden="true">
          <span className="ahring ahring1" />
          <span className="ahring ahring2" />

          {/* the platform mark, glowing at center */}
          <div className="chtile" style={{ boxShadow: `0 30px 60px -18px ${accent}88, inset 0 2px 0 rgba(255,255,255,.7)` }}>
            <PlatformMark slug={slug} size={68} />
          </div>

          {/* orbiting meta chips */}
          <span className="chchip chc1">{dur}</span>
          <span className="chchip chc2">{level}</span>
          <span className="chchip chc3">{modules} modules</span>
          <span className="chchip chc4" style={{ color: "#08251d", background: "linear-gradient(135deg,#7fe7cf,#2fbf9e)", borderColor: "transparent" }}>
            ✓ Certificate
          </span>

          <span className="ahspark ahs1" />
          <span className="ahspark ahs2" />
          <span className="ahspark ahs3" />
          <span className="ahspark ahs4" />
        </div>
      </div>
    </section>
  );
}
