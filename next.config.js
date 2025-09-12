/** @type {import('next').NextConfig} */

let assetPrefix = '';
let basePath = '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
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