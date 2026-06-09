import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Heritage from "@/components/Heritage";
import HeedProgram from "@/components/HeedProgram";
import ShieldAI from "@/components/ShieldAI";
import EliteNetwork from "@/components/EliteNetwork";
import DltShowcase from "@/components/DltShowcase";
import Vision from "@/components/Vision";
import SmartCitiesGallery from "@/components/SmartCitiesGallery";
import Downloads from "@/components/Downloads";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScriptureBanner from "@/components/ScriptureBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ScriptureBanner
        verse="A chosen generation, a royal priesthood, an holy nation"
        citation="1 Peter 2:9"
      />
      <section id="heritage">
        <Heritage />
      </section>
      <section id="heed">
        <HeedProgram />
      </section>
      <ScriptureBanner
        verse="My people are destroyed for lack of knowledge"
        citation="Hosea 4:6"
      />
      <section id="shield">
        <ShieldAI />
      </section>
      <section id="dlt">
        <DltShowcase />
      </section>
      <section id="elite-network">
        <EliteNetwork />
      </section>
      <section id="vision">
        <Vision />
      </section>
      <SmartCitiesGallery />
      <ScriptureBanner
        verse="The wealth of the sinner is laid up for the just"
        citation="Proverbs 13:22"
      />
      <section id="downloads">
        <Downloads />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
