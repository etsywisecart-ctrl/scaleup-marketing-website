"use client";

import { useState } from "react";

type Module = { n: string; t: string; d: string };

export default function Accordion({
  title,
  meta,
  modules,
}: {
  title: string;
  meta: string;
  modules: Module[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="acc rv">
      <div className="acc-head">
        <h3 className="h3">{title}</h3>
        <span className="acc-meta mono">{meta}</span>
      </div>
      <div className="acc-list">
        {modules.map((m, i) => {
          const isOpen = open === i;
          return (
            <div className={`acc-item${isOpen ? " open" : ""}`} key={m.n}>
              <button className="acc-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span className="acc-n">{m.n}</span>
                <span className="acc-t">{m.t}</span>
                <span className="faq-plus" aria-hidden="true" />
              </button>
              <div className="acc-a" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div><p>{m.d}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
