"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { APP_URL, appUrlForHost } from "../lib/config";
import { buttonVariants } from "./ui/button";
import { cn } from "./ui/utils";

// "Try the beta" -> the tiwani-app. The TARGET is resolved from the current marketing host so each
// domain sends testers to its matching app domain (tiwanilife.com -> app.tiwanilife.com,
// tiwanilife.co.uk -> app.tiwanilife.co.uk; the Firebase preview domain + localhost fall back to
// APP_URL). The host is a browser-only value, so the href STARTS at the APP_URL fallback (SSR-safe, so
// the server and first client render match, no hydration mismatch) and upgrades to the per-host target
// after mount. The click appends a cache-busting ?t= so it always loads the freshly-deployed app, never
// a stale cached build. Styled through the shared button primitive (the quiet teal-outline pill).
export function DashboardLink({ className }: { className?: string }) {
  const [href, setHref] = useState(APP_URL);
  useEffect(() => {
    setHref(appUrlForHost(window.location.hostname));
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    window.location.href = `${href}${href.includes("?") ? "&" : "?"}t=${Date.now()}`;
  };

  return (
    <a
      href={href}
      onClick={go}
      className={cn(buttonVariants({ variant: "cta-secondary", size: "cta-sm" }), className)}
    >
      <span className="sm:hidden">Try beta</span>
      <span className="hidden sm:inline">Try the beta</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}
