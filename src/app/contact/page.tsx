import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageBackground } from "@/components/ui/PageBackground";
import { ContactEnquiry } from "@/components/forms/ContactEnquiry";
import { site } from "@/data/site";
import { telLink, mailLink, waLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: `Contact Us | ${site.brandName}`,
  description: `Reach the ${site.brandName} sales team by phone, WhatsApp, email, or visit the sales office at ${site.officeAddress}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageBackground blobs={[
      { color: "terracotta", size: 800, className: "top-[-200px] right-[-200px]" },
      { color: "blue", size: 600, className: "bottom-[-100px] left-[-150px]", delay: 0.3 },
    ]}>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-gate-1.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(23,38,58,.88) 0%, rgba(23,38,58,.75) 40%, rgba(23,38,58,.82) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 container-site py-28 sm:pt-36 sm:pb-12">
          <p className="eyebrow mb-3 text-brand-blue">Contact</p>
          <h1 className="font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            Talk to us about a home
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Call, WhatsApp, or send a message. We respond within one business day.
          </p>
        </div>
      </header>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-navy">Contact details</h2>
                <a
                  href={telLink()}
                  data-track="call_click"
                  data-track-label="contact-page"
                  className="flex items-center gap-4 rounded-xl border border-grey-line bg-white p-5 transition-colors hover:border-terracotta/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-blue">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-grey">Phone</span>
                    <span className="font-semibold text-navy">{site.phone.display}</span>
                  </span>
                </a>
                <a
                  href={telLink()}
                  className="flex items-center gap-4 rounded-xl border border-grey-line bg-white p-5 transition-colors hover:border-terracotta/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-blue">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-grey">Alt. Phone</span>
                    <span className="font-semibold text-navy">{site.phoneAlt.display}</span>
                  </span>
                </a>
                <a
                  href={mailLink()}
                  className="flex items-center gap-4 rounded-xl border border-grey-line bg-white p-5 transition-colors hover:border-terracotta/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-blue">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-grey">Email</span>
                    <span className="font-semibold text-navy">{site.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-grey-line bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-blue">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-grey">Sales Office</span>
                    <span className="font-semibold text-navy">{site.officeAddress}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-grey-line bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-blue">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-grey">Sales Hours</span>
                    <span className="font-semibold text-navy">{site.salesHours}</span>
                  </span>
                </div>

                <div className="pt-4 space-y-3">
                  <ButtonLink
                    href={waLink("Hello! I'm interested in the homes at Wellsprings Ibadan.")}
                    external
                    variant="whatsapp"
                    className="w-full"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Chat on WhatsApp
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-grey-line bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-navy">Send an Enquiry</h2>
                <p className="mt-1 text-sm text-text-grey">
                  Tell us what you are looking for. We will get back to you or arrange a call at a time that works.
                </p>
                <div className="mt-6">
                  <Suspense fallback={<p className="py-8 text-center text-sm text-text-grey">Loading form...</p>}>
                    <ContactEnquiry />
                  </Suspense>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageBackground>
  );
}
