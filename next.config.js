/** @type {import('next').NextConfig} */

let assetPrefix = '';
let basePath = '';

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
};

module.exports = nextConfig;