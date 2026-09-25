# Auditoría — Conexión Vida (Fase 0)

Fecha: 2026-09-24 · Alcance: solo lectura, no se modificó código. `npm run lint` y `npm run build` pasan sin errores.

## 1. Stack y estructura

| Tema | Estado |
| --- | --- |
| Framework | Next.js 16.3.6 (App Router, Turbopack), React 19.2.8, TypeScript 5 |
| Estilos | Tailwind CSS v4 (`@theme inline` en `globals.css`), `clsx` + `tailwind-merge` |
| Animación | `framer-motion` 13 (en 10 de 17 archivos de `components/`) |
| Iconos | `lucide-react` 1.47 (25 iconos mapeados en `icons.tsx`) + SVG propio de Instagram |
| Tipografía | Geist + Geist Mono (`next/font/google`) — la fuente por defecto del template de Next |
| Rutas | Una sola página (`/`) con anclas. `/_not-found` e `/icon.svg` |
| Estado global | `AppProvider` (React context): campus seleccionado, modal de visita, tema del formulario |
| Datos | `src/data/*.ts` (campuses, faq, groups, kids, messages, nextSteps, site) |
| Imágenes | **Ninguna local** (no existe `public/`). 17 fotos de Unsplash remotas (`site.ts:39-108`) |
| Deploy | Vercel. `.env.example` define `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_CONTACT_EMAIL` |
| Peso JS | ~830 KB de JS sin comprimir en `.next/static/chunks` (4 chunks grandes: 264, 229, 178, 113 KB) |

Componentes (líneas): Navbar 289, Footer 251, GroupsSection 247, ConnectModal 243, GivingSection 235, CampusSection 220, Hero 200, MessagesSection 189, NextSteps 154, FirstTimeFAQ 116, KidsSection 87, AboutSection 82, AppProvider 69, Logo 60, SectionHeading 55, icons 88, Reveal 26.

Arquitectura de contenido actual: Hero → Quiénes somos → Campus → Primera vez (FAQ) → Niños → Mensajes → Grupos → Próximos pasos → Generosidad → Footer/contacto. Todo gira en torno a un **selector global de campus** (Querétaro/Celaya).

---

## 2. "Tells" de IA (archivo:línea)

Conteo global: **92 usos de radius grande** (18× `rounded-[2rem]`, 17× `rounded-2xl`, 4× `rounded-3xl`, 3× `rounded-xl`, 50× `rounded-full`), **19 gradientes**, **9 usos de blur/backdrop-blur**, **17 sombras grandes**, **23 wrappers `Reveal`**.

### 2.1 Gradientes (regla: cero) — Prioridad ALTA

| Archivo:línea | Qué es |
| --- | --- |
| `Hero.tsx:38` | Overlay `bg-gradient-to-br from-cv-navy via-cv-navy/85 to-cv-brand/40` |
| `Hero.tsx:70` | **Texto con gradiente** (`bg-clip-text`, sky→blue→teal) en el H1 |
| `AboutSection.tsx:55` | Overlay gradiente sobre foto |
| `CampusSection.tsx:37` | Overlay gradiente sobre foto (clase `from-cv-navy/85 via-cv-navy/20`) |
| `FirstTimeFAQ.tsx:27` | Tarjeta `bg-gradient-to-br from-cv-brand to-cv-celaya` |
| `KidsSection.tsx:35` | Overlay gradiente sobre foto |
| `KidsSection.tsx:41` + `data/kids.ts:11,29,39` | Pill con gradiente por programa |
| `GroupsSection.tsx:103` | Overlay `from-cv-navy via-cv-navy/80 to-cv-celaya/30` |
| `MessagesSection.tsx:114` | Barra de progreso con gradiente |
| `MessagesSection.tsx:153` | Overlay gradiente sobre foto |
| `NextSteps.tsx:48` | Línea de progreso con gradiente |
| `NextSteps.tsx:106` | Icono en tile con gradiente |
| `Logo.tsx:13-18` | `linearGradient` en el isotipo |
| `app/icon.svg:3-8` | `linearGradient` en el favicon |
| `lib/accent.ts:15,25,34` | Propiedad `gradient` por campus (código muerto, no se usa) |

