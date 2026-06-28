<<<<<<< Updated upstream
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Coins, Shield, Globe, Zap, Lock, CheckCircle } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

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

export const Route = createFileRoute('/tokens')({
  component: TokensPage,
=======
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Coins, Shield, Globe, Zap, Lock, CheckCircle, Landmark } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

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
  {
    symbol: "SARDX", name: "Sardonyx Token", desc: "Initiate-tier governance and access rights, providing a foundational entry point for active community participation.",
    supply: "777 Billion", type: "Initiate Governance", color: "text-slate-400 border-slate-400/30 bg-slate-400/5"
  },
  {
    symbol: "ONYX", name: "Onyx Council Token", desc: "Council voting rights and H.E.E.D. allocation steering, reserved for verified trustees and elders.",
    supply: "144,000", type: "Council Governance", color: "text-stone-300 border-stone-300/30 bg-stone-300/5"
  },
  {
    symbol: "JUDAH", name: "Royal Judah Token", desc: "Heritage land stewardship and throne governance, anchoring ancestral estates on-chain.",
    supply: "12 Million", type: "Land & Throne", color: "text-red-400 border-red-400/30 bg-red-400/5"
  },
  {
    symbol: "HEED", name: "H.E.E.D. Utility Token", desc: "Pillar program funding and member rewards, driving community development initiatives.",
    supply: "7 Billion", type: "Pillar Utility", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
  },
  {
    symbol: "SHIELD", name: "S.H.I.E.L.D. AI Compute", desc: "Sovereign AI compute and inference credits, powering advanced AI tasks and agents across the ecosystem.",
    supply: "100 Billion", type: "AI Compute", color: "text-sky-400 border-sky-400/30 bg-sky-400/5"
  },
  {
    symbol: "MERCY", name: "Mercy Charity Token", desc: "Philanthropic distribution to the chosen generation, managing clean, transparent aid delivery.",
    supply: "100 Billion", type: "Philanthropy", color: "text-pink-400 border-pink-400/30 bg-pink-400/5"
  }
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
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Sovereign Digital Currency</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Blanch Onyx Tokens</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            A multi-layered sovereign token ecosystem governing commerce, governance, infrastructure, and divine stewardship across the Blanch Corridor. The token economy of the Royal Priesthood — governance, access, and stewardship anchored on Blanch Onyx DLT.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Feature Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 mt-10">
          {[
            { title: "DLT-Native", desc: "Issued and settled directly on Blanch Onyx DLT — zero gas.", icon: Zap },
            { title: "Sovereign Custody", desc: "Members hold keys; the Council holds the covenant.", icon: Lock },
            { title: "Real-Asset Backed", desc: "Backed by sovereign land, enterprise revenue, and divine purpose.", icon: Landmark },
            { title: "Compliance-Built", desc: "ID2X identity gating, regulatory ready across jurisdictions.", icon: Shield },
          ].map((feat) => (
            <div key={feat.title} className="border border-primary/20 bg-card/40 p-5 rounded-lg flex flex-col items-center text-center">
              <feat.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-heading text-sm text-foreground mb-1 tracking-wider">{feat.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Token cards */}
        <div className="space-y-4 mb-20">
          {TOKENS.map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`border p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center ${token.color}`}
            >
              <div className="text-center shrink-0 w-24">
                <p className="font-heading text-2xl md:text-3xl text-primary">{token.symbol}</p>
                <p className="text-[9px] tracking-[0.1em] text-muted-foreground uppercase mt-1">{token.type}</p>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base tracking-[0.05em] text-foreground mb-2">{token.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{token.desc}</p>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <p className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase mb-1">Max Supply</p>
                <p className="font-heading text-sm text-primary">{token.supply}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sovereign Pillars & Protocols */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground">Sovereign Pillars & Protocols</h2>
            <p className="text-muted-foreground font-display text-sm italic mt-2">Foundational layers governing settlement, counsel, and real-world asset flow</p>
            <div className="w-16 h-px bg-primary/40 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "ONYX · Settlement",
                desc: "The native settlement token of the Blanch Onyx DLT — zero-fee, covenant-bound.",
                badge: "Settlement Protocol"
              },
              {
                title: "SHOHAM · Governance",
                desc: "Royal Priesthood governance token — voice in council decisions.",
                badge: "Council Protocol"
              },
              {
                title: "HEED · Impact",
                desc: "Philanthropy token routing capital to Health, Education, Enterprise, and Development.",
                badge: "Pillar Protocol"
              },
              {
                title: "Real-World Assets",
                desc: "Tokenized real estate, commodities, and sovereign instruments routed through the Blanch Corridor.",
                badge: "Asset Protocol"
              }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-primary/20 bg-gradient-to-br from-card to-background p-6 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-heading tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase">{pillar.badge}</span>
                  <h3 className="font-heading text-lg text-foreground tracking-wider mt-3 mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              transition={{ delay: 0.2 + i * 0.05 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all"
            >
              <u.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-heading text-sm text-foreground mb-2">{u.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/tokens')({
  component: TokensPage,
>>>>>>> Stashed changes
});