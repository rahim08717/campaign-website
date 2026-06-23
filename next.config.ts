import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // বিল্ড করার সময় টাইপস্ক্রিপ্টের ছোটখাটো ভুল বা এরর ইগনোর করবে
    ignoreBuildErrors: true,
  },
  eslint: {
    // বিল্ড করার সময় এসলিন্ট (ESLint) এরর ইগনোর করবে
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;