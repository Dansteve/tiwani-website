import { ExternalLink } from "lucide-react";
import type { ResourceGroup } from "../../lib/audiences";

// Renders the curated, verified external resources for an audience as accessible link cards.
// Each card is a single link with descriptive text (the organisation name), a plain-language
// blurb, and an external-link affordance: target=_blank with rel=noopener noreferrer, an
// aria-hidden icon, and a visually-hidden "opens in a new tab" so screen-reader users are warned
// (WCAG). The whole card is the tap target (well over the 44px floor). TIWANI is the signpost,
// not the source: the copy that frames this list says so.
export function ResourceList({ groups }: { groups: ResourceGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const Icon = group.icon;
        return (
          <div key={group.title}>
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-tiwani-dark">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              {group.title}
            </h3>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.links.map((link) => (
                <li key={link.href} className="h-full">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-base font-semibold leading-snug text-primary group-hover:underline">
                        {link.name}
                      </span>
                      <ExternalLink
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {link.blurb}
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
