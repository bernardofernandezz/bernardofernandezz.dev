import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No fingerprinting header. (CSP/HSTS live at the nginx layer —
  // see deploy/nginx.conf — because Next would need unsafe-inline
  // for its runtime scripts, which would weaken the policy.)
  poweredByHeader: false,
  experimental: {
    // Multiple root layouts (en / pt-br) mean no composed 404 exists —
    // this provides one for URLs that match no route at all.
    globalNotFound: true,
  },
};

export default nextConfig;
