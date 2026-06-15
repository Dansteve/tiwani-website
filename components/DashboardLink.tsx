"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { APP_URL, isPublicMarketingHost } from "../lib/config";
import { buttonVariants } from "./ui/button";
import { cn } from "./ui/utils";

// "Go to dashboard" -> the app. Appends a click-time cache-busting timestamp (?t=) so a
// click always loads the freshly-deployed app, never a stale cached build. Client
// component: the timestamp is read at click time in the browser. Styled through the shared
// button primitive (the quiet teal-outline pill), so it is the same component as the app's
// outline button; callers pass layout-only classes (e.g. the responsive sm:inline-flex).
//
// HIDDEN on the public marketing domain (tiwanilife.com) but kept on the Firebase preview domain
// (tiwani-main.web.app) and localhost: both serve ONE static build, so the host is read at runtime
// (lib/config.isPublicMarketingHost). It starts hidden, so the public site never even flashes the
// link and the prerendered HTML omits it, then reveals after mount only on a non-public host, which
// also keeps the server and first client render identical (no hydration mismatch).
export function DashboardLink({ className }: { className?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!isPublicMarketingHost(window.location.hostname));
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!APP_URL) return;
    window.location.href = `${APP_URL}${APP_URL.includes("?") ? "&" : "?"}t=${Date.now()}`;
  };

  if (!show) return null;

  return (
    <a
      href={APP_URL}
      onClick={go}
      className={cn(buttonVariants({ variant: "cta-secondary", size: "cta-sm" }), className)}
    >
      Go to dashboard
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}
