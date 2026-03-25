import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

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
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
  content: string;
}

export type PostMeta = Omit<Post, 'content'>;

/** Generate a URL-safe ID from heading text — matches rehype-slug output for typical headings. */
export function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    readingTime: readingTime(content).text,
    content,
  };
}

const isProd = () => process.env.NODE_ENV === 'production';

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parsePost)
    .filter((p) => !(isProd() && p.frontmatter.draft))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const post = parsePost(`${slug}.mdx`);
  if (isProd() && post.frontmatter.draft) return null;
  return post;
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllPosts().forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const result: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+?)(?:\s*\{[^}]*\})?\s*$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    result.push({
      level: match[1].length,
      text: match[2].trim(),
      id: headingToId(match[2].trim()),
    });
  }
  return result;
}
