import Image from "next/image";

/* Premium Apple-style showcase card for the real client Shopify report.
   Headline + stat tiles + the report floating on a soft gradient stage. */

export default function ShopifyShowcase() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="acard rv">
          <div className="acardglow" aria-hidden="true" />
          <div className="acardhead">
            <p className="eyebrow">Straight from the Shopify admin</p>
            <h2 className="acardh">
              Real client numbers — <span className="grad">not a mockup.</span>
            </h2>
            <p className="acardlead">
              An actual &ldquo;Total sales over time&rdquo; report from a live client store we built
              and scale — pulled straight from the Shopify admin.
            </p>
          </div>

          <div className="acardstats">
            <div className="astat">
              <div className="astatv">1,138</div>
              <div className="astatl">Orders</div>
            </div>
            <div className="astat">
              <div className="astatv">
                A$19,815<span>.60</span>
              </div>
              <div className="astatl">Gross sales</div>
            </div>
            <div className="astat">
              <div className="astatv">
                A$19,568<span>.74</span>
              </div>
              <div className="astatl">Total sales</div>
            </div>
          </div>

          <div className="acardstage">
            <figure className="ashot">
              <div className="shotbar">
                <span className="tl" style={{ background: "#FF5F57" }} />
                <span className="tl" style={{ background: "#FEBC2E" }} />
                <span className="tl" style={{ background: "#28C840" }} />
                <span className="shoturl">
                  Shopify admin · Reports — Total sales over time · live client store
                </span>
              </div>
              <Image
                className="shotimg"
                src="/uploads/shopify-aud.jpg"
                alt="Shopify admin report — Total sales over time: 1,138 orders, A$19,815.60 gross sales for a live client store"
                width={1480}
                height={737}
                sizes="(max-width: 1100px) 92vw, 1000px"
              />
            </figure>
          </div>

          <p className="acardnote">Live client store · figures shared with permission</p>
        </div>
      </div>
    </section>
  );
}
