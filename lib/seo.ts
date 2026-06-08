import type { Post } from './posts';
import { getPostCoverImage } from './post-media';
import { getBlogPostPath } from './blog-i18n';
import {
  HOMEPAGE_FAQS,
  PERSON_BANNER_PATH,
  PERSON_DESCRIPTION,
  PERSON_EMAIL,
  PERSON_EMPLOYER,
  PERSON_EMPLOYER_URL,
  PERSON_IMAGE_PATH,
  PERSON_JOB_TITLE,
  PERSON_KNOWS_ABOUT,
  PERSON_NAME,
  PERSON_SAME_AS,
  SITE_NAME,
  SITE_URL,
} from './site-data';

function ensureTrailingSlash(path: string): string {
  if (path === '/') {
    return '/';
  }

  return `${path.replace(/\/+$/, '')}/`;
}

export function toAbsoluteUrl(path = '/'): string {
  return new URL(ensureTrailingSlash(path), `${SITE_URL}/`).toString();
}

export function toAbsoluteAssetUrl(path: string): string {
  return path.startsWith('http://') || path.startsWith('https://')
    ? path
    : new URL(path, `${SITE_URL}/`).toString();
}

export const PERSON_SCHEMA_ID = `${toAbsoluteUrl()}#person`;
export const WEBSITE_SCHEMA_ID = `${toAbsoluteUrl()}#website`;

export function getGlobalJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_SCHEMA_ID,
        name: PERSON_NAME,
        url: toAbsoluteUrl(),
        image: toAbsoluteUrl(PERSON_IMAGE_PATH),
        email: PERSON_EMAIL,
        jobTitle: PERSON_JOB_TITLE,
        description: PERSON_DESCRIPTION,
        worksFor: {
          '@type': 'Organization',
          name: PERSON_EMPLOYER,
          url: PERSON_EMPLOYER_URL,
        },
        knowsAbout: [...PERSON_KNOWS_ABOUT],
        sameAs: [...PERSON_SAME_AS],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_SCHEMA_ID,
        url: toAbsoluteUrl(),
        name: SITE_NAME,
        description: PERSON_DESCRIPTION,
        publisher: {
          '@id': PERSON_SCHEMA_ID,
        },
        inLanguage: ['en', 'de'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${toAbsoluteUrl('/en/blog')}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function getHomepageJsonLd() {
  const homepageUrl = toAbsoluteUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${homepageUrl}#webpage`,
        url: homepageUrl,
        name: `${PERSON_NAME} | ${PERSON_JOB_TITLE}`,
        description: PERSON_DESCRIPTION,
        inLanguage: 'en',
        isPartOf: {
          '@id': WEBSITE_SCHEMA_ID,
        },
        about: {
          '@id': PERSON_SCHEMA_ID,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl(PERSON_BANNER_PATH),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${homepageUrl}#faq`,
        url: homepageUrl,
        mainEntity: HOMEPAGE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function getArticleJsonLd(post: Post) {
  const articleUrl = toAbsoluteUrl(getBlogPostPath(post.locale, post.slug));
  const image = toAbsoluteAssetUrl(getPostCoverImage(post.frontmatter));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    image: [image],
    author: {
      '@id': PERSON_SCHEMA_ID,
    },
    publisher: {
      '@id': PERSON_SCHEMA_ID,
    },
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    isPartOf: {
      '@id': WEBSITE_SCHEMA_ID,
    },
    inLanguage: post.locale,
    keywords: post.frontmatter.tags,
    about: [...PERSON_KNOWS_ABOUT, ...post.frontmatter.tags],
  };
}

export function stringifyJsonLd(data: object): string {
  return JSON.stringify(data);
}
