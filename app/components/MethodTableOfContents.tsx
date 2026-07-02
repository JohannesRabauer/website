'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/methods';

interface Props {
  headings: Heading[];
  title?: string;
  ariaLabel?: string;
}

export default function MethodTableOfContents({
  headings,
  title = 'On this page',
  ariaLabel = 'Table of contents',
}: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={ariaLabel}>
      <p className="mb-4 pl-3 text-[11px] font-semibold uppercase tracking-widest text-method-muted">
        {title}
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${h.id}`}
              className={`block rounded-r border-l-2 px-3 py-1 text-sm transition-all duration-150 ${
                activeId === h.id
                  ? 'border-method-accent bg-method-accent-soft font-semibold text-method-accent'
                  : 'border-transparent text-method-muted hover:border-method-accent/50 hover:bg-method-accent-soft/50 hover:text-method-accent'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
