import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/app/components/BlogPostContent';
import {
  BLOG_LOCALES,
  getBlogAlternates,
  getBlogDictionary,
  getBlogPostPath,
  isBlogLocale,
} from '@/lib/blog-i18n';
import { getAllPosts, getAvailablePostLocales, getPostBySlug } from '@/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_LOCALES.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    return {};
  }

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const availableLocales = getAvailablePostLocales(slug);
  const copy = getBlogDictionary(locale);
  const ogImages = post.frontmatter.youtubeId
    ? [
        {
          url: `https://img.youtube.com/vi/${post.frontmatter.youtubeId}/hqdefault.jpg`,
          width: 480,
          height: 360,
        },
      ]
    : [];

  return {
    title: `${post.frontmatter.title} | ${copy.layout.blogLabel}`,
    description: post.frontmatter.summary,
    alternates: {
      canonical: getBlogPostPath(locale, slug),
      languages: getBlogAlternates(slug, availableLocales),
    },
    openGraph: {
      locale: copy.openGraphLocale,
      title: `${post.frontmatter.title} | ${copy.layout.blogLabel}`,
      description: post.frontmatter.summary,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImages.map((image) => image.url),
    },
  };
}

export default async function LocalizedBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    notFound();
  }

  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogPostContent locale={locale} slug={slug} />;
}
