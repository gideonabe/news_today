import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',         // leave this empty
      pathname: '/**',  // allow all Unsplash images
    },],
  }
};

export default nextConfig;
