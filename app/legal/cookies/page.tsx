import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy | TIWANI",
  description:
    "What cookies and similar storage TIWANI uses, and how to control them. Analytics is off until you opt in (PECR). A working draft, pending solicitor sign-off.",
  alternates: { canonical: "/legal/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="12 June 2026"
      current="/legal/cookies"
      lede={
        <p>
          This policy explains the cookies and similar storage we use, and how you stay in control.
          Our approach is privacy by default: we set no optional cookies until you choose to allow
          them.
        </p>
      }
    >
      <h2>What cookies are</h2>
      <p>
        Cookies, and similar technologies such as browser storage, are small pieces of information a
        website keeps on your device. Some are needed for a site to work. Others, like analytics,
        are optional and, under the UK Privacy and Electronic Communications Regulations (PECR), may
        only be set with your consent.
      </p>

      <h2>Our approach</h2>
      <p>
        TIWANI is a largely static site. We keep storage to a minimum. The only optional cookies we
        use are privacy-respecting analytics, and we do not load them until you opt in through the
        cookie banner. If you reject, or simply ignore the banner, no analytics cookies are set.
        Even where the law might allow some limited analytics without consent, we choose to ask
        first.
      </p>

      <h2>The cookies we use</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-border py-2 pr-4 font-semibold text-tiwani-dark">
                Name
              </th>
              <th className="border-b border-border py-2 pr-4 font-semibold text-tiwani-dark">
                Set by
              </th>
              <th className="border-b border-border py-2 pr-4 font-semibold text-tiwani-dark">
                Purpose
              </th>
              <th className="border-b border-border py-2 pr-4 font-semibold text-tiwani-dark">
                Type
              </th>
              <th className="border-b border-border py-2 font-semibold text-tiwani-dark">Expiry</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border-b border-border py-2 pr-4 align-top">tiwani-cookie-consent</td>
              <td className="border-b border-border py-2 pr-4 align-top">TIWANI</td>
              <td className="border-b border-border py-2 pr-4 align-top">
                Remembers your cookie choice so we do not ask again.
              </td>
              <td className="border-b border-border py-2 pr-4 align-top">Strictly necessary</td>
              <td className="border-b border-border py-2 align-top">Until you clear it</td>
            </tr>
            <tr>
              <td className="border-b border-border py-2 pr-4 align-top">_ga</td>
              <td className="border-b border-border py-2 pr-4 align-top">Google Analytics</td>
              <td className="border-b border-border py-2 pr-4 align-top">
                Tells visits apart, so we can count usage anonymously.
              </td>
              <td className="border-b border-border py-2 pr-4 align-top">Analytics (consent)</td>
              <td className="border-b border-border py-2 align-top">2 years</td>
            </tr>
            <tr>
              <td className="border-b border-border py-2 pr-4 align-top">_ga_0R7SK7GVGP</td>
              <td className="border-b border-border py-2 pr-4 align-top">Google Analytics</td>
              <td className="border-b border-border py-2 pr-4 align-top">
                Keeps session state for the analytics property.
              </td>
              <td className="border-b border-border py-2 pr-4 align-top">Analytics (consent)</td>
              <td className="border-b border-border py-2 align-top">2 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The consent record is kept in your browser&apos;s local storage, not sent to us. The
        analytics cookies are only ever set after you accept them, and Google may set further
        analytics cookies from time to time; we keep this list under review.
      </p>

      <h2>Changing your choice</h2>
      <p>
        You can change or withdraw your consent at any time. It is as easy to refuse as to accept.
        Use the button below, or the Cookie settings link in the footer of every page. You can also
        block or delete cookies in your browser settings.
      </p>
      <p>
        <CookieSettingsButton className="inline-flex h-11 items-center justify-center rounded-full border border-primary px-5 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
      </p>

      <h2>More information</h2>
      <p>
        For how we use personal data more broadly, see our Privacy Policy. For independent guidance
        on cookies and your rights, see the{" "}
        <a
          href="https://ico.org.uk/for-the-public/online/cookies/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ICO guidance on cookies
        </a>
        .
      </p>
    </LegalPage>
  );
}
