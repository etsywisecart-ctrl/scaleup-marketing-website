import Link from "next/link";

const SERVICES = [
  {
    ic: "cart",
    tone: "",
    title: "Ecommerce",
    desc: "Shopify, Daraz, TikTok Shop, eBay & Etsy stores — built, launched and scaled for you, end to end.",
    href: "/services/ecommerce",
    link: "Explore ecommerce",
  },
  {
    ic: "chip",
    tone: "v",
    title: "AI & Software",
    desc: "Custom software, SaaS, apps and AI automations that quietly do the heavy lifting for your business.",
    href: "/services/software-development",
    link: "Explore software",
  },
  {
    ic: "chart",
    tone: "s",
    title: "Digital Marketing",
    desc: "Meta, TikTok & marketplace ads, SEO and content — performance campaigns tied to real ROAS.",
    href: "/#contact",
    link: "Start a project",
  },
  {
    ic: "box",
    tone: "",
    title: "Store Management",
    desc: "Done-for-you operations — listings, order fulfilment, inventory and customer support, handled.",
    href: "/#contact",
    link: "Start a project",
  },
  {
    ic: "pen",
    tone: "v",
    title: "Design & Branding",
    desc: "UI/UX, product photography and brand identity that make your store and app impossible to ignore.",
    href: "/#contact",
    link: "Start a project",
  },
  {
    ic: "briefcase",
    tone: "s",
    title: "Consulting & Systems",
    desc: "Business strategy, CRM/ERP setup and store migrations to put the right systems behind your growth.",
    href: "/#contact",
    link: "Start a project",
  },
];

function Icon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "cart")
    return (
      <svg {...common}>
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
        <circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
      </svg>
    );
  if (name === "chip")
    return (
      <svg {...common}>
        <rect x="6" y="6" width="12" height="12" rx="2.5" /><path d="M9.5 9.5h5v5h-5z" />
        <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
      </svg>
    );
  if (name === "chart")
    return (
      <svg {...common}>
        <path d="M4 5v14h16" /><path d="M8 15l3-4 3 2 4-6" />
      </svg>
    );
  if (name === "box")
    return (
      <svg {...common}>
        <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" /><path d="M3 7.5v9L12 21l9-4.5v-9" /><path d="M12 12v9" />
      </svg>
    );
  if (name === "pen")
    return (
      <svg {...common}>
        <path d="M4 20l4.5-1L19 8.5a2.4 2.4 0 0 0-3.5-3.5L5 15.5 4 20Z" /><path d="M13.5 6.5l4 4" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="7" width="18" height="13" rx="2.2" /><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" /><path d="M3 12.5h18" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />What we do</span>
          <h2 className="h2">Done-for-you services that grow your business</h2>
          <p className="lead">
            From storefronts to software to systems — one team builds, runs and scales
            everything that moves Pakistani businesses forward.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginTop: 52 }}>
          {SERVICES.map((s, i) => (
            <Link key={s.title} href={s.href} className={`card rv d${(i % 3) + 1}`}>
              <span className={`card-ic ${s.tone}`}><Icon name={s.ic} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="card-link">
                {s.link}
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
