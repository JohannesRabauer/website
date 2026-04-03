import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { type BlogLocale, getBlogDictionary } from '@/lib/blog-i18n';

interface Props {
  href?: string;
  title?: string;
  locale?: BlogLocale;
}

export default function MainRepositoryLink({
  href,
  title,
  locale = 'en',
}: Props) {
  const copy = getBlogDictionary(locale);

  if (!href) return null;

  return (
    <section className="my-8 rounded-2xl border border-blog-border bg-blog-surface p-5 shadow-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-blog-green">
        {copy.post.projectSource}
      </p>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-blog-purple leading-tight">
        {title ?? copy.post.workingRepository}
      </h2>
      <p className="mt-2 text-sm text-blog-muted">
        {copy.post.projectSourceDescription}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blog-purple bg-blog-purple px-3.5 py-1.5 text-sm font-semibold text-white no-underline transition hover:bg-blog-purple-mid"
      >
        <FiGithub className="h-4 w-4" />
        {copy.post.openRepository}
        <FiExternalLink className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}