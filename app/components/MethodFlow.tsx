'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FiArrowRight, FiRotateCcw } from 'react-icons/fi';

interface FlowStep {
  label: string;
  description?: string;
}

interface MethodFlowProps {
  steps: FlowStep[];
  /** 'linear' shows a one-way pipeline, 'loop' hints an iterative cycle. */
  variant?: 'linear' | 'loop';
  title?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const node: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function MethodFlow({ steps = [], variant = 'linear', title }: MethodFlowProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : {
        variants: container,
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, margin: '-80px' },
      };

  return (
    <figure className="not-prose my-8">
      <motion.div
        {...motionProps}
        className="method-gradient-border rounded-2xl p-5 sm:p-7 shadow-[0_16px_48px_-16px_rgba(79,70,229,0.3)]"
      >
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-1.5">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-1 md:flex-row md:items-center">
              <motion.div
                variants={reducedMotion ? undefined : node}
                className="group relative flex-1 rounded-xl border border-method-border bg-white/80 p-4 text-center backdrop-blur-sm transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.35)]"
              >
                <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-method-accent to-method-accent3 text-sm font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-method-ink">
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-1 text-xs leading-snug text-method-muted">{step.description}</p>
                )}
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-1 md:px-1.5 md:py-0">
                  <FiArrowRight
                    className="hidden h-5 w-5 flex-shrink-0 text-method-accent/60 md:block"
                    aria-hidden="true"
                  />
                  <FiArrowRight
                    className="h-4 w-4 flex-shrink-0 rotate-90 text-method-accent/60 md:hidden"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {variant === 'loop' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-method-accent">
            <FiRotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Iterate — feed learnings back into the next cycle</span>
          </div>
        )}
      </motion.div>
      {title && (
        <figcaption className="mt-3 text-center text-xs text-method-muted">{title}</figcaption>
      )}
    </figure>
  );
}
