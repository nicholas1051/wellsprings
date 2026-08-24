"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, inputClasses, textAreaClasses } from "@/components/forms/fields";
import { waLink, telLink } from "@/lib/contact";
import {
  intentLabels,
  intentOptions,
  unitLabels,
  unitOptions,
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/validators";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";

interface EnquiryFormProps {
  defaultUnit?: string;
  source?: string;
}

export function EnquiryForm({ defaultUnit = "not-sure", source = "enquiry-form" }: EnquiryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      unit: defaultUnit as EnquiryFormValues["unit"],
      intent: "book-viewing",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: EnquiryFormValues) {
    setServerError(null);
    try {
      await submitLead({ leadType: "enquiry", ...values });
      track("enquiry_submit", { unit: values.unit, intent: values.intent, source });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-success" aria-hidden="true" />
        <h3 className="text-xl font-bold text-navy">Enquiry sent — thank you.</h3>
        <p className="mx-auto mt-2 max-w-md text-text-grey">
          We&apos;ll get back to you within one business day. For anything urgent, message us on WhatsApp or call us directly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink href={waLink("Hello! I just sent an enquiry on your website and wanted to follow up.")} external variant="whatsapp">
            WhatsApp Us
          </ButtonLink>
          <ButtonLink href={telLink()} variant="outline">
            Call Us
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {serverError ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm font-medium text-error">
          {serverError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Interested home" htmlFor="enq-unit" error={errors.unit?.message} required>
          <select id="enq-unit" {...register("unit")} className={inputClasses}>
            {unitOptions.map((option) => (
              <option key={option} value={option}>
                {unitLabels[option]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="What would you like to do?" htmlFor="enq-intent" error={errors.intent?.message} required>
          <select id="enq-intent" {...register("intent")} className={inputClasses}>
            {intentOptions.map((option) => (
              <option key={option} value={option}>
                {intentLabels[option]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="enq-name" error={errors.name?.message} required>
          <input id="enq-name" type="text" autoComplete="name" placeholder="e.g. Ada Obi" {...register("name")} className={inputClasses} />
        </Field>
        <Field label="Phone (WhatsApp-friendly)" htmlFor="enq-phone" error={errors.phone?.message} required>
          <input id="enq-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 0801 234 5678" {...register("phone")} className={inputClasses} />
        </Field>
      </div>

      <Field label="Email (optional)" htmlFor="enq-email" error={errors.email?.message} hint="Only used to send you the information you ask for.">
        <input id="enq-email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} className={inputClasses} />
      </Field>

      <Field label="Message (optional)" htmlFor="enq-message" error={errors.message?.message}>
        <textarea
          id="enq-message"
          rows={4}
          placeholder="Tell us anything that would help us prepare, e.g. preferred location within the estate or budget range."
          {...register("message")}
          className={textAreaClasses}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : (
            <>
              Send Enquiry
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-xs text-text-grey">We respond within one business day. Your details are never shared.</p>
      </div>
    </form>
  );
}
