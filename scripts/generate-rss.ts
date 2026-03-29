/**
 * Generates public/rss.xml and public/feed.json at build time.
 * Run via: tsx scripts/generate-rss.ts
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://rabauer.dev';
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
}

function loadPosts(): PostData[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostData, 'slug'>) };
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

function buildRss(posts: PostData[]): string {
  const items = posts
    .map(
      (p) => `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${SITE_URL}/blog/${p.slug}/</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}/</guid>
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
    <title>Live-Coding Learnings: Modern Java with AI</title>
    <link>${SITE_URL}/blog/</link>
    <description>Live coding sessions, Java deep-dives, cloud-native patterns, and engineering craft.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>© ${new Date().getFullYear()} Johannes Rabauer</copyright>${items}
  </channel>
</rss>`;
}

const posts = loadPosts();
const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), buildRss(posts), 'utf-8');
console.log(`✓ RSS feed  → public/rss.xml (${posts.length} posts)`);
