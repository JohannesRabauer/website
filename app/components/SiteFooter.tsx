'use client';

import { usePathname } from 'next/navigation';
import LegalLinks from './LegalLinks';

function isBlogPath(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  return /^\/(blog|en\/blog|de\/blog)(?:\/|$)/.test(pathname);
}

function isMethodsPath(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  return /^\/methods(?:\/|$)/.test(pathname);
}

export default function SiteFooter() {
  const pathname = usePathname();

  if (isBlogPath(pathname) || isMethodsPath(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-cyber-purple/20 bg-black/15 backdrop-blur-sm px-4 py-5 text-[11px] text-white/40 sm:px-6 sm:text-xs">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <LegalLinks
          className="gap-3"
          linkClassName="text-white/45 hover:text-white/70"
        />
      </div>
    </footer>
  );
}