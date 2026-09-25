"use client";

import { useMemo, useState } from "react";
import { campuses, getCampus } from "@/data/campuses";
import { groupTypes, smallGroups, type GroupType } from "@/data/groups";
import type { CampusId } from "@/data/types";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type CampusFilter = CampusId | "todos";
type TypeFilter = GroupType | "todos";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-ui border px-4 font-semibold",
        active ? "border-navy bg-navy text-cream" : "border-line hover:border-muted",
      )}
    >
      {children}
    </button>
  );
}

/**
 * OCULTA en page.tsx: los grupos eran inventados y la lista está vacía
 * (PENDIENTES §5). Falta también el filtro por zona.
 */
export function GroupsSection() {
  const [campus, setCampus] = useState<CampusFilter>("todos");
  const [type, setType] = useState<TypeFilter>("todos");

  const results = useMemo(
    () =>
      smallGroups.filter(
        (g) =>
          (campus === "todos" || g.campus === campus) &&
          (type === "todos" || g.type === type),
      ),
    [campus, type],
  );

  return (
    <section id="grupos" className="section-y bg-paper">
      <div className="wrap">
        <SectionHeading
          title="Grupos pequeños"
          lead="La iglesia no termina el domingo."
        />

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Campus">
          <Chip active={campus === "todos"} onClick={() => setCampus("todos")}>
            Todos
          </Chip>
          {campuses.map((c) => (
            <Chip key={c.id} active={campus === c.id} onClick={() => setCampus(c.id)}>
              {c.shortName}
            </Chip>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Tipo de grupo">
          <Chip active={type === "todos"} onClick={() => setType("todos")}>
            Todos
          </Chip>
          {groupTypes.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
        </div>

        <p className="mt-8 text-muted" role="status">
          {results.length} {results.length === 1 ? "grupo" : "grupos"}
        </p>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {results.map((g) => (
            <li key={g.id} className="py-4">
              <h3 className="text-xl">{g.name}</h3>
              <p className="text-muted">
                {getCampus(g.campus).shortName} · {g.zone} · {g.type} · {g.schedule}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
