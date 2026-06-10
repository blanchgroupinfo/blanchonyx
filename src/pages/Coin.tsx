import { motion } from "framer-motion";
import { Crown, Shield, Globe, Scale, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";

const properties = [
  { label: "Symbol", value: "BOC" },
  { label: "Full Name", value: "Blanch Onyx Coin" },
  { label: "Network", value: "Blanch Onyx DLT" },
  { label: "Supply", value: "Sovereign-Issued" },
  { label: "Fees", value: "Zero" },
  { label: "Settlement", value: "Sub-second" },
];

const pillars = [
  { icon: Crown, title: "Reserve of the Kingdom", desc: "The reserve coin of the Royal Priesthood — used for trade, settlement, and tithe across the Blanch Onyx Ecosystem." },
  { icon: Shield, title: "Sovereign Backing", desc: "Backed by heritage land, member enterprises, and the irrevocable Blanch Group Trust." },
  { icon: Globe, title: "Universal Acceptance", desc: "Accepted across Universal Business Networks, the Virtual Marketplace, and Smart City corridors." },
  { icon: Scale, title: "Righteous Issuance", desc: "Minted under Council oversight — no inflation by decree, no mining waste." },
];

const Coin = () => (
  <PageShell
    eyebrow="The Reserve of the Kingdom"
    title={<><span className="text-gradient-gold">Blanch Onyx Coin</span></>}
    subtitle="BOC — the sovereign reserve coin powering trade, settlement, and stewardship across the Royal Priesthood."
  >
    {/* Coin hero */}
    <div className="max-w-3xl mx-auto mb-16 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full rounded-full border-4 border-primary/70 bg-gradient-to-br from-primary/40 via-background to-primary/10 flex items-center justify-center shadow-2xl glow-divine"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="font-display text-6xl md:text-7xl text-gradient-gold font-bold">BOC</div>
        </motion.div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {properties.map((p) => (
          <div key={p.label} className="card-sacred rounded-xl p-4 text-center">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.label}</div>
            <div className="font-display text-lg text-gradient-gold mt-1">{p.value}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5 mb-20">
      {pillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="card-sacred rounded-2xl p-6"
        >
          <p.icon className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display text-xl text-foreground mb-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground">{p.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="max-w-3xl mx-auto text-center card-sacred rounded-2xl p-10">
      <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
      <p className="font-display italic text-lg text-white mb-2">
        "Honour the LORD with thy substance, and with the firstfruits of all thine increase."
      </p>
      <cite className="text-sm text-primary/80">— Proverbs 3:9</cite>
    </div>
  </PageShell>
);

export default Coin;
