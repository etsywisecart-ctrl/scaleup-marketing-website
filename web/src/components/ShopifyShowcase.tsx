import Image from "next/image";
import Link from "next/link";

/* Case-study style showcase: the real client Shopify report presented on a
   vibrant brand-gradient stage, with the project name + description beside it. */

export default function ShopifyShowcase() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="cstudy rv">
          <div className="csstage">
            <span className="csglow csglow1" aria-hidden="true" />
            <span className="csglow csglow2" aria-hidden="true" />
            <figure className="csframe">
              <div className="shotbar">
                <span className="tl" style={{ background: "#FF5F57" }} />
                <span className="tl" style={{ background: "#FEBC2E" }} />
                <span className="tl" style={{ background: "#28C840" }} />
                <span className="shoturl">Shopify admin · Total sales over time</span>
              </div>
              <Image
                className="shotimg"
                src="/uploads/shopify-aud.jpg"
                alt="Shopify admin report — Total sales over time: 1,138 orders, A$19,815.60 gross sales for a live client store"
                width={1480}
                height={737}
                sizes="(max-width: 980px) 92vw, 640px"
              />
            </figure>
          </div>

          <div className="csbody">
            <p className="eyebrow">Client build · Shopify</p>
            <h2 className="csh">
              Real numbers from a <span className="grad">live client store.</span>
            </h2>
            <p className="cstext">
              We turned a Shopify store into a revenue engine — full-cycle build, theme, payments,
              ads and ops. These figures are pulled straight from the client&rsquo;s Shopify admin,
              shared with permission.
            </p>
            <div className="csmetrics">
              <div className="csmet">
                <span className="csmv">1,138</span>
                <span className="csml">Orders</span>
              </div>
              <div className="csmet">
                <span className="csmv">A$19.8K</span>
                <span className="csml">Gross sales</span>
              </div>
              <div className="csmet">
                <span className="csmv">+322%</span>
                <span className="csml">YoY growth</span>
              </div>
            </div>
            <Link className="btn btnG" href="/#contact" style={{ marginTop: 28 }}>
              Book a free scoping call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
