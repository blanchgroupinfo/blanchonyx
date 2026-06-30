import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpDown, TrendingUp, RefreshCw, Zap } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const TOKENS = ["BOX", "BNX", "BID", "BHD", "SHLD"];
const PAIRS = [
  { pair: "BOX/BNX", price: 0.4412, change: 2.14 },
  { pair: "BOX/BID", price: 1.1203, change: 0.88 },
  { pair: "BOX/BHD", price: 0.0892, change: -0.32 },
  { pair: "BOX/SHLD", price: 2.3301, change: 5.11 },
  { pair: "BNX/BID", price: 2.5401, change: 1.20 },
  { pair: "SHLD/BHD", price: 0.1199, change: -1.03 },
];

function useLivePrice(base) {
  const [price, setPrice] = useState(base);
  useEffect(() => {
    const i = setInterval(() => setPrice(p => parseFloat(Math.max(0.001, p + (Math.random() - 0.48) * p * 0.005).toFixed(4))), 1200);
    return () => clearInterval(i);
  }, []);
  return price;
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

export default function ExchangePage() {
  const [fromToken, setFromToken] = useState("BOX");
  const [toToken, setToToken] = useState("BNX");
  const [fromAmount, setFromAmount] = useState("");
  const [swapped, setSwapped] = useState(false);
  const rate = useLivePrice(0.4412);

  const toAmount = fromAmount ? (parseFloat(fromAmount) * rate).toFixed(4) : "";

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Eyebrow>Sovereign Token Exchange</Eyebrow>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">
            Blanch <br /><em>Exchange</em>
          </h1>
          <p className="font-display text-lg text-muted-foreground italic">Zero-fee sovereign token swaps on the Blanch Onyx DLT</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Swap panel */}
          <div className="border border-border bg-card p-8 card-lift">
            <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-6">Swap Tokens</h2>
            <div className="space-y-4">
              <div className="border border-border/40 bg-background p-4">
                <label className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-2 block">From</label>
                <div className="flex items-center gap-3">
                  <select value={fromToken} onChange={e => setFromToken(e.target.value)} className="bg-transparent text-primary font-heading text-sm focus:outline-none border border-border/40 px-3 py-2">
                    {TOKENS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                    className="flex-1 bg-transparent text-right text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={handleSwap} className="w-10 h-10 border border-primary/30 bg-card flex items-center justify-center hover:bg-primary/10 transition-all group">
                  <ArrowUpDown className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>

              <div className="border border-border/40 bg-background p-4">
                <label className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-2 block">To</label>
                <div className="flex items-center gap-3">
                  <select value={toToken} onChange={e => setToToken(e.target.value)} className="bg-transparent text-primary font-heading text-sm focus:outline-none border border-border/40 px-3 py-2">
                    {TOKENS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input readOnly value={toAmount} placeholder="0.00" className="flex-1 bg-transparent text-right text-lg text-primary placeholder:text-muted-foreground/40 focus:outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
                <span>Rate</span>
                <span className="text-primary">1 {fromToken} = {rate} {toToken}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
                <span>Fee</span>
                <span className="text-green-400">Zero Fee</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
                <span>Settlement</span>
                <span className="text-blue-400">Instant · DLT</span>
              </div>

              <button
                onClick={() => setSwapped(true)}
                className="w-full py-4 bg-primary text-primary-foreground font-heading text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all"
              >
                {swapped ? "✓ Swap Executed on DLT" : "Execute Swap"}
              </button>
            </div>
          </div>

          {/* Live pairs */}
          <div>
            <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-4">Live Pairs</h2>
            <div className="space-y-2">
              {PAIRS.map(p => (
                <div key={p.pair} className="border border-border bg-card p-4 flex items-center justify-between card-lift">
                  <span className="font-heading text-sm text-foreground">{p.pair}</span>
                  <div className="text-right">
                    <p className="font-heading text-sm text-primary tabular-nums">{p.price.toFixed(4)}</p>
                    <p className={`text-[10px] ${p.change >= 0 ? "text-green-400" : "text-destructive"}`}>
                      {p.change >= 0 ? "+" : ""}{p.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-primary/10 bg-primary/5 p-4 text-center">
              <Zap className="w-4 h-4 text-primary mx-auto mb-2" />
              <p className="text-[10px] tracking-[0.15em] text-primary uppercase">Zero Fees · Instant Settlement</p>
              <p className="text-[9px] text-muted-foreground mt-1">All swaps settled on the Blanch Onyx 8-Layer DAG DLT</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/exchange')({
  component: ExchangePage,
});