'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface ExternalContentGateProps {
  title: string;
  description: string;
  loadLabel: string;
  children: ReactNode;
  preview?: ReactNode;
  externalHref?: string;
  externalLabel?: string;
  variant?: 'light' | 'dark';
}

export default function ExternalContentGate({
  title,
  description,
  loadLabel,
  children,
  preview,
  externalHref,
  externalLabel,
  variant = 'light',
}: ExternalContentGateProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return <>{children}</>;
  }

  const containerClassName =
    variant === 'light'
      ? 'border border-blog-border bg-blog-surface text-blog-text shadow-sm'
      : 'border border-cyber-purple/30 bg-black/30 text-white shadow-lg shadow-black/20';

  const bodyClassName =
    variant === 'light' ? 'text-blog-muted' : 'text-gray-300';

  const buttonClassName =
    variant === 'light'
      ? 'bg-blog-purple text-white hover:bg-blog-purple-mid'
      : 'bg-cyber-green text-cyber-bg hover:bg-cyber-green/90';

  const secondaryClassName =
    variant === 'light'
      ? 'border-blog-border text-blog-muted hover:border-blog-purple hover:text-blog-purple'
      : 'border-white/15 text-white/75 hover:border-cyber-cyan hover:text-cyber-cyan';

  return (
    <div className={`overflow-hidden rounded-2xl ${containerClassName}`}>
      {preview ? <div>{preview}</div> : null}

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className={`mt-2 text-sm leading-6 ${bodyClassName}`}>{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${buttonClassName}`}
          >
            {loadLabel}
          </button>

          {externalHref && externalLabel ? (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${secondaryClassName}`}
            >
              {externalLabel}
            </a>
          ) : null}
        </div>

        <p className={`text-xs leading-5 ${bodyClassName}`}>
          Mehr dazu in der <Link href="/datenschutz" className="underline underline-offset-2">Datenschutzerklärung</Link>.
        </p>
      </div>
    </div>
  );
}
