/* Client logo wall — 12 hand-drawn SVG logotypes, each with its own
   typographic voice and lockup (icon+wordmark, monogram badge, two-tone
   wordmark, serif, mono, script-accent) so the wall reads like real
   brands, not one template. Ink #0E2A38 stays legible because the wall
   tiles remain white in dark mode. */

const INK = "#0E2A38";
const SANS = "Satoshi, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "var(--font-jetbrains-mono), monospace";

const LOGOS: { name: string; node: React.ReactNode }[] = [
  {
    name: "Aurelia Skin",
    node: (
      <svg viewBox="0 0 148 40" height="30" aria-hidden="true">
        <path
          d="M11 7c3.2 5.4 6.4 8.6 6.4 12.6a6.4 6.4 0 1 1-12.8 0C4.6 15.6 7.8 12.4 11 7Z"
          fill="#C2416B"
        />
        <text x="26" y="26" fontFamily={SERIF} fontSize="17" letterSpacing="3" fill="#C2416B">
          AURELIA
        </text>
      </svg>
    ),
  },
  {
    name: "TrimTech",
    node: (
      <svg viewBox="0 0 152 40" height="30" aria-hidden="true">
        <g transform="translate(2 8)">
          <path
            d="M12 0l10.4 6v12L12 24 1.6 18V6L12 0Z"
            fill="none"
            stroke="#2F6BD8"
            strokeWidth="3"
          />
          <circle cx="12" cy="12" r="3.4" fill="#2F6BD8" />
        </g>
        <g transform="skewX(-8)">
          <text x="36" y="27" fontFamily={SANS} fontWeight="900" fontSize="16" fill="#2F6BD8">
            TRIM
          </text>
          <text x="75" y="27" fontFamily={SANS} fontWeight="900" fontSize="16" fill={INK}>
            TECH
          </text>
        </g>
      </svg>
    ),
  },
  {
    name: "FitFuel",
    node: (
      <svg viewBox="0 0 132 40" height="30" aria-hidden="true">
        <g transform="skewX(-11)">
          <text x="8" y="27" fontFamily={SANS} fontWeight="900" fontSize="17" fill={INK}>
            FIT
          </text>
          <path d="M45 8 37 22h6l-2 10 9-14h-6l3-10h-2Z" fill="#E8622A" />
          <text x="56" y="27" fontFamily={SANS} fontWeight="900" fontSize="17" fill="#E8622A">
            FUEL
          </text>
        </g>
      </svg>
    ),
  },
  {
    name: "RGM Stone",
    node: (
      <svg viewBox="0 0 148 40" height="30" aria-hidden="true">
        <rect x="2" y="6" width="28" height="28" rx="7" fill="#5B6B8C" />
        <text
          x="16"
          y="25.5"
          textAnchor="middle"
          fontFamily={SANS}
          fontWeight="900"
          fontSize="11"
          fill="#fff"
        >
          RGM
        </text>
        <text x="40" y="25" fontFamily={MONO} fontWeight="600" fontSize="13" letterSpacing="4" fill="#5B6B8C">
          STONE
        </text>
      </svg>
    ),
  },
  {
    name: "Karachi Kart",
    node: (
      <svg viewBox="0 0 150 40" height="30" aria-hidden="true">
        <text x="4" y="24" fontFamily={SANS} fontWeight="700" fontSize="16.5" fill={INK}>
          karachi
        </text>
        <text x="60" y="24" fontFamily={SANS} fontWeight="700" fontSize="16.5" fill="#12957E">
          kart
        </text>
        <path
          d="M6 30 C 40 38, 78 38, 92 30"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M92 30l-6.5-1.2 4.7 5.4 1.8-4.2Z" fill="#F5A623" />
      </svg>
    ),
  },
  {
    name: "NorthPeak",
    node: (
      <svg viewBox="0 0 156 40" height="30" aria-hidden="true">
        <path d="M3 28 11 13l5 8 4-6 8 13H3Z" fill="#24518F" />
        <path d="M11 13l2.4 4-2.4 2.6-2.3-2.4 2.3-4.2Z" fill="#fff" opacity=".85" />
        <text x="36" y="26" fontFamily={SANS} fontWeight="700" fontSize="15" letterSpacing="1.6" fill={INK}>
          NORTH
        </text>
        <text x="99" y="26" fontFamily={SANS} fontWeight="700" fontSize="15" letterSpacing="1.6" fill="#24518F">
          PEAK
        </text>
      </svg>
    ),
  },
  {
    name: "Lumen Health",
    node: (
      <svg viewBox="0 0 152 40" height="30" aria-hidden="true">
        <circle cx="15" cy="20" r="11" fill="none" stroke="#0E9F8E" strokeWidth="2.6" />
        <path d="M15 14.5v11M9.5 20h11" stroke="#0E9F8E" strokeWidth="2.6" strokeLinecap="round" />
        <text x="34" y="25.5" fontFamily={SANS} fontWeight="500" fontSize="18" fill={INK}>
          lumen
        </text>
        <text x="88" y="25" fontFamily={MONO} fontWeight="500" fontSize="8.5" letterSpacing="2.4" fill="#0E9F8E">
          HEALTH
        </text>
      </svg>
    ),
  },
  {
    name: "Vanta Realty",
    node: (
      <svg viewBox="0 0 150 40" height="30" aria-hidden="true">
        <path d="M4 16 12 8l8 8" fill="none" stroke="#A07417" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v0" stroke="#A07417" />
        <text x="28" y="24" fontFamily={SERIF} fontSize="17" letterSpacing="2.6" fill={INK}>
          VANTA
        </text>
        <text x="30" y="34" fontFamily={MONO} fontWeight="500" fontSize="7.5" letterSpacing="3.4" fill="#A07417">
          REALTY
        </text>
      </svg>
    ),
  },
  {
    name: "BrightCart",
    node: (
      <svg viewBox="0 0 158 40" height="30" aria-hidden="true">
        <g stroke="#E0902A" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="16" cy="20" r="5.4" fill="#E0902A" stroke="none" />
          <path d="M16 8.5v3.2M16 28.3v3.2M4.5 20h3.2M24.3 20h3.2M8 12l2.2 2.2M21.8 25.8 24 28M24 12l-2.2 2.2M10.2 25.8 8 28" />
        </g>
        <text x="36" y="25.5" fontFamily={SANS} fontWeight="700" fontSize="16.5" fill="#E0902A">
          Bright
        </text>
        <text x="82" y="25.5" fontFamily={SANS} fontWeight="700" fontSize="16.5" fill={INK}>
          Cart
        </text>
      </svg>
    ),
  },
  {
    name: "Meridian",
    node: (
      <svg viewBox="0 0 140 40" height="30" aria-hidden="true">
        <path
          d="M14 31c0-8 2.6-14.6 8-18.6-1.4 6.6 1.2 10.6-8 18.6Z"
          fill="#4E9A2E"
        />
        <path
          d="M14 31c0-8-2.6-14.6-8-18.6 1.4 6.6-1.2 10.6 8 18.6Z"
          fill="#6FBF4A"
        />
        <text x="30" y="26" fontFamily={SERIF} fontSize="18" fontStyle="italic" fill="#3E7A24">
          meridian
        </text>
      </svg>
    ),
  },
  {
    name: "Craftly",
    node: (
      <svg viewBox="0 0 122 40" height="30" aria-hidden="true">
        <text x="6" y="24" fontFamily={SANS} fontWeight="700" fontSize="18" fill="#6D4FE0">
          Craftly
        </text>
        <path
          d="M8 31 C 26 36, 52 36, 68 30"
          fill="none"
          stroke="#6D4FE0"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <circle cx="71" cy="29.4" r="2.4" fill="#6D4FE0" />
      </svg>
    ),
  },
  {
    name: "PulseHR",
    node: (
      <svg viewBox="0 0 142 40" height="30" aria-hidden="true">
        <path
          d="M2 21h8l3-7 5 13 4-9 2 3h6"
          fill="none"
          stroke="#E23A63"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="36" y="26" fontFamily={SANS} fontWeight="900" fontSize="17" fill={INK}>
          pulse
        </text>
        <rect x="90" y="9" width="30" height="22" rx="6" fill="#E23A63" />
        <text
          x="105"
          y="24.5"
          textAnchor="middle"
          fontFamily={SANS}
          fontWeight="900"
          fontSize="13"
          fill="#fff"
        >
          HR
        </text>
      </svg>
    ),
  },
];

function LogoCard({ node, name, hidden }: { node: React.ReactNode; name: string; hidden?: boolean }) {
  return (
    <div className="lqcard" title={name} aria-hidden={hidden || undefined}>
      <span className="lqlogo">{node}</span>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="sec lqsec" id="clients">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Trusted by</p>
          <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
            Brands and founders <span className="grad">we&rsquo;ve shipped for.</span>
          </h2>
        </div>
      </div>

      {/* seamless auto-scrolling marquee — two identical groups, track shifts
          exactly one group width so the loop never jumps */}
      <div className="lqwrap rv">
        <div className="lqtrack">
          <div className="lqgroup">
            {LOGOS.map((l) => (
              <LogoCard key={`a-${l.name}`} node={l.node} name={l.name} />
            ))}
          </div>
          <div className="lqgroup">
            {LOGOS.map((l) => (
              <LogoCard key={`b-${l.name}`} node={l.node} name={l.name} hidden />
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="softline rv" style={{ marginTop: 6, textAlign: "center" }}>
          A selection of client engagements across retail, tools, health, and property.
        </p>
      </div>
    </section>
  );
}
