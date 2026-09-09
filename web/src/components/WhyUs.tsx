const POINTS = [
  { t: "Fixed quotes, in writing", d: "You approve a line-itemed price before a single hour is billed. No hourly surprises, ever." },
  { t: "A working demo every Friday", d: "You see real, clickable progress every week — from the very first sprint." },
  { t: "Operators, not lecturers", d: "The people who teach are the same people who ship client stores and run the ad accounts." },
  { t: "One team, the whole journey", d: "Build, launch, market and train under a single roof — no vendor hand-offs." },
];

export default function WhyUs() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />Why ScaleUp</span>
          <h2 className="h2">A partner, not a vendor</h2>
        </div>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {POINTS.map((p, i) => (
            <div className={`point rv d${(i % 2) + 1}`} key={p.t}>
              <span className="point-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7" />
                </svg>
              </span>
              <div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
