"use client";

import { useState } from "react";

export default function CurriculumAccordion({
  title,
  meta,
  modules,
}: {
  title: string;
  meta: string;
  modules: { n: string; t: string; d: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="curr rv">
      <div className="currh">
        <h3 className="currt">{title}</h3>
        <span className="currs">{meta}</span>
      </div>
      {modules.map((m, i) => {
        const isOpen = open === i;
        const isLast = i === modules.length - 1;
        return (
          <div key={m.n} className={`mrow${isOpen ? " on" : ""}${isLast ? " last" : ""}`}>
            <button className="mbtn" onClick={() => setOpen(isOpen ? null : i)}>
              <span className="mn">{m.n}</span>
              <span className="mt">{m.t}</span>
              <span className="mchev">+</span>
            </button>
            <div className="mbody">
              <div className="mbin">
                <p className="mdesc">{m.d}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
