import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";

// Inter, the shared TIWANI font system (parity with tiwani-app, which also loads Inter via
// next/font). Exposed as the --font-sans variable so the token in globals.css resolves to the
// self-hosted Inter face with no layout shift, instead of a Google Fonts network request.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const SITE_URL = "https://tiwanilife.com";
const TITLE = "TIWANI | Life Continuity for families who coordinate care";
const DESCRIPTION =
  "TIWANI helps you keep your own life while you coordinate care. Turn lived experience into ready preparation plans, see whether life is holding or narrowing, and share a clear plan in one tap. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "TIWANI",
  keywords: [
    "caregiving",
    "additional needs",
    "carer support",
    "life continuity",
    "preparation plans",
    "SEND",
    "elder care",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "TIWANI",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F6E56",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
