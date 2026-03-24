import Link from 'next/link';
import YoutubeEmbed from '@/app/components/YoutubeEmbed';

export const metadata = {
  title: 'Sample | Blog',
  description: 'Minimal sample page with video embed.',
};

export default function SamplePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="text-sm text-blog-muted hover:text-blog-purple transition-colors"
      >
        ← Back to blog
      </Link>

      <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-4xl text-blog-purple">
        Sample Session
      </h1>

      <p className="mt-3 text-blog-muted">
        Quick sample page for one live coding recording.
      </p>

      <YoutubeEmbed
        videoId="LpGguXsR93A"
        title="Live coding sample session"
      />
    </main>
  );
}
