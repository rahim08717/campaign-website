import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // এই লাইনটি আপনার প্রোজেক্টকে Netlify-এর জন্য রেডি করবে
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;