/* Industries served — a premium auto-scrolling marquee of bold gradient
   cards, each with an icon and a large faded watermark. Two identical
   groups make the loop seamless; hovering pauses it. Pure CSS motion. */

type Ind = { name: string; c1: string; c2: string; icon: React.ReactNode };

const I = (children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const INDUSTRIES: Ind[] = [
  { name: "Retail & Ecommerce", c1: "#34D8B4", c2: "#12977C", icon: I(<><path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></>) },
  { name: "Fashion", c1: "#F15FA6", c2: "#B31E76", icon: I(<><path d="M9 4a3 3 0 0 0 6 0" /><path d="M9 4 4 8l2.5 3L8 10v10h8V10l1.5 1L20 8l-5-4" /></>) },
  { name: "Skincare", c1: "#4FD1A0", c2: "#0E9E74", icon: I(<><path d="M12 3c3 4 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5 5-9Z" /><path d="M10.5 14a2 2 0 0 0 2 2" /></>) },
  { name: "Healthcare", c1: "#F55D7A", c2: "#D63450", icon: I(<><path d="M3 12h4l2-5 3 10 2-6 1.5 1H21" /></>) },
  { name: "Education", c1: "#5B9BF9", c2: "#2F6BD8", icon: I(<><path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5M21 9v5" /></>) },
  { name: "Real Estate", c1: "#E3B048", c2: "#B07C12", icon: I(<><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" /></>) },
  { name: "Manufacturing", c1: "#8492A9", c2: "#525F79", icon: I(<><path d="M3 21V10l6 4V10l6 4V6l6 4v11H3Z" /><path d="M7 21v-4M13 21v-4M18 21v-4" /></>) },
  { name: "Construction", c1: "#FB8A4C", c2: "#E1591F", icon: I(<><path d="M4 20h16" /><path d="M6 20V9l6-4 6 4v11" /><path d="M4 9h16" /><path d="M10 20v-5h4v5" /></>) },
  { name: "Hospitality", c1: "#9B7CFF", c2: "#6D45E8", icon: I(<><path d="M4 18v-5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5" /><path d="M2 18h20M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></>) },
  { name: "Startups", c1: "#F7CB4C", c2: "#E0A315", icon: I(<><path d="M12 3c3 1 6 4.5 6 9l-2.5 3h-7L6 12c0-4.5 3-8 6-9Z" /><circle cx="12" cy="10" r="1.6" /><path d="M8.5 18c-1 1-1 3-1 3s2 0 3-1M15.5 18c1 1 1 3 1 3s-2 0-3-1" /></>) },
];

function Card({ ind, hidden }: { ind: Ind; hidden?: boolean }) {
  return (
    <span
      className="indcard"
      style={{ "--c1": ind.c1, "--c2": ind.c2 } as React.CSSProperties}
      aria-hidden={hidden || undefined}
    >
      <span className="indwm" aria-hidden="true">{ind.icon}</span>
      <span className="indico">{ind.icon}</span>
      <span className="indname">{ind.name}</span>
    </span>
  );
}

export default function IndustryMarquee() {
  return (
    <div className="indmq">
      <div className="indtrack">
        <div className="indgroup">
          {INDUSTRIES.map((ind) => (
            <Card key={`a-${ind.name}`} ind={ind} />
          ))}
        </div>
        <div className="indgroup">
          {INDUSTRIES.map((ind) => (
            <Card key={`b-${ind.name}`} ind={ind} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}
