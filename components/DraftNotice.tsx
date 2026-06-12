import { ShieldAlert } from "lucide-react";

// The honesty banner shown at the top of every legal and funding page. These pages are working
// DRAFTS, published early for transparency, and NOT legally final: they are gated on review by a
// qualified solicitor and a Data Protection Officer before TIWANI collects data or money at scale
// (the launch gate, governance Task 12). Status is colour + icon + label (never colour alone), in
// the warm amber "warning" token so it reads as "attention", not "error".
export function DraftNotice({ kind = "legal" }: { kind?: "legal" | "funding" }) {
  return (
    <aside
      role="note"
      aria-label="Draft document notice"
      className="mt-8 rounded-2xl border border-warning/40 bg-warning/10 p-5 sm:p-6"
    >
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-tiwani-dark">Draft for review, not legally final</p>
          <p className="mt-1.5 text-muted-foreground">
            This is a working draft, published early in the spirit of transparency. It has not yet
            been reviewed or approved by a qualified solicitor or a Data Protection Officer, and it
            is not a final legal document. We are completing that review before TIWANI opens to
            families.{" "}
            {kind === "funding" && (
              <strong className="font-semibold text-tiwani-dark">
                We are not yet accepting donations.{" "}
              </strong>
            )}
            If anything here is unclear, email{" "}
            <a
              href="mailto:hello@tiwanilife.com"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            >
              hello@tiwanilife.com
            </a>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}
