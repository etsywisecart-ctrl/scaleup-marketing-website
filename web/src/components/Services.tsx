import Link from "next/link";

const SERVICES = [
  {
    ic: "cart",
    tone: "",
    title: "Ecommerce",
    desc: "Launch and scale stores on Shopify, Daraz, TikTok Shop, eBay & Etsy — done for you, end to end.",
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
    ic: "cap",
    tone: "s",
    title: "The Academy",
    desc: "Hands-on training that turns beginners into earning ecommerce and marketing professionals.",
    href: "/academy",
    link: "Explore academy",
  },
];

function Icon({ name }: { name: string }) {
  if (name === "cart")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
        <circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
      </svg>
    );
  if (name === "chip")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="2.5" /><path d="M9.5 9.5h5v5h-5z" />
        <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" /><path d="M6 11v5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5" /><path d="M21.5 9v5.5" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />What we do</span>
          <h2 className="h2">One partner for every layer of growth</h2>
          <p className="lead">
            From storefronts to software to skills — we build the systems and train the people
            that move Pakistani businesses forward.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginTop: 52 }}>
          {SERVICES.map((s, i) => (
            <Link key={s.title} href={s.href} className={`card rv d${i + 1}`}>
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
