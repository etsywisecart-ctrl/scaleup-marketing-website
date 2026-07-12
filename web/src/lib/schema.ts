import { siteConfig } from "@/config/site";

const base = siteConfig.siteUrl;

/** FAQPage schema from a list of Q&A pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Course schema for an academy track. */
export function courseSchema(course: { slug: string; title: string; sub: string; dur: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.sub,
    url: `${base}/academy/${course.slug}`,
    provider: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: siteConfig.name,
      url: base,
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: ["online", "onsite"],
        location: {
          "@type": "Place",
          name: `${siteConfig.name} Campus`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lahore",
            addressCountry: "PK",
          },
        },
      },
    ],
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}
