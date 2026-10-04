"use client";

import { useEffect, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Observador único: marca con `is-in` los [data-reveal] al entrar en pantalla.
 * Los que ya están visibles al cargar no parpadean; sin JS todo se ve normal.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    for (const el of items) {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-in");
    }
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const el of items) if (!el.classList.contains("is-in")) io.observe(el);

    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}

/** Envuelve contenido que debe aparecer suavemente al hacer scroll. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Retraso en ms, para escalonar elementos hermanos. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
