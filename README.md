# Conexión Vida

Sitio web de la iglesia Conexión Vida (Querétaro y Celaya). Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Contenido editable (`src/data/`)

| Archivo | Qué contiene |
| --- | --- |
| `site.ts` | Navegación, imágenes (Unsplash), datos de generosidad (CLABE, enlace de donación) |
| `campuses.ts` | Horarios, dirección, Google Maps, Instagram, badges, futuras sedes |
| `faq.ts` | Preguntas de "¿Es tu primera vez?" |
| `messages.ts` | Serie actual (`youtubeId`) y últimas predicaciones |
| `nextSteps.ts` | Camino de fe (6 pasos) |
| `groups.ts` | Grupos pequeños (ejemplos) |
| `kids.ts` | Wuambaland, Up Street y pilares |

Los valores marcados `EDITAR` son datos de ejemplo que deben reemplazarse antes de publicar.

## Variables de entorno

Copia `.env.example` a `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio.
- `NEXT_PUBLIC_CONTACT_EMAIL`: correo que recibe el formulario de oración/grupos (usa `mailto:`, sin backend).

## Deploy

Importa el repositorio en Vercel; no requiere configuración adicional.
