"use client";

import { MotionConfig } from "framer-motion";
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

export type ContactTopic = "oracion" | "grupo" | "bautismo" | "servir" | "info";

interface AppState {
  /** Campus seleccionado globalmente (navbar, hero, modal). */
  campus: CampusId;
  setCampus: (id: CampusId) => void;
  visitOpen: boolean;
  openVisit: (id?: CampusId) => void;
  closeVisit: () => void;
  contactTopic: ContactTopic;
  setContactTopic: (topic: ContactTopic) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [campus, setCampus] = useState<CampusId>("queretaro");
  const [visitOpen, setVisitOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<ContactTopic>("oracion");

  const openVisit = useCallback((id?: CampusId) => {
    if (id) setCampus(id);
    setVisitOpen(true);
  }, []);
  const closeVisit = useCallback(() => setVisitOpen(false), []);

  const value = useMemo<AppState>(
    () => ({
      campus,
      setCampus,
      visitOpen,
      openVisit,
      closeVisit,
      contactTopic,
      setContactTopic,
    }),
    [campus, visitOpen, openVisit, closeVisit, contactTopic],
  );

  return (
    <AppContext.Provider value={value}>
      {/* Respeta "reducir movimiento" del sistema operativo */}
      <MotionConfig reducedMotion="user">
        {children}
        <ConnectModal />
      </MotionConfig>
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return ctx;
}
