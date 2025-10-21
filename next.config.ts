import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Ensure Next uses this app directory as the workspace root
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Use domains for Cloudinary
    domains: ['res.cloudinary.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable optimization for Cloudinary images since they're already optimized
    unoptimized: true,
    // Configure minimum cache TTL
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
