import type { MetadataRoute } from 'next';
import { getAvailablePostLocales, getAllPosts } from '@/lib/posts';
import { getBlogListingPath, getBlogPostPath } from '@/lib/blog-i18n';
import { getAllMethods } from '@/lib/methods';
import { getMethodPath, getMethodsListingPath } from '@/lib/methods-i18n';
import { toAbsoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_PATHS = ['/', '/impressum', '/datenschutz', '/jcon-2026'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: toAbsoluteUrl(path),
    lastModified: now,
  }));

  const listingEntries: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl(getBlogListingPath('en')),
      lastModified: now,
      alternates: {
        languages: {
          en: toAbsoluteUrl(getBlogListingPath('en')),
          de: toAbsoluteUrl(getBlogListingPath('de')),
        },
      },
    },
    {
      url: toAbsoluteUrl(getBlogListingPath('de')),
      lastModified: now,
      alternates: {
        languages: {
          en: toAbsoluteUrl(getBlogListingPath('en')),
          de: toAbsoluteUrl(getBlogListingPath('de')),
        },
      },
    },
  ];

  const postEntries: MetadataRoute.Sitemap = getAllPosts('en')
    .concat(getAllPosts('de'))
    .map((post) => {
      const availableLocales = getAvailablePostLocales(post.slug);
      const languages = Object.fromEntries(
        availableLocales.map((locale) => [locale, toAbsoluteUrl(getBlogPostPath(locale, post.slug))])
      );

      return {
        url: toAbsoluteUrl(getBlogPostPath(post.locale, post.slug)),
        lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
        alternates: {
          languages,
        },
      };
    });

  const methodEntries: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl(getMethodsListingPath()),
      lastModified: now,
    },
    ...getAllMethods().map((method) => ({
      url: toAbsoluteUrl(getMethodPath(method.slug)),
      lastModified: now,
    })),
  ];

  return [...staticEntries, ...listingEntries, ...postEntries, ...methodEntries];
}
