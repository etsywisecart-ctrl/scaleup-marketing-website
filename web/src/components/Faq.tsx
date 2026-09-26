"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/content";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "./BrandIcon";

type QA = { q: string; a: string };

export default function Faq({
  items = faqs,
  eyebrow = "FAQ",
  title = "Questions, answered",
}: {
  items?: QA[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const { contact } = siteConfig;

  return (
    <section className="sec" id="faq">
      <div className="wrap fq-grid">
        <div className="fq-side rv">
          <span className="eyebrow"><i className="dot" />{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p className="lead">The things people ask us most — answered straight, no sales fluff.</p>

          <div className="fq-help">
            <div className="fq-help-top">
              <div className="fq-avs">
                {["#10b981", "#8b5cf6", "#f59e0b"].map((c, i) => <i key={c} style={{ background: c }}>{["A", "B", "S"][i]}</i>)}
                <span className="fq-online" />
              </div>
              <div>
                <b>Still have a question?</b>
                <small>Our team usually replies in under an hour</small>
              </div>
            </div>
            <a className="fq-wa" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="fq-wa-ic"><BrandIcon name="whatsapp" /></span>
              Chat on WhatsApp
              <em>{contact.whatsappDisplay}</em>
            </a>
          </div>
        </div>

        <div className="fq-list rv d2">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`fq-item${isOpen ? " open" : ""}`} key={f.q}>
                <button className="fq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="fq-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="fq-text">{f.q}</span>
                  <span className="fq-toggle" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="fq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
