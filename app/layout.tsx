import "./globals.css";
import { ReactNode } from "react";

/**
 * Root layout component wrapping all pages
 * - Defines base HTML structure
 * - Applies global background and font
 */
export const metadata = {
  title: "Cyber Portfolio",
  description: "Senior Developer | Java | AI | Tech Lead",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cyber-bg text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
