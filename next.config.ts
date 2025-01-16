import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        { hostname: 'images.app.goo.gl' },
        { hostname: 'res.cloudinary.com' },
      
    ],
},
};

export default nextConfig;


