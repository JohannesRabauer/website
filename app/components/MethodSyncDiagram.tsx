'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

interface Props {
  title?: string;
  specLabel: string;
  codeLabel: string;
  specSummary: string;
  codeSummary: string;
  cycleLabel?: string;
  notes?: string[];
}

export default function MethodSyncDiagram({
  title,
  specLabel,
  codeLabel,
  specSummary,
  codeSummary,
  cycleLabel,
  notes = [],
}: Props) {
  const reducedMotion = useReducedMotion();
  const [focus, setFocus] = useState<'spec' | 'code'>('spec');

  return (
    <figure className="not-prose my-8">
      <div className="method-gradient-border rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
            Sync loop
          </p>
          <span className="text-xs text-method-muted">Click a side</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <motion.button
            type="button"
            whileHover={reducedMotion ? undefined : { y: -3 }}
            onClick={() => setFocus('spec')}
            className={`rounded-2xl border p-4 text-left transition-all ${
              focus === 'spec'
                ? 'border-method-accent bg-white shadow-[0_10px_28px_-12px_rgba(79,70,229,0.35)]'
                : 'border-method-border bg-white/70 hover:border-method-accent/40'
            }`}
            aria-pressed={focus === 'spec'}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">{specLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-method-ink">{specSummary}</p>
          </motion.button>

          <div className="flex flex-col items-center gap-2 py-1 lg:py-0">
            <div className="rounded-full border border-method-border bg-white p-3 text-method-accent shadow-[0_6px_18px_-8px_rgba(79,70,229,0.35)]">
              <FiRefreshCw className={`h-5 w-5 ${reducedMotion ? '' : 'animate-spin'}`} aria-hidden="true" />
            </div>
            <span className="max-w-[10rem] text-center text-xs font-medium text-method-muted">
              {cycleLabel ?? 'Change one side, then update the other.'}
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={reducedMotion ? undefined : { y: -3 }}
            onClick={() => setFocus('code')}
            className={`rounded-2xl border p-4 text-left transition-all ${
              focus === 'code'
                ? 'border-method-accent bg-white shadow-[0_10px_28px_-12px_rgba(79,70,229,0.35)]'
                : 'border-method-border bg-white/70 hover:border-method-accent/40'
            }`}
            aria-pressed={focus === 'code'}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">{codeLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-method-ink">{codeSummary}</p>
          </motion.button>
        </div>

        {notes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-method-border bg-white/80 px-3 py-1 text-xs font-medium text-method-muted"
              >
                {note}
              </span>
            ))}
          </div>
        )}
      </div>
      {title && <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>}
    </figure>
  );
}
