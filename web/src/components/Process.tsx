import { steps } from "@/data/content";

export default function Process() {
  return <section className="sec process-section" id="process"><div className="wrap">
    <div className="process-head rv"><div><span className="eyebrow"><i className="dot"/>How we work</span><h2 className="h2">From messy idea to <span className="accent">working system.</span></h2></div><p className="lead">A clear six-stage delivery loop keeps strategy, design, engineering and growth connected — with visible progress at every step.</p></div>
    <div className="process-track">{steps.map((s,i)=><article className={`process-step rv d${(i%4)+1}`} key={s.n}><span className="process-num">{s.n}</span><div className="process-node"><span/></div><h3>{s.t}</h3><p>{s.d}</p>{i<steps.length-1&&<div className="process-arrow" aria-hidden="true">→</div>}</article>)}</div>
  </div></section>;
}