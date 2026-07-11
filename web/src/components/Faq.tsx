"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { faqs } from "@/data/content";

type FaqItem = { q: string; a: string };

export default function Faq({
  items = faqs,
  eyebrow = "Before you ask",
  title = "Questions, answered straight.",
}: {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec" id="faq" style={{ paddingTop: 96 }}>
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="faqw">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`facc${isOpen ? " on" : ""}`}>
                <button className="fqbtn" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="fqt">{f.q}</span>
                  <span className="fqc">+</span>
                </button>
                <div className="fqbody">
                  <div className="fqin">
                    <p className="fqa">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="secta rv" style={{ justifyContent: "center" }}>
          <span className="softline">Still deciding?</span>
          <a className="btn btnO sm" href={siteConfig.contact.whatsappHref}>
            WhatsApp us — replies in minutes
          </a>
        </div>
      </div>
    </section>
  );
}
