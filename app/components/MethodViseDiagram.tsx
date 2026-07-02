'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  title?: string;
  specLabel: string;
  agentLabel: string;
  gates: string[];
  highlightLabel?: string;
}

export default function MethodViseDiagram({
  title,
  specLabel,
  agentLabel,
  gates,
  highlightLabel,
}: Props) {
  const reducedMotion = useReducedMotion();
  const [activeGate, setActiveGate] = useState(0);
  const selectedGate = gates[activeGate] ?? gates[0];

  return (
    <figure className="not-prose my-8">
      <div className="method-gradient-border rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
            Vise view
          </p>
          <span className="text-xs text-method-muted">Move through the gates</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.1fr_0.95fr] lg:items-stretch">
          <div className="rounded-2xl border border-method-border bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">{specLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-method-ink">
              Write the intent first. Keep the target small.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-method-border bg-white/70 p-4">
            <div className="absolute inset-x-4 top-6 h-3 rounded-full bg-method-border/70" />
            <div className="absolute inset-x-4 bottom-6 h-3 rounded-full bg-method-border/70" />

            <motion.div
              initial={false}
              animate={reducedMotion ? undefined : { y: activeGate * 2 }}
              className="relative z-10 mx-auto mt-8 flex max-w-[15rem] flex-col items-center rounded-2xl border border-method-accent/25 bg-white p-4 text-center shadow-[0_10px_28px_-14px_rgba(79,70,229,0.35)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
                {agentLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-method-ink">
                The agent works here, between the jaws.
              </p>
              <p className="mt-2 text-xs text-method-muted">
                {highlightLabel ?? `Current gate: ${selectedGate}`}
              </p>
            </motion.div>
          </div>

          <div className="rounded-2xl border border-method-border bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
              Quality gates
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {gates.map((gate, index) => {
                const active = index === activeGate;

                return (
                  <button
                    key={gate}
                    type="button"
                    onMouseEnter={() => setActiveGate(index)}
                    onFocus={() => setActiveGate(index)}
                    onClick={() => setActiveGate(index)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      active
                        ? 'bg-gradient-to-r from-method-cons to-method-cons/80 text-white shadow-[0_6px_16px_-6px_rgba(225,29,72,0.45)]'
                        : 'border border-method-border bg-white/80 text-method-muted hover:border-method-cons/40 hover:text-method-cons'
                    }`}
                    aria-pressed={active}
                  >
                    {gate}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-method-border bg-white/80 p-4 text-sm text-method-ink">
          <span className="font-semibold text-method-cons">{selectedGate}</span>
          <span className="text-method-muted"> keeps the vise tight.</span>
        </div>
      </div>
      {title && <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>}
    </figure>
  );
}
