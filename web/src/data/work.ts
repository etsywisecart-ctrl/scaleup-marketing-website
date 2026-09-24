/* ============================================================
   PORTFOLIO / WORK
   Add your projects here — the /work page slider renders them
   in order. Drop screenshots in /public/uploads and point `img`
   at them (e.g. "/uploads/my-project.png"). Leave `img` empty to
   fall back to a clean gradient placeholder. `url` is optional
   (adds a "Visit live" link). Keep metrics to three items.
   ============================================================ */

export type Project = {
  title: string;
  cat: string;        // short category label, e.g. "Shopify Build"
  year: string;
  img: string;        // "/uploads/xyz.png" — or "" for placeholder
  desc: string;
  metrics: { v: string; l: string }[];
  tags: string[];
  url?: string;       // optional live link
};

export const portfolio: Project[] = [
  {
    title: "Savora Restaurant Website",
    cat: "Next.js Web Demo",
    year: "2026",
    img: "/uploads/savora-restaurant-ai.svg",
    desc: "AI-generated restaurant website concept built with Next.js for demonstration — modern menu, hospitality storytelling and responsive UI.",
    metrics: [
      { v: "Next.js", l: "Framework" },
      { v: "AI", l: "Design concept" },
      { v: "100%", l: "Responsive" },
    ],
    tags: ["Next.js", "React", "AI Generated"],
  },
  {
    title: "Savora Restaurant POS",
    cat: "Next.js POS Demo",
    year: "2026",
    img: "/uploads/savora-pos-dummy.svg",
    desc: "Dummy restaurant POS system concept built with Next.js — menu management, table orders, quantities, tax and checkout workflow.",
    metrics: [
      { v: "Next.js", l: "Framework" },
      { v: "POS", l: "System concept" },
      { v: "Live", l: "Order UI" },
    ],
    tags: ["Next.js", "POS", "AI Generated"],
  },
  {
    title: "OmniChat AI",
    cat: "AI SaaS Platform",
    year: "2026",
    img: "/uploads/omnichat-dashboard.png",
    desc: "An omnichannel AI sales & support agent — one brain and catalog across WhatsApp, website, Messenger and Instagram that answers customers, confirms orders and sends payment links.",
    metrics: [
      { v: "4", l: "Channels" },
      { v: "1", l: "AI brain + catalog" },
      { v: "24/7", l: "Auto support" },
    ],
    tags: ["AI Agent", "WhatsApp", "Meta Ads"],
    url: "https://omnichat-ai-six.vercel.app",
  },
  {
    title: "Retail Shopify Store — AU",
    cat: "Shopify Build",
    year: "2025",
    img: "/uploads/shopify-aud.jpg",
    desc: "A full Shopify build for an Australian retail brand — theme engineering, Meta ads and China sourcing, taken end to end.",
    metrics: [
      { v: "A$19.8K", l: "Gross sales" },
      { v: "1,138", l: "Orders" },
      { v: "+322%", l: "YoY growth" },
    ],
    tags: ["Shopify", "Meta Ads", "Sourcing"],
  },
  {
    title: "Local Shopify Store — PKR",
    cat: "Ecommerce",
    year: "2025",
    img: "/uploads/shopify-pkr.jpg",
    desc: "A conversion-focused storefront for a Pakistani brand — fast theme, clean product pages and a checkout tuned for local payments.",
    metrics: [
      { v: "3.1×", l: "Conv. lift" },
      { v: "1.8s", l: "Load time" },
      { v: "PKR", l: "Local checkout" },
    ],
    tags: ["Shopify", "CRO", "Payments"],
  },
  {
    title: "RGM Stone — Workflow OS",
    cat: "SaaS Platform",
    year: "2024",
    img: "/uploads/rgm-dashboard.png",
    desc: "A quote-to-install factory pipeline digitised end to end — jobs, warnings and billing in one production dashboard.",
    metrics: [
      { v: "128", l: "Jobs live" },
      { v: "99.9%", l: "Uptime" },
      { v: "0", l: "Paper forms" },
    ],
    tags: ["Next.js", "SaaS", "Dashboard"],
  },
];
