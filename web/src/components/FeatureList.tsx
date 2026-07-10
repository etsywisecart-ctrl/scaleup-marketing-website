export default function FeatureList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="feats rv">
      {items.map((item, i) => (
        <div key={item.t} className="feat">
          <span className="feato">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="featt">{item.t}</p>
            <p className="featd">{item.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
