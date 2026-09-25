import { AboutSection } from "@/components/AboutSection";
import { AppProvider } from "@/components/AppProvider";
import { CampusSection } from "@/components/CampusSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { NextSteps } from "@/components/NextSteps";
// Secciones OCULTAS (sus componentes siguen en /components). Se reactivan en Fase 3
// cuando la iglesia entregue los datos reales (ver PENDIENTES.md):
// import { FirstTimeFAQ } from "@/components/FirstTimeFAQ"; // §3 respuestas reales
// import { GivingSection } from "@/components/GivingSection"; // §8 solo si la iglesia confirma
// import { GroupsSection } from "@/components/GroupsSection"; // §5 grupos reales
// import { KidsSection } from "@/components/KidsSection"; // §5 edades, horarios, registro
// import { MessagesSection } from "@/components/MessagesSection"; // §6 videos de YouTube

export default function Home() {
  return (
    <AppProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-green focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <AboutSection />
        <CampusSection />
        {/* <FirstTimeFAQ /> */}
        {/* <KidsSection /> */}
        {/* <MessagesSection /> */}
        {/* <GroupsSection /> */}
        <NextSteps />
        {/* <GivingSection /> */}
      </main>
      <Footer />
    </AppProvider>
  );
}
