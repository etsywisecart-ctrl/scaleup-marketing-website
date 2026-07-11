"use client";

/* Light/dark toggle. The actual theme is set on <html data-theme> by an
   inline script in <head> before paint (no flash); this button just flips
   it and remembers the choice. Icon visibility is driven by CSS on
   [data-theme], so there is no hydration mismatch. */

export default function ThemeToggle() {
  const toggle = () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button className="themebtn" onClick={toggle} aria-label="Toggle light / dark theme" type="button">
      <svg className="ticon timoon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg className="ticon tisun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" />
      </svg>
    </button>
  );
}
