import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Heritage from "@/components/Heritage";
import HeedProgram from "@/components/HeedProgram";
import ShieldAI from "@/components/ShieldAI";
import EliteNetwork from "@/components/EliteNetwork";
import Vision from "@/components/Vision";
import Downloads from "@/components/Downloads";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section id="heritage">
        <Heritage />
      </section>
      <section id="heed">
        <HeedProgram />
      </section>
      <section id="shield">
        <ShieldAI />
      </section>
      <section id="elite-network">
        <EliteNetwork />
      </section>
      <section id="vision">
        <Vision />
      </section>
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
