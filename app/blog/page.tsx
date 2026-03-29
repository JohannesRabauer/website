import { getAllPosts, getTopTags } from '@/lib/posts';
import BlogPageClient from '@/app/components/BlogPageClient';
import Link from 'next/link';

export const metadata = {
  title: 'Live-Coding Learnings: Modern Java with AI | Johannes Rabauer',
  description: 'Summarizing, Concluding and general reflections on my live-coding sessions.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getTopTags(5);

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* Page header */}
      <div className="mb-14">
        <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl text-blog-purple leading-tight mb-5">
          Live-Coding Learnings: Modern Java with AI
        </h1>
        <p className="text-blog-muted text-lg max-w-xl leading-relaxed">
          Summarizing, Concluding and general reflections on my live-coding sessions. I share insights, challenges, and lessons learned from building real-world projects in Java and beyond.
        </p>

        {/* Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-blog-purple/30 via-blog-green/30 to-transparent" />
      </div>

      {/* Posts count */}
      {posts.length > 0 && (
        <p className="text-sm text-blog-muted mb-6">
          {posts.length} post{posts.length !== 1 ? 's' : ''} published
        </p>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-6">✍️</p>
          <p className="text-blog-muted text-lg">
            No posts yet — check back soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-blog-purple underline hover:no-underline text-sm"
          >
            Back to portfolio
          </Link>
        </div>
      ) : (
        <BlogPageClient posts={posts} tags={tags} />
      )}
    </main>
  );
}
