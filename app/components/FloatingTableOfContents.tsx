'use client';

import { useEffect, useRef, useState } from 'react';
import { FiList, FiX } from 'react-icons/fi';
import type { Heading } from '@/lib/posts';

interface Props {
  headings: Heading[];
  title?: string;
}

export default function FloatingTableOfContents({ headings, title = 'On this page' }: Props) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const panelRef = useRef<HTMLDivElement>(null);

  // Highlight active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
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

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50 lg:hidden flex flex-col items-end gap-2">
      {open && (
        <div className="w-64 max-h-[60vh] overflow-y-auto rounded-2xl border border-blog-border bg-blog-surface/95 backdrop-blur-sm shadow-2xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blog-muted mb-3 pl-3">
            {title}
          </p>
          <ul className="space-y-0.5">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
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
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-blog-purple text-white px-4 py-2.5 shadow-lg hover:bg-blog-purple/90 transition-colors text-sm font-medium"
        aria-label={open ? 'Close table of contents' : 'Open table of contents'}
        aria-expanded={open}
      >
        {open ? <FiX className="w-4 h-4" /> : <FiList className="w-4 h-4" />}
        {!open && <span>Contents</span>}
      </button>
    </div>
  );
}
