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
}: Props) {
  const pathname = usePathname();
  const resolvedHrefs = preserveCurrentPath
    ? resolvePathAwareHrefs(pathname, hrefs)
    : hrefs;

  function persistPreference(locale: BlogLocale) {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(BLOG_LOCALE_STORAGE_KEY, locale);
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blog-muted">
        {label}
      </span>
      <div
        className="inline-flex items-center rounded-full border border-blog-border bg-white p-1"
        role="group"
        aria-label={label}
      >
        {BLOG_LOCALES.map((locale) => {
          const isCurrent = locale === currentLocale;
          const href = resolvedHrefs[locale];
          const baseClassName =
            'rounded-full px-3 py-1 text-xs font-semibold transition-colors';

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
