import { FiClock, FiExternalLink, FiChevronDown } from 'react-icons/fi';

interface TimestampItem {
  time: string;
  label: string;
}

interface Props {
  videoId: string;
  items: TimestampItem[];
  title?: string;
}

function toSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.some(Number.isNaN)) return 0;
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}

export default function TimestampList({
  videoId,
  items = [],
  title = 'Session Timeline',
}: Props) {
  if (!items.length || !videoId) return null;

  return (
    <details className="group my-10 rounded-2xl border border-blog-border bg-blog-surface shadow-sm overflow-hidden">
      <summary className="flex cursor-pointer select-none items-center justify-between px-6 py-4 text-blog-purple hover:bg-blog-purple-light transition-colors [&::-webkit-details-marker]:hidden list-none">
        <span className="flex items-center gap-2.5">
          <FiClock className="w-4 h-4" />
          <span className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight">
            {title}
          </span>
        </span>
        <FiChevronDown className="w-4 h-4 text-blog-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-blog-border px-6 pb-5 pt-3">
        <ul className="!m-0 !p-0 list-none space-y-1">
          {items.map((item) => {
            const seconds = toSeconds(item.time);
            return (
              <li key={`${item.time}-${item.label}`} className="!m-0">
                <a
                  href={`https://youtube.com/watch?v=${videoId}&t=${seconds}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-blog-text no-underline transition hover:bg-blog-purple-light"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex w-16 shrink-0 justify-center rounded-md bg-blog-green-light px-2 py-0.5 font-[family-name:var(--font-heading)] text-xs font-semibold tabular-nums text-blog-green">
                      {item.time}
                    </span>
                    <span className="min-w-0 text-sm leading-5 text-blog-text">
                      {item.label}
                    </span>
                  </span>
                  <FiExternalLink className="h-3.5 w-3.5 shrink-0 text-blog-muted" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