### 2.2 Glassmorphism, blur, glow — ALTA

| Archivo:línea | Qué es |
| --- | --- |
| `Hero.tsx:42` | Esfera de glow `blur-3xl` decorativa |
| `Hero.tsx:55` | Pill "Querétaro y Celaya · Domingos" `bg-white/10 backdrop-blur` con punto `animate-ping` |
| `Hero.tsx:96` | Botón secundario `bg-white/5 backdrop-blur` |
| `Hero.tsx:110` | Panel selector de sede `bg-white/10 backdrop-blur-xl shadow-2xl rounded-[2rem]` (glass clásico) |
| `CampusSection.tsx:163` | Glow `blur-3xl` decorativo |
| `CampusSection.tsx:182` | Chips glass `bg-white/10 backdrop-blur` |
| `MessagesSection.tsx:54` | Toast `backdrop-blur` |
| `MessagesSection.tsx:158` | Badge de tema `backdrop-blur` |
| `MessagesSection.tsx:82` | Contenedor `bg-white/[0.04]` translúcido |
| `Navbar.tsx:137` | Header `bg-white/85 backdrop-blur-xl shadow-sm` |
| `ConnectModal.tsx:91` | Backdrop `backdrop-blur-sm` |

### 2.3 Radius grandes y "pills" (regla: máx. 3px) — ALTA

Afecta prácticamente todos los archivos. Casos más visibles:
`rounded-[2rem]` en tarjetas de `AboutSection.tsx:46,66`, `CampusSection.tsx:21,161,194`, `KidsSection.tsx:26,70`, `GroupsSection.tsx:94,122,187,223`, `NextSteps.tsx:102`, `GivingSection.tsx:62,75`, `MessagesSection.tsx:82,143`, `Hero.tsx:110`; `rounded-3xl` en `FirstTimeFAQ.tsx:55`, `MessagesSection.tsx:17`, `ConnectModal.tsx:100`; `rounded-full` en **todos** los botones (`Hero.tsx:86,96,184`, `Navbar.tsx:184`, `GroupsSection.tsx:239`, `NextSteps.tsx:128`, `GivingSection.tsx:211`, `Footer.tsx:136`, etc.), chips, badges y pills. Tiles de icono `rounded-2xl` en `AboutSection.tsx:67`, `CampusSection.tsx:196`, `KidsSection.tsx:71`, `FirstTimeFAQ.tsx:72`, `NextSteps.tsx:106`. `Logo.tsx:18` e `icon.svg:8` usan `rx=11` (cuadrado redondeado).

### 2.4 Sombras difusas / coloreadas — ALTA

`Hero.tsx:86` (`shadow-xl shadow-cv-brand/30`), `Hero.tsx:110` (`shadow-2xl`), `CampusSection.tsx:23` (`shadow-2xl shadow-cv-navy/10`), `AboutSection.tsx:66` (hover `shadow-xl shadow-cv-brand/5`), `MessagesSection.tsx:17` (`shadow-2xl shadow-black/40`), `GroupsSection.tsx:187,239`, `NextSteps.tsx:70,102`, `GivingSection.tsx:75,211`, `Navbar.tsx:68,137,184`, `ConnectModal.tsx:100`.

### 2.5 Animaciones repetidas (regla: una sola, sutil) — ALTA

| Archivo:línea | Qué es |
| --- | --- |
| `Reveal.tsx` (usado 23×) | Fade + slide-up en cada bloque de cada sección: AboutSection×3, CampusSection×5, FirstTimeFAQ×2, GivingSection×3, GroupsSection×2, KidsSection×3, MessagesSection×3, NextSteps×2 |
| `Hero.tsx:12-19,47-52` | Entrada escalonada (stagger) de 4 elementos + panel con retraso propio (`Hero.tsx:104-108`) |
| `Hero.tsx:129-136` | Botones de sede **flotando en bucle infinito** (`repeat: Infinity`) + `whileHover scale` + `whileTap` |
| `Hero.tsx:58` | `animate-ping` |
| `Hero.tsx:196` | Flecha `animate-bounce` |
| `AboutSection.tsx:66`, `MessagesSection.tsx:143` | `hover:-translate-y-1` |
| `CampusSection.tsx:34`, `KidsSection.tsx:32`, `MessagesSection.tsx:150` | Zoom de foto `group-hover:scale-105` con `duration-700` |
| `MessagesSection.tsx:43` | Botón play con `group-hover:scale-110` |
| `FirstTimeFAQ.tsx:90-105`, `GroupsSection.tsx:175-186`, `NextSteps.tsx:95-104`, `GivingSection.tsx:114-123`, `Navbar.tsx:59-67,205-212` | `AnimatePresence` con fade/slide/scale en cada micro-interacción |

