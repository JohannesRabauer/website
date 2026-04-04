import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

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

interface LegalPageShellProps {
  title: string;
  intro: string;
  children: ReactNode;
}

export default function LegalPageShell({
  title,
  intro,
  children,
}: LegalPageShellProps) {
  return (
    <main
      id="main-content"
      className={`${spaceGrotesk.variable} ${inter.variable} bg-blog-bg px-4 py-12 font-[family-name:var(--font-inter)] text-blog-text sm:px-6 sm:py-16`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-5 border-b border-blog-border pb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blog-green">
              Rechtliches
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-tight text-blog-purple sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-blog-muted">{intro}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full border border-blog-border bg-white px-4 py-2 text-blog-muted transition hover:border-blog-purple/40 hover:text-blog-purple"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-blog-border bg-white px-4 py-2 text-blog-muted transition hover:border-blog-green/40 hover:text-blog-green"
            >
              Blog
            </Link>
          </div>
        </div>

        <article className="rounded-[2rem] border border-blog-border bg-white px-6 py-8 shadow-[0_18px_60px_rgba(61,43,107,0.08)] sm:px-8 sm:py-10">
          <div className="prose prose-blog max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-blog-text prose-a:text-blog-purple prose-strong:text-blog-text">
            {children}
          </div>
        </article>

        <p className="mt-6 text-sm leading-6 text-blog-muted">
          Die rechtlichen Angaben wurden auf die technische Umsetzung dieser Website abgestimmt.
        </p>
      </div>
    </main>
  );
}
