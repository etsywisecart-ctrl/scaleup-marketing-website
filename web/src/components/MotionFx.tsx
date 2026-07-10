"use client";

import { useEffect } from "react";
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

/** Global scroll-reveal (.rv) and stat counter (.num) behavior, mounted once. */
export default function MotionFx() {
  useEffect(() => {
    if (!siteConfig.toggles.motion) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".num").forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  return null;
}
