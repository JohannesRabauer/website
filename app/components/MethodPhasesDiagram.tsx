'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MethodPhasesDiagram as MethodPhasesDiagramData } from '@/lib/methods';

interface Props {
  title?: string;
  phases: MethodPhasesDiagramData['phases'];
}

export default function MethodPhasesDiagram({ title, phases }: Props) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = phases[activeIndex] ?? phases[0];

  return (
    <figure className="not-prose my-8">
      <div className="method-gradient-border rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
            Four phases
          </p>
          <span className="text-xs text-method-muted">Hover or tap a phase</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          {phases.map((phase, index) => {
            const active = index === activeIndex;

            return (
              <motion.button
                key={phase.label}
                type="button"
                whileHover={reducedMotion ? undefined : { y: -3 }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? 'border-method-accent bg-white shadow-[0_10px_28px_-12px_rgba(79,70,229,0.35)]'
                    : 'border-method-border bg-white/70 hover:border-method-accent/40'
                }`}
                aria-pressed={active}
              >
                <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-method-ink">
                  {phase.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-method-muted">{phase.summary}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activePhase.label}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 rounded-2xl border border-method-border bg-white/80 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
            Outputs from {activePhase.label}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {activePhase.artifacts.map((artifact) => (
              <span
                key={artifact}
                className="rounded-full bg-method-accent-soft px-3 py-1 text-xs font-medium text-method-ink"
              >
                {artifact}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      {title && <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>}
    </figure>
  );
}
