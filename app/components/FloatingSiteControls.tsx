'use client';

import { usePathname } from 'next/navigation';
import LegalLinks from './LegalLinks';

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
    <>
      <a href="/" className="fixed top-4 left-4 z-50" aria-label="Back to home">
        <img
          src="/Logo_round.png"
          alt="JR Logo"
          width={40}
          height={40}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
        />
      </a>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-md">
        <LegalLinks className="gap-3 sm:gap-4" />
      </div>
    </>
  );
}
