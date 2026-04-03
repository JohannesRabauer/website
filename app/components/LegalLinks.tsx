import Link from 'next/link';

interface LegalLinksProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export default function LegalLinks({
  variant = 'dark',
  className = '',
}: LegalLinksProps) {
  const linkClassName =
    variant === 'light'
      ? 'text-blog-muted hover:text-blog-purple'
      : 'text-white/75 hover:text-cyber-green';

  return (
    <nav
      aria-label="Legal navigation"
      className={`flex items-center gap-4 text-xs sm:text-sm ${className}`.trim()}
    >
      <Link href="/impressum" className={`transition-colors ${linkClassName}`}>
        Impressum
      </Link>
      <Link href="/datenschutz" className={`transition-colors ${linkClassName}`}>
        Datenschutz
      </Link>
    </nav>
  );
}
