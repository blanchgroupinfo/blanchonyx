import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Zap, Infinity as InfinityIcon } from "lucide-react";
import dltImg from "@/assets/blanch-onyx-dlt.png";

const formatTps = (n: number) => {
  if (n >= 1e15) return (n / 1e15).toFixed(2) + "Q";
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  return n.toLocaleString();
};

const DltShowcase = () => {
  const [tps, setTps] = useState(22.5e15);
  const [nodes, setNodes] = useState(22);
  const [block, setBlock] = useState(1_421_337);

  useEffect(() => {
    const i = setInterval(() => {
      setTps(22.5e15 + Math.random() * 5e14);
      setNodes(22 + Math.floor(Math.random() * 3));
      setBlock((b) => b + Math.floor(Math.random() * 7) + 1);
    }, 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="dlt" className="py-24 md:py-32 relative overflow-hidden section-pattern">
      <div className="absolute inset-0 bg-gradient-sacred pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
              Blanch Onyx DLT
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            <span className="text-gradient-gold">8-Layer DAG</span>
            <span className="text-foreground"> · 22 Sacred Nodes</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            A divinely-architected distributed ledger anchored in Ancient Hebrew functions —
            infinite throughput, zero fees, no mining.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
            <motion.img
              src={dltImg}
              alt="Blanch Onyx DLT 8-Layer DAG with 22 Ancient Hebrew Nodes"
              className="relative w-full max-w-xl mx-auto"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-sacred rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-secondary animate-ping" />
                </div>
                <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                  Live Network · Mainnet
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">TPS Throughput</div>
                  <motion.div
                    key={tps}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold"
                  >
                    {formatTps(tps)}
                  </motion.div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Active Nodes</div>
                  <motion.div
                    key={nodes}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold"
                  >
                    {nodes}
                  </motion.div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Block Height</div>
                  <motion.div
                    key={block}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold"
                  >
                    {block.toLocaleString()}
                  </motion.div>
                </div>
              </div>

              {/* TPS bar */}
              <div className="mt-6">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-secondary"
                    animate={{ width: ["10%", "100%", "10%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Genesis</span>
                  <span>22.5 Quadrillion TPS + ∞</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, label: "No Fees" },
                { icon: Activity, label: "No Mining" },
                { icon: InfinityIcon, label: "Infinite Scale" },
              ].map((f) => (
                <div key={f.label} className="card-sacred rounded-xl p-4 text-center">
                  <f.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-xs text-white font-medium">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DltShowcase;
