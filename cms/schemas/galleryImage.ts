import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({ name: "src", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Exteriors", value: "exteriors" },
          { title: "Interiors", value: "interiors" },
          { title: "Construction", value: "construction" },
          { title: "Amenities", value: "amenities" },
          { title: "Lifestyle", value: "lifestyle" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "isArtisticImpression", title: "Artistic Impression", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ by: "order", direction: "asc" }],
  preview: {
    select: { title: "alt", subtitle: "category", media: "src" },
  },
});
