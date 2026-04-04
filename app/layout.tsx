import "./globals.css";
import { ReactNode } from "react";
import FloatingSiteControls from "./components/FloatingSiteControls";
import SiteFooter from "./components/SiteFooter";

/**
 * Root layout component wrapping all pages
 * - Defines base HTML structure
 * - Applies global background and font
 */

export const metadata = {
  title: "Johannes Rabauer | Senior Software Engineer",
  description:
    "Personal site, portfolio, and links for Johannes Rabauer - Java Developer, Public Speaker, and Tech Enthusiast.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      </body>
    </html>
  );
}
