import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | TIWANI",
  description:
    "The terms for using the TIWANI website and joining the waitlist, including the non-clinical disclaimer and your consumer rights. A working draft, pending solicitor sign-off.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="12 June 2026"
      current="/legal/terms"
      lede={
        <p>
          These terms explain the basis on which you may use the TIWANI website and join the
          waitlist. Please read them alongside our Privacy Policy and Cookie Policy.
        </p>
      }
    >
      <h2>About these terms</h2>
      <p>
        These terms are between you and TIWANI Ltd (TIWANI, we, us, our). By using tiwanilife.com or
        joining the waitlist, you agree to them. If you do not agree, please do not use the site.
      </p>

      <h2>TIWANI is not medical or clinical advice</h2>
      <p>
        TIWANI is a non-clinical planning and organisation tool. It does not diagnose, assess,
        treat, monitor, or manage any health condition, and nothing it shows is medical, clinical,
        or professional advice. It offers suggestions you can accept, edit, or reject; you remain
        responsible for your own decisions.
      </p>
      <p>
        TIWANI does not replace advice or support from qualified professionals, such as your GP, NHS
        services, social care, your local authority, or other specialists. Never disregard or delay
        seeking professional advice because of something you have read or seen in TIWANI.
      </p>
      <p>
        <strong>In an emergency, or if someone is at risk of harm, call 999.</strong> For urgent
        health concerns, call NHS 111 or visit 111.nhs.uk. If you or someone else is in a
        mental-health crisis, you can call NHS 111 and choose the mental-health option, or call
        Samaritans free at any time on 116 123.
      </p>

      <h2>What TIWANI is</h2>
      <p>
        TIWANI helps families and carers turn lived experience into structured preparation plans,
        and shows a signal of how daily life is holding, so people can plan ahead. It is
        infrastructure for organisation and foresight. It is not a clinical, diagnostic, or risk
        assessment, and any score or signal it shows is a general planning aid, not a measurement of
        anyone&apos;s health.
      </p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist is free and is not a purchase. It does not guarantee a place, priority
        or early access, a particular launch date, or that the product will launch at all. We may
        change, pause, or end the waitlist or the product. We will only use your waitlist details as
        described in our Privacy Policy.
      </p>

      <h2>Using the site responsibly</h2>
      <p>
        Please use the site only for lawful, personal purposes. Do not attempt to access data
        belonging to other people, disrupt or probe the security of the site, scrape or copy it at
        scale, reverse engineer it, or upload anything harmful or unlawful.
      </p>

      <h2>Intellectual property, and your information</h2>
      <p>
        The TIWANI name, brand, design, content, and software are owned by us or our licensors, and
        are protected by law. You may view and use the site for your own personal use. Any
        information you provide to us remains yours; you grant us a limited licence to use it only to
        provide and improve the service, as set out in our Privacy Policy.
      </p>

      <h2>Availability</h2>
      <p>
        The site is provided on an as-is and as-available basis. As an early-stage, pre-launch
        service, we cannot promise that it will always be available, complete, or error-free, and we
        may change or withdraw features.
      </p>

      <h2>Our responsibility to you</h2>
      <p>
        Nothing in these terms limits or excludes our liability where the law does not allow it. In
        particular, we do not exclude or limit our liability for death or personal injury caused by
        our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot
        be excluded or limited under UK law. Your statutory rights as a consumer are not affected by
        these terms.
      </p>
      <p>
        Subject to the above, because the site is currently a free, pre-launch service, we are not
        responsible for any loss that was not foreseeable, or that arises from using the site in a
        way we did not intend. We will always act fairly and in good faith.
      </p>

      <h2>Privacy and cookies</h2>
      <p>
        How we handle your data is set out in our Privacy Policy and Cookie Policy, which form part
        of these terms.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms as TIWANI develops. We will change the date at the top, and for
        significant changes we will take reasonable steps to let you know. Continuing to use the site
        after a change means you accept the updated terms.
      </p>

      <h2>Governing law and where you can bring a claim</h2>
      <p>
        These terms are governed by the law of England and Wales. If you are a consumer, you keep
        the mandatory protections of the law where you live, and you may bring proceedings in your
        local courts.
      </p>

      <h2>Contact us</h2>
      <p>
        For any question or complaint about these terms or the site, email{" "}
        <a href="mailto:hello@tiwanilife.com">hello@tiwanilife.com</a> and we will respond as quickly
        as we can.
      </p>
    </LegalPage>
  );
}
