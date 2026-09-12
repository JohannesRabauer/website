/** @type {import('next').NextConfig} */

// Allows a preview deployment (e.g. rabauer.dev/preview) to be built with a
// non-root base path without affecting the normal production build.
const previewBasePath = process.env.NEXT_BASE_PATH || '';

let assetPrefix = previewBasePath;
let basePath = previewBasePath;

const nextConfig = {
  output: 'export',
  eslint: {
    // ESLint runs separately via `npm run lint`; skip during build to avoid
    // the known eslint-config-next circular-reference issue with ESLint 9.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  // This setting helps with static exports
  trailingSlash: true,
  // Next.js only rewrites basePath into next/image and next/link automatically.
  // Components that build a plain <img src="/blog/...">/<a href="/..."> from a
  // hardcoded root-relative string (MDX content images, in particular) need to
  // prepend it themselves — see lib/basePath.ts.
  env: {
    NEXT_PUBLIC_BASE_PATH: previewBasePath,
  },
};

module.exports = nextConfig;