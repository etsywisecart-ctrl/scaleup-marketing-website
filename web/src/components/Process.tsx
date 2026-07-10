import Link from "next/link";
import { steps } from "@/data/content";

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
          {steps.map((s) => (
            <div key={s.n} className="step rv">
              <div className="stdot">{s.n}</div>
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
