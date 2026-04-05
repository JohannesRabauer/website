import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { FaRss } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import BlogLanguageSwitcher from '@/app/components/BlogLanguageSwitcher';
import LegalLinks from '@/app/components/LegalLinks';
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex min-h-14 items-center justify-between gap-3">
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
                <span className="text-sm sm:text-base md:text-lg font-semibold truncate">
                  {copy.listing.title}
                </span>
                <span className="text-[10px] sm:text-sm md:text-base font-medium opacity-80 leading-tight">
                  {copy.listing.subtitle}
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-5 shrink-0">
              <div className="sm:hidden">
                <BlogLanguageSwitcher
                  currentLocale={locale}
                  hrefs={{ en: getBlogListingPath('en'), de: getBlogListingPath('de') }}
                  label={copy.localeSwitcherLabel}
                  preserveCurrentPath
                  hideOnPostPath
                  hideLabelOnMobile
                  compact
                />
              </div>

              <div className="hidden sm:flex sm:items-center">
                <BlogLanguageSwitcher
                  currentLocale={locale}
                  hrefs={{ en: getBlogListingPath('en'), de: getBlogListingPath('de') }}
                  label={copy.localeSwitcherLabel}
                  preserveCurrentPath
                  hideOnPostPath
                />
              </div>

              <nav
                className="flex items-center gap-1 sm:gap-5 text-sm font-medium shrink-0"
                aria-label={copy.layout.navigation}
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full p-2 text-blog-muted hover:bg-blog-purple-light hover:text-blog-purple transition-colors sm:rounded-none sm:p-0"
                  aria-label={copy.layout.home}
                  title={copy.layout.home}
                >
                  <FiHome className="text-base sm:hidden" aria-hidden="true" />
                  <span className="hidden sm:inline">{copy.layout.home}</span>
                </Link>
                <a
                  href={getBlogRssPath(locale)}
                  className="inline-flex items-center justify-center rounded-full p-2 text-blog-muted hover:bg-blog-green-light hover:text-blog-green transition-colors sm:rounded-none sm:p-0"
                  title={copy.layout.rssFeed}
                  aria-label={copy.layout.rssFeed}
                >
                  <FaRss className="text-base" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-blog-border mt-24 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 text-sm text-blog-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <div className="flex justify-center sm:justify-end">
            <LegalLinks
              variant="light"
              className="gap-3 text-[11px] sm:text-xs"
              linkClassName="text-blog-muted/75 hover:text-blog-purple"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
