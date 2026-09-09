"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const h = () => setOn(window.scrollY > 600);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      className={`b2t${on ? " on" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      type="button"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
