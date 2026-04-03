import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { FaRss } from 'react-icons/fa';
import BlogLanguageSwitcher from '@/app/components/BlogLanguageSwitcher';
import {
  type BlogLocale,
  getBlogDictionary,
  getBlogListingPath,
  getBlogRssPath,
} from '@/lib/blog-i18n';

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

interface Props {
  children: ReactNode;
  locale: BlogLocale;
}

export default function BlogLayoutShell({ children, locale }: Props) {
  const copy = getBlogDictionary(locale);

  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-blog-bg font-[family-name:var(--font-inter)]`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blog-purple focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        {copy.layout.skipToContent}
      </a>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blog-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-14 py-2 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={getBlogListingPath(locale)}
            className="flex items-center gap-2 sm:gap-2.5 group min-w-0 flex-1"
          >
            <Image
              src="/Logo_round.png"
              alt="Johannes Rabauer Logo"
              width={28}
              height={28}
              className="rounded-full shadow-sm ring-1 ring-blog-border shrink-0"
              priority
            />
            <span className="font-[family-name:var(--font-heading)] flex flex-col leading-tight min-w-0 text-blog-purple group-hover:text-blog-green transition-colors">
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                {copy.listing.title}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-medium opacity-80">
                {copy.listing.subtitle}
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5 shrink-0">
            <BlogLanguageSwitcher
              currentLocale={locale}
              hrefs={{ en: getBlogListingPath('en'), de: getBlogListingPath('de') }}
              label={copy.localeSwitcherLabel}
              preserveCurrentPath
            />

            <nav
              className="flex items-center gap-3 sm:gap-5 text-sm font-medium shrink-0"
              aria-label={copy.layout.navigation}
            >
              <Link
                href="/"
                className="text-blog-muted hover:text-blog-purple transition-colors"
              >
                {copy.layout.home}
              </Link>
              <a
                href={getBlogRssPath(locale)}
                className="text-blog-muted hover:text-blog-green transition-colors"
                title={copy.layout.rssFeed}
                aria-label={copy.layout.rssFeed}
              >
                <FaRss className="text-base" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-blog-border mt-24 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blog-muted">
          <p>
            © {new Date().getFullYear()} Johannes Rabauer. {copy.layout.footerRights}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-blog-purple transition-colors">
              {copy.layout.home}
            </Link>
            <a
              href={getBlogRssPath(locale)}
              className="text-blog-muted hover:text-blog-green transition-colors"
              title={copy.layout.rssFeed}
              aria-label={copy.layout.rssFeed}
            >
              <FaRss className="text-base" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
