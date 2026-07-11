import Link from "next/link";
import { siteConfig } from "@/config/site";
import { courses, curriculum } from "@/data/content";
import FormatToggle from "./FormatToggle";
import CurriculumAccordion from "./CurriculumAccordion";
import PlatformMark from "./PlatformMark";

export default function Academy() {
  const bandClass = siteConfig.toggles.academyBand === "teal-tint" ? "acadT" : "";

  return (
    <section className={`sec acad ${bandClass}`} id="academy">
      <div className="wrap">
        <div className="ahead rv">
          <div style={{ maxWidth: 620 }}>
            <p className="eyebrow">Academy — learn to build</p>
            <h2 className="h2">The institute behind the agency.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Live cohorts taught by the same people running client stores. Choose your format —
              the curriculum, mentors, and certification are identical.
            </p>
          </div>
          <FormatToggle />
        </div>

        <div className="crow">
          {courses.map((c) => (
            <div key={c.title} className="ccard rv">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PlatformMark slug={c.slug} size={20} />
                  <span className="ctag">{c.tag}</span>
                </span>
                {c.badge ? <span className="cbadge">{c.badge}</span> : null}
              </div>
              <h3 className="ct">{c.title}</h3>
              <p className="cs">{c.sub}</p>
              <div className="cmods">
                {c.mods.map((m) => (
                  <div key={m.n} className="cmod">
                    <span className="cmn">{m.n}</span>
                    {m.t}
                  </div>
                ))}
              </div>
              <div className="cmore">{c.more}</div>
              <div className="cmeta">
                <span className="cpill">{c.dur}</span>
                <span className="cpill">{c.level}</span>
              </div>
              <Link className="clink" href={`/academy/${c.slug}`}>
                View full curriculum →
              </Link>
            </div>
          ))}
        </div>

        <div className="secta rv">
          <Link className="btn btnW" href="/academy">
            Explore the full Academy
          </Link>
          <span className="softline" style={{ color: bandClass ? "#4E6A70" : "#A9C4CE" }}>
            All 5 tracks, certification details, and graduate results.
          </span>
        </div>

        <div className="models rv">
          <span className="model">
            <span className="mtick">✓</span>Regular Classes
          </span>
          <span className="model">
            <span className="mtick">✓</span>Advanced Masterclasses
          </span>
          <span className="model">
            <span className="mtick">✓</span>1:1 Mentorship
          </span>
          <span className="model">
            <span className="mtick">✓</span>Hands-on Workshops
          </span>
          <span className="model">
            <span className="mtick">✓</span>Weekly Q&amp;A
          </span>
          <span className="model">
            <span className="mtick">✓</span>Certification
          </span>
          <span className="model">
            <span className="mtick">✓</span>Corporate Training
          </span>
        </div>

        {siteConfig.toggles.showDemoBanner && (
          <div className="demo rv">
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 className="demot">Sit in free for 3 days before you spend a rupee.</h3>
              <p className="demod">
                Every track starts with a free 3-day demo class and a 1:1 consultation — so you
                enroll knowing exactly what you will build.
              </p>
            </div>
            <Link className="btn btnW" href="/#contact">
              Reserve a demo seat
            </Link>
          </div>
        )}

        <CurriculumAccordion
          title="Inside the flagship: Shopify Mastery"
          meta="11 MODULES · 12 WEEKS · TAP TO EXPAND"
          modules={curriculum}
        />
      </div>
    </section>
  );
}
