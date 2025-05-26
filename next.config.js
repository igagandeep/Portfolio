/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',   // match ANY hostname
        port: '',         
        pathname: '/**',   // match ANY path
      },
    ],
  },
};

module.exports = nextConfig;

{ images: { unoptimized: true } }
