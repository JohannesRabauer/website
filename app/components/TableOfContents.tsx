'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/posts';

interface Props {
  headings: Heading[];
  title?: string;
  ariaLabel?: string;
}

export default function TableOfContents({
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
      <p className="text-[11px] font-semibold uppercase tracking-widest text-blog-muted mb-4 pl-3">
        {title}
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}
          >
            <a
              href={`#${h.id}`}
              className={`text-sm block py-1 px-3 border-l-2 rounded-r transition-all duration-150 ${
                activeId === h.id
                  ? 'border-blog-green text-blog-green font-semibold bg-blog-green-light'
                  : 'border-transparent text-blog-muted hover:text-blog-purple hover:border-blog-purple hover:bg-blog-purple-light/50'
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
