import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Coins, TrendingUp, Shield, Zap, Globe, Lock, Activity } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

function LivePrice() {
  const [price, setPrice] = useState(22.74);
  useEffect(() => {
    const i = setInterval(() => setPrice(p => parseFloat(Math.max(20, Math.min(25, p + (Math.random() - 0.48) * 0.15)).toFixed(3))), 1500);
    return () => clearInterval(i);
  }, []);
  return <motion.span key={price} initial={{ color: "hsl(40 50% 55%)" }} animate={{ color: "hsl(40 50% 55%)" }} className="tabular-nums">${price}</motion.span>;
}

const SPECS = [
  { label: "Token Symbol", value: "BOX" },
  { label: "Max Supply", value: "22.5 Quadrillion" },
  { label: "Consensus", value: "8-Layer DAG" },
  { label: "Transaction Fee", value: "Zero" },
  { label: "Finality", value: "< 1 Second" },
  { label: "Mining Required", value: "No" },
  { label: "Network", value: "Blanch Onyx DLT" },
  { label: "Standard", value: "Sovereign Native" },
];

export default function OnyxCoinPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">ONYX COIN (BOX)</p>
            </div>
          </Link>
          <Link to="/tokens" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Tokens
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Sovereign Native Currency</p>
            <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Blanch Onyx Coin</h1>
            <p className="text-primary text-2xl font-heading mb-6">BOX</p>
            <p className="font-display text-lg text-muted-foreground italic leading-relaxed mb-8">
              The sovereign native currency of the Blanch Onyx ecosystem — governing all commerce, membership, and governance transactions on the DLT.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/marketplace" className="px-8 py-3 bg-primary text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all">
                Acquire BOX
              </Link>
              <Link to="/dlt" className="px-8 py-3 border border-primary/30 text-primary font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/10 transition-all">
                View DLT Network
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Coin visual */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 rounded-full border border-primary/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-56 h-56 rounded-full border border-primary/15"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 border-4 border-primary/40 flex flex-col items-center justify-center relative z-10"
                style={{ boxShadow: "0 0 60px rgba(197,165,90,0.3)" }}
              >
                <p className="font-heading text-2xl text-primary-foreground">BOX</p>
                <p className="text-[10px] tracking-[0.2em] text-primary-foreground/70 uppercase">Blanch Onyx</p>
              </motion.div>
            </div>

            {/* Live price */}
            <div className="text-center mt-8 border border-primary/20 bg-primary/5 p-6">
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Current Value</p>
              <p className="font-heading text-4xl text-primary"><LivePrice /></p>
              <p className="text-xs text-muted-foreground mt-1">per BOX / USD equivalent</p>
            </div>
          </motion.div>
        </div>

        {/* Specs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 border border-border/30 mb-16">
          {SPECS.map(spec => (
            <div key={spec.label} className="bg-card p-5 text-center">
              <p className="font-heading text-sm text-primary mb-1">{spec.value}</p>
              <p className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase">{spec.label}</p>
            </div>
          ))}
        </div>

        {/* Utilities */}
        <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground text-center mb-8">BOX Coin Utility</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "Governance Voting", desc: "Stake BOX to participate in sovereign governance proposals on S.H.I.E.L.D. AI." },
            { icon: Globe, title: "Blanch Corridor Commerce", desc: "Power all trade, services, and exchanges within the Blanch Corridor ecosystem." },
            { icon: Lock, title: "Membership Payments", desc: "Pay for all membership tiers, upgrades, and Black Card services with BOX." },
            { icon: Zap, title: "DLT Gas Alternative", desc: "Zero-fee transactions — BOX eliminates traditional gas fees entirely." },
            { icon: Coins, title: "Marketplace Exchange", desc: "The primary currency for all Virtual Marketplace transactions and NFT acquisitions." },
            { icon: Activity, title: "Philanthropy Contributions", desc: "Direct BOX contributions to the H.E.E.D. Philanthropic Fund and Emancipation initiatives." },
          ].map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all"
            >
              <u.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-heading text-xs text-foreground mb-2">{u.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/coin')({
  component: OnyxCoinPage,
});