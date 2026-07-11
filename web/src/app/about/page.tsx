import type { Metadata } from "next";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import { teamPods, milestones } from "@/data/content";

export const metadata: Metadata = {
  title: "About — ScaleUp Marketing",
  description:
    "ScaleUp Marketing is an engineering-grade digital agency and a hands-on training institute under one roof.",
};

export default function AboutPage() {
  return (
    <>
      <SubHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About ScaleUp Marketing"
        title={
          <>
            One team. Two engines. <span className="grad">One mission.</span>
          </>
        }
        lead="We build digital businesses and we teach people how to build them — using the same playbooks, the same senior team, and the same standard for what 'done' looks like."
        ctas={
          <>
            <Link className="btn btnG" href="/#contact">
              Book a Strategy Call
            </Link>
            <Link className="btn btnO" href="/academy">
              Explore the Academy
            </Link>
          </>
        }
      />

      <section className="sec softband" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="rv">
            <p className="eyebrow">Why we exist</p>
            <h2 className="bigsay">
              Most agencies guard their playbooks. <span className="grad">We teach ours.</span>
            </h2>
            <p className="lead" style={{ marginTop: 26, maxWidth: 520 }}>
              ScaleUp Marketing started as a small team building Shopify stores for local
              businesses in Lahore. We kept getting asked the same question by clients and their
              staff: &ldquo;can you teach us how you did that?&rdquo; So we built a second engine —
              a training institute running the exact curriculum our own team uses on live client
              work.
            </p>
            <p className="lead" style={{ marginTop: 16, maxWidth: 520 }}>
              Today those two engines feed each other. Client projects become case studies in the
              classroom. Our strongest graduates get referred into agency work. Nobody teaches
              recycled theory here — every module traces back to something we shipped for a real
              business this year.
            </p>
          </div>
          <div className="paths rv">
            <div className="pathc" style={{ cursor: "default" }}>
              <div className="pico">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" />
                </svg>
              </div>
              <div>
                <h3 className="pt">Business-first, always</h3>
                <p className="pd">Every engagement and every lesson starts from unit economics, not tools or trends.</p>
              </div>
            </div>
            <div className="pathc" style={{ cursor: "default" }}>
              <div className="pico navy">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
                </svg>
              </div>
              <div>
                <h3 className="pt">One standard, two paths</h3>
                <p className="pd">Whether you hire us or enroll, you get the same senior team and the same fixed-quote transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">How we&rsquo;re organized</p>
            <h2 className="h2">
              Five pods, <span className="grad">one accountable team.</span>
            </h2>
          </div>
          <div className="podg">
            {teamPods.map((p) => (
              <div key={p.name} className="pod rv">
                <h3 className="podn">{p.name}</h3>
                <p className="podd">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Where we&rsquo;ve been</p>
            <h2 className="h2">
              Eight years, <span className="grad">one ecosystem.</span>
            </h2>
          </div>
          <div className="mstones rv">
            {milestones.map((m) => (
              <div key={m.t} className="mstone">
                <span className="msy">{m.y}</span>
                <div>
                  <h3 className="mst">{m.t}</h3>
                  <p className="msd">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 660 }}>
            <p className="eyebrow">The numbers</p>
            <h2 className="h2">
              Proof, <span className="grad">not adjectives.</span>
            </h2>
          </div>
        </div>
        <div className="stats rv" style={{ marginTop: 40, border: "1px solid #E7F0EE" }}>
          <div className="wrap strip">
            <div className="stat first">
              <div className="num" data-to="2400" data-suf="+">2,400+</div>
              <div className="slab">Students trained</div>
            </div>
            <div className="stat nb">
              <div className="num" data-to="340" data-suf="+">340+</div>
              <div className="slab">Stores &amp; products launched</div>
            </div>
            <div className="stat">
              <div className="num" data-pre="$" data-to="12" data-suf="M+">$12M+</div>
              <div className="slab">Client revenue tracked</div>
            </div>
            <div className="stat">
              <div className="num" data-to="8" data-suf="">8</div>
              <div className="slab">Years shipping &amp; teaching</div>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="secta rv">
            <Link className="btn btnG" href="/#contact">
              Book a free scoping call
            </Link>
            <Link className="softline" href="/#work">
              See the results →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
