/* A realistic "live class" scene for the Academy: an instructor sharing a
   Shopify lesson, their webcam, a live chat and the student's progress.
   Static markup — the gentle motion lives in CSS ("Academy live" block). */

export default function AcademyLive() {
  return (
    <div className="al" aria-hidden="true">
      <div className="al-window">
        <div className="al-top">
          <span className="al-live"><i />LIVE</span>
          <span className="al-title">Shopify Master · Week 4 — Product pages that convert</span>
          <span className="al-watch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
            86 watching
          </span>
        </div>

        <div className="al-main">
          {/* shared screen: a lesson slide inside a Shopify-like admin */}
          <div className="al-screen">
            <div className="al-slide">
              <div className="al-slide-side">
                {["Home", "Orders", "Products", "Customers", "Analytics"].map((n, i) => (
                  <span key={n} className={i === 2 ? "on" : ""}>{n}</span>
                ))}
              </div>
              <div className="al-slide-main">
                <small>Lesson 4.2</small>
                <b>Anatomy of a high-converting product page</b>
                <div className="al-anatomy">
                  <span className="img" />
                  <div>
                    <span className="ln l1" /><span className="ln l2" />
                    <span className="price">PKR 3,499</span>
                    <span className="cta">Buy now</span>
                  </div>
                </div>
                <div className="al-points">
                  <span><i />Hero image above the fold</span>
                  <span><i />Price + trust badges</span>
                  <span><i />One clear call to action</span>
                </div>
              </div>
            </div>
            <span className="al-pointer" />
            {/* instructor webcam */}
            <div className="al-cam">
              <svg viewBox="0 0 80 60">
                <defs>
                  <linearGradient id="camBg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#334155" /><stop offset="1" stopColor="#0f172a" /></linearGradient>
                </defs>
                <rect width="80" height="60" fill="url(#camBg)" />
                <rect x="52" y="8" width="20" height="26" rx="2" fill="#475569" opacity=".6" />
                <circle cx="38" cy="26" r="10" fill="#c08a64" />
                <path d="M27 22c1-8 21-9 22 1-3-4-8-5-11-3-3-3-8-2-11 2Z" fill="#1f2937" />
                <path d="M18 60c2-13 12-19 20-19s18 6 20 19Z" fill="#10b981" />
              </svg>
              <span className="al-cam-name"><i />Instructor</span>
            </div>
          </div>

          {/* live chat */}
          <div className="al-chat">
            <div className="al-chat-h">Live chat</div>
            <div className="al-msgs">
              <p className="m m1"><b>Ayesha</b>How do I enable COD?</p>
              <p className="m m2 inst"><b>Instructor</b>Settings → Payments → Manual ✓</p>
              <p className="m m3"><b>Bilal</b>Got my first order 🎉</p>
              <p className="m m4"><b>Sana</b>Trust badges added!</p>
            </div>
            <div className="al-input">Ask a question…</div>
          </div>
        </div>

        <div className="al-controls">
          <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          <div className="al-bar"><span /></div>
          <span className="al-time">42:18</span>
          <span className="al-ctl">CC</span>
          <span className="al-ctl">HD</span>
        </div>
      </div>

      {/* floating progress + certificate */}
      <div className="al-progress">
        <div className="al-prog-top"><b>Your progress</b><span>Week 4 of 12</span></div>
        <div className="al-prog-bar"><span /></div>
        <div className="al-cert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5" /><path d="m9 13.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7" /></svg>
          Certificate on completion
        </div>
      </div>
    </div>
  );
}
