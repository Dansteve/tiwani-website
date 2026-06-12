import {
  Baby,
  HeartHandshake,
  Stethoscope,
  Users,
  Scale,
  Landmark,
  PoundSterling,
  BookOpen,
  ShieldCheck,
  LifeBuoy,
  ClipboardList,
  Activity,
  Share2,
  Bell,
  type LucideIcon,
} from "lucide-react";

// The four audience pages, as data. One content model drives the /for hub and every /for/<slug>
// page, so the structure, voice, and link hygiene stay consistent and the curated resource links
// live in ONE place that is easy to keep current (the content-manager lens audits this file).
//
// Hard boundaries baked into the copy here:
//  - Non-clinical: TIWANI suggests, it never instructs; nothing here is medical advice. The copy
//    describes what the product DOES (prepare, share, signal, signpost), never an outcome it
//    cannot evidence (no "reduces stress", no health claim). The authoritative orgs below are the
//    source of any guidance, not TIWANI.
//  - No overclaiming (ASA/CAP): claims are honest, hedged, and grounded in real features
//    (the Life Continuity Engine §4.4, the Index §4.8, the Continuity Card §4.6, the gentle
//    Erosion Alerts §4.9). The promotion lens audits this file.
//  - Every external link is verified to resolve (HTTP 200) and to be the current, correct
//    authoritative UK source (GOV.UK / NHS / a named charity or regulator), checked 2026-06-12.

export interface ResourceLink {
  /** Descriptive link text: the organisation or page name (never "click here"). */
  name: string;
  /** A verified, current authoritative UK URL. */
  href: string;
  /** One plain-language line on what it is and who it is for. */
  blurb: string;
}

export interface ResourceGroup {
  title: string;
  icon: LucideIcon;
  links: ResourceLink[];
}