Nota: `AppProvider.tsx:57` aplica `MotionConfig reducedMotion="user"`, pero **no cubre** `animate-ping`/`animate-bounce` de Tailwind (no usan `motion-safe:`).

### 2.6 Emojis e iconos decorativos (regla: solo funcionales) — MEDIA

No hay emojis en el código. Sí hay iconos decorativos genéricos:
- `AboutSection.tsx:10-31,67-69`: 4 tiles con música/usuarios/**corazón**/pin sin función.
- `FirstTimeFAQ.tsx:28,72-77` (`data/faq.ts`): café, **corazón**, camisa, bebé, etc. en cada pregunta.
- `KidsSection.tsx:56,71` (`data/kids.ts`): escudo, birrete, gamepad; checks en cada bullet.
- `NextSteps.tsx:106` (`data/nextSteps.ts`): brújula, **llama**, gotas, **manos con corazón**, brote.
- `CampusSection.tsx:168` **Sparkles**, `:197` Radio; `Hero.tsx:146` MapPin en cada opción; `data/campuses.ts:79` `sparkles`.
- `Navbar.tsx:178,256` **HandHeart** en "Generosidad".
- `Footer.tsx:244` icono Mail junto al copyright.
- `icons.tsx`: 25 iconos, varios sin uso (`smile`, `book`, `message`, `handshake`, `lightbulb`, `church`).
- **Funcionales que sí se quedan**: MapPin (mapa), Clock (horario), Instagram, y agregar WhatsApp.

### 2.7 Grids de tarjetas idénticas — MEDIA

- `AboutSection.tsx:63-78`: 4 tarjetas icono + título + texto (2×2).
- `KidsSection.tsx:67-83`: 3 pilares idénticos (regla: no tarjetas idénticas).
- `MessagesSection.tsx:139-185`: 3 tarjetas de predicaciones idénticas.
- `GroupsSection.tsx:174`: 3 columnas de tarjetas de grupo.
- `NextSteps.tsx`: stepper de 6 pasos con tile de icono.
- `FirstTimeFAQ.tsx`: acordeón con icono en cada fila.
- `Hero.tsx:110-188`: panel flotante "elige tu sede" (patrón de landing SaaS).

### 2.8 Copy genérico — ALTA (afecta Fase 3)

| Ubicación | Texto | Problema |
| --- | --- | --- |
| `data/site.ts:8`, `Hero.tsx:68-72` | "Una iglesia actual. Personas reales. Una vida conectada con Dios." | Tres eslóganes apilados, intercambiable con cualquier iglesia |
| `Hero.tsx:79-81` | "Ven tal como eres, hay un lugar para ti." | Cliché |
| `AboutSection.tsx:40` | "Una comunidad que te espera, tal como eres" | Cliché |
| `AboutSection.tsx:41` | "la fe debe ser cercana, relevante y compartida… vida conectada con Dios y con otros" | Abstracto, sin dato concreto |
| `AboutSection.tsx:59` | «La fe se vive mejor en comunidad.» | Cita sin autor, relleno |
| `CampusSection.tsx:146-147` | "Encuentra el lugar donde perteneces / Dos casas, una misma familia" | Cliché |
| `CampusSection.tsx:172` | "Seguimos creciendo, seguimos conectando" | Relleno |
| `data/campuses.ts:45,69` | "los brazos abiertos", "la fe se vive en el domingo y también en casa" | Cliché |
| `FirstTimeFAQ.tsx:30` | "Te recibimos con un café." | Afirmación no confirmada |
| `ConnectModal.tsx:122` | "Te esperamos con un café y una sonrisa." | Cliché |
| `KidsSection.tsx:18` | "Un lugar seguro para que tus hijos amen venir" | Cliché |
| `data/kids.ts:45` | "Seguridad garantizada" | Promesa que la iglesia no ha confirmado |
| `MessagesSection.tsx:76` | "Palabras que conectan con tu vida diaria" | Cliché |
| `GroupsSection.tsx:110` | "La iglesia no termina el domingo" | Cliché |
| `NextSteps.tsx:33-34` | "Tu camino de fe, a tu ritmo… siempre hay un siguiente paso" | Cliché |
| `GivingSection.tsx:44` | "Invertimos en vidas y en nuestra ciudad" | Cliché + afirma destino de fondos no confirmado |
| `Footer.tsx:152` | "¿Necesitas oración? Escríbenos" | Aceptable, pero el formulario abre `mailto:` |

