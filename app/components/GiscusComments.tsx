'use client';

import Giscus from '@giscus/react';
import Link from 'next/link';
import { useState } from 'react';
import { type BlogLocale, getBlogDictionary } from '@/lib/blog-i18n';
import { giscusDiscussionUrl } from '@/lib/legal';

/**
 * Giscus comment section.
 * Configure your repo/category details at https://giscus.app
 * and replace the placeholder values below.
 */
export default function GiscusComments({ locale }: { locale: BlogLocale }) {
  const copy = getBlogDictionary(locale);
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadComments = () => {
    if (!hasConsent) {
      return;
    }

    setIsLoaded(true);
  };

  const hideComments = () => {
    setIsLoaded(false);
    setHasConsent(false);
  };

  return (
    <section className="mt-16 pt-8 border-t border-blog-border">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-blog-purple mb-6">
        {copy.post.comments}
      </h3>

      {!isLoaded ? (
        <div className="overflow-hidden rounded-2xl border border-blog-border bg-blog-surface text-blog-text shadow-sm">
          <div className="space-y-4 p-5 sm:p-6">
            <div>
              <h4 className="text-lg font-semibold">{copy.post.commentsConsentTitle}</h4>
              <p className="mt-2 text-sm leading-6 text-blog-muted">
                {copy.post.commentsConsentDescription}
              </p>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-blog-border bg-blog-purple-light/35 px-4 py-3 text-sm leading-6 text-blog-text">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(event) => setHasConsent(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-blog-border text-blog-purple focus:ring-blog-purple"
              />
              <span>{copy.post.commentsConsentLabel}</span>
            </label>

            {!hasConsent ? (
              <p className="text-xs leading-5 text-blog-muted">
                {copy.post.commentsConsentRequired}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadComments}
                disabled={!hasConsent}
                className="rounded-full bg-blog-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-blog-purple-mid disabled:cursor-not-allowed disabled:bg-blog-muted disabled:text-white/80"
              >
                {copy.post.commentsLoadLabel}
              </button>

              <a
                href={giscusDiscussionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blog-border px-4 py-2 text-sm font-medium text-blog-muted transition hover:border-blog-purple hover:text-blog-purple"
              >
                {copy.post.commentsExternalLabel}
              </a>
            </div>

            <p className="text-xs leading-5 text-blog-muted">
              <Link href="/datenschutz" className="underline underline-offset-2">
                {copy.post.commentsPrivacyNotice}
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blog-border bg-blog-green-light/40 px-4 py-3 text-sm text-blog-text">
            <p>{copy.post.commentsLoadedNotice}</p>
            <button
              type="button"
              onClick={hideComments}
              className="rounded-full border border-blog-border px-4 py-2 text-sm font-medium text-blog-muted transition hover:border-blog-purple hover:text-blog-purple"
            >
              {copy.post.commentsHideLabel}
            </button>
          </div>

          <Giscus
            key={`giscus-${locale}`}
            repo="JohannesRabauer/website"
            repoId="R_kgDOPudYiQ"
            category="giscus"
            categoryId="DIC_kwDOPudYic4C5MMP"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang={locale}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}
