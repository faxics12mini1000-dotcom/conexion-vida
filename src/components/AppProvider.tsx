"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CampusId } from "@/data/types";
import { ConnectModal } from "./ConnectModal";

interface AppState {
  /** Campus seleccionado globalmente (navbar, hero, modal). */
  campus: CampusId;
  setCampus: (id: CampusId) => void;
  visitOpen: boolean;
  openVisit: (id?: CampusId) => void;
  closeVisit: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [campus, setCampus] = useState<CampusId>("queretaro");
  const [visitOpen, setVisitOpen] = useState(false);

  const openVisit = useCallback((id?: CampusId) => {
    if (id) setCampus(id);
    setVisitOpen(true);
  }, []);
  const closeVisit = useCallback(() => setVisitOpen(false), []);

  const value = useMemo<AppState>(
    () => ({ campus, setCampus, visitOpen, openVisit, closeVisit }),
    [campus, visitOpen, openVisit, closeVisit],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <ConnectModal />
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return ctx;
}
