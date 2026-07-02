'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import MethodIcon from '@/app/components/MethodIcon';
import type { MethodMeta } from '@/lib/methods';
import { METHODS_COPY, getMethodPath } from '@/lib/methods-i18n';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

interface Props {
  method: MethodMeta;
}

export default function MethodCard({ method }: Props) {
  const reducedMotion = useReducedMotion();
  const { slug, frontmatter, readingMinutes } = method;
  const { title, tagline, category, maturity, icon } = frontmatter;

  return (
    <motion.div
      variants={reducedMotion ? undefined : cardVariants}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      <Link
        href={getMethodPath(slug)}
        className="method-gradient-border group flex h-full flex-col rounded-2xl p-6 shadow-[0_10px_36px_-18px_rgba(79,70,229,0.35)] transition-shadow hover:shadow-[0_20px_50px_-18px_rgba(79,70,229,0.45)]"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-method-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-method-accent">
            {category}
          </span>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-method-accent ring-1 ring-method-border transition-all group-hover:bg-gradient-to-br group-hover:from-method-accent group-hover:to-method-accent3 group-hover:text-white group-hover:ring-0"
          >
            <MethodIcon name={icon} className="h-4 w-4" />
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-method-ink transition-colors group-hover:text-method-accent">
          {title}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-method-muted">{tagline}</p>

        <div className="mt-5 flex items-center gap-3 border-t border-method-border/70 pt-4 text-xs text-method-muted">
          {maturity && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-method-accent2" aria-hidden="true" />
              {maturity}
            </span>
          )}
          <span className="ml-auto">{METHODS_COPY.detail.readingTime(readingMinutes)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
