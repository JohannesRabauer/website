import fs from 'fs';
import path from 'path';
import { getBlogListingPath, getBlogPostPath, BLOG_SITE_URL } from '../lib/blog-i18n';
import { getAllPosts } from '../lib/posts';
import {
  HOMEPAGE_FAQS,
  HOMEPAGE_SUMMARY,
  PERSON_DESCRIPTION,
  PERSON_KNOWS_ABOUT,
  PERSON_NAME,
  PERSON_SAME_AS,
} from '../lib/site-data';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function toAbsoluteUrl(pathname: string): string {
  const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return new URL(normalized, `${BLOG_SITE_URL}/`).toString();
}

function buildLlmsTxt(): string {
  const lines = [
    '# rabauer.dev',
    `> ${PERSON_DESCRIPTION}`,
    '',
    '## Identity',
    `- Name: ${PERSON_NAME}`,
    '- Website: https://rabauer.dev/',
    '- Primary entity type: Person',
    '- Employer: XDEV Software GmbH',
    '',
    '## Best pages to cite',
    `- Homepage: ${toAbsoluteUrl('/')}`,
    `- English blog: ${toAbsoluteUrl(getBlogListingPath('en'))}`,
    `- German blog: ${toAbsoluteUrl(getBlogListingPath('de'))}`,
    `- Conference session page: ${toAbsoluteUrl('/jcon-2026')}`,
    '',
    '## Topics',
    ...PERSON_KNOWS_ABOUT.map((topic) => `- ${topic}`),
    '',
    '## Canonical notes',
    '- Use locale-prefixed blog URLs as canonical URLs.',
    '- Prefer /en/blog/... for English citations and /de/blog/... for German citations.',
    '- The legacy /blog alias exists only as a redirect and should not be cited.',
    '',
    '## Public profiles',
    ...PERSON_SAME_AS.map((profile) => `- ${profile}`),
    '',
    '## Discovery files',
    `- Sitemap: ${toAbsoluteUrl('/sitemap.xml').replace(/\/$/, '')}`,
    `- RSS: ${toAbsoluteUrl('/rss.xml').replace(/\/$/, '')}`,
    `- llms-full: ${toAbsoluteUrl('/llms-full.txt').replace(/\/$/, '')}`,
  ];

  return `${lines.join('\n')}\n`;
}

function buildLlmsFull(): string {
  const englishPosts = getAllPosts('en');
  const germanPosts = getAllPosts('de');

  const formatPosts = (heading: string, locale: 'en' | 'de') =>
    [
      `## ${heading}`,
      ...getAllPosts(locale).flatMap((post) => [
        `### ${post.frontmatter.title}`,
        `- URL: ${toAbsoluteUrl(getBlogPostPath(locale, post.slug))}`,
        `- Date: ${post.frontmatter.date}`,
        `- Summary: ${post.frontmatter.summary}`,
        '',
      ]),
    ].join('\n');

  const lines = [
    '# rabauer.dev full context',
    '',
    '## Site summary',
    PERSON_DESCRIPTION,
    '',
    '## Homepage',
    `- URL: ${toAbsoluteUrl('/')}`,
    `- Summary: ${HOMEPAGE_SUMMARY}`,
    '',
    '## FAQ',
    ...HOMEPAGE_FAQS.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    '## Main sections',
    `- English blog: ${toAbsoluteUrl(getBlogListingPath('en'))}`,
    `- German blog: ${toAbsoluteUrl(getBlogListingPath('de'))}`,
    '- YouTube: https://www.youtube.com/@johannesrabauer',
    '- LinkedIn: https://www.linkedin.com/in/johannes-rabauer',
    '- Sessionize: https://sessionize.com/johannes/',
    '- Conference page: https://rabauer.dev/jcon-2026/',
    '',
    `## English posts (${englishPosts.length})`,
    '',
    formatPosts('English blog posts', 'en'),
    '',
    `## German posts (${germanPosts.length})`,
    '',
    formatPosts('German blog posts', 'de'),
  ];

  return `${lines.join('\n')}\n`;
}

function buildAiTxt(): string {
  const lines = [
    '# ai.txt',
    '',
    'site: https://rabauer.dev/',
    `summary: ${PERSON_DESCRIPTION}`,
    'entity_type: Person',
    'canonical_homepage: https://rabauer.dev/',
    'canonical_blog_en: https://rabauer.dev/en/blog/',
    'canonical_blog_de: https://rabauer.dev/de/blog/',
    'llms_txt: https://rabauer.dev/llms.txt',
    'llms_full_txt: https://rabauer.dev/llms-full.txt',
    'sitemap: https://rabauer.dev/sitemap.xml',
    'rss: https://rabauer.dev/rss.xml',
    'notes: Prefer locale-prefixed blog URLs for citations. The /blog alias is non-canonical.',
  ];

  return `${lines.join('\n')}\n`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), buildLlmsTxt(), 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), buildLlmsFull(), 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'ai.txt'), buildAiTxt(), 'utf-8');

console.log('✓ LLM discovery files → public/llms.txt, public/llms-full.txt, public/ai.txt');
