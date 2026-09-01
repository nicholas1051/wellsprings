export const site = {
  brandName: "Wellsprings Ibadan",
  legalName: "StellarVera Development Company Limited",
  tagline: "Dream. Live. Repeat.",
  location: "Ibadan",
  country: "Nigeria",
  currency: "NGN",
  phone: {
    display: "+234 807 071 0100",
    tel: "+2348070710100",
    wa: "2348070710100",
  },
  phoneAlt: {
    display: "+234 807 933 0000",
    tel: "+2348079330000",
  },
  email: "info@wellsprings.com",
  officeAddress: "8, Awolowo Avenue, Old Bodija, Ibadan, Oyo State",
  estateAddress: "Wellsprings Estate, Jericho, Ibadan, Oyo State",
  salesHours: "Mon\u2013Sat, 9:00am \u2013 6:00pm",
  cacNumber: "SDCL",
  landTitleStatus: "Governor\u2019s Consent",
  siteUrl: "https://wellsprings.com",
  mapCenter: { lat: 7.3964, lng: 3.9164 },
  social: {
    facebook: "https://www.facebook.com/Wellspringsng/",
    instagram: "https://www.instagram.com/wellspringsng",
    youtube: "https://www.youtube.com/@wellspringsibadan6283",
    x: "https://twitter.com/wellspringsng",
  },
} as const;

export const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  explore: [
    { label: "Properties", href: "/properties" },
    { label: "Gallery", href: "/gallery" },
    { label: "About StellarVera", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
  ],
} as const;

export const partners = [
  { name: "African United Consultants", image: "/images/partners/auc.jpg" },
  { name: "Studio Stoone Designs", image: "/images/partners/studio-stoone.jpg" },
  { name: "KOA Consultants", image: "/images/partners/koa.jpg" },
  { name: "Place-Make", image: "/images/partners/place-make.jpg" },
] as const;

export const masterPlanStats = {
  acres: 25.05,
  hectares: 10.14,
  maxUnits: 115,
  maxResidents: 600,
} as const;
