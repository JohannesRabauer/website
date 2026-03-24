'use client';

import { usePathname } from 'next/navigation';

/**
 * Global floating controls shown on non-blog pages only.
 */
export default function FloatingSiteControls() {
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith('/blog');

  if (isBlogRoute) {
    return null;
  }

  return (
    <a href="/" className="fixed top-4 left-4 z-50" aria-label="Back to home">
      <img
        src="/Logo_round.png"
        alt="JR Logo"
        width={40}
        height={40}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
      />
    </a>
  );
}
