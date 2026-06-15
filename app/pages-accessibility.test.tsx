// @vitest-environment jsdom

// Page-level accessibility net (Task 11). The sibling components/accessibility.test.tsx renders
// isolated shared components with the page-landmark "region" rule disabled; this file renders the
// whole PAGE compositions (every route a visitor reaches) WITH "region" enabled, so it catches the
// page-level a11y rules the fragment net cannot: landmark structure, a single top-level heading
// order, list/table semantics, link/control names across the assembled page. Same single harness
// (vitest-axe / axe-core in jsdom, jsdom opted in per-file via the docblock), no second tool.
//
// axe-core needs real layout for colour-contrast, which jsdom does not provide, so contrast is NOT
// asserted here (it is covered by the live Lighthouse audit before launch); this net asserts the
// STRUCTURAL rules. We compare the violations' rule ids to [] so a failure names the offending rule.
//
// The layout (app/layout.tsx) is not rendered (it carries the <html>/<body> and next/font); these
// page bodies are what render inside it. vitest.setup.ts sets document.documentElement.lang so the
// html-has-lang rule is satisfied for the jsdom document.

import { afterEach, describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";

import HomePage from "./page";
import ForHubPage from "./for/page";
import AudiencePage from "./for/[slug]/page";
import WaitlistPage from "./waitlist/page";
import SupportPage from "./support/page";
import PrivacyPolicyPage from "./legal/privacy/page";
import TermsPage from "./legal/terms/page";
import CookiePolicyPage from "./legal/cookies/page";
import AccessibilityPage from "./legal/accessibility/page";
import NotFound from "./not-found";

import { AUDIENCE_SLUGS } from "@/lib/audiences";

// jsdom has no IntersectionObserver; the Reveal animation wrapper needs one in its effect. A no-op
// stub lets the pages mount (the reveal is decorative, never the only signal that content exists).
class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error assigning a test stub onto the jsdom global
globalThis.IntersectionObserver = NoopIntersectionObserver;

// "region" stays ENABLED here (full pages, unlike the fragment net). Everything inside a page sits
// in a landmark (<header>/<main>/<footer>/<nav>/<aside role>), which is what we want to verify.
async function pageViolations(container: HTMLElement): Promise<string[]> {
  const { violations } = await axe(container);
  return violations.map((v) => v.id);
}

// Unmount the previous page before the next renders, so the duplicate-landmark rules see only
// the current page, not the landmarks accumulated from earlier renders in the shared document.
afterEach(cleanup);

describe("page-level accessibility (axe) net", () => {
  it("home page (/) has no violations", async () => {
    const { container } = render(<HomePage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("audience hub (/for) has no violations", async () => {
    const { container } = render(<ForHubPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  // The audience template is an async server component; render each of the four slugs it ships.
  it.each(AUDIENCE_SLUGS)("audience page (/for/%s) has no violations", async (slug) => {
    const ui = await AudiencePage({ params: Promise.resolve({ slug }) });
    const { container } = render(ui);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("waitlist page (/waitlist) has no violations", async () => {
    const { container } = render(<WaitlistPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("support page (/support) has no violations", async () => {
    const { container } = render(<SupportPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("privacy policy (/legal/privacy) has no violations", async () => {
    const { container } = render(<PrivacyPolicyPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("terms (/legal/terms) has no violations", async () => {
    const { container } = render(<TermsPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("cookie policy (/legal/cookies) has no violations", async () => {
    const { container } = render(<CookiePolicyPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("accessibility page (/legal/accessibility) has no violations", async () => {
    const { container } = render(<AccessibilityPage />);
    expect(await pageViolations(container)).toEqual([]);
  });

  it("not-found (404) has no violations", async () => {
    const { container } = render(<NotFound />);
    expect(await pageViolations(container)).toEqual([]);
  });
});
