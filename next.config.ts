import type { NextConfig } from "next";

// Static export (SSG): Next pre-renders every route to HTML at build time and writes the
// site to out/, which Firebase Hosting serves as plain static assets (no Node server). This is
// the SEO win a Vite SPA lacks, on plain Firebase static hosting (Docs/Decisions.md D9).
const nextConfig: NextConfig = {
  output: "export",
  // Each route exports to its own folder with an index.html (/, /waitlist/, plus 404.html), so
  // a trailing-slash URL maps cleanly to a static file on Firebase without per-request rewrites.
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; on a static export, serve images unoptimized.
    unoptimized: true,
  },
};

export default nextConfig;
