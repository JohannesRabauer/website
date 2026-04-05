'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BLOG_LOCALES,
  BLOG_LOCALE_STORAGE_KEY,
  type BlogLocale,
  getBlogAliasPath,
  getBlogListingPath,
  getBlogPostPath,
  isBlogLocale,
} from '@/lib/blog-i18n';

interface Props {
  currentLocale: BlogLocale;
  hrefs: Partial<Record<BlogLocale, string>>;
  label: string;
  unavailableLabel?: string;
  preserveCurrentPath?: boolean;
  hideOnPostPath?: boolean;
  hideLabelOnMobile?: boolean;
  compact?: boolean;
}

function isBlogPostPath(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'blog') {
    return segments.length >= 2;
  }

  return segments.length >= 3 && isBlogLocale(segments[0]) && segments[1] === 'blog';
}

function resolvePathAwareHrefs(
  pathname: string | null,
  fallbackHrefs: Partial<Record<BlogLocale, string>>
): Partial<Record<BlogLocale, string>> {
  if (!pathname) {
    return fallbackHrefs;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'blog') {
    if (segments.length === 1) {
      return {
        en: getBlogAliasPath(),
        de: getBlogListingPath('de'),
      };
    }

    if (segments.length >= 2) {
      return {
        en: getBlogAliasPath(segments[1]),
        de: getBlogPostPath('de', segments[1]),
      };
    }
  }

  if (segments.length >= 2 && isBlogLocale(segments[0]) && segments[1] === 'blog') {
    if (segments.length === 2) {
      return {
        en: getBlogListingPath('en'),
        de: getBlogListingPath('de'),
      };
    }

    if (segments.length >= 3) {
      return {
        en: getBlogPostPath('en', segments[2]),
        de: getBlogPostPath('de', segments[2]),
      };
    }
  }

  return fallbackHrefs;
}

export default function BlogLanguageSwitcher({
  currentLocale,
  hrefs,
  label,
  unavailableLabel,
  preserveCurrentPath = false,
  hideOnPostPath = false,
  hideLabelOnMobile = false,
  compact = false,
}: Props) {
  const pathname = usePathname();

  if (hideOnPostPath && isBlogPostPath(pathname)) {
    return null;
  }

  const resolvedHrefs = preserveCurrentPath
    ? resolvePathAwareHrefs(pathname, hrefs)
    : hrefs;

  function persistPreference(locale: BlogLocale) {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(BLOG_LOCALE_STORAGE_KEY, locale);
  }

  const wrapperClassName = compact ? 'inline-flex items-center gap-1.5' : 'inline-flex items-center gap-2';
  const labelClassName = compact
    ? `text-[10px] font-semibold uppercase tracking-[0.18em] text-blog-muted ${hideLabelOnMobile ? 'hidden sm:inline' : ''}`
    : `text-[11px] font-semibold uppercase tracking-[0.22em] text-blog-muted ${hideLabelOnMobile ? 'hidden sm:inline' : ''}`;
  const groupClassName = compact
    ? 'inline-flex items-center rounded-full border border-blog-border bg-white p-0.5 shadow-sm'
    : 'inline-flex items-center rounded-full border border-blog-border bg-white p-1';
  const baseClassName = compact
    ? 'rounded-full px-2 py-0.5 text-[11px] font-semibold leading-5 transition-colors'
    : 'rounded-full px-3 py-1 text-xs font-semibold transition-colors';

  return (
    <div className={wrapperClassName}>
      <span className={labelClassName}>
        {label}
      </span>
      <div
        className={groupClassName}
        role="group"
        aria-label={label}
      >
        {BLOG_LOCALES.map((locale) => {
          const isCurrent = locale === currentLocale;
          const href = resolvedHrefs[locale];

          if (isCurrent) {
            return (
              <span
                key={locale}
                aria-current="page"
                className={`${baseClassName} bg-blog-purple text-white`}
              >
                {locale.toUpperCase()}
              </span>
            );
          }

          if (!href) {
            return (
              <span
                key={locale}
                aria-disabled="true"
                title={unavailableLabel}
                className={`${baseClassName} cursor-not-allowed text-blog-muted/50`}
              >
                {locale.toUpperCase()}
              </span>
            );
          }

          return (
            <Link
              key={locale}
              href={href}
              onClick={() => persistPreference(locale)}
              className={`${baseClassName} text-blog-muted hover:bg-blog-purple-light hover:text-blog-purple`}
            >
              {locale.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
