import { getAllPosts, getPostBySlug, extractHeadings } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import YoutubeEmbed from '@/app/components/YoutubeEmbed';
import GiscusComments from '@/app/components/GiscusComments';
import TableOfContents from '@/app/components/TableOfContents';
import Link from 'next/link';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.summary,
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeHighlight,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any[],
  },
};

/** MDX component overrides — YoutubeEmbed can be used inline in posts */
const components = { YoutubeEmbed };

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, date, youtubeId, tags, summary } = post.frontmatter;
  const headings = extractHeadings(post.content);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-blog-muted hover:text-blog-purple transition-colors mb-10"
      >
        <FiArrowLeft className="w-3.5 h-3.5" />
        All posts
      </Link>

      <div className="flex gap-16 items-start">
        {/* ── Main article ── */}
        <article className="flex-1 min-w-0">
          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-blog-purple-light text-blog-purple font-medium tracking-wide"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-[family-name:var(--font-dm-serif)] text-4xl md:text-5xl lg:text-6xl text-blog-text leading-[1.1] mb-5">
            {title}
          </h1>

          {/* Summary */}
          <p className="text-blog-muted text-lg leading-relaxed mb-6 max-w-2xl">
            {summary}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-blog-muted pb-8 mb-8 border-b border-blog-border">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
              {post.readingTime}
            </span>
          </div>

          {/* YouTube embed — featured video before prose */}
          {youtubeId && (
            <YoutubeEmbed videoId={youtubeId} title={title} />
          )}

          {/* MDX prose content */}
          <div className="prose prose-blog prose-lg max-w-none">
            <MDXRemote
              source={post.content}
              options={mdxOptions}
              components={components}
            />
          </div>

          {/* Comments */}
          <GiscusComments />
        </article>

        {/* ── Sticky TOC ── */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
