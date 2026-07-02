import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MethodContent from '@/app/components/MethodContent';
import { getAllMethods, getMethodBySlug } from '@/lib/methods';
import {
  METHODS_COPY,
  METHODS_SITE_URL,
  getMethodPath,
} from '@/lib/methods-i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMethods().map((method) => ({ slug: method.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const method = getMethodBySlug(slug);

  if (!method) {
    return {};
  }

  const { title, tagline } = method.frontmatter;
  const fullTitle = `${title} | ${METHODS_COPY.section.label}`;

  return {
    title: fullTitle,
    description: tagline,
    alternates: {
      canonical: getMethodPath(slug),
    },
    authors: [{ name: 'Johannes Rabauer', url: 'https://rabauer.dev' }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `${METHODS_SITE_URL}${getMethodPath(slug)}`,
      title: fullTitle,
      description: tagline,
      authors: ['Johannes Rabauer'],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@JohannesRabauer',
    },
  };
}

export default async function MethodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const method = getMethodBySlug(slug);

  if (!method) {
    notFound();
  }

  return <MethodContent slug={slug} />;
}
