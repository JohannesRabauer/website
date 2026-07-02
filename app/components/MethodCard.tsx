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
  const { title, tagline, category, maturity, icon, inventor } = frontmatter;

  const inventorHref = inventor?.github
    ? `https://github.com/${inventor.github}`
    : inventor?.url ?? null;
  const avatarSrc = inventor?.avatar
    ?? (inventor?.github ? `https://github.com/${inventor.github}.png?size=48` : null);

  return (
    <motion.div
      variants={reducedMotion ? undefined : cardVariants}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      {/* stretched-link card: the Link's ::after covers the full card */}
      <article className="method-gradient-border group relative flex h-full flex-col rounded-2xl p-6 shadow-[0_10px_36px_-18px_rgba(79,70,229,0.35)] transition-shadow hover:shadow-[0_20px_50px_-18px_rgba(79,70,229,0.45)] focus-within:ring-2 focus-within:ring-method-accent focus-within:ring-offset-2">
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
          {/* Stretched link: ::after makes the whole card clickable */}
          <Link
            href={getMethodPath(slug)}
            className="focus:outline-none after:absolute after:inset-0 after:rounded-2xl"
          >
            {title}
          </Link>
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-method-muted">{tagline}</p>

        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3 border-t border-method-border/70 pt-4 text-xs text-method-muted">
          {maturity && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-method-accent2" aria-hidden="true" />
              {maturity}
            </span>
          )}
          <span className={inventor ? '' : 'ml-auto'}>{METHODS_COPY.detail.readingTime(readingMinutes)}</span>
          {inventor && inventorHref && (
            <a
              href={inventorHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-method-border bg-white/70 px-2 py-0.5 text-[11px] font-medium text-method-muted transition hover:border-method-accent/40 hover:text-method-accent"
            >
              {avatarSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-full object-cover"
                />
              )}
              {inventor.name}
            </a>
          )}
          {inventor && !inventorHref && (
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-method-border bg-white/70 px-2 py-0.5 text-[11px] font-medium text-method-muted">
              {avatarSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-full object-cover"
                />
              )}
              {inventor.name}
            </span>
          )}
        </div>
      </article>
    </motion.div>
  );
}
