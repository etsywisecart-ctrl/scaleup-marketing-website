import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="crumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>/</span>
          {item.href && i !== items.length - 1 ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="now">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
