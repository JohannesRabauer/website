import type { Metadata } from 'next';
import BlogAliasRedirect from '@/app/components/BlogAliasRedirect';
import { getBlogDictionary, getBlogListingPath } from '@/lib/blog-i18n';

const copy = getBlogDictionary('en');

export const metadata: Metadata = {
  title: `${copy.listing.metaTitle} | Johannes Rabauer`,
  description: copy.listing.metaDescription,
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: getBlogListingPath('en'),
  },
};

export default function BlogAliasPage() {
  return <BlogAliasRedirect />;
}
