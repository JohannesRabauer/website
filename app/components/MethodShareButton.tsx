'use client';

import { useEffect, useState } from 'react';
import { FiLink, FiCheck } from 'react-icons/fi';
import { METHODS_COPY, METHODS_SITE_URL } from '@/lib/methods-i18n';

interface Props {
  path: string;
}

export default function MethodShareButton({ path }: Props) {
  const copy = METHODS_COPY.detail;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    const url = new URL(path, METHODS_SITE_URL).toString();
    navigator.clipboard.writeText(url).then(() => setCopied(true));
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-method-muted transition-colors hover:text-method-accent"
      aria-label={copied ? copy.linkCopied : copy.shareLink}
    >
      {copied ? (
        <FiCheck className="h-3.5 w-3.5 flex-shrink-0 text-method-pros" aria-hidden="true" />
      ) : (
        <FiLink className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      )}
      <span aria-live="assertive">{copied ? copy.linkCopied : copy.share}</span>
    </button>
  );
}
