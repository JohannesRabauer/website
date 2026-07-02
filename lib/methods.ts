import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { extractHeadings, headingToId, type Heading } from '@/lib/posts';

export type { Heading };
export { extractHeadings, headingToId };

const METHODS_DIR = path.join(process.cwd(), 'content', 'methods');

export interface MethodSource {
  label: string;
  href: string;
}

export type MethodIconName = 'layers' | 'anchor' | 'users' | 'refresh-cw' | 'archive' | 'sliders';

export interface MethodFlowStep {
  label: string;
  description?: string;
}

export interface MethodFlowDiagram {
  type: 'flow';
  variant?: 'linear' | 'loop';
  title?: string;
  steps: MethodFlowStep[];
}

export interface MethodPhasesDiagram {
  type: 'phases';
  title?: string;
  phases: {
    label: string;
    summary: string;
    artifacts: string[];
  }[];
}

export interface MethodClusterDiagram {
  type: 'cluster';
  title?: string;
  anchor: string;
  anchors: {
    label: string;
    note: string;
  }[];
  contractLabel?: string;
  contractText?: string;
}

export interface MethodTracksDiagram {
  type: 'tracks';
  title?: string;
  tracks: {
    key: string;
    label: string;
    summary: string;
    bestFor: string;
    steps: string[];
  }[];
}

export interface MethodSyncDiagram {
  type: 'sync';
  title?: string;
  specLabel: string;
  codeLabel: string;
  specSummary: string;
  codeSummary: string;
  cycleLabel?: string;
  notes?: string[];
}

export interface MethodViseDiagram {
  type: 'vise';
  title?: string;
  specLabel: string;
  agentLabel: string;
  gates: string[];
  highlightLabel?: string;
}

export type MethodDiagram =
  | MethodFlowDiagram
  | MethodPhasesDiagram
  | MethodClusterDiagram
  | MethodTracksDiagram
  | MethodSyncDiagram
  | MethodViseDiagram;

export interface MethodWhereToUse {
  best: string[];
  avoid?: string[];
}

export interface MethodCodeStep {
  title: string;
  goal?: string;
  java: string;
  agnostic?: string;
  check?: string;
}

export interface MethodCodeExamples {
  title?: string;
  subtitle?: string;
  /** When true, a "returns to step 1" loop indicator is shown after the last step. */
  loops?: boolean;
  steps: MethodCodeStep[];
}

export interface MethodInventor {
  name: string;
  /** GitHub username — used for the avatar image and profile link. */
  github?: string;
  /** Fallback URL when no GitHub handle is available. */
  url?: string;
  /** Custom avatar URL — overrides the GitHub-derived one when set. */
  avatar?: string;
}

export interface MethodFrontmatter {
  title: string;
  tagline: string;
  category: string;
  icon?: MethodIconName;
  maturity?: string;
  order?: number;
  /** Visual explanation rendered above the prose blocks. */
  diagram?: MethodDiagram;
  /** Advantages list. */
  pros?: string[];
  /** Drawbacks list. */
  cons?: string[];
  /** Best-for / avoid-when guidance. */
  whereToUse?: MethodWhereToUse;
  /** Optional swipeable minimal code walkthrough. */
  codeExamples?: MethodCodeExamples;
  /** Person or team who introduced the method. Shown on cards when available. */
  inventor?: MethodInventor;
  sources?: MethodSource[];
  /** Slugs of related English blog posts to cross-link. */
  relatedPosts?: string[];
  draft?: boolean;
}

export interface Method {
  slug: string;
  frontmatter: MethodFrontmatter;
  readingMinutes: number;
  content: string;
}

export type MethodMeta = Omit<Method, 'content'>;

const isProd = () => process.env.NODE_ENV === 'production';

function parseMethod(filename: string): Method {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(METHODS_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  const readingStats = readingTime(content);

  return {
    slug,
    frontmatter: data as MethodFrontmatter,
    readingMinutes: Math.max(1, Math.ceil(readingStats.minutes)),
    content,
  };
}

export function getAllMethods(): MethodMeta[] {
  if (!fs.existsSync(METHODS_DIR)) return [];

  return fs
    .readdirSync(METHODS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parseMethod)
    .filter((m) => !(isProd() && m.frontmatter.draft))
    .sort((a, b) => {
      const orderA = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    })
    .map((method) => {
      const { content, ...meta } = method;
      void content;
      return meta;
    });
}

export function getMethodBySlug(slug: string): Method | null {
  const filePath = path.join(METHODS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const method = parseMethod(`${slug}.mdx`);

  if (isProd() && method.frontmatter.draft) return null;

  return method;
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  getAllMethods().forEach((m) => {
    if (m.frontmatter.category) set.add(m.frontmatter.category);
  });
  return Array.from(set).sort();
}
