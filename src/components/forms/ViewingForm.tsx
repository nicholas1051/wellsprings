"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Send } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, inputClasses } from "@/components/forms/fields";
import { CalendarPicker, TimeSlotPicker } from "@/components/ui/CalendarPicker";
import { waLink, telLink } from "@/lib/contact";
import {
  unitLabels,
  unitOptions,
  viewingFormSchema,
  type ViewingFormValues,
} from "@/lib/validators";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";

interface ViewingFormProps {
  defaultUnit?: string;
  source?: string;
}

export function ViewingForm({ defaultUnit = "not-sure", source = "viewing-modal" }: ViewingFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ViewingFormValues>({
    resolver: zodResolver(viewingFormSchema),
    defaultValues: {
      unit: defaultUnit as ViewingFormValues["unit"],
      email: "",
    },
  });

  async function onSubmit(values: ViewingFormValues) {
    setServerError(null);
    try {
      await submitLead({ leadType: "viewing", ...values });
      track("viewing_booked", { unit: values.unit, source });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center">
        <CalendarCheck className="mx-auto mb-3 h-10 w-10 text-success" aria-hidden="true" />
        <h3 className="text-xl font-bold text-navy">Viewing request received.</h3>
        <p className="mx-auto mt-2 max-w-md text-text-grey">
          We&apos;ll confirm your appointment by phone or WhatsApp shortly. Need it faster? Send us a message directly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={waLink("Hello! I just requested a viewing on your website and wanted to confirm my appointment.")}
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

      <Field label="Which home would you like to see?" htmlFor="view-unit" error={errors.unit?.message} required>
        <select id="view-unit" {...register("unit")} className={inputClasses}>
          {unitOptions.map((option) => (
            <option key={option} value={option}>
              {unitLabels[option]}
            </option>
          ))}
        </select>
      </Field>

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Field label="Preferred date" htmlFor="view-date" error={errors.date?.message} required>
            <div className="rounded-xl border border-grey-line bg-white p-3">
              <CalendarPicker value={field.value ?? ""} onChange={field.onChange} />
            </div>
          </Field>
        )}
      />

      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <Field label="Preferred time" htmlFor="view-time" error={errors.time?.message} required>
            <TimeSlotPicker value={field.value ?? ""} onChange={field.onChange} />
          </Field>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="view-name" error={errors.name?.message} required>
          <input id="view-name" type="text" autoComplete="name" placeholder="e.g. Ada Obi" {...register("name")} className={inputClasses} />
        </Field>
        <Field label="Phone (WhatsApp-friendly)" htmlFor="view-phone" error={errors.phone?.message} required>
          <input id="view-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 0801 234 5678" {...register("phone")} className={inputClasses} />
        </Field>
      </div>

      <Field label="Email (optional)" htmlFor="view-email" error={errors.email?.message}>
        <input id="view-email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} className={inputClasses} />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending\u2026" : (
          <>
            Request Viewing
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
