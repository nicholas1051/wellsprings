import type { Metadata } from "next";
import { formatPrice } from "@/data/properties";
import { site } from "@/data/site";
import { PropertiesPageClient } from "./PropertiesPageClient";

export const metadata: Metadata = {
  title: `Properties | ${site.brandName}`,
  description: `Explore 6 property types at Wellsprings Ibadan — from the Pearl 5-bedroom villa to the Opal 2-bedroom apartment. Starting from ${formatPrice(45000000)}.`,
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return <PropertiesPageClient />;
}
