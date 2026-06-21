import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Coins, Shield, Globe, Zap, Lock, CheckCircle } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

const TOKENS = [
  {
    symbol: "BOX", name: "Blanch Onyx Coin", desc: "The sovereign native currency of the Blanch Onyx ecosystem — governing all commerce, membership, and governance transactions on the DLT.",
    supply: "22.5 Quadrillion", type: "Governance & Commerce", color: "text-primary border-primary/30 bg-primary/5"
  },
  {
    symbol: "BNX", name: "Blanch Network Token", desc: "Infrastructure utility token powering the Blanch Corridor network operations and cross-border settlement layer.",
    supply: "500 Billion", type: "Utility", color: "text-amber-400 border-amber-400/30 bg-amber-400/5"
  },
  {
    symbol: "BID", name: "Blanch Infinity DLT", desc: "Interoperability token bridging the Blanch Onyx DLT with external sovereign chains and the S.H.I.E.L.D. AI operating system.",
    supply: "1 Quadrillion", type: "Bridge & Interop", color: "text-blue-400 border-blue-400/30 bg-blue-400/5"
  },
  {
    symbol: "BHD", name: "Blanch Hadash Dabash", desc: "Sacred DLT token anchoring divine covenant agreements, membership records, and philanthropic fund management.",
    supply: "100 Billion", type: "Covenant & Trust", color: "text-purple-400 border-purple-400/30 bg-purple-400/5"
  },
  {
    symbol: "SHLD", name: "S.H.I.E.L.D. AI Token", desc: "Governance token for S.H.I.E.L.D. AI Guardian Prime operations — granting voting rights on AI ethics policies and system upgrades.",
    supply: "50 Billion", type: "AI Governance", color: "text-green-400 border-green-400/30 bg-green-400/5"
  },
];

const UTILITY = [
  { icon: Shield, title: "Governance Voting", desc: "Cast votes on sovereign proposals through the DLT-secured governance layer." },
  { icon: Globe, title: "Cross-Border Commerce", desc: "Facilitate zero-fee, instant cross-border trade through the Blanch Corridor." },
  { icon: Lock, title: "Membership Access", desc: "Unlock tier-based membership benefits and privileges across the ecosystem." },
  { icon: Zap, title: "DLT Transactions", desc: "Power all transactions across the 8-Layer DAG with zero mining fees." },
  { icon: Coins, title: "Marketplace Exchange", desc: "Trade digital assets, NFTs, and services in the Virtual Marketplace." },
  { icon: CheckCircle, title: "Philanthropic Giving", desc: "Direct charitable contributions through the Blanch Philanthropy Hub." },
];

export default function TokensPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">TOKENS</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Sovereign Digital Currency</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Blanch Onyx Tokens</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            A multi-layered sovereign token ecosystem governing commerce, governance, infrastructure, and divine stewardship across the Blanch Corridor.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Token cards */}
        <div className="space-y-4 mb-20">
          {TOKENS.map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center ${token.color}`}
            >
              <div className="text-center shrink-0">
                <p className="font-heading text-3xl text-primary">{token.symbol}</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">{token.type}</p>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base tracking-[0.05em] text-foreground mb-2">{token.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{token.desc}</p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase mb-1">Max Supply</p>
                <p className="font-heading text-sm text-primary">{token.supply}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Utility grid */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground">Token Utility</h2>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-4" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UTILITY.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all"
            >
              <u.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-heading text-sm text-foreground mb-2">{u.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}