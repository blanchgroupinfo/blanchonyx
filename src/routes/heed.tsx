import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, BookOpen, Briefcase, Building2, Globe, Users, Leaf, Cpu } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const PILLARS = [
  {
    letter: "H", icon: Heart, title: "Health",
    color: "text-rose-400 border-rose-400/30 bg-rose-400/5",
    desc: "Promoting holistic wellness and healing through divine principles and community care. Our Health pillar encompasses physical, mental, and spiritual well-being, providing access to clean food systems, wellness programs, and community health initiatives rooted in Torah principles.",
    initiatives: ["Non-GMO Food Systems", "Community Wellness Centers", "Holistic Healing Programs", "Clean Water Access", "Mental Health Support"],
  },
  {
    letter: "E", icon: BookOpen, title: "Education",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    desc: "Advancing knowledge, wisdom, and understanding rooted in truth and spiritual enlightenment. We develop curriculum, digital learning platforms, and scholarship programs to empower the next generation of sovereign thinkers.",
    initiatives: ["H.E.E.D. Curriculum", "Digital Learning Platform", "Scholarship Programs", "Torah Study Programs", "STEM Sovereignty Initiative"],
  },
  {
    letter: "E", icon: Briefcase, title: "Enterprising",
    color: "text-primary border-primary/30 bg-primary/5",
    desc: "Building righteous businesses and ventures that create sustainable prosperity for all. The Enterprising pillar supports kingdom-aligned entrepreneurs, business incubation, and the Blanch Corridor commerce network.",
    initiatives: ["Business Incubation Program", "Blanch Corridor Commerce", "Kingdom-Aligned Ventures", "Startup Funding Access", "Global Business Network"],
  },
  {
    letter: "D", icon: Building2, title: "Development",
    color: "text-green-400 border-green-400/30 bg-green-400/5",
    desc: "Fostering sustainable growth and eco-friendly smart cities for future generations. Development covers infrastructure, smart city construction, clean energy, and sustainable housing solutions.",
    initiatives: ["Smart City Yarawashalam", "Eco-Friendly Housing", "Clean Energy Grid", "H.E.E.D. Districts", "Sustainable Infrastructure"],
  },
];

const SCRIPTURE = [
  { text: "My people are destroyed for lack of knowledge.", ref: "Hosea 4:6" },
  { text: "For thou art an holy people unto Most High AHAYAH thy Power.", ref: "Deuteronomy 14:2" },
];

export default function HeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">H.E.E.D. PROGRAM</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">The Framework</p>
          <h1 className="font-heading text-3xl md:text-6xl tracking-[0.15em] text-foreground mb-4">H.E.E.D.</h1>
          <p className="font-heading text-sm tracking-[0.3em] text-primary/60 mb-6">
            Health · Education · Enterprising · Development
          </p>
          <p className="font-display text-lg text-muted-foreground italic max-w-3xl mx-auto">
            A framework designed to stabilize global communities through digital currencies, emerging ventures, and sustainable development — rooted in divine law and sovereign principles.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Pillar cards */}
        <div className="space-y-8 mb-20">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`border ${p.color} p-8 flex flex-col md:flex-row gap-8`}
            >
              <div className="text-center shrink-0 md:w-32">
                <div className={`w-16 h-16 border ${p.color} flex items-center justify-center mx-auto mb-3`}>
                  <p className="font-heading text-3xl text-primary">{p.letter}</p>
                </div>
                <p.icon className="w-6 h-6 mx-auto text-primary/60" />
                <p className="font-heading text-base text-foreground mt-2">{p.title}</p>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {p.initiatives.map(init => (
                    <div key={init} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scripture */}
        <div className="space-y-6 max-w-2xl mx-auto text-center">
          {SCRIPTURE.map(v => (
            <blockquote key={v.ref} className="border border-primary/20 bg-primary/5 p-6">
              <p className="font-display italic text-foreground/80 text-lg">{v.text}</p>
              <cite className="text-primary/60 text-xs tracking-wider mt-3 block">— {v.ref}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/heed')({
  component: HeedPage,
});