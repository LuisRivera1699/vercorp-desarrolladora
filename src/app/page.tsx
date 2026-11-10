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
import WhatsAppButton from "@/components/WhatsAppButton";
import { getHome } from "@/lib/home/fetch";
import { deliveredStats } from "@/lib/home/stats";
import { getProjects } from "@/lib/projects/fetch";

export default async function Home() {
  const [home, projects] = await Promise.all([getHome(), getProjects()]);
  const stats = deliveredStats(home.delivered.items);

  return (
    <>
      <Header content={home.header} />
      <main>
        <Hero content={home.hero} />
        <Stats metrics={home.hero.metrics} stats={stats} />
        <HowItWorks content={home.steps} />
        <ActiveProjects content={home.forSale} />
        <Benefits content={home.why} stats={stats} />
        <GrowBand content={home.grow} />
        <SoldProjects content={home.delivered} stats={stats} />
        <Inquiry content={home.contact} projects={projects} />
      </main>
      <Footer content={home.footer} contact={home.contact} />
      <WhatsAppButton />
    </>
  );
}
