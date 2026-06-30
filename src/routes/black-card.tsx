import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Shield, Wallet, Globe, Lock, Zap, CheckCircle, Building2, Activity, Wifi, X, ChevronRight, BookOpen, Fingerprint, Key, Sparkles, Network, Cpu, HardDrive, Gift, Heart, Database, Radio, Laptop } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

import LOGO_BROWN from "@/assets/b-logo-brown.png";
import LOGO_BLACK from "@/assets/b-logo-black-brown.png";

const CARD_TIERS = [
  {
    name: "Obsidian",
    tier: "Founder",
    color: "from-black via-zinc-950 to-black",
    accent: "text-yellow-300",
    border: "border-yellow-400/40",
    logo: LOGO_BLACK, // black+brown logo
    tagline: "The Genesis Card — Founding Sovereign",
    features: ["Lifetime Governance Veto", "Genesis NFT Airdrop", "Direct Elder Council Line", "Unlimited Blanch Corridor Access", "Zero-Fee Global Settlements Forever", "Private Concierge Banking"],
    highlight: "text-yellow-300",
    glow: "rgba(250,204,21,0.15)",
    price: "By Invitation Only",
  },
  {
    name: "Royal Black Gold",
    tier: "Royal · Throne",
    color: "from-black via-yellow-950 to-zinc-950",
    accent: "text-amber-300",
    border: "border-amber-400/60",
    logo: LOGO_BLACK, // brown logo
    tagline: "The Crown Card — Royal Authority",
    features: ["Full Governance Voting Rights", "Private Banking Access", "Summit & Retreat Priority", "Blanch Corridor Commerce", "Royal Member Directory", "Executive Concierge"],
    highlight: "text-amber-300",
    glow: "rgba(251,191,36,0.18)",
    price: "10,000 BOX/yr",
  },
  {
    name: "Onyx Council",
    tier: "Onyx · Council",
    color: "from-zinc-950 via-neutral-900 to-zinc-900",
    accent: "text-primary",
    border: "border-primary/30",
    logo: LOGO_BLACK,
    tagline: "The Council Card — Advisory Seat",
    features: ["Council Governance Seats", "Ethical Standards Board", "Cultural Leadership Role", "Exclusive Summits", "Lifetime Recognition"],
    highlight: "text-primary",
    glow: "rgba(197,165,90,0.12)",
    price: "7,500 BOX/yr",
  },
  {
    name: "Onyx Elite",
    tier: "Elite",
    color: "from-zinc-900 to-neutral-900",
    accent: "text-primary",
    border: "border-primary/40",
    logo: LOGO_BLACK,
    tagline: "The Elite Card — Distinguished Member",
    features: ["Governance Participation", "Elite Networking Events", "Business Corridor Access", "Quarterly Retreat Invitations", "Member Investment Access"],
    highlight: "text-primary",
    glow: "rgba(197,165,90,0.15)",
    price: "5,000 BOX/yr",
  },
  {
    name: "Onyx Partner",
    tier: "Partner",
    color: "from-zinc-900 via-stone-900 to-neutral-900",
    accent: "text-blue-400",
    border: "border-blue-400/30",
    logo: LOGO_BLACK,
    tagline: "The Commerce Card — Kingdom Business",
    features: ["Business Network Listing", "Commerce Partnerships", "Annual Summit Access", "Investment Opportunities"],
    highlight: "text-primary/70",
    glow: "rgba(197,165,90,0.08)",
    price: "2,500 BOX/yr",
  },
  {
    name: "Onyx Executive",
    tier: "Executive",
    color: "from-stone-900 to-neutral-950",
    accent: "text-stone-300",
    border: "border-stone-500/20",
    logo: LOGO_BROWN,
    tagline: "The Professional Card — Executive Power",
    features: ["Executive Networking Events", "Educational Resources", "Cultural Event Access", "Community Investment Access"],
    highlight: "text-blue-400",
    glow: "rgba(96,165,250,0.12)",
    price: "1,000 BOX/yr",
  },
  {
    name: "Onyx Associate",
    tier: "Associate",
    color: "from-stone-900 to-neutral-950",
    accent: "text-stone-300",
    border: "border-stone-500/20",
    logo: LOGO_BROWN,
    tagline: "The Access Card — Member Identity",
    features: ["Member Directory Access", "Digital Marketplace Access", "Cultural Events", "Social Feed Participation"],
    highlight: "text-primary/80",
    glow: "rgba(197,165,90,0.08)",
    price: "250 BOX/yr",
  },
  {
    name: "Sardonyx",
    tier: "Sardonyx · Initiate",
    color: "from-stone-900 to-neutral-950",
    accent: "text-stone-300",
    border: "border-stone-500/20",
    logo: LOGO_BROWN,
    tagline: "The Initiate Card — Sovereign Journey Begins",
    features: ["Onboarding Materials", "Community Access", "H.E.E.D. Educational Series", "Marketplace Browsing"],
    highlight: "text-stone-300",
    glow: "rgba(168,162,158,0.08)",
    price: "100 BOX/yr",
  },
];

