import Link from "next/link";

export default function RelatedLinks({
  items,
}: {
  items: { href: string; title: string; meta: string }[];
}) {
  return (
    <div className="grid grid-2" style={{ marginTop: 40 }}>
      {items.map((it, i) => (
        <Link key={it.href} href={it.href} className={`rel-card card rv d${(i % 2) + 1}`}>
          <div className="rel-body">
            <h3>{it.title}</h3>
            <p>{it.meta}</p>
          </div>
          <span className="rel-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
