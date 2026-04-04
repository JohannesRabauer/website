import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogAliasRedirect from '@/app/components/BlogAliasRedirect';
import { getBlogAliasPath } from '@/lib/blog-i18n';
import { getAllPosts, getAvailablePostLocales, getPostBySlug } from '@/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(
    new Set([
      ...getAllPosts('en').map((post) => post.slug),
      ...getAllPosts('de').map((post) => post.slug),
    ])
  ).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en') ?? getPostBySlug(slug, 'de');

  if (!post) {
    return {};
  }

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
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.summary,
    alternates: {
      canonical: getBlogAliasPath(slug),
    },
    openGraph: { images: ogImages },
    twitter: { card: 'summary_large_image', images: ogImages.map((image) => image.url) },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function BlogAliasPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const availableLocales = getAvailablePostLocales(slug);

  if (availableLocales.length === 0) {
    notFound();
  }

  return <BlogAliasRedirect slug={slug} availableLocales={availableLocales} />;
}
