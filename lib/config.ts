// Where the "Try out beta now" button sends users: the tiwani-app (Coordinator dashboard).
// The app and website are on different domains (separate Firebase Hosting sites), so this is a
// plain cross-origin link. Local dev points to the local Next.js app; the production build
// (served on Firebase) points to the Firebase-hosted app. Override per environment with
// NEXT_PUBLIC_APP_URL (e.g. a custom domain like app.tiwanilife.com if one is added later).
const DEV_APP_URL = "http://localhost:3000"; // tiwani-app `next dev`
const PROD_APP_URL = "https://app-tiwani.web.app"; // tiwani-app on Firebase Hosting

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "production" ? PROD_APP_URL : DEV_APP_URL);

// Each public marketing domain sends "Try out beta now" to its OWN app subdomain, so a tester stays on
// the same brand domain: tiwanilife.com -> app.tiwanilife.com, tiwanilife.co.uk -> app.tiwanilife.co.uk
// (and the www variants). The Firebase preview domain (tiwani-main.web.app) and localhost are not in the
// map and fall back to APP_URL. Both custom domains serve the SAME static build, so the host is read at
// runtime from window.location.hostname. Pure + exported so it unit-tests without a browser.
const APP_URL_BY_MARKETING_HOST: Record<string, string> = {
  "tiwanilife.com": "https://app.tiwanilife.com",
  "www.tiwanilife.com": "https://app.tiwanilife.com",
  "tiwanilife.co.uk": "https://app.tiwanilife.co.uk",
  "www.tiwanilife.co.uk": "https://app.tiwanilife.co.uk",
};

export function appUrlForHost(hostname: string): string {
  return APP_URL_BY_MARKETING_HOST[hostname.trim().toLowerCase()] ?? APP_URL;
}

// The single home of the donation / "support our work" route, so every CTA points through one
// constant and the route can move in ONE place. The full funding page (the case for support, the
// Fundraising Regulator + Gift Aid + payment-processor posture) is owned by the legal-and-funding
// workstream; this site currently ships a clearly-gated placeholder at this path (app/support),
// stating donations are not yet open. If that workstream lands the page at a different route,
// update this constant and the placeholder, not every CTA. No live payment is wired here.
export const DONATE_PATH = "/support";
