import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Globe, Search, Building2, ArrowLeft, ExternalLink, CheckCircle, Briefcase, Users, Zap, BookOpen, Heart, Cpu, Home, Landmark, Shield, Plus, ChevronRight, Network } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const CAT_ICONS = { finance: Landmark, technology: Cpu, health: Heart, education: BookOpen, commerce: Briefcase, media: Globe, real_estate: Home, energy: Zap, legal: Shield, consulting: Users };
const CAT_LABELS = { finance: "Finance", technology: "Technology", health: "Health & Wellness", education: "Education", commerce: "Commerce", media: "Media", real_estate: "Real Estate", energy: "Energy", legal: "Legal", consulting: "Consulting" };

const B2B_MODELS = [
  { code: "B2B", from: "Business to Business", desc: "Connect with businesses for partnerships, supply chains, and enterprise deals", tags: ["Wholesale Trading", "Strategic Partnerships", "Supply Chain", "Enterprise Solutions"], color: "text-primary border-primary/30 bg-primary/5" },
  { code: "B2C", from: "Business to Consumer", desc: "Reach consumers directly with products, services, and special offers", tags: ["Retail Products", "Direct Services", "Consumer Discounts", "Customer Support"], color: "text-blue-400 border-blue-400/30 bg-blue-400/5" },
  { code: "C2B", from: "Consumer to Business", desc: "Individuals offer services, products, or value to businesses", tags: ["Freelance Services", "Influencer Marketing", "Consumer Feedback", "Reverse Auctions"], color: "text-green-400 border-green-400/30 bg-green-400/5" },
  { code: "C2C", from: "Consumer to Consumer", desc: "Peer-to-peer marketplace for individuals to trade", tags: ["Resale Marketplace", "Used Goods", "Peer Services", "Community Trading"], color: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
  { code: "B2G", from: "Business to Government", desc: "Access government contracts, programs, and institutional opportunities", tags: ["Government Contracts", "PPP Programs", "Institutional Trading", "Compliance Services"], color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
];

const PLAN_TIERS = [
  { name: "Free", price: "0 BOX", features: ["Business profile listing", "Directory search access", "Basic messaging", "Community events access"] },
  { name: "Sardonyx - Initiate", price: "100 BOX/yr", features: ["All Free features", "Enhanced profile listing", "Priority search visibility", "Marketplace participation"] },
  { name: "Associate", price: "250 BOX/yr", features: ["All Sardonyx features", "Marketplace access", "Partner discounts", "Social feed participation"] },
  { name: "Executive", price: "1,000 BOX/yr", features: ["All Associate features", "Advanced analytics dashboard", "Direct partner messaging", "Event invitations"] },
  { name: "Partner", price: "2,500 BOX/yr", features: ["All Associate features", "Commerce partnerships", "Annual summit access", "Investment opportunities"] },
  { name: "Elite", price: "5,000 BOX/yr", features: ["All Partner features", "B2B corridor access", "Elite networking events", "Global merchant network"] },
  { name: "Onyx-Council", price: "7,500 BOX/yr", features: ["All Elite features", "Governance veto rights", "Direct Elder Council access", "Black Card — Onyx Council Level"] },
  { name: "Royal - Throne", price: "10,000 BOX/yr", features: ["All Onyx-Council features", "Exclusive governance role", "Direct Royal Council access", "Black Card — Royal Gold Level"] },
  { name: "Founding", price: "By Invitation", features: ["All Elite features", "Governance veto rights", "Direct Elder Council access", "Black Card — Obsidian Level"] },
];

function BizCard({ biz }) {
  const CatIcon = CAT_ICONS[biz.category] || Building2;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/40 p-6 hover:border-primary/20 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 border border-primary/10 flex items-center justify-center">
          {biz.logo_url ? <img src={biz.logo_url} alt={biz.business_name} className="w-10 h-10 object-contain" /> : <CatIcon className="w-5 h-5 text-primary/60" />}
        </div>
        {biz.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
      </div>
      <h3 className="font-heading text-sm tracking-[0.05em] text-foreground mb-1">{biz.business_name}</h3>
      <p className="text-primary/70 text-[10px] tracking-[0.1em] uppercase mb-1">{biz.owner_name}</p>
      <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border border-border/40 text-white mb-3 inline-block">{CAT_LABELS[biz.category] || biz.category}</span>
      <p className="text-white text-xs leading-relaxed line-clamp-3">{biz.description}</p>
      {biz.location && <p className="text-white/40 text-[10px] mt-2">{biz.location}</p>}
      {biz.website && (
        <a href={biz.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary text-[10px] mt-3 hover:underline">
          <ExternalLink className="w-3 h-3" /> Visit Website
        </a>
      )}
    </motion.div>
  );
}

const MAIN_TABS = ["all", "b2b-g2g", "networks", "membership"];
const CAT_TABS = ["all", "finance", "technology", "health", "education", "commerce", "media", "real_estate", "energy", "legal", "consulting"];

export default function BusinessNetwork() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainTab, setMainTab] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("business_listings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data) setListings(data);
        setLoading(false);
      });
  }, []);

  const filtered = listings.filter(b => {
    const matchCat = category === "all" || b.category === category;
    const matchSearch = !search || b.business_name?.toLowerCase().includes(search.toLowerCase()) || b.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">BUSINESS NETWORK</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Sovereign Business Network</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Business Network</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl">
            Connect with kingdom-aligned businesses, entrepreneurs, and sovereign enterprises.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border/30 overflow-x-auto">
          {MAIN_TABS.map(tab => (
            <button key={tab} onClick={() => setMainTab(tab)}
              className={`px-4 py-3 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2 whitespace-nowrap ${mainTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tab.replace("-", " → ").replace(/\b\w/g, c => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CAT_TABS.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border whitespace-nowrap transition-all ${category === cat ? "border-primary text-primary bg-primary/10" : "border-border/40 text-muted-foreground hover:border-primary/40"}`}>
              {CAT_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" />
        </div>

        {/* Listings grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm mt-4">Loading network...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No businesses found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(biz => <BizCard key={biz.id} biz={biz} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/business-network")({
  component: BusinessNetwork,
});
