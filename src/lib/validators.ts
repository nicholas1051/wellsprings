import { z } from "zod";

export const unitOptions = ["pearl", "moonstone", "emerald", "coral", "aquamarine", "opal", "not-sure"] as const;
export const intentOptions = [
  "book-viewing",
  "request-price",
  "talk-to-agent",
  "brochure",
] as const;

export const unitLabels: Record<(typeof unitOptions)[number], string> = {
  pearl: "Pearl: 5-Bed Villa",
  moonstone: "Moonstone: 4-Bed Semi-Detached",
  emerald: "Emerald: 4-Bed Detached Duplex",
  coral: "Coral: 4-Bed Terrace",
  aquamarine: "Aquamarine: 4-Bed Semi-Detached Villa",
  opal: "Opal: 2-Bed Apartment",
  "not-sure": "Not sure yet",
};

export const intentLabels: Record<(typeof intentOptions)[number], string> = {
  "book-viewing": "Schedule a Site Visit",
  "request-price": "Request Pricing",
  "talk-to-agent": "Speak to an Agent",
  brochure: "Request Brochure",
};

const nigerianPhone = z
  .string()
  .trim()
  .regex(/^(\+?234|0)?[789][0-9]{9}$/, "Enter a valid Nigerian phone number, e.g. 0801 234 5678");

const nameField = z.string().trim().min(2, "Enter your name");

const emailField = z.union([z.literal(""), z.string().trim().email("Enter a valid email address")]);

const unitField = z.enum(unitOptions);

export const enquiryFields = {
  unit: unitField,
  intent: z.enum(intentOptions),
  name: nameField,
  phone: nigerianPhone,
  email: emailField,
  message: z.string().trim().max(2000).optional(),
};

export const viewingFields = {
  unit: unitField,
  date: z.string().trim().min(1, "Choose a date"),
  time: z.string().trim().min(1, "Choose a time"),
  name: nameField,
  phone: nigerianPhone,
  email: emailField,
};

export const enquiryLeadSchema = z.object({
  leadType: z.literal("enquiry"),
  ...enquiryFields,
});

export const viewingLeadSchema = z.object({
  leadType: z.literal("viewing"),
  ...viewingFields,
});

export const callbackFields = {
  name: nameField,
  phone: nigerianPhone,
  phone2: nigerianPhone,
  email: emailField,
  bestTime: z.string().trim().optional(),
};

export const callbackLeadSchema = z.object({
  leadType: z.literal("callback"),
  ...callbackFields,
});

export const leadSchema = z.discriminatedUnion("leadType", [enquiryLeadSchema, viewingLeadSchema, callbackLeadSchema]);

export const enquiryFormSchema = z.object(enquiryFields);
export const viewingFormSchema = z.object(viewingFields);
export const callbackFormSchema = z.object(callbackFields);

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
export type ViewingFormValues = z.infer<typeof viewingFormSchema>;
export type CallbackFormValues = z.infer<typeof callbackFormSchema>;
export type LeadPayload = z.infer<typeof leadSchema>;
