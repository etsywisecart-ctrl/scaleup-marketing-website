import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep pdfkit out of the webpack bundle so it loads as a normal Node module
  // at runtime. Bundling rewrites its __dirname and breaks resolution of its
  // built-in font metric (.afm) data files.
  serverExternalPackages: ['pdfkit'],
  // Force the PDF route's serverless bundle to include the letterhead assets
  // (logo + embedded TTF fonts). Files under public/ are served by the CDN and
  // are NOT otherwise present in a serverless function's filesystem.
  outputFileTracingIncludes: {
    '/api/portal/documents/**': ['./public/portal/assets/**'],
  },
  async rewrites() {
    return [
      // Serve the hidden portal SPA at clean paths
      { source: "/portal", destination: "/portal/index.html" },
      { source: "/portal/", destination: "/portal/index.html" },
      { source: "/portal/login", destination: "/portal/login.html" },
    ];
  },
};

export default nextConfig;
