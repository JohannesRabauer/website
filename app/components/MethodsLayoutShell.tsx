import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { FiHome } from 'react-icons/fi';
import LegalLinks from '@/app/components/LegalLinks';
import {
  METHODS_COPY,
  getMethodsListingPath,
} from '@/lib/methods-i18n';

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
}

export default function MethodsLayoutShell({ children }: Props) {
  const copy = METHODS_COPY;

  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} relative min-h-screen bg-method-bg font-[family-name:var(--font-inter)] text-method-ink`}
    >
      {/* Ambient gradient aura background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="method-blob"
          style={{
            top: '-8rem',
            left: '-6rem',
            width: '32rem',
            height: '32rem',
            background:
              'radial-gradient(circle at 30% 30%, rgba(79,70,229,0.20), transparent 70%)',
          }}
        />
        <div
          className="method-blob"
          style={{
            top: '10rem',
            right: '-8rem',
            width: '30rem',
            height: '30rem',
            background:
              'radial-gradient(circle at 70% 30%, rgba(6,182,212,0.18), transparent 70%)',
            animationDelay: '-4s',
          }}
        />
        <div
          className="method-blob"
          style={{
            bottom: '-10rem',
            left: '20%',
            width: '34rem',
            height: '34rem',
            background:
              'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.16), transparent 70%)',
            animationDelay: '-8s',
          }}
        />
      </div>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-method-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        {copy.section.skipToContent}
      </a>

      <header className="sticky top-0 z-40 border-b border-method-border/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2">
          <div className="flex min-h-14 items-center justify-between gap-3">
            {/* Logo returns to the methods index */}
            <Link
              href={getMethodsListingPath()}
              className="group flex items-center gap-2.5"
              aria-label={copy.section.allMethods}
            >
              <Image
                src="/Logo_round.png"
                alt="Johannes Rabauer Logo"
                width={30}
                height={30}
                className="rounded-full shadow-sm ring-1 ring-method-border transition-transform group-hover:scale-105"
                priority
              />
              <span className="flex flex-col leading-tight font-[family-name:var(--font-heading)]">
                <span className="text-sm sm:text-base font-semibold text-method-ink">
                  Johannes Rabauer
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-method-muted">
                  {copy.section.label}
                </span>
              </span>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-4 text-sm font-medium">
              <Link
                href={getMethodsListingPath()}
                className="hidden sm:inline text-method-muted transition-colors hover:text-method-accent"
              >
                {copy.section.allMethods}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full p-2 text-method-muted transition-colors hover:bg-method-accent-soft hover:text-method-accent sm:rounded-none sm:p-0"
                aria-label={copy.section.home}
                title={copy.section.home}
              >
                <FiHome className="text-base sm:hidden" aria-hidden="true" />
                <span className="hidden sm:inline">{copy.section.home}</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 mt-24 border-t border-method-border/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-method-muted">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Johannes Rabauer. {copy.section.footerRights}
            </p>
            <Link href="/" className="transition-colors hover:text-method-accent">
              {copy.section.home}
            </Link>
          </div>
          <div className="flex justify-center sm:justify-end">
            <LegalLinks
              variant="light"
              className="gap-3 text-[11px] sm:text-xs"
              linkClassName="text-method-muted/75 hover:text-method-accent"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
