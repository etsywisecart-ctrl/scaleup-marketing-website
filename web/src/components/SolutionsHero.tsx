import Link from "next/link";

/* Dark showpiece hero for the Solutions pages — same design language as
   the Academy hero (stage, rings, floating tiles), with a page-specific
   animated centerpiece: a live checkout (commerce) or a shipping code
   window (software). Pure CSS motion, respects .nomotion. */

function Tile({ cls, glow, delay, children }: { cls: string; glow: string; delay: number; children: React.ReactNode }) {
  return (
    <span
      className={`ahtile ${cls}`}
      style={{ boxShadow: `0 18px 34px -12px ${glow}, inset 0 1px 0 rgba(255,255,255,.6)`, animationDelay: `${delay}s` }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

function CommerceStage() {
  return (
    <>
      <span className="ahring ahring1" />
      <span className="ahring ahring2" />
      <div className="svcard">
        <div className="svtop">
          <span className="tl" style={{ background: "#FF5F57" }} />
          <span className="tl" style={{ background: "#FEBC2E" }} />
          <span className="tl" style={{ background: "#28C840" }} />
          <span className="svurl">🔒 secure checkout</span>
        </div>
        <div className="svrow">
          <span className="svthumb" />
          <div>
            <p className="svname">Vitamin C Serum ×2</p>
            <p className="svprice">PKR 7,960 · COD or card</p>
          </div>
        </div>
        <div className="svpay">Pay now</div>
        <div className="svtoast">✓ Payment received · Order #1139</div>
      </div>
      <span className="svping svping1">+ PKR 7,960</span>
      <span className="svping svping2">+ PKR 11,890</span>
      <Tile cls="aht1" glow="rgba(47,191,158,.55)" delay={0}>
        <g stroke="#2FBF9E"><path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></g>
      </Tile>
      <Tile cls="aht2" glow="rgba(63,131,248,.5)" delay={-1.1}>
        <g stroke="#3F83F8"><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h4" /></g>
      </Tile>
      <Tile cls="aht3" glow="rgba(240,110,45,.5)" delay={-2.2}>
        <g stroke="#F06E2D"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></g>
      </Tile>
      <Tile cls="aht4" glow="rgba(124,92,252,.5)" delay={-3.3}>
        <g stroke="#7C5CFC"><path d="M4 19V10M10 19V5M16 19v-8M21 19H3" /></g>
      </Tile>
      <Tile cls="aht5" glow="rgba(230,73,128,.5)" delay={-4.4}>
        <g stroke="#E64980"><path d="m3 11 15-6v14L3 13v-2Z" /><path d="M7 13v5a1.5 1.5 0 0 0 3 0v-4" /></g>
      </Tile>
      <span className="ahspark ahs1" />
      <span className="ahspark ahs2" />
      <span className="ahspark ahs3" />
      <span className="ahspark ahs4" />
    </>
  );
}

function SoftwareStage() {
  return (
    <>
      <span className="ahring ahring1" />
      <span className="ahring ahring2" />
      <div className="svwin">
        <div className="svtop">
          <span className="tl" style={{ background: "#FF5F57" }} />
          <span className="tl" style={{ background: "#FEBC2E" }} />
          <span className="tl" style={{ background: "#28C840" }} />
          <span className="svurl" style={{ color: "#7d9aa6" }}>app/page.tsx</span>
        </div>
        <span className="svl svl1" />
        <span className="svl svl2" />
        <span className="svl svl3" />
        <span className="svl svl4" />
        <span className="svl svl5" />
        <div className="svstat">
          <span className="svstatdot" />
          Build passing · deploy ready
        </div>
      </div>
      <span className="svping svping1">✓ v2.4 shipped</span>
      <span className="svping svping2">99.9% uptime</span>
      <Tile cls="aht1" glow="rgba(97,218,251,.5)" delay={0}>
        <g stroke="#2AA9D2"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></g>
      </Tile>
      <Tile cls="aht2" glow="rgba(245,166,35,.5)" delay={-1.1}>
        <g stroke="#F5A623"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></g>
      </Tile>
      <Tile cls="aht3" glow="rgba(124,92,252,.5)" delay={-2.2}>
        <g stroke="#7C5CFC"><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 17.5h2" /></g>
      </Tile>
      <Tile cls="aht4" glow="rgba(47,191,158,.55)" delay={-3.3}>
        <g stroke="#2FBF9E"><path d="M7 18a4.5 4.5 0 1 1 .6-8.97 5.5 5.5 0 0 1 10.66 1.8A3.6 3.6 0 0 1 17.5 18H7Z" /></g>
      </Tile>
      <Tile cls="aht5" glow="rgba(230,73,128,.5)" delay={-4.4}>
        <g stroke="#E64980"><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="12" r="2.5" /><path d="M6 8.5v7M8.4 6.6c4 .8 7 2.6 7.2 5.4" /></g>
      </Tile>
      <span className="ahspark ahs1" />
      <span className="ahspark ahs2" />
      <span className="ahspark ahs3" />
      <span className="ahspark ahs4" />
    </>
  );
}

export default function SolutionsHero({
  crumb,
  eyebrow,
  title,
  lead,
  chips,
  ghostLabel,
  ghostHref,
  variant,
}: {
  crumb: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  chips: string[];
  ghostLabel: string;
  ghostHref: string;
  variant: "commerce" | "software";
}) {
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
            <Link href="/#services">SOLUTIONS</Link>
            <span className="ahcsep">/</span>
            <span className="ahccur">{crumb.toUpperCase()}</span>
          </nav>
          <p className="eyebrow" style={{ color: "#7FE7CF", marginTop: 26 }}>
            {eyebrow}
          </p>
          <h1 className="aht">{title}</h1>
          <p className="ahlead">{lead}</p>
          <div className="ahchips">
            {chips.map((c) => (
              <span key={c} className="ahchip">
                {c}
              </span>
            ))}
          </div>
          <div className="hcta">
            <Link className="btn btnG" href="/#contact">
              Book a free scoping call
            </Link>
            <a className="btn ahghost" href={ghostHref}>
              {ghostLabel}
            </a>
          </div>
          <div className="ahlive">
            <span className="ahlivedot" />
            Fixed quote in writing — no hourly surprises
          </div>
        </div>

        <div className="ahstage rv" aria-hidden="true">
          {variant === "commerce" ? <CommerceStage /> : <SoftwareStage />}
        </div>
      </div>
    </section>
  );
}
