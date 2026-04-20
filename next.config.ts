import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ISR revalidation via on-demand webhook from the dashboard
  // Images from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
