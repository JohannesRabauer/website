'use client';

import { useState, useEffect } from 'react';
import { FiLink, FiCheck } from 'react-icons/fi';
import { BLOG_SITE_URL, type BlogLocale, getBlogDictionary } from '@/lib/blog-i18n';

interface ShareButtonProps {
  locale: BlogLocale;
  path: string;
  variant?: 'meta' | 'footer';
}

export default function ShareButton({ locale, path, variant = 'meta' }: ShareButtonProps) {
  const copy = getBlogDictionary(locale);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    const url = new URL(path, BLOG_SITE_URL).toString();
    navigator.clipboard.writeText(url).then(() => setCopied(true));
  }

  if (variant === 'footer') {
    return (
      <div className="pt-8 mb-8 border-t border-blog-border">
        <button
          onClick={handleCopy}
          aria-label={copied ? copy.post.linkCopied : copy.post.sharePostLink}
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-blog-border text-blog-muted hover:text-blog-purple hover:border-blog-purple transition-colors"
        >
          {copied ? (
            <FiCheck className="w-4 h-4 text-blog-green flex-shrink-0" aria-hidden="true" />
          ) : (
            <FiLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          )}
          <span aria-live="assertive">{copied ? copy.post.linkCopied : copy.post.share}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-blog-muted hover:text-blog-purple transition-colors"
      aria-label={copied ? copy.post.linkCopied : copy.post.sharePostLink}
    >
      {copied ? (
        <FiCheck className="w-3.5 h-3.5 text-blog-green flex-shrink-0" aria-hidden="true" />
      ) : (
        <FiLink className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      )}
      <span aria-live="assertive">{copied ? copy.post.linkCopied : copy.post.share}</span>
    </button>
  );
}
