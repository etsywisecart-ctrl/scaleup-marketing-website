import Link from "next/link";

/* About hero — the "two engines, one mission" idea made visual: an Agency
   pod and an Academy pod feeding a shared core, with particles flowing
   both ways. Reuses the shared .ahero dark-stage system. */

export default function AboutHero() {
  return (
    <section className="ahero">
      <div className="ahgridbg" aria-hidden="true" />
      <span className="ahglow ahglow1" aria-hidden="true" />
      <span className="ahglow ahglow2" aria-hidden="true" />

      <div className="wrap ahgrid">
        <div className="rv">
          <nav className="ahcrumb" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span className="ahcsep">/</span>
            <span className="ahccur">ABOUT US</span>
          </nav>
          <p className="eyebrow" style={{ color: "#7FE7CF", marginTop: 26 }}>
            About ScaleUp Marketing
          </p>
          <h1 className="aht">
            One team. Two engines.
            <br />
            <span className="ahshimmer">One mission.</span>
          </h1>
          <p className="ahlead">
            We build digital businesses and we teach people how to build them — using the same
            playbooks, the same senior team, and the same standard for what &lsquo;done&rsquo; looks
            like.
          </p>
          <div className="hcta">
            <Link className="btn btnG" href="/#contact">
              Book a Strategy Call
            </Link>
            <Link className="btn ahghost" href="/academy">
              Explore the Academy
            </Link>
          </div>
          <div className="ahlive">
            <span className="ahlivedot" />
            One roof in Lahore — agency &amp; academy, same senior team
          </div>
        </div>

        <div className="ahstage abstage rv" aria-hidden="true">
          <span className="ahring ahring1" />
          <span className="ahring ahring2" />

          {/* exchange beams behind the pods */}
          <svg className="abwires" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
            <path className="abwire" d="M92 96 Q180 180 268 96" />
            <path className="abwire abwire2" d="M92 264 Q180 180 268 264" />
            <circle className="abflow abflow1" r="4" />
            <circle className="abflow abflow2" r="4" />
            <circle className="abflow abflow3" r="4" />
            <circle className="abflow abflow4" r="4" />
          </svg>

          {/* the shared core */}
          <div className="abcore">
            <span className="abcorepulse" />
            ScaleUp
          </div>

          {/* agency pod */}
          <div className="abpod abpodA">
            <span className="abpodi" style={{ background: "linear-gradient(145deg,#5fd6bc,#2fbf9e)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#062a20" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" />
              </svg>
            </span>
            <div>
              <p className="abpodt">The Agency</p>
              <p className="abpods">We build it</p>
            </div>
          </div>

          {/* academy pod */}
          <div className="abpod abpodB">
            <span className="abpodi" style={{ background: "linear-gradient(145deg,#7FC3F0,#3F83F8)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06223f" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" />
                <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
              </svg>
            </span>
            <div>
              <p className="abpodt">The Academy</p>
              <p className="abpods">We teach it</p>
            </div>
          </div>

          <span className="ahspark ahs1" />
          <span className="ahspark ahs2" />
          <span className="ahspark ahs3" />
          <span className="ahspark ahs4" />
        </div>
      </div>
    </section>
  );
}
