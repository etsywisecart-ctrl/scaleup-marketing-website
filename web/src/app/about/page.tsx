import type { Metadata } from "next";
import Link from "next/link";
import AboutHero from "@/components/AboutHero";
import TeamAvatar from "@/components/TeamAvatar";
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
      <AboutHero />

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
            <p className="eyebrow">The people</p>
            <h2 className="h2">
              Faces behind <span className="grad">the work.</span>
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Real people you&rsquo;ll actually work with — the same team that ships client
              projects and teaches the tracks.
            </p>
          </div>
          <div className="teamg">
            {team.map((m) => (
              <div key={m.name} className="tmcard rv">
                <TeamAvatar photo={m.photo} name={m.name} ini={m.ini} accent={m.accent} />
                <h3 className="tmname">{m.name}</h3>
                <p className="tmrole">{m.role}</p>
                {m.linkedin ? (
                  <a
                    className="tmli"
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.94 8.5a1.94 1.94 0 1 0 0-3.88 1.94 1.94 0 0 0 0 3.88ZM5.34 10h3.2v9.5h-3.2V10Zm5.1 0h3.07v1.3h.04c.43-.77 1.47-1.58 3.03-1.58 3.24 0 3.84 2.06 3.84 4.74v5.04h-3.2v-4.47c0-1.07-.02-2.44-1.54-2.44-1.54 0-1.78 1.16-1.78 2.36v4.55h-3.2V10Z" />
                    </svg>
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Where we&rsquo;ve been</p>
            <h2 className="h2">
              Five years, <span className="grad">one ecosystem.</span>
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
              <div className="num" data-to="500" data-suf="+">500+</div>
              <div className="slab">Students trained</div>
            </div>
            <div className="stat nb">
              <div className="num" data-to="100" data-suf="+">100+</div>
              <div className="slab">Projects delivered</div>
            </div>
            <div className="stat">
              <div className="num" data-to="5" data-suf="">5</div>
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
