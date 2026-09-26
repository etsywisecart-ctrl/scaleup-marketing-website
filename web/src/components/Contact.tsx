"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "./BrandIcon";

const { contact } = siteConfig;

const Ic = {
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
};

const TOPICS = ["Ecommerce store", "Software / SaaS / app", "AI automation", "Digital marketing", "The Academy (courses)", "Something else"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = encodeURIComponent(
      `New enquiry from the website\n\nName: ${f.get("name")}\nEmail: ${f.get("email")}\nInterested in: ${topic}\n\n${f.get("message") || ""}`
    );
    window.open(`${contact.whatsappHref}?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section className="sec" id="contact">
      <div className="wrap ct-grid">
        <div className="ct-copy rv">
          <span className="eyebrow"><i className="dot" />Get in touch</span>
          <h2 className="h2">Let&rsquo;s talk about<br /><span className="accent">your next launch.</span></h2>
          <p className="lead">
            Tell us where you are and where you want to go. We reply within one business day —
            usually within the hour.
          </p>

          <div className="ct-reply"><span className="ct-pulse" />Team online now · avg. reply 42 min</div>

          <div className="ct-info">
            <a href={contact.phoneHref} className="ct-row"><span className="ct-ic">{Ic.phone}</span><span><small>Call us</small>{contact.phoneDisplay}</span></a>
            <a href={`mailto:${contact.email}`} className="ct-row ct-wide"><span className="ct-ic">{Ic.mail}</span><span><small>Email</small>{contact.email}</span></a>
            <div className="ct-row ct-wide"><span className="ct-ic">{Ic.pin}</span><span><small>Visit the campus</small>{contact.addressLine1} {contact.addressLine2}</span></div>
            <div className="ct-row"><span className="ct-ic">{Ic.clock}</span><span><small>Hours</small>{contact.hours}</span></div>
          </div>
        </div>

        <form className="ct-form rv d2" onSubmit={onSubmit}>
          <div className="ct-form-head">
            <b>Send us a message</b>
            <small>Goes straight to our WhatsApp — no inbox black hole.</small>
          </div>
          <div className="ct-row2">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required placeholder="you@company.com" />
            </div>
          </div>
          <div className="field">
            <label>I&rsquo;m interested in</label>
            <div className="ct-chips">
              {TOPICS.map((t) => (
                <button type="button" key={t} className={t === topic ? "on" : ""} onClick={() => setTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows={4} placeholder="A sentence or two about your goals…" />
          </div>
          <button className="btn btn-primary lg ct-send" type="submit">
            <span className="ct-send-ic"><BrandIcon name="whatsapp" /></span>
            {sent ? "Opening WhatsApp…" : "Send on WhatsApp"}
          </button>
        </form>
      </div>
    </section>
  );
}
