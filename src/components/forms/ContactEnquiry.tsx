"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { unitOptions, type EnquiryFormValues } from "@/lib/validators";

export function ContactEnquiry() {
  const params = useSearchParams();
  const unit = params.get("unit");

  const defaultUnit: EnquiryFormValues["unit"] =
    unit && (unitOptions as readonly string[]).includes(unit)
      ? (unit as EnquiryFormValues["unit"])
      : "not-sure";

  return <EnquiryForm defaultUnit={defaultUnit} source="contact-page" />;
}
