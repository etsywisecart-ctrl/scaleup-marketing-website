import Link from "next/link";

/* Logos of the platforms our graduates get trained and hired to run.
   To show real client-company logos instead, drop image files in
   /public/uploads and swap these labels for <img> tags. */
const TRAINED_ON = ["Shopify", "Meta Ads", "TikTok Shop", "Etsy", "Daraz", "eBay"];

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

        {/* Trained-on / platform logo strip */}
        <div className="ac-logos rv" aria-label="Platforms our graduates build and sell on">
          <span className="ac-logos-label">Graduates build &amp; sell on</span>
          <div className="ac-logos-row">
            {TRAINED_ON.map((b) => (
              <span className="ac-logo" key={b}>{b}</span>
            ))}
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
