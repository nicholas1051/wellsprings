import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Providers } from "@/components/Providers";
import { Analytics } from "@/components/Analytics";
import { TrackClicks } from "@/components/TrackClicks";
import { site } from "@/data/site";
import { organizationLd } from "@/lib/schema";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.brandName}: Residential Estate in ${site.location}`,
    template: `%s | ${site.brandName}`,
  },
  description: `Wellsprings Ibadan: a masterplanned estate by StellarVera Development Company. 6 property types, 25 acres, Governor\u2019s Consent title. Dream. Live. Repeat.`,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "luxury estate Ibadan",
    "new homes Ibadan",
    "Wellsprings estate",
    "StellarVera development",
    "Jericho Ibadan property",
    "detached duplex Ibadan",
    "real estate Ibadan Nigeria",
  ],
  openGraph: {
    type: "website",
    siteName: site.brandName,
    title: `${site.brandName}: Residential Estate in ${site.location}`,
    description: `Masterplanned estate by StellarVera. 6 property types on 25 acres in Jericho, Ibadan.`,
    locale: "en_NG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2C3E50",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <NoiseOverlay />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
        <Analytics />
        <TrackClicks />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationLd() }}
        />
      </body>
    </html>
  );
}
