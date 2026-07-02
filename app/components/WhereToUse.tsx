import { FiTarget, FiSlash } from 'react-icons/fi';
import Reveal from '@/app/components/Reveal';

interface WhereToUseProps {
  best: string[];
  avoid?: string[];
  title?: string;
  bestTitle?: string;
  avoidTitle?: string;
}

export default function WhereToUse({
  best = [],
  avoid = [],
  title = 'Where to use',
  bestTitle = 'Best for',
  avoidTitle = 'Avoid when',
}: WhereToUseProps) {
  return (
    <Reveal className="not-prose my-8">
      <div className="method-gradient-border overflow-hidden rounded-2xl p-6 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.25)]">
        <h3 className="mb-4 flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-lg font-semibold text-method-ink">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-method-accent to-method-accent3 text-white">
            <FiTarget className="h-4 w-4" aria-hidden="true" />
          </span>
          {title}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-method-accent">
              {bestTitle}
            </p>
            <ul className="space-y-2">
              {best.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-method-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-method-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {avoid.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-method-muted">
                <FiSlash className="h-3.5 w-3.5" aria-hidden="true" />
                {avoidTitle}
              </p>
              <ul className="space-y-2">
                {avoid.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-method-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-method-muted/50" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
