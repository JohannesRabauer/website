'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import MethodCard from '@/app/components/MethodCard';
import type { MethodMeta } from '@/lib/methods';
import { METHODS_COPY } from '@/lib/methods-i18n';

interface Props {
  methods: MethodMeta[];
  categories: string[];
}

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function MethodsIndexContent({ methods, categories }: Props) {
  const copy = METHODS_COPY;
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return methods;
    return methods.filter((m) => m.frontmatter.category === activeCategory);
  }, [methods, activeCategory]);

  const filters = ['all', ...categories];

  return (
    <main id="main-content" lang={copy.htmlLang}>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-6 pt-16 sm:pt-20">
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-method-accent"
        >
          {copy.section.eyebrow}
        </motion.p>
        <motion.h1
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="method-gradient-text">{copy.section.title}</span>
        </motion.h1>
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-3 font-[family-name:var(--font-heading)] text-lg font-medium text-method-ink/80 sm:text-xl"
        >
          {copy.section.subtitle}
        </motion.p>
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-method-muted"
        >
          {copy.section.description}
        </motion.p>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* Filters */}
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeCategory;
              const label = filter === 'all' ? copy.section.allCategories : filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveCategory(filter)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-method-accent to-method-accent3 text-white shadow-[0_6px_18px_-6px_rgba(79,70,229,0.6)]'
                      : 'border border-method-border bg-white/70 text-method-muted hover:border-method-accent/40 hover:text-method-accent'
                  }`}
                  aria-pressed={isActive}
                >
                  {label}
                </button>
              );
            })}
            <span className="ml-auto text-sm text-method-muted">
              {copy.section.methodsCount(filtered.length)}
            </span>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-method-muted">{copy.section.empty}</p>
        ) : (
          <motion.div
            key={activeCategory}
            variants={reducedMotion ? undefined : gridVariants}
            initial={reducedMotion ? undefined : 'hidden'}
            animate={reducedMotion ? undefined : 'show'}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((method) => (
              <MethodCard key={method.slug} method={method} />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
