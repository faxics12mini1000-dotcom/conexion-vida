import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Solo imágenes locales (/public): sin remotePatterns a propósito.
    // Las fotos van en /public/photos y se asignan en src/data/site.ts.
  },
};

export default nextConfig;
