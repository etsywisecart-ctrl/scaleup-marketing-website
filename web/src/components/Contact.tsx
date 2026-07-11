"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Al+Latif+Center+Gulberg+III+Lahore";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [interest, setInterest] = useState("Ecommerce store");
  const { contact } = siteConfig;

  // The form delivers through WhatsApp — no silent dead-end submissions.
  const waMessage = () => {
    const lines = [
      `Hi ScaleUp! I'm ${name.trim() || "…"}.`,
      goal.trim() ? `My business/goal: ${goal.trim()}.` : "",
      `Interested in: ${interest}.`,
      "I'd like to book a free strategy call.",
    ].filter(Boolean);
    return `${contact.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submit = () => {
    window.open(waMessage(), "_blank", "noopener");
    setSent(true);
  };

  return (
    <section className="sec" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta rv">
          <div className="ctablob" />
          <div className="ctagrid">
            <div>
              <p className="eyebrow" style={{ color: "#5FD6BC" }}>
                Final boarding call
              </p>
              <h2 className="ctah">Ready to build something that scales?</h2>
              <p className="ctad">
                One call. We map your goal, quote it straight, and you leave with a plan — whether
                or not you hire us or enroll.
              </p>
              <div className="cways">
                <a className="cway" href={contact.phoneHref}>
                  <span className="cwico">
                    <Icon>
                      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                    </Icon>
                  </span>
                  <div>
                    <p className="cwt">Call us</p>
                    <p className="cwd">{contact.phoneDisplay}</p>
                  </div>
                </a>
                <a className="cway" href={`mailto:${contact.email}`}>
                  <span className="cwico">
                    <Icon>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </Icon>
                  </span>
                  <div>
                    <p className="cwt">Email</p>
                    <p className="cwd">{contact.email}</p>
                  </div>
                </a>
                <a className="cway" href={contact.whatsappHref}>
                  <span className="cwico">
                    <Icon>
                      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
                      <path d="M8.5 9.5c0 4 6 6.5 7 5.5l.8-1.3-2.3-1.2-1 .7a6 6 0 0 1-2.7-2.7l.7-1-1.2-2.3-1.3.8Z" />
                    </Icon>
                  </span>
                  <div>
                    <p className="cwt">WhatsApp</p>
                    <p className="cwd">Fastest — replies in minutes</p>
                  </div>
                </a>
                <a className="cway" href={MAPS_HREF} target="_blank" rel="noopener noreferrer">
                  <span className="cwico">
                    <Icon>
                      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </Icon>
                  </span>
                  <div>
                    <p className="cwt">Visit the campus</p>
                    <p className="cwd">
                      {contact.addressLine1} {contact.addressLine2} · Mon–Sat
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="form">
              {!sent ? (
                <>
                  <h3 className="ft">Request a call back</h3>
                  <p className="fd">
                    Fill this in and it opens WhatsApp with your details ready to send — a
                    strategist replies within 24 hours.
                  </p>
                  <div>
                    <p className="lab">Your name</p>
                    <input
                      className="inp"
                      type="text"
                      placeholder="Ayesha Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="lab">Your business or goal</p>
                    <input
                      className="inp"
                      type="text"
                      placeholder="e.g. Launching a skincare brand on Shopify"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="lab">Interested in</p>
                    <select className="inp" value={interest} onChange={(e) => setInterest(e.target.value)}>
                      <option>Ecommerce store</option>
                      <option>Web or SaaS product</option>
                      <option>Mobile app</option>
                      <option>AI automation</option>
                      <option>Training &amp; courses</option>
                      <option>Not sure yet — advise me</option>
                    </select>
                  </div>
                  <button
                    className="btn btnG"
                    onClick={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                    style={{ width: "100%" }}
                  >
                    Book my strategy call
                  </button>
                  <p className="fnote">NO SPAM · NO OBLIGATION · FREE CONSULTATION</p>
                </>
              ) : (
                <div className="sent">
                  <div className="pico" style={{ width: 56, height: 56, borderRadius: 16 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4.5 12.5 5 5 10-11" />
                    </svg>
                  </div>
                  <h3 className="sentt">Almost there — hit send.</h3>
                  <p className="sentd">
                    We opened WhatsApp with your details pre-filled. Send the message and a
                    strategist (not a salesperson) replies within 24 hours. Didn&rsquo;t open?
                  </p>
                  <a className="btn btnO sm" href={waMessage()} target="_blank" rel="noopener noreferrer">
                    Open WhatsApp again
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
