import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Software Development",
  description: "Web platforms, SaaS products, AI systems and mobile apps built as one connected product.",
  alternates: { canonical: "/services/software-development" },
};

const STACK = ["NEXT.JS", "REACT", "LARAVEL", "NODE", "FLUTTER", "POSTGRES", "AWS", "STRIPE"];

function Code({ children }: { children: React.ReactNode }) {
  return <span className="dev-code">{children}</span>;
}

export default function SoftwareDevelopmentPage() {
  return (
    <main className="dev-page">
      <section className="dev-hero">
        <div className="dev-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="dev-terminal-top rv">
            <span><i className="dev-dot red" /><i className="dev-dot yellow" /><i className="dev-dot green" /></span>
            <span className="dev-path">scaleup / product-engineering</span>
            <span className="dev-live">● BUILD MODE</span>
          </div>

          <div className="dev-hero-grid">
            <div className="dev-hero-copy rv">
              <div className="dev-kicker"><Code>01</Code> PRODUCT ENGINEERING</div>
              <h1>Build it.<br /><span>Ship it.</span><br />Scale it.</h1>
              <p>Web apps, SaaS, AI systems and mobile products — designed and engineered as real software, not just pretty screens.</p>
              <div className="dev-actions">
                <Link className="btn btn-primary lg" href="/#contact">Start building <span>↗</span></Link>
                <a className="dev-text-btn" href="#stack">Explore the stack ↓</a>
              </div>
            </div>

            <div className="dev-console rv d2">
              <div className="console-head"><span>deployment.log</span><b>LIVE</b></div>
              <div className="console-body">
                <p><em>01</em><span>$</span> npm run build</p>
                <p className="ok"><em>02</em> ✓ compiling production modules</p>
                <p className="ok"><em>03</em> ✓ optimizing 128 routes</p>
                <p className="ok"><em>04</em> ✓ database connected</p>
                <p className="ok"><em>05</em> ✓ edge functions ready</p>
                <div className="console-progress"><i /></div>
                <div className="console-foot"><span>BUILD #042</span><b>READY TO DEPLOY</b></div>
              </div>
            </div>
          </div>

          <div className="dev-stack-marquee rv" id="stack">
            {STACK.map((x) => <span key={x}>{x}</span>)}
          </div>
        </div>
      </section>

      <section className="dev-section">
        <div className="wrap">
          <div className="dev-section-head rv">
            <Code>02 / WHAT WE BUILD</Code>
            <h2>From interface<br /><span>to infrastructure.</span></h2>
          </div>
          <div className="dev-build-grid">
            <div className="dev-build-card dev-build-main rv">
              <div className="dev-card-label">01 — WEB PLATFORM</div>
              <div className="browser-frame">
                <div className="browser-bar"><i/><i/><i/><span>app.scaleup.dev</span></div>
                <div className="browser-ui">
                  <aside><b>◈</b><i/><i/><i/><i/></aside>
                  <div className="browser-content">
                    <div className="ui-row"><strong>Overview</strong><span>Last 30 days ↗</span></div>
                    <div className="ui-kpis"><b>24.8K<small>USERS</small></b><b>$48.2K<small>REVENUE</small></b><b>+38%<small>GROWTH</small></b></div>
                    <div className="ui-chart"><i/><i/><i/><i/><i/><i/><i/><i/></div>
                  </div>
                </div>
              </div>
              <div className="dev-card-bottom"><strong>React + Next.js</strong><span>Fast · SEO · Scalable</span></div>
            </div>

            <div className="dev-build-card rv d1">
              <div className="dev-card-label">02 — SAAS ENGINE</div>
              <div className="saas-visual">
                <div className="saas-ring"><b>API</b></div>
                <div className="saas-node n1">AUTH</div><div className="saas-node n2">DB</div><div className="saas-node n3">AI</div><div className="saas-node n4">PAY</div>
                <div className="saas-line l1"/><div className="saas-line l2"/><div className="saas-line l3"/><div className="saas-line l4"/>
              </div>
              <div className="dev-card-bottom"><strong>Product systems</strong><span>Auth · Billing · APIs · AI</span></div>
            </div>

            <div className="dev-build-card rv d2">
              <div className="dev-card-label">03 — MOBILE</div>
              <div className="phone-stage">
                <div className="phone"><div className="phone-notch"/><div className="phone-screen"><span>09:41</span><b>Good morning.</b><i/><i/><i/></div></div>
                <div className="phone-badge">iOS</div><div className="phone-badge pb2">ANDROID</div>
              </div>
              <div className="dev-card-bottom"><strong>Flutter / React Native</strong><span>One codebase · two platforms</span></div>
            </div>

            <div className="dev-build-card dev-ai rv d3">
              <div className="dev-card-label">04 — AI SYSTEMS</div>
              <div className="ai-visual">
                <div className="ai-core">✦</div>
                <div className="ai-orbit o1"/><div className="ai-orbit o2"/>
                <span>AGENT</span><span>VISION</span><span>RAG</span><span>AUTOMATION</span>
              </div>
              <div className="dev-card-bottom"><strong>AI product layer</strong><span>Models → tools → workflows</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="dev-pipeline">
        <div className="wrap">
          <div className="dev-section-head center rv"><Code>03 / THE PIPELINE</Code><h2>Idea → <span>production.</span></h2></div>
          <div className="dev-flow rv">
            {["DISCOVER", "ARCHITECT", "DESIGN", "BUILD", "TEST", "SHIP"].map((x,i)=><div className="dev-flow-step" key={x}><b>0{i+1}</b><span>{x}</span>{i<5 && <i>→</i>}</div>)}
          </div>
          <div className="dev-metrics rv">
            <div><b>01</b><span>Senior product team</span></div><div><b>∞</b><span>Scalable architecture</span></div><div><b>24/7</b><span>Automations & systems</span></div><div><b>↗</b><span>Built for iteration</span></div>
          </div>
        </div>
      </section>

      <section className="dev-final">
        <div className="wrap">
          <div className="dev-final-panel rv">
            <div className="dev-final-glow"/>
            <Code>04 / READY WHEN YOU ARE</Code>
            <h2>Turn the idea<br /><span>into software.</span></h2>
            <div className="dev-final-actions"><Link className="btn btn-primary lg" href="/#contact">Open a project ↗</Link><Link className="dev-text-btn light" href="/services">View all services</Link></div>
            <div className="dev-final-terminal"><span>scaleup@build:~$</span> ship --production <b>✓</b></div>
          </div>
        </div>
      </section>
    </main>
  );
}
