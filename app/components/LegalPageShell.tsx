import Link from 'next/link';
import type { ReactNode } from 'react';
import LegalLinks from './LegalLinks';
import { hasPlaceholderAddress } from '@/lib/legal';

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
    <main className="min-h-screen bg-cyber-bg px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">
              Rechtliches
            </p>
            <h1 className="mt-2 text-4xl font-bold text-cyber-green">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              {intro}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full border border-cyber-green/40 px-4 py-2 text-cyber-green transition hover:border-cyber-green hover:bg-cyber-green/10"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-cyber-purple/40 px-4 py-2 text-cyber-purple transition hover:border-cyber-purple hover:bg-cyber-purple/10"
            >
              Blog
            </Link>
          </div>
        </div>

        {hasPlaceholderAddress && (
          <div className="mb-6 rounded-2xl border border-amber-400/50 bg-amber-300/10 px-5 py-4 text-sm leading-6 text-amber-100">
            Die Adressangaben auf dieser Seite enthalten noch Platzhalter und müssen
            vor Veröffentlichung mit einer ladungsfähigen Anschrift ersetzt werden.
          </div>
        )}

        <article className="rounded-3xl border border-white/10 bg-white px-6 py-8 text-slate-800 shadow-2xl sm:px-8">
          <div className="prose max-w-none prose-slate prose-headings:text-slate-900 prose-a:text-slate-700 prose-strong:text-slate-900">
            {children}
          </div>
        </article>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
          <p>Die rechtlichen Angaben wurden auf die technische Umsetzung dieser Website abgestimmt.</p>
          <LegalLinks />
        </div>
      </div>
    </main>
  );
}