### 2.9 Datos inventados / sin confirmar — ALTA

Marcados `EDITAR` en el código pero **se muestran al público como si fueran reales**:

- **Horarios**: Querétaro Dom 10:00 y 12:00; Celaya Dom 11:00 (`campuses.ts:47-49,70`).
- **Direcciones**: "Dirección por confirmar" (`campuses.ts:50,71`) — sale literal en tarjeta, modal y `.ics`.
- **Mapas**: `mapsSearch("Conexión Vida Querétaro")` es una búsqueda, no la ubicación exacta (`campuses.ts:51,72`).
- **Instagram**: `@conexionvida.queretaro` / `@conexionvida.celaya` (`campuses.ts:53-54,74-75`) — handles supuestos.
- **Badges de campus**: "Cafetería & Conexión", "Estacionamiento disponible", "Kids & Teens", "Comunidad Joven", "Grupos en casa", "Wuambaland" en Celaya (`campuses.ts:56-60,77-81`).
- **Sedes futuras**: "Puebla — Próximamente", "Santa María — En camino" (`campuses.ts:86-89`).
- **"Nuestra primera casa"** para Querétaro (`campuses.ts:45`).
- **Duración**: "entre 75 y 85 minutos"; "café"; "check-in verificado"; "registro y verificación de entrada y salida" (`faq.ts:22,43`, `kids.ts:27,46`).
- **Programas de niños**: "Wuambaland" (bebés y preescolar) y "Up Street" (primaria y secundaria), con sus bullets "Cuna y área de bebés", "Personal verificado" (`kids.ts:20-41`).
- **Serie actual**: "Conexión Real", 4 semanas, semana 2 (`messages.ts:30-38`).
- **Predicaciones**: 3 falsas, "Pastor invitado", "Domingo reciente", "Hace 2 semanas" (`messages.ts:41-69`) — con tarjetas que no llevan a ningún video.
- **Grupos pequeños**: 7 grupos inventados con nombres, zonas (Juriquilla, El Marqués…) y horarios (`groups.ts:17-25`).
- **Camino de fe de 6 pasos**, incluidos bautismo/servir/liderar (`nextSteps.ts`).
- **Ofrenda**: CLABE `000000000000000000`, banco "EDITAR: banco", beneficiario "Conexión Vida (EDITAR: razón social)" **visibles en pantalla** (`site.ts:111-117`); texto "apoyo a familias… llevar esperanza a nuestras ciudades" (`GivingSection.tsx:45`); "no almacenamos los datos de tu tarjeta / pago recurrente" (`GivingSection.tsx:193-195`).
- **Correo de contacto**: si falta `NEXT_PUBLIC_CONTACT_EMAIL` cae a `hola@conexionvida.example` (`site.ts:13-14`) y el formulario abriría un correo a un dominio que no existe.
- **Cifras/testimonios**: no se encontró ninguno ("+500 familias", etc.). Bien.
- **Pastores / nombres propios**: ninguno inventado. Bien.

### 2.10 Otros patrones de plantilla — MEDIA

