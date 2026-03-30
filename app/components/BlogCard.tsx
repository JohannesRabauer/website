import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiCalendar, FiYoutube } from 'react-icons/fi';
import type { PostMeta } from '@/lib/posts';

export default function BlogCard({ post }: { post: PostMeta }) {
  const { slug, frontmatter, readingTime, coSpeakerName } = post;
  const { title, date, summary, tags, youtubeId } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="h-full bg-blog-surface rounded-2xl border border-blog-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
        {/* Thumbnail or gradient accent bar */}
        {youtubeId ? (
          <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden">
            <Image
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-[3px] bg-gradient-to-r from-blog-purple via-blog-purple-mid to-blog-green flex-shrink-0" />
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-blog-muted mb-3">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Published: </span>{formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Reading time: </span>{readingTime}
            </span>
            {youtubeId && (
              <span className="flex items-center gap-1.5 text-red-500 font-medium">
                <FiYoutube className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                Video
              </span>
            )}
          </div>

          {/* Title + co-speaker badge */}
          <div className="mb-2">
            <h2 className="font-heading text-xl text-blog-text group-hover:text-blog-purple transition-colors duration-200 leading-snug">
              {title}
            </h2>
            {coSpeakerName && (
              <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full border border-blog-green/40 bg-blog-green-light text-blog-green font-medium">
                with {coSpeakerName}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-sm text-blog-muted flex-1 line-clamp-3 mb-5 leading-relaxed">
            {summary}
          </p>

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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
        </div>
      </article>
    </Link>
  );
}
