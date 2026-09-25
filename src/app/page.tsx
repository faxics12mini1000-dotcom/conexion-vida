import { AboutSection } from "@/components/AboutSection";
import { AppProvider } from "@/components/AppProvider";
import { CampusSection } from "@/components/CampusSection";
import { FirstTimeFAQ } from "@/components/FirstTimeFAQ";
import { Footer } from "@/components/Footer";
import { GivingSection } from "@/components/GivingSection";
import { Hero } from "@/components/Hero";
import { KidsSection } from "@/components/KidsSection";
import { MessagesSection } from "@/components/MessagesSection";
import { Navbar } from "@/components/Navbar";
import { NextSteps } from "@/components/NextSteps";

// GroupsSection sigue oculta: no hay grupos reales (PENDIENTES §5).
// import { GroupsSection } from "@/components/GroupsSection";

/** Fondos alternados: navy · crema · navy · paper · navy · crema · paper · crema · navy. */
export default function Home() {
  return (
    <AppProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-green focus:px-4 focus:py-3 focus:font-semibold focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <CampusSection />
        <FirstTimeFAQ />
        <AboutSection />
        <KidsSection />
        <MessagesSection />
        <NextSteps />
        <GivingSection />
      </main>
      <Footer />
    </AppProvider>
  );
}
