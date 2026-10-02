import ActiveProjects from "@/components/ActiveProjects";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import GrowBand from "@/components/GrowBand";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Inquiry from "@/components/Inquiry";
import SoldProjects from "@/components/SoldProjects";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Stats />
        <ActiveProjects />
        <Benefits />
        <GrowBand />
        <SoldProjects />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
