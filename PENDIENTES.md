# PENDIENTES — datos reales que hay que conseguir de la iglesia

Regla del proyecto: no se inventa nada. Mientras falte un dato, el sitio muestra un TODO comentado en el código o se oculta la sección. Marca cada punto cuando lo tengas.

## 1. Identidad y dominio
- [ ] Dominio final de producción (para `metadataBase`, Open Graph, sitemap, canonical).
- [ ] Nombre oficial completo de la iglesia y denominación/afiliación, si aplica.
- [ ] Logo original en SVG (el actual, dos anillos sobre cuadrado con degradado, ¿es el oficial?). Versión a un color y versión sobre fondo oscuro.
- [ ] Colores de marca actuales, si existen (para elegir la paleta de la Fase 1).
- [ ] Frase o descripción corta que la iglesia use para presentarse (para `<meta description>` y hero). No inventar eslogan.
- [ ] Año de fundación y breve historia (2–4 frases reales).

## 2. Sedes
- [ ] Confirmar cuántas sedes hay hoy: ¿Querétaro y Celaya? ¿Son las únicas?
- [ ] ¿Puebla y Santa María son proyectos reales? Si no, se elimina esa sección.
- [ ] Por cada sede:
  - [ ] Dirección completa (calle, número, colonia, CP, ciudad).
  - [ ] Enlace exacto de Google Maps y coordenadas o iframe de embed.
  - [ ] Horarios de servicio (día y hora), incluyendo si hay entre semana.
  - [ ] Hora a la que abren puertas.
  - [ ] Estacionamiento: sí/no, capacidad, indicaciones.
  - [ ] Accesibilidad (rampa, baños, etc.).
  - [ ] Teléfono/WhatsApp de la sede.
  - [ ] Instagram, Facebook, YouTube de la sede (los handles `@conexionvida.queretaro` y `@conexionvida.celaya` son suposición).

## 3. Primera visita
- [ ] Duración real de un servicio.
- [ ] Cómo se vive el servicio (música, mensaje, oración): descripción con palabras de la iglesia.
- [ ] Vestimenta habitual.
- [ ] ¿Hay café o cafetería? (el sitio dice "te recibimos con un café", no está confirmado).
- [ ] ¿Hay equipo de bienvenida en la puerta? ¿Cómo reconocerlo?
- [ ] Niños: ¿desde qué edad?, ¿cómo es el registro de entrada y salida?, ¿qué verificación se hace a los voluntarios?
- [ ] ¿Se ofrece traducción, lengua de señas o algo similar?

## 4. Quiénes somos y pastores
- [ ] Nombres y cargos de pastores/líderes que deban aparecer.
- [ ] Foto real de cada uno (retrato, fondo neutro o del templo) y autorización para publicarla.
- [ ] Breve biografía de cada uno (2–3 líneas, aprobada por ellos).
- [ ] Declaración de fe o lo que creen, en pocas líneas (si quieren mostrarla).

## 5. Ministerios
- [ ] Lista real de ministerios (niños, jóvenes, matrimonios, alabanza, etc.).
- [ ] Por ministerio: nombre, a quién sirve, cuándo se reúne, contacto/responsable, una foto real.
- [ ] Nombres de programas de niños: ¿"Wuambaland" y "Up Street" son reales?, ¿rangos de edad?
- [ ] Grupos pequeños: ¿existen?, ¿cuántos?, ¿zonas y días? (los 7 actuales son de ejemplo). ¿Cómo se inscribe uno?
- [ ] Camino de fe (explorar, bautismo, servir, liderar): ¿es el proceso real de la iglesia?, ¿cómo pide alguien bautizarse?

## 6. Predicaciones
- [ ] Canal de YouTube y/o Facebook (URL).
- [ ] IDs de los últimos 3–6 videos, o URL de una lista de reproducción.
- [ ] Serie actual, si hay (nombre real, semanas).
- [ ] Nombre de quien predica en cada mensaje.

## 7. Eventos
- [ ] Próximos eventos con fecha, hora, lugar, descripción corta y si requieren registro.
- [ ] Quién actualizará esa lista y con qué frecuencia (define si va en código, en CMS o en Google Calendar).

## 8. Ofrenda / donaciones
- [ ] ¿La iglesia confirma que quiere mostrar datos de ofrenda en el sitio? (si no, la sección se elimina).
- [ ] Beneficiario legal, banco y CLABE reales (la actual es `000000000000000000`).
- [ ] Concepto sugerido.
- [ ] ¿Hay pasarela en línea (Stripe, Mercado Pago, etc.)? URL.
- [ ] Texto sobre el destino de los fondos, aprobado por la iglesia. El versículo actual (2 Corintios 9:7) está citado sin versión: indicar cuál usan.

## 9. Contacto
- [ ] Número de WhatsApp para `wa.me` (con lada de país, ej. `52…`) y mensaje predeterminado.
- [ ] Correo real que recibirá mensajes (hoy cae a `hola@conexionvida.example`).
- [ ] Teléfono, si lo publicarán.
- [ ] ¿Quién atiende las peticiones de oración y en cuánto tiempo responde?
- [ ] Aviso de privacidad (requerido si se recogen nombre y contacto en un formulario).

## 10. Fotografía (lo que más pesa en el rediseño)
Solo fotos reales de la iglesia. Horizontales, mínimo 2400 px de ancho, sin filtros, con permiso de las personas que salgan.
- [ ] **Hero**: panorámica del servicio o del templo, con luz natural. Zona libre de caras en el tercio izquierdo para el título.
- [ ] Exterior de la fachada / entrada de cada sede (una por sede).
- [ ] Interior vacío del auditorio (una por sede).
- [ ] Momento de alabanza, visto desde atrás o de lado.
- [ ] Recepción/bienvenida y café (si existe).
- [ ] Área de niños (con autorización de los padres o sin rostros reconocibles).
- [ ] Grupos pequeños o convivencia.
- [ ] Retratos de pastores.
- [ ] Una foto por ministerio.
- [ ] Imagen para vista previa en WhatsApp (1200×630, se genera en la Fase 4 a partir de una de las anteriores).
- Si no hay fotos, el sitio muestra un bloque de color sólido neutro (sin stock).

## 11. Decisiones de diseño que dependen de ti (no de la iglesia)
- [ ] Elegir paleta: Opción A (terracota + verde bosque) u Opción B (azul tinta + ocre). Ver `AUDITORIA.md` §6.
- [ ] Confirmar tipografías: Fraunces + Source Sans 3, o alternativa.
- [ ] Confirmar que el selector global de campus se elimina y cada sede se muestra como bloque propio.
