import { cn } from "./ui/utils";

// The TIWANI wordmark: the name in Deep Teal with the coral "logo dot" (Docs/Brand.md). One
// component so the mark renders identically in the header, the footer, and the 404. The dot is
// the one sparing use of coral here; size scales the whole lockup.
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-tiwani-dark",
        )}
      >
        TIWANI
      </span>
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-tiwani-coral"
      />
    </span>
  );
}
