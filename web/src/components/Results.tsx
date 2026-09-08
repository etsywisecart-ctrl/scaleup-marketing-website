import { results } from "@/data/content";

const STATS = [
  { to: 500, suf: "+", pre: "", l: "Students trained" },
  { to: 100, suf: "+", pre: "", l: "Projects delivered" },
  { to: 40, suf: "K", pre: "", l: "App downloads shipped" },
  { to: 322, suf: "%", pre: "+", l: "Best YoY sales lift" },
];

const PROOF = [results[0], results[2], results[3]];

export default function Results() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />The proof</span>
          <h2 className="h2">Real numbers, from real dashboards</h2>
          <p className="lead">
            Not vanity metrics — figures pulled straight from client admin panels and app stores.
          </p>
        </div>

        <div className="stats rv" style={{ marginTop: 48 }}>
          {STATS.map((s) => (
            <div className="stat" key={s.l}>
              <b className="num" data-to={s.to} data-pre={s.pre} data-suf={s.suf}>
                {s.pre}0{s.suf}
              </b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-3" style={{ marginTop: 24 }}>
          {PROOF.map((p, i) => (
            <div className={`card rv d${i + 1}`} key={p.name}>
              <div className="cc-top">
                <span className="cc-tag mono">{p.tag}</span>
                <span className="cc-badge">{p.delta}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.line}</p>
              <div className="kpis">
                {p.kpis.map((k) => (
                  <div key={k.l} className="kpi">
                    <b>{k.v}</b>
                    <span>{k.l}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
