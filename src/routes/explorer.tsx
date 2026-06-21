import React, { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, Layers, Activity, Cpu, Clock, Hash } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

function randHex(len = 16) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}
function randAddr() { return "BNX" + randHex(10).toUpperCase(); }
function randAmount() { return (Math.random() * 9000 + 100).toFixed(2); }

function generateBlock(height) {
  return {
    height,
    hash: randHex(32),
    txCount: Math.floor(Math.random() * 80) + 10,
    validator: "Node-" + String.fromCharCode(65 + (height % 17)),
    time: new Date().toLocaleTimeString(),
  };
}
function generateTx() {
  return {
    hash: randHex(20),
    from: randAddr(),
    to: randAddr(),
    amount: randAmount(),
    token: ["BOX", "BNX", "SHLD"][Math.floor(Math.random() * 3)],
    status: "confirmed",
    time: new Date().toLocaleTimeString(),
  };
}

export default function ExplorerPage() {
  const [blocks, setBlocks] = useState(() => Array.from({ length: 8 }, (_, i) => generateBlock(1422704 + (7 - i))));
  const [txs, setTxs] = useState(() => Array.from({ length: 10 }, generateTx));
  const [search, setSearch] = useState("");
  const heightRef = useRef(1422712);

  useEffect(() => {
    const t = setInterval(() => {
      heightRef.current++;
      const newBlock = generateBlock(heightRef.current);
      setBlocks(prev => [newBlock, ...prev.slice(0, 7)]);
      const newTx = generateTx();
      setTxs(prev => [newTx, ...prev.slice(0, 9)]);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">EXPLORER</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-400 tracking-wider uppercase">Live</span>
            </div>
            <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Blanch Onyx DLT</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Chain Explorer</h1>
          <p className="font-display text-lg text-muted-foreground italic">Real-time block and transaction explorer for the Blanch Onyx 8-Layer DAG</p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by block height, transaction hash, or address..."
            className="w-full pl-11 pr-4 py-4 bg-card border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Blocks */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Latest Blocks</h2>
            </div>
            <div className="space-y-2">
              {blocks.map((b, i) => (
                <motion.div
                  key={b.height}
                  initial={i === 0 ? { opacity: 0, x: -20 } : { opacity: 1 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-border/30 bg-card p-4 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-primary/60" />
                      <span className="font-heading text-sm text-primary">#{b.height.toLocaleString()}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3" />{b.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono truncate mb-1"><Hash className="w-3 h-3 inline mr-1" />{b.hash}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{b.txCount} transactions</span>
                    <span className="text-primary/60">Validator: {b.validator}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Latest Transactions</h2>
            </div>
            <div className="space-y-2">
              {txs.map((tx, i) => (
                <motion.div
                  key={tx.hash}
                  initial={i === 0 ? { opacity: 0, x: 20 } : { opacity: 1 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-border/30 bg-card p-4 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] text-primary font-mono truncate max-w-[60%]">{tx.hash}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[9px] text-green-400">{tx.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <div>
                      <span className="text-muted-foreground/60">From:</span> <span className="font-mono">{tx.from.slice(0, 10)}...</span>
                    </div>
                    <span className="font-heading text-primary">{tx.amount} {tx.token}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                    <div>
                      <span className="text-muted-foreground/60">To:</span> <span className="font-mono">{tx.to.slice(0, 10)}...</span>
                    </div>
                    <span className="text-muted-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3" />{tx.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/explorer')({
  component: ExplorerPage,
});