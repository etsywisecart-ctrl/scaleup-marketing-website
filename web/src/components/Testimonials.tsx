import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="sec" style={{ background: "var(--sunk)" }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i className="dot" />Client &amp; graduate stories</span>
          <h2 className="h2">The results speak. So do they.</h2>
        </div>

        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {testimonials.slice(0, 3).map((t, i) => (
            <figure className={`tcard rv d${i + 1}`} key={t.name}>
              <span className="tcard-metric">{t.metric}</span>
              <blockquote>“{t.q}”</blockquote>
              <figcaption>
                <span className="tavatar">{t.ini}</span>
                <span>
                  <b>{t.name}</b>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid grid-2" style={{ marginTop: 24 }}>
          {testimonials.slice(3, 5).map((t, i) => (
            <figure className={`tcard rv d${i + 1}`} key={t.name}>
              <span className="tcard-metric">{t.metric}</span>
              <blockquote>“{t.q}”</blockquote>
              <figcaption>
                <span className="tavatar">{t.ini}</span>
                <span>
                  <b>{t.name}</b>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
