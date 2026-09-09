import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/Accordion";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { courses, curriculaBySlug } from "@/data/content";
import { courseSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return { title: `${course.title} — Academy`, description: course.sub, alternates: { canonical: `/academy/${course.slug}` } };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const modules = curriculaBySlug[slug];
  if (!course || !modules) notFound();

  const otherCourses = courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <JsonLd
        data={[
          courseSchema(course),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Academy", path: "/academy" },
            { name: course.title, path: `/academy/${course.slug}` },
          ]),
        ]}
      />
      <PageHero
        crumb={course.title}
        eyebrow={`Academy · ${course.tag}`}
        title={course.title}
        lead={course.sub}
        chips={[course.dur, course.level, `${modules.length} modules`, "Certificate"]}
        primary={{ label: "Reserve a free demo seat", href: "/#contact" }}
        ghost={{ label: "All courses", href: "/academy" }}
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <Accordion
            title={`Full curriculum — ${course.title}`}
            meta={`${modules.length} MODULES · ${course.dur} · TAP TO EXPAND`}
            modules={modules}
          />

          {siteConfig.toggles.showDemoBanner && (
            <div className="demo rv">
              <div>
                <h3>Sit in free for 3 days before you spend a rupee.</h3>
                <p>This track starts with a free 3-day demo class and a 1:1 consultation — so you enroll knowing exactly what you will build.</p>
              </div>
              <Link className="btn btn-primary lg" href="/#contact">Reserve a demo seat</Link>
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ background: "var(--sunk)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><i className="dot" />Other tracks</span>
            <h2 className="h2">Explore the rest of the Academy</h2>
          </div>
          <RelatedLinks
            items={otherCourses.map((c) => ({ href: `/academy/${c.slug}`, title: c.title, meta: `${c.dur} · ${c.level}` }))}
          />
        </div>
      </section>
    </>
  );
}