export interface HelpPoint {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface Audience {
  /** URL slug under /for/. */
  slug: string;
  /** The card icon, shared with the landing AudienceSection. */
  icon: LucideIcon;
  /** Short label for nav and cross-links. */
  nav: string;
  /** The audience label (matches the landing AudienceSection). */
  cardTitle: string;
  /** One-line summary for the hub card. */
  cardBlurb: string;
  /** Hero eyebrow. */
  eyebrow: string;
  /** Hero heading (the page H1). */
  title: string;
  /** Hero intro paragraphs. */
  intro: string[];
  /** How TIWANI helps this audience, grounded in real features. */
  helps: HelpPoint[];
  /** One line framing the resource list (TIWANI signposts; it is not the source). */
  resourcesIntro: string;
  /** Curated, verified authoritative resources, grouped. */
  resources: ResourceGroup[];
  /** Per-page SEO. */
  seoTitle: string;
  seoDescription: string;
}

const NON_SOURCE =
  "TIWANI is not the source of this guidance, these organisations are. Each link opens an official or established UK service in a new tab.";

export const AUDIENCES: Audience[] = [
  {
    slug: "children",
    icon: Baby,
    nav: "Children & young people",
    cardTitle: "A child or young person with additional needs",
    cardBlurb:
      "For families raising a child or young person with additional needs (SEND).",
    eyebrow: "Children and young people",
    title: "When you care for a child with additional needs",
    intro: [
      "If you care for a child or young person with additional needs, you carry a mountain of detail: what helps, what to avoid, who to call, and what is coming next. TIWANI is built to hold some of that load with you.",
      "It is private and non-clinical. It helps you prepare and share, it suggests rather than instructs, and it points you to trusted UK organisations when you need more than a plan.",
    ],
    helps: [
      {
        icon: ClipboardList,
        title: "Turn what you know into a ready plan",
        body: "When something is coming up, a medical appointment, a school trip, a haircut, TIWANI turns what you already know about your child into a short preparation plan: what to expect, a suggested approach, and a short, ranked list of strategies to try. You accept, edit, or ignore any of it.",
      },
      {
        icon: Share2,
        title: "Hand school or a carer one clear page",
        body: "Share a one-page Continuity Card with a teacher, a relative, or a holiday club, so you do not have to explain your child from scratch every time. It carries what helps and what to avoid. No personal details travel in the link.",
      },
      {
        icon: Activity,
        title: "See whether life is holding",
        body: "Quick check-ins after the things you prepare for build a simple, private signal of whether family life is steady or quietly narrowing, across the areas that matter. It is a prompt to pause, never a diagnosis.",
      },
      {
        icon: Bell,
        title: "A gentle nudge toward real support",
        body: "If one area has been under pressure for a while, TIWANI gives you a calm, dismissible heads-up and points to trusted organisations like the ones below. It signposts; it never diagnoses.",
      },
    ],
    resourcesIntro: NON_SOURCE,
    resources: [
      {
        title: "Your rights and the SEND system",
        icon: Scale,
        links: [
          {
            name: "GOV.UK: special educational needs and disabilities (SEND)",
            href: "https://www.gov.uk/children-with-special-educational-needs",
            blurb:
              "How the SEND system works in England, from extra help at school to education, health and care (EHC) plans.",
          },
          {
            name: "IPSEA (Independent Provider of Special Education Advice)",
            href: "https://www.ipsea.org.uk/",
            blurb:
              "Free, legally based advice on SEND support, EHC plans, and appeals.",
          },
          {
            name: "GOV.UK: find your local council",
            href: "https://www.gov.uk/find-local-council",
            blurb:
              "Reach your council's Local Offer: the SEND services, advice, and support available in your area.",
          },
        ],
      },
      {
        title: "Money and practical help",
        icon: PoundSterling,
        links: [
          {
            name: "GOV.UK: financial help if you have a disabled child",
            href: "https://www.gov.uk/help-for-disabled-child",
            blurb:
              "Benefits, grants, and other financial support for families raising a disabled child.",
          },
          {
            name: "GOV.UK: Disability Living Allowance (DLA) for children",
            href: "https://www.gov.uk/disability-living-allowance-children",
            blurb:
              "Help with the extra costs of looking after a child under 16 who has a disability or health condition.",
          },
          {
            name: "Family Fund",
            href: "https://www.familyfund.org.uk/",
            blurb:
              "Grants for lower-income families raising a disabled or seriously ill child or young person.",
          },
        ],
      },
      {
        title: "Information and community",
        icon: Users,
        links: [
          {
            name: "Contact (for families with disabled children)",
            href: "https://contact.org.uk/",
            blurb:
              "A free helpline, guides, and a community for families, whatever your child's condition or diagnosis.",
          },
          {
            name: "National Autistic Society",
            href: "https://www.autism.org.uk/",
            blurb: "Information and support for autistic people and their families.",
          },
          {
            name: "Mencap",
            href: "https://www.mencap.org.uk/",
            blurb:
              "Advice and support for people with a learning disability and those who care for them.",
          },
        ],
      },
    ],
    seoTitle: "Caring for a child with additional needs | TIWANI",
    seoDescription:
      "How TIWANI helps families raising a child or young person with additional needs (SEND), plus trusted UK resources from GOV.UK, the NHS, IPSEA, Contact, and more.",
  },
  {
    slug: "older-adults",
    icon: HeartHandshake,
    nav: "Older adults",
    cardTitle: "An older adult who needs more support",
    cardBlurb:
      "For anyone helping an older adult stay safe, well, and themselves.",
    eyebrow: "Older adults",
    title: "When you support an older adult who needs more help",
    intro: [
      "If you are helping an older adult stay safe, well, and themselves, the planning rarely stops, and your own life can quietly shrink around it. TIWANI is built to help you keep the planning in one place.",
      "It is private and non-clinical. It helps you prepare and share, it suggests rather than instructs, and it points you to trusted UK organisations for the support you and they are entitled to.",
    ],
    helps: [
      {
        icon: ClipboardList,
        title: "Prepare for the appointments and changes",
        body: "Turn what you know about the person you support into a short plan for the things that take real planning: a hospital appointment, a change of routine, a visit from a new carer. Suggestions only; you decide what fits.",
      },
      {
        icon: Share2,
        title: "One clear page for everyone who helps",
        body: "A Continuity Card hands a relative, a respite carer, or a care worker the essentials at a glance: what helps, what to avoid, and what matters to the person. No personal data travels in the link.",
      },
      {
        icon: Activity,
        title: "Notice when your own life narrows",
        body: "Caring for an older adult can quietly take over. Quick check-ins build a private signal of whether your own life is holding, so a steady squeeze is easier to spot.",
      },
      {
        icon: Bell,
        title: "Pointed toward the right support, sooner",
        body: "When an area has been under strain, a gentle heads-up points you to organisations like Carers UK and Age UK, and to your council's adult social care. It signposts, never instructs.",
      },
    ],
    resourcesIntro: NON_SOURCE,
    resources: [
      {
        title: "Care and support",
        icon: LifeBuoy,
        links: [
          {
            name: "NHS: social care and support guide",
            href: "https://www.nhs.uk/social-care-and-support/",
            blurb:
              "Where to start with care at home, in the community, or in a care home, and how to pay for it.",
          },
          {
            name: "GOV.UK: apply for a needs assessment by social services",
            href: "https://www.gov.uk/apply-needs-assessment-social-services",
            blurb:
              "The free assessment that decides what care and support your council can arrange.",
          },
          {
            name: "Care Quality Commission (CQC)",
            href: "https://www.cqc.org.uk/",
            blurb:
              "Check inspection ratings for care homes and home-care services in England.",
          },
        ],
      },
      {
        title: "Money and carer support",
        icon: PoundSterling,
        links: [
          {
            name: "GOV.UK: Carer's Allowance",
            href: "https://www.gov.uk/carers-allowance",
            blurb:
              "The main benefit for people who spend a substantial amount of time caring for someone.",
          },
          {
            name: "GOV.UK: Attendance Allowance",
            href: "https://www.gov.uk/attendance-allowance",
            blurb:
              "Help with extra costs for people over State Pension age who need help with personal care.",
          },
          {
            name: "Carers UK",
            href: "https://www.carersuk.org/",
            blurb:
              "Expert advice, information, and support for unpaid carers across the UK.",
          },
        ],
      },
      {
        title: "Information and community",
        icon: Users,
        links: [
          {
            name: "Age UK",
            href: "https://www.ageuk.org.uk/",
            blurb:
              "Information, advice, and local services for older people and those who support them.",
          },
          {
            name: "Alzheimer's Society",
            href: "https://www.alzheimers.org.uk/",
            blurb: "Support and information for anyone affected by dementia.",
          },
          {
            name: "Dementia UK (Admiral Nurses)",
            href: "https://www.dementiauk.org/",
            blurb:
              "Specialist dementia nurses and a free Helpline for families facing dementia.",
          },
        ],
      },
    ],
    seoTitle: "Supporting an older adult | TIWANI",
    seoDescription:
      "How TIWANI helps you support an older adult, plus trusted UK resources from the NHS, GOV.UK, Age UK, Carers UK, and more.",
  },
  {
    slug: "long-term-conditions",
    icon: Stethoscope,
    nav: "Long-term conditions",
    cardTitle: "Someone living with a long-term condition",
    cardBlurb:
      "For people living with a long-term condition, and those who help them.",
    eyebrow: "Long-term conditions",
    title: "Living with a long-term condition",
    intro: [
      "Whether it is your own long-term condition or one you help someone manage, the harder days take planning, and life can narrow without anyone noticing. TIWANI is built to help you keep track of what helps.",
      "It is private and non-clinical. It helps you prepare and share, it suggests rather than instructs, and it points you to trusted UK organisations and your own care team.",
    ],
    helps: [
      {
        icon: ClipboardList,
        title: "Plan for the harder days and the big appointments",
        body: "Turn your own experience of the condition into a short plan for what takes preparation: a clinic visit, a flare, a return to work. TIWANI suggests; you stay in charge.",
      },
      {
        icon: Share2,
        title: "Share what works in one tap",
        body: "A Continuity Card gives a new clinician, an employer, or someone supporting you a clear summary of what helps and what to avoid, without starting the story over each time. No personal data travels in the link.",
      },
      {
        icon: Activity,
        title: "A private read on whether life is holding",
        body: "Living with a long-term condition can slowly narrow what you do. Quick check-ins build a simple, private signal of whether life is steady or shrinking, so a slow change is easier to spot.",
      },
      {
        icon: Bell,
        title: "Trusted next steps when things get heavy",
        body: "If an area has been under pressure, TIWANI nudges you, gently, toward trusted organisations and your own care team. It is not medical advice; it points you to it.",
      },
    ],
    resourcesIntro: NON_SOURCE,
    resources: [
      {
        title: "Health and care",
        icon: Stethoscope,
        links: [
          {
            name: "NHS: health A to Z",
            href: "https://www.nhs.uk/conditions/",
            blurb:
              "Clear NHS information on conditions, symptoms, and treatments, and where to get help.",
          },
          {
            name: "NHS: social care and support guide",
            href: "https://www.nhs.uk/social-care-and-support/",
            blurb:
              "Practical help with daily living, care at home, equipment, and support for carers.",
          },
        ],
      },
      {
        title: "Money and work",
        icon: PoundSterling,
        links: [
          {
            name: "GOV.UK: Personal Independence Payment (PIP)",
            href: "https://www.gov.uk/pip",
            blurb:
              "Help with extra costs of a long-term health condition or disability for working-age adults.",
          },
          {
            name: "GOV.UK: Employment and Support Allowance (ESA)",
            href: "https://www.gov.uk/employment-support-allowance",
            blurb:
              "Financial support if a health condition or disability affects how much you can work.",
          },
          {
            name: "GOV.UK: financial help if you are disabled",
            href: "https://www.gov.uk/financial-help-disabled",
            blurb:
              "An overview of the benefits, grants, and concessions you may be entitled to.",
          },
        ],
      },
      {
        title: "Rights, advice, and carer support",
        icon: Scale,
        links: [
          {
            name: "Disability Rights UK",
            href: "https://www.disabilityrightsuk.org/",
            blurb:
              "Information and advice on rights, benefits, work, and independent living, led by disabled people.",
          },
          {
            name: "Citizens Advice",
            href: "https://www.citizensadvice.org.uk/",
            blurb:
              "Free, confidential advice on benefits, work, housing, and more, in person and online.",
          },
          {
            name: "Carers UK",
            href: "https://www.carersuk.org/",
            blurb:
              "Advice and support if you care for someone living with a long-term condition.",
          },
        ],
      },
    ],
    seoTitle: "Living with a long-term condition | TIWANI",
    seoDescription:
      "How TIWANI helps people living with a long-term condition, and those who support them, plus trusted UK resources from the NHS, GOV.UK, Disability Rights UK, and more.",
  },
  {
    slug: "professionals",
    icon: Users,
    nav: "Professionals",
    cardTitle: "Professionals working with caregiving families",
    cardBlurb:
      "For practitioners in health, social care, education, and the voluntary sector.",
    eyebrow: "Professionals",
    title: "For professionals working with caregiving families",
    intro: [
      "If you work alongside caregiving families, in social care, health, education, or the voluntary sector, you know how much rides on what a family can tell you, and how stretched they often are. TIWANI is infrastructure those families use to prepare, organise, and share.",
      "It is non-clinical by design. It suggests, it never instructs, it holds no health records, and it signposts to the same authoritative sources you rely on. It is built to make a family's knowledge easier to share with you, not to replace your judgement.",
    ],
    helps: [
      {
        icon: Share2,
        title: "A clearer picture from the family",
        body: "When a family you support uses TIWANI, they can share a Continuity Card: one clear page of what helps and what to avoid for the person they care for, in their own words, so the basics are there from the start.",
      },
      {
        icon: ClipboardList,
        title: "Preparation the family owns",
        body: "TIWANI helps families turn lived experience into reusable preparation plans for the events that take planning. They are suggestions the family accepts or edits, so the plan is theirs, not imposed.",
      },
      {
        icon: Activity,
        title: "An early, non-clinical signal of strain",
        body: "A family's private continuity signal can prompt a conversation early, rather than only after things come to a head. It is a planning prompt the family chooses to share, never a clinical assessment or a record you hold.",
      },
      {
        icon: ShieldCheck,
        title: "Built to signpost, within the boundary",
        body: "TIWANI is non-clinical infrastructure. It points families to statutory and community support, the same authoritative sources listed below, and never offers medical advice.",
      },
    ],
    resourcesIntro:
      "Reference points for carer-aware, person-centred practice. Each link opens an official or established UK source in a new tab.",
    resources: [
      {
        title: "Standards and evidence",
        icon: BookOpen,
        links: [
          {
            name: "NICE (National Institute for Health and Care Excellence)",
            href: "https://www.nice.org.uk/",
            blurb:
              "Evidence-based guidance and quality standards for health, public health, and social care.",
          },
          {
            name: "SCIE (Social Care Institute for Excellence)",
            href: "https://www.scie.org.uk/",
            blurb:
              "Practice resources on care and support, co-production, and safeguarding.",
          },
          {
            name: "Research in Practice",
            href: "https://www.researchinpractice.org.uk/",
            blurb:
              "Evidence-informed resources and learning for people working across children's and adults' services.",
          },
        ],
      },
      {
        title: "Law and statutory guidance",
        icon: Landmark,
        links: [
          {
            name: "GOV.UK: Care and support statutory guidance (Care Act 2014)",
            href: "https://www.gov.uk/government/publications/care-act-statutory-guidance",
            blurb:
              "The statutory guidance that underpins adult social care duties in England.",
          },
          {
            name: "GOV.UK: SEND code of practice, 0 to 25 years",
            href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
            blurb:
              "The statutory guidance for organisations working with children and young people with SEND.",
          },
          {
            name: "Care Quality Commission (CQC)",
            href: "https://www.cqc.org.uk/",
            blurb:
              "The independent regulator of health and adult social care in England.",
          },
        ],
      },
      {
        title: "Workforce and carer-aware practice",
        icon: Users,
        links: [
          {
            name: "Skills for Care",
            href: "https://www.skillsforcare.org.uk/",
            blurb:
              "Workforce development and good-practice resources for the adult social care sector.",
          },
          {
            name: "Carers Trust",
            href: "https://carers.org/",
            blurb:
              "A network supporting unpaid carers, with resources for the professionals who work with them.",
          },
          {
            name: "Think Local Act Personal (TLAP)",
            href: "https://www.thinklocalactpersonal.org.uk/",
            blurb:
              "A partnership for personalised, community-based care and support.",
          },
        ],
      },
    ],
    seoTitle: "For professionals supporting carers | TIWANI",
    seoDescription:
      "How TIWANI supports professionals who work with caregiving families, with non-clinical, person-centred infrastructure and trusted UK reference points (NICE, SCIE, GOV.UK, CQC).",
  },
];

export const AUDIENCE_SLUGS: string[] = AUDIENCES.map((a) => a.slug);

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}
