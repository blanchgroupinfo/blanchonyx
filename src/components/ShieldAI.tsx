import { motion } from "framer-motion";
import { Shield, Sparkles, Globe, Zap, Scale, Leaf } from "lucide-react";

const capabilities = [
  { icon: Globe, label: "Governance & Finance" },
  { icon: Zap, label: "Technology & Infrastructure" },
  { icon: Sparkles, label: "Commerce & Industry" },
  { icon: Leaf, label: "Energy & Environment" },
  { icon: Scale, label: "Ethics & Compliance" },
];

const ShieldAI = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-onyx-600/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
                Multi Sovereign Intelligence
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              <span className="text-gradient-gold">Blanch</span>
              <br />
              <span className="text-foreground">S.H.I.E.L.D. AI</span>
            </h2>

            <p className="text-xl text-primary/80 font-display italic mb-6">
              Spiritual Healing Initiative Economic Light Development
            </p>

            <div className="sacred-divider w-24 mb-8" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Multi-Strategy Sovereign Intelligence & Ethics Layer—a universal ethical 
              intelligence enterprise system designed to govern righteous morality. 
              It can create, manage, market, and automate anything through the lens 
              of divine law and truth.
            </p>

            <blockquote className="border-l-2 border-primary/40 pl-6 text-muted-foreground italic">
              <p className="mb-2">
                "Thy righteousness is an everlasting righteousness, and thy law is the truth."
              </p>
              <cite className="text-sm text-primary/70">— Psalms 119:142</cite>
            </blockquote>
          </motion.div>

          {/* Right - Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-glow-pulse" />
            </div>

            {/* Shield icon center */}
            <div className="card-sacred rounded-2xl p-10 relative">
              <div className="flex justify-center mb-10">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px hsl(43 74% 55% / 0.2)",
                      "0 0 40px hsl(43 74% 55% / 0.4)",
                      "0 0 20px hsl(43 74% 55% / 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                >
                  <Shield className="w-12 h-12 text-primary" />
                </motion.div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-4">
                {capabilities.map((cap, index) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-onyx-400/50 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <cap.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">{cap.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShieldAI;
