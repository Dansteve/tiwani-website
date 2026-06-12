import { ShieldCheck, Phone } from "lucide-react";

// The non-clinical boundary, stated plainly wherever TIWANI describes how it helps. TIWANI
// suggests, it never instructs; nothing on the page is medical advice. It signposts OUT to the
// authoritative services, and to the NHS for anything urgent. The status is carried by an icon
// and a label, never colour alone (accessibility); the surface is the calm teal-near-white
// accent, on-brand and never a clinical blue.
export function NonClinicalNote() {
  return (
    <aside
      aria-label="Important: TIWANI is non-clinical"
      className="rounded-2xl border border-tiwani-mid/20 bg-accent p-6 sm:p-7"
    >
      <h2 className="flex items-center gap-2.5 text-base font-semibold text-accent-foreground">
        <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
        TIWANI is non-clinical
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-accent-foreground/85">
        TIWANI helps you prepare and organise, and it suggests, it never instructs.
        Nothing here is medical advice, and it does not replace your doctor, your care team, or
        the services on this page. If you are worried about someone&rsquo;s health, contact
        a professional.
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-accent-foreground">
        <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="font-medium">In an emergency, call 999.</span>
        <span className="text-accent-foreground/85">
          For urgent advice that is not an emergency, call NHS 111 or visit{" "}
          <a
            href="https://111.nhs.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            111.nhs.uk
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          .
        </span>
      </p>
    </aside>
  );
}
