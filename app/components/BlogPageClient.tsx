'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { FiSearch, FiX } from 'react-icons/fi';
import BlogCard from './BlogCard';
import type { PostMeta } from '@/lib/posts';

interface Props {
  posts: PostMeta[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: 'frontmatter.title', weight: 2 },
          { name: 'frontmatter.summary', weight: 1 },
          { name: 'frontmatter.tags', weight: 1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [posts]
  );

  const filtered = useMemo(() => {
    let result: PostMeta[] = query
      ? fuse.search(query).map((r) => r.item)
      : posts;
    if (selectedTag) {
      result = result.filter((p) =>
        p.frontmatter.tags?.includes(selectedTag)
      );
    }
    return result;
  }, [posts, query, selectedTag, fuse]);

  const toggleTag = (tag: string) =>
    setSelectedTag((prev) => (prev === tag ? null : tag));

  return (
    <div>
      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blog-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-blog-border bg-blog-surface text-blog-text text-sm placeholder:text-blog-muted focus:outline-none focus:ring-2 focus:ring-blog-purple/25 focus:border-blog-purple transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blog-muted hover:text-blog-text"
              aria-label="Clear search"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
              !selectedTag
                ? 'bg-blog-purple text-white shadow-sm'
                : 'bg-blog-purple-light text-blog-purple hover:bg-blog-purple hover:text-white'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                selectedTag === tag
                  ? 'bg-blog-green text-white shadow-sm'
                  : 'bg-blog-green-light text-blog-green hover:bg-blog-green hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(query || selectedTag) && (
        <p className="text-sm text-blog-muted mb-6">
          {filtered.length === 0
            ? 'No posts found.'
            : `${filtered.length} post${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* Post grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-blog-muted">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-medium">No posts match your search.</p>
          <button
            onClick={() => { setQuery(''); setSelectedTag(null); }}
            className="mt-4 text-sm text-blog-purple underline hover:no-underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
