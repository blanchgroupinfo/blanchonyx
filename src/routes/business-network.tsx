<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Search, 
  Building2, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Briefcase, 
  Users, 
  Zap, 
  BookOpen, 
  Heart, 
  Cpu, 
  Home, 
  Landmark, 
  Shield, 
  ShieldCheck,
  Coins, 
  Activity,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight
} from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

// Category Icons & Labels mapping
const CAT_ICONS = { 
  finance: Landmark, 
  technology: Cpu, 
  health: Heart, 
  education: BookOpen, 
  commerce: Briefcase, 
  media: Globe, 
  real_estate: Home, 
  energy: Zap, 
  legal: Shield, 
  consulting: Users 
};

const CAT_LABELS = { 
  finance: "Finance", 
  technology: "Technology", 
  health: "Health & Wellness", 
  education: "Education", 
  commerce: "Commerce", 
  media: "Media", 
  real_estate: "Real Estate", 
  energy: "Energy", 
  legal: "Legal", 
  consulting: "Consulting" 
};

const MAIN_TABS = [
    { id: "membership", label: "Membership" },
  { id: "b2b-g2g", label: "B2B-G2G" },
  { id: "networks", label: "Networks" },
  { id: "list-businesses", label: "List Businesses" }
];

const CAT_TABS = [
  { id: "all", label: "All" },
  { id: "finance", label: "Finance" },
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health & Wellness" },
  { id: "education", label: "Education" },
  { id: "commerce", label: "Commerce" },
  { id: "media", label: "Media" },
  { id: "real_estate", label: "Real Estate" },
  { id: "energy", label: "Energy" },
  { id: "legal", label: "Legal" },
  { id: "consulting", label: "Consulting" }
];

// Default listings populated for List Businesses tab
const DEFAULT_BUSINESSES = [
  {
    id: "kb-1",
    business_name: "Kingdom Capital Partners",
    category: "finance",
    description: "Sovereign investment fund specializing in kingdom-aligned ventures, real estate, and community development projects.",
    location: "Atlanta, GA",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-2",
    business_name: "Covenant Tech Solutions",
    category: "technology",
    description: "Full-service technology firm providing DLT integration, smart city infrastructure, and S.H.I.E.L.D. AI implementations.",
    location: "Houston, TX",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-3",
    business_name: "Heritage Health Collective",
    category: "health",
    description: "Holistic wellness center offering traditional healing, nutrition counseling, and community health education programs.",
    location: "Charlotte, NC",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-4",
    business_name: "Sovereign Media Group",
    category: "media",
    description: "Kingdom-aligned media production company specializing in broadcast, podcast, documentary, and social media content.",
    location: "Los Angeles, CA",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  }
];

// Ten Interoperable Networks details
const INTEROPERABLE_NETWORKS = [
  { code: "B2B", from: "Business to Business", desc: "Connect with businesses for partnerships, supply chains, and enterprise deals", tags: ["Wholesale Trading", "Strategic Partnerships", "Supply Chain", "Enterprise Solutions"] },
  { code: "B2C", from: "Business to Consumer", desc: "Reach consumers directly with products, services, and special offers", tags: ["Retail Products", "Direct Services", "Consumer Discounts", "Customer Support"] },
  { code: "C2B", from: "Consumer to Business", desc: "Individuals offer services, products, or value to businesses", tags: ["Freelance Services", "Influencer Marketing", "Consumer Feedback", "Reverse Auctions"] },
  { code: "C2C", from: "Consumer to Consumer", desc: "Peer-to-peer marketplace for individuals to trade", tags: ["Resale Marketplace", "Used Goods", "Peer Services", "Community Trading"] },
  { code: "B2G", from: "Business to Government", desc: "Access government contracts, programs, and institutional opportunities", tags: ["Government Contracts", "PPP Programs", "Institutional Trading", "Compliance Services"] },
  { code: "C2G", from: "Consumer to Government", desc: "Citizens interact with government services and payments", tags: ["Tax Payments", "Service Fees", "License Applications", "Citizen Services"] },
  { code: "G2B", from: "Government to Business", desc: "Government services and information for businesses", tags: ["Business Registration", "Tax Services", "Regulatory Information", "Grants & Funding"] },
  { code: "G2C", from: "Government to Citizen", desc: "Government services and benefits for citizens", tags: ["Public Services", "Benefits Distribution", "Information Access", "Civic Engagement"] },
  { code: "G2E", from: "Government to Employee", desc: "Government services for public sector employees", tags: ["Payroll Services", "Benefits Management", "Training Programs", "Employee Portals"] },
  { code: "G2G", from: "Government to Government", desc: "Inter-governmental collaborations and partnerships", tags: ["International Trade", "Policy Coordination", "Shared Services", "Cross-border Programs"] },
];

