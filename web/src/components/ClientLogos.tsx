/* Placeholder client logos — invented brand marks meant to be swapped for
   the real client logos later. Each is an inline monochrome SVG + wordmark. */

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const CLIENTS = [
  { name: "Aurelia Skin", color: "#D6467E", mark: <Mark><path d="M12 3c3.5 4 6 6.8 6 10a6 6 0 0 1-12 0c0-3.2 2.5-6 6-10Z" /></Mark> },
  { name: "TrimTech", color: "#2F6BD8", mark: <Mark><path d="M14.7 6.3a4 4 0 0 0-5.2 5.2l-6 6 2 2 6-6a4 4 0 0 0 5.2-5.2l-2.3 2.3-2-2 2.3-2.3Z" /></Mark> },
  { name: "FitFuel", color: "#E8622A", mark: <Mark><path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" /></Mark> },
  { name: "RGM Stone", color: "#5B6B8C", mark: <Mark><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></Mark> },
  { name: "Karachi Kart", color: "#12957E", mark: <Mark><path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></Mark> },
  { name: "NorthPeak", color: "#2551C4", mark: <Mark><path d="m3 20 6-12 4 6 2-3 6 9H3Z" /></Mark> },
  { name: "Lumen Health", color: "#0E9F8E", mark: <Mark><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></Mark> },
  { name: "Vanta Realty", color: "#B8860B", mark: <Mark><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" /></Mark> },
  { name: "BrightCart", color: "#E0902A", mark: <Mark><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" /></Mark> },
  { name: "Meridian", color: "#4E9A2E", mark: <Mark><path d="M12 21c0-6 2-11 6-14-1 5 1 8-6 14ZM12 21c0-6-2-11-6-14 1 5-1 8 6 14Z" /></Mark> },
  { name: "Craftly", color: "#6D4FE0", mark: <Mark><path d="m12 3 4 5-4 13-4-13 4-5Z" /><path d="M8 8h8" /></Mark> },
  { name: "PulseHR", color: "#E23A63", mark: <Mark><path d="M3 12h4l2-5 3 10 2-7 2 2h5" /></Mark> },
];

export default function ClientLogos() {
  return (
    <section className="sec" id="clients" style={{ paddingBottom: 96 }}>
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Trusted by</p>
          <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
            Brands and founders <span className="grad">we&rsquo;ve shipped for.</span>
          </h2>
        </div>
        <div className="lwall rv">
          {CLIENTS.map((c) => (
            <div key={c.name} className="lcell" style={{ color: c.color }}>
              {c.mark}
              <span className="lname">{c.name}</span>
            </div>
          ))}
        </div>
        <p className="softline rv" style={{ marginTop: 18, textAlign: "center" }}>
          A selection of client engagements across retail, tools, health, and property.
        </p>
      </div>
    </section>
  );
}
