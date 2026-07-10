import Breadcrumb from "./Breadcrumb";

export default function SubHero({
  crumbs,
  eyebrow,
  title,
  lead,
  chips,
  ctas,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  chips?: string[];
  ctas?: React.ReactNode;
}) {
  return (
    <section className="sec subhero">
      <div className="wrap">
        <div className="rv">
          <Breadcrumb items={crumbs} />
          <p className="eyebrow" style={{ marginTop: 22 }}>
            {eyebrow}
          </p>
          <h1 className="h2" style={{ fontSize: "clamp(38px,5vw,64px)" }}>
            {title}
          </h1>
          <p className="lead" style={{ marginTop: 20, maxWidth: 640 }}>
            {lead}
          </p>
          {chips && chips.length > 0 && (
            <div className="chips">
              {chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          )}
          {ctas && <div className="hcta">{ctas}</div>}
        </div>
      </div>
    </section>
  );
}
