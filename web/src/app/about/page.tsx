import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { teamPods, milestones, team } from "@/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ScaleUp Marketing is an engineering-grade digital agency and a hands-on training institute under one roof.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Who we are"
        title={<>Most agencies guard their playbooks.<br /><span className="accent">We teach ours.</span></>}
        lead="An engineering-grade digital agency and a hands-on training institute under one roof — in Lahore, building for the world."
        ghost={{ label: "See our work", href: "/#work" }}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap about-split">
          <div className="rv">
            <span className="eyebrow"><i className="dot" />Why we exist</span>
            <p className="lead" style={{ marginTop: 22 }}>
              ScaleUp started as a small team building Shopify stores for local businesses in Lahore.
              Clients and their staff kept asking the same thing: &ldquo;can you teach us how you did
              that?&rdquo; So we built a second engine — a training institute running the exact
              curriculum our own team uses on live client work.
            </p>
            <p className="lead" style={{ marginTop: 16 }}>
              Today those two engines feed each other. Client projects become classroom case studies.
              Our strongest graduates get referred into agency work. Nobody teaches recycled theory
              here — every module traces back to something we shipped this year.
            </p>
          </div>
          <div className="grid" style={{ gap: 20 }}>
            <div className="point">
              <span className="point-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" /></svg>
              </span>
              <div><h3>Business-first, always</h3><p>Every engagement and every lesson starts from unit economics — not tools or trends.</p></div>
            </div>
            <div className="point">
              <span className="point-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>
              </span>
              <div><h3>One standard, two paths</h3><p>Hire us or enroll — you get the same senior team and the same fixed-quote transparency.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />How we&rsquo;re organized</span>
            <h2 className="h2">Five pods, one accountable team</h2>
          </div>
          <div className="grid grid-3" style={{ marginTop: 48 }}>
            {teamPods.map((p, i) => (
              <div key={p.name} className={`card rv d${(i % 3) + 1}`}>
                <h3>{p.name}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />The people</span>
            <h2 className="h2">Faces behind the work</h2>
            <p className="lead">The same team that ships client projects and teaches the tracks.</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: 48 }}>
            {team.map((m, i) => (
              <div key={m.name} className={`card team-card rv d${(i % 3) + 1}`}>
                <span className="team-av" style={{ background: m.accent }}>{m.ini}</span>
                <h3>{m.name}</h3>
                <p className="team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Where we&rsquo;ve been</span>
            <h2 className="h2">Five years, one ecosystem</h2>
          </div>
          <div className="timeline rv" style={{ marginTop: 48 }}>
            {milestones.map((m) => (
              <div key={m.t} className="tl-item">
                <span className="tl-year">{m.y}</span>
                <div className="tl-body">
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="stats rv">
            <div className="stat"><b className="num" data-to="500" data-suf="+">0+</b><span>Students trained</span></div>
            <div className="stat"><b className="num" data-to="100" data-suf="+">0+</b><span>Projects delivered</span></div>
            <div className="stat"><b className="num" data-to="5" data-suf="">0</b><span>Years shipping &amp; teaching</span></div>
            <div className="stat"><b>Lahore</b><span>Home base, global clients</span></div>
          </div>
          <div className="rv" style={{ textAlign: "center", marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-primary lg" href="/#contact">Book a free scoping call</Link>
            <Link className="btn btn-neu lg" href="/#work">See the results</Link>
          </div>
        </div>
      </section>
    </>
  );
}
