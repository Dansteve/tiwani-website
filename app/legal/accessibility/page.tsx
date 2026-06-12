import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility | TIWANI",
  description:
    "TIWANI aims to meet WCAG 2.1 AA and to be usable by everyone. How we build for access, how we test, and how to tell us about a problem. A working draft.",
  alternates: { canonical: "/legal/accessibility" },
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      updated="12 June 2026"
      current="/legal/accessibility"
      lede={
        <p>
          TIWANI is for stretched families and carers, and it has to work for everyone. We aim to
          meet a recognised accessibility standard and to keep improving.
        </p>
      }
    >
      <h2>Our commitment</h2>
      <p>
        We want every part of TIWANI to be usable whatever your abilities or the device or assistive
        technology you use. Accessibility is part of how we design and test, not an afterthought.
      </p>

      <h2>The standard we aim for</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) version 2.1 at Level AA, the
        widely recognised benchmark for accessible websites. We also keep an eye on the newer WCAG
        2.2 as we develop.
      </p>

      <h2>Why we do this</h2>
      <p>
        As a UK service provider, we have a duty under the Equality Act 2010 to make reasonable
        adjustments so that disabled people are not put at a disadvantage. That duty is anticipatory:
        it means building access in from the start, rather than waiting to be asked. The public
        sector accessibility regulations do not apply to us as a private organisation, but we follow
        their good practice anyway.
      </p>

      <h2>What we have done</h2>
      <p>Across the website we have aimed to ensure that:</p>
      <ul>
        <li>text is at least 16px, and nothing meaningful is smaller than 12px;</li>
        <li>colour is never the only way we show something: we pair it with a label and an icon;</li>
        <li>text and interface colours meet the AA contrast levels;</li>
        <li>buttons and links are large enough to tap (at least 44 by 44 pixels);</li>
        <li>everything works by keyboard, with a clear, visible focus outline;</li>
        <li>interactive elements have labels that screen readers can announce;</li>
        <li>the layout reflows cleanly on a phone, with no sideways scrolling;</li>
        <li>motion is gentle and is switched off if you prefer reduced motion.</li>
      </ul>

      <h2>How we test</h2>
      <p>
        We test with automated tools (including axe and Lighthouse) and by hand, including keyboard
        and screen-reader checks. Before the app opens to families, we plan a fuller review,
        including with people who use assistive technology.
      </p>

      <h2>Known limitations</h2>
      <p>
        TIWANI is at an early stage, and the app is still being built. We expect to find and fix
        issues as we go, and we would rather hear about a problem than leave it unfound. If you meet
        a barrier, please tell us.
      </p>

      <h2>Telling us about a problem, or asking for another format</h2>
      <p>
        If something is hard to use, or you would like information from this site in a different
        format (for example larger text or a different document type), email{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>. Please describe the problem
        and the page, and we will do our best to help and to put it right.
      </p>
    </LegalPage>
  );
}
