import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Shield, Wallet, Globe, Lock, Zap, CheckCircle, Building2, Activity, Wifi, X, ChevronRight } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";
const LOGO_BLACK = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/d8b42577b_BlogoBlackandBrown.png";

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
    logo: LOGO_BROWN,
    tagline: "The Elite Card — Distinguished Member",
    features: ["Governance Participation", "Elite Networking Events", "Business Corridor Access", "Quarterly Retreat Invitations", "Member Investment Access"],
    highlight: "text-primary",
    glow: "rgba(197,165,90,0.15)",
    price: "5,000 BOX/yr",
  },
  {
    name: "Partner",
    tier: "Partner",
    color: "from-zinc-900 via-stone-900 to-neutral-900",
    accent: "text-primary/70",
    border: "border-primary/20",
    logo: LOGO_BROWN,
    tagline: "The Commerce Card — Kingdom Business",
    features: ["Business Network Listing", "Commerce Partnerships", "Annual Summit Access", "Investment Opportunities"],
    highlight: "text-primary/70",
    glow: "rgba(197,165,90,0.08)",
    price: "2,500 BOX/yr",
  },
  {
    name: "Onyx Executive",
    tier: "Executive",
    color: "from-zinc-900 to-stone-950",
    accent: "text-blue-400",
    border: "border-blue-400/30",
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
    color: "from-zinc-900 to-zinc-950",
    accent: "text-primary/80",
    border: "border-primary/20",
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

function CardModal({ tier, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30 }}
        className="bg-card border border-border max-w-lg w-full p-8 relative"
        style={{ boxShadow: `0 20px 80px ${tier.glow}` }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-foreground"><X className="w-5 h-5" /></button>

        {/* Card preview in modal */}
        <div className="mb-6">
          <CardVisual tier={tier} onClick={() => {}} />
        </div>

        <div className="flex items-start gap-3 mb-4">
          <img src={tier.logo} alt="" className="h-6 w-auto opacity-70" />
          <div>
            <h2 className="font-heading text-xl tracking-[0.05em] text-foreground">{tier.name} Card</h2>
            <p className={`text-xs ${tier.accent} mt-0.5`}>{tier.tagline}</p>
          </div>
        </div>

        <p className="text-sm text-white mb-1">Tier: <span className="text-foreground font-heading">{tier.tier}</span></p>
        <p className="text-sm text-white mb-5">Membership: <span className={`font-heading ${tier.accent}`}>{tier.price}</span></p>

        <h3 className="font-heading text-xs tracking-[0.15em] text-primary uppercase mb-3">Card Benefits</h3>
        <div className="grid grid-cols-1 gap-2 mb-6">
          {tier.features.map(f => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-primary shrink-0" />
              <span className="text-xs text-white">{f}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 border-t border-border/30 pt-4">
          {[
            { label: "RFID Chip", value: "NFC Enabled" },
            { label: "Network", value: "Blanch Onyx DLT" },
            { label: "Settlement", value: "Instant / 0 Fee" },
            { label: "Security", value: "5-Layer DLT" },
          ].map(s => (
            <div key={s.label} className="border border-border/20 p-3">
              <p className="text-[9px] text-white/50 uppercase tracking-wider">{s.label}</p>
              <p className="text-xs text-foreground font-heading mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        <Link to="/membership" onClick={onClose}
          className="w-full py-3 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.2em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
          Apply for Membership <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function BlackCardPage() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-white/40">BLACK CARD</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Sovereign Financial Identity</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Blanch Onyx Black Card</h1>
          <p className="font-display text-lg text-white italic max-w-2xl mx-auto">
            An exclusive sovereign Business Card, Debit Card, Standalone Electronic Wallet, and Hardware Ledger Device — all in one.
          </p>
          <p className="text-xs text-white/50 mt-3">Click any card to view full details & benefits</p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Card tiers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CARD_TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <CardVisual tier={tier} onClick={() => setSelectedCard(tier)} />
              <div className="mt-3 text-center">
                <p className="font-heading text-xs text-foreground">{tier.name}</p>
                <p className="text-[10px] text-white/60">{tier.tier}</p>
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
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all">
              <f.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-heading text-xs text-foreground mb-2">{f.title}</h4>
              <p className="text-white text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center border border-primary/20 bg-primary/5 p-12">
          <p className="font-heading text-xl text-foreground mb-3">Ready to Carry Your Sovereignty?</p>
          <p className="text-white text-sm mb-6 max-w-xl mx-auto">
            The Blanch Onyx Black Card is issued exclusively to verified members. Apply for membership to receive your card.
          </p>
          <Link to="/membership" className="px-10 py-4 bg-primary text-primary-foreground font-heading text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all inline-block">
            Apply for Membership
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && <CardModal tier={selectedCard} onClose={() => setSelectedCard(null)} />}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute('/black-card')({
  component: BlackCardPage,
});
