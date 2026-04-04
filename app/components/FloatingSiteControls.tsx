'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Global floating controls shown on non-blog pages only.
 */
export default function FloatingSiteControls() {
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith('/blog') || /^\/(en|de)\/blog(?:\/|$)/.test(pathname ?? '');

  if (isBlogRoute) {
    return null;
  }

  return (
    <>
      <Link href="/" className="fixed top-4 left-4 z-50" aria-label="Back to home">
        <Image
          src="/Logo_round.png"
          alt="JR Logo"
          width={40}
          height={40}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
        />
      </Link>
    </>
  );
}
