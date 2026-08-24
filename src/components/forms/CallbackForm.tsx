"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneCall, Send, CheckCircle } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, inputClasses } from "@/components/forms/fields";
import { callbackFormSchema, type CallbackFormValues } from "@/lib/validators";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { waLink, telLink } from "@/lib/contact";

const bestTimeOptions = [
  "Morning (8am - 12pm)",
  "Afternoon (12pm - 4pm)",
  "Evening (4pm - 8pm)",
  "Anytime",
];

interface CallbackFormProps {
  source?: string;
}

export function CallbackForm({ source = "hero-cta" }: CallbackFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      phone2: "",
      email: "",
      bestTime: "",
    },
  });

  async function onSubmit(values: CallbackFormValues) {
    setServerError(null);
    try {
      await submitLead({ leadType: "callback", ...values });
      track("callback_requested", { source });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-success" aria-hidden="true" />
        <h3 className="text-xl font-bold text-navy">We&apos;ll call you soon!</h3>
        <p className="mx-auto mt-2 max-w-md text-text-grey">
          One of our property advisors will reach out to you shortly. Need it faster? Send us a message directly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={waLink("Hello! I just requested a callback on your website.")}
            external
            variant="whatsapp"
          >
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

      <Field label="Full name" htmlFor="cb-name" error={errors.name?.message} required>
        <input id="cb-name" type="text" autoComplete="name" placeholder="e.g. Ada Obi" {...register("name")} className={inputClasses} />
      </Field>

      <Field label="Primary phone number" htmlFor="cb-phone" error={errors.phone?.message} required>
        <input id="cb-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 0801 234 5678" {...register("phone")} className={inputClasses} />
      </Field>

      <Field label="Alternate phone number" htmlFor="cb-phone2" error={errors.phone2?.message} required>
        <input id="cb-phone2" type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 0809 876 5432" {...register("phone2")} className={inputClasses} />
        <p className="mt-1.5 text-xs text-text-grey">In case we can&apos;t reach you on the first line.</p>
      </Field>

      <Field label="Email (optional)" htmlFor="cb-email" error={errors.email?.message}>
        <input id="cb-email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} className={inputClasses} />
      </Field>

      <Field label="Best time to call" htmlFor="cb-besttime" error={errors.bestTime?.message}>
        <select id="cb-besttime" {...register("bestTime")} className={inputClasses}>
          <option value="">Any time</option>
          {bestTimeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending\u2026" : (
          <>
            Request a Call
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
