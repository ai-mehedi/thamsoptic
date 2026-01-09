import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Allow dev server access from external IPs
  allowedDevOrigins: [
    'http://185.5.36.10:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
};

export default nextConfig;
