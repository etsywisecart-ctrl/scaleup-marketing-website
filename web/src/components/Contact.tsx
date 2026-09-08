"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg =
      `New enquiry from the website%0A%0A` +
      `Name: ${f.get("name")}%0A` +
      `Email: ${f.get("email")}%0A` +
      `Interested in: ${f.get("topic")}%0A%0A` +
      `${f.get("message")}`;
    window.open(`${contact.whatsappHref}?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section className="sec" id="contact">
      <div className="wrap contact-grid">
        <div className="rv">
          <span className="eyebrow"><i className="dot" />Get in touch</span>
          <h2 className="h2" style={{ margin: "18px 0 16px" }}>Let’s talk about your next launch</h2>
          <p className="lead" style={{ maxWidth: 420 }}>
            Tell us where you are and where you want to go. We’ll reply within one business day —
            usually much sooner.
          </p>
          <div className="contact-info">
            <a href={contact.phoneHref} className="ci-row"><span className="ci-ic">☎</span>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`} className="ci-row"><span className="ci-ic">✉</span>{contact.email}</a>
            <div className="ci-row"><span className="ci-ic">◈</span>{contact.addressLine1} {contact.addressLine2}</div>
            <div className="ci-row"><span className="ci-ic">◷</span>{contact.hours}</div>
          </div>
        </div>

        <form className="contact-form neu rv d2" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" required placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" required placeholder="you@company.com" />
          </div>
          <div className="field">
            <label htmlFor="c-topic">I’m interested in</label>
            <select id="c-topic" name="topic" defaultValue="Ecommerce store">
              <option>Ecommerce store</option>
              <option>Software / SaaS / app</option>
              <option>AI automation</option>
              <option>The Academy (courses)</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows={4} placeholder="A sentence or two about your goals…" />
          </div>
          <button className="btn btn-primary lg" type="submit" style={{ width: "100%" }}>
            {sent ? "Opening WhatsApp…" : "Send message"}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
          <p className="form-note">Sends straight to our WhatsApp — no inbox black hole.</p>
        </form>
      </div>
    </section>
  );
}
