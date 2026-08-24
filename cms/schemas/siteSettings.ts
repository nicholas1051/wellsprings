import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "phoneAlt", title: "Alternative Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "officeAddress", title: "Office Address", type: "string" }),
    defineField({ name: "salesHours", title: "Sales Hours", type: "string" }),
    defineField({ name: "siteVisitNote", title: "Site Visit Note", type: "text" }),
    defineField({
      name: "socialLinks",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "x", type: "url" }),
      ],
    }),
    defineField({
      name: "availability",
      title: "Live Availability",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "propertyRef", type: "reference", to: [{ type: "property" }] }),
          defineField({ name: "totalUnits", type: "number" }),
          defineField({ name: "soldUnits", type: "number" }),
          defineField({ name: "reservedUnits", type: "number" }),
          defineField({ name: "currentPriceOverride", type: "number", description: "Override price if different from property base" }),
          defineField({ name: "updatedAt", type: "datetime" }),
        ],
      }],
    }),
    defineField({
      name: "paymentPlans",
      title: "Payment Plans",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({ name: "minDepositPercent", type: "number" }),
          defineField({ name: "maxInstallments", type: "number" }),
          defineField({ name: "isActive", type: "boolean", initialValue: true }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: "brandName", subtitle: "tagline" },
  },
});
