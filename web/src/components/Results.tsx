import Link from "next/link";
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
            Real projects, real dashboards — the specific work we did and the numbers it moved.
          </p>
        </div>
        <div className="rgrid">
          {results.map((r) => {
            const peak = Math.max(...r.bars);
            return (
              <div key={r.name} className="rtile rv">
                <div className="rhead">
                  <h3 className="rname">{r.name}</h3>
                  <span className="rtag">{r.tag}</span>
                </div>
                <p className="rline">{r.line}</p>

                <div className="rkpis">
                  {r.kpis.map((k) => (
                    <div key={k.l} className="rkpi">
                      <span className="rkpv">{k.v}</span>
                      <span className="rkpl">{k.l}</span>
                    </div>
                  ))}
                </div>

                <div className="rchart" aria-hidden="true">
                  <div className="rclabel">{r.unit}</div>
                  <div className="rbars">
                    {r.bars.map((h, i) => (
                      <span
                        key={i}
                        className={`rbar${h === peak ? " peak" : ""}`}
                        style={{ height: h + "%", transitionDelay: i * 70 + "ms" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rwork">
                  {r.work.map((w) => (
                    <span key={w} className="rwchip">
                      {w}
                    </span>
                  ))}
                </div>

                <div className="rfoot">
                  <span className="rdelta">{r.delta}</span>
                  <span className="rmore">{r.more}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="secta rv">
          <Link className="btn btnG" href="/#contact">
            Make your store tile #7
          </Link>
          <span className="softline">Full case studies shared on your strategy call.</span>
        </div>
      </div>
    </section>
  );
}
