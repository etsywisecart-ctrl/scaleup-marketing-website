import Link from "next/link";

export default function RelatedLinks({
  items,
}: {
  items: { href: string; title: string; meta: string }[];
}) {
  return (
    <div className="related rv">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="relcard">
          <p className="relt">{item.title}</p>
          <p className="reld">{item.meta}</p>
        </Link>
      ))}
    </div>
  );
}
