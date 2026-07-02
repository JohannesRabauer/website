import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { FiArrowLeft, FiClock, FiExternalLink } from 'react-icons/fi';
import ProsCons from '@/app/components/ProsCons';
import MethodClusterDiagram from '@/app/components/MethodClusterDiagram';
import MethodIcon from '@/app/components/MethodIcon';
import MethodPhasesDiagram from '@/app/components/MethodPhasesDiagram';
import MethodSyncDiagram from '@/app/components/MethodSyncDiagram';
import MethodTracksDiagram from '@/app/components/MethodTracksDiagram';
import MethodViseDiagram from '@/app/components/MethodViseDiagram';
import WhereToUse from '@/app/components/WhereToUse';
import MethodFlow from '@/app/components/MethodFlow';
import MermaidDiagram from '@/app/components/MermaidDiagram';
import ZoomableImage from '@/app/components/ZoomableImage';
import MethodTableOfContents from '@/app/components/MethodTableOfContents';
import MethodShareButton from '@/app/components/MethodShareButton';
import type { MethodDiagram } from '@/lib/methods';
import { extractHeadings, getMethodBySlug } from '@/lib/methods';
import {
  METHODS_COPY,
  getMethodPath,
  getMethodsListingPath,
  getRelatedBlogPath,
} from '@/lib/methods-i18n';

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

function DiagramRenderer({ diagram }: { diagram?: MethodDiagram }) {
  if (!diagram) {
    return null;
  }

  switch (diagram.type) {
    case 'flow':
      return <MethodFlow steps={diagram.steps} variant={diagram.variant} title={diagram.title} />;
    case 'phases':
      return <MethodPhasesDiagram phases={diagram.phases} title={diagram.title} />;
    case 'cluster':
      return (
        <MethodClusterDiagram
          anchor={diagram.anchor}
          anchors={diagram.anchors}
          contractLabel={diagram.contractLabel}
          contractText={diagram.contractText}
          title={diagram.title}
        />
      );
    case 'tracks':
      return <MethodTracksDiagram tracks={diagram.tracks} title={diagram.title} />;
    case 'sync':
      return (
        <MethodSyncDiagram
          title={diagram.title}
          specLabel={diagram.specLabel}
          codeLabel={diagram.codeLabel}
          specSummary={diagram.specSummary}
          codeSummary={diagram.codeSummary}
          cycleLabel={diagram.cycleLabel}
          notes={diagram.notes}
        />
      );
    case 'vise':
      return (
        <MethodViseDiagram
          title={diagram.title}
          specLabel={diagram.specLabel}
          agentLabel={diagram.agentLabel}
          gates={diagram.gates}
          highlightLabel={diagram.highlightLabel}
        />
      );
    default:
      return null;
  }
}

interface Props {
  slug: string;
}

export default function MethodContent({ slug }: Props) {
  const copy = METHODS_COPY.detail;
  const method = getMethodBySlug(slug);

  if (!method) {
    return null;
  }

  const {
    title,
    tagline,
    category,
    icon,
    maturity,
    diagram,
    pros,
    cons,
    whereToUse,
    sources,
    relatedPosts,
  } = method.frontmatter;
  const headings = extractHeadings(method.content);

  const hasProsCons = (pros && pros.length > 0) || (cons && cons.length > 0);
  const hasWhereToUse = whereToUse && whereToUse.best && whereToUse.best.length > 0;

  const components = {
    MermaidDiagram,
    table: MdxTable,
    img: (props: React.ComponentPropsWithoutRef<'img'>) => <ZoomableImage {...props} />,
    ZoomableImage: (props: React.ComponentPropsWithoutRef<'img'>) => <ZoomableImage {...props} />,
  };

  return (
    <div id="main-content" lang={METHODS_COPY.htmlLang} className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <Link
          href={getMethodsListingPath()}
          className="inline-flex items-center gap-1.5 text-sm text-method-muted transition-colors hover:text-method-accent"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          {copy.backToOverview}
        </Link>
      </div>

      <div className="flex gap-16">
        <article className="min-w-0 flex-1 self-start">
          {/* Hero */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-method-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-method-accent">
              {category}
            </span>
            {maturity && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-method-border bg-white/70 px-3 py-1 text-[11px] font-medium text-method-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-method-accent2" aria-hidden="true" />
                {copy.maturityLabel}: {maturity}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {icon && (
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-method-border bg-white/80 text-method-accent shadow-[0_10px_28px_-14px_rgba(79,70,229,0.35)]">
                <MethodIcon name={icon} className="h-7 w-7" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.08] tracking-tight text-method-ink md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-method-muted">{tagline}</p>
            </div>
          </div>

          <div className="mb-10 mt-6 flex flex-wrap items-center gap-4 border-b border-method-border/70 pb-6 text-sm text-method-muted">
            <span className="flex items-center gap-1.5">
              <FiClock className="h-3.5 w-3.5 flex-shrink-0" />
              {copy.readingTime(method.readingMinutes)}
            </span>
            <MethodShareButton path={getMethodPath(slug)} />
          </div>

          <div className="prose prose-method prose-lg max-w-none">
            <MDXRemote source={method.content} options={mdxOptions} components={components} />
          </div>

          <DiagramRenderer diagram={diagram} />

          {hasProsCons && (
            <div className="prose prose-method prose-lg max-w-none">
              <ProsCons
                pros={pros ?? []}
                cons={cons ?? []}
                prosTitle={copy.prosTitle}
                consTitle={copy.consTitle}
              />
            </div>
          )}

          {hasWhereToUse && (
            <div className="prose prose-method prose-lg max-w-none">
              <WhereToUse
                best={whereToUse!.best}
                avoid={whereToUse!.avoid}
                title={copy.whereToUseTitle}
                bestTitle={copy.bestForTitle}
                avoidTitle={copy.avoidWhenTitle}
              />
            </div>
          )}

          {/* Sources */}
          {sources && sources.length > 0 && (
            <section className="mt-12 border-t border-method-border/70 pt-6">
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
                {copy.sources}
              </h2>
              <ul className="flex flex-col gap-2">
                {sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-method-accent transition-colors hover:text-method-accent3"
                    >
                      <FiExternalLink className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related blog reading */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.14em] text-method-muted">
                {copy.relatedReading}
              </h2>
              <div className="flex flex-col gap-2">
                {relatedPosts.map((postSlug) => (
                  <Link
                    key={postSlug}
                    href={getRelatedBlogPath(postSlug)}
                    className="method-gradient-border group inline-flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-method-ink transition-shadow hover:shadow-[0_8px_24px_-10px_rgba(79,70,229,0.4)]"
                  >
                    <span className="capitalize">{postSlug.replace(/-/g, ' ')}</span>
                    <FiExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-method-accent" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 border-t border-method-border/70 pt-6">
            <MethodShareButton path={getMethodPath(slug)} />
          </div>
        </article>

        {headings.length > 0 && (
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <MethodTableOfContents
                headings={headings}
                title={copy.onThisPage}
                ariaLabel={copy.tableOfContentsAriaLabel}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
