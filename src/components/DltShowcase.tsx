import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, Zap, Infinity as InfinityIcon } from "lucide-react";
import dltImg from "@/assets/blanch-onyx-dlt.png";

const formatTps = (n: number) => {
  if (n >= 1e15) return (n / 1e15).toFixed(3) + "Q";
  if (n >= 1e12) return (n / 1e12).toFixed(3) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(3) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(3) + "M";
  return n.toLocaleString();
};

// 22 nodes arranged in a sacred DAG, positioned across 8 layers
const NODES = Array.from({ length: 22 }).map((_, i) => {
  const layer = Math.floor(i / 3); // 0..7
  const perLayer = layer === 7 ? 1 : 3;
  const idxInLayer = i % 3;
  const x = 10 + (layer / 7) * 80;
  const y =
    perLayer === 1
      ? 50
      : 18 + (idxInLayer / (perLayer - 1)) * 64;
  return { id: i, x, y, layer };
});

// Edges between consecutive layers (DAG)
const EDGES: { from: number; to: number }[] = [];
NODES.forEach((n) => {
  NODES.filter((m) => m.layer === n.layer + 1).forEach((m) => {
    EDGES.push({ from: n.id, to: m.id });
  });
});

const DltShowcase = () => {
  // Monotonically rising counters — infinite horizontal scaling
  const startRef = useRef(Date.now());
  const tpsBaseRef = useRef(22.5e15);
  const blockBaseRef = useRef(1_421_337);
  const [tps, setTps] = useState(tpsBaseRef.current);
  const [nodes, setNodes] = useState(22);
  const [block, setBlock] = useState(blockBaseRef.current);

  useEffect(() => {
    const i = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      // Compound growth — every second TPS scales upward, never dips.
      const growth = 1 + elapsed * 0.0125 + Math.pow(elapsed, 1.15) * 0.0008;
      setTps(tpsBaseRef.current * growth);
      setNodes((n) => n + Math.floor(Math.random() * 2)); // only rises
      setBlock((b) => b + 3 + Math.floor(Math.random() * 6));
    }, 1000);
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
          {/* Still photo + animated DAG overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-xl mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
            <img
              src={dltImg}
              alt="Blanch Onyx DLT 8-Layer DAG with 22 Ancient Hebrew Nodes"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Animated DAG overlay */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <linearGradient id="edge" x1="0" x2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {EDGES.map((e, idx) => {
                const a = NODES[e.from];
                const b = NODES[e.to];
                return (
                  <line
                    key={idx}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#edge)"
                    strokeWidth="0.25"
                    strokeDasharray="1 1.5"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-10"
                      dur={`${1.5 + (idx % 5) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
              {NODES.map((n) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="1.4" fill="hsl(var(--primary))">
                    <animate
                      attributeName="r"
                      values="1.1;1.8;1.1"
                      dur={`${2 + (n.id % 4) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;1;0.6"
                      dur={`${2 + (n.id % 4) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={n.x} cy={n.y} r="0.6" fill="hsl(var(--secondary))" />
                </g>
              ))}
              {/* Packets traveling along edges */}
              {EDGES.filter((_, i) => i % 4 === 0).map((e, idx) => {
                const a = NODES[e.from];
                const b = NODES[e.to];
                return (
                  <circle key={`p${idx}`} r="0.5" fill="hsl(var(--secondary))">
                    <animate attributeName="cx" from={a.x} to={b.x} dur={`${1.2 + (idx % 5) * 0.25}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" from={a.y} to={b.y} dur={`${1.2 + (idx % 5) * 0.25}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur={`${1.2 + (idx % 5) * 0.25}s`} repeatCount="indefinite" />
                  </circle>
                );
              })}
            </svg>
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
                  Live Network · Mainnet · Infinite Horizontal Scaling
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">TPS Throughput</div>
                  <div className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold tabular-nums">
                    {formatTps(tps)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Active Nodes</div>
                  <div className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold tabular-nums">
                    {nodes}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Block Height</div>
                  <div className="font-display text-2xl md:text-3xl text-gradient-gold font-semibold tabular-nums">
                    {block.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-secondary opacity-80" />
                  <motion.div
                    className="absolute inset-y-0 w-24 bg-white/30 blur-md"
                    animate={{ x: ["-10%", "120%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Genesis</span>
                  <span>∞ Unlimited Horizontal Scale</span>
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
