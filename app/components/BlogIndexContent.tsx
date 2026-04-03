import Link from 'next/link';
import BlogPageClient from '@/app/components/BlogPageClient';
import { getAllPosts, getTopTags } from '@/lib/posts';
import { type BlogLocale, getBlogDictionary } from '@/lib/blog-i18n';

interface Props {
  locale: BlogLocale;
}

export default function BlogIndexContent({ locale }: Props) {
  const copy = getBlogDictionary(locale);
  const posts = getAllPosts(locale);
  const tags = getTopTags(5, locale);
  const headingFontStyle = {
    fontFamily:
      'var(--font-heading), "Space Grotesk", "Space Grotesk Fallback", system-ui, sans-serif',
  };

  return (
    <main id="main-content" lang={copy.htmlLang}>
      <div className="relative w-full h-40 sm:h-44 md:h-56 lg:h-[270px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label={copy.listing.bannerAriaLabel}
          style={{ backgroundImage: "url('/blog/blog_banner.png')" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(248,247,244,0.5) 0%, transparent 25%, transparent 65%, #F8F7F4 100%),
              linear-gradient(to right, #F8F7F4 0%, transparent 15%, transparent 85%, #F8F7F4 100%)
            `,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[80%] h-[80%] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blog-purple font-bold leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
            style={headingFontStyle}
          >
            {copy.listing.title}
          </h1>
          <p
            className="font-[family-name:var(--font-heading)] text-lg sm:text-xl md:text-2xl lg:text-3xl text-blog-purple/90 mt-1.5 md:mt-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
            style={headingFontStyle}
          >
            {copy.listing.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-blog-muted text-lg leading-relaxed mb-4">
          {copy.listing.description}
        </p>

        <div className="h-px bg-gradient-to-r from-blog-purple/30 via-blog-green/30 to-transparent mb-10" />

        {posts.length > 0 && (
          <p className="text-sm text-blog-muted mb-6">
            {copy.listing.postsPublished(posts.length)}
          </p>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-6">✍️</p>
            <p className="text-blog-muted text-lg">{copy.listing.noPostsYet}</p>
            <Link
              href="/"
              className="mt-6 inline-block text-blog-purple underline hover:no-underline text-sm"
            >
              {copy.listing.backToHome}
            </Link>
          </div>
        ) : (
          <BlogPageClient locale={locale} posts={posts} tags={tags} />
        )}
      </div>
    </main>
  );
}
