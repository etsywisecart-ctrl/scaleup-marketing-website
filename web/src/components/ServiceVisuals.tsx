/* Realistic, code-built product scenes for each service card.
   Pure markup + CSS keyframe loops (see "Service scenes" in globals.css),
   so they stay crisp at any size and cost nothing to load. */

export function VisStore() {
  return (
    <div className="vs vs-store" aria-hidden="true">
      <div className="vs-bar"><i /><i /><i /><span>yourbrand.pk/products</span></div>
      <div className="vs-store-body">
        <div className="vs-prod-img">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M14 36a18 18 0 0 1 36 0" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
            <rect x="9" y="34" width="11" height="17" rx="4" fill="#111827" />
            <rect x="44" y="34" width="11" height="17" rx="4" fill="#111827" />
            <rect x="12" y="37" width="5" height="11" rx="2" fill="#10b981" />
            <rect x="47" y="37" width="5" height="11" rx="2" fill="#10b981" />
          </svg>
          <span className="vs-sale">-25%</span>
        </div>
        <div className="vs-prod-info">
          <b>Wireless Headphones</b>
          <span className="vs-stars">★★★★★ <em>(128)</em></span>
          <span className="vs-price">PKR 7,499 <s>9,999</s></span>
          <span className="vs-btn">Add to cart</span>
        </div>
      </div>
      <div className="vs-toast"><span className="vs-toast-dot" />New order · Lahore · PKR 7,499</div>
    </div>
  );
}

export function VisChat() {
  return (
    <div className="vs vs-chat" aria-hidden="true">
      <div className="vs-chat-head"><span className="vs-avatar">AI</span><div><b>OmniChat AI</b><small><i />WhatsApp · online</small></div></div>
      <div className="vs-chat-body">
        <p className="bub in b1">Do you have wireless earbuds?</p>
        <p className="bub out b2">Yes! Galaxy Buds — PKR 12,499. Want a payment link?</p>
        <p className="bub in b3">Yes please 🙌</p>
        <p className="bub out b4 typing"><i /><i /><i /></p>
      </div>
    </div>
  );
}

export function VisAds() {
  return (
    <div className="vs vs-ads" aria-hidden="true">
      <div className="vs-ads-top">
        <div><small>Return on ad spend</small><b>4.8×</b></div>
        <span className="vs-up">▲ 28% this week</span>
      </div>
      <svg className="vs-chart" viewBox="0 0 220 70" preserveAspectRatio="none">
        <defs>
          <linearGradient id="adsFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0ea5e9" stopOpacity=".35" />
            <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="vs-area" d="M0 60 L25 52 L50 55 L75 40 L100 44 L125 30 L150 33 L175 18 L200 20 L220 8 L220 70 L0 70 Z" fill="url(#adsFill)" />
        <path className="vs-line" d="M0 60 L25 52 L50 55 L75 40 L100 44 L125 30 L150 33 L175 18 L200 20 L220 8" fill="none" stroke="#0ea5e9" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" pathLength={1} />
      </svg>
      <div className="vs-ads-rows">
        <div><span className="dot" style={{ background: "#1877f2" }} />Meta Ads<em>Active</em><b>PKR 42k</b></div>
        <div><span className="dot" style={{ background: "#fe2c55" }} />TikTok Ads<em>Active</em><b>PKR 18k</b></div>
      </div>
    </div>
  );
}

export function VisOrders() {
  return (
    <div className="vs vs-orders" aria-hidden="true">
      <div className="vs-orders-top"><b>Orders today</b><span>38</span></div>
      {[
        { id: "#1042", n: "Ayesha K.", s: "Delivered", c: "ok" },
        { id: "#1043", n: "Bilal R.", s: "Shipped", c: "ship" },
        { id: "#1044", n: "Sana M.", s: "Packed", c: "pack" },
      ].map((o) => (
        <div className="vs-order" key={o.id}>
          <span className="vs-oid">{o.id}</span>
          <span className="vs-on">{o.n}</span>
          <span className={`vs-pill ${o.c}`}>{o.s}</span>
        </div>
      ))}
      <div className="vs-track"><span /></div>
    </div>
  );
}

export function VisDesign() {
  return (
    <div className="vs vs-design" aria-hidden="true">
      <div className="vs-design-left">
        <div className="vs-swatches">{["#0f172a", "#ec4899", "#f59e0b", "#10b981", "#e2e8f0"].map((c) => <i key={c} style={{ background: c }} />)}</div>
        <div className="vs-type"><b>Aa</b><small>Poppins · Inter</small></div>
        <div className="vs-logo"><span>S</span>Studio</div>
      </div>
      <div className="vs-phone">
        <span className="vs-ph-hero" />
        <span className="vs-ph-l w1" />
        <span className="vs-ph-l w2" />
        <span className="vs-ph-cta" />
      </div>
      <svg className="vs-cursor" viewBox="0 0 16 16"><path d="M2 1l11 6-5 1.4L6 14z" fill="#0f172a" stroke="#fff" strokeWidth="1" /></svg>
    </div>
  );
}

export function VisCRM() {
  return (
    <div className="vs vs-crm" aria-hidden="true">
      {[
        { t: "Leads", n: 12, cards: ["Retail brand", "Clinic"] },
        { t: "Proposal", n: 5, cards: ["Fashion store"] },
        { t: "Won", n: 8, cards: ["Restaurant POS", "ERP rollout"] },
      ].map((col) => (
        <div className="vs-col" key={col.t}>
          <div className="vs-col-h">{col.t}<em>{col.n}</em></div>
          {col.cards.map((c) => <div className="vs-kcard" key={c}>{c}</div>)}
        </div>
      ))}
      <div className="vs-kcard vs-mover">Tech startup</div>
    </div>
  );
}