const FEATURES = [
  { icon: CreditCard, title: "Business Card & Debit Card", desc: "A sovereign Business Card and Debit Card — your identity in every transaction across the kingdom economy." },
  { icon: Wallet, title: "Hardware Ledger Device", desc: "Built-in standalone electronic wallet and hardware ledger. All transactions secured by the Blanch Onyx DLT." },
  { icon: Activity, title: "DLT-Monitored Transactions", desc: "Every transaction monitored by Blanch Onyx DLT, Blanch Network, Blanch Infinity DLT, Blanch Hadash Dabash DLT, and S.H.I.E.L.D. AI Guardian Prime." },
  { icon: Building2, title: "Private Banking Access", desc: "Access to exclusive private banking services and kingdom-aligned investment opportunities." },
  { icon: Globe, title: "Blanch Corridor Access", desc: "Direct access to the Blanch Corridor ecosystem for cross-border commerce and sovereign trade." },
  { icon: Shield, title: "Sovereign Identity", desc: "Your Black Card is a symbol of elite membership, divine stewardship, and sovereign financial identity." },
  { icon: Lock, title: "Multi-DLT Security", desc: "Protected by 5 sovereign DLT networks and S.H.I.E.L.D. AI ethics layer for maximum security." },
  { icon: Zap, title: "Instant Zero-Fee Settlement", desc: "Leverage the Blanch Onyx DLT for instant, zero-fee settlement on all card transactions globally." },
];

function RFIDChip() {
  return (
    <div className="w-8 h-6 rounded-sm border border-yellow-400/30 bg-gradient-to-br from-yellow-900/40 to-amber-900/20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px p-0.5 opacity-50">
        {Array(9).fill(0).map((_, i) => <div key={i} className="bg-yellow-400/20" />)}
      </div>
    </div>
  );
}

function WifiIcon({ accent }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`w-4 h-4 ${accent}`}>
      <path d="M5 12.55a11 11 0 0114.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M1.42 9a16 16 0 0121.16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M8.53 16.11a6 6 0 016.95 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  );
}

