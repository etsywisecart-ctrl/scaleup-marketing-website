const BRANDS = [
  "Shopify", "TikTok Shop", "Daraz", "eBay", "Etsy",
  "WooCommerce", "Meta Ads", "Payoneer", "Flutter", "OpenAI",
];

export default function ClientLogos() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="sec-tight" aria-label="Platforms we work with">
      <div className="wrap rv">
        <p className="mono" style={{ textAlign: "center", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 26px" }}>
          The platforms we build, sell and teach on
        </p>
      </div>
      <div className="marq">
        <div className="marq-row">
          {row.map((b, i) => (
            <span className="marq-item" key={i}>
              <i />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