- Eyebrow en mayúsculas con `tracking-widest` sobre cada H2 (`SectionHeading.tsx:27-34`, repetido en 8 secciones).
- Alternancia blanco / gris azulado (`cv-mist`) / navy entre secciones, sin fotografía a sangre.
- Paleta azul + teal + slate (`globals.css:5-9`) = paleta por defecto de SaaS.
- Geist como única familia, sin serif (`layout.tsx:5-13`).
- Stepper "Paso 1 de 6" con progreso animado y panel `aria-live` (`NextSteps.tsx`).
- Filtros por chips (3 filas) sobre 7 datos falsos (`GroupsSection.tsx:121-167`).

---

## 3. Problemas de contenido (qué le falta a un visitante nuevo)

Ordenados por lo que un visitante nuevo busca primero.

| # | Falta / problema | Prioridad |
| --- | --- | --- |
| 1 | **Dirección real y mapa embebido**: no hay ninguna dirección; "Cómo llegar" abre una búsqueda de Maps genérica. No hay `<iframe>` de mapa | Alta |
| 2 | **Horarios confirmados**: los actuales son ejemplo. Falta idioma, si hay servicio entre semana, y hora a la que abren puertas | Alta |
| 3 | **WhatsApp directo (`wa.me`)**: no existe. El único canal es un formulario que abre el cliente de correo (`mailto:`), que falla si el visitante no tiene cliente configurado | Alta |
| 4 | **Primera vez**: la FAQ cubre duración/ropa/niños pero con respuestas no confirmadas; falta estacionamiento real, accesibilidad, dónde entrar, con quién llegar | Alta |
| 5 | **Pastores / liderazgo con fotos reales**: no hay sección. "Quiénes somos" no nombra a nadie ni cuenta la historia de la iglesia (año, origen, denominación, qué creen) | Alta |
| 6 | **Fotografía real**: 0 fotos de la iglesia. Todo es stock de Unsplash (manos levantadas, fogata, pila de libros, "manos unidas") — exactamente lo que se quiere evitar | Alta |
| 7 | **Predicaciones reales**: sin ID de YouTube ni enlace de canal/Facebook; el "reproductor" de la serie muestra "Pronto publicaremos…" al pulsar play | Alta |
| 8 | **Eventos próximos**: no existe la sección | Media |
| 9 | **Ministerios**: solo niños; falta jóvenes, matrimonios, alabanza, etc., y no hay páginas ni fotos | Media |
| 10 | **Ofrenda**: mostrar CLABE falsa es un riesgo real (alguien podría transferir a una cuenta inexistente). Debe ocultarse hasta que la iglesia confirme datos | Alta |
| 11 | **Aviso de privacidad** (el formulario recoge nombre y contacto; requerido en México) y datos de contacto (teléfono, correo real) | Media |
| 12 | **Redes**: solo Instagram supuesto. Faltan Facebook/YouTube reales si existen | Media |
| 13 | **Navegación**: no incluye Niños, Grupos ni Horarios/Ubicación, que son lo que más se busca. "Próximos Pasos" y "Mensajes" ocupan su lugar | Media |
| 14 | **Modelo de dos campus**: todo el sitio asume Querétaro + Celaya con selector global. Hay que confirmar con la iglesia que son 2 sedes y tratarlas como bloques editoriales, no como estado de la app | Alta (decisión) |
| 15 | **Bilingüe / Idioma**: solo español. Sin problema si la congregación es hispana | Baja |

---

## 4. Técnico

### 4.1 Metadatos, Open Graph, SEO — ALTA

| Hallazgo | Detalle |
| --- | --- |
| URL base | `metadataBase = new URL(siteConfig.url)` con fallback **`http://localhost:3000`** si `NEXT_PUBLIC_SITE_URL` no está definida en Vercel (`site.ts:11`, `layout.tsx:16`). Los enlaces OG saldrían con localhost |
| Imagen OG | **No hay `og:image`** ni `twitter:card` (`layout.tsx:23-29`). La vista previa en WhatsApp saldrá sin imagen |
| `og:url` / canonical | No definidos |
| `lang` | `lang="es"` (`layout.tsx:37`), debe ser `es-MX` |
| Favicon | `favicon.ico` (26 KB) + `icon.svg` con gradiente. Sin `apple-touch-icon` ni manifest |
| `sitemap.xml` | No existe |
| `robots.txt` | No existe |
| `themeColor` | `#0f172a` (navy actual), se actualizará con la paleta nueva (`layout.tsx:33`) |
| JSON-LD | No hay (`Church`/`LocalBusiness` con dirección y horarios ayudaría a Google Maps y búsquedas locales) |
| Título/descripción | Correctos en estructura; la descripción es genérica (`site.ts:9-10`) |

