import type { Metadata } from "next";
import Link from "next/link";
import SubHero from "@/components/SubHero";
import FormatToggle from "@/components/FormatToggle";
import PlatformMark from "@/components/PlatformMark";
import Faq from "@/components/Faq";
import { siteConfig } from "@/config/site";
import {
  courses,
  results,
  testimonials,
  gradResults,
  gradTestimonials,
  academyFaqs,
} from "@/data/content";

export const metadata: Metadata = {
  title: "Academy — ScaleUp Marketing",
  description:
    "Live online and Lahore-campus training in Shopify, TikTok Shop, eBay & Etsy, Daraz, and AI & Digital Marketing — taught by the team running client stores.",
};

// Areeba's Etsy outcome (homepage results) + academy-only graduate cases
const academyResults = [...results.filter((r) => r.tag === "ACADEMY"), ...gradResults];
const academyTestimonials = [
  ...testimonials.filter((t) => t.role.toLowerCase().includes("graduate")),
  ...gradTestimonials,
];

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
          <div className="stats rv" style={{ border: "1px solid #E7F0EE", marginBottom: 64 }}>
            <div className="wrap strip">
              <div className="stat first">
                <div className="num" data-to="500" data-suf="+">500+</div>
                <div className="slab">Students trained</div>
              </div>
              <div className="stat nb">
                <div className="num" data-to="5" data-suf="">5</div>
                <div className="slab">Live training tracks</div>
              </div>
              <div className="stat">
                <div className="num" data-to="3" data-suf="">3</div>
                <div className="slab">Days of free demo class</div>
              </div>
            </div>
          </div>

          <div className="ahead rv">
            <div style={{ maxWidth: 620 }}>
              <p className="eyebrow">Choose your format</p>
              <h2 className="h2">Same curriculum, your schedule.</h2>
            </div>
            <FormatToggle />
          </div>

          <div className="vcrow">
            {courses.map((c) => {
              const grad =
                c.slug === "shopify-mastery"
                  ? "vg-shopify"
                  : c.slug === "tiktok-shop"
                    ? "vg-tiktok"
                    : c.slug === "ebay-etsy"
                      ? "vg-market"
                      : c.slug === "daraz"
                        ? "vg-daraz"
                        : "vg-ai";
              const featured = c.slug === "shopify-mastery";
              return (
                <div key={c.title} className={`vccard rv${featured ? " feat" : ""}`}>
                  <div className={`vchead ${grad}`}>
                    <span className="vclogo">
                      <PlatformMark slug={c.slug} size={featured ? 30 : 26} />
                    </span>
                    <div style={{ flex: 1, position: "relative" }}>
                      <h3 className="vct">{c.title}</h3>
                      <p className="vcsub">{c.sub}</p>
                    </div>
                    {c.badge ? <span className="vcbadge">{c.badge}</span> : null}
                  </div>
                  <div className="vcbody">
                    <div className="vcmods">
                      {c.mods.map((m) => (
                        <div key={m.n} className="vcmod">
                          <span className="vcmn">{m.n}</span>
                          {m.t}
                        </div>
                      ))}
                    </div>
                    <div className="vcmore">{c.more}</div>
                    <div className="vcmeta">
                      <span className="cpill">{c.dur}</span>
                      <span className="cpill">{c.level}</span>
                      <span className="cpill">CERTIFICATE</span>
                    </div>
                    <Link className="vclink" href={`/academy/${c.slug}`}>
                      View full curriculum →
                    </Link>
                  </div>
                </div>
              );
            })}
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

      <section className="sec softband">
        <div className="wrap">
          <div className="rv" style={{ maxWidth: 660 }}>
            <p className="eyebrow">Graduate outcomes</p>
            <h2 className="h2">
              Students who <span className="grad">shipped.</span>
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Not certificates on a shelf — live stores, real orders, and the specific work each
              graduate did to get there.
            </p>
          </div>
          <div className="rgrid">
            {academyResults.map((r) => {
              const peak = Math.max(...r.bars);
              return (
                <div key={r.name} className="rtile rv">
                  <div className="rhead">
                    <h3 className="rname">{r.name}</h3>
                    <span className="rtag">{r.tag}</span>
                  </div>
                  <p className="rline">{r.line}</p>
                  <div className="rkpis">
                    {r.kpis.map((k) => (
                      <div key={k.l} className="rkpi">
                        <span className="rkpv">{k.v}</span>
                        <span className="rkpl">{k.l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rchart" aria-hidden="true">
                    <div className="rclabel">{r.unit}</div>
                    <div className="rbars">
                      {r.bars.map((h, i) => (
                        <span
                          key={i}
                          className={`rbar${h === peak ? " peak" : ""}`}
                          style={{ height: h + "%", transitionDelay: i * 70 + "ms" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rwork">
                    {r.work.map((w) => (
                      <span key={w} className="rwchip">
                        {w}
                      </span>
                    ))}
                  </div>
                  <div className="rfoot">
                    <span className="rdelta">{r.delta}</span>
                    <span className="rmore">{r.more}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="secta rv">
            <Link className="btn btnG" href="/#contact">
              Start where they started — the free demo
            </Link>
            <span className="softline">Outcomes vary with effort — no income promises, ever.</span>
          </div>
        </div>
      </section>

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

      <Faq
        items={academyFaqs}
        eyebrow="Before you enroll"
        title="Course questions, answered straight."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secta rv" style={{ justifyContent: "center" }}>
            <Link className="btn btnG" href="/#contact">
              Book a free consultation
            </Link>
            <span className="softline">Or sit in free for 3 days — no card required.</span>
          </div>
        </div>
      </section>
    </>
  );
}
