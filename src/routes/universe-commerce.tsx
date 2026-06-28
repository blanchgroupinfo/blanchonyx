<<<<<<< Updated upstream
import React, { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, ChevronDown, ChevronRight, Zap, Globe, Shield, User, Network } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const MODELS = [
  { code: "A2X", label: "Account", short: "A", desc: "Account to Everything", pathways: ["A2A","A2AD","A2AG","A2AI","A2Apps","A2AV","A2B","A2C","A2D","A2DEV","A2E","A2X","A2G","A2I","A2M","A2MF","A2N","A2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AD2X", label: "Administration", short: "AD", desc: "Administration to Everything", pathways: ["AD2A","AD2AG","AD2AI","AD2Apps","AD2AV","AD2B","AD2C","AD2D","AD2DEV","AD2E","AD2X","AD2G","AD2I","AD2M","AD2MF","AD2N","AD2P"], targets: ["Account","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AG2X", label: "Agent", short: "AG", desc: "Agent to Everything", pathways: ["AG2A","AG2AD","AG2AG","AG2AI","AG2Apps","AG2AV","AG2B","AG2C","AG2D","AG2DEV","AG2E","AG2X","AG2G","AG2I","AG2M","AG2MF","AG2N","AG2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AI2X", label: "AI", short: "AI", desc: "Artificial Intelligence to Everything", pathways: ["AI2A","AI2AD","AI2AG","AI2AI","AI2Apps","AI2AV","AI2B","AI2C","AI2D","AI2DEV","AI2E","AI2X","AI2G","AI2I","AI2M","AI2MF","AI2N","AI2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "Apps2X", label: "Apps", short: "Apps", desc: "Apps to Everything", pathways: ["Apps2A","Apps2AD","Apps2AG","Apps2AI","Apps2Apps","Apps2AV","Apps2B","Apps2C","Apps2D","Apps2DEV","Apps2E","Apps2X","Apps2G","Apps2I","Apps2M","Apps2MF","Apps2N","Apps2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AV2X", label: "Avatar", short: "AV", desc: "Avatar to Everything", pathways: ["AV2A","AV2AD","AV2AG","AV2AI","AV2Apps","AV2AV","AV2B","AV2C","AV2D","AV2DEV","AV2E","AV2X","AV2G","AV2I","AV2M","AV2MF","AV2N","AV2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "B2X", label: "Business", short: "B", desc: "Business to Everything", pathways: ["B2A","B2AD","B2AG","B2AI","B2Apps","B2AV","B2B","B2C","B2D","B2DEV","B2E","B2X","B2G","B2I","B2M","B2MF","B2N","B2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "C2X", label: "Consumer", short: "C", desc: "Consumer to Everything", pathways: ["C2A","C2AD","C2AG","C2AI","C2Apps","C2AV","C2B","C2C","C2D","C2DEV","C2E","C2X","C2G","C2I","C2M","C2MF","C2N","C2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "D2X", label: "Direct", short: "D", desc: "Direct to Everything", pathways: ["D2A","D2AD","D2AG","D2AI","D2AV","D2B","D2C","D2DEV","D2E","D2X","D2G","D2I","D2M","D2MF","D2N","D2P"], targets: ["Account","Administration","Agent","AI","Avatar","Business","Consumer","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "DAO2X", label: "DAO", short: "DAO", desc: "DAO / Collective to Everything", pathways: ["DAO2A","DAO2AD","DAO2AG","DAO2AI","DAO2Apps","DAO2AV","DAO2B","DAO2C","DAO2D","DAO2DEV","DAO2E","DAO2X","DAO2G","DAO2I","DAO2M","DAO2MF","DAO2DAO","DAO2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","DAO","Prosumer"] },
  { code: "DEV2X", label: "Developer", short: "DEV", desc: "Developer to Everything", pathways: ["DEV2A","DEV2AD","DEV2AG","DEV2AI","DEV2Apps","DEV2AV","DEV2B","DEV2C","DEV2D","DEV2DEV","DEV2E","DEV2X","DEV2G","DEV2I","DEV2M","DEV2MF","DEV2N","DEV2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "E2X", label: "Employee", short: "E", desc: "Employee to Everything", pathways: ["E2A","E2AD","E2AG","E2AI","E2Apps","E2AV","E2B","E2C","E2D","E2DEV","E2E","E2X","E2G","E2I","E2M","E2MF","E2N","E2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "G2X", label: "Government", short: "G", desc: "Government to Everything", pathways: ["G2A","G2AD","G2AG","G2AI","G2Apps","G2AV","G2B","G2C","G2D","G2DEV","G2E","G2X","G2G","G2I","G2M","G2MF","G2N","G2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "I2X", label: "Institution", short: "I", desc: "Institution to Everything", pathways: ["I2A","I2AD","I2AG","I2AI","I2Apps","I2AV","I2B","I2C","I2D","I2DEV","I2E","I2X","I2G","I2I","I2M","I2MF","I2N","I2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "ID2X", label: "Identity", short: "ID", desc: "Identity to Everything", pathways: ["ID2A","ID2AD","ID2AG","ID2AI","ID2Apps","ID2AV","ID2B","ID2C","ID2D","ID2DEV","ID2E","ID2X","ID2G","ID2I","ID2M","ID2MF","ID2N","ID2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "LAW2X", label: "Law", short: "LAW", desc: "Legal / Compliance Engine to Everything", pathways: ["LAW2A","LAW2AD","LAW2AG","LAW2AI","LAW2Apps","LAW2AV","LAW2B","LAW2C","LAW2D","LAW2DEV","LAW2E","LAW2X","LAW2G","LAW2I","LAW2M","LAW2MF","LAW2N","LAW2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "M2X", label: "Machine", short: "M", desc: "Machine to Everything", pathways: ["M2A","M2AD","M2AG","M2AI","M2Apps","M2AV","M2B","M2C","M2D","M2DEV","M2E","M2X","M2G","M2I","M2M","M2MF","M2N","M2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "MF2X", label: "Manufacturer", short: "MF", desc: "Manufacturer to Everything", pathways: ["MF2A","MF2AD","MF2AG","MF2AI","MF2Apps","MF2AV","MF2B","MF2C","MF2D","MF2DEV","MF2E","MF2X","MF2G","MF2I","MF2M","MF2MF","MF2N","MF2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "N2X", label: "Many", short: "N", desc: "Many to Everything", pathways: ["N2A","N2AD","N2AG","N2AI","N2Apps","N2AV","N2B","N2C","N2D","N2DEV","N2E","N2X","N2G","N2I","N2M","N2MF","N2N","N2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "P2X", label: "Prosumer", short: "P", desc: "Prosumer to Everything", pathways: ["P2A","P2AD","P2AG","P2AI","P2Apps","P2AV","P2B","P2C","P2D","P2DEV","P2E","P2X","P2G","P2I","P2M","P2MF","P2N","P2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
];

const INFRA = [
  { icon: Zap, title: "Instant Settlement", desc: "Sub-second transaction finality across all X2X models via distributed ledger technology." },
  { icon: Globe, title: "Cross-Border Native", desc: "Every model supports multi-currency, multi-jurisdiction commerce with built-in compliance." },
  { icon: Shield, title: "AI-Orchestrated", desc: "S.H.I.E.L.D. AI optimizes routing, pricing, and risk assessment for every transaction." },
  { icon: User, title: "Identity-Verified", desc: "All transactions flow through the ID2X identity layer ensuring trust and regulatory compliance." },
];

export default function UniverseCommercePage() {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const filteredModels = useMemo(() => {
    if (!search) return MODELS;
    const q = search.toLowerCase();
    return MODELS.filter(m =>
      m.code.toLowerCase().includes(q) ||
      m.label.toLowerCase().includes(q) ||
      m.pathways.some(p => p.toLowerCase().includes(q)) ||
      m.targets.some(t => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">X2X Transaction Framework</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Universal Commerce Models</h1>
          <p className="font-display text-xl text-primary italic mb-2">380+ Commerce Models</p>
          <p className="text-foreground/85 text-sm max-w-3xl mx-auto leading-relaxed">
            Every entity connects to every other entity. 20 primary models × 19 target connections = 380 unique commerce pathways powering the future of global transactions.
          </p>
        </motion.div>

        {/* CTA to Business Network */}
        <div className="border border-primary/20 bg-primary/5 px-6 py-4 mb-10 flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <p className="text-sm text-foreground">Connect your business to the network and start transacting across all 380+ pathways.</p>
          <Link to="/business-network" className="shrink-0 px-6 py-3 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center gap-2">
            Universal Business Network <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {[
            { value: "$∞", label: "Annual Volume" },
            { value: "∞", label: "Merchants" },
            { value: "99.9%", label: "Success Rate" },
            { value: "0%", label: "Transaction Fees" },
            { value: "Instant", label: "Settlement" },
            { value: "150+", label: "Currencies" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="border border-border/30 bg-card p-4 text-center card-lift">
              <p className="font-heading text-lg text-primary">{s.value}</p>
              <p className="text-[9px] tracking-[0.1em] text-foreground/60 uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* X2X Infrastructure */}
        <div className="mb-12">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground text-center mb-2">X2X Transaction Framework</h2>
          <p className="text-foreground/60 text-xs text-center mb-6">The infrastructure powering every commerce model with speed, compliance, and intelligence.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFRA.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="border border-border/30 bg-card p-5 card-lift">
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-heading text-xs text-foreground mb-2">{item.title}</h4>
                <p className="text-foreground/80 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 20 Primary Models */}
        <div className="mb-6">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-2">20 Primary X2X Models</h2>
          <p className="text-foreground/65 text-xs mb-6">Each model connects to all 19 other entity types, creating a fully interconnected commerce mesh.</p>

          {/* Model grid badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MODELS.map(m => (
              <button key={m.code} onClick={() => setExpanded(expanded === m.code ? null : m.code)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.1em] font-heading border transition-all ${
                  expanded === m.code ? "bg-primary text-primary-foreground border-primary" : "border-border/40 text-foreground/75 hover:border-primary/40 hover:text-primary"
                }`}>
                {m.code}
              </button>
            ))}
          </div>
        </div>

        {/* 380+ Pathways search + accordion */}
        <div className="mb-12">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-2">380+ Commerce Pathways</h2>
          <p className="text-foreground/60 text-xs mb-5">Search or expand each primary model to explore all its target connections.</p>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search pathways… e.g. B2C, Machine, DAO"
              className="w-full pl-10 pr-4 py-3 bg-card border border-border/40 text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:border-primary/40" />
          </div>

          <div className="space-y-2">
            {filteredModels.map(model => (
              <div key={model.code} className={`border transition-all ${expanded === model.code ? "border-primary/40" : "border-border/30"}`}>
                <button onClick={() => setExpanded(expanded === model.code ? null : model.code)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-primary text-sm w-16">{model.code}</span>
                    <div>
                      <span className="text-foreground text-sm">— {model.label} to …</span>
                      <span className="text-foreground/50 text-[10px] ml-2">({model.pathways.length} pathways)</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-foreground/60 transition-transform ${expanded === model.code ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {expanded === model.code && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t border-border/20">
                      <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {model.pathways.map((path, j) => (
                          <div key={j} className="border border-border/20 bg-primary/5 px-2 py-1.5 text-center">
                            <p className="font-heading text-[10px] text-primary">{path}</p>
                            <p className="text-[9px] text-foreground/50">{model.label} → {model.targets[j]}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Commerce Mesh summary */}
        <div className="border border-primary/20 bg-primary/5 p-10 text-center mb-8">
          <h2 className="font-heading text-2xl text-foreground mb-3">The Commerce Mesh</h2>
          <p className="text-foreground/80 text-sm max-w-2xl mx-auto mb-6">Every primary model creates 19 unique pathways. With 20 models, the Universal Commerce framework generates 380+ distinct transaction types — the most comprehensive commerce protocol ever designed.</p>
          <div className="flex items-center justify-center gap-8 mb-6">
            {[{ v: "20", l: "Primary Models" }, { v: "19", l: "Target Connections" }, { v: "380+", l: "Commerce Models" }].map(s => (
              <div key={s.l}>
                <p className="font-heading text-3xl text-primary">{s.v}</p>
                <p className="text-xs text-foreground/60">{s.l}</p>
              </div>
            ))}
          </div>
          <blockquote className="font-display text-sm text-foreground/80 italic">
            "Seest thou a man diligent in his business? he shall stand before kings." — Proverbs 22:29
          </blockquote>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/universe-commerce')({
  component: UniverseCommercePage,
=======
import React, { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, ChevronDown, ChevronRight, Zap, Globe, Shield, User, Network } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const MODELS = [
  { code: "A2X", label: "Account", short: "A", desc: "Account to Everything", pathways: ["A2A","A2AD","A2AG","A2AI","A2Apps","A2AV","A2B","A2C","A2D","A2DEV","A2E","A2X","A2G","A2I","A2M","A2MF","A2N","A2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AD2X", label: "Administration", short: "AD", desc: "Administration to Everything", pathways: ["AD2A","AD2AG","AD2AI","AD2Apps","AD2AV","AD2B","AD2C","AD2D","AD2DEV","AD2E","AD2X","AD2G","AD2I","AD2M","AD2MF","AD2N","AD2P"], targets: ["Account","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AG2X", label: "Agent", short: "AG", desc: "Agent to Everything", pathways: ["AG2A","AG2AD","AG2AG","AG2AI","AG2Apps","AG2AV","AG2B","AG2C","AG2D","AG2DEV","AG2E","AG2X","AG2G","AG2I","AG2M","AG2MF","AG2N","AG2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AI2X", label: "AI", short: "AI", desc: "Artificial Intelligence to Everything", pathways: ["AI2A","AI2AD","AI2AG","AI2AI","AI2Apps","AI2AV","AI2B","AI2C","AI2D","AI2DEV","AI2E","AI2X","AI2G","AI2I","AI2M","AI2MF","AI2N","AI2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "Apps2X", label: "Apps", short: "Apps", desc: "Apps to Everything", pathways: ["Apps2A","Apps2AD","Apps2AG","Apps2AI","Apps2Apps","Apps2AV","Apps2B","Apps2C","Apps2D","Apps2DEV","Apps2E","Apps2X","Apps2G","Apps2I","Apps2M","Apps2MF","Apps2N","Apps2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "AV2X", label: "Avatar", short: "AV", desc: "Avatar to Everything", pathways: ["AV2A","AV2AD","AV2AG","AV2AI","AV2Apps","AV2AV","AV2B","AV2C","AV2D","AV2DEV","AV2E","AV2X","AV2G","AV2I","AV2M","AV2MF","AV2N","AV2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "B2X", label: "Business", short: "B", desc: "Business to Everything", pathways: ["B2A","B2AD","B2AG","B2AI","B2Apps","B2AV","B2B","B2C","B2D","B2DEV","B2E","B2X","B2G","B2I","B2M","B2MF","B2N","B2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "C2X", label: "Consumer", short: "C", desc: "Consumer to Everything", pathways: ["C2A","C2AD","C2AG","C2AI","C2Apps","C2AV","C2B","C2C","C2D","C2DEV","C2E","C2X","C2G","C2I","C2M","C2MF","C2N","C2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "D2X", label: "Direct", short: "D", desc: "Direct to Everything", pathways: ["D2A","D2AD","D2AG","D2AI","D2AV","D2B","D2C","D2DEV","D2E","D2X","D2G","D2I","D2M","D2MF","D2N","D2P"], targets: ["Account","Administration","Agent","AI","Avatar","Business","Consumer","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "DAO2X", label: "DAO", short: "DAO", desc: "DAO / Collective to Everything", pathways: ["DAO2A","DAO2AD","DAO2AG","DAO2AI","DAO2Apps","DAO2AV","DAO2B","DAO2C","DAO2D","DAO2DEV","DAO2E","DAO2X","DAO2G","DAO2I","DAO2M","DAO2MF","DAO2DAO","DAO2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","DAO","Prosumer"] },
  { code: "DEV2X", label: "Developer", short: "DEV", desc: "Developer to Everything", pathways: ["DEV2A","DEV2AD","DEV2AG","DEV2AI","DEV2Apps","DEV2AV","DEV2B","DEV2C","DEV2D","DEV2DEV","DEV2E","DEV2X","DEV2G","DEV2I","DEV2M","DEV2MF","DEV2N","DEV2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "E2X", label: "Employee", short: "E", desc: "Employee to Everything", pathways: ["E2A","E2AD","E2AG","E2AI","E2Apps","E2AV","E2B","E2C","E2D","E2DEV","E2E","E2X","E2G","E2I","E2M","E2MF","E2N","E2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "G2X", label: "Government", short: "G", desc: "Government to Everything", pathways: ["G2A","G2AD","G2AG","G2AI","G2Apps","G2AV","G2B","G2C","G2D","G2DEV","G2E","G2X","G2G","G2I","G2M","G2MF","G2N","G2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "I2X", label: "Institution", short: "I", desc: "Institution to Everything", pathways: ["I2A","I2AD","I2AG","I2AI","I2Apps","I2AV","I2B","I2C","I2D","I2DEV","I2E","I2X","I2G","I2I","I2M","I2MF","I2N","I2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "ID2X", label: "Identity", short: "ID", desc: "Identity to Everything", pathways: ["ID2A","ID2AD","ID2AG","ID2AI","ID2Apps","ID2AV","ID2B","ID2C","ID2D","ID2DEV","ID2E","ID2X","ID2G","ID2I","ID2M","ID2MF","ID2N","ID2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "LAW2X", label: "Law", short: "LAW", desc: "Legal / Compliance Engine to Everything", pathways: ["LAW2A","LAW2AD","LAW2AG","LAW2AI","LAW2Apps","LAW2AV","LAW2B","LAW2C","LAW2D","LAW2DEV","LAW2E","LAW2X","LAW2G","LAW2I","LAW2M","LAW2MF","LAW2N","LAW2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "M2X", label: "Machine", short: "M", desc: "Machine to Everything", pathways: ["M2A","M2AD","M2AG","M2AI","M2Apps","M2AV","M2B","M2C","M2D","M2DEV","M2E","M2X","M2G","M2I","M2M","M2MF","M2N","M2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "MF2X", label: "Manufacturer", short: "MF", desc: "Manufacturer to Everything", pathways: ["MF2A","MF2AD","MF2AG","MF2AI","MF2Apps","MF2AV","MF2B","MF2C","MF2D","MF2DEV","MF2E","MF2X","MF2G","MF2I","MF2M","MF2MF","MF2N","MF2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "N2X", label: "Many", short: "N", desc: "Many to Everything", pathways: ["N2A","N2AD","N2AG","N2AI","N2Apps","N2AV","N2B","N2C","N2D","N2DEV","N2E","N2X","N2G","N2I","N2M","N2MF","N2N","N2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
  { code: "P2X", label: "Prosumer", short: "P", desc: "Prosumer to Everything", pathways: ["P2A","P2AD","P2AG","P2AI","P2Apps","P2AV","P2B","P2C","P2D","P2DEV","P2E","P2X","P2G","P2I","P2M","P2MF","P2N","P2P"], targets: ["Account","Administration","Agent","AI","Apps","Avatar","Business","Consumer","Direct","Developer","Employee","Everything","Government","Institution","Machine","Manufacturer","Many","Prosumer"] },
];

const INFRA = [
  { icon: Zap, title: "Instant Settlement", desc: "Sub-second transaction finality across all X2X models via distributed ledger technology." },
  { icon: Globe, title: "Cross-Border Native", desc: "Every model supports multi-currency, multi-jurisdiction commerce with built-in compliance." },
  { icon: Shield, title: "AI-Orchestrated", desc: "S.H.I.E.L.D. AI optimizes routing, pricing, and risk assessment for every transaction." },
  { icon: User, title: "Identity-Verified", desc: "All transactions flow through the ID2X identity layer ensuring trust and regulatory compliance." },
];

export default function UniverseCommercePage() {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const filteredModels = useMemo(() => {
    if (!search) return MODELS;
    const q = search.toLowerCase();
    return MODELS.filter(m =>
      m.code.toLowerCase().includes(q) ||
      m.label.toLowerCase().includes(q) ||
      m.pathways.some(p => p.toLowerCase().includes(q)) ||
      m.targets.some(t => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">X2X Transaction Framework</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Universal Commerce Models</h1>
          <p className="font-display text-xl text-primary italic mb-2">380+ Commerce Models</p>
          <p className="text-foreground/85 text-sm max-w-3xl mx-auto leading-relaxed">
            Every entity connects to every other entity. 20 primary models × 19 target connections = 380 unique commerce pathways powering the future of global transactions.
          </p>
        </motion.div>

        {/* CTA to Business Network */}
        <div className="border border-primary/20 bg-primary/5 px-6 py-4 mb-10 flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <p className="text-sm text-foreground">Connect your business to the network and start transacting across all 380+ pathways.</p>
          <Link to="/business-network" className="shrink-0 px-6 py-3 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center gap-2">
            Universal Business Network <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {[
            { value: "$∞", label: "Annual Volume" },
            { value: "∞", label: "Merchants" },
            { value: "99.9%", label: "Success Rate" },
            { value: "0%", label: "Transaction Fees" },
            { value: "Instant", label: "Settlement" },
            { value: "150+", label: "Currencies" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="border border-border/30 bg-card p-4 text-center card-lift">
              <p className="font-heading text-lg text-primary">{s.value}</p>
              <p className="text-[9px] tracking-[0.1em] text-foreground/60 uppercase mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* X2X Infrastructure */}
        <div className="mb-12">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground text-center mb-2">X2X Transaction Framework</h2>
          <p className="text-foreground/60 text-xs text-center mb-6">The infrastructure powering every commerce model with speed, compliance, and intelligence.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFRA.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="border border-border/30 bg-card p-5 card-lift">
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-heading text-xs text-foreground mb-2">{item.title}</h4>
                <p className="text-foreground/80 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 20 Primary Models */}
        <div className="mb-6">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-2">20 Primary X2X Models</h2>
          <p className="text-foreground/65 text-xs mb-6">Each model connects to all 19 other entity types, creating a fully interconnected commerce mesh.</p>

          {/* Model grid badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MODELS.map(m => (
              <button key={m.code} onClick={() => setExpanded(expanded === m.code ? null : m.code)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.1em] font-heading border transition-all ${
                  expanded === m.code ? "bg-primary text-primary-foreground border-primary" : "border-border/40 text-foreground/75 hover:border-primary/40 hover:text-primary"
                }`}>
                {m.code}
              </button>
            ))}
          </div>
        </div>

        {/* 380+ Pathways search + accordion */}
        <div className="mb-12">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-2">380+ Commerce Pathways</h2>
          <p className="text-foreground/60 text-xs mb-5">Search or expand each primary model to explore all its target connections.</p>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search pathways… e.g. B2C, Machine, DAO"
              className="w-full pl-10 pr-4 py-3 bg-card border border-border/40 text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:border-primary/40" />
          </div>

          <div className="space-y-2">
            {filteredModels.map(model => (
              <div key={model.code} className={`border transition-all ${expanded === model.code ? "border-primary/40" : "border-border/30"}`}>
                <button onClick={() => setExpanded(expanded === model.code ? null : model.code)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-primary text-sm w-16">{model.code}</span>
                    <div>
                      <span className="text-foreground text-sm">— {model.label} to …</span>
                      <span className="text-foreground/50 text-[10px] ml-2">({model.pathways.length} pathways)</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-foreground/60 transition-transform ${expanded === model.code ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {expanded === model.code && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t border-border/20">
                      <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {model.pathways.map((path, j) => (
                          <div key={j} className="border border-border/20 bg-primary/5 px-2 py-1.5 text-center">
                            <p className="font-heading text-[10px] text-primary">{path}</p>
                            <p className="text-[9px] text-foreground/50">{model.label} → {model.targets[j]}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Commerce Mesh summary */}
        <div className="border border-primary/20 bg-primary/5 p-10 text-center mb-8">
          <h2 className="font-heading text-2xl text-foreground mb-3">The Commerce Mesh</h2>
          <p className="text-foreground/80 text-sm max-w-2xl mx-auto mb-6">Every primary model creates 19 unique pathways. With 20 models, the Universal Commerce framework generates 380+ distinct transaction types — the most comprehensive commerce protocol ever designed.</p>
          <div className="flex items-center justify-center gap-8 mb-6">
            {[{ v: "20", l: "Primary Models" }, { v: "19", l: "Target Connections" }, { v: "380+", l: "Commerce Models" }].map(s => (
              <div key={s.l}>
                <p className="font-heading text-3xl text-primary">{s.v}</p>
                <p className="text-xs text-foreground/60">{s.l}</p>
              </div>
            ))}
          </div>
          <blockquote className="font-display text-sm text-foreground/80 italic">
            "Seest thou a man diligent in his business? he shall stand before kings." — Proverbs 22:29
          </blockquote>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/universe-commerce')({
  component: UniverseCommercePage,
>>>>>>> Stashed changes
});