// Active Networks data
const ACTIVE_NETWORKS = [
  {
    title: "Global Financial Alliance",
    desc: "Premier network of financial institutions and investment firms",
    category: "Banking & Finance",
    location: "Worldwide",
    members: "1,200+ Members"
  },
  {
    title: "Smart City Consortium",
    desc: "Coalition of smart city developers and technology providers",
    category: "Urban Development",
    location: "North America & Europe",
    members: "450+ Members"
  },
  {
    title: "Digital Asset Exchange Network",
    desc: "Leading network for digital asset trading and custody solutions",
    category: "Digital Assets",
    location: "Asia Pacific",
    members: "850+ Members"
  },
  {
    title: "Healthcare Innovation Partners",
    desc: "Network dedicated to healthcare technology advancement",
    category: "Healthcare",
    location: "Global",
    members: "620+ Members"
  },
  {
    title: "Sustainable Energy Coalition",
    desc: "Alliance for renewable energy projects and investments",
    category: "Energy",
    location: "Europe & Middle East",
    members: "350+ Members"
  },
  {
    title: "Trade & Commerce Union",
    desc: "Cross-border trade facilitation and commerce network",
    category: "Commerce",
    location: "Africa & Americas",
    members: "1,500+ Members"
  }
];

export default function BusinessNetwork() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainTab, setMainTab] = useState("membership");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("business_listings")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        let fetched = data || [];
        const combined = [...DEFAULT_BUSINESSES];
        
        // Merge Supabase entries avoiding duplicate names
        fetched.forEach(item => {
          if (!combined.some(c => c.business_name.toLowerCase() === item.business_name.toLowerCase())) {
            combined.push({
              id: item.id.toString(),
              business_name: item.business_name,
              category: item.category,
              description: item.description,
              location: item.location || "Online",
              owner_name: item.owner_name || "Sovereign Partner",
              website: item.website || "#",
              verified: item.verified || false
            });
          }
        });

        setListings(combined);
        setLoading(false);
      });
  }, []);

  const filteredListings = listings.filter(b => {
    const matchCat = category === "all" || b.category === category;
    const matchSearch = !search || 
      b.business_name?.toLowerCase().includes(search.toLowerCase()) || 
      b.description?.toLowerCase().includes(search.toLowerCase()) ||
      b.location?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Core Hero Branding */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono">Sovereign Business Network</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] text-foreground mb-4">Business Networks</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl leading-relaxed">
            Connect with elite partners, industry leaders, and strategic allies across our global network ecosystem.
          </p>
        </motion.div>

        {/* Custom Navigation Tabs */}
        <div className="flex gap-2 mb-10 border-b border-border/20 overflow-x-auto scrollbar-none pb-px">
          {MAIN_TABS.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setMainTab(tab.id)}
              className={`px-6 py-4 text-[11px] tracking-[0.2em] font-heading uppercase transition-all border-b-2 whitespace-nowrap -mb-px ${
                mainTab === tab.id 
                  ? "border-primary text-primary font-medium" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: B2B-G2G Tab */}
        {mainTab === "b2b-g2g" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-12">
              <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Explore Every Network</p>
              <h2 className="font-heading text-2xl md:text-3xl tracking-[0.1em] text-foreground mb-4">
                Ten interoperable network types — one Blanch Group ecosystem.
              </h2>
            </div>

            {/* Marquee Ticker */}
            <div className="marquee border-y border-primary/20 bg-primary/5 py-3 mb-16">
              <div className="marquee-track font-heading text-[10px] tracking-[0.25em] text-primary">
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-3xl tracking-[0.08em] text-foreground mb-2">Business Networks</h2>
              <p className="text-muted-foreground font-display text-sm italic">One unified platform connecting all business types</p>
            </div>

            {/* Ten Networks Grid - strictly styled as .vision-grid with precise borders, heights, and hovers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {INTEROPERABLE_NETWORKS.map((net, idx) => (
                <article 
                  key={net.code} 
                  className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[20rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-primary font-medium tracking-widest block mb-1">0{idx + 1}</span>
                    <strong className="text-2xl font-heading text-foreground tracking-wide block mb-1">{net.code}</strong>
                    <p className="text-[11px] font-heading tracking-[0.1em] uppercase text-primary mb-3">{net.from}</p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-6">{net.desc}</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {net.tags.map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 border border-border/30 rounded-sm text-foreground/70 bg-card/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2.5 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-[10px] tracking-[0.15em] font-heading uppercase transition-all duration-200 border border-primary/20 flex items-center justify-center gap-1">
                      Explore Network <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Networks Tab */}
        {mainTab === "networks" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACTIVE_NETWORKS.map(net => (
                <article 
                  key={net.title} 
                  className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[16rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[8px] uppercase tracking-[0.2em] font-mono">
                        <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> Active
                      </span>
                      <Building2 className="w-4 h-4 text-primary/60" />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2 tracking-[0.05em]">{net.title}</h3>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-6">{net.desc}</p>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t border-border/20 pt-4 mb-4">
                      <div>
                        <span className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.1em] block">Category</span>
                        <span className="font-medium text-foreground">{net.category}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.1em] block">Region</span>
                        <span className="font-medium text-foreground">{net.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] tracking-wider text-primary font-mono">{net.members}</span>
                      <button className="text-[10px] tracking-[0.15em] font-heading uppercase text-foreground hover:text-primary transition-all flex items-center gap-1">
                        Learn More <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Membership Tab */}
        {mainTab === "membership" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Join Banner */}
            <div className="bg-card border border-border/40 p-8 md:p-12 mb-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
              <div className="max-w-2xl mx-auto relative z-10">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-4">Ecosystem Membership</p>
                <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Join the Business Networks</h2>
                <p className="font-display text-muted-foreground italic text-sm md:text-base leading-relaxed mb-8">
                  "Connect with elite business partners, industry leaders, and strategic allies across our global network ecosystem"
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button className="px-8 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:shadow-lg hover:shadow-primary/20 transition-all">
                    Join the Network
                  </button>
                  <button className="px-8 py-3 border border-border hover:bg-muted text-foreground font-heading text-xs tracking-[0.15em] uppercase transition-all">
                    Explore Partners
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 border border-border/20 mb-16 text-center">
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">1,250+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Network Members</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">48+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Countries</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">$12T+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Transaction Volume</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">98%</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Partner Satisfaction</p>
              </div>
            </div>

            {/* Universal Business Networks Highlight Section */}
            <div className="border border-border/40 bg-card p-8 md:p-12 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-4xl relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-6 bg-primary" />
                  <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">Commerce · Business Networks</p>
                </div>
                <h2 className="font-heading text-3xl md:text-5xl text-foreground tracking-wide mb-6">
                  Universal Business Networks
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-display italic mb-10 max-w-3xl">
                  Connect with elite business partners, industry leaders, and strategic allies across our global network ecosystem — one unified platform connecting all business types. A sovereign business identity and networking platform connecting members to global commerce, partnerships, and divine-economy opportunities through the Blanch Corridor.
                </p>

                {/* Core Pillars Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-border/20">
                  {[
                    { title: "Member Enterprises", desc: "Directory of sovereign businesses owned by the Royal Priesthood.", icon: Building2 },
                    { title: "Sovereign Partnerships", desc: "B2B introductions across nations, tribes, and industries.", icon: Users },
                    { title: "Onyx DLT Settlement", desc: "Zero-fee trade settlement on Blanch Onyx DLT.", icon: Coins },
                    { title: "Global Reach", desc: "Member nodes across every inhabited continent.", icon: Globe }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary">
                        <item.icon className="w-4 h-4" />
                        <h4 className="font-heading text-xs tracking-[0.05em] uppercase text-foreground">{item.title}</h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Identity, Directory & Deals Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { label: "Identity", title: "Sovereign Business ID", desc: "One verified identity unlocks counterparties across continents and corridors." },
                { label: "Directory", title: "Kingdom-Aligned Directory", desc: "Trusted suppliers, partners, and member ventures — curated, not crowdsourced." },
                { label: "Deals", title: "Deal Flow", desc: "Pre-vetted opportunities surfaced to qualified members based on tier and stewardship." }
              ].map((item, idx) => (
                <div key={idx} className="bg-card/40 border border-border/30 p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-primary uppercase block mb-1">{item.label}</span>
                    <h4 className="font-heading text-base text-foreground tracking-wide mb-3">{item.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Sovereign Sectors & Quote */}
            <div className="border border-border/40 bg-card p-8 md:p-12 mb-16">
              <div className="text-center mb-10">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-2">Targeted Domains</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">Sovereign Sectors</h3>
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                {[
                  "Sacred Agriculture",
                  "Sovereign Finance",
                  "Heritage Crafts",
                  "Clean Energy",
                  "AI & Technology",
                  "Trade & Logistics",
                  "Healing Arts",
                  "Education & Media"
                ].map((sector, idx) => (
                  <div key={idx} className="border border-border/20 bg-background/50 p-4 text-center hover:border-primary/30 transition-all duration-200">
                    <p className="font-heading text-xs tracking-wider text-foreground uppercase">{sector}</p>
                  </div>
                ))}
              </div>

              {/* Devine Scripture Quote */}
              <div className="border-t border-border/20 pt-8 max-w-xl mx-auto text-center">
                <p className="font-display italic text-lg text-primary tracking-wide mb-2">
                  "The wealth of the sinner is laid up for the just."
                </p>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-mono">
                  — Proverbs 13:22
                </p>
              </div>
            </div>

            {/* Marquee Slider Repeater */}
            <div className="mb-16">
              <div className="mb-4 text-center">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-1">Explore Every Network</p>
                <p className="text-xs text-muted-foreground">Ten interoperable network types — one Blanch Group ecosystem.</p>
              </div>
              <div className="marquee border-y border-primary/20 bg-primary/5 py-3">
                <div className="marquee-track font-heading text-[10px] tracking-[0.25em] text-primary">
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                </div>
              </div>
            </div>

            {/* Why Join */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono mb-2">Exclusive Advantages</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">Why Join Our Network?</h3>
                <p className="text-muted-foreground text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                  Unlock unprecedented opportunities through strategic connections and collaborative partnerships.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: "Global Reach", desc: "Access partners across 150+ countries with established business relationships", icon: Globe },
                  { title: "Strategic Partnerships", desc: "Connect with vetted business partners for joint ventures and collaborations", icon: Award },
                  { title: "Growth Opportunities", desc: "Unlock new markets and revenue streams through network connections", icon: TrendingUp },
                  { title: "Trusted Network", desc: "All members undergo rigorous verification and compliance checks", icon: ShieldCheck }
                ].map(w => (
                  <article key={w.title} className="bg-card border border-border/40 p-6 card-lift hover:border-primary/50">
                    <w.icon className="w-6 h-6 text-primary mb-4" />
                    <h4 className="font-heading text-sm text-foreground mb-2 tracking-wide">{w.title}</h4>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">{w.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* How to Get Started */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono mb-2">Onboarding Pathway</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">How to Get Started</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {[
                  { step: "01", title: "Apply", desc: "Submit your application with business credentials and partnership goals" },
                  { step: "02", title: "Verify", desc: "Our team verifies your credentials and assesses network compatibility" },
                  { step: "03", title: "Connect", desc: "Access the network and start building valuable business relationships" }
                ].map(s => (
                  <div key={s.step} className="bg-card/50 border border-border/30 p-6 relative">
                    <span className="font-heading text-5xl text-primary/10 absolute right-4 top-4 font-mono font-bold">{s.step}</span>
                    <h4 className="font-heading text-lg text-primary mb-3">{s.step} {s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="border border-border/40 bg-card p-10 text-center max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl text-foreground mb-3">Ready to Expand Your Network?</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-lg mx-auto">
                Join the Blanch Group Business Networks and connect with industry leaders worldwide.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="px-8 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:shadow-lg transition-all">
                  Apply Now
                </button>
                <button className="px-8 py-3 border border-border hover:bg-muted text-foreground font-heading text-xs tracking-[0.15em] uppercase transition-all">
                  Contact Partnership Team
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: List Businesses Tab */}
        {mainTab === "list-businesses" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Category Filter Horizontal Buttons */}
            <div className="flex gap-1.5 mb-8 overflow-x-auto scrollbar-none pb-2 border-b border-border/10">
              {CAT_TABS.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-[10px] tracking-[0.15em] font-heading uppercase border transition-all whitespace-nowrap ${
                    category === cat.id 
                      ? "border-primary text-primary bg-primary/10" 
                      : "border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar Input */}
            <div className="relative mb-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search businesses..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" 
              />
            </div>

            {/* Directory Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground text-sm mt-4">Loading directory...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-xs">No business listings found matching your search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(biz => {
                  const CatIcon = CAT_ICONS[biz.category] || Building2;
                  return (
                    <motion.div 
                      key={biz.id} 
                      layout 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[16rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-primary/10 border border-primary/10 flex items-center justify-center">
                            <CatIcon className="w-5 h-5 text-primary" />
                          </div>
                          {biz.verified && (
                            <span className="flex items-center gap-1 text-[9px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5">
                              <CheckCircle className="w-2.5 h-2.5 text-emerald-400" /> Verified
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-lg text-foreground tracking-wide mb-1">{biz.business_name}</h3>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-primary mb-3">
                          {CAT_LABELS[biz.category] || biz.category}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{biz.description}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/20 pt-4">
                        <span className="text-[10px] text-muted-foreground/80 tracking-wide font-mono">{biz.location}</span>
                        {biz.website && biz.website !== "#" && (
                          <a 
                            href={biz.website} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-1 text-primary text-[10px] font-heading uppercase tracking-wider hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit Website
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/business-network")({
  component: BusinessNetwork,
});

=======
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Search, 
  Building2, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Briefcase, 
  Users, 
  Zap, 
  BookOpen, 
  Heart, 
  Cpu, 
  Home, 
  Landmark, 
  Shield, 
  ShieldCheck,
  Coins, 
  Activity,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight
} from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

// Category Icons & Labels mapping
const CAT_ICONS = { 
  finance: Landmark, 
  technology: Cpu, 
  health: Heart, 
  education: BookOpen, 
  commerce: Briefcase, 
  media: Globe, 
  real_estate: Home, 
  energy: Zap, 
  legal: Shield, 
  consulting: Users 
};

const CAT_LABELS = { 
  finance: "Finance", 
  technology: "Technology", 
  health: "Health & Wellness", 
  education: "Education", 
  commerce: "Commerce", 
  media: "Media", 
  real_estate: "Real Estate", 
  energy: "Energy", 
  legal: "Legal", 
  consulting: "Consulting" 
};

const MAIN_TABS = [
    { id: "membership", label: "Membership" },
  { id: "b2b-g2g", label: "B2B-G2G" },
  { id: "networks", label: "Networks" },
  { id: "list-businesses", label: "List Businesses" }
];

const CAT_TABS = [
  { id: "all", label: "All" },
  { id: "finance", label: "Finance" },
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health & Wellness" },
  { id: "education", label: "Education" },
  { id: "commerce", label: "Commerce" },
  { id: "media", label: "Media" },
  { id: "real_estate", label: "Real Estate" },
  { id: "energy", label: "Energy" },
  { id: "legal", label: "Legal" },
  { id: "consulting", label: "Consulting" }
];

// Default listings populated for List Businesses tab
const DEFAULT_BUSINESSES = [
  {
    id: "kb-1",
    business_name: "Kingdom Capital Partners",
    category: "finance",
    description: "Sovereign investment fund specializing in kingdom-aligned ventures, real estate, and community development projects.",
    location: "Atlanta, GA",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-2",
    business_name: "Covenant Tech Solutions",
    category: "technology",
    description: "Full-service technology firm providing DLT integration, smart city infrastructure, and S.H.I.E.L.D. AI implementations.",
    location: "Houston, TX",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-3",
    business_name: "Heritage Health Collective",
    category: "health",
    description: "Holistic wellness center offering traditional healing, nutrition counseling, and community health education programs.",
    location: "Charlotte, NC",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  },
  {
    id: "kb-4",
    business_name: "Sovereign Media Group",
    category: "media",
    description: "Kingdom-aligned media production company specializing in broadcast, podcast, documentary, and social media content.",
    location: "Los Angeles, CA",
    owner_name: "Blanch Group",
    website: "#",
    verified: true
  }
];

// Ten Interoperable Networks details
const INTEROPERABLE_NETWORKS = [
  { code: "B2B", from: "Business to Business", desc: "Connect with businesses for partnerships, supply chains, and enterprise deals", tags: ["Wholesale Trading", "Strategic Partnerships", "Supply Chain", "Enterprise Solutions"] },
  { code: "B2C", from: "Business to Consumer", desc: "Reach consumers directly with products, services, and special offers", tags: ["Retail Products", "Direct Services", "Consumer Discounts", "Customer Support"] },
  { code: "C2B", from: "Consumer to Business", desc: "Individuals offer services, products, or value to businesses", tags: ["Freelance Services", "Influencer Marketing", "Consumer Feedback", "Reverse Auctions"] },
  { code: "C2C", from: "Consumer to Consumer", desc: "Peer-to-peer marketplace for individuals to trade", tags: ["Resale Marketplace", "Used Goods", "Peer Services", "Community Trading"] },
  { code: "B2G", from: "Business to Government", desc: "Access government contracts, programs, and institutional opportunities", tags: ["Government Contracts", "PPP Programs", "Institutional Trading", "Compliance Services"] },
  { code: "C2G", from: "Consumer to Government", desc: "Citizens interact with government services and payments", tags: ["Tax Payments", "Service Fees", "License Applications", "Citizen Services"] },
  { code: "G2B", from: "Government to Business", desc: "Government services and information for businesses", tags: ["Business Registration", "Tax Services", "Regulatory Information", "Grants & Funding"] },
  { code: "G2C", from: "Government to Citizen", desc: "Government services and benefits for citizens", tags: ["Public Services", "Benefits Distribution", "Information Access", "Civic Engagement"] },
  { code: "G2E", from: "Government to Employee", desc: "Government services for public sector employees", tags: ["Payroll Services", "Benefits Management", "Training Programs", "Employee Portals"] },
  { code: "G2G", from: "Government to Government", desc: "Inter-governmental collaborations and partnerships", tags: ["International Trade", "Policy Coordination", "Shared Services", "Cross-border Programs"] },
];

// Active Networks data
const ACTIVE_NETWORKS = [
  {
    title: "Global Financial Alliance",
    desc: "Premier network of financial institutions and investment firms",
    category: "Banking & Finance",
    location: "Worldwide",
    members: "1,200+ Members"
  },
  {
    title: "Smart City Consortium",
    desc: "Coalition of smart city developers and technology providers",
    category: "Urban Development",
    location: "North America & Europe",
    members: "450+ Members"
  },
  {
    title: "Digital Asset Exchange Network",
    desc: "Leading network for digital asset trading and custody solutions",
    category: "Digital Assets",
    location: "Asia Pacific",
    members: "850+ Members"
  },
  {
    title: "Healthcare Innovation Partners",
    desc: "Network dedicated to healthcare technology advancement",
    category: "Healthcare",
    location: "Global",
    members: "620+ Members"
  },
  {
    title: "Sustainable Energy Coalition",
    desc: "Alliance for renewable energy projects and investments",
    category: "Energy",
    location: "Europe & Middle East",
    members: "350+ Members"
  },
  {
    title: "Trade & Commerce Union",
    desc: "Cross-border trade facilitation and commerce network",
    category: "Commerce",
    location: "Africa & Americas",
    members: "1,500+ Members"
  }
];

export default function BusinessNetwork() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainTab, setMainTab] = useState("membership");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("business_listings")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        let fetched = data || [];
        const combined = [...DEFAULT_BUSINESSES];
        
        // Merge Supabase entries avoiding duplicate names
        fetched.forEach(item => {
          if (!combined.some(c => c.business_name.toLowerCase() === item.business_name.toLowerCase())) {
            combined.push({
              id: item.id.toString(),
              business_name: item.business_name,
              category: item.category,
              description: item.description,
              location: item.location || "Online",
              owner_name: item.owner_name || "Sovereign Partner",
              website: item.website || "#",
              verified: item.verified || false
            });
          }
        });

        setListings(combined);
        setLoading(false);
      });
  }, []);

  const filteredListings = listings.filter(b => {
    const matchCat = category === "all" || b.category === category;
    const matchSearch = !search || 
      b.business_name?.toLowerCase().includes(search.toLowerCase()) || 
      b.description?.toLowerCase().includes(search.toLowerCase()) ||
      b.location?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Core Hero Branding */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono">Sovereign Business Network</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] text-foreground mb-4">Business Networks</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl leading-relaxed">
            Connect with elite partners, industry leaders, and strategic allies across our global network ecosystem.
          </p>
        </motion.div>

        {/* Custom Navigation Tabs */}
        <div className="flex gap-2 mb-10 border-b border-border/20 overflow-x-auto scrollbar-none pb-px">
          {MAIN_TABS.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setMainTab(tab.id)}
              className={`px-6 py-4 text-[11px] tracking-[0.2em] font-heading uppercase transition-all border-b-2 whitespace-nowrap -mb-px ${
                mainTab === tab.id 
                  ? "border-primary text-primary font-medium" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: B2B-G2G Tab */}
        {mainTab === "b2b-g2g" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-12">
              <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Explore Every Network</p>
              <h2 className="font-heading text-2xl md:text-3xl tracking-[0.1em] text-foreground mb-4">
                Ten interoperable network types — one Blanch Group ecosystem.
              </h2>
            </div>

            {/* Marquee Ticker */}
            <div className="marquee border-y border-primary/20 bg-primary/5 py-3 mb-16">
              <div className="marquee-track font-heading text-[10px] tracking-[0.25em] text-primary">
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
                <span>
                  B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                </span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-3xl tracking-[0.08em] text-foreground mb-2">Business Networks</h2>
              <p className="text-muted-foreground font-display text-sm italic">One unified platform connecting all business types</p>
            </div>

            {/* Ten Networks Grid - strictly styled as .vision-grid with precise borders, heights, and hovers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {INTEROPERABLE_NETWORKS.map((net, idx) => (
                <article 
                  key={net.code} 
                  className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[20rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-primary font-medium tracking-widest block mb-1">0{idx + 1}</span>
                    <strong className="text-2xl font-heading text-foreground tracking-wide block mb-1">{net.code}</strong>
                    <p className="text-[11px] font-heading tracking-[0.1em] uppercase text-primary mb-3">{net.from}</p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-6">{net.desc}</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {net.tags.map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 border border-border/30 rounded-sm text-foreground/70 bg-card/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2.5 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-[10px] tracking-[0.15em] font-heading uppercase transition-all duration-200 border border-primary/20 flex items-center justify-center gap-1">
                      Explore Network <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Networks Tab */}
        {mainTab === "networks" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACTIVE_NETWORKS.map(net => (
                <article 
                  key={net.title} 
                  className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[16rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[8px] uppercase tracking-[0.2em] font-mono">
                        <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> Active
                      </span>
                      <Building2 className="w-4 h-4 text-primary/60" />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2 tracking-[0.05em]">{net.title}</h3>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-6">{net.desc}</p>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t border-border/20 pt-4 mb-4">
                      <div>
                        <span className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.1em] block">Category</span>
                        <span className="font-medium text-foreground">{net.category}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.1em] block">Region</span>
                        <span className="font-medium text-foreground">{net.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] tracking-wider text-primary font-mono">{net.members}</span>
                      <button className="text-[10px] tracking-[0.15em] font-heading uppercase text-foreground hover:text-primary transition-all flex items-center gap-1">
                        Learn More <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Membership Tab */}
        {mainTab === "membership" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Join Banner */}
            <div className="bg-card border border-border/40 p-8 md:p-12 mb-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
              <div className="max-w-2xl mx-auto relative z-10">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-4">Ecosystem Membership</p>
                <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Join the Business Networks</h2>
                <p className="font-display text-muted-foreground italic text-sm md:text-base leading-relaxed mb-8">
                  "Connect with elite business partners, industry leaders, and strategic allies across our global network ecosystem"
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button className="px-8 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:shadow-lg hover:shadow-primary/20 transition-all">
                    Join the Network
                  </button>
                  <button className="px-8 py-3 border border-border hover:bg-muted text-foreground font-heading text-xs tracking-[0.15em] uppercase transition-all">
                    Explore Partners
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 border border-border/20 mb-16 text-center">
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">1,250+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Network Members</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">48+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Countries</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">$12T+</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Transaction Volume</p>
              </div>
              <div className="bg-card p-6 py-8">
                <p className="font-heading text-3xl text-primary mb-1">98%</p>
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Partner Satisfaction</p>
              </div>
            </div>

            {/* Universal Business Networks Highlight Section */}
            <div className="border border-border/40 bg-card p-8 md:p-12 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-4xl relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-6 bg-primary" />
                  <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">Commerce · Business Networks</p>
                </div>
                <h2 className="font-heading text-3xl md:text-5xl text-foreground tracking-wide mb-6">
                  Universal Business Networks
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-display italic mb-10 max-w-3xl">
                  Connect with elite business partners, industry leaders, and strategic allies across our global network ecosystem — one unified platform connecting all business types. A sovereign business identity and networking platform connecting members to global commerce, partnerships, and divine-economy opportunities through the Blanch Corridor.
                </p>

                {/* Core Pillars Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-border/20">
                  {[
                    { title: "Member Enterprises", desc: "Directory of sovereign businesses owned by the Royal Priesthood.", icon: Building2 },
                    { title: "Sovereign Partnerships", desc: "B2B introductions across nations, tribes, and industries.", icon: Users },
                    { title: "Onyx DLT Settlement", desc: "Zero-fee trade settlement on Blanch Onyx DLT.", icon: Coins },
                    { title: "Global Reach", desc: "Member nodes across every inhabited continent.", icon: Globe }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary">
                        <item.icon className="w-4 h-4" />
                        <h4 className="font-heading text-xs tracking-[0.05em] uppercase text-foreground">{item.title}</h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Identity, Directory & Deals Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { label: "Identity", title: "Sovereign Business ID", desc: "One verified identity unlocks counterparties across continents and corridors." },
                { label: "Directory", title: "Kingdom-Aligned Directory", desc: "Trusted suppliers, partners, and member ventures — curated, not crowdsourced." },
                { label: "Deals", title: "Deal Flow", desc: "Pre-vetted opportunities surfaced to qualified members based on tier and stewardship." }
              ].map((item, idx) => (
                <div key={idx} className="bg-card/40 border border-border/30 p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-primary uppercase block mb-1">{item.label}</span>
                    <h4 className="font-heading text-base text-foreground tracking-wide mb-3">{item.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Sovereign Sectors & Quote */}
            <div className="border border-border/40 bg-card p-8 md:p-12 mb-16">
              <div className="text-center mb-10">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-2">Targeted Domains</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">Sovereign Sectors</h3>
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                {[
                  "Sacred Agriculture",
                  "Sovereign Finance",
                  "Heritage Crafts",
                  "Clean Energy",
                  "AI & Technology",
                  "Trade & Logistics",
                  "Healing Arts",
                  "Education & Media"
                ].map((sector, idx) => (
                  <div key={idx} className="border border-border/20 bg-background/50 p-4 text-center hover:border-primary/30 transition-all duration-200">
                    <p className="font-heading text-xs tracking-wider text-foreground uppercase">{sector}</p>
                  </div>
                ))}
              </div>

              {/* Devine Scripture Quote */}
              <div className="border-t border-border/20 pt-8 max-w-xl mx-auto text-center">
                <p className="font-display italic text-lg text-primary tracking-wide mb-2">
                  "The wealth of the sinner is laid up for the just."
                </p>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-mono">
                  — Proverbs 13:22
                </p>
              </div>
            </div>

            {/* Marquee Slider Repeater */}
            <div className="mb-16">
              <div className="mb-4 text-center">
                <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono mb-1">Explore Every Network</p>
                <p className="text-xs text-muted-foreground">Ten interoperable network types — one Blanch Group ecosystem.</p>
              </div>
              <div className="marquee border-y border-primary/20 bg-primary/5 py-3">
                <div className="marquee-track font-heading text-[10px] tracking-[0.25em] text-primary">
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                  <span>
                    B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E • B2B • B2C • C2B • C2C • B2G • C2G • G2B • G2C • G2G • G2E •
                  </span>
                </div>
              </div>
            </div>

            {/* Why Join */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono mb-2">Exclusive Advantages</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">Why Join Our Network?</h3>
                <p className="text-muted-foreground text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                  Unlock unprecedented opportunities through strategic connections and collaborative partnerships.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: "Global Reach", desc: "Access partners across 150+ countries with established business relationships", icon: Globe },
                  { title: "Strategic Partnerships", desc: "Connect with vetted business partners for joint ventures and collaborations", icon: Award },
                  { title: "Growth Opportunities", desc: "Unlock new markets and revenue streams through network connections", icon: TrendingUp },
                  { title: "Trusted Network", desc: "All members undergo rigorous verification and compliance checks", icon: ShieldCheck }
                ].map(w => (
                  <article key={w.title} className="bg-card border border-border/40 p-6 card-lift hover:border-primary/50">
                    <w.icon className="w-6 h-6 text-primary mb-4" />
                    <h4 className="font-heading text-sm text-foreground mb-2 tracking-wide">{w.title}</h4>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">{w.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* How to Get Started */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.2em] text-primary uppercase font-mono mb-2">Onboarding Pathway</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">How to Get Started</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {[
                  { step: "01", title: "Apply", desc: "Submit your application with business credentials and partnership goals" },
                  { step: "02", title: "Verify", desc: "Our team verifies your credentials and assesses network compatibility" },
                  { step: "03", title: "Connect", desc: "Access the network and start building valuable business relationships" }
                ].map(s => (
                  <div key={s.step} className="bg-card/50 border border-border/30 p-6 relative">
                    <span className="font-heading text-5xl text-primary/10 absolute right-4 top-4 font-mono font-bold">{s.step}</span>
                    <h4 className="font-heading text-lg text-primary mb-3">{s.step} {s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="border border-border/40 bg-card p-10 text-center max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl text-foreground mb-3">Ready to Expand Your Network?</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-lg mx-auto">
                Join the Blanch Group Business Networks and connect with industry leaders worldwide.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="px-8 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:shadow-lg transition-all">
                  Apply Now
                </button>
                <button className="px-8 py-3 border border-border hover:bg-muted text-foreground font-heading text-xs tracking-[0.15em] uppercase transition-all">
                  Contact Partnership Team
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: List Businesses Tab */}
        {mainTab === "list-businesses" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Category Filter Horizontal Buttons */}
            <div className="flex gap-1.5 mb-8 overflow-x-auto scrollbar-none pb-2 border-b border-border/10">
              {CAT_TABS.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-[10px] tracking-[0.15em] font-heading uppercase border transition-all whitespace-nowrap ${
                    category === cat.id 
                      ? "border-primary text-primary bg-primary/10" 
                      : "border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar Input */}
            <div className="relative mb-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search businesses..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" 
              />
            </div>

            {/* Directory Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground text-sm mt-4">Loading directory...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-xs">No business listings found matching your search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(biz => {
                  const CatIcon = CAT_ICONS[biz.category] || Building2;
                  return (
                    <motion.div 
                      key={biz.id} 
                      layout 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="bg-card border border-border/40 p-6 flex flex-col justify-between min-h-[16rem] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(197,165,90,0.15)] hover:bg-primary/[0.02] transition-all duration-300 card-lift"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-primary/10 border border-primary/10 flex items-center justify-center">
                            <CatIcon className="w-5 h-5 text-primary" />
                          </div>
                          {biz.verified && (
                            <span className="flex items-center gap-1 text-[9px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5">
                              <CheckCircle className="w-2.5 h-2.5 text-emerald-400" /> Verified
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-lg text-foreground tracking-wide mb-1">{biz.business_name}</h3>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-primary mb-3">
                          {CAT_LABELS[biz.category] || biz.category}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{biz.description}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/20 pt-4">
                        <span className="text-[10px] text-muted-foreground/80 tracking-wide font-mono">{biz.location}</span>
                        {biz.website && biz.website !== "#" && (
                          <a 
                            href={biz.website} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-1 text-primary text-[10px] font-heading uppercase tracking-wider hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit Website
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/business-network")({
  component: BusinessNetwork,
});

>>>>>>> Stashed changes