### 4.2 Accesibilidad

| Hallazgo | Prioridad |
| --- | --- |
| **Contraste insuficiente medido (WCAG AA 4.5:1)**: `cv-celaya #0d9488` sobre blanco = **3.74:1**; `cv-queretaro #0284c7` sobre blanco = **4.10:1** (texto pequeño en `accent.text`, `CampusSection.tsx:64,126-131`, `GroupsSection.tsx:191-198`, `Navbar.tsx:94`); texto blanco sobre `bg-cv-celaya` (botón Celaya/Kids) = 3.74:1; `text-slate-500` (`#64748b`) sobre navy en `Footer.tsx:243` = **3.75:1**; `text-slate-400` sobre blanco = 2.56:1 (iconos `GroupsSection.tsx:208,212`) | Alta |
| `text-white/60` de la flecha del hero sobre foto variable (`Hero.tsx:194`) — no verificable | Baja |
| Roles ARIA incorrectos: `role="radio"` sin navegación con flechas (`Hero.tsx:126-128`, `Navbar.tsx:274`, `ConnectModal.tsx:138`); `role="listbox"` con `<button>` dentro de `role="option"` (`Navbar.tsx:62-72`); tabs con flechas que cambian de tab sin mover el foco (`GivingSection.tsx:94-98`) | Media |
| `aria-live="polite"` en un contenedor que se reemplaza con animación (`NextSteps.tsx:103`) → lectura ruidosa | Baja |
| Objetivos táctiles < 44 px: chips de filtro (`GroupsSection.tsx:35`, ≈36 px), `CampusSwitcher` (`Navbar.tsx:42`, ≈38 px), botón cerrar del modal (`ConnectModal.tsx:109`, 36 px), "Siguiente paso" | Media |
| Sin "skip to content" | Media |
| Alt de imágenes describen fotos de stock (`site.ts:42-106`); dejarán de ser verdad al cambiar por fotos reales | Media |
| Orden de headings: un solo `<h1>` (Hero), luego h2/h3/h4 sin saltos. **Correcto** | — |
| `focus-visible` presente en casi todos los controles. **Correcto** | — |
| `MotionConfig reducedMotion="user"` presente; falta cubrir animaciones CSS (`animate-ping`, `animate-bounce`) | Media |
| Modal: focus trap y restauración de foco implementados. **Correcto** (sólo cambiar estilos) | — |
| `autoComplete="email"` en campo "Correo o WhatsApp" (`Footer.tsx:113`) | Baja |

### 4.3 Performance

| Hallazgo | Prioridad |
| --- | --- |
| **Contenido oculto hasta hidratar**: `Reveal` renderiza en SSR con `opacity: 0` (`Reveal.tsx:18`); sin JS, o hasta que cargue framer-motion, media página es invisible. Afecta LCP, SEO y usuarios con conexión lenta | Alta |
| **Todo el sitio es Client Component**: 14 de 17 archivos de `components/` llevan `"use client"`, varios solo por `Reveal`/`framer-motion`, aunque son texto estático (AboutSection, KidsSection). ~830 KB de JS sin comprimir; se puede reducir a un puñado de islas (navbar móvil, mapa/modal) | Alta |
| **Imágenes remotas de Unsplash** (17 URLs sin ancho fijo, `?auto=format&fit=crop&q=80`): dependencia de terceros, el optimizador descarga el original completo; sin control de peso; **son stock** | Alta |
| Hero: imagen con `priority` (bien) pero cargada desde Unsplash y con `opacity-50` sobre navy | Media |
| Fuentes: Geist + Geist Mono. Geist Mono se carga solo para una CLABE (`GivingSection.tsx:137`) | Media |
| `framer-motion` + `lucide-react` + `tailwind-merge` para un sitio principalmente estático | Media |
| `AnimatePresence mode="popLayout"` + `layout` en 7 tarjetas de grupos (`GroupsSection.tsx:175-186`) | Baja |
| `.ics` y fecha "próximo domingo" calculadas en el cliente con `Date` local (`calendar.ts`) — correcto, pero depende de horarios reales | Baja |

