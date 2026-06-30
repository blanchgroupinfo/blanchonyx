import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart2, Zap, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const PAIRS = [
  { pair: "BOX/USD", base: 22.74 },
  { pair: "BNX/USD", base: 0.88 },
  { pair: "SHLD/USD", base: 4.21 },
  { pair: "BID/USD", base: 1.12 },
];

function useLiveCandles(base, count = 40) {
  const [candles, setCandles] = useState(() => {
    let price = base;
    return Array.from({ length: count }, (_, i) => {
      price = parseFloat((price + (Math.random() - 0.48) * price * 0.01).toFixed(3));
      return { i, price, vol: Math.floor(Math.random() * 10000 + 1000) };
    });
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1].price;
        const next = parseFloat((last + (Math.random() - 0.48) * last * 0.008).toFixed(3));
        return [...prev.slice(1), { i: prev[prev.length - 1].i + 1, price: next, vol: Math.floor(Math.random() * 10000 + 1000) }];
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return candles;
}

function PairChart({ pair }) {
  const data = useLiveCandles(pair.base);
  const current = data[data.length - 1]?.price;
  const prev = data[data.length - 2]?.price;
  const up = current >= prev;

  return (
    <div className="border border-border bg-card p-5 card-lift">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-heading text-base text-foreground">{pair.pair}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-heading text-lg ${up ? "text-green-400" : "text-destructive"}`}>${current?.toFixed(3)}</span>
            {up ? <TrendingUp className="w-3.5 h-3.5 text-green-400" /> : <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] text-green-400">LIVE</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${pair.pair}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={up ? "#22c55e" : "#ef4444"} stopOpacity={0.25} />
              <stop offset="95%" stopColor={up ? "#22c55e" : "#ef4444"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="price" stroke={up ? "#22c55e" : "#ef4444"} strokeWidth={1.5} fill={`url(#grad-${pair.pair})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow mb-4 justify-center">
      <span />
      {children}
      <span />
    </div>
  );
}

export default function TradingHubPage() {
  const [activePair, setActivePair] = useState(PAIRS[0]);
  const mainData = useLiveCandles(activePair.base, 60);
  const currentPrice = mainData[mainData.length - 1]?.price;

  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [filled, setFilled] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Eyebrow>Sovereign Capital Markets</Eyebrow>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">
            Trading <br /><em>Hub</em>
          </h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Real-time sovereign exchange pricing and non-custodial limit trading on the Blanch Onyx DLT
          </p>
        </motion.div>

        <div className="flex gap-2 flex-wrap mb-6">
          {PAIRS.map(p => (
            <button
              key={p.pair}
              onClick={() => { setActivePair(p); setFilled(false); }}
              className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase font-heading transition-all ${activePair.pair === p.pair ? "bg-primary text-primary-foreground" : "border border-border/40 text-muted-foreground hover:border-primary/30 hover:text-primary"}`}
            >
              {p.pair}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main chart */}
          <div className="lg:col-span-2 border border-border bg-card p-6 card-lift">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl text-foreground">{activePair.pair}</h2>
                <p className="font-heading text-2xl text-primary">${currentPrice?.toFixed(3)}</p>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary/60" />
                <span className="text-[10px] text-muted-foreground">8-Layer DAG · Zero Fee</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mainData}>
                <defs>
                  <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(40 50% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(40 50% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,165,90,0.06)" />
                <XAxis dataKey="i" hide />
                <YAxis domain={['dataMin', 'dataMax']} tick={{ fill: "rgba(197,165,90,0.5)", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(0 0% 7%)", border: "1px solid rgba(197,165,90,0.2)", borderRadius: 4 }}
                  formatter={v => ["$" + v, activePair.pair]}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(40 50% 55%)" strokeWidth={2} fill="url(#mainGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order panel */}
          <div className="border border-border bg-card p-6 space-y-5 card-lift">
            <h3 className="font-heading text-sm tracking-[0.1em] text-foreground">Place Order</h3>
            <div className="flex gap-1">
              {["buy", "sell"].map(s => (
                <button key={s} onClick={() => setSide(s)} className={`flex-1 py-2.5 text-[11px] tracking-[0.1em] uppercase font-heading transition-all ${side === s ? (s === "buy" ? "bg-green-500/20 border border-green-500/50 text-green-400" : "bg-destructive/20 border border-destructive/50 text-destructive") : "border border-border/40 text-muted-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {["market", "limit"].map(ot => (
                <button key={ot} onClick={() => setOrderType(ot)} className={`flex-1 py-2 text-[10px] tracking-[0.1em] uppercase transition-all ${orderType === ot ? "bg-primary/20 border border-primary/40 text-primary" : "border border-border/40 text-muted-foreground"}`}>{ot}</button>
              ))}
            </div>
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">Price</label>
              <input readOnly value={orderType === "market" ? currentPrice?.toFixed(3) : ""} placeholder={orderType === "limit" ? "Limit price..." : ""} className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">Amount (BOX)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40" />
            </div>
            <div className="text-[10px] text-muted-foreground flex justify-between border-t border-border/20 pt-3">
              <span>Total</span>
              <span className="text-primary">${amount ? (parseFloat(amount) * currentPrice).toFixed(2) : "0.00"}</span>
            </div>
            <button
              onClick={() => setFilled(true)}
              className={`w-full py-3.5 font-heading text-xs tracking-[0.15em] uppercase transition-all ${side === "buy" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-destructive hover:bg-destructive/90 text-white"}`}
            >
              {filled ? "✓ Order Filled on DLT" : `${side === "buy" ? "Buy" : "Sell"} ${activePair.pair.split("/")[0]}`}
            </button>
            <div className="flex items-center gap-2 justify-center text-[9px] text-muted-foreground/60">
              <Zap className="w-3 h-3 text-primary/40" />
              Zero fees · Instant DLT Settlement
            </div>
          </div>
        </div>

        {/* Mini charts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {PAIRS.map(p => <PairChart key={p.pair} pair={p} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/trading-hub')({
  component: TradingHubPage,
});