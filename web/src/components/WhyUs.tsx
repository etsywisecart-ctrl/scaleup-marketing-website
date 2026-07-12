import Link from "next/link";

/* "Partners, not vendors" — a face-off. The typical-vendor panel is muted
   and dashed; the ScaleUp panel is a glowing dark card that clearly wins.
   Each ✗ row on the left maps 1:1 to the ✓ row on the right. */

const VENDOR = [
  "Starts with a template and an hourly meter running",
  "Sales team makes the promises, juniors do the delivery",
  "Trendy stack that gets expensive by year two",
  "Weeks of silence, then one big risky reveal",
];

const PARTNER = [
  "Starts from your unit economics — revenue targets before pixels",
  "Senior engineers and sellers on every build — the same team that trains 500+ students",
  "Architecture chosen for year three — boring, proven, cheap to scale",
  "Weekly demos, shared dashboards, fixed quotes — you always know what shipped",
];

const industries = [
  { name: "Retail & Ecommerce", c: "#2FBF9E" },
  { name: "Healthcare", c: "#E64980" },
  { name: "Education", c: "#3F83F8" },
  { name: "Real Estate", c: "#B8860B" },
  { name: "Manufacturing", c: "#64748B" },
  { name: "Construction", c: "#F06E2D" },
  { name: "Hospitality", c: "#7C5CFC" },
  { name: "Startups", c: "#F2C94C" },
];

export default function WhyUs() {
  return (
    <section className="sec softband" id="why">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Why teams stay</p>
          <h2 className="h2">
            Built like partners, <span className="grad">not vendors.</span>
          </h2>
        </div>

        <div className="cmpwrap rv">
          <span className="cmpvs" aria-hidden="true">
            VS
          </span>

          <div className="cmpcard cmpbad">
            <span className="cmptag">TYPICAL VENDOR</span>
            <h3 className="cmph">The usual agency</h3>
            {VENDOR.map((t, i) => (
              <div key={t} className="cmprow rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="cmpx" aria-hidden="true">
                  ✗
                </span>
                {t}
              </div>
            ))}
          </div>

          <div className="cmpcard cmpgood">
            <span className="cmpglow" aria-hidden="true" />
            <span className="cmptag good">SCALEUP — THE PARTNER</span>
            <h3 className="cmph good">Working with ScaleUp</h3>
            {PARTNER.map((t, i) => (
              <div key={t} className="cmprow good rv" style={{ transitionDelay: `${i * 90 + 120}ms` }}>
                <span className="cmpc" aria-hidden="true">
                  ✓
                </span>
                {t}
              </div>
            ))}
            <Link className="cmplink" href="/#contact">
              Experience the difference — free consultation →
            </Link>
          </div>
        </div>

        <div className="rv" style={{ marginTop: 52 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            Industries served
          </p>
          <div className="inds" style={{ marginTop: 0 }}>
            {industries.map((i) => (
              <span key={i.name} className="ind">
                <span className="inddot" style={{ background: i.c }} />
                {i.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
