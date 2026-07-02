import type { Metadata } from 'next';
import MethodsIndexContent from '@/app/components/MethodsIndexContent';
import { getAllCategories, getAllMethods } from '@/lib/methods';
import {
  METHODS_COPY,
  METHODS_SITE_URL,
  getMethodsListingPath,
} from '@/lib/methods-i18n';

export const metadata: Metadata = {
  title: `${METHODS_COPY.section.title} — ${METHODS_COPY.section.subtitle} | Johannes Rabauer`,
  description: METHODS_COPY.section.description,
  alternates: {
    canonical: getMethodsListingPath(),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${METHODS_SITE_URL}${getMethodsListingPath()}`,
    title: `${METHODS_COPY.section.title} — ${METHODS_COPY.section.subtitle}`,
    description: METHODS_COPY.section.description,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@JohannesRabauer',
  },
};

export default function MethodsPage() {
  const methods = getAllMethods();
  const categories = getAllCategories();

  return <MethodsIndexContent methods={methods} categories={categories} />;
}
