import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${site.brandName}`,
  description: `The terms that govern your use of the ${site.brandName} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: [
      `By accessing ${site.brandName} at ${site.siteUrl}, you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    title: "2. Information about homes",
    body: [
      "We make every effort to describe our homes accurately. Images, floor plans, and specifications are indicative and may change as construction progresses. Confirm final specifications in writing before purchase.",
      "Prices and availability shown on the site may change without notice and do not constitute an offer or a binding commitment.",
    ],
  },
  {
    title: "3. Enquiries and site visits",
    body: [
      "Information you submit through the site is used to respond to you. Site visits are arranged by appointment and are not an offer of sale. Final purchase terms are agreed in writing.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "The content of this site (text, images, floor plans, and branding) belongs to us or our licensors and may not be reproduced without permission.",
    ],
  },
  {
    title: "5. Limitation of liability",
    body: [
      "The site is provided on an \u201cas is\u201d basis. To the extent permitted by law, we are not liable for any loss arising from use of the site or reliance on its content.",
    ],
  },
  {
    title: "6. Changes to these terms",
    body: [
      "We may update these terms from time to time. The latest version will always be published on this page.",
    ],
  },
  {
    title: "7. Governing law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <header className="bg-off-white pb-8 pt-28 sm:pt-36">
        <div className="container-site">
          <h1 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-text-grey">
            Last updated: [Date]. [TBC — review with legal counsel before publishing.]
          </p>
        </div>
      </header>

      <section className="bg-warm-white py-14">
        <div className="container-site max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-navy">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 60)} className="mt-3 leading-relaxed text-text-grey">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
