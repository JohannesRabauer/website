'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BLOG_LOCALE_STORAGE_KEY,
  BLOG_LOCALES,
  DEFAULT_BLOG_LOCALE,
  type BlogLocale,
  getBlogListingPath,
  getBlogPostPath,
} from '@/lib/blog-i18n';

interface Props {
  slug?: string;
  availableLocales?: BlogLocale[];
}

function buildTarget(locale: BlogLocale, slug?: string): string {
  return slug ? getBlogPostPath(locale, slug) : getBlogListingPath(locale);
}

function detectPreferredLocale(availableLocales: BlogLocale[]): BlogLocale {
  if (typeof window === 'undefined') {
    return availableLocales.includes(DEFAULT_BLOG_LOCALE)
      ? DEFAULT_BLOG_LOCALE
      : availableLocales[0];
  }

  const storedLocale = window.localStorage.getItem(BLOG_LOCALE_STORAGE_KEY);

  if (storedLocale && BLOG_LOCALES.includes(storedLocale as BlogLocale)) {
    const locale = storedLocale as BlogLocale;

    if (availableLocales.includes(locale)) {
      return locale;
    }
  }

  const browserLanguages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];
  const prefersGerman = browserLanguages.some((language) =>
    language.toLowerCase().startsWith('de')
  );
  const preferredLocale: BlogLocale = prefersGerman ? 'de' : DEFAULT_BLOG_LOCALE;

  if (availableLocales.includes(preferredLocale)) {
    return preferredLocale;
  }

  if (availableLocales.includes(DEFAULT_BLOG_LOCALE)) {
    return DEFAULT_BLOG_LOCALE;
  }

  return availableLocales[0];
}

export default function BlogAliasRedirect({
  slug,
  availableLocales = [...BLOG_LOCALES],
}: Props) {
  const [fallbackHref, setFallbackHref] = useState(
    buildTarget(
      availableLocales.includes(DEFAULT_BLOG_LOCALE)
        ? DEFAULT_BLOG_LOCALE
        : availableLocales[0],
      slug
    )
  );

  useEffect(() => {
    const targetLocale = detectPreferredLocale(availableLocales);
    const targetHref = buildTarget(targetLocale, slug);

    window.localStorage.setItem(BLOG_LOCALE_STORAGE_KEY, targetLocale);
    setFallbackHref(targetHref);
    window.location.replace(targetHref);
  }, [availableLocales, slug]);

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 py-16 text-center text-blog-muted">
      <p className="text-lg text-blog-text">Redirecting to your preferred blog language...</p>
      <p className="mt-3 text-sm">
        If nothing happens, continue to{' '}
        <Link href={fallbackHref} className="text-blog-purple underline hover:no-underline">
          {fallbackHref}
        </Link>
        .
      </p>
    </main>
  );
}
