'use client';

import { useMemo, useState } from 'react';
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiCode, FiRefreshCw } from 'react-icons/fi';

interface MethodCodeStep {
  title: string;
  goal?: string;
  java: string;
  agnostic?: string;
  check?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  loops?: boolean;
  steps: MethodCodeStep[];
}

type CodeFlavor = 'java' | 'agnostic';

export default function MethodStepCarousel({ title = 'Minimal code walkthrough', subtitle, loops, steps }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [codeFlavor, setCodeFlavor] = useState<CodeFlavor>('java');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const maxIndex = Math.max(0, steps.length - 1);

  const step = steps[stepIndex] ?? steps[0];
  const canShowAgnostic = useMemo(() => steps.some((s) => Boolean(s.agnostic)), [steps]);

  if (!step) {
    return null;
  }

  const previous = () => setStepIndex((idx) => Math.max(0, idx - 1));
  const next = () => setStepIndex((idx) => Math.min(maxIndex, idx + 1));

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        next();
      } else {
        previous();
      }
    }
    setTouchStartX(null);
  };

  const code = codeFlavor === 'agnostic' ? step.agnostic ?? step.java : step.java;

  return (
    <section className="not-prose my-8" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="method-gradient-border relative rounded-2xl p-5 sm:p-6">
        <button
          type="button"
          onClick={previous}
          disabled={stepIndex === 0}
          aria-label="Previous step"
          className="absolute left-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-method-border bg-white/90 text-method-muted shadow-sm transition hover:border-method-accent/40 hover:text-method-accent disabled:cursor-not-allowed disabled:opacity-45"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={stepIndex === maxIndex}
          aria-label="Next step"
          className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-method-border bg-white/90 text-method-muted shadow-sm transition hover:border-method-accent/40 hover:text-method-accent disabled:cursor-not-allowed disabled:opacity-45"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>

        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-method-ink">
              {title}
            </h3>
            <p className="mt-1 text-sm text-method-muted">
              {subtitle ?? 'Swipe left or right, or use the arrows, to move through steps.'}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-method-border bg-white/80 px-3 py-1 text-xs font-medium text-method-muted">
            <FiCode className="h-3.5 w-3.5" aria-hidden="true" />
            Step {stepIndex + 1}/{steps.length}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {canShowAgnostic && (
            <div className="ml-auto inline-flex rounded-full border border-method-border bg-white/80 p-0.5">
              <button
                type="button"
                onClick={() => setCodeFlavor('java')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  codeFlavor === 'java'
                    ? 'bg-method-accent text-white'
                    : 'text-method-muted hover:text-method-accent'
                }`}
                aria-pressed={codeFlavor === 'java'}
              >
                Java
              </button>
              <button
                type="button"
                onClick={() => setCodeFlavor('agnostic')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  codeFlavor === 'agnostic'
                    ? 'bg-method-accent text-white'
                    : 'text-method-muted hover:text-method-accent'
                }`}
                aria-pressed={codeFlavor === 'agnostic'}
              >
                Agnostic
              </button>
            </div>
          )}
        </div>

        <article className="rounded-2xl border border-method-border bg-white/80 p-4">
          <h4 className="font-[family-name:var(--font-heading)] text-base font-semibold text-method-ink">
            {step.title}
          </h4>
          {step.goal && <p className="mt-1 text-sm text-method-muted">{step.goal}</p>}
          <pre className="mt-3 overflow-x-auto rounded-xl border border-method-border bg-method-code-bg p-4 text-xs leading-relaxed text-method-ink">
            <code>{code}</code>
          </pre>
          {step.check && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-method-pros-soft px-3 py-1 text-xs font-medium text-method-pros">
              <FiCheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {step.check}
            </p>
          )}
        </article>

        <div className="mt-4 flex flex-wrap gap-2">
          {steps.map((entry, idx) => (
            <button
              key={`${entry.title}-${idx}`}
              type="button"
              onClick={() => setStepIndex(idx)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                idx === stepIndex
                  ? 'bg-gradient-to-r from-method-accent to-method-accent3 text-white shadow-[0_6px_18px_-8px_rgba(79,70,229,0.6)]'
                  : 'border border-method-border bg-white/80 text-method-muted hover:border-method-accent/40 hover:text-method-accent'
              }`}
              aria-pressed={idx === stepIndex}
            >
              {entry.title}
            </button>
          ))}
          {loops && (
            <span className="inline-flex items-center gap-1 rounded-full border border-method-accent/30 bg-method-accent-soft px-3 py-1 text-xs font-medium text-method-accent">
              <FiRefreshCw className="h-3 w-3" aria-hidden="true" />
              loops to step 1
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
