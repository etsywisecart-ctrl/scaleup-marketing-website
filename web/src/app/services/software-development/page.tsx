import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Software Development",
  description: "Web development, mobile apps, SaaS products and AI engineering by ScaleUp.",
  alternates: { canonical: "/services/software-development" },
};

const services = [
  { no: "01", title: "Web Development", tag: "WEB", desc: "High-performance websites, platforms and dashboards built for real users.", visual: "browser" },
  { no: "02", title: "App Development", tag: "MOBILE", desc: "Polished iOS and Android products with a native-quality experience.", visual: "phone" },
  { no: "03", title: "SaaS Products", tag: "PRODUCT", desc: "From product architecture to billing, APIs and launch-ready infrastructure.", visual: "saas" },
  { no: "04", title: "AI Engineering", tag: "AI", desc: "AI agents, automation, RAG and intelligent product features that actually ship.", visual: "ai" },
];

function Visual({ type }: { type: string }) {
  if (type === "browser") return (
    <div className="svc-visual browser-v">
      <div className="browser-window">
        <div className="window-bar"><i/><i/><i/><span>product.scaleup</span></div>
        <div className="web-layout"><aside><b>◎</b><i/><i/><i/><i/></aside><div className="web-main"><div className="web-top"><b>Overview</b><small>•••</small></div><div className="web-stats"><span><b>24.8K</b><small>USERS</small></span><span><b>$48.2K</b><small>REVENUE</small></span></div><div className="web-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div>
      </div>
      <span className="float-chip chip-a">NEXT.JS</span><span className="float-chip chip-b">FAST + SEO</span>
    </div>
  );
  if (type === "phone") return (
    <div className="svc-visual phone-v"><div className="phone-device"><div className="phone-island"/><div className="phone-ui"><small>9:41</small><strong>Good<br/>morning.</strong><div/><div/><div/></div></div><span className="float-chip phone-a">iOS</span><span className="float-chip phone-b">ANDROID</span></div>
  );
  if (type === "saas") return (
    <div className="svc-visual saas-v"><div className="saas-core"><b>PRODUCT</b><small>API</small></div><span className="saas-node s1">AUTH</span><span className="saas-node s2">BILLING</span><span className="saas-node s3">DATABASE</span><span className="saas-node s4">ANALYTICS</span><i className="orbit-line ol1"/><i className="orbit-line ol2"/></div>
  );
  return (
    <div className="svc-visual ai-v"><div className="ai-core">✦</div><div className="ai-orbit ao1"/><div className="ai-orbit ao2"/><span>AGENTS</span><span>RAG</span><span>VISION</span><span>AUTOMATION</span></div>
  );
}

export default function SoftwareDevelopmentPage() {
  return (
    <main className="software-page">
      <section className="software-hero">
        <div className="soft-grid"/>
        <div className="wrap soft-wrap">
          <div className="soft-topline"><span>PRODUCT ENGINEERING</span><b>WEB · APP · SAAS · AI</b></div>
          <div className="soft-hero-grid">
            <div>
              <div className="soft-eyebrow"><i/> SOFTWARE DEVELOPMENT</div>
              <h1>We turn complex ideas into <em>beautiful software.</em></h1>
              <p className="soft-lead">From the first screen to the final deployment, we design and engineer digital products that are fast, scalable and built to grow.</p>
              <div className="soft-hero-actions"><Link href="/#contact" className="btn btn-primary lg">Start a project ↗</Link><a href="#services" className="soft-link">Explore capabilities ↓</a></div>
            </div>
            <div className="soft-hero-art">
              <div className="art-orb"/><div className="art-window"><div className="art-bar"><i/><i/><i/><span>scaleup / product</span></div><div className="art-code"><b>const</b> product = <strong>build</strong>(&#123;<br/><span>experience: “premium”</span><br/><span>scale: “global”</span><br/><span>intelligence: “AI”</span><br/>&#125;);</div><div className="art-status"><i/> SYSTEMS ONLINE <b>100%</b></div></div>
              <div className="art-label l-a">01 / DESIGN</div><div className="art-label l-b">02 / ENGINEERING</div><div className="art-label l-c">03 / SCALE</div>
            </div>
          </div>
          <div className="soft-trust"><span>DESIGN-LED ENGINEERING</span><i/><span>PRODUCTION READY</span><i/><span>BUILT TO SCALE</span></div>
        </div>
      </section>

      <section className="software-services" id="services">
        <div className="wrap">
          <div className="soft-section-head">
            <div><span className="soft-index">01 — CAPABILITIES</span><h2>One team.<br/><em>Four ways to build.</em></h2></div>
            <p>We bring product thinking, interface design and engineering together — so your software feels as good as it works.</p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <article className="service-card" key={s.no}>
                <div className="service-meta"><span>{s.no}</span><b>{s.tag}</b></div>
                <Visual type={s.visual}/>
                <div className="service-copy"><h3>{s.title}</h3><p>{s.desc}</p><Link href="/#contact">Build this <span>↗</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="engineering-section">
        <div className="wrap">
          <div className="engineering-head"><span className="soft-index">02 — HOW WE THINK</span><h2>Not just code.<br/><em>A complete product system.</em></h2></div>
          <div className="eng-grid">
            <div className="eng-card"><span>01</span><b>Experience</b><p>Interfaces with clear hierarchy, motion and interaction — designed around how people actually use the product.</p></div>
            <div className="eng-card featured"><span>02</span><b>Architecture</b><p>Clean foundations for APIs, databases, auth, payments and integrations that can evolve without rebuilding everything.</p></div>
            <div className="eng-card"><span>03</span><b>Intelligence</b><p>AI and automation embedded where they create measurable product value, not added as decoration.</p></div>
            <div className="eng-card"><span>04</span><b>Growth</b><p>Analytics, performance and scalable infrastructure prepared for the next stage of the business.</p></div>
          </div>
        </div>
      </section>

      <section className="software-cta">
        <div className="wrap"><div className="soft-cta-card"><div className="cta-glow"/><span className="soft-index">03 — LET’S BUILD</span><h2>Have an idea?<br/><em>Make it real.</em></h2><p>Tell us what you are building. We’ll help turn the rough idea into a clear product and a practical path to launch.</p><div><Link href="/#contact" className="btn btn-primary lg">Start a conversation ↗</Link></div><span className="cta-corner">SCALEUP / ENGINEERING</span></div></div>
      </section>
    </main>
  );
}
