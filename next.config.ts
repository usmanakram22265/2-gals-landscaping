import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile exists in the home dir).
  outputFileTracingRoot: path.join(__dirname),
  // Smaller production bundles and removed source maps for faster delivery.
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    // Serve AVIF first (≈20-30% smaller than WebP), fall back to WebP.
    formats: ["image/avif", "image/webp"],
    // Cache the optimizer output aggressively — sources are static.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
