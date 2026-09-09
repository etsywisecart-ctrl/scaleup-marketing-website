import Link from "next/link";

/* The marketplaces our graduates learn to build and sell on.
   Each has a brand-coloured icon (drawn inline, no external assets). */
const PLATFORMS = [
  { name: "Shopify", ic: "shopify", color: "#5E8E3E" },
  { name: "TikTok Shop", ic: "tiktok", color: "#EE1D52" },
  { name: "Daraz", ic: "daraz", color: "#F85606" },
  { name: "Etsy", ic: "etsy", color: "#F1641E" },
  { name: "eBay", ic: "ebay", color: "#E53238" },
  { name: "Amazon", ic: "amazon", color: "#FF9900" },
];

/* A few headline points that make the Academy worth choosing. */
const KEY_POINTS = [
  { ic: "live", t: "Live cohorts", d: "Online & Lahore campus" },
  { ic: "pro", t: "Real practitioners", d: "Taught by people who ship" },
  { ic: "demo", t: "Free 3-day demo", d: "Try before you pay" },
  { ic: "infinity", t: "Lifetime access", d: "Community & recordings" },
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

/* Brand-coloured marketplace glyphs (simplified, drawn inline). */
function PlatformIcon({ name }: { name: string }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shopify": // shopping bag
      return <svg {...s}><path d="M6.5 8h11l-1 11.5H7.5L6.5 8Z" /><path d="M9 8V6.6a3 3 0 0 1 6 0V8" /></svg>;
    case "tiktok": // music note
      return <svg {...s}><path d="M13 4v10.5a3 3 0 1 1-2.3-2.92" /><path d="M13 4.5c.4 2.1 1.9 3.5 4 3.7" /></svg>;
    case "daraz": // cart
      return <svg {...s}><path d="M4 5h2l1.5 9.4a1.3 1.3 0 0 0 1.3 1.1h7.4a1.3 1.3 0 0 0 1.3-1L19.6 8H6.3" /><circle cx="9.5" cy="19" r="1.15" /><circle cx="16.5" cy="19" r="1.15" /></svg>;
    case "etsy": // storefront
      return <svg {...s}><path d="M4.5 9 6 5h12l1.5 4" /><path d="M5.5 9.2v9.3h13V9.2" /><path d="M4.5 9a1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0" /></svg>;
    case "ebay": // price tag
      return <svg {...s}><path d="M4.3 12.4 11.4 5.3a1 1 0 0 1 .7-.3H18a1 1 0 0 1 1 1v5.9a1 1 0 0 1-.3.7l-7.1 7.1a1 1 0 0 1-1.4 0l-5.9-5.9a1 1 0 0 1 0-1.4Z" /><circle cx="15.2" cy="8.8" r="1.25" /></svg>;
    default: // amazon smile
      return <svg {...s}><path d="M5 14.5c4.2 3 9.8 3 14 0" /><path d="M16.8 13c1 .6 1.7 1.6 1.9 3" /></svg>;
  }
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
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />The Academy</span>
          <h2 className="h2">Learn the skills we get paid to deliver</h2>
          <p className="lead">
            Live online cohorts taught by the same people who ship client stores and campaigns.
            Simple, upfront pricing — start with a free 3-day demo class.
          </p>
        </div>

        {/* Colourful platform icon strip */}
        <div className="ac-logos" aria-label="Marketplaces our graduates build and sell on">
          <span className="ac-logos-label rv">Master every marketplace</span>
          <div className="ac-plat-row">
            {PLATFORMS.map((p, i) => (
              <div className="ac-plat rv" key={p.name} style={{ transitionDelay: `${i * 55}ms` }}>
                <span className="ac-plat-ic" style={{ color: p.color, ["--brand" as string]: p.color }}>
                  <PlatformIcon name={p.ic} />
                </span>
                <span className="ac-plat-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key points */}
        <div className="ac-points">
          {KEY_POINTS.map((k, i) => (
            <div className="ac-point rv" key={k.t} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="ac-point-ic"><PointIcon name={k.ic} /></span>
              <div className="ac-point-txt">
                <strong>{k.t}</strong>
                <span>{k.d}</span>
              </div>
            </div>
          ))}
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
