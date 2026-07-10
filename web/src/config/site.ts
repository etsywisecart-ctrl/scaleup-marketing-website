// Central place to flip the site's presentation toggles and contact info
// without touching component code.

export type AcademyBand = "navy" | "teal-tint";

export const siteConfig = {
  toggles: {
    /** "navy" (dark band) or "teal-tint" (light band) for the Academy section */
    academyBand: "navy" as AcademyBand,
    /** Scroll-reveal, counters, marquee, orbit rotation, video build-loop */
    motion: true,
    /** "Free 3-Day Demo Class" callout banner inside Academy */
    showDemoBanner: true,
  },
  contact: {
    phoneDisplay: "+92 328 0814301",
    phoneHref: "tel:+923280814301",
    whatsappDisplay: "+92 328 0814301",
    whatsappHref: "https://wa.me/923280814301",
    email: "hello@wescaleupmarketing.com",
    addressLine1: "Al Latif Center,",
    addressLine2: "Gulberg III, Lahore",
    hours: "Mon–Sat · 10:00–19:00",
  },
  social: {
    linkedin: "#top",
    instagram: "#top",
    youtube: "#top",
    facebook: "#top",
  },
};
