'use client';

import { useEffect, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { type BlogLocale, getBlogDictionary } from '@/lib/blog-i18n';

interface Props {
  code: string;
  language?: string;
  locale?: BlogLocale;
}

export default function CodeSnippet({ code, language = 'bash', locale = 'en' }: Props) {
  const copy = getBlogDictionary(locale);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => setCopied(true));
  }

  return (
    <div className="not-prose relative my-6 overflow-hidden rounded-xl border border-blog-border bg-blog-code-bg">
      <button
        onClick={handleCopy}
        aria-label={copied ? copy.post.codeCopied : copy.post.copyCode}
        className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-md border border-blog-border bg-blog-surface px-2 py-1 text-xs font-medium text-blog-muted transition-colors hover:border-blog-purple hover:text-blog-purple"
      >
        {copied ? (
          <FiCheck className="h-3.5 w-3.5 text-blog-green" aria-hidden="true" />
        ) : (
          <FiCopy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span aria-live="assertive">{copied ? copy.post.codeCopied : copy.post.copyCode}</span>
      </button>
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed text-blog-text">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
