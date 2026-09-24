import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholders de Unsplash; reemplazar por fotos oficiales cuando estén listas.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
