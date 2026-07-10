import Link from "next/link";

export default function About() {
  return (
    <section className="sec softband" id="about">
      <div className="wrap split">
        <div className="rv">
          <p className="eyebrow">One ecosystem, two engines</p>
          <h2 className="bigsay">
            Most agencies build. Most academies teach. We do both —{" "}
            <span className="grad">and each makes the other better.</span>
          </h2>
          <p className="lead" style={{ marginTop: 26, maxWidth: 520 }}>
            ScaleUp Marketing is an engineering-grade digital agency and a hands-on training
            institute under one roof. The stores, software, and automations we ship for clients
            become the playbooks we teach — and our best graduates feed the talent pipeline that
            builds the next round of client work. No recycled theory. Just what is working in live
            businesses, right now.
          </p>
        </div>
        <div className="paths rv">
          <a className="pathc" href="#services">
            <div className="pico">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" />
              </svg>
            </div>
            <div>
              <h3 className="pt">The Agency — we build it for you</h3>
              <p className="pd">
                Stores, apps, SaaS, automations, and growth systems delivered end-to-end by a
                senior team.
              </p>
            </div>
            <span className="parr">→</span>
          </a>
          <Link className="pathc" href="/academy">
            <div className="pico navy">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" />
                <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5M22 8.5V14" />
              </svg>
            </div>
            <div>
              <h3 className="pt">The Academy — we teach you to build</h3>
              <p className="pd">
                Live online and on-campus tracks in Shopify, TikTok Shop, eBay, Etsy, Daraz, and AI
                marketing.
              </p>
            </div>
            <span className="parr">→</span>
          </Link>
          <div className="hnote" style={{ marginTop: 6 }}>
            <span className="dot" />
            Same team. Same playbooks. Pick your path.
          </div>
        </div>
      </div>
    </section>
  );
}
