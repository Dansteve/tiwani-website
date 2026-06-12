"use client";

import { ArrowRight } from "lucide-react";

import { APP_URL } from "../lib/config";

// "Go to dashboard" -> the app. Appends a click-time cache-busting timestamp (?t=) so a
// click always loads the freshly-deployed app, never a stale cached build. Client
// component: the timestamp is read at click time in the browser.
export function DashboardLink({ className }: { className?: string }) {
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!APP_URL) return;
    window.location.href = `${APP_URL}${APP_URL.includes("?") ? "&" : "?"}t=${Date.now()}`;
  };
  return (
    <a href={APP_URL} onClick={go} className={className}>
      Go to dashboard
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}
