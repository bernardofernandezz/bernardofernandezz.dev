import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Multiple root layouts (en / pt-br) mean no composed 404 exists —
    // this provides one for URLs that match no route at all.
    globalNotFound: true,
  },
};

export default nextConfig;
