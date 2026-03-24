import { FiClock, FiExternalLink } from 'react-icons/fi';

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
    <section className="my-10 rounded-2xl border border-blog-border bg-blog-surface p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-blog-purple">
        <FiClock className="w-4 h-4" />
        <h2 className="!m-0 font-[family-name:var(--font-dm-serif)] text-2xl text-blog-purple">
          {title}
        </h2>
      </div>
      <ul className="!m-0 !p-0 list-none space-y-2">
        {items.map((item) => {
          const seconds = toSeconds(item.time);
          return (
            <li key={`${item.time}-${item.label}`} className="!m-0">
              <a
                href={`https://youtube.com/watch?v=${videoId}&t=${seconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-4 rounded-xl px-4 py-3 text-blog-text no-underline transition hover:bg-blog-purple-light"
              >
                <span className="flex items-start gap-3 min-w-0">
                  <span className="inline-flex rounded-full bg-blog-green-light px-2 py-0.5 text-xs font-semibold text-blog-green">
                    {item.time}
                  </span>
                  <span className="min-w-0 text-sm leading-6 text-blog-text">
                    {item.label}
                  </span>
                </span>
                <FiExternalLink className="mt-1 h-4 w-4 shrink-0 text-blog-muted" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
