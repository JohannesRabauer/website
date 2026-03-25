import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
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
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-blog-bg font-[family-name:var(--font-inter)]`}
    >
      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blog-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/Logo_round.png"
              alt="Johannes Rabauer Logo"
              width={28}
              height={28}
              className="rounded-full shadow-sm ring-1 ring-blog-border"
              priority
            />
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-blog-purple group-hover:text-blog-green transition-colors">
              Live-Coding Learnings
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
