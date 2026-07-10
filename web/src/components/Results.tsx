import { results } from "@/data/content";

export default function Results() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 660 }}>
          <p className="eyebrow">Client &amp; student outcomes</p>
          <h2 className="h2">
            Proof, <span className="grad">not promises.</span>
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            A mix of agency builds and academy graduates — because both sides of the house ship
            results.
          </p>
        </div>
        <div className="rgrid">
          {results.map((r) => (
            <div key={r.name} className="rtile rv">
              <div className="rhead">
                <h3 className="rname">{r.name}</h3>
                <span className="rtag">{r.tag}</span>
              </div>
              <p className="rline">{r.line}</p>
              <svg className="spark" viewBox="0 0 100 40" preserveAspectRatio="none">
                <polyline points={r.pts} fill="none" stroke="#2FBF9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points={r.base} fill="none" stroke="#E0EBE8" strokeWidth="1.5" strokeDasharray="3 4" />
              </svg>
              <div className="rfoot">
                <span className="rdelta">{r.delta}</span>
                <span className="rmore">{r.more}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="secta rv">
          <a className="btn btnG" href="#contact">
            Make your store tile #7
          </a>
          <span className="softline">Full case studies shared on your strategy call.</span>
        </div>
      </div>
    </section>
  );
}
