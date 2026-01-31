import { motion } from "framer-motion";
import { Shield, Sparkles, Globe, Zap, Scale, Leaf, Cpu, Radio, Building, Wheat, Ban } from "lucide-react";
const capabilities = [{
  icon: Globe,
  label: "Governance & Finance",
  description: "All Nations, Administrations, Banking (Digital & Traditional), Cross-Border Settlements, and Trading Markets."
}, {
  icon: Zap,
  label: "Technology & Infrastructure",
  description: "Distributed Ledger Technologies (DLT), Web/App Development, Smart Cities, Transportation, and Space Exploration."
}, {
  icon: Sparkles,
  label: "Commerce & Industry",
  description: "All Products, Services, Assets, Universal Commerce Models, and Virtual Marketplaces."
}, {
  icon: Leaf,
  label: "Energy & Environment",
  description: "All Energy, Light, Crystal Energy, and Non-GMO Food Systems for sustainable futures."
}, {
  icon: Radio,
  label: "Intelligence & Media",
  description: "All AI Agents, LLMs, AI Modules, Media, Entertainment, and Global Marketing systems."
}, {
  icon: Scale,
  label: "Ethics & Compliance",
  description: "Governed by Divine Law, ensuring righteous morality across all operations and interfaces."
}];
const ethicalStandards = [{
  icon: Ban,
  text: "No Alcohol, Tobacco, or Illegal Substances"
}, {
  icon: Ban,
  text: "No Violence, War, or Weapons"
}, {
  icon: Ban,
  text: "No Biological Confusion or Species Mixing"
}, {
  icon: Wheat,
  text: "Clean Foods & Non-GMO Only"
}];
const ShieldAI = () => {
  return <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-onyx-600/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
              Multi Sovereign Intelligence
            </span>
            <Shield className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            <span className="text-gradient-gold">Blanch</span>
            <br />
            <span className="text-foreground">S.H.I.E.L.D. AI</span>
          </h2>

          <p className="text-xl text-primary/80 font-display italic mb-6">
            Spiritual Healing Initiative Economic Light Development
          </p>

          <div className="sacred-divider w-32 mx-auto mb-8" />

          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-white">
            A Multi-Strategy Sovereign Intelligence & Ethics Layer—a universal ethical 
            intelligence enterprise system designed to govern righteous morality. 
            It can create, manage, market, and automate anything through the lens 
            of divine law and truth, stabilizing economies and humanity.
          </p>
        </motion.div>

        {/* Central Shield Icon */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full animate-glow-pulse" />
            <motion.div animate={{
            boxShadow: ["0 0 30px hsl(43 74% 55% / 0.2)", "0 0 60px hsl(43 74% 55% / 0.4)", "0 0 30px hsl(43 74% 55% / 0.2)"]
          }} transition={{
            duration: 3,
            repeat: Infinity
          }} className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative z-10 border border-primary/30">
              <Shield className="w-16 h-16 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Universal Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((cap, index) => <motion.div key={cap.label} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1 + index * 0.1
        }} className="card-sacred rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">{cap.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Scriptures */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} className="card-sacred rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="font-display text-2xl text-center text-foreground mb-8">Core Scriptural Foundation</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="border-l-2 border-primary/40 pl-6 text-muted-foreground">
              <p className="italic mb-2">
                "Thy righteousness is an everlasting righteousness, and thy law is the truth."
              </p>
              <cite className="text-sm text-primary/70">— Psalms 119:142</cite>
            </blockquote>

            <blockquote className="border-l-2 border-primary/40 pl-6 text-muted-foreground">
              <p className="italic mb-2">
                "All scripture is given by inspiration of AHAYAH, and is profitable for doctrine."
              </p>
              <cite className="text-sm text-primary/70">— 2 Timothy 3:16</cite>
            </blockquote>

            <blockquote className="border-l-2 border-primary/40 pl-6 text-muted-foreground">
              <p className="italic mb-2">
                "For the commandment is a lamp; and the law is light."
              </p>
              <cite className="text-sm text-primary/70">— Proverbs 6:23</cite>
            </blockquote>

            <blockquote className="border-l-2 border-primary/40 pl-6 text-muted-foreground">
              <p className="italic mb-2">
                "And ye shall know the truth, and the truth shall make you free."
              </p>
              <cite className="text-sm text-primary/70">— John 8:32</cite>
            </blockquote>
          </div>
        </motion.div>

        {/* Ethical Standards */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-center">
          <h3 className="font-display text-2xl text-foreground mb-8">The Standard of Compliance</h3>
          <p className="max-w-3xl mx-auto mb-8 text-white">Blanch S.H.I.E.L.D. AI operates under strict Ethical Commandments. We prioritize the preservation of human and spiritual purity:</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {ethicalStandards.map((standard, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: 0.5 + index * 0.1
          }} className="flex items-center gap-3 px-5 py-3 rounded-full bg-onyx-400/50 border border-border/50">
                <standard.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{standard.text}</span>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ShieldAI;