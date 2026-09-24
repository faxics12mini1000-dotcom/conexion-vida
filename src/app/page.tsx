import { AboutSection } from "@/components/AboutSection";
import { AppProvider } from "@/components/AppProvider";
import { CampusSection } from "@/components/CampusSection";
import { FirstTimeFAQ } from "@/components/FirstTimeFAQ";
import { Footer } from "@/components/Footer";
import { GivingSection } from "@/components/GivingSection";
import { GroupsSection } from "@/components/GroupsSection";
import { Hero } from "@/components/Hero";
import { KidsSection } from "@/components/KidsSection";
import { MessagesSection } from "@/components/MessagesSection";
import { Navbar } from "@/components/Navbar";
import { NextSteps } from "@/components/NextSteps";

export default function Home() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <CampusSection />
        <FirstTimeFAQ />
        <KidsSection />
        <MessagesSection />
        <GroupsSection />
        <NextSteps />
        <GivingSection />
      </main>
      <Footer />
    </AppProvider>
  );
}
