import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndexContent from '@/app/components/BlogIndexContent';
import {
  BLOG_LOCALES,
  getBlogAlternates,
  getBlogDictionary,
  getBlogListingPath,
  isBlogLocale,
} from '@/lib/blog-i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isBlogLocale(locale)) {
    return {};
  }

  const copy = getBlogDictionary(locale);

  return {
    title: `${copy.listing.metaTitle} | Johannes Rabauer`,
    description: copy.listing.metaDescription,
    alternates: {
      canonical: getBlogListingPath(locale),
      languages: getBlogAlternates(),
    },
    openGraph: {
      locale: copy.openGraphLocale,
      title: `${copy.listing.metaTitle} | Johannes Rabauer`,
      description: copy.listing.metaDescription,
    },
  };
}

export default async function LocalizedBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isBlogLocale(locale)) {
    notFound();
  }

  return <BlogIndexContent locale={locale} />;
}