function CardVisual({ tier, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 3 }}
      className="cursor-pointer"
      style={{ perspective: 600 }}
      onClick={onClick}
    >
      <div
        className={`relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-br ${tier.color} border ${tier.border} p-5 flex flex-col justify-between overflow-hidden`}
        style={{ boxShadow: `0 8px 40px ${tier.glow}, 0 2px 10px rgba(0,0,0,0.6)` }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(197,165,90,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.6) 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }} />
        {/* Holographic sheen */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full bg-white/5" style={{ transform: "translate(30%, 30%)" }} />

        {/* Top row: logo + name + wifi */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <img src={tier.logo} alt="Blanch Onyx" className="h-5 w-auto opacity-80" />
            <div>
              <p className={`font-heading text-[9px] tracking-[0.25em] ${tier.accent} uppercase`}>BLANCH ONYX</p>
              <p className="text-white/30 text-[7px] tracking-[0.15em] uppercase">BLACK CARD</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WifiIcon accent={tier.accent} />
            <div className="text-right">
              <p className={`font-heading text-[10px] ${tier.accent}`}>{tier.name}</p>
              <p className="text-white/30 text-[8px]">{tier.tier}</p>
            </div>
          </div>
        </div>

        {/* RFID chip */}
        <div className="relative z-10">
          <RFIDChip />
        </div>

        {/* Bottom row */}
        <div className="relative z-10">
          <p className="text-white/15 text-xs tracking-[0.3em] font-mono mb-2">•••• •••• •••• ••••</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/25 text-[7px] uppercase tracking-wider">Member Name</p>
              <p className={`${tier.accent} text-[10px] font-heading tracking-[0.1em]`}>Royal Member</p>
            </div>
            <div className="text-right">
              <p className="text-white/25 text-[7px] uppercase tracking-wider">Powered by</p>
              <p className={`${tier.accent} text-[9px] font-heading`}>BLANCH ONYX DLT</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HardwareDeviceVisual({ tier, onClick }) {
  const isObsidian = tier.name === "Obsidian";
  const isRoyal = tier.name === "Royal Black Gold";
  const isSardonyx = tier.name === "Sardonyx";
  const isExecutive = tier.name === "Onyx Executive";

  let led = "bg-primary";
  let deviceBorder = "border-primary/25";
  let deviceBg = "from-zinc-900 to-stone-950";

  if (isObsidian) {
    led = "bg-yellow-400";
    deviceBorder = "border-yellow-400/40";
    deviceBg = "from-black via-zinc-950 to-neutral-900";
  } else if (isRoyal) {
    led = "bg-amber-400";
    deviceBorder = "border-amber-400/50";
    deviceBg = "from-black via-yellow-950/40 to-stone-950";
  } else if (isSardonyx) {
    led = "bg-orange-600";
    deviceBorder = "border-orange-900/40";
    deviceBg = "from-stone-900 via-orange-950/20 to-neutral-950";
  } else if (isExecutive) {
    led = "bg-blue-400";
    deviceBorder = "border-blue-400/35";
    deviceBg = "from-zinc-900 to-slate-950";
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full aspect-[1/1.65] rounded-2xl bg-gradient-to-b ${deviceBg} border ${deviceBorder} p-4 flex flex-col justify-between overflow-hidden cursor-pointer group`}
      style={{ 
        boxShadow: `0 12px 35px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.05)`,
        perspective: 600
      }}
      onClick={onClick}
    >
      {/* Circuit board accent */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-xl pointer-events-none" />

      {/* Top Bar: Device Status */}
      <div className="flex justify-between items-center relative z-10">
        <span className="text-[7px] text-white/30 tracking-[0.25em] font-mono">B-HARDWARE v1.08</span>
        {/* Breathing LED */}
        <div className="flex items-center gap-1 relative">
          <span className={`w-1.5 h-1.5 rounded-full ${led} animate-ping absolute opacity-70`} />
          <span className={`w-1.5 h-1.5 rounded-full ${led} relative z-10`} />
        </div>
      </div>

      {/* Micro LCD Monitor */}
      <div className="bg-black/95 rounded-lg p-2.5 font-mono text-[9px] relative overflow-hidden border border-border/40 select-none z-10 my-2">
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
        <div className="flex justify-between text-white/40 text-[6.5px] mb-1">
          <span>BLANCH SECURE OS</span>
          <span className="animate-pulse text-emerald-400">● LIVE</span>
        </div>
        <div className={`${tier.accent} font-semibold font-heading text-[10px] tracking-wide truncate mt-0.5`}>
          {tier.name.toUpperCase()}
        </div>
        <div className="text-white/60 text-[7.5px]">{tier.tier}</div>
        <div className="mt-2 flex justify-between items-center text-[6.5px] text-white/35 border-t border-white/5 pt-1">
          <span>DLT WALLET ACTIVE</span>
          <span className="text-emerald-400">100% OK</span>
        </div>
      </div>

      {/* Chip & NFC Antenna */}
      <div className="flex justify-between items-center px-1 z-10">
        <div className="w-6 h-5 rounded-sm border border-yellow-400/30 bg-gradient-to-br from-yellow-500/20 to-amber-700/10 p-0.5">
          <div className="w-full h-full grid grid-cols-2 gap-px bg-yellow-400/20 rounded-sm" />
        </div>
        <div className="text-white/20">
          <WifiIcon accent="text-white/20" />
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-1 px-1 mt-2 z-10">
        {Array(12).fill(0).map((_, idx) => (
          <div 
            key={idx} 
            className="w-full aspect-square max-h-[1.4rem] max-w-[1.4rem] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-white/40 font-mono group-hover:bg-white/10 group-hover:text-white/80 transition-all duration-150 mx-auto"
          >
            {idx === 9 ? "*" : idx === 10 ? "0" : idx === 11 ? "#" : idx + 1}
          </div>
        ))}
      </div>

      {/* Hardware identifier */}
      <div className="text-center mt-3 z-10 border-t border-white/5 pt-2">
        <p className={`text-[8px] uppercase tracking-widest font-heading ${tier.accent}`}>{tier.name} Wallet</p>
      </div>
    </motion.div>
  );
}

function CardModal({ tier, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30 }}
        className="bg-card border border-border max-w-4xl w-full p-6 md:p-8 relative my-8"
        style={{ boxShadow: `0 20px 80px ${tier.glow}` }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground z-10"><X className="w-5 h-5" /></button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Card visual and basic identification */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="w-full">
              <CardVisual tier={tier} onClick={() => {}} />
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-start gap-3">
                <img src={tier.logo} alt="" className="h-6 w-auto opacity-70 shrink-0 mt-1" />
                <div>
                  <h2 className="font-heading text-lg tracking-[0.05em] text-foreground leading-tight">{tier.name} Card</h2>
                  <p className={`text-xs ${tier.accent} mt-0.5`}>{tier.tagline}</p>
                </div>
              </div>
              <div className="border-t border-border/20 pt-3 space-y-1 text-xs text-foreground/80">
                <p>Tier: <span className="text-foreground font-heading">{tier.tier}</span></p>
                <p>Membership: <span className={`font-heading ${tier.accent}`}>{tier.price}</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: Card Benefits, Technical Specs, Action */}
          <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-heading text-xs tracking-[0.15em] text-primary uppercase mb-3">Card Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {tier.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground/80 leading-normal">{f}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 border-t border-border/30 pt-4">
                {[
                  { label: "RFID Chip", value: "NFC Enabled" },
                  { label: "Network", value: "Blanch Onyx DLT" },
                  { label: "Settlement", value: "Instant / 0 Fee" },
                  { label: "Security", value: "5-Layer DLT" },
                ].map(s => (
                  <div key={s.label} className="border border-border/20 p-2.5 bg-card/40">
                    <p className="text-[9px] text-foreground/50 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xs text-foreground font-heading mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/membership" onClick={onClose}
              className="w-full py-3.5 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.2em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Apply for Membership <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
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

export default function BlackCardPage() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Eyebrow>Sovereign Financial Identity</Eyebrow>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">
            Blanch Onyx <br /><em>Black Card</em>
          </h1>
          <p className="font-display text-lg text-foreground/85 italic max-w-2xl mx-auto">
            An exclusive sovereign Business Card, Debit Card, Standalone Electronic Wallet, and Hardware Ledger Device — all in one.
          </p>
          <p className="text-xs text-foreground/50 mt-3">Click any card to view full details & benefits</p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Card tiers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CARD_TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <CardVisual tier={tier} onClick={() => setSelectedCard(tier)} />
              <div className="mt-3 text-center">
                <p className="font-heading text-xs text-foreground">{tier.name}</p>
                <p className="text-[10px] text-foreground/60">{tier.tier}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground text-center mb-3">Card Features</h2>
        <div className="w-16 h-px bg-primary/40 mx-auto mb-10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all card-lift">
              <f.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-heading text-xs text-foreground mb-2">{f.title}</h4>
              <p className="text-foreground/75 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Standalone Electronic Wallet & Debit Card Section */}
        <div className="mt-24 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">All-in-One Hardware Innovation</p>
            <h2 className="font-heading text-2xl md:text-3xl tracking-[0.1em] text-foreground mb-4">Standalone Electronic Wallet & Debit Card</h2>
            <div className="w-20 h-px bg-primary/40 mx-auto mb-6" />
            <p className="text-foreground/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Discover the absolute convergence of digital identity, universal access control, and infinite financial freedom. The <strong className="text-primary font-heading">Blanch Onyx Black Card</strong> is not a simple plastic card—it is a standalone micro-computer operating within the <strong className="text-foreground font-heading">Blanch Onyx DLT</strong> on the <strong className="text-foreground font-heading">Blanch Network</strong> ecosystem.
            </p>
          </motion.div>

          {/* New Paragraph */}
          <div className="text-center mb-10 max-w-3xl mx-auto border-t border-b border-border/10 py-6 my-8">
            <p className="text-foreground text-sm md:text-base font-semibold tracking-wide">
              Your membership Includes Stock Standalone Electronic Wallet
            </p>
            <p className="text-primary text-[10px] md:text-xs tracking-wider mt-1.5 uppercase font-heading">
              Click any Stock Standalone Electronic Wallet Hardware Device to view full details & benefits
            </p>
          </div>

          {/* Hardware Devices visual grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
            {CARD_TIERS.map((tier, i) => (
              <motion.div key={tier.name + "-hardware"} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <HardwareDeviceVisual tier={tier} onClick={() => setSelectedCard(tier)} />
                <div className="mt-3 text-center">
                  <p className="font-heading text-xs text-foreground">{tier.name}</p>
                  <p className="text-[10px] text-foreground/60">{tier.tier}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Ecosystem & Kingdom Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-border/30 bg-card/60 p-8 hover:border-primary/20 transition-all backdrop-blur-sm relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm text-foreground tracking-wide">The Unified Platform</h3>
                  <p className="text-[9px] text-primary uppercase tracking-widest font-heading mt-0.5">Kingdom & AI Apps</p>
                </div>
              </div>
              
              <div className="space-y-5 text-xs text-foreground/80 leading-relaxed">
                <p>
                  The <strong className="text-foreground font-heading">Blanch Onyx Black Card</strong> operates as an all-in-one digital identity, access key, and financial device, bringing the entire Blanch Network suite straight to your hands.
                </p>

                {/* Bible App Embedded Panel */}
                <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-2">
                  <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> AHAYAH & YASHAYA Bible App
                  </p>
                  <p className="text-[11px] text-foreground/75 leading-relaxed">
                    Featuring the <span className="text-primary font-medium">Verse of the Day</span>, <span className="text-primary font-medium">Gospel of the Day</span>, and <span className="text-primary font-medium">Law of the Day</span>, synchronized directly to your device screen.
                  </p>
                </div>

                <p>
                  Features native integration with the <strong className="text-foreground">Blanch S.H.I.E.L.D. AI App</strong> to access autonomous security services, real-time secure community chats, and immediate alerts.
                </p>

                <p>
                  Cardholders receive exclusive discounts on products and services across the entire sovereign network, with direct links mapping your physical card to your secure virtual profile.
                </p>

                <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-2">
                  <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-primary" /> Circle Agent Referrals
                  </p>
                  <p className="text-[11px] text-foreground/75 leading-relaxed">
                    Each card holds your custom <strong className="text-foreground">Circle Agent ID Number</strong>, serving as your affiliate referral key for automated Referral Commissions, Blessings, Rewards, Bonuses, and Charity allocations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Sovereign Back of the Card & Universal Access */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-border/30 bg-card/60 p-8 hover:border-primary/20 transition-all backdrop-blur-sm relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm text-foreground tracking-wide">Back of the Card Credentials</h3>
                  <p className="text-[9px] text-primary uppercase tracking-widest font-heading mt-0.5">Physical & Digital Fingerprint</p>
                </div>
              </div>

              <div className="space-y-5 text-xs text-foreground/80 leading-relaxed">
                <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-3">
                  <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-primary" /> Back of the Card Credentials
                  </p>
                  <div className="space-y-2 font-mono text-[9.5px]">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <span className="text-foreground/45 text-[8.5px] uppercase tracking-wider">CIRCLE AGENT ID</span> 
                      <span className="text-primary font-bold tracking-wide">BN-BOX-CA-XXXXX-XXXX</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <span className="text-foreground/45 text-[8.5px] uppercase tracking-wider">LEI NUMBER</span> 
                      <span className="text-foreground/80 font-medium tracking-wide">549300XXXXXXXXXXXX88</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/45 text-[8.5px] uppercase tracking-wider">BUSINESS CARD ID</span> 
                      <span className="text-foreground font-medium tracking-wide">BN-BOX-BC-XXXXX-XXXX</span>
                    </div>
                  </div>
                </div>

                <p>
                  The <strong className="text-foreground">Business Card ID</strong> acts as your centralized, secure digital credential within the standalone electronic wallet. By linking key identifiers like the <strong className="text-foreground">Legal Entity Identifier (LEI)</strong> and Merchant Identification Number (MID), it acts as a comprehensive "digital fingerprint" for secure, high-security networking, facility access, Transactions, Cyber Security, your AI Personal Driver, and client safety.
                </p>

                <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-2">
                  <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-primary" /> Universal Access Key (NFC)
                  </p>
                  <p className="text-[11px] text-foreground/75 leading-relaxed">
                    Tap-and-enter access to secure homes, private businesses, major events, smart cities, and partner smart infrastructures. Seamlessly links to <strong className="text-foreground">Blanch Automotive</strong> vehicles (cars, planes, boats, buses, trains, shuttles, spacecraft) and your personal E-Car Wallet.
                  </p>
                </div>

                <p>
                  Integrated <strong className="text-primary">Blanch S.H.I.E.L.D. AI</strong> technology enables advanced holographic projection, projecting interactive functions, transaction confirmations, and serving as your primary identity and access credential within the immersive Metaverse.
                </p>
              </div>
            </motion.div>

            {/* Column 3: High-Tech Hardware Specifications */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border border-border/30 bg-card/60 p-8 hover:border-primary/20 transition-all backdrop-blur-sm relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm text-foreground tracking-wide">Standalone Micro-Computer</h3>
                  <p className="text-[9px] text-primary uppercase tracking-widest font-heading mt-0.5">Hardware Specifications</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-foreground/80 leading-relaxed">
                <p>
                  Unlike legacy debit cards, the Black Card is a standalone physical computer. It is armed with a secure <strong className="text-foreground">CPU, RFID, NFC, a secure graphics display, a Touch Screen keypad</strong>, and multi-protocol wireless connectivity.
                </p>

                {/* Mesh Networking Highlight */}
                <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-2">
                  <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-primary" /> RF Mesh Networking
                  </p>
                  <p className="text-[11px] text-foreground/75 leading-relaxed">
                    Cards communicate directly via radio frequency (RF) without requiring cellular towers or internet access—enabling secure peer-to-peer transactions and local community currencies anywhere on earth.
                  </p>
                </div>

                <p>
                  Engineered with an optimized <strong className="text-foreground">LCD screen and long-life primary battery</strong> (refined from Flex solar/e-paper blueprints) for maximum reliability. The device functions as a <strong className="text-primary font-medium">Portable Satellite Internet Device</strong>.
                </p>

                <p>
                  Functions as a highly secure <strong className="text-foreground">Portable SSD (NTFS format)</strong>. Safely upload and carry files synced with Blanch Cloud, Blanch Drive, Blanch Network Cloud, Blanch Network Drive, and Blanch S.H.I.E.L.D. AI Cloud services. Check your email and manage your virtual marketplace securely.
                </p>

                <div className="bg-primary/5 p-4 border-l-2 border-primary font-mono text-[11px] text-foreground/90 space-y-1">
                  <p className="font-heading font-sans text-primary text-[10px] uppercase tracking-widest">Super Cross-Border Wallet</p>
                  <p className="leading-normal">
                    One single device supports all digital wallets and multiple accounts, granting unlimited authority over cryptocurrencies, digital fiat, tokens, CBDCs, BRICS financial systems, and hybrid banknotes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Three CTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-20">
          {/* Card 1: Ready to Carry Your Sovereignty? */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-primary/20 bg-card/60 p-8 flex flex-col justify-between hover:border-primary/40 transition-all backdrop-blur-sm relative group rounded-lg"
          >
            <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
            <div className="space-y-4 mb-6">
              <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary w-fit">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg text-foreground tracking-wide leading-snug">Ready to Carry Your Sovereignty?</h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                The Blanch Onyx Black Card is issued exclusively to verified members. Apply for membership to receive your card.
              </p>
            </div>
            <Link to="/membership" className="w-full py-3.5 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.2em] uppercase hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 rounded">
              Apply for Membership <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 2: Customization & Standalone Electronic Wallet */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-primary/20 bg-card/60 p-8 flex flex-col justify-between hover:border-primary/40 transition-all backdrop-blur-sm relative group rounded-lg"
          >
            <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
            <div className="space-y-4 mb-6">
              <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary w-fit">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg text-foreground tracking-wide leading-snug">Customization Blanch Onyx Black Card & Standalone Electronic Wallet</h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Generate, Customize, Make and Order your bespoke physical device configured to your sovereign requirements.
              </p>
            </div>
            <Link to="/profile" className="w-full py-3.5 border border-primary text-primary font-heading text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all text-center flex items-center justify-center gap-2 rounded">
              Learn More and Go to Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 3: Upgrade & Marketplace */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-primary/20 bg-card/60 p-8 flex flex-col justify-between hover:border-primary/40 transition-all backdrop-blur-sm relative group rounded-lg"
          >
            <div className="absolute top-0 left-0 w-1 h-12 bg-primary group-hover:h-full transition-all duration-300" />
            <div className="space-y-4 mb-6">
              <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-md text-primary w-fit">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg text-foreground tracking-wide leading-snug">Upgrade your Standalone Electronic Wallet & Debit Card</h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Once you place your order it is Ready to be Assigned to you from the Marketplace. Select your specific upgraded models and features.
              </p>
              <div className="bg-primary/5 border border-primary/15 p-4 rounded space-y-2">
                <p className="font-heading text-[10px] text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-primary" /> Shop and Ship
                </p>
                <p className="text-[11px] text-foreground/75 leading-relaxed">
                  Sovereign logistics and delivery to your physical coordination point.
                </p>
              </div>
            </div>
            <Link to="/marketplace" className="w-full py-3.5 bg-primary/10 border border-primary/30 text-foreground font-heading text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all text-center flex items-center justify-center gap-2 rounded">
              Shop <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && <CardModal tier={selectedCard} onClose={() => setSelectedCard(null)} />}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/black-card')({
  component: BlackCardPage,
});
