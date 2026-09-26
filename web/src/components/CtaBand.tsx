"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLOTS = ["11:00 AM", "2:30 PM", "5:00 PM", "7:30 PM"];

export default function CtaBand() {
  const reduce = useReducedMotion();
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState(1);
  const text = encodeURIComponent(
    `Hi ScaleUp! I'd like to book a free 30-minute strategy call on ${DAYS[day]} at ${SLOTS[slot]}.`
  );
  const bookHref = `${siteConfig.contact.whatsappHref}?text=${text}`;

  return (
    <section className="sec">
      <div className="wrap">
        <motion.div
          className="cta2"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <div className="cta2-aurora" aria-hidden="true"><i /><i /><i /></div>

          <div className="cta2-copy">
            <span className="cta2-eyebrow">Learn · Launch · Scale</span>
            <h2>Ready to build, automate<br />&amp; scale your business?</h2>
            <p>
              Book a free 30-minute strategy call — no retainer, no pressure. We&rsquo;ll map your
              next 90 days on the call.
            </p>
            <ul className="cta2-points">
              <li>Free, 30 minutes, on video</li>
              <li>Fixed quote within 48 hours</li>
              <li>Talk to the team who&rsquo;ll build it</li>
            </ul>
            <div className="cta2-btns">
              <Link className="btn btn-ghost-light lg" href="/work">See our work</Link>
            </div>
          </div>

          <div className="cta2-cal">
            <div className="cal-head">
              <div>
                <b>Free strategy call</b>
                <small>30 min · Google Meet / WhatsApp video</small>
              </div>
              <span className="cal-badge">Free</span>
            </div>
            <div className="cal-label">Pick a day</div>
            <div className="cal-days">
              {DAYS.map((d, i) => (
                <button key={d} className={i === day ? "on" : ""} onClick={() => setDay(i)} type="button">
                  <small>{d}</small>
                  <i className={`cal-dot${i === 5 ? " low" : ""}`} />
                </button>
              ))}
            </div>
            <div className="cal-label">Available times (PKT)</div>
            <div className="cal-slots">
              {SLOTS.map((s, i) => (
                <button key={s} className={i === slot ? "on" : ""} onClick={() => setSlot(i)} type="button">{s}</button>
              ))}
            </div>
            <a className="btn btn-primary cal-book" href={bookHref} target="_blank" rel="noopener noreferrer">
              Book {DAYS[day]} · {SLOTS[slot]}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
            <p className="cal-note">Confirms instantly on WhatsApp — reschedule any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
