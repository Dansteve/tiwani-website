// Where the "Go to dashboard" button sends users: the tiwani-app (Coordinator dashboard).
// The app and website are on different domains (separate Firebase Hosting sites), so this is a
// plain cross-origin link. Local dev points to the local Next.js app; the production build
// (served on Firebase) points to the Firebase-hosted app. Override per environment with
// VITE_APP_URL (e.g. a custom domain like app.tiwanilife.com if one is added later).
const DEV_APP_URL = "http://localhost:3000"; // tiwani-app `next dev`
const PROD_APP_URL = "https://app-tiwani.web.app"; // tiwani-app on Firebase Hosting

export const APP_URL =
  (import.meta.env.VITE_APP_URL as string | undefined) ??
  (import.meta.env.PROD ? PROD_APP_URL : DEV_APP_URL);
