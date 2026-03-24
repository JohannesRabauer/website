import { DM_Serif_Display, Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Blog | Johannes Rabauer',
  description:
    'Live coding sessions, Java deep-dives, and engineering insights by Johannes Rabauer.',
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${dmSerif.variable} ${inter.variable} min-h-screen bg-blog-bg font-[family-name:var(--font-inter)]`}
    >
      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blog-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2.5 group"
          >
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blog-purple to-blog-green flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-sm">
              JR
            </span>
            <span className="font-[family-name:var(--font-dm-serif)] text-lg text-blog-purple group-hover:text-blog-green transition-colors">
              Blog
            </span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className="text-blog-muted hover:text-blog-purple transition-colors"
            >
              ← Portfolio
            </Link>
            <a
              href="/rss.xml"
              className="text-blog-muted hover:text-blog-green transition-colors"
              title="RSS Feed"
            >
              RSS
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-blog-border mt-24 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blog-muted">
          <p>
            © {new Date().getFullYear()} Johannes Rabauer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/rss.xml" className="hover:text-blog-green transition-colors">
              RSS Feed
            </a>
            <Link href="/" className="hover:text-blog-purple transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
