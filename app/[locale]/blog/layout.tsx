import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import BlogLayoutShell from '@/app/components/BlogLayoutShell';
import { isBlogLocale } from '@/lib/blog-i18n';

export default async function LocalizedBlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isBlogLocale(locale)) {
    notFound();
  }

  return <BlogLayoutShell locale={locale}>{children}</BlogLayoutShell>;
}
