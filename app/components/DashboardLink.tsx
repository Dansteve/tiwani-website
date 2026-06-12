import { ArrowRight } from "lucide-react";

// The product is not open to users yet, so the dashboard entry point is intentionally DISABLED: it
// stays visible for intent but does not navigate to the app. To re-enable when the app opens,
// restore the `<a href={APP_URL}>` with the click-time cache-busting timestamp (see git history).
export function DashboardLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Available soon"
      className={`${className ?? ""} cursor-not-allowed opacity-50`}
    >
      Go to dashboard
      <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  );
}
