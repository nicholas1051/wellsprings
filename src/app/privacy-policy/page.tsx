import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.brandName}`,
  description: `How ${site.legalName} collects, uses, and protects your personal information under the Nigeria Data Protection Act.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false },
};

const sections = [
  {
    title: "1. Who we are",
    body: [
      `${site.legalName} ("we", "us", "our") operates ${site.brandName} at ${site.siteUrl}. This policy explains how we handle personal information we collect through this website.`,
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "When you use this site we may collect: your name, phone number, email address, the home type you are interested in, and any message you send through our enquiry or viewing forms.",
      "We also collect limited technical data (such as the pages you visit) so we can understand how the site is used. Where analytics and advertising tools are enabled, we may collect device and browsing signals as described in their privacy policies.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use your details to respond to enquiries, arrange and confirm site viewings, send information about our homes, and (only with your consent) send marketing updates you can opt out of at any time.",
    ],
  },
  {
    title: "4. Legal basis",
    body: [
      "We process your information on the basis of your consent, our legitimate interest in responding to your enquiries, or as needed to take steps at your request before entering a contract.",
    ],
  },
  {
    title: "5. Sharing and disclosure",
    body: [
      "We do not sell your personal information. We only share it with service providers who help us operate this site and deliver our services (for example, email delivery), under obligations of confidentiality, or where the law requires us to.",
    ],
  },
  {
    title: "6. Data retention",
    body: [
      "We keep enquiry records for as long as needed to respond to you and to meet our legal and accounting obligations. After that, records are securely deleted.",
    ],
  },
  {
    title: "7. Security",
    body: [
      "We apply reasonable technical and organisational measures to protect your information. No method of transmission over the internet is fully secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "8. Your rights",
    body: [
      "Under the Nigeria Data Protection Act you may have rights to access, correct, or delete your personal information, to withdraw consent, and to complain to the Nigeria Data Protection Commission. To exercise any right, contact us at the details below.",
    ],
  },
  {
    title: "9. Contact us",
    body: [
      `For privacy questions or requests, contact ${site.email} or call ${site.phone.display}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="bg-off-white pb-8 pt-28 sm:pt-36">
        <div className="container-site">
          <h1 className="font-heading text-3xl tracking-tight text-navy sm:text-4xl">
            Privacy Policy
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
