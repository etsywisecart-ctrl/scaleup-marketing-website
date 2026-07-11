function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const industries = [
  "Retail & Ecommerce",
  "Healthcare",
  "Education",
  "Real Estate",
  "Manufacturing",
  "Construction",
  "Hospitality",
  "Startups",
];

export default function WhyUs() {
  return (
    <section className="sec softband" id="why">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Why teams stay</p>
          <h2 className="h2">
            Built like partners, <span className="grad">not vendors.</span>
          </h2>
        </div>
        <div className="whyg">
          <div className="whyc rv">
            <div className="bic">
              <Icon>
                <path d="M3 17l6-6 4 4 8-9M21 6v5h-5" />
              </Icon>
            </div>
            <h3 className="wt">Business-first strategy</h3>
            <p className="wd">Every build starts from your unit economics — revenue targets before pixels or frameworks.</p>
          </div>
          <div className="whyc rv">
            <div className="bic">
              <Icon>
                <circle cx="9" cy="8" r="3.5" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.5c2 .8 3 2.5 3 5.5" />
              </Icon>
            </div>
            <h3 className="wt">The people who teach it, build it</h3>
            <p className="wd">Senior engineers and sellers on every project — the same team that trains 500+ students.</p>
          </div>
          <div className="whyc rv">
            <div className="bic">
              <Icon>
                <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
              </Icon>
            </div>
            <h3 className="wt">Architecture that scales</h3>
            <p className="wd">Stacks chosen for year three, not week one — boring, proven, and cheap to grow on.</p>
          </div>
          <div className="whyc rv">
            <div className="bic">
              <Icon>
                <rect x="3" y="4" width="18" height="15" rx="2" />
                <path d="M3 9h18M8 14h5" />
              </Icon>
            </div>
            <h3 className="wt">Transparent delivery</h3>
            <p className="wd">Weekly demos, shared dashboards, fixed quotes. You always know what shipped and what is next.</p>
          </div>
        </div>
        <div className="rv" style={{ marginTop: 44 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            Industries served
          </p>
          <div className="inds" style={{ marginTop: 0 }}>
            {industries.map((i) => (
              <span key={i} className="ind">
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
