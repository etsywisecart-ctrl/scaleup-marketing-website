/* Colorful platform logo per course slug — faithful mini recreations. */

export default function PlatformMark({ slug, size = 24 }: { slug: string; size?: number }) {
  switch (slug) {
    case "shopify-mastery":
      return (
        <svg viewBox="0 0 24 26" width={size} height={size * 1.08} aria-label="Shopify">
          <path
            d="M5.8 6.7 4 22l9.5 2.5L21 22 19.2 6.7c0-.4-.4-.7-.8-.7h-2.1C16.1 3.7 14.3 2 12.5 2S8.9 3.7 8.7 6H6.6c-.4 0-.7.3-.8.7Z"
            fill="#95BF47"
          />
          <path d="M12.5 3.6c1 0 2 1 2.2 2.4h-4.4c.2-1.4 1.2-2.4 2.2-2.4Z" fill="#5E8E3E" />
          <path
            d="m13.9 10.2-1 2.1s-.7-.4-1.6-.4c-1.3 0-1.4.8-1.4 1 0 1.1 2.9 1.5 2.9 4.1 0 2-1.3 3.3-3 3.3-2 0-3.1-1.3-3.1-1.3l.6-1.8s1.1 1 2 1c.6 0 .9-.5.9-.9 0-1.5-2.4-1.6-2.4-4 0-2 1.4-3.9 4.3-3.9 1.1 0 1.8.8 1.8.8Z"
            fill="#fff"
          />
        </svg>
      );
    case "tiktok-shop":
      return (
        <svg viewBox="0 0 24 28" width={size * 0.85} height={size} aria-label="TikTok">
          <path
            d="M16.5 4c.4 2.4 2 4.3 4.5 4.6v3.3c-1.7 0-3.2-.5-4.5-1.4v6.6c0 4-2.7 6.9-6.6 6.9C6.3 24 4 21.6 4 18.5c0-3.4 2.9-5.8 6.5-5.5v3.4c-1.7-.4-3.2.6-3.2 2.1 0 1.4 1.1 2.4 2.5 2.4 1.7 0 2.9-1.2 2.9-3.4V4h3.8Z"
            fill="#25F4EE"
            transform="translate(-1.2,-.8)"
          />
          <path
            d="M16.5 4c.4 2.4 2 4.3 4.5 4.6v3.3c-1.7 0-3.2-.5-4.5-1.4v6.6c0 4-2.7 6.9-6.6 6.9C6.3 24 4 21.6 4 18.5c0-3.4 2.9-5.8 6.5-5.5v3.4c-1.7-.4-3.2.6-3.2 2.1 0 1.4 1.1 2.4 2.5 2.4 1.7 0 2.9-1.2 2.9-3.4V4h3.8Z"
            fill="#FE2C55"
            transform="translate(1,.8)"
          />
          <path
            d="M16.5 4c.4 2.4 2 4.3 4.5 4.6v3.3c-1.7 0-3.2-.5-4.5-1.4v6.6c0 4-2.7 6.9-6.6 6.9C6.3 24 4 21.6 4 18.5c0-3.4 2.9-5.8 6.5-5.5v3.4c-1.7-.4-3.2.6-3.2 2.1 0 1.4 1.1 2.4 2.5 2.4 1.7 0 2.9-1.2 2.9-3.4V4h3.8Z"
            fill="#161823"
          />
        </svg>
      );
    case "ebay-etsy":
      return (
        <span
          aria-label="eBay and Etsy"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: size * 0.22,
            fontWeight: 900,
            fontSize: size * 0.68,
            letterSpacing: -0.5,
            lineHeight: 1,
          }}
        >
          <span>
            <span style={{ color: "#E53238" }}>e</span>
            <span style={{ color: "#0064D2" }}>b</span>
            <span style={{ color: "#F5AF02" }}>a</span>
            <span style={{ color: "#86B817" }}>y</span>
          </span>
          <span style={{ color: "#F1641E", fontFamily: "Georgia,serif", fontWeight: 700 }}>Etsy</span>
        </span>
      );
    case "daraz":
      return (
        <span
          aria-label="Daraz"
          style={{
            color: "#F85606",
            fontWeight: 900,
            fontSize: size * 0.72,
            letterSpacing: -0.5,
            lineHeight: 1,
          }}
        >
          daraz
        </span>
      );
    case "ai-marketing":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-label="AI">
          <defs>
            <linearGradient id="aimg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8B6DF5" />
              <stop offset="1" stopColor="#5B3FD0" />
            </linearGradient>
          </defs>
          <path d="M12 2l2.3 6.7L21 11l-6.7 2.3L12 20l-2.3-6.7L3 11l6.7-2.3L12 2Z" fill="url(#aimg)" />
          <circle cx="19" cy="5" r="2" fill="#F5A623" />
        </svg>
      );
    default:
      return null;
  }
}
