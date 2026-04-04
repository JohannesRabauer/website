import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import YoutubeEmbed from '@/app/components/YoutubeEmbed';
import GiscusComments from '@/app/components/GiscusComments';
import TableOfContents from '@/app/components/TableOfContents';
import TimestampList from '@/app/components/TimestampList';
import CoSpeakerCard from '@/app/components/CoSpeakerCard';
import MermaidDiagram from '@/app/components/MermaidDiagram';
import GraphRagDiagram from '@/app/components/GraphRagDiagram';
import MainRepositoryLink from '@/app/components/MainRepositoryLink';
import ShareButton from '@/app/components/ShareButton';
import BlogLanguageSwitcher from '@/app/components/BlogLanguageSwitcher';
import {
  extractHeadings,
  getAvailablePostLocales,
  getPostBySlug,
} from '@/lib/posts';
import {
  formatBlogDate,
  formatReadingTime,
  type BlogLocale,
  getBlogDictionary,
  getBlogListingPath,
  getBlogPostPath,
} from '@/lib/blog-i18n';

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

function MdxTable(props: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  );
}

interface Props {
  locale: BlogLocale;
  slug: string;
}

export default function BlogPostContent({ locale, slug }: Props) {
  const copy = getBlogDictionary(locale);
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return null;
  }

  const { title, date, youtubeId, tags, summary, mainRepository } = post.frontmatter;
  const headings = extractHeadings(post.content);
  const availableLocales = getAvailablePostLocales(slug);
  const languageHrefs = Object.fromEntries(
    availableLocales.map((availableLocale) => [
      availableLocale,
      getBlogPostPath(availableLocale, slug),
    ])
  ) as Partial<Record<BlogLocale, string>>;

  const components = {
    YoutubeEmbed,
    TimestampList: (props: React.ComponentProps<typeof TimestampList>) => (
      <TimestampList {...props} locale={locale} title={props.title ?? copy.post.sessionTimeline} />
    ),
    CoSpeakerCard: (props: React.ComponentProps<typeof CoSpeakerCard>) => (
      <CoSpeakerCard {...props} locale={locale} />
    ),
    MermaidDiagram,
    GraphRagDiagram,
    MainRepositoryLink: (props: React.ComponentProps<typeof MainRepositoryLink>) => (
      <MainRepositoryLink {...props} locale={locale} />
    ),
    table: MdxTable,
  };

  return (
    <div id="main-content" lang={copy.htmlLang} className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <Link
          href={getBlogListingPath(locale)}
          className="inline-flex items-center gap-1.5 text-sm text-blog-muted hover:text-blog-purple transition-colors"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          {copy.post.allPosts}
        </Link>

        <BlogLanguageSwitcher
          currentLocale={locale}
          hrefs={languageHrefs}
          label={copy.localeSwitcherLabel}
          unavailableLabel={copy.post.translationUnavailable}
        />
      </div>

      <div className="flex gap-16 items-start">
        <article className="flex-1 min-w-0">
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

          <div className="mb-5">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-blog-text leading-[1.1]">
              {title}
            </h1>
            {post.coSpeakerName && (
              <span className="inline-block mt-3 text-sm px-3 py-1 rounded-full border border-blog-green/40 bg-blog-green-light text-blog-green font-medium">
                {copy.post.withCoSpeaker(post.coSpeakerName)}
              </span>
            )}
          </div>

          <p className="text-blog-muted text-lg leading-relaxed mb-6 max-w-2xl">
            {summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-blog-muted pb-8 mb-8 border-b border-blog-border">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="sr-only">{copy.post.published}: </span>
              {formatBlogDate(locale, date)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="sr-only">{copy.post.readingTimeLabel}: </span>
              {formatReadingTime(locale, post.readingMinutes)}
            </span>
            <ShareButton locale={locale} path={getBlogPostPath(locale, slug)} variant="meta" />
          </div>

          {youtubeId && <YoutubeEmbed videoId={youtubeId} title={title} locale={locale} />}

          <MainRepositoryLink href={mainRepository} locale={locale} />

          {youtubeId && post.frontmatter.timestamps?.length ? (
            <TimestampList
              videoId={youtubeId}
              items={post.frontmatter.timestamps}
              locale={locale}
              title={copy.post.sessionTimeline}
            />
          ) : null}

          <div className="prose prose-blog prose-lg max-w-none">
            <MDXRemote
              source={post.content}
              options={mdxOptions}
              components={components}
            />
          </div>

          <ShareButton locale={locale} path={getBlogPostPath(locale, slug)} variant="footer" />

          <GiscusComments locale={locale} />
        </article>

        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents
                headings={headings}
                title={copy.post.onThisPage}
                ariaLabel={copy.post.tableOfContentsAriaLabel}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
