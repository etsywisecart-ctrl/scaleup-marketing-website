import Link from "next/link";
import PlatformStrip from "./PlatformStrip";
import AcademyLive from "./AcademyLive";

/* A few headline points that make the Academy worth choosing. */
const KEY_POINTS = [
  { ic: "live", t: "Live cohorts", d: "Online & Lahore campus", c1: "#f43f5e", c2: "#be123c" },
  { ic: "pro", t: "Real practitioners", d: "Taught by people who ship", c1: "#8b5cf6", c2: "#6d28d9" },
  { ic: "demo", t: "Free 3-day demo", d: "Try before you pay", c1: "#10b981", c2: "#047857" },
  { ic: "infinity", t: "Lifetime access", d: "Community & recordings", c1: "#f59e0b", c2: "#ea580c" },
];

const PLANS = [
  {
    tag: "STARTER",
    name: "Ecommerce Foundations",
    sub: "The essentials to start selling online with confidence.",
    price: "30,000",
    variant: "plain",
    badge: "",
    feats: [
      "6-week live online cohort",
      "Ecommerce & marketplace basics",
      "Product research & pricing",
      "Your first store, step by step",
      "Starter templates + recordings",
      "Group mentor support",
    ],
    href: "/academy",
  },
  {
    tag: "FLAGSHIP",
    name: "Shopify Master",
    sub: "Zero to a live, selling store — our complete flagship track.",
    price: "50,000",
    variant: "accent",
    badge: "Most popular",
    feats: [
      "12-week live online cohort",
      "Store build, theme & product hunting",
      "China sourcing & fulfilment",
      "Meta & TikTok ads + order operations",
      "Lifetime community + session recordings",
      "1-on-1 mentor support",
    ],
    href: "/academy/shopify-mastery",
  },
  {
    tag: "PREMIUM",
    name: "Premium Gold",
    sub: "Every marketplace, mastered — with lifetime support for life.",
    price: "80,000",
    variant: "gold",
    badge: "All marketplaces",
    feats: [
      "Every marketplace: Shopify, Etsy, eBay, Daraz, Amazon, TikTok",
      "Lifetime 1-on-1 mentorship & support",
      "AI & digital marketing mastery",
      "Priority store audits & reviews",
      "Sourcing, ads & full store operations",
      "Job & agency placement support",
    ],
    href: "/academy",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}

function PointIcon({ name }: { name: string }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "live": // broadcast
      return <svg {...s}><circle cx="12" cy="12" r="2.2" /><path d="M7 7a7 7 0 0 0 0 10M17 7a7 7 0 0 1 0 10M4.2 4.2a11 11 0 0 0 0 15.6M19.8 4.2a11 11 0 0 1 0 15.6" /></svg>;
    case "pro": // person / badge
      return <svg {...s}><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>;
    case "demo": // play
      return <svg {...s}><circle cx="12" cy="12" r="8.5" /><path d="M10.5 9l4.5 3-4.5 3V9Z" /></svg>;
    default: // infinity
      return <svg {...s}><path d="M6.5 9a3 3 0 1 0 0 6c2.2 0 3.3-2.4 5.5-2.4M17.5 15a3 3 0 1 0 0-6c-2.2 0-3.3 2.4-5.5 2.4" /></svg>;
  }
}

export default function Academy() {
  return (
    <section className="sec" id="academy" style={{ background: "var(--sunk)" }}>
      <div className="wrap">
        <div className="ac-intro">
          <div className="ac-intro-copy rv">
            <span className="eyebrow"><i className="dot" />The Academy</span>
            <h2 className="h2">Learn the skills<br /><span className="accent">we get paid to deliver.</span></h2>
            <p className="lead">
              Sit in a live class taught by the same people who ship client stores and campaigns —
              then build your own, step by step. Start with a free 3-day demo.
            </p>

            {/* Brand tiles — same gradient icon language (Framer Motion) */}
            <PlatformStrip />

            <div className="ac-points">
              {KEY_POINTS.map((k, i) => (
                <div className="ac-point rv" key={k.t} style={{ transitionDelay: `${i * 70}ms`, ["--c1" as string]: k.c1, ["--c2" as string]: k.c2 }}>
                  <span className="ac-point-ic"><PointIcon name={k.ic} /></span>
                  <div className="ac-point-txt">
                    <strong>{k.t}</strong>
                    <span>{k.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ac-intro-visual rv d2">
            <AcademyLive />
          </div>
        </div>

        {/* Three clear plans */}
        <div className="plans plans-3">
          {PLANS.map((p, i) => (
            <div key={p.name} className={`plan rv d${i + 1}${p.variant === "accent" ? " featured" : ""}${p.variant === "gold" ? " gold" : ""}`}>
              <div className="plan-head">
                <span className="plan-tag mono">{p.tag}</span>
                {p.badge && <span className="plan-badge">{p.badge}</span>}
              </div>
              <h3 className="plan-name">{p.name}</h3>
              <p className="plan-sub">{p.sub}</p>
              <div className="plan-price">
                <span className="pp-cur">PKR</span>
                <span className="pp-amt">{p.price}</span>
                <span className="pp-per">one-time · online</span>
              </div>
              <ul className="plan-feats">
                {p.feats.map((f) => (
                  <li key={f}><span className="pf-ic"><Check /></span>{f}</li>
                ))}
              </ul>
              <Link className={`btn plan-cta ${p.variant === "accent" ? "btn-primary" : p.variant === "gold" ? "btn-gold" : "btn-neu"}`} href="/#contact">
                Enroll now
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link className="plan-link" href={p.href}>View curriculum</Link>
            </div>
          ))}
        </div>

        <div className="rv ac-foot">
          <span className="ac-foot-note">Free 3-day demo · Online &amp; Lahore campus · EasyPaisa / bank transfer</span>
          <Link className="card-link" href="/academy">
            See all courses
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
