import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { courses, results, testimonials, academyFaqs } from "@/data/content";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Academy — Learn to Build",
  description:
    "Live online and Lahore-campus training in Shopify, TikTok Shop, eBay & Etsy, Daraz, and AI & Digital Marketing — taught by the team running client stores.",
  alternates: { canonical: "/academy" },
};

const academyResults = results.filter((r) => r.tag === "ACADEMY");
const academyTestimonials = testimonials.filter((t) => t.role.toLowerCase().includes("graduate"));

const MODELS = ["Regular Classes", "Advanced Masterclasses", "1:1 Mentorship", "Hands-on Workshops", "Weekly Q&A", "Certification", "Corporate Training"];

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={faqSchema(academyFaqs)} />
      <PageHero
        crumb="Academy"
        eyebrow="The Academy"
        title={<>Learn the skills we<br /><span className="accent">get paid to deliver.</span></>}
        lead="Live cohorts — online and at our Lahore campus — taught by the same people who ship client stores and run the ad accounts. Start with a free 3-day demo."
        primary={{ label: "Reserve a free demo seat", href: "/#contact" }}
        ghost={{ label: "See graduate outcomes", href: "#outcomes" }}
      />

      <section className="sec" style={{ paddingTop: 0 }} id="tracks">
        <div className="wrap">
          <div className="stats rv" style={{ marginBottom: 60 }}>
            <div className="stat"><b className="num" data-to="500" data-suf="+">0+</b><span>Students trained</span></div>
            <div className="stat"><b className="num" data-to="5" data-suf="">0</b><span>Live training tracks</span></div>
            <div className="stat"><b className="num" data-to="3" data-suf="">0</b><span>Days of free demo</span></div>
            <div className="stat"><b>Urdu·EN</b><span>Taught the way business is spoken</span></div>
          </div>

          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Choose your track</span>
            <h2 className="h2">Same curriculum, your schedule</h2>
          </div>

          <div className="grid grid-auto" style={{ marginTop: 48 }}>
            {courses.map((c, i) => (
              <Link key={c.slug} href={`/academy/${c.slug}`} className={`card course-card rv d${(i % 3) + 1}`}>
                <div className="cc-top">
                  <span className="cc-tag mono">{c.tag}</span>
                  {c.badge && <span className="cc-badge">{c.badge}</span>}
                </div>
                <h3>{c.title}</h3>
                <p>{c.sub}</p>
                <div className="cc-meta">
                  <span>{c.dur}</span>
                  <span>{c.level}</span>
                </div>
                <span className="card-link">View curriculum
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="models rv">
            {MODELS.map((m) => (
              <span className="model" key={m}><span className="mtick">✓</span>{m}</span>
            ))}
          </div>

          {siteConfig.toggles.showDemoBanner && (
            <div className="demo rv" id="demo">
              <div>
                <h3>Sit in free for 3 days before you spend a rupee.</h3>
                <p>Every track starts with a free 3-day demo class and a 1:1 consultation — so you enroll knowing exactly what you will build.</p>
              </div>
              <Link className="btn btn-primary lg" href="/#contact">Reserve a demo seat</Link>
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }} id="outcomes">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Graduate outcomes</span>
            <h2 className="h2">Students who shipped</h2>
            <p className="lead">Not certificates on a shelf — live stores, real orders, and the work each graduate did to get there.</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: 48 }}>
            {academyResults.map((r, i) => (
              <div key={r.name} className={`card rv d${(i % 3) + 1}`}>
                <div className="cc-top"><span className="cc-tag mono">{r.tag}</span><span className="cc-badge">{r.delta}</span></div>
                <h3>{r.name}</h3>
                <p>{r.line}</p>
                <div className="kpis">
                  {r.kpis.map((k) => (<div key={k.l} className="kpi"><b>{k.v}</b><span>{k.l}</span></div>))}
                </div>
              </div>
            ))}
            {academyTestimonials.map((t, i) => (
              <figure key={t.name} className={`tcard rv d${(i % 3) + 1}`}>
                <span className="tcard-metric">{t.metric}</span>
                <blockquote>“{t.q}”</blockquote>
                <figcaption><span className="tavatar">{t.ini}</span><span><b>{t.name}</b><em>{t.role}</em></span></figcaption>
              </figure>
            ))}
            <div className="card invite-card rv">
              <span className="invite-plus">+</span>
              <h3>This spot is reserved</h3>
              <p>Start in the free 3-day demo, ship your store, and your result goes here.</p>
              <Link className="btn btn-primary sm" href="/#contact" style={{ marginTop: "auto" }}>Reserve a demo seat</Link>
            </div>
          </div>
          <p className="muted rv" style={{ textAlign: "center", marginTop: 32, fontSize: 13.5 }}>
            Outcomes vary with effort — no income promises, ever.
          </p>
        </div>
      </section>

      <Faq items={academyFaqs} eyebrow="Before you enroll" title="Course questions, answered straight" />
    </>
  );
}
