import type { Project } from "@/data/work";

/* Groups the free-text `cat` label from data/work.ts into a few filter
   buckets, so new projects land in the right tab automatically. */
export const FILTERS = ["All", "AI & SaaS", "Ecommerce", "Restaurant tech", "Web & apps"] as const;
export type Filter = (typeof FILTERS)[number];

export function bucket(p: Project): Exclude<Filter, "All"> {
  const s = `${p.cat} ${p.title}`.toLowerCase();
  if (/pos|restaurant/.test(s)) return "Restaurant tech";
  if (/shopify|ecommerce|store|daraz|etsy|ebay/.test(s)) return "Ecommerce";
  if (/\bai\b|saas|platform|dashboard/.test(s)) return "AI & SaaS";
  return "Web & apps";
}

export const BUCKET_COLOR: Record<Exclude<Filter, "All">, string> = {
  "AI & SaaS": "#8b5cf6",
  Ecommerce: "#10b981",
  "Restaurant tech": "#f97316",
  "Web & apps": "#0ea5e9",
};
