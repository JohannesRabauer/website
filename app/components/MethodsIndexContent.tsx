'use client';

import Image from 'next/image';
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
        <div className="relative overflow-hidden rounded-[2rem] border border-method-border/80 bg-white shadow-[0_24px_80px_-32px_rgba(79,70,229,0.35)]">
          <div className="absolute inset-0">
            <Image
              src="/banner_methods.jpg"
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(min-width: 1280px) 72rem, 100vw"
              className="object-cover object-[72%_center]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.94)_30%,rgba(255,255,255,0.80)_48%,rgba(255,255,255,0.38)_68%,rgba(255,255,255,0.10)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_60%_48%,rgba(99,102,241,0.14),transparent_18%),radial-gradient(circle_at_73%_40%,rgba(34,211,238,0.12),transparent_16%)]"
          />
          <div className="relative z-10 flex min-h-[23rem] items-center p-6 sm:min-h-[27rem] sm:p-8 lg:min-h-[30rem] lg:p-10">
            <div className="relative max-w-2xl">
              <div className="relative">
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
                  className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-method-ink"
                  style={{
                    textShadow:
                      '0 0 1px rgba(255,255,255,1), 0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.98), 0 0 26px rgba(255,255,255,0.94), 0 0 42px rgba(255,255,255,0.86), 0 0 64px rgba(255,255,255,0.72)',
                  }}
                >
                  {copy.section.description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
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
