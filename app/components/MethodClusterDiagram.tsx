'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MethodClusterDiagram as MethodClusterDiagramData } from '@/lib/methods';

interface Props {
  title?: string;
  anchor: string;
  anchors: MethodClusterDiagramData['anchors'];
  contractLabel?: string;
  contractText?: string;
}

export default function MethodClusterDiagram({
  title,
  anchor,
  anchors,
  contractLabel = 'Contract',
  contractText,
}: Props) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAnchor = anchors[activeIndex] ?? anchors[0];

  const positions = useMemo(() => {
    const radius = anchors.length <= 4 ? 98 : 118;
    return anchors.map((_, index) => {
      const angle = (Math.PI * 2 * index) / Math.max(anchors.length, 1) - Math.PI / 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, [anchors]);

  return (
    <figure className="not-prose my-8">
      <div className="method-gradient-border rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
            Semantic cluster
          </p>
          <span className="text-xs text-method-muted">Hover a node</span>
        </div>

        <div className="relative mx-auto h-[22rem] w-full max-w-3xl rounded-3xl border border-method-border bg-white/60 p-4 sm:h-[24rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08),transparent_55%)]" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <div className="rounded-full border border-method-accent/30 bg-white px-5 py-3 text-center shadow-[0_10px_30px_-16px_rgba(79,70,229,0.4)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-method-accent">
                {anchor}
              </p>
              <p className="mt-1 text-xs text-method-muted">One term, one cluster</p>
            </div>
          </div>

          {anchors.map((item, index) => {
            const active = index === activeIndex;
            const offset = positions[index];

            return (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)` }}
              >
                <motion.button
                  type="button"
                  whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`max-w-[8rem] rounded-2xl border px-3 py-2 text-center transition-all ${
                    active
                      ? 'border-method-accent bg-white shadow-[0_10px_28px_-12px_rgba(79,70,229,0.35)]'
                      : 'border-method-border bg-white/80 hover:border-method-accent/40'
                  }`}
                  aria-pressed={active}
                >
                  <p className="text-xs font-semibold text-method-ink">{item.label}</p>
                  <p className="mt-1 text-[11px] leading-snug text-method-muted">{item.note}</p>
                </motion.button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-method-border bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
              {activeAnchor.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-method-ink">{activeAnchor.note}</p>
          </div>
          <div className="rounded-2xl border border-method-border bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-muted">
              {contractLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-method-ink">
              {contractText ?? 'Write the local meaning down once, then reuse it in every session.'}
            </p>
          </div>
        </div>
      </div>
      {title && <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>}
    </figure>
  );
}
