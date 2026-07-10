"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export default function Showreel() {
  const [playing, setPlaying] = useState(false);
  const [timecode, setTimecode] = useState("0:00");
  const winRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(0);

  useEffect(() => {
    if (!siteConfig.toggles.motion || !winRef.current) return;
    const el = winRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlaying(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!siteConfig.toggles.motion) return;
    const timer = setInterval(() => {
      if (!playing) return;
      tRef.current = (tRef.current + 0.2) % 14.5;
      setTimecode("0:" + String(Math.min(58, Math.round((tRef.current / 14.5) * 58))).padStart(2, "0"));
    }, 200);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <section className="sec vidsec" id="showreel">
      <div className="wrap vidwrap">
        <div className="rv">
          <p className="eyebrow">See it in action</p>
          <h2 className="h2">Watch a store go from zero to checkout.</h2>
          <p className="lead" style={{ marginTop: 20 }}>
            A 58-second build reel: theme engineering, catalog import, payment routing, and the
            first live order — condensed from a real client sprint.
          </p>
          <div className="vlist">
            <div className="vli">
              <span className="vnum">0:04</span>Theme scaffold and brand system applied
            </div>
            <div className="vli">
              <span className="vnum">0:19</span>Catalog, shipping zones &amp; payment gateways wired
            </div>
            <div className="vli">
              <span className="vnum">0:41</span>Meta pixel firing — first test order placed
            </div>
          </div>
        </div>
        <div className="rv">
          <div ref={winRef} className={`vwin${playing ? " go" : ""}`}>
            <div className="vbar">
              <span className="tl" style={{ background: "#FF5F57" }} />
              <span className="tl" style={{ background: "#FEBC2E" }} />
              <span className="tl" style={{ background: "#28C840" }} />
              <span className="vurl">aurelia-skin.myshopify.com — build in progress…</span>
            </div>
            <div className="vbody" onClick={() => setPlaying((v) => !v)}>
              <div className="vstore">
                <div className="vsnav va">
                  <span className="vsnavbrand">
                    <span className="ddot" style={{ width: 12, height: 12 }} />
                    <span className="vsb">AURELIA SKIN</span>
                  </span>
                  <span className="vslinks">Shop&nbsp;&nbsp;&nbsp;Bestsellers&nbsp;&nbsp;&nbsp;About</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0E2A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8h12l-1.2 12H7.2L6 8Z" />
                    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                  </svg>
                </div>
                <div className="vshero va">
                  <div className="vsh1">Glow, naturally.</div>
                  <div className="vsh2">Clean skincare, shipped nationwide in 48h</div>
                  <span className="vsbtn">Shop now</span>
                </div>
                <div className="vsprods">
                  <div className="vsp va aC1">
                    <div className="vsimg g1" />
                    <div className="vspn">Vitamin C Serum</div>
                    <div className="vspp">
                      $43.00<span className="vsbuy">Buy</span>
                    </div>
                  </div>
                  <div className="vsp va aC2">
                    <div className="vsimg g2" />
                    <div className="vspn">Night Repair Set</div>
                    <div className="vspp">$129.00</div>
                  </div>
                  <div className="vsp va aC3">
                    <div className="vsimg g3" />
                    <div className="vspn">Rose Cleanser</div>
                    <div className="vspp">$24.50</div>
                  </div>
                </div>
                <div className="vschips">
                  <span className="vsc va aCh1">✓ Shipping zones set</span>
                  <span className="vsc va aCh2">✓ Payments: Cards + COD</span>
                  <span className="vsc pix va aCh3">● Meta Pixel live</span>
                </div>
                <div className="vstoast va">✓ Test order #1001 — Vitamin C Serum · $43.00 paid</div>
                <svg className="vscur va" viewBox="0 0 20 20">
                  <path d="M3 1.5 15.5 13l-5.8.9L12.6 20l-3 1.2-2.8-6L3 18.5Z" fill="#0E2A38" stroke="#fff" strokeWidth="1.4" />
                </svg>
              </div>
              <div className={`vplay${playing ? " off" : ""}`}>
                <div className="pbtn">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </div>
              </div>
              <span className="vtag">VIDEO PLACEHOLDER · AI-GENERATED BUILD REEL</span>
              <span className="vtime">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
                <span>{timecode}</span>&nbsp;/ 0:58 · Store build time-lapse
              </span>
              <div className="vprog">
                <div className="vprogf va" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
