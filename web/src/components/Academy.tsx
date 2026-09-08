import Link from "next/link";
import { courses } from "@/data/content";

export default function Academy() {
  return (
    <section className="sec" id="academy" style={{ background: "var(--sunk)" }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />The Academy</span>
          <h2 className="h2">Learn the skills we get paid to deliver</h2>
          <p className="lead">
            Live cohorts — online and at our Lahore campus — taught by the same people who ship
            client stores and campaigns. Start with a free 3-day demo class.
          </p>
        </div>

        <div className="grid grid-auto" style={{ marginTop: 52 }}>
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
              <span className="card-link">
                View curriculum
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="rv" style={{ textAlign: "center", marginTop: 44 }}>
          <Link className="btn btn-primary lg" href="/academy">
            See all courses
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
