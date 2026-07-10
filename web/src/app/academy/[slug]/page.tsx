import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubHero from "@/components/SubHero";
import FormatToggle from "@/components/FormatToggle";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import RelatedLinks from "@/components/RelatedLinks";
import { siteConfig } from "@/config/site";
import { courses, curriculaBySlug } from "@/data/content";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} — ScaleUp Marketing Academy`,
    description: course.sub,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const modules = curriculaBySlug[slug];
  if (!course || !modules) notFound();

  const otherCourses = courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <SubHero
        crumbs={[{ label: "Academy", href: "/academy" }, { label: course.title }]}
        eyebrow={`${course.tag} · ${course.badge || "TRAINING TRACK"}`}
        title={course.title}
        lead={course.sub}
        chips={[course.dur, course.level, "CERTIFICATE ON COMPLETION"]}
        ctas={
          <>
            <Link className="btn btnG" href="/#contact">
              Get the syllabus &amp; pricing
            </Link>
            <Link className="btn btnO" href="/#contact">
              Reserve a free demo seat
            </Link>
          </>
        }
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ahead rv">
            <div style={{ maxWidth: 560 }}>
              <p className="eyebrow">Choose your format</p>
              <h2 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>
                Same syllabus, your schedule.
              </h2>
            </div>
            <FormatToggle />
          </div>

          <CurriculumAccordion
            title={`Full curriculum: ${course.title}`}
            meta={`${modules.length} MODULES · ${course.dur} · TAP TO EXPAND`}
            modules={modules}
          />

          <div className="models rv" style={{ marginTop: 44 }}>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Regular Classes
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>1:1 Mentorship
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Weekly Q&amp;A
            </span>
            <span className="model" style={{ color: "#3E5560", borderColor: "#DCE8E5" }}>
              <span className="mtick">✓</span>Certification
            </span>
          </div>

          {siteConfig.toggles.showDemoBanner && (
            <div className="demo rv">
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 className="demot">Sit in free for 3 days before you spend a rupee.</h3>
                <p className="demod">
                  This track starts with a free 3-day demo class and a 1:1 consultation — so you
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
          <div className="rv" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Other tracks</p>
            <h2 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>
              Explore the rest of the Academy.
            </h2>
          </div>
          <RelatedLinks
            items={otherCourses.map((c) => ({
              href: `/academy/${c.slug}`,
              title: c.title,
              meta: `${c.dur} · ${c.level}`,
            }))}
          />
          <div className="secta rv">
            <Link className="btn btnG" href="/#contact">
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
