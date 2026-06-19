// Where the "Try the beta" button sends users: the tiwani-app (Coordinator dashboard).
// The app and website are on different domains (separate Firebase Hosting sites), so this is a
// plain cross-origin link. Local dev points to the local Next.js app; the production build
// (served on Firebase) points to the Firebase-hosted app. Override per environment with
// NEXT_PUBLIC_APP_URL (e.g. a custom domain like app.tiwanilife.com if one is added later).
const DEV_APP_URL = "http://localhost:3000"; // tiwani-app `next dev`
const PROD_APP_URL = "https://app-tiwani.web.app"; // tiwani-app on Firebase Hosting

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "production" ? PROD_APP_URL : DEV_APP_URL);

// The "Try the beta" entry to the app is HELD OFF until the app subdomains (app.tiwanilife.com /
// app.tiwanilife.co.uk) finish DNS propagation, so the button is not surfaced before its branded domain
// is live (DashboardLink renders nothing while this is false). To turn it on once they resolve: set this
// true AND point the brand domains in APP_URL_BY_MARKETING_HOST below at their subdomains, then redeploy.
export const BETA_CTA_ENABLED: boolean = false;

// "Try the beta" sends each marketing host to the app. The END STATE maps each brand domain onto its
// matching app subdomain (tiwanilife.com -> app.tiwanilife.com, tiwanilife.co.uk -> app.tiwanilife.co.uk,
// and the www variants), so a tester stays on the same brand domain.
//
// TEMPORARY: those app subdomains are not live yet, so the values point at the WORKING default APP_URL
// for now (the button works for testers today). To switch a brand domain onto its subdomain once
// app.tiwanilife.com / app.tiwanilife.co.uk resolve, set its value to the subdomain URL shown beside it.
// The Firebase preview domain + localhost already fall back to APP_URL. Pure + exported so it unit-tests
// without a browser; the host is read at runtime from window.location.hostname.
const APP_URL_BY_MARKETING_HOST: Record<string, string> = {
  "tiwanilife.com": APP_URL, // -> "https://app.tiwanilife.com" once that subdomain is live
  "www.tiwanilife.com": APP_URL, // -> "https://app.tiwanilife.com"
  "tiwanilife.co.uk": APP_URL, // -> "https://app.tiwanilife.co.uk" once that subdomain is live
  "www.tiwanilife.co.uk": APP_URL, // -> "https://app.tiwanilife.co.uk"
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
