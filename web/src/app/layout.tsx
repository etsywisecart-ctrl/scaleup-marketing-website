import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import MotionFx from "@/components/MotionFx";
import JsonLd from "@/components/JsonLd";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const { siteUrl, name, tagline, contact, social } = siteConfig;
const description =
  "ScaleUp Marketing is a digital agency and training academy in Lahore — we build Shopify stores, SaaS, apps and AI automations, and train the next generation of digital entrepreneurs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${name} — ${tagline}`,
    template: `%s — ${name}`,
  },
  description,
  applicationName: name,
  keywords: [
    "digital agency Lahore",
    "Shopify development Pakistan",
    "ecommerce course Lahore",
    "TikTok Shop training",
    "Daraz seller course",
    "SaaS development Pakistan",
    "AI automation agency",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: name,
    title: `${name} — ${tagline}`,
    description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — ${tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Site-wide structured data: the organisation + its Lahore campus.
const orgLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name,
  url: siteUrl,
  logo: `${siteUrl}/uploads/logo.png`,
  image: `${siteUrl}/opengraph-image`,
  description,
  slogan: tagline,
  email: contact.email,
  telephone: contact.phoneDisplay,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.addressLine1.replace(/,\s*$/, "")}`,
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: ["Lahore", "Pakistan", "Worldwide"],
  openingHours: "Mo-Sa 10:00-19:00",
  sameAs: Object.values(social).filter((u) => u && !u.startsWith("#")),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={orgLd} />
      </head>
      <body>
        <div className={`site${siteConfig.toggles.motion ? "" : " nomotion"}`}>
          <MotionFx />
          <Header />
          {children}
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
