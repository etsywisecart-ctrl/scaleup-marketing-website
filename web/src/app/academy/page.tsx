import type { Metadata } from "next";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FormatToggle from "@/components/FormatToggle";
import { siteConfig } from "@/config/site";
import { courses, results, testimonials, faqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Academy — ScaleUp Marketing",
  description:
    "Live online and Lahore-campus training in Shopify, TikTok Shop, eBay & Etsy, Daraz, and AI & Digital Marketing — taught by the team running client stores.",
};

const academyFaqs = faqs.filter((f) =>
  ["Is training online, in-person, or both?", "Do students get certified?"].includes(f.q)
);
const academyResults = results.filter((r) => r.tag === "ACADEMY");
const academyTestimonials = testimonials.filter((t) => t.role.toLowerCase().includes("graduate"));

export default function AcademyPage() {
  return (
    <>
      <SubHero
        crumbs={[{ label: "Academy" }]}
        eyebrow="Academy — learn to build"
        title={
          <>
            Five tracks. <span className="grad">One certification standard.</span>
          </>
        }
        lead="Live cohorts online and at our Lahore campus, taught by the same senior team running client stores and ad accounts — not career instructors reading slides."
        chips={["11-MODULE FLAGSHIP TRACK", "FREE 3-DAY DEMO", "1:1 MENTORSHIP"]}
        ctas={
          <>
            <Link className="btn btnG" href="/#contact">
              Reserve a demo seat
            </Link>
            <a className="btn btnO" href="#tracks">
              See all tracks
            </a>
          </>
        }
      />

      <section className="sec" style={{ paddingTop: 0 }} id="tracks">
        <div className="wrap">
          <div className="ahead rv">
            <div style={{ maxWidth: 620 }}>
              <p className="eyebrow">Choose your format</p>
              <h2 className="h2">Same curriculum, your schedule.</h2>
            </div>
            <FormatToggle />
          </div>

          <div className="crow">
            {courses.map((c) => (
              <div key={c.title} className="ccard rv">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="ctag">{c.tag}</span>
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
                  View full curriculum &amp; pricing →
                </Link>
              </div>
            ))}
          </div>

          <div className="models rv" style={{ marginTop: 44 }}>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Regular Classes
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Advanced Masterclasses
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>1:1 Mentorship
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Hands-on Workshops
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Weekly Q&amp;A
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Certification
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Corporate Training
            </span>
          </div>

          {siteConfig.toggles.showDemoBanner && (
            <div className="demo rv" id="demo">
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
        </div>
      </section>

      {academyResults.length > 0 && (
        <section className="sec softband">
          <div className="wrap">
            <div className="rv" style={{ maxWidth: 640 }}>
              <p className="eyebrow">Graduate outcomes</p>
              <h2 className="h2">
                Students who <span className="grad">shipped.</span>
              </h2>
            </div>
            <div className="rgrid">
              {academyResults.map((r) => (
                <div key={r.name} className="rtile rv">
                  <div className="rhead">
                    <h3 className="rname">{r.name}</h3>
                    <span className="rtag">{r.tag}</span>
                  </div>
                  <p className="rline">{r.line}</p>
                  <svg className="spark" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polyline points={r.pts} fill="none" stroke="#2FBF9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points={r.base} fill="none" stroke="#E0EBE8" strokeWidth="1.5" strokeDasharray="3 4" />
                  </svg>
                  <div className="rfoot">
                    <span className="rdelta">{r.delta}</span>
                    <span className="rmore">{r.more}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {academyTestimonials.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="rv" style={{ maxWidth: 640 }}>
              <p className="eyebrow">In their words</p>
              <h2 className="h2">
                From the free demo class <span className="grad">to a real business.</span>
              </h2>
            </div>
            <div className="trow">
              {academyTestimonials.map((t) => (
                <div key={t.name} className="tcard rv">
                  <span className="tmetric">{t.metric}</span>
                  <p className="tq">&ldquo;{t.q}&rdquo;</p>
                  <div className="tfoot">
                    <div className={`av ${t.av}`}>{t.ini}</div>
                    <div>
                      <p className="tn">{t.name}</p>
                      <p className="tr">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <p className="eyebrow">Before you enroll</p>
            <h2 className="h2">Training questions, answered.</h2>
          </div>
          <div className="faqw">
            {academyFaqs.map((f) => (
              <div key={f.q} className="facc" style={{ padding: "22px 4px" }}>
                <p className="fqt" style={{ margin: 0 }}>
                  {f.q}
                </p>
                <p className="fqa" style={{ padding: "10px 40px 0 0" }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <div className="secta rv" style={{ justifyContent: "center" }}>
            <Link className="btn btnG" href="/#contact">
              Book a free consultation
            </Link>
            <a className="btn btnO sm" href={siteConfig.contact.whatsappHref}>
              WhatsApp us — replies in minutes
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
