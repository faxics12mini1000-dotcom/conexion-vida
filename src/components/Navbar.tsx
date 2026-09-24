"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HandHeart, MapPin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { campuses, getCampus } from "@/data/campuses";
import { navLinks } from "@/data/site";
import { accent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { Logo } from "./Logo";

function CampusSwitcher({ solid }: { solid: boolean }) {
  const { campus: campusId, setCampus } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = getCampus(campusId);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Campus seleccionado: ${current.shortName}. Cambiar campus`}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
          solid
            ? "border-slate-200 text-cv-navy hover:bg-slate-50"
            : "border-white/25 text-white hover:bg-white/10",
        )}
      >
        <span
          className={cn("h-2 w-2 rounded-full", accent[campusId].dot)}
          aria-hidden="true"
        />
        {current.shortName}
        <ChevronDown
          className={cn("h-4 w-4 transition", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Elegir campus"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            {campuses.map((c) => (
              <li key={c.id} role="option" aria-selected={c.id === campusId}>
                <button
                  type="button"
                  onClick={() => {
                    setCampus(c.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                >
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", accent[c.id].dot)}
                    aria-hidden="true"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-cv-navy">
                      {c.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {c.services.map((s) => s.label).join(" · ")}
                    </span>
                  </span>
                  {c.id === campusId && (
                    <MapPin
                      className={cn("h-4 w-4", accent[c.id].text)}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { openVisit } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const linkClass = solid
    ? "text-slate-600 hover:text-cv-navy"
    : "text-white/80 hover:text-white";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Principal"
      >
        <a
          href="#inicio"
          className="rounded-lg focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none"
          aria-label="Conexión Vida, ir al inicio"
        >
          <Logo tone={solid ? "dark" : "light"} />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
                  linkClass,
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          <CampusSwitcher solid={solid} />
          <a
            href="#generosidad"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
              linkClass,
            )}
          >
            <HandHeart className="h-4 w-4" aria-hidden="true" />
            Generosidad
          </a>
          <button
            type="button"
            onClick={() => openVisit()}
            className="rounded-full bg-cv-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cv-brand/25 transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Planear mi visita
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className={cn(
            "rounded-full p-2.5 transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none lg:hidden",
            solid ? "text-cv-navy hover:bg-slate-100" : "text-white hover:bg-white/10",
          )}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200/70 bg-white lg:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 pt-3 pb-6 sm:px-6">
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-cv-navy transition hover:bg-slate-50"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div
                role="radiogroup"
                aria-label="Campus"
                className="mt-4 grid grid-cols-2 gap-2"
              >
                {campuses.map((c) => (
                  <MobileCampusButton key={c.id} id={c.id} />
                ))}
              </div>

              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openVisit();
                  }}
                  className="rounded-full bg-cv-brand px-5 py-3 text-base font-semibold text-white"
                >
                  Planear mi visita
                </button>
                <a
                  href="#generosidad"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-base font-semibold text-cv-navy"
                >
                  <HandHeart className="h-5 w-5" aria-hidden="true" />
                  Generosidad
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileCampusButton({ id }: { id: "queretaro" | "celaya" }) {
  const { campus, setCampus } = useApp();
  const c = getCampus(id);
  const active = campus === id;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => setCampus(id)}
      className={cn(
        "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition",
        active
          ? cn(accent[id].bgSoft, accent[id].text, "border-current")
          : "border-slate-200 text-cv-navy",
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", accent[id].dot)} aria-hidden="true" />
      {c.shortName}
    </button>
  );
}
