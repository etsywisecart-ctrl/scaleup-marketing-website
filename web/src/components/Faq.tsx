"use client";

import { useState } from "react";
import { faqs } from "@/data/content";

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
  return (
    <section className="sec" id="faq">
      <div className="wrap faq-wrap">
        <div className="sec-head rv" style={{ marginBottom: 44 }}>
          <span className="eyebrow"><i className="dot" />{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </div>

        <div className="faq rv">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={f.q}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  {f.q}
                  <span className="faq-plus" aria-hidden="true" />
                </button>
                <div className="faq-a" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
