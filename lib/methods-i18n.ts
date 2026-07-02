// Agentic Methods — English-only for now. The seam below keeps a single place to
// add locales later (mirrors lib/blog-i18n.ts) without rewriting call sites.

export const METHODS_SITE_URL = 'https://rabauer.dev';

export const METHODS_COPY = {
  htmlLang: 'en',
  section: {
    label: 'Agentic Methods',
    eyebrow: 'Field guide',
    title: 'Agentic Methods',
    subtitle: 'Architectures & methodics for working with agentic AI',
    description:
      'A growing, opinionated catalog of ways to structure work with agentic AI. Each method gets a short visual explanation, honest pros and cons, and a clear "where to use" — so you can pick the right approach instead of guessing.',
    home: 'Home',
    skipToContent: 'Skip to content',
    footerRights: 'All rights reserved.',
    allMethods: 'All methods',
    allCategories: 'All',
    methodsCount: (count: number) => `${count} method${count === 1 ? '' : 's'}`,
    empty: 'No methods yet. Check back soon.',
  },
  card: {
    readMore: 'Explore',
  },
  detail: {
    backToOverview: 'All methods',
    onThisPage: 'On this page',
    tableOfContentsAriaLabel: 'Table of contents',
    share: 'Share',
    linkCopied: 'Link copied!',
    shareLink: 'Share this method',
    sources: 'Sources',
    relatedReading: 'Related reading',
    prosTitle: 'Pros',
    consTitle: 'Cons',
    whereToUseTitle: 'Where to use',
    bestForTitle: 'Best for',
    avoidWhenTitle: 'Avoid when',
    maturityLabel: 'Maturity',
    readingTime: (minutes: number) => `${minutes} min read`,
  },
} as const;

export function getMethodsListingPath(): string {
  return '/methods';
}

export function getMethodPath(slug: string): string {
  return `/methods/${slug}`;
}

// Blog cross-links are English canonical routes.
export function getRelatedBlogPath(slug: string): string {
  return `/en/blog/${slug}`;
}
