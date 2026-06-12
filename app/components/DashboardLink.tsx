"use client";

import { ArrowRight } from "lucide-react";

import { APP_URL } from "../lib/config";
import { buttonVariants } from "./ui/button";
import { cn } from "./ui/utils";

// "Go to dashboard" -> the app. Appends a click-time cache-busting timestamp (?t=) so a
// click always loads the freshly-deployed app, never a stale cached build. Client
// component: the timestamp is read at click time in the browser. Styled through the shared
// button primitive (the quiet teal-outline pill), so it is the same component as the app's
// outline button; callers pass layout-only classes (e.g. the responsive sm:inline-flex).
export function DashboardLink({ className }: { className?: string }) {
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!APP_URL) return;
    window.location.href = `${APP_URL}${APP_URL.includes("?") ? "&" : "?"}t=${Date.now()}`;
  };
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
