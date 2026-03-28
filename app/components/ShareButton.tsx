'use client';

import { useState, useEffect } from 'react';
import { FiLink, FiCheck } from 'react-icons/fi';

interface ShareButtonProps {
  slug: string;
  variant?: 'meta' | 'footer';
}

export default function ShareButton({ slug, variant = 'meta' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    const url = `https://rabauer.dev/blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => setCopied(true));
  }

  if (variant === 'footer') {
    return (
      <div className="pt-8 mb-8 border-t border-blog-border">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-blog-border text-blog-muted hover:text-blog-purple hover:border-blog-purple transition-colors"
        >
          {copied ? (
            <FiCheck className="w-4 h-4 text-blog-green flex-shrink-0" />
          ) : (
            <FiLink className="w-4 h-4 flex-shrink-0" />
          )}
          {copied ? 'Link copied!' : 'Share'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-blog-muted hover:text-blog-purple transition-colors"
      title="Copy link to this post"
    >
      {copied ? (
        <FiCheck className="w-3.5 h-3.5 text-blog-green flex-shrink-0" />
      ) : (
        <FiLink className="w-3.5 h-3.5 flex-shrink-0" />
      )}
      {copied ? 'Link copied!' : 'Share'}
    </button>
  );
}
