import "./globals.css";
import { ReactNode } from "react";

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
          href="/Logo_round.png"
        ></link>
        <link rel="apple-touch-icon" href="/Logo_round.png"></link>
      </head>
      <body className="bg-cyber-bg text-white font-sans min-h-screen antialiased selection:bg-cyber-pink/80 selection:text-cyber-bg">
        {/* Fixed top-left brand logo */}
        <a href="/" className="fixed top-4 left-4 z-50">
          <img
            src="/Logo_round.png"
            alt="JR Logo"
            width={40}
            height={40}
            className="rounded-full shadow-lg hover:scale-110 transition-transform"
          />
        </a>
        {children}
      </body>
    </html>
  );
}
