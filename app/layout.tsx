import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Script from "next/script";
import FloatingSiteControls from "./components/FloatingSiteControls";
import SiteFooter from "./components/SiteFooter";
import { BLOG_SITE_URL } from "@/lib/blog-i18n";
import {
  PERSON_BANNER_PATH,
  PERSON_DESCRIPTION,
  PERSON_NAME,
  PERSON_JOB_TITLE,
  SITE_NAME,
} from "@/lib/site-data";
import { getGlobalJsonLd, stringifyJsonLd } from "@/lib/seo";

/**
 * Root layout component wrapping all pages
 * - Defines base HTML structure
 * - Applies global background and font
 */

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_SITE_URL),
  title: `${PERSON_NAME} | ${PERSON_JOB_TITLE}`,
  description: PERSON_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: BLOG_SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  keywords: [
    "Johannes Rabauer",
    "Senior Software Engineer",
    "Java",
    "AI-assisted development",
    "software architecture",
    "public speaker",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${PERSON_NAME} | ${PERSON_JOB_TITLE}`,
    description: PERSON_DESCRIPTION,
    url: BLOG_SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: PERSON_BANNER_PATH,
        alt: `${PERSON_NAME} speaking and engineering banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: '@JohannesRabauer',
    creator: '@JohannesRabauer',
    title: `${PERSON_NAME} | ${PERSON_JOB_TITLE}`,
    description: PERSON_DESCRIPTION,
    images: [PERSON_BANNER_PATH],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const globalJsonLd = stringifyJsonLd(getGlobalJsonLd());

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: globalJsonLd }}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="shortcut icon" href="/favicon.ico"></link>
        <link rel="apple-touch-icon" href="/Logo_round.png"></link>
      </head>
      <body className="flex min-h-screen flex-col bg-cyber-bg font-sans text-white antialiased selection:bg-cyber-pink/80 selection:text-cyber-bg">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyber-green focus:text-cyber-bg focus:rounded-lg focus:text-sm focus:font-semibold">Skip to content</a>
        <FloatingSiteControls />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Script
          data-goatcounter="https://rabauer.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