### 4.4 Responsive (revisión de código, sin prueba visual en navegador)

| Hallazgo | Prioridad |
| --- | --- |
| Hero a 360 px: H1 de tres frases (`text-4xl`) + panel de sede debajo con `pt-24 pb-16` → el hero supera 100dvh y el CTA principal queda fuera de pantalla en móviles pequeños | Alta |
| Nav de escritorio solo desde `xl` (1280 px); entre 1024 y 1279 hay CampusSwitcher + 2 botones pero **sin enlaces de sección** | Media |
| `FirstTimeFAQ.tsx:102`: `pl-[4.75rem]` fijo para alinear con el tile de icono; se rompe si se quitan los iconos | Baja |
| Nombres largos ("Conexión Vida" + selector + "Planear mi visita") no probados a 360 px | Media |
| Se verificará en 360 / 768 / 1440 px con navegador en Fase 4 | — |

### 4.5 Config y calidad

| Hallazgo | Prioridad |
| --- | --- |
| `next.config.ts`: `remotePatterns` solo para `images.unsplash.com`; se elimina al pasar a fotos locales | Media |
| `.env.example` sin `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_MAPS_EMBED`, etc. | Baja |
| README documenta Unsplash y los campos `EDITAR`; se actualizará | Baja |
| `CLAUDE.md` solo importa `AGENTS.md` (aviso de versión de Next); no tiene reglas de diseño ni estado del proyecto | Media |
| `lint` y `build` pasan | — |

---

## 5. Resumen por prioridad

### Alta
1. Datos inventados visibles al público, en particular **CLABE falsa** y **dirección "por confirmar"** (2.9).
2. Gradientes, glass, glow, radius, sombras, animaciones repetidas (2.1–2.5).
3. Cero fotografía real; todo Unsplash (sección 3 #6, 4.3).
4. Falta la información que un visitante nuevo necesita: horarios/dirección/mapa/WhatsApp/pastores/predicaciones (sección 3).
5. Open Graph sin imagen y con fallback a `localhost`; sin sitemap ni robots (4.1).
6. Contraste AA: azul/teal sobre blanco y slate-500 sobre navy (4.2).
7. `Reveal` deja contenido invisible en SSR y todo el sitio es cliente (4.3).
8. Hero no cabe en 360 px con el CTA visible (4.4).
9. Copy genérico y con clichés (2.8).
10. Modelo de campus: confirmar si son 2 sedes (sección 3 #14).

### Media
Iconos decorativos, grids de tarjetas idénticas, eyebrows repetidos, roles ARIA, touch targets, skip link, alt descriptivos, fuentes, navegación incompleta, formulario por `mailto:`, JSON-LD, aviso de privacidad, redes.

### Baja
`aria-live` ruidoso, `autoComplete`, `pl-[4.75rem]` de FAQ, `.env.example`, README, código muerto (`accent.gradient`, iconos sin uso).

---

## 6. Propuesta de paleta (elegir una antes de la Fase 1)

Contrastes calculados con la fórmula WCAG. Ambas usan solo 2 colores de marca + neutros cálidos, sin gradientes.

**Opción A — Terracota + verde bosque** (cálida, terrosa, más "hogar")
- Color 1: terracota `#9C3F25` (texto crema sobre él: 5.87:1)
- Color 2: verde bosque `#2F4A3A` (texto crema sobre él: 8.55:1)
- Neutros: crema `#F5F0E6`, casi negro `#1B1815` (15.56:1 sobre crema)

**Opción B — Azul tinta + ocre** (más sobria, cercana al azul actual de la marca)
- Color 1: azul tinta `#1F3A5F` (texto crema sobre él: 10.37:1)
- Color 2: ocre oscuro `#8A5A12` (texto crema sobre él: 5.34:1)
- Neutros: hueso `#F7F3EA`, casi negro `#16181B` (16.06:1 sobre hueso)

**Tipografía sugerida** (a validar en pantalla): Fraunces (títulos) + Source Sans 3 (texto). Alternativa: Cormorant Garamond + Archivo.
