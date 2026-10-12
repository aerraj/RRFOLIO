import { existsSync } from 'node:fs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_HAS_SOUNDTRACK: existsSync('public/audio/soundtrack.mp3') ? 'true' : 'false' },
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true },
  trailingSlash: true
};
export default nextConfig;
