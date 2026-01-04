import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeedProgram from "@/components/HeedProgram";
import ShieldAI from "@/components/ShieldAI";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section id="heed">
        <HeedProgram />
      </section>
      <section id="shield">
        <ShieldAI />
      </section>
      <section id="vision">
        <Vision />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
