import type { Campus, ServiceTime } from "@/data/campuses";

const pad = (n: number) => String(n).padStart(2, "0");

/** Próxima fecha de la reunión (hoy cuenta si aún no ha empezado). */
export function nextOccurrence(service: ServiceTime, from = new Date()): Date {
  const d = new Date(from);
  d.setHours(service.hour, service.minute, 0, 0);
  const daysUntil = (service.weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + daysUntil);
  if (d.getTime() <= from.getTime()) d.setDate(d.getDate() + 7);
  return d;
}

/** Fecha "flotante" (sin zona horaria) para que el evento respete la hora local. */
const icsLocal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
    d.getHours(),
  )}${pad(d.getMinutes())}00`;

const escapeIcs = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");

/**
 * Genera un archivo .ics con la reunión elegida.
 * La reunión dura aprox. 75 a 80 minutos (confirmado por la iglesia): se usan 80.
 */
export function buildServiceIcs(campus: Campus, service: ServiceTime): string {
  const start = nextOccurrence(service);
  const end = new Date(start.getTime() + 80 * 60 * 1000);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Conexion Vida//Visita//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${icsLocal(start)}-${campus.id}@conexionvida`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsLocal(start)}`,
    `DTEND:${icsLocal(end)}`,
    `SUMMARY:${escapeIcs(`Conexión Vida ${campus.shortName}`)}`,
    `LOCATION:${escapeIcs(campus.address)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Texto amigable: "domingo 28 de septiembre". */
export function formatNextLabel(service: ServiceTime): string {
  return nextOccurrence(service).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
