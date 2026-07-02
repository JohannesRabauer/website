import { FiCheck, FiX } from 'react-icons/fi';
import Reveal from '@/app/components/Reveal';

interface ProsConsProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export default function ProsCons({
  pros = [],
  cons = [],
  prosTitle = 'Pros',
  consTitle = 'Cons',
}: ProsConsProps) {
  return (
    <Reveal className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-method-pros/25 bg-method-pros-soft/60 p-5 backdrop-blur-sm">
        <h4 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-heading)] text-base font-semibold text-method-pros">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-method-pros/15">
            <FiCheck className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {prosTitle}
        </h4>
        <ul className="space-y-2.5">
          {pros.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-method-ink/90">
              <FiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-method-pros" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-method-cons/25 bg-method-cons-soft/60 p-5 backdrop-blur-sm">
        <h4 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-heading)] text-base font-semibold text-method-cons">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-method-cons/15">
            <FiX className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {consTitle}
        </h4>
        <ul className="space-y-2.5">
          {cons.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-method-ink/90">
              <FiX className="mt-0.5 h-4 w-4 flex-shrink-0 text-method-cons" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
