import type { MetadataRoute } from "next";
import { AUDIENCE_SLUGS } from "@/lib/audiences";

// A static sitemap, emitted to out/sitemap.xml on the static export (basic SEO). URLs carry the
// trailing slash to match next.config.ts (trailingSlash: true) and the per-page canonicals.
// With output: "export" the sitemap route must be explicitly static (Next requires this for any
// route handler under a static export).
export const dynamic = "force-static";

const BASE = "https://tiwanilife.com";

function url(path: string): string {
  if (path === "/") return `${BASE}/`;
  return `${BASE}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/for",
    ...AUDIENCE_SLUGS.map((slug) => `/for/${slug}`),
    "/support",
    "/waitlist",
  ];
  return paths.map((path) => ({
    url: url(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
