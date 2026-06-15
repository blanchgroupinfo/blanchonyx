import PageShell from "@/components/PageShell";
import DltShowcase from "@/components/DltShowcase";
import { motion } from "framer-motion";
import { Layers, Cpu, Lock, Globe } from "lucide-react";

const layers = [
  { n: "1", name: "Liquidity Layer", hebrew: "א", desc: "Aleph — divine origin of value, the breath of liquidity." },
  { n: "2", name: "Identity & Accounts", hebrew: "ב", desc: "Bet — the house, sovereign identity of every account." },
  { n: "3", name: "Logistics & Trade", hebrew: "ג", desc: "Gimel — movement, the camel of righteous trade." },
  { n: "4", name: "Access Gateway", hebrew: "ד", desc: "Dalet — the door, gateway to sovereign networks." },
  { n: "5", name: "Analytics & Insight", hebrew: "ה", desc: "Heh — revelation through holy intelligence." },
  { n: "6", name: "Connection Mesh", hebrew: "ו", desc: "Vav — the nail, binding sovereign nodes." },
  { n: "7", name: "Security & Audit", hebrew: "ז", desc: "Zayin — sword of protection, audit, and finality." },
  { n: "8", name: "Storage Ledger", hebrew: "ח", desc: "Chet — sacred enclosure, immutable storage." },
];

const features = [
  { icon: Layers, title: "8-Layer DAG", desc: "Parallel directed-acyclic-graph architecture for infinite scalability." },
  { icon: Cpu, title: "22 Sacred Nodes", desc: "Functions mapped to the Ancient Hebrew alphabet." },
  { icon: Lock, title: "No Fees · No Mining", desc: "Righteous consensus without exploitation or waste." },
  { icon: Globe, title: "22.5 Quadrillion TPS+∞", desc: "Throughput engineered for the global Royal Priesthood." },
];

const DLTPage = () => {
  return (
    <PageShell
      eyebrow="Sovereign Infrastructure"
      title={
        <>
          <span className="text-gradient-gold">Blanch Onyx DLT</span>
        </>
      }
      subtitle="A divinely-architected distributed ledger — 8 layers, 22 Hebrew-anchored nodes, infinite throughput."
    >
      <div className="-mx-6 mb-16">
        <DltShowcase />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4 mb-16">
        {features.map((f) => (
          <div key={f.title} className="card-sacred rounded-xl p-6 text-center">
            <f.icon className="w-7 h-7 text-primary mx-auto mb-3" />
            <h3 className="font-display text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl text-center mb-10 text-foreground">
          The <span className="text-gradient-gold">8 Sacred Layers</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {layers.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-sacred rounded-xl p-6 flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center shrink-0">
                <span className="font-display text-3xl text-primary">{l.hebrew}</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-secondary">Layer {l.n}</div>
                <h3 className="font-display text-xl text-foreground">{l.name}</h3>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default DLTPage;
