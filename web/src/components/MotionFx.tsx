"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

function countUp(el: Element) {
  const to = parseFloat(el.getAttribute("data-to") || "0");
  const pre = el.getAttribute("data-pre") || "";
  const suf = el.getAttribute("data-suf") || "";
  const t0 = performance.now();
  const dur = 1500;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + Math.round(to * e).toLocaleString("en-US") + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Global scroll-reveal (.rv) and stat-counter (.num) behavior.
 * Lives in the persistent root layout, so it re-scans the DOM on every
 * route change (via the pathname dependency) — otherwise a client-side
 * navigation would leave the new page's .rv elements at opacity:0 forever.
 */
export default function MotionFx() {
  const pathname = usePathname();

  useEffect(() => {
    // Motion off: CSS already shows everything; nothing to observe.
    if (!siteConfig.toggles.motion) return;

    // Wait a frame so the freshly-navigated page's DOM is in place.
    let io: IntersectionObserver | null = null;
    let cio: IntersectionObserver | null = null;

    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      document.querySelectorAll(".rv:not(.in)").forEach((el) => io!.observe(el));

      cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              countUp(entry.target);
              cio?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      document.querySelectorAll(".num").forEach((el) => cio!.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      cio?.disconnect();
    };
  }, [pathname]);

  return null;
}
