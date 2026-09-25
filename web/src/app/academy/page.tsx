import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import AcademyTestimonials from "@/components/AcademyTestimonials";
import JsonLd from "@/components/JsonLd";
import { courses, results, testimonials, academyFaqs } from "@/data/content";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Academy — Build Skills That Ship",
  description: "Practical ecommerce, AI and digital marketing training from practitioners. Live online cohorts and Lahore campus sessions.",
  alternates: { canonical: "/academy" },
};

const academyResults = results.filter((r) => r.tag === "ACADEMY");
const academyTestimonials = testimonials.filter((t) => t.role.toLowerCase().includes("graduate"));
const platforms = ["SHOPIFY", "TIKTOK SHOP", "DARAZ", "ETSY", "eBAY", "AMAZON"];
const principles = [
  ["01", "Learn by building", "Every track turns lessons into a real store, campaign, workflow or portfolio asset."],
  ["02", "Taught by operators", "Learn from people actively building ecommerce systems and running growth work."],
  ["03", "Support beyond class", "Recordings, community, weekly Q&A and practical feedback keep momentum going."],
];

function Arrow() {
  return <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9h11M10 5l4 4-4 4" /></svg>;
}

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={faqSchema(academyFaqs)} />
      <main className="academy-page">
        <section className="academy-hero">
          <div className="wrap academy-hero-grid">
            <div className="academy-hero-copy rv">
              <div className="academy-kicker"><span className="academy-live-dot" /> SCALEUP ACADEMY <span>·</span> PRACTICAL TRAINING</div>
              <h1>Turn <span>knowledge</span><br />into something<br />you can ship.</h1>
              <p>Live ecommerce, AI and digital marketing training built around the work businesses actually need. Learn online or at our Lahore campus — then build while you learn.</p>
              <div className="academy-actions">
                <Link href="/#contact" className="btn btn-primary lg">Reserve a free demo <Arrow /></Link>
                <Link href="#courses" className="academy-text-link">Explore tracks <Arrow /></Link>
              </div>
              <div className="academy-proof">
                <div><strong>500+</strong><span>students trained</span></div><i /><div><strong>5</strong><span>live tracks</span></div><i /><div><strong>3 days</strong><span>free demo</span></div>
              </div>
            </div>
            <div className="academy-hero-visual rv d2">
              <div className="academy-orb orb-a" /><div className="academy-orb orb-b" />
              <div className="academy-window">
                <div className="academy-window-top"><span><i /><i /><i /></span><small>academy.scaleup · live cohort</small><b>● LIVE</b></div>
                <div className="academy-window-body">
                  <div className="academy-dashboard-copy"><span className="mono">TODAY'S SESSION</span><h3>Build your first<br /><em>selling store.</em></h3><p>Shopify setup · Product research · Conversion UX</p><div className="academy-progress"><span style={{ width: "72%" }} /></div><small>72% of today's workshop complete</small></div>
                  <div className="academy-dashboard-art">
                    <div className="dash-card dash-main"><span>STORE HEALTH</span><strong>92%</strong><div className="dash-bars"><i /><i /><i /><i /><i /></div></div>
                    <div className="dash-card dash-float"><b>+28%</b><small>conversion lift</small></div><div className="dash-ring"><span>AI</span></div>
                  </div>
                </div>
                <div className="academy-window-foot"><span>● Mentor online</span><span>12 learners active</span><span>Next: Q&amp;A · 8:00 PM</span></div>
              </div>
              <div className="academy-float float-one"><span>✦</span><div><b>Hands-on</b><small>not just theory</small></div></div>
              <div className="academy-float float-two"><span>↗</span><div><b>Portfolio ready</b><small>build as you learn</small></div></div>
            </div>
          </div>
        </section>

        <section className="academy-marquee"><div className="academy-marquee-track">{[...platforms, ...platforms].map((p, i) => <span key={i}><b>✦</b>{p}</span>)}</div></section>

        <section className="sec academy-section" id="courses">
          <div className="wrap">
            <div className="academy-section-head rv"><div><span className="eyebrow"><i className="dot" />Choose your path</span><h2 className="h2">Courses designed around<br /><span className="accent">real work.</span></h2></div><p>Clear curriculum. Practical assignments. Mentor feedback. Pick the track that matches where you are now.</p></div>
            <div className="academy-course-grid">
              {courses.map((c, i) => <Link key={c.slug} href={"/academy/" + c.slug} className={"academy-course-card rv d" + ((i % 3) + 1)}><div className="course-number">0{i + 1}</div><div className="course-card-top"><span>{c.tag}</span>{c.badge && <b>{c.badge}</b>}</div><h3>{c.title}</h3><p>{c.sub}</p><div className="course-meta"><span>{c.dur}</span><span>{c.level}</span><strong>View track <Arrow /></strong></div></Link>)}
            </div>
            <div className="academy-principles">{principles.map(([n, t, d]) => <div className="academy-principle rv" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
          </div>
        </section>

        <section className="academy-showcase"><div className="wrap academy-showcase-grid">
          <div className="showcase-copy rv"><span className="eyebrow"><i className="dot" />The learning system</span><h2>Not a classroom.<br /><span>an operating system.</span></h2><p>Each week moves from concept → build → feedback → improvement. The goal is not to finish lessons. It is to leave with work you can show.</p>
            <div className="showcase-list">{["Live workshops with screen-sharing", "Real store & campaign assignments", "Weekly mentor review", "Recordings + templates + community"].map((x, i) => <div key={x}><b>0{i + 1}</b><span>{x}</span><i>✓</i></div>)}</div>
          </div>
          <div className="showcase-stack rv d2"><div className="stack-card stack-back"><span>WEEK 04</span><b>Campaign Lab</b><small>Meta · TikTok · Creative testing</small></div><div className="stack-card stack-mid"><span>WEEK 08</span><b>Store Conversion</b><small>UX · CRO · analytics</small></div><div className="stack-card stack-front"><div className="stack-icon">✦</div><span>LIVE WORKSHOP</span><h3>Build. Test.<br /><em>Improve.</em></h3><div className="stack-line"><i style={{ width: "82%" }} /></div><small>82% workshop progress</small></div></div>
        </div></section>

        <AcademyTestimonials />

        <section className="academy-cta rv"><div className="wrap academy-cta-inner"><div><span className="academy-kicker">START WITH ZERO RISK</span><h2>Come for 3 days.<br /><span>Build before you decide.</span></h2><p>Join a free demo class, meet the mentor and see exactly how the program works.</p></div><Link href="/#contact" className="btn btn-primary lg">Reserve my demo seat <Arrow /></Link></div></section>
        <Faq items={academyFaqs} eyebrow="Before you enroll" title="Course questions, answered straight" />
      </main>
    </>
  );
}
