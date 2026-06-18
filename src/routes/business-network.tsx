import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Globe, Search, Building2, ArrowLeft, ExternalLink, CheckCircle, Briefcase, Users, Zap, BookOpen, Heart, Cpu, Home, Landmark, Shield, Plus, ChevronRight, Network } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

const CAT_ICONS = { finance: Landmark, technology: Cpu, health: Heart, education: BookOpen, commerce: Briefcase, media: Globe, real_estate: Home, energy: Zap, legal: Shield, consulting: Users };
const CAT_LABELS = { finance: "Finance", technology: "Technology", health: "Health & Wellness", education: "Education", commerce: "Commerce", media: "Media", real_estate: "Real Estate", energy: "Energy", legal: "Legal", consulting: "Consulting" };

const B2B_MODELS = [
  { code: "B2B", from: "Business to Business", desc: "Connect with businesses for partnerships, supply chains, and enterprise deals", tags: ["Wholesale Trading", "Strategic Partnerships", "Supply Chain", "Enterprise Solutions"], color: "text-primary border-primary/30 bg-primary/5" },
  { code: "B2C", from: "Business to Consumer", desc: "Reach consumers directly with products, services, and special offers", tags: ["Retail Products", "Direct Services", "Consumer Discounts", "Customer Support"], color: "text-blue-400 border-blue-400/30 bg-blue-400/5" },
  { code: "C2B", from: "Consumer to Business", desc: "Individuals offer services, products, or value to businesses", tags: ["Freelance Services", "Influencer Marketing", "Consumer Feedback", "Reverse Auctions"], color: "text-green-400 border-green-400/30 bg-green-400/5" },
  { code: "C2C", from: "Consumer to Consumer", desc: "Peer-to-peer marketplace for individuals to trade", tags: ["Resale Marketplace", "Used Goods", "Peer Services", "Community Trading"], color: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
  { code: "B2G", from: "Business to Government", desc: "Access government contracts, programs, and institutional opportunities", tags: ["Government Contracts", "PPP Programs", "Institutional Trading", "Compliance Services"], color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
  { code: "C2G", from: "Consumer to Government", desc: "Citizens interact with government services and payments", tags: ["Tax Payments", "Service Fees", "License Applications", "Citizen Services"], color: "text-rose-400 border-rose-400/30 bg-rose-400/5" },
  { code: "G2B", from: "Government to Business", desc: "Government services and information for businesses", tags: ["Business Registration", "Tax Services", "Regulatory Information", "Grants & Funding"], color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5" },
  { code: "G2C", from: "Government to Citizen", desc: "Government services and benefits for citizens", tags: ["Public Services", "Benefits Distribution", "Information Access", "Civic Engagement"], color: "text-teal-400 border-teal-400/30 bg-teal-400/5" },
  { code: "G2G", from: "Government to Government", desc: "Inter-governmental collaborations and partnerships", tags: ["International Trade", "Policy Coordination", "Shared Services", "Cross-border Programs"], color: "text-indigo-400 border-indigo-400/30 bg-indigo-400/5" },
  { code: "G2E", from: "Government to Employee", desc: "Government services for public sector employees", tags: ["Payroll Services", "Benefits Management", "Training Programs", "Employee Portals"], color: "text-orange-400 border-orange-400/30 bg-orange-400/5" },
];

const FEATURED_NETWORKS = [
  { name: "Global Financial Alliance", desc: "Premier network of financial institutions and investment firms", category: "Banking & Finance", region: "Worldwide", members: "2,400+", cat: "finance" },
  { name: "Smart City Consortium", desc: "Coalition of smart city developers and technology providers", category: "Urban Development", region: "North America & Europe", members: "1,850+", cat: "technology" },
  { name: "Digital Asset Exchange Network", desc: "Leading network for digital asset trading and custody solutions", category: "Digital Assets", region: "Asia Pacific", members: "3,100+", cat: "finance" },
  { name: "Healthcare Innovation Partners", desc: "Network dedicated to healthcare technology advancement", category: "Healthcare", region: "Global", members: "940+", cat: "health" },
  { name: "Sustainable Energy Coalition", desc: "Alliance for renewable energy projects and investments", category: "Energy", region: "Europe & Middle East", members: "1,200+", cat: "energy" },
  { name: "Trade & Commerce Union", desc: "Cross-border trade facilitation and commerce network", category: "Commerce", region: "Africa & Americas", members: "2,700+", cat: "commerce" },
];

const PLAN_TIERS = [
  { name: "Free", price: "0 BOX", features: ["Business profile listing", "Directory search access", "Basic messaging", "Community events access"] },
  { name: "Associate", price: "250 BOX/yr", features: ["All Free features", "Marketplace access", "Partner discounts", "Social feed participation"] },
  { name: "Partner", price: "2,500 BOX/yr", features: ["All Associate features", "Commerce partnerships", "Annual summit access", "Investment opportunities", "UBN Commerce pathways"] },
  { name: "Elite", price: "5,000 BOX/yr", features: ["All Partner features", "B2B corridor access", "Elite networking events", "Global merchant network", "All 380+ X2X pathways"] },
];

const CAPABILITIES = [
  { icon: Globe, title: "Global Connectivity", desc: "Connect with businesses across 190+ countries through our secure decentralized network." },
  { icon: CheckCircle, title: "Verified Partners", desc: "All network participants undergo rigorous KYB verification for trusted transactions." },
  { icon: Zap, title: "Instant Settlement", desc: "Real-time cross-border payments with instant settlement in any currency." },
  { icon: Shield, title: "Secure Communications", desc: "End-to-end encrypted messaging and document sharing between partners." },
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
    base44.entities.BusinessListing.list("-created_date", 50).then(setListings).finally(() => setLoading(false));
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
              <p className="text-[9px] tracking-[0.2em] text-white/40">UNIVERSAL BUSINESS NETWORK</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Global Business Network</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Universal Business Network</h1>
          <p className="font-display text-lg text-white italic max-w-2xl">
            Connect, collaborate, and transact with verified businesses worldwide through our secure, decentralized enterprise network.
          </p>
          <div className="flex gap-3 mt-5">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Join the Network
            </button>
            <button className="px-6 py-3 border border-border/40 text-white font-heading text-[10px] tracking-[0.15em] uppercase hover:border-primary/40 hover:text-primary transition-all">
              Explore Partners
            </button>
            <button className="px-6 py-3 border border-border/40 text-white font-heading text-[10px] tracking-[0.15em] uppercase hover:border-primary/40 hover:text-primary transition-all">
              List your Business
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: listings.length || "—", label: "Active Businesses" },
            { value: "150+", label: "Countries" },
            { value: "$∞", label: "Transaction Volume" },
            { value: "99.99%", label: "Uptime" },
          ].map((s, i) => (
            <div key={i} className="border border-border/30 bg-card p-4 text-center">
              <p className="font-heading text-xl text-primary">{s.value}</p>
              <p className="text-[10px] tracking-wider text-white uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main Tabs */}
        <div className="flex gap-1 border-b border-border/30 mb-8 overflow-x-auto">
          {MAIN_TABS.map(tab => (
            <button key={tab} onClick={() => setMainTab(tab)}
              className={`px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-all border-b-2 -mb-px shrink-0 ${
                mainTab === tab ? "border-primary text-primary" : "border-transparent text-white hover:text-foreground"
              }`}>
              {tab === "b2b-g2g" ? "B2B-G2G" : tab === "all" ? "All" : tab === "networks" ? "Networks" : "Membership"}
            </button>
          ))}
        </div>

        {/* ALL TAB */}
        {mainTab === "all" && (
          <div>
            {/* Capabilities */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {CAPABILITIES.map((c, i) => (
                <div key={i} className="border border-border/30 bg-card p-5">
                  <c.icon className="w-5 h-5 text-primary mb-2" />
                  <h4 className="font-heading text-xs text-foreground mb-1">{c.title}</h4>
                  <p className="text-white text-xs leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="border border-border/30 bg-card p-6 mb-8">
              <h3 className="font-heading text-sm tracking-[0.1em] text-foreground mb-5">How It Works</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { n: "01", t: "Register & Verify", d: "Complete KYB verification to join the network" },
                  { n: "02", t: "Connect Partners", d: "Discover and connect with verified businesses" },
                  { n: "03", t: "Transact Securely", d: "Execute deals with instant settlement" },
                ].map(s => (
                  <div key={s.n} className="flex items-start gap-3">
                    <span className="font-heading text-2xl text-primary/30">{s.n}</span>
                    <div>
                      <p className="font-heading text-xs text-foreground">{s.t}</p>
                      <p className="text-white text-xs mt-1">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount banner */}
            <div className="border border-primary/30 bg-primary/5 px-6 py-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm text-foreground"><span className="text-primary font-heading">Members get Discounts</span> on Products &amp; Services with anyone on the Network and Marketplace.</p>
            </div>

            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses..."
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border/40 text-foreground text-sm placeholder:text-white/40 focus:outline-none focus:border-primary/40" />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {CAT_TABS.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-all ${
                    category === cat ? "bg-primary text-primary-foreground" : "border border-border/40 text-white hover:border-primary/30 hover:text-primary"
                  }`}>
                  {cat === "all" ? "All" : CAT_LABELS[cat]}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array(6).fill(0).map((_, i) => <div key={i} className="bg-card border border-border/30 p-6 animate-pulse space-y-3"><div className="w-12 h-12 bg-muted" /><div className="h-4 bg-muted rounded w-2/3" /><div className="h-3 bg-muted rounded w-full" /></div>)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-white">
                <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-display italic">No businesses listed yet. Be the first to register your kingdom-aligned venture.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(biz => <BizCard key={biz.id} biz={biz} />)}
              </div>
            )}
          </div>
        )}

        {/* B2B-G2G TAB */}
        {mainTab === "b2b-g2g" && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading text-sm tracking-[0.1em] text-foreground mb-2">One unified platform connecting all business types</h2>
              <Link to="/universe-commerce" className="text-[10px] text-primary hover:underline flex items-center gap-1">
                View all 380+ X2X Commerce Pathways <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {B2B_MODELS.map((model, i) => (
                <motion.div key={model.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className={`border rounded p-5 ${model.color}`}>
                  <p className="font-heading text-xl mb-1">{model.code}</p>
                  <p className="text-xs font-semibold mb-2">{model.from}</p>
                  <p className="text-xs opacity-80 mb-3">{model.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {model.tags.map(tag => <span key={tag} className="text-[9px] border border-current/30 px-1.5 py-0.5 opacity-70">{tag}</span>)}
                  </div>
                  <button className="text-[9px] tracking-[0.1em] uppercase border border-current px-3 py-1.5 hover:opacity-80 transition-opacity">
                    Explore Network
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* NETWORKS TAB */}
        {mainTab === "networks" && (
          <div>
            <h2 className="font-heading text-sm tracking-[0.1em] text-foreground mb-6">Featured Global Networks</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURED_NETWORKS.map((net, i) => {
                const CatIcon = CAT_ICONS[net.cat] || Network;
                return (
                  <motion.div key={net.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="border border-border/40 bg-card p-6 hover:border-primary/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-primary/10 border border-primary/10 flex items-center justify-center">
                        <CatIcon className="w-5 h-5 text-primary/60" />
                      </div>
                      <span className="text-[9px] tracking-[0.1em] uppercase bg-green-500/10 text-green-400 px-2 py-0.5 border border-green-500/20">Active</span>
                    </div>
                    <h3 className="font-heading text-sm text-foreground mb-1">{net.name}</h3>
                    <p className="text-white text-xs mb-3 leading-relaxed">{net.desc}</p>
                    <div className="space-y-1 mb-4">
                      <p className="text-[10px] text-white/50">{net.category} · {net.region}</p>
                      <p className="text-[10px] text-primary">{net.members} Members</p>
                    </div>
                    <button className="text-[9px] tracking-[0.1em] uppercase border border-border/40 text-white px-3 py-1.5 hover:border-primary/40 hover:text-primary transition-all">
                      Learn More
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* MEMBERSHIP TAB */}
        {mainTab === "membership" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-2">Universal Business Network Membership</h2>
              <p className="text-white text-sm max-w-xl mx-auto">From free listings to full X2X commerce access — choose the plan that powers your kingdom business.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PLAN_TIERS.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className={`border p-6 ${i === 2 ? "border-primary/50 bg-primary/5" : "border-border/40 bg-card"}`}>
                  {i === 2 && <span className="text-[9px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-2 py-0.5 mb-3 inline-block">Popular</span>}
                  <h3 className="font-heading text-sm text-foreground mb-1">{plan.name}</h3>
                  <p className="font-heading text-xl text-primary mb-4">{plan.price}</p>
                  <div className="space-y-2 mb-5">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-xs text-white">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/membership" className={`w-full py-2.5 font-heading text-[10px] tracking-[0.15em] uppercase transition-all flex items-center justify-center ${
                    i === 2 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border/40 text-white hover:border-primary/40 hover:text-primary"
                  }`}>
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/business-network')({
  component: BusinessNetwork,
});