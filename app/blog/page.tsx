import { getAllPosts, getAllTags } from '@/lib/posts';
import BlogPageClient from '@/app/components/BlogPageClient';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Johannes Rabauer',
  description: 'Live coding sessions, Java deep-dives, and engineering insights.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* Page header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-blog-green text-sm font-medium mb-4">
          <span className="w-6 h-px bg-blog-green inline-block" />
          Engineering Notes
        </div>
        <h1 className="font-[family-name:var(--font-dm-serif)] text-5xl md:text-6xl text-blog-purple leading-tight mb-5">
          The Blog
        </h1>
        <p className="text-blog-muted text-lg max-w-xl leading-relaxed">
          Live coding sessions, Java deep-dives, cloud-native patterns, and
          occasional thoughts on building software with craft.
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
