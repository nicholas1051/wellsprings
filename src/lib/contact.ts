import { site } from "@/data/site";

export function waLink(message: string) {
  return `https://wa.me/${site.phone.wa}?text=${encodeURIComponent(message)}`;
}

export function waLinkForUnit(unitName?: string) {
  const message = unitName
    ? `Hello, I'm interested in ${unitName} and would like more information.`
    : "Hello, I'd like to know more about your homes.";
  return waLink(message);
}

export function telLink() {
  return `tel:${site.phone.tel}`;
}

export function mailLink(subject?: string) {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.email}${params}`;
}
