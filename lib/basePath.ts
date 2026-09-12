/**
 * Prepends the site's configured basePath (empty on production, "/preview" on
 * the preview deployment) to a root-relative path. Next.js only does this
 * automatically for next/image and next/link; a plain <img src="/blog/x.png">
 * built from a hardcoded string in MDX content needs it applied by hand, or
 * the image 404s once the site is served from a non-root path.
 *
 * Absolute URLs (http/https) and empty values pass through unchanged.
 */
export function withBasePath(path: string | undefined): string | undefined {
  if (!path) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // absolute URL, e.g. https://...
  if (!path.startsWith('/')) return path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
