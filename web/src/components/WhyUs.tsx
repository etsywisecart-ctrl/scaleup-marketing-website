import Link from "next/link";
import IndustryMarquee from "./IndustryMarquee";

/* "Partners, not vendors" — a face-off. The typical-vendor panel is muted
   and dashed; the ScaleUp panel is a glowing dark card that clearly wins.
   Each ✗ row on the left maps 1:1 to the ✓ row on the right. */

const VENDOR = [
  "Starts with a template and an hourly meter running",
  "Sales team makes the promises, juniors do the delivery",
  "Trendy stack that gets expensive by year two",
  "Weeks of silence, then one big risky reveal",
  "Handover is a ZIP file and a goodbye",
];

const PARTNER = [
  "Starts from your unit economics — revenue targets before pixels",
  "Senior engineers and sellers on every build — the same team that trains 500+ students",
  "Architecture chosen for year three — boring, proven, cheap to scale",
  "Weekly demos, shared dashboards, fixed quotes — you always know what shipped",
  "Launch includes 30 days of support and your team trained on the admin",
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
            <p className="cmpbadfoot">Sound familiar? There&rsquo;s a better way →</p>
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

        <div className="rv" style={{ marginTop: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 4 }}>
            Industries served
          </p>
          <h3 className="indh">
            Built for every kind of business.
          </h3>
        </div>
      </div>

      <div className="rv">
        <IndustryMarquee />
      </div>
    </section>
  );
}
