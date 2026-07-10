import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="sec softband" id="voices" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">In their words</p>
          <h2 className="h2">
            Clients and students, <span className="grad">same verdict.</span>
          </h2>
        </div>
        <div className="trow">
          {testimonials.map((t) => (
            <div key={t.name} className="tcard rv">
              <span className="tmetric">{t.metric}</span>
              <p className="tq">&ldquo;{t.q}&rdquo;</p>
              <div className="tfoot">
                <div className={`av ${t.av}`}>{t.ini}</div>
                <div>
                  <p className="tn">{t.name}</p>
                  <p className="tr">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
