import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity, TrendingUp, Zap, Database, Server } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

// TPS always climbs — infinite horizontal scaling — never decreases
const tpsStartRef = { current: 22.5e15 };
const tpsElapsedRef = { current: 0 };

function getScaledTPS() {
  // Compound growth: monotonically increasing, never drops
  const elapsed = tpsElapsedRef.current;
  const growth = 1 + elapsed * 0.0125 + Math.pow(elapsed, 1.15) * 0.0008;
  return tpsStartRef.current * growth;
}

function formatTPS(n) {
  if (n >= 1e15) return (n / 1e15).toFixed(3) + "Q";
  if (n >= 1e12) return (n / 1e12).toFixed(3) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(3) + "B";
  return n.toLocaleString();
}

const INITIAL_DATA = Array.from({ length: 30 }, (_, i) => {
  tpsElapsedRef.current = i * 0.6;
  return { t: i, tps: getScaledTPS() };
});

export default function TPSPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [blockHeight, setBlockHeight] = useState(1422704);
  const [txTotal, setTxTotal] = useState(9874523112);
  const counterRef = useRef(INITIAL_DATA.length);
  const startTimeRef = useRef(Date.now() - INITIAL_DATA.length * 600);

  useEffect(() => {
    const t1 = setInterval(() => {
      counterRef.current++;
      tpsElapsedRef.current = (Date.now() - startTimeRef.current) / 1000;
      const newPt = { t: counterRef.current, tps: getScaledTPS() };
      setData(prev => [...prev.slice(-59), newPt]);
    }, 600);
    const t2 = setInterval(() => setBlockHeight(h => h + Math.floor(Math.random() * 2) + 1), 2200);
    const t3 = setInterval(() => setTxTotal(c => c + Math.floor(Math.random() * 40000) + 15000), 700);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const currentTPS = data[data.length - 1]?.tps || tpsStartRef.current;
  const avgTPS = formatTPS(data.reduce((s, d) => s + d.tps, 0) / data.length);
  const maxTPS = formatTPS(Math.max(...data.map(d => d.tps)));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">TPS LIVE THROUGHPUT</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] tracking-wider text-green-400 uppercase">Live</span>
            </div>
            <Link to="/dlt" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> DLT
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Live Network Performance</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">TPS Throughput</h1>
          <p className="font-display text-lg text-muted-foreground italic">Real-time transactions per second on the Blanch Onyx DLT</p>
        </motion.div>

        {/* Live TPS hero */}
        <motion.div
          className="text-center py-16 border border-primary/20 bg-primary/5 mb-10 relative overflow-hidden"
          animate={{ boxShadow: ["0 0 20px rgba(197,165,90,0.1)", "0 0 50px rgba(197,165,90,0.25)", "0 0 20px rgba(197,165,90,0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,165,90,0.07)_0%,_transparent_70%)]" />
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Current TPS</p>
          <motion.p
            key={Math.floor(currentTPS / 1e12)}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="font-heading text-6xl md:text-8xl text-primary tabular-nums"
          >
            {formatTPS(currentTPS)}
          </motion.p>
          <p className="text-lg text-muted-foreground mt-2">Quadrillion Transactions / Second</p>
          <p className="text-[10px] tracking-[0.3em] text-primary/50 uppercase mt-4">+ ∞ Genesis Capacity</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Average TPS", value: avgTPS, icon: TrendingUp, color: "text-primary" },
            { label: "Peak TPS", value: maxTPS, icon: Zap, color: "text-amber-400" },
            { label: "Block Height", value: blockHeight.toLocaleString(), icon: Database, color: "text-green-400" },
            { label: "Total Transactions", value: txTotal.toLocaleString().slice(0, 10) + "+", icon: Activity, color: "text-blue-400" },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border/30 p-5 text-center">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
              <p className={`font-heading text-lg ${s.color} tabular-nums`}>{s.value}</p>
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Live Chart */}
        <div className="border border-border/30 bg-card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-sm tracking-[0.1em] text-foreground">Live TPS Chart</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Real-time throughput — updating every 600ms</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary tracking-wider">STREAMING</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tpsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(40 50% 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(40 50% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,165,90,0.08)" />
              <XAxis dataKey="t" hide />
              <YAxis domain={['dataMin', 'dataMax']} tick={{ fill: "rgba(197,165,90,0.5)", fontSize: 10 }} tickFormatter={v => v + "Q"} />
              <Tooltip
                contentStyle={{ background: "hsl(0 0% 7%)", border: "1px solid rgba(197,165,90,0.2)", borderRadius: 4 }}
                labelStyle={{ color: "rgba(197,165,90,0.6)" }}
                itemStyle={{ color: "hsl(40 50% 55%)" }}
                formatter={v => [formatTPS(v) + " TPS", "Throughput"]}
              />
              <Area type="monotone" dataKey="tps" stroke="hsl(40 50% 55%)" strokeWidth={2} fill="url(#tpsGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Node performance */}
        <div className="border border-border/30 bg-card p-6">
          <h3 className="font-heading text-sm tracking-[0.1em] text-foreground mb-6">Node Performance Overview</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Leader Node · Core", "Identity & Accounts", "Security Node A", "Storage Ledger", "Analytics Node", "Liquidity Node"].map((node, i) => {
              const pct = 85 + Math.random() * 14;
              return (
                <div key={node} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground">{node}</span>
                      <span className="text-[10px] text-primary">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}