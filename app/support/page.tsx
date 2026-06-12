import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Share2, Lock, Mail, ArrowRight } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Support our work | TIWANI",
  description:
    "Why TIWANI exists, and how you can help. We are not yet accepting donations: we are putting the right legal and financial foundations in place first.",
  alternates: { canonical: "/support" },
  openGraph: {
    type: "website",
    siteName: "TIWANI",
    title: "Support TIWANI",
    description:
      "Why TIWANI exists, and how you can help. We are not yet accepting donations.",
    url: "https://tiwanilife.com/support",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <LegalPage
      title="Support our work"
      updated="12 June 2026"
      draftKind="funding"
      current="/support"
      lede={
        <p>
          TIWANI is built for families who carry more than their share. If you believe in that, we
          would love your support, and we want to earn it honestly.
        </p>
      }
    >
      <h2>Why we are building TIWANI</h2>
      <p>
        Coordinating care for someone with additional needs is relentless, and the people who do it
        too often lose their own footing. TIWANI turns hard-won lived experience into structured
        plans, and shows whether daily life is holding or quietly narrowing, so families can plan
        ahead. We want to keep it genuinely useful and within reach of the families who need it.
      </p>

      <h2>We are not accepting donations yet</h2>
      <div className="my-6 rounded-2xl border border-primary/20 bg-accent/40 p-5 sm:p-6">
        <div className="flex gap-3">
          <Lock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-tiwani-dark">Giving is not open</p>
            <p className="mt-1.5 text-muted-foreground">
              TIWANI Ltd is a company, not a registered charity. We have chosen not to take a single
              donation until we have the right foundations in place, because taking money before
              then would not be fair to you. The steps below explain what we are doing first.
            </p>
          </div>
        </div>
      </div>

      <h2>What we are putting in place first</h2>
      <p>
        Before we can responsibly accept support, several things have to be true. We are working
        through them with qualified advisers:
      </p>
      <ul>
        <li>
          <strong>The right legal home.</strong> We are deciding the right structure for taking
          public support (for example a registered charity, a community interest company, or
          remaining a company), because each carries different rules and duties.
        </li>
        <li>
          <strong>Honest, regulated fundraising.</strong> When we ask for support, we will follow
          the UK Code of Fundraising Practice: legal, open, honest, and respectful, with no pressure
          and a clear account of where money goes.
        </li>
        <li>
          <strong>No misleading tax claims.</strong> Gift Aid is only available to registered
          charities. As a company we cannot offer it, and we will never imply that we can. We will
          always be clear about whether a gift is tax-effective and whether we are a charity.
        </li>
        <li>
          <strong>A safe way to pay.</strong> We will use an established, secure payment provider, so
          card details are handled by specialists and never by a home-made checkout.
        </li>
        <li>
          <strong>Clear use of funds.</strong> We will say plainly what your support pays for, such
          as building the product and keeping it affordable for families.
        </li>
      </ul>

      {/*
        FUNDING INTEGRATION POINT (flagged, intentionally NOT wired):
        Do NOT enable live payments here until (1) the legal vehicle is decided, (2) the Fundraising
        Regulator / Code of Fundraising Practice position is settled, (3) Gift Aid / HMRC eligibility
        is correct for the chosen vehicle, and (4) a compliant, hosted / tokenised processor (e.g.
        Stripe Checkout) is onboarded with KYC complete. See governance Task 12 + the lawyer review
        (governance/HardRules/ExpertReview/Lawyer.md). Until all four are true, this control stays
        disabled and no payment flow is wired.
      */}
      <div className="my-8 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
        <Heart className="mx-auto size-6 text-tiwani-coral" aria-hidden="true" />
        <p className="mt-3 text-base font-medium text-tiwani-dark">Supporter giving is coming</p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-4 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-switch-background px-6 text-sm font-medium text-foreground/60"
        >
          Donations are not open yet
        </button>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We will open giving once the steps above are complete.
        </p>
      </div>

      <h2>How you can help right now</h2>
      <p>There is plenty you can do today, all of it free:</p>
      <ul>
        <li>
          <Link href="/waitlist">Join the waitlist</Link>, and help shape what we build by telling
          us about your care context.
        </li>
        <li>
          Register your interest in supporting our work, so we can let you know when there is a way
          to help (the buttons below).
        </li>
        <li>Share TIWANI with a family, carer, or professional who might find it useful.</li>
        <li>Follow along on our channels (linked in the footer) as we build toward launch.</li>
      </ul>

      <div className="my-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="mailto:hello@tiwanilife.com?subject=Supporting%20TIWANI"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-tiwani-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Mail className="size-5" aria-hidden="true" />
          Register your interest
        </a>
        <Link
          href="/waitlist"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Join the waitlist
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>

      <h2>A note on honesty</h2>
      <p>
        We would rather build trust slowly than ask for money before we are ready. When giving does
        open, this page will set out exactly who receives your support, what it funds, and what it
        does and does not mean for tax. If you have questions in the meantime, email{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>.
      </p>

      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Share2 className="size-4 text-primary" aria-hidden="true" />
        Thank you for caring about this work.
      </p>
    </LegalPage>
  );
}
