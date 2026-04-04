import Link from 'next/link';

interface LegalLinksProps {
  variant?: 'dark' | 'light';
  className?: string;
  linkClassName?: string;
}

export default function LegalLinks({
  variant = 'dark',
  className = '',
  linkClassName = '',
}: LegalLinksProps) {
  const defaultLinkClassName =
    variant === 'light'
      ? 'text-blog-muted hover:text-blog-purple'
      : 'text-white/75 hover:text-cyber-green';

  return (
    <nav
      aria-label="Legal navigation"
      className={`flex items-center gap-4 text-xs sm:text-sm ${className}`.trim()}
    >
      <Link
        href="/impressum"
        className={`transition-colors ${defaultLinkClassName} ${linkClassName}`.trim()}
      >
        Impressum
      </Link>
      <Link
        href="/datenschutz"
        className={`transition-colors ${defaultLinkClassName} ${linkClassName}`.trim()}
      >
        Datenschutz
      </Link>
    </nav>
  );
}
