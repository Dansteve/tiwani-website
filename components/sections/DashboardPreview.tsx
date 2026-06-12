import {
  CircleCheck,
  TriangleAlert,
  CircleAlert,
  CircleDashed,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../Reveal";

// A product-true preview of the TIWANI dashboard (Task 14: app <-> website parity). It mirrors the
// real app surfaces a visitor lands on after joining, built from the SAME brand tokens and the SAME
// component shapes the app ships, so the marketing page reads as one continuous product (the
// Blackbird principle). It reuses the app's realised patterns verbatim:
//   - the Life Continuity Index surface (OverallLciIndicator): an uppercase label, a band-tinted
//     text-3xl tabular-nums score, and a gauge bar (tiwani-app/src/features/continuity/...).
//   - the six-Life-Chapter grid of ChapterCards (tiwani-app/src/features/dashboard/ChapterCard.tsx):
//     rounded-xl border bg-card, a status chip that is colour + icon + label (never colour alone),
//     and a last-prepared line.
// It is an illustration, not live data, so the whole block is aria-hidden and the meaning is carried
// by the heading + copy around it; the figures are representative, not a real user's. No off-brand
// hex: every colour resolves to a token (--status-stable / --status-pressure / --status-critical,
// --primary, --muted-foreground), exactly as in the app.

interface ChapterPreview {
  name: string;
  status: "stable" | "pressure" | "critical" | "not_started";
  prepared: string;
}

// The six Life Chapters (Product.md §4.3; the canonical set in tiwani-app), with representative
// statuses chosen to show the full status vocabulary at a calm glance (mostly stable, one under
// pressure, one not yet started), never an alarming all-red read.
const CHAPTERS: ChapterPreview[] = [
  { name: "School", status: "stable", prepared: "Prepared 2 days ago" },
  { name: "Career", status: "stable", prepared: "Prepared last week" },
  { name: "Family Life & Routine", status: "stable", prepared: "Prepared yesterday" },
  { name: "Social & Community", status: "pressure", prepared: "Prepared 3 weeks ago" },
  { name: "Travel & Holiday", status: "not_started", prepared: "Not prepared yet" },
  { name: "Culture & Faith", status: "stable", prepared: "Prepared 5 days ago" },
];

// The status presentation, mirroring tiwani-app's STATUS_PRESENTATION: a label, an icon, and the
// tinted-pill token classes (bg-status-*/12 + the matching text token). Status is colour + label +
// icon together, never colour alone (WCAG 2.1 AA), the same rule the app holds.
const STATUS: Record<
  ChapterPreview["status"],
  { label: string; icon: LucideIcon; pillClass: string }
> = {
  stable: {
    label: "Stable",
    icon: CircleCheck,
    pillClass: "bg-status-stable/12 text-status-stable",
  },
  pressure: {
    label: "Under pressure",
    icon: TriangleAlert,
    pillClass: "bg-status-pressure/15 text-status-pressure",
  },
  critical: {
    label: "Needs attention",
    icon: CircleAlert,
    pillClass: "bg-status-critical/12 text-status-critical",
  },
  not_started: {
    label: "Not started",
    icon: CircleDashed,
    pillClass: "bg-muted text-muted-foreground",
  },
};

// The Life Continuity Index surface, a faithful copy of the app's OverallLciIndicator: the uppercase
// label, the band-tinted score in tabular-nums, the "/ 100", the trajectory chip, and the gauge bar.
// A representative "stable / holding steady" read (78), so the visitor sees the honest signal the
// product is built around without it ever looking clinical.
function LciSurface() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Life Continuity Index
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-status-stable">78</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-status-stable/12 px-3 py-1 text-sm font-medium text-status-stable">
          <TrendingUp className="size-4 shrink-0" aria-hidden="true" />
          Holding steady
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-status-stable" style={{ width: "78%" }} />
      </div>
    </div>
  );
}

// One Life Chapter card, the app's ChapterCard shape: rounded-xl border bg-card p-5, an h-row with
// the chapter name, the status chip below it, and the last-prepared line. No Prepare button here (the
// preview is non-interactive), so the card ends at the status read.
function ChapterPreviewCard({ chapter }: { chapter: ChapterPreview }) {
  const status = STATUS[chapter.status];
  const Icon = status.icon;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground">
      <p className="text-base font-semibold leading-tight">{chapter.name}</p>
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${status.pillClass}`}
      >
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        {status.label}
      </span>
      <p className="text-sm text-muted-foreground">{chapter.prepared}</p>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              What you are joining
            </p>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-tiwani-dark sm:text-4xl">
              One calm view of how life is holding
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Your six Life Chapters, each with a clear status and your latest preparation, above one
              honest read on whether life is holding steady or quietly narrowing. This is the
              dashboard you open, calm, glanceable, and never clinical.
            </p>
          </Reveal>
        </div>

        {/* The product-true slice: built from the app's own surfaces and tokens. Decorative (the copy
            above carries the meaning), so the whole figure is aria-hidden; it is a faithful mock, not
            a real user's data. Framed in a soft warm panel so it reads as a screen lifted from the
            product. */}
        <Reveal delayMs={120} className="mt-12">
          <div
            aria-hidden="true"
            className="rounded-2xl border border-border bg-secondary/50 p-4 shadow-sm sm:p-6 lg:p-8"
          >
            <div className="space-y-4">
              <LciSurface />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CHAPTERS.map((chapter) => (
                  <ChapterPreviewCard key={chapter.name} chapter={chapter} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
