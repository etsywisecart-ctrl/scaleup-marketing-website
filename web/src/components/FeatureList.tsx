export default function FeatureList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid grid-2" style={{ marginTop: 44 }}>
      {items.map((f, i) => (
        <div className={`point rv d${(i % 2) + 1}`} key={f.t}>
          <span className="point-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7" />
            </svg>
          </span>
          <div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
