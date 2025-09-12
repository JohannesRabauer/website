import "./globals.css";
import { ReactNode } from "react";

/**
 * Root layout component wrapping all pages
 * - Defines base HTML structure
 * - Applies global background and font
 */

export const metadata = {
  title: "Johannes Rabauer | Senior Software Engineer",
  description: "Personal site, portfolio, and links for Johannes Rabauer - Java Developer, Public Speaker, and Tech Enthusiast.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cyber-bg text-white font-sans min-h-screen antialiased selection:bg-cyber-pink/80 selection:text-cyber-bg">
        {children}
      </body>
    </html>
  );
}
