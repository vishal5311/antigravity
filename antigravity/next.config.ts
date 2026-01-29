import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly for page refreshes
  trailingSlash: true,
};

export default nextConfig;
