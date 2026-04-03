/**
 * Generates the English RSS feed at build time.
 * Run via: tsx scripts/generate-rss.ts
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type BlogLocale, getBlogAliasPath, getBlogDictionary, getBlogRssPath } from '../lib/blog-i18n';

const SITE_URL = 'https://rabauer.dev';
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

interface PostData {
  locale: BlogLocale;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
}

function getLocaleDir(locale: BlogLocale): string {
  return path.join(POSTS_DIR, locale);
}

function loadPosts(locale: BlogLocale): PostData[] {
  const localeDir = getLocaleDir(locale);

  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(localeDir, filename), 'utf-8');
      const { data } = matter(raw);
      return { locale, slug, ...(data as Omit<PostData, 'locale' | 'slug'>) };
    })
    .filter((p) => !p.draft)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss(locale: BlogLocale, posts: PostData[]): string {
  const copy = getBlogDictionary(locale);
  const items = posts
    .map(
      (p) => `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${SITE_URL}${getBlogAliasPath(p.slug)}/</link>
    <guid isPermaLink="true">${SITE_URL}${getBlogAliasPath(p.slug)}/</guid>
    <description>${escapeXml(p.summary)}</description>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>${
      p.tags?.map((t) => `\n    <category>${escapeXml(t)}</category>`).join('') ?? ''
    }
  </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(copy.feeds.title)}</title>
    <link>${SITE_URL}${getBlogAliasPath()}/</link>
    <description>${escapeXml(copy.feeds.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}${getBlogRssPath()}" rel="self" type="application/rss+xml"/>
    <copyright>© ${new Date().getFullYear()} Johannes Rabauer</copyright>${items}
  </channel>
</rss>`;
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const englishPosts = loadPosts('en');
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), buildRss('en', englishPosts), 'utf-8');

const germanFeedPath = path.join(PUBLIC_DIR, 'rss-de.xml');
if (fs.existsSync(germanFeedPath)) {
  fs.unlinkSync(germanFeedPath);
}

console.log(`✓ RSS feed  → public/rss.xml (${englishPosts.length} posts)`);

