import Link from "next/link";

const METRICS = [
  { label: "Revenue", value: "A$19.8K", note: "+322% YoY" },
  { label: "Orders", value: "1,138", note: "last 90 days" },
  { label: "Automation", value: "24/7", note: "running" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap hero-inner">
        <div className="hero-copy rv">
          <span className="eyebrow"><i className="dot" />Digital agency × training academy</span>
          <div className="hero-kicker"><span>01</span> STRATEGY · BUILD · GROW</div>
          <h1 className="hero-title">We build the systems<br/>that make <span className="accent">business move.</span></h1>
          <p className="hero-sub">Ecommerce, AI, software and performance marketing — engineered as one connected growth system, not a collection of vendors.</p>
          <div className="hero-btns">
            <Link className="btn btn-primary lg" href="/#contact">Start a project<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
            <Link className="btn btn-neu lg" href="/work">See our work</Link>
          </div>
          <div className="hero-proof-row"><span><b>500+</b> students trained</span><span><b>100+</b> projects delivered</span><span><b>1 team</b> from build to scale</span></div>
        </div>
        <div className="hero-visual rv d2">
          <div className="hero-dashboard">
            <div className="hdash-top"><div><span className="live-pulse" />Growth command center</div><span className="hdash-period">LIVE · 90 DAYS</span></div>
            <div className="hdash-main"><div className="hdash-value"><small>Gross sales</small><strong>A$19,842</strong><span>↗ 322% YoY</span></div><div className="hdash-spark">{[28,34,31,44,40,55,61,58,74,70,84,96].map((h,i)=><i key={i} style={{height:h+"%"}} />)}</div></div>
            <div className="hdash-metrics">{METRICS.map(m=><div key={m.label}><small>{m.label}</small><b>{m.value}</b><span>{m.note}</span></div>)}</div>
            <div className="hdash-flow"><div><span className="flow-dot">01</span><p><b>Store</b><small>Conversion-ready experience</small></p></div><div className="flow-line"/><div><span className="flow-dot purple">02</span><p><b>AI</b><small>Automated operations</small></p></div><div className="flow-line"/><div><span className="flow-dot orange">03</span><p><b>Growth</b><small>Ads + analytics loop</small></p></div></div>
          </div>
          <div className="hero-toast" aria-hidden="true"><span className="ht-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 8h11l-1 11.5H7.5L6.5 8Z" /><path d="M9 8V6.6a3 3 0 0 1 6 0V8" /></svg></span><div><b>New order · PKR 7,499</b><small>Lahore · just now</small></div></div>
          <span className="chip float-chip fc1"><i className="dot" />AI automation live</span>
          <span className="chip float-chip fc2"><i className="dot v" />Weekly working demos</span>
        </div>
      </div>
    </section>
  );
}