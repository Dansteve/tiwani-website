"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

// The Continuity Card QR points to tiwanilife.com/?ref=card (Product.md §4.6). When someone
// arrives that way (a teacher or carer who scanned a shared card), greet them with a short, calm
// banner that explains where they landed. Read on the client because the site is a static export
// (no per-request server params); it shows nothing for a normal visit.
export function RefCardBanner() {
  const [fromCard, setFromCard] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("ref") === "card") {
      setFromCard(true);
    }
  }, []);

  if (!fromCard) return null;

  return (
    <div className="bg-tiwani-mid/12 px-4 pt-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start gap-3 rounded-2xl border border-tiwani-mid/30 bg-card p-4">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-tiwani-mid/15 text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-tiwani-dark">
              Arrived from a Continuity Card?
            </span>{" "}
            That card was made with TIWANI, the Life Continuity platform for families
            coordinating care. Here is what we are building.
          </p>
        </div>
      </div>
    </div>
  );
}
