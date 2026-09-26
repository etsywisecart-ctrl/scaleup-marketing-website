/* Shared brand glyphs + colours. Simplified marks drawn inline so they stay
   crisp and cost nothing to load; each brand has a gradient pair (c1 → c2)
   used for the white-glyph gradient tiles across the site. */

export type Brand = { name: string; ic: string; c1: string; c2: string };

export const BRANDS: Record<string, Brand> = {
  shopify: { name: "Shopify", ic: "shopify", c1: "#7ab55c", c2: "#4a7a32" },
  tiktok: { name: "TikTok Shop", ic: "tiktok", c1: "#fe2c55", c2: "#25104a" },
  daraz: { name: "Daraz", ic: "daraz", c1: "#f85606", c2: "#c2410c" },
  etsy: { name: "Etsy", ic: "etsy", c1: "#f1641e", c2: "#b8430f" },
  ebay: { name: "eBay", ic: "ebay", c1: "#e53238", c2: "#0064d2" },
  amazon: { name: "Amazon", ic: "amazon", c1: "#ff9900", c2: "#232f3e" },
  woo: { name: "WooCommerce", ic: "woo", c1: "#8e63c7", c2: "#5b3a8c" },
  meta: { name: "Meta Ads", ic: "meta", c1: "#0866ff", c2: "#003fa3" },
  whatsapp: { name: "WhatsApp", ic: "whatsapp", c1: "#25d366", c2: "#128c7e" },
  payoneer: { name: "Payoneer", ic: "payoneer", c1: "#ff4800", c2: "#b3261e" },
  flutter: { name: "Flutter", ic: "flutter", c1: "#13b9fd", c2: "#02569b" },
  openai: { name: "OpenAI", ic: "openai", c1: "#10a37f", c2: "#0b5e4a" },
};

export function BrandIcon({ name }: { name: string }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shopify": return <svg {...s}><path d="M6.5 8h11l-1 11.5H7.5L6.5 8Z" /><path d="M9 8V6.6a3 3 0 0 1 6 0V8" /></svg>;
    case "tiktok": return <svg {...s}><path d="M13 4v10.5a3 3 0 1 1-2.3-2.92" /><path d="M13 4.5c.4 2.1 1.9 3.5 4 3.7" /></svg>;
    case "daraz": return <svg {...s}><path d="M4 5h2l1.5 9.4a1.3 1.3 0 0 0 1.3 1.1h7.4a1.3 1.3 0 0 0 1.3-1L19.6 8H6.3" /><circle cx="9.5" cy="19" r="1.15" /><circle cx="16.5" cy="19" r="1.15" /></svg>;
    case "etsy": return <svg {...s}><path d="M4.5 9 6 5h12l1.5 4" /><path d="M5.5 9.2v9.3h13V9.2" /><path d="M4.5 9a1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0 1.9 1.9 0 0 0 3.75 0" /></svg>;
    case "ebay": return <svg {...s}><path d="M4.3 12.4 11.4 5.3a1 1 0 0 1 .7-.3H18a1 1 0 0 1 1 1v5.9a1 1 0 0 1-.3.7l-7.1 7.1a1 1 0 0 1-1.4 0l-5.9-5.9a1 1 0 0 1 0-1.4Z" /><circle cx="15.2" cy="8.8" r="1.25" /></svg>;
    case "amazon": return <svg {...s}><path d="M5 14.5c4.2 3 9.8 3 14 0" /><path d="M16.8 13c1 .6 1.7 1.6 1.9 3" /></svg>;
    case "woo": return <svg {...s}><path d="M4 6h16v10H10l-4 3v-3H4z" /><path d="M8 10l1 3 1.5-3 1.5 3 1-3M16 11.5h.01" /></svg>;
    case "meta": return <svg {...s}><path d="M3.5 14.5c0-4 2-7 4.2-7 3.3 0 5.3 9 8.6 9 1.9 0 3.2-1.8 3.2-4.2 0-3-1.6-4.8-3.4-4.8-3.2 0-5 7.5-8.4 7.5-2.4 0-4.2-2-4.2-.5Z" /></svg>;
    case "whatsapp": return <svg {...s}><path d="M4.5 19.5 5.7 16A7.8 7.8 0 1 1 8.4 18.6Z" /><path d="M9.3 9.2c.2 2.4 2.1 4.4 4.6 4.8l1-1.1 1.6.7" /></svg>;
    case "payoneer": return <svg {...s}><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18M7 14.5h4" /></svg>;
    case "flutter": return <svg {...s}><path d="M14.5 3.5 5 13l3 3L20.5 3.5ZM14.5 12.5 9.5 17.5l4.5 4h6.5L16 17l4.5-4.5Z" /></svg>;
    default: return <svg {...s}><path d="M12 3.5l1.9 5 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.2L5 10.4l5.1-1.9Z" /><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" /></svg>;
  }
}
