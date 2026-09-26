"use client";

import Link from "next/link";
import type { CSSProperties, ComponentType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { VisStore, VisChat, VisAds, VisOrders, VisDesign, VisCRM } from "./ServiceVisuals";

type Service = {
  n: string;
  c: string;
  title: string;
  kicker: string;
  desc: string;
  tags: string[];
  href: string;
  Vis: ComponentType;
};

/* Each card opens on a realistic scene of the work itself — a storefront,
   a chatbot conversation, an ads dashboard — so visitors see the outcome,
   not an abstract icon. */
const SERVICES: Service[] = [
  {
    n: "01", c: "#10b981", title: "Ecommerce", kicker: "Stores that sell",
    desc: "Shopify, Daraz, TikTok Shop, eBay & Etsy stores — designed, built and launched to take real orders.",
    tags: ["Shopify", "Daraz", "TikTok Shop"], href: "/services/ecommerce", Vis: VisStore,
  },
  {
    n: "02", c: "#8b5cf6", title: "AI & Software", kicker: "Agents that answer",
    desc: "AI chat agents, SaaS and apps that reply to customers, confirm orders and send payment links — 24/7.",
    tags: ["AI agents", "SaaS", "Apps"], href: "/services/software-development", Vis: VisChat,
  },
  {
    n: "03", c: "#0ea5e9", title: "Digital Marketing", kicker: "Ads that pay back",
    desc: "Meta, TikTok & marketplace campaigns managed against one number that matters: return on ad spend.",
    tags: ["Meta Ads", "TikTok Ads", "SEO"], href: "/#contact", Vis: VisAds,
  },
  {
    n: "04", c: "#f59e0b", title: "Store Management", kicker: "Operations, handled",
    desc: "Listings, orders, fulfilment and customer support run day-to-day by our team — so you can grow.",
    tags: ["Listings", "Fulfilment", "Support"], href: "/#contact", Vis: VisOrders,
  },
  {
    n: "05", c: "#ec4899", title: "Design & Branding", kicker: "Brands people remember",
    desc: "Identity, UI/UX and product visuals that make your store and app look as good as they work.",
    tags: ["Branding", "UI/UX", "Photography"], href: "/#contact", Vis: VisDesign,
  },
  {
    n: "06", c: "#14b8a6", title: "Consulting & Systems", kicker: "Systems that scale",
    desc: "CRM, ERP, POS and migrations — the operating system behind a business that runs without you.",
    tags: ["CRM / ERP", "POS", "Strategy"], href: "/#contact", Vis: VisCRM,
  },
];

export default function Services() {
  const reduce = useReducedMotion();
  const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1 } } };
  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.3, 1] } },
  };

  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="split-head rv">
          <div>
            <span className="eyebrow"><i className="dot" />What we build</span>
            <h2 className="h2">Six crafts.<br /><span className="accent">One growth engine.</span></h2>
          </div>
          <p className="lead">
            Everything below is work we run for real clients today. Pick one service or plug into
            all six — it&rsquo;s the same senior team either way.
          </p>
        </div>

        <motion.div
          className="sv-grid"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map(({ Vis, ...s }) => (
            <motion.article
              key={s.title}
              className="sv-card"
              variants={card}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              style={{ "--c": s.c } as CSSProperties}
            >
              <div className="sv-stage"><Vis /></div>
              <Link href={s.href} className="sv-body">
                <div className="sv-meta">
                  <span className="sv-num">{s.n}</span>
                  <span className="sv-kicker">{s.kicker}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="sv-foot">
                  <div className="sv-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <span className="sv-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
