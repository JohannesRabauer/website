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
import { getPostCoverImage } from '@/lib/post-media';
import { getArticleJsonLd, stringifyJsonLd, toAbsoluteAssetUrl } from '@/lib/seo';

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
  const ogImages = [{ url: toAbsoluteAssetUrl(getPostCoverImage(post.frontmatter)) }];

  return {
    title: `${post.frontmatter.title} | ${copy.layout.blogLabel}`,
    description: post.frontmatter.summary,
    alternates: {
      canonical: getBlogPostPath(locale, slug),
      languages: getBlogAlternates(slug, availableLocales),
    },
    authors: [{ name: 'Johannes Rabauer', url: 'https://rabauer.dev' }],
    openGraph: {
      type: 'article',
      locale: copy.openGraphLocale,
      title: `${post.frontmatter.title} | ${copy.layout.blogLabel}`,
      description: post.frontmatter.summary,
      url: getBlogPostPath(locale, slug),
      publishedTime: post.frontmatter.date,
      authors: ['Johannes Rabauer'],
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@JohannesRabauer',
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

  const articleJsonLd = stringifyJsonLd(getArticleJsonLd(post));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <BlogPostContent locale={locale} slug={slug} />
    </>
  );
}
