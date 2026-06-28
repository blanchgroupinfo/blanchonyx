import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Users, Compass, BookOpen, Star, Crown, Landmark, Heart } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center justify-center gap-2">
      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
      {children}
    </p>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Eyebrow>About Blanch Onyx</Eyebrow>
              <h1 className="font-display text-4xl md:text-7xl font-medium tracking-tight mt-6 mb-6">
                Our <em>Divine</em> Purpose
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans">
                A Sovereign Kingdom-Aligned Trust and Global Covenant, dedicated to elevating the chosen generation through faith, unity, and advanced technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission / Covenant Quote */}
        <section className="py-16 border-t border-b border-border/30 bg-card/20">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Heart className="w-10 h-10 text-primary mx-auto opacity-80" />
              <blockquote className="text-2xl md:text-4xl font-display italic text-foreground leading-normal px-4">
                “Together, we inspire life, hope, and love through faith, unity, and divine purpose.”
              </blockquote>
              <div className="flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase text-primary font-bold">
                <span>The Global Covenant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Royal Priesthood Assembly</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Eyebrow>The Foundation</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-display font-medium mt-4">Four Pillars of Sovereign Grace</h2>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-sans">
                Our infrastructure is built to protect, enable, and sustain our global family.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Crown,
                  title: "Royal Assembly",
                  desc: "Uniting the chosen royal priesthood in divine covenant, establishing a legacy of honor, service, and spiritual elevation across all borders."
                },
                {
                  icon: Shield,
                  title: "Sovereign Trust",
                  desc: "Securing physical and digital wealth within an autonomous legal framework, ensuring the protection of heritage and assets for future generations."
                },
                {
                  icon: Landmark,
                  title: "Kingdom Commerce",
                  desc: "Nurturing ethical, faith-driven trade and decentralized finance through customized state-of-the-art DLT protocols, vaults, and smart instruments."
                },
                {
                  icon: BookOpen,
                  title: "H.E.E.D. Program",
                  desc: "Empowering communities globally via our Health, Education, Enterprise, and Development framework to eliminate poverty and cultivate divine legacy."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card/50 border border-border/40 p-8 rounded-lg relative overflow-hidden group hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                  <item.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display text-xl font-medium mb-3 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Narrative Section */}
        <section className="py-24 md:py-32 bg-card/10 border-t border-border/25">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <Eyebrow>Sovereign Legacy</Eyebrow>
                <h3 className="text-3xl md:text-5xl font-display font-medium leading-tight">
                  Guiding Humanity Toward <em>Righteous</em> Progress
                </h3>
                <p className="text-muted-foreground leading-relaxed text-justify font-sans">
                  Blanch Onyx represents more than modern technology or financial systems; it is a sacred space designed to enable covenant living in a digital age. Guided by the eternal principles of the Most High, we build structures that secure freedom, inspire absolute hope, and activate divine purpose.
                </p>
                <p className="text-muted-foreground leading-relaxed text-justify font-sans">
                  From our decentralized DLT Network that processes transactions with speed and cryptographic certainty, to our private membership, social clubs, and H.E.E.D. programs—every element of the Blanch Onyx ecosystem is meticulously designed to support a royal priesthood.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-zinc-950/90 text-white p-8 md:p-12 rounded-xl border border-primary/20 shadow-royal relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <Compass className="w-10 h-10 text-primary mb-6" />
                <h4 className="font-display text-2xl text-primary font-medium mb-4">Our Vision</h4>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 text-justify font-sans">
                  To become the primary global anchor for righteous governance, sovereign decentralized systems, and community-centric economic elevation. We aim to construct sustainable, clean energy-powered smart cities, secure digital banks, and collaborative tools aligned under divine covenant.
                </p>
                <div className="border-t border-neutral-800 pt-6 flex items-center justify-between text-xs tracking-widest uppercase text-neutral-400">
                  <span>Praise Most High</span>
                  <span className="text-primary font-bold">AHAYAH BA SHAM YASHAYA</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
