import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Solo imágenes locales (/public). Si se reactivan las secciones ocultas que
    // usan stock de Unsplash, hay que reemplazarlas por fotos reales antes.
  },
};

export default nextConfig;
