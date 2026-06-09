import { motion } from "framer-motion";
import { Network, Building2, Handshake, Globe2 } from "lucide-react";
import PageShell from "@/components/PageShell";

const benefits = [
  { icon: Building2, title: "Member Enterprises", desc: "Directory of sovereign businesses owned by the Royal Priesthood." },
  { icon: Handshake, title: "Sovereign Partnerships", desc: "B2B introductions across nations, tribes, and industries." },
  { icon: Network, title: "Onyx DLT Settlement", desc: "Zero-fee trade settlement on Blanch Onyx DLT." },
  { icon: Globe2, title: "Global Reach", desc: "Member nodes across every inhabited continent." },
];

const sectors = [
  "Sacred Agriculture",
  "Sovereign Finance",
  "Heritage Crafts",
  "Clean Energy",
  "AI & Technology",
  "Trade & Logistics",
  "Healing Arts",
  "Education & Media",
];

const UniversalBusinessNetwork = () => {
  return (
    <PageShell
      eyebrow="UBN"
      title={
        <>
          <span className="text-gradient-gold">Universal Business Network</span>
        </>
      }
      subtitle="A sovereign B2B mesh connecting member enterprises, capital, and trade across the Royal Priesthood."
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-5 mb-16">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-sacred rounded-xl p-6"
          >
            <b.icon className="w-7 h-7 text-primary mb-3" />
            <h3 className="font-display text-lg text-foreground mb-2">{b.title}</h3>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto card-sacred rounded-2xl p-8 mb-16">
        <h2 className="font-display text-2xl text-center mb-6 text-foreground">
          Sovereign <span className="text-gradient-gold">Sectors</span>
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {sectors.map((s) => (
            <span
              key={s}
              className="px-4 py-2 rounded-full border border-primary/30 text-sm text-white hover:bg-primary/10 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display italic text-xl text-white mb-3">
          "The wealth of the sinner is laid up for the just."
        </p>
        <cite className="text-sm text-primary/80">— Proverbs 13:22</cite>
      </div>
    </PageShell>
  );
};

export default UniversalBusinessNetwork;
