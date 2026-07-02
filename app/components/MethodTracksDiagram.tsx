'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MethodTracksDiagram as MethodTracksDiagramData } from '@/lib/methods';

interface Props {
  title?: string;
  tracks: MethodTracksDiagramData['tracks'];
}

export default function MethodTracksDiagram({ title, tracks }: Props) {
  const reducedMotion = useReducedMotion();
  const [activeKey, setActiveKey] = useState(tracks[0]?.key ?? '');
  const activeTrack = tracks.find((track) => track.key === activeKey) ?? tracks[0];

  if (!activeTrack) {
    return null;
  }

  return (
    <figure className="not-prose my-8">
      <div className="method-gradient-border rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
            Planning tracks
          </p>
          <span className="text-xs text-method-muted">Switch tracks</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => {
            const active = track.key === activeKey;

            return (
              <button
                key={track.key}
                type="button"
                onClick={() => setActiveKey(track.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-method-accent to-method-accent3 text-white shadow-[0_6px_18px_-6px_rgba(79,70,229,0.5)]'
                    : 'border border-method-border bg-white/70 text-method-muted hover:border-method-accent/40 hover:text-method-accent'
                }`}
                aria-pressed={active}
              >
                {track.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTrack.key}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 rounded-2xl border border-method-border bg-white/80 p-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
                {activeTrack.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-method-ink">{activeTrack.summary}</p>
            </div>
            <p className="text-xs font-medium text-method-muted">{activeTrack.bestFor}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {activeTrack.steps.map((step) => (
              <span
                key={step}
                className="rounded-full bg-method-accent-soft px-3 py-1 text-xs font-medium text-method-ink"
              >
                {step}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      {title && <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>}
    </figure>
  );
}
