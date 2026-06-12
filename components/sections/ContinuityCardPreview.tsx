import { Check, Share2 } from "lucide-react";

// An on-brand illustration of a Continuity Card (Product.md §4.6), built entirely from brand
// tokens rather than a stock photo. It stands in for the real shareable card: Deep Teal surface
// with coral accents, a participation approach, and a few plain-English support lines, the kind a
// Coordinator hands to a teacher or carer in one tap. Decorative only (aria-hidden); the meaning
// is carried by the copy around it.
export function ContinuityCardPreview() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-sm">
      {/* Soft offset panel behind the card for depth, no hard shadow literals. */}
      <div className="absolute -inset-3 -z-10 rounded-[28px] bg-tiwani-mid/15" />

      <div className="overflow-hidden rounded-3xl bg-tiwani-dark text-white shadow-lg">
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tight">TIWANI</span>
              <span className="size-1.5 rounded-full bg-tiwani-coral" />
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-tiwani-teal-near-white">
              Continuity Card
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Participation approach
            </p>
            <p className="text-lg font-semibold text-tiwani-teal-near-white">
              Modified participation
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs uppercase tracking-wide text-white/50">What helps</p>
            {[
              "Arrive 10 minutes early, before it gets busy",
              "A quiet space to step away if needed",
              "One familiar adult to check in with",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-tiwani-coral/90">
                  <Check className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="text-sm leading-snug text-white/90">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-6 py-3.5">
          <span className="text-xs text-white/60">Shareable, no personal data</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tiwani-coral px-3 py-1.5 text-xs font-medium text-white">
            <Share2 className="size-3" />
            Share
          </span>
        </div>
      </div>
    </div>
  );
}
