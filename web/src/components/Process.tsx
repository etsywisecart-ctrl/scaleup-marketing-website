import Link from "next/link";
import { steps } from "@/data/content";

// teal -> navy journey, one gradient per step
const orbGrad = [
  ["#63DBC2", "#2FBF9E"],
  ["#2FBF9E", "#17A78C"],
  ["#1CA592", "#0F8F7C"],
  ["#158E86", "#0E7069"],
  ["#12786F", "#0E5462"],
  ["#0E556A", "#0E3B52"],
];

export default function Process() {
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">How engagements run</p>
          <h2 className="h2">
            Six steps. <span className="grad">Zero mystery.</span>
          </h2>
        </div>
        <div className="steps">
          <div className="stline" />
          {steps.map((s, i) => (
            <div key={s.n} className="step rv">
              <div
                className="storb"
                style={{
                  background: `linear-gradient(145deg, ${orbGrad[i][0]}, ${orbGrad[i][1]})`,
                  boxShadow: `0 22px 40px -16px ${orbGrad[i][1]}, inset 0 2px 6px rgba(255,255,255,.4), inset 0 -10px 18px rgba(0,0,0,.16)`,
                  animationDelay: `${-i * 0.6}s`,
                }}
              >
                <span className="storbn">{s.n}</span>
              </div>
              <h3 className="stt">{s.t}</h3>
              <p className="std">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="secta rv">
          <Link className="btn btnO" href="/#contact">
            Start at step one — it is free
          </Link>
        </div>
      </div>
    </section>
  );
}
