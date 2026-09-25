# Conexión Vida

Sitio web de la iglesia Conexión Vida (Querétaro y Celaya). Next.js (App Router) + TypeScript + Tailwind CSS v4. Tipografía: Fraunces + Source Sans 3 (`next/font`).

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
| `site.ts` | Navegación, metadatos, imágenes de stock temporales (se reemplazan en Fase 2) |
| `campuses.ts` | Horarios, ubicación, redes y logo por campus (con fuente indicada) |
| `faq.ts` | Preguntas de "¿Es tu primera vez?" |
| `messages.ts` | Serie actual (`youtubeId`) y últimas predicaciones |
| `nextSteps.ts` | Camino de fe (6 pasos) |
| `groups.ts` | Grupos pequeños (ejemplos) |
| `kids.ts` | Wuambaland, Up Street y pilares |

Lo que no tiene fuente real está oculto y marcado como `TODO(PENDIENTES §n)`; la lista completa está en `PENDIENTES.md`. El diseño y sus reglas (paleta, radius 3px, sin gradientes) están definidos en `src/app/globals.css`.

## Variables de entorno

Copia `.env.example` a `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio.
- `NEXT_PUBLIC_CONTACT_EMAIL`: correo que recibe el formulario de oración/grupos (usa `mailto:`, sin backend).

## Deploy

Importa el repositorio en Vercel; no requiere configuración adicional.
