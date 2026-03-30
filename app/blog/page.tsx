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
  const headingFontStyle = {
    fontFamily: 'var(--font-heading), "Space Grotesk", "Space Grotesk Fallback", system-ui, sans-serif',
  };

  return (
    <main id="main-content">
      {/* Banner hero with background image */}
      <div className="relative w-full h-40 sm:h-44 md:h-56 lg:h-[270px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label="Blog header illustration"
          style={{ backgroundImage: "url('/blog/blog_banner.png')" }}
        />
        {/* Fading edges into page background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(248,247,244,0.5) 0%, transparent 25%, transparent 65%, #F8F7F4 100%),
              linear-gradient(to right, #F8F7F4 0%, transparent 15%, transparent 85%, #F8F7F4 100%)
            `,
          }}
        />
        {/* Radial glow behind text for readability */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-[80%] h-[80%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
            }}
          />
        </div>
        {/* Centered title */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blog-purple font-bold leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
            style={headingFontStyle}
          >
            Live-Coding Learnings
          </h1>
          <p
            className="font-[family-name:var(--font-heading)] text-lg sm:text-xl md:text-2xl lg:text-3xl text-blog-purple/90 mt-1.5 md:mt-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
            style={headingFontStyle}
          >
            Modern Java with AI
          </p>
        </div>
      </div>

      {/* Content below banner */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Description */}
        <p className="text-blog-muted text-lg max-w-xl leading-relaxed mb-4">
          Summarizing, Concluding and general reflections on my live-coding sessions. I share insights, challenges, and lessons learned from building real-world projects in Java and beyond.
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blog-purple/30 via-blog-green/30 to-transparent mb-10" />

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
              Back to Home
            </Link>
          </div>
        ) : (
          <BlogPageClient posts={posts} tags={tags} />
        )}
      </div>
    </main>
  );
}
