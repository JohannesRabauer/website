import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { DEFAULT_BLOG_LOCALE, BLOG_LOCALES, type BlogLocale } from '@/lib/blog-i18n';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  youtubeId?: string;
  mainRepository?: string;
  draft?: boolean;
  timestamps?: { time: string; label: string }[];
}

export interface Post {
  locale: BlogLocale;
  slug: string;
  frontmatter: PostFrontmatter;
  readingMinutes: number;
  coSpeakerName?: string;
  content: string;
}

export type PostMeta = Omit<Post, 'content'>;

/** Generate a URL-safe ID from heading text — matches rehype-slug output for typical headings. */
export function headingToId(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getPostsDir(locale: BlogLocale): string {
  return path.join(POSTS_DIR, locale);
}

function parsePost(locale: BlogLocale, filename: string): Post {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(getPostsDir(locale), filename), 'utf-8');
  const { data, content } = matter(raw);
  const coSpeakerMatch = raw.match(/<CoSpeakerCard[\s\S]*?name="([^"]+)"/);
  const readingStats = readingTime(content);

  return {
    locale,
    slug,
    frontmatter: data as PostFrontmatter,
    readingMinutes: Math.max(1, Math.ceil(readingStats.minutes)),
    coSpeakerName: coSpeakerMatch ? coSpeakerMatch[1] : undefined,
    content,
  };
}

const isProd = () => process.env.NODE_ENV === 'production';

export function getAllPosts(locale: BlogLocale = DEFAULT_BLOG_LOCALE): PostMeta[] {
  const localeDir = getPostsDir(locale);

  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => parsePost(locale, filename))
    .filter((p) => !(isProd() && p.frontmatter.draft))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(
  slug: string,
  locale: BlogLocale = DEFAULT_BLOG_LOCALE
): Post | null {
  const filePath = path.join(getPostsDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const post = parsePost(locale, `${slug}.mdx`);

  if (isProd() && post.frontmatter.draft) return null;

  return post;
}

export function getAvailablePostLocales(slug: string): BlogLocale[] {
  return BLOG_LOCALES.filter((locale) =>
    fs.existsSync(path.join(getPostsDir(locale), `${slug}.mdx`))
  );
}

export function getAllTags(locale: BlogLocale = DEFAULT_BLOG_LOCALE): string[] {
  const tagSet = new Set<string>();

  getAllPosts(locale).forEach((p) =>
    p.frontmatter.tags?.forEach((t) => tagSet.add(t))
  );

  return Array.from(tagSet).sort();
}

export function getTopTags(
  n: number,
  locale: BlogLocale = DEFAULT_BLOG_LOCALE
): string[] {
  const counts = new Map<string, number>();

  getAllPosts(locale).forEach((p) =>
    p.frontmatter.tags?.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
  );

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([tag]) => tag);
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const result: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+?)(?:\s*\{[^}]*\})?\s*$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    result.push({
      level: match[1].length,
      text: match[2].trim(),
      id: headingToId(match[2].trim()),
    });
  }
  return result;
}
