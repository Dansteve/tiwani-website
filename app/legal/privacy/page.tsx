import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | TIWANI",
  description:
    "How TIWANI collects, uses, and protects personal data under the UK GDPR and the Data Protection Act 2018. A working draft, pending solicitor and Data Protection Officer sign-off.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="12 June 2026"
      current="/legal/privacy"
      lede={
        <p>
          This policy explains what personal data we collect, why we collect it, and the rights you
          have over it. We have written it to follow UK data protection law: the UK GDPR and the
          Data Protection Act 2018.
        </p>
      }
    >
      <h2>Who we are</h2>
      <p>
        TIWANI Ltd (TIWANI, we, us, our) runs the website at tiwanilife.com and is building the
        TIWANI app. For the personal data described here, we are the data controller: we decide
        what is collected and why. You can reach us at{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>.
      </p>
      <p>
        We are completing our registration with the UK Information Commissioner (the ICO) and our
        wider data-protection preparation, including the appointment of a data-protection contact,
        before we collect personal data at scale. We will name a Data Protection Officer here if we
        are required to appoint one, or if we choose to.
      </p>

      <h2>What this policy covers</h2>
      <p>
        Today this policy covers the website and the waitlist. The TIWANI app is still being built.
        When the app opens, it will have its own privacy notice shown at sign-up, covering the data
        a Coordinator enters to plan care. This page will be updated to cover both.
      </p>

      <h2>The information we collect</h2>
      <p>When you join the waitlist, we collect:</p>
      <ul>
        <li>
          <strong>Your email address</strong>, so we can contact you about TIWANI.
        </li>
        <li>
          <strong>Your care context</strong>: the options you tick about who you coordinate care
          for (for example a child or young person with additional needs, an older adult, someone
          with a long-term condition, or a professional role). This helps us understand who we are
          building for.
        </li>
      </ul>
      <p>
        If you give your consent, we also collect basic, privacy-respecting{" "}
        <strong>analytics</strong> about how the site is used (see our Cookie Policy). If you do not
        consent, no analytics cookies are set.
      </p>

      <h2>We do not collect health data</h2>
      <p>
        TIWANI is non-clinical infrastructure. We do not ask for, and the waitlist does not collect,
        any health, medical, or diagnosis information, and no special-category data under Article 9
        of the UK GDPR. In the app, the planning data a Coordinator enters is held as structured
        codes, scores, and timestamps; free text is never read by our scoring engine. We design to
        avoid collecting health data, and we keep what we collect to the minimum we need
        (data minimisation).
      </p>

      <h2>Why we use your data, and our lawful basis</h2>
      <p>
        We use your waitlist details to keep you informed about TIWANI, to understand the audience
        we serve, and to invite you to help shape the product. Our lawful basis for the waitlist is
        your <strong>consent</strong>, which you give when you join. You can withdraw it at any time
        (see Your rights). For the app, we expect to rely on a contract with you and on our
        legitimate interests in running the service; the app privacy notice will state this exactly.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your data. We share it only with the service providers (processors) that help
        us run TIWANI, under contract and on our instructions:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> hosts the database that stores waitlist sign-ups.
        </li>
        <li>
          <strong>SheetMonkey and Google Sheets</strong> hold a working copy of sign-ups for our
          own planning.
        </li>
        <li>
          <strong>Google / Firebase Analytics</strong> measures site usage, only if you have
          consented to analytics cookies.
        </li>
        <li>
          <strong>Firebase Hosting</strong> serves the website.
        </li>
      </ul>
      <p>
        Some of these providers may process data outside the UK. Where they do, we rely on the
        appropriate UK transfer safeguards (such as a UK adequacy decision or the UK International
        Data Transfer Agreement). We are confirming the hosting region and the specific safeguard
        for each provider as part of our launch preparation, and before we collect data at scale we
        will name the safeguard here and provide a copy of it on request from{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your waitlist details until TIWANI launches and you have had the chance to create an
        account, or until you ask us to remove you, whichever comes first. If you unsubscribe or ask
        us to delete your data, we will do so promptly.
      </p>

      <h2>Children, and the people you care for</h2>
      <p>
        TIWANI is used by adults (Coordinators), not by children. The app will hold planning
        information about the person someone cares for, which in the first release is often a child.
        We treat that data with extra care: we follow the principle that the best interests of the
        child come first, we keep data to a minimum, and we apply the standards expected by the UK
        Information Commissioner for data about children. Whether and how the ICO Children&apos;s
        Code (the Age Appropriate Design Code) applies to a service used by adults but holding data
        about children
        is a question we are taking to qualified advisers before the app collects real data.
      </p>

      <h2>Keeping your data safe</h2>
      <p>
        Your waitlist details are not readable from the public website: the sign-up list can be
        added to, but it cannot be read back by the site. In the app, access to data is restricted
        to the account it belongs to, enforced both in our application and at the database, so one
        account can never see another account&apos;s data. We use reputable, security-reviewed
        infrastructure and keep the data we hold to a minimum.
      </p>

      <h2>Our data protection impact assessment</h2>
      <p>
        Because TIWANI will process data about vulnerable people, we will complete a Data Protection
        Impact Assessment (DPIA), and act on it, before the app processes real family data. The DPIA
        looks hard at the risks and how we reduce them. This is part of our launch preparation, not
        an afterthought.
      </p>

      <h2>Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>ask for a copy of the personal data we hold about you;</li>
        <li>ask us to correct data that is wrong or incomplete;</li>
        <li>ask us to delete your data;</li>
        <li>ask us to restrict or stop using your data, or object to our using it;</li>
        <li>ask us to move your data to another service (portability);</li>
        <li>withdraw your consent at any time, including for analytics and for waitlist emails.</li>
      </ul>
      <p>
        To use any of these rights, email{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>. You also have the right to
        complain to the ICO at{" "}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
          ico.org.uk/make-a-complaint
        </a>
        , though we would welcome the chance to put things right first.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this policy as TIWANI grows, in particular when the app launches. We will
        change the date at the top and, for significant changes, let waitlist members know.
      </p>

      <h2>Contact us</h2>
      <p>
        For anything about your data or this policy, email{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a>.
      </p>
    </LegalPage>
  );
}
