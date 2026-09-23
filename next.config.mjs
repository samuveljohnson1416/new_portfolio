/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully client-rendered site: export static HTML so it deploys to any static host.
  output: 'export',
  // Dev uses its own build dir so a concurrent `next build` can't wipe .next under it.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};

export default nextConfig;
