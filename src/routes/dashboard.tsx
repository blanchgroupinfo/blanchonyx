import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { GovernanceProposal, SocialPost, MarketplaceItem } from "@/api/dataClient";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/AuthContext";
import { Shield, Vote, TrendingUp, Users, ChevronRight, CheckCircle, XCircle, Minus, Clock, Crown, Gem, Star, Package, MessageCircle, Activity, CreditCard, Award, Download, Eye, Copy, Check, ExternalLink, FileText, Share2, QrCode } from "lucide-react";


import LOGO_BROWN from "@/assets/b-logo-brown.png";

function LiveTPS() {
  const [tps, setTps] = useState(22.74);
  useEffect(() => {
    const i = setInterval(() => {
      setTps(p => parseFloat((p + (Math.random() - 0.5) * 0.04).toFixed(3)));
    }, 700);
    return () => clearInterval(i);
  }, []);
  return <span className="tabular-nums">{tps}Q</span>;
}

function ProposalCard({ proposal, onVote, userVotes }) {
  const total = proposal.votes_for + proposal.votes_against + proposal.votes_abstain;
  const forPct = total ? Math.round((proposal.votes_for / total) * 100) : 0;
  const againstPct = total ? Math.round((proposal.votes_against / total) * 100) : 0;
  const voted = userVotes[proposal.id];

  const CAT_COLORS = {
    governance: "text-primary border-primary/30",
    finance: "text-amber-400 border-amber-400/30",
    technology: "text-blue-400 border-blue-400/30",
    community: "text-green-400 border-green-400/30",
    ethics: "text-purple-400 border-purple-400/30",
  };

  const STATUS_STYLES = {
    active: "bg-green-500/10 text-green-400",
    passed: "bg-primary/10 text-primary",
    rejected: "bg-destructive/10 text-destructive",
    pending: "bg-muted text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/40 p-6 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded ${CAT_COLORS[proposal.category] || "text-muted-foreground border-border"}`}>
              {proposal.category}
            </span>
            <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded ${STATUS_STYLES[proposal.status]}`}>
              {proposal.status}
            </span>
          </div>
          <h4 className="font-heading text-sm tracking-[0.03em] text-foreground leading-snug">{proposal.title}</h4>
          <p className="text-muted-foreground text-xs mt-2 leading-relaxed line-clamp-2">{proposal.description}</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-2 my-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-green-400 w-8">For</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${forPct}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
          <span className="text-[10px] text-muted-foreground w-10 text-right">{forPct}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-destructive w-8">Ag.</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${againstPct}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-destructive rounded-full"
            />
          </div>
          <span className="text-[10px] text-muted-foreground w-10 text-right">{againstPct}%</span>
        </div>
      </div>

      {/* Vote buttons */}
      {proposal.status === "active" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onVote(proposal.id, "for")}
            disabled={!!voted}
            className={`flex-1 py-2 text-[10px] tracking-[0.1em] uppercase border transition-all ${
              voted === "for"
                ? "bg-green-500/20 border-green-500/50 text-green-400"
                : "border-border/40 text-muted-foreground hover:border-green-500/40 hover:text-green-400"
            } disabled:opacity-60`}
          >
            <CheckCircle className="w-3 h-3 inline mr-1" /> For
          </button>
          <button
            onClick={() => onVote(proposal.id, "against")}
            disabled={!!voted}
            className={`flex-1 py-2 text-[10px] tracking-[0.1em] uppercase border transition-all ${
              voted === "against"
                ? "bg-destructive/20 border-destructive/50 text-destructive"
                : "border-border/40 text-muted-foreground hover:border-destructive/40 hover:text-destructive"
            } disabled:opacity-60`}
          >
            <XCircle className="w-3 h-3 inline mr-1" /> Against
          </button>
          <button
            onClick={() => onVote(proposal.id, "abstain")}
            disabled={!!voted}
            className={`flex-1 py-2 text-[10px] tracking-[0.1em] uppercase border transition-all ${
              voted === "abstain"
                ? "bg-muted/40 border-border text-foreground"
                : "border-border/40 text-muted-foreground hover:border-border"
            } disabled:opacity-60`}
          >
            <Minus className="w-3 h-3 inline mr-1" /> Abstain
          </button>
        </div>
      )}
      {voted && (
        <p className="text-[10px] text-primary/70 mt-2 text-center tracking-wider">✓ Vote recorded on Blanch Onyx DLT</p>
      )}
    </motion.div>
  );
}

function getDeterministicHash(input: string, length: number = 8): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase();
  return hex.padEnd(length, "0").slice(0, length);
}

export default function Dashboard() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [blockHeight, setBlockHeight] = useState(1422704);
  
  // Circle Agent State
  const [viewCertificate, setViewCertificate] = useState(false);
  const [viewAffiliateProgram, setViewAffiliateProgram] = useState(false);
  const [viewQrCode, setViewQrCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const userIdentifier = user?.email || "member@blanchonyx.network";
  const userName = user?.full_name || "Sovereign Member";
  const agentId = `BN-BOX-CA-${getDeterministicHash(userIdentifier, 6)}-${getDeterministicHash(userIdentifier + "agent", 4)}`;
  const businessCardId = `BN-BOX-BC-${getDeterministicHash(userIdentifier, 6)}-${getDeterministicHash(userIdentifier + "card", 4)}`;
  const leiNumber = `549300${getDeterministicHash(userIdentifier + "lei", 10)}88`;
  const affiliateUrl = typeof window !== "undefined" ? `${window.location.origin}/membership?ref=${agentId}` : `https://blanchonyx.com/membership?ref=${agentId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCertificate = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <!-- Background -->
      <rect width="800" height="600" fill="#0b0b0c" />
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#b87d4b" stroke-width="2" />
      <rect x="25" y="25" width="750" height="550" fill="none" stroke="#d99c62" stroke-width="1" stroke-dasharray="10,5" />
      
      <!-- Watermark / Crest -->
      <path d="M400 150 L440 220 L360 220 Z M400 170 L420 210 L380 210 Z" fill="#b87d4b" opacity="0.1" />
      
      <!-- Logo & Header -->
      <text x="400" y="80" font-family="'Times New Roman', serif" font-size="20" fill="#d99c62" font-weight="bold" letter-spacing="4" text-anchor="middle">BLANCH ONYX TRUST</text>
      <text x="400" y="110" font-family="'Times New Roman', serif" font-size="10" fill="#b87d4b" letter-spacing="6" text-anchor="middle">SOVEREIGN DECENTRALIZED COVENANT</text>
      
      <!-- Certificate Title -->
      <text x="400" y="180" font-family="'Times New Roman', serif" font-size="28" fill="#ffffff" font-weight="bold" letter-spacing="2" text-anchor="middle">CERTIFICATE OF STANDING</text>
      <text x="400" y="210" font-family="sans-serif" font-size="12" fill="#d99c62" letter-spacing="3" text-anchor="middle">OFFICIAL CIRCLE AGENT APPOINTMENT</text>
      
      <!-- Recipient -->
      <text x="400" y="260" font-family="sans-serif" font-size="14" fill="#a0a0a5" text-anchor="middle">This certifies that the accredited representative</text>
      <text x="400" y="310" font-family="'Times New Roman', serif" font-size="36" fill="#ffffff" font-style="italic" font-weight="bold" text-anchor="middle">${userName}</text>
      
      <!-- Appointment Statement -->
      <text x="400" y="360" font-family="sans-serif" font-size="13" fill="#a0a0a5" text-anchor="middle">has been duly commissioned as an active and registered Circle Agent of the</text>
      <text x="400" y="380" font-family="sans-serif" font-size="13" fill="#d99c62" font-weight="bold" text-anchor="middle">BLANCH NETWORK &amp; BLANCH ONYX DLT</text>
      
      <!-- Details Box -->
      <rect x="150" y="420" width="500" height="70" fill="#141416" stroke="#b87d4b" stroke-width="0.5" />
      <text x="170" y="445" font-family="monospace" font-size="10" fill="#88888d">AGENT ID:</text>
      <text x="270" y="445" font-family="monospace" font-size="10" fill="#ffffff" font-weight="bold">${agentId}</text>
      
      <text x="170" y="462" font-family="monospace" font-size="10" fill="#88888d">CARD ID:</text>
      <text x="270" y="462" font-family="monospace" font-size="10" fill="#ffffff" font-weight="bold">${businessCardId}</text>
      
      <text x="170" y="479" font-family="monospace" font-size="10" fill="#88888d">LEI NUMBER:</text>
      <text x="270" y="479" font-family="monospace" font-size="10" fill="#ffffff" font-weight="bold">${leiNumber}</text>
      
      <!-- Signatures -->
      <line x1="180" y1="540" x2="330" y2="540" stroke="#b87d4b" stroke-width="0.5" />
      <text x="255" y="555" font-family="sans-serif" font-size="9" fill="#88888d" text-anchor="middle">Sovereign Trust Council</text>
      
      <line x1="470" y1="540" x2="620" y2="540" stroke="#b87d4b" stroke-width="0.5" />
      <text x="545" y="555" font-family="sans-serif" font-size="9" fill="#88888d" text-anchor="middle">DLT Registrar Seal</text>
      
      <!-- Digital Seal Graphic -->
      <circle cx="400" cy="535" r="22" fill="none" stroke="#d99c62" stroke-width="1" />
      <circle cx="400" cy="535" r="18" fill="none" stroke="#d99c62" stroke-width="0.5" stroke-dasharray="3,1" />
      <text x="400" y="538" font-family="sans-serif" font-size="8" fill="#d99c62" text-anchor="middle" font-weight="bold">VALID</text>
    </svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Blanch_Onyx_Agent_Certificate_${userName.replace(/\\s+/g, "_")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    GovernanceProposal.list(4).then(setProposals).catch(() => setProposals([]));
    SocialPost.list(3).then(setPosts).catch(() => setPosts([]));
    MarketplaceItem.filter({ featured: true }, 3).then(setItems).catch(() => setItems([]));
    const bh = setInterval(() => setBlockHeight(h => h + Math.floor(Math.random() * 2) + 1), 2500);
    return () => clearInterval(bh);
  }, []);

  const handleVote = async (proposalId, voteType) => {
    if (userVotes[proposalId]) return;
    setUserVotes(prev => ({ ...prev, [proposalId]: voteType }));
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return;
    const updates = {};
    if (voteType === "for") updates.votes_for = (proposal.votes_for || 0) + 1;
    if (voteType === "against") updates.votes_against = (proposal.votes_against || 0) + 1;
    if (voteType === "abstain") updates.votes_abstain = (proposal.votes_abstain || 0) + 1;
    await GovernanceProposal.update(proposalId, updates);
    GovernanceProposal.list(4).then(setProposals).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div>
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">MEMBER DASHBOARD</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] tracking-wider text-muted-foreground">LIVE TPS: <LiveTPS /></span>
            </div>
            <Link to="/" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
              ← Home
            </Link>
            <button
              onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")}
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-destructive transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] text-primary uppercase mb-1">Welcome Back</p>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground">
            {user?.full_name || "Royal Member"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Blanch Onyx Member Dashboard</p>
        </div>

        {/* BOX Balance + Transactions */}
        <div className="border border-primary/20 bg-primary/5 p-5 mb-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Gem className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">OnyxCoin Balance</p>
              <p className="font-heading text-2xl text-primary">12,480 <span className="text-sm">BOX</span></p>
            </div>
          </div>
          <div className="flex-1 sm:border-l sm:border-border/30 sm:pl-5">
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-2">Recent Transactions</p>
            <div className="space-y-1.5">
              {[
                { label: "Membership Reward", amount: "+500 BOX", color: "text-green-400" },
                { label: "Marketplace Purchase", amount: "-120 BOX", color: "text-destructive" },
                { label: "Governance Reward", amount: "+250 BOX", color: "text-green-400" },
              ].map(tx => (
                <div key={tx.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{tx.label}</span>
                  <span className={`text-xs font-heading ${tx.color}`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to="/profile" className="text-[10px] tracking-[0.1em] uppercase text-primary hover:underline shrink-0">View All →</Link>
        </div>

        {/* Blanch Network Circle Agent Section */}
        <div className="border border-border/40 bg-card p-6 mb-8 relative overflow-hidden">
          {/* Subtle gold decorative gradient or glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-border/20 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-primary" />
                <p className="text-[10px] tracking-[0.25em] text-primary uppercase font-semibold">Sovereign Representation</p>
              </div>
              <h2 className="font-heading text-lg tracking-[0.05em] text-foreground">Blanch Network Circle Agent</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Your official credentials, representation records, and affiliate portals.</p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setViewAffiliateProgram(true)}
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 font-heading"
              >
                <Share2 className="w-3 h-3" /> Affiliate Program
              </button>
              <button
                onClick={() => setViewCertificate(true)}
                className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 font-heading"
              >
                <Eye className="w-3 h-3" /> View Certificate
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="px-4 py-2 border border-border/60 hover:bg-muted text-foreground text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 font-heading"
              >
                <Download className="w-3 h-3" /> Download Certificate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Agent & Business Card Identifiers */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[9px] tracking-wider text-muted-foreground uppercase font-heading">
                    Blanch Network Blanch Onyx Circle Agent ID Number
                  </p>
                  {/* Verified Badge with pulsing green aura */}
                  <div className="flex items-center gap-1 px-1.5 py-0.5 border border-green-500/30 bg-green-500/5 text-green-400 text-[8px] font-heading uppercase tracking-widest rounded relative">
                    <span className="relative flex h-1.5 w-1.5 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    Verified Agent
                  </div>
                </div>
                <div className="bg-background border border-border/30 p-3 flex items-center justify-between group">
                  <span className="font-mono text-xs text-foreground tracking-wider select-all">{agentId}</span>
                  <Award className="w-3.5 h-3.5 text-primary/50" />
                </div>
              </div>

              <div>
                <p className="text-[9px] tracking-wider text-muted-foreground uppercase mb-1.5 font-heading">
                  Blanch Network Blanch Onyx Business Card ID Number
                </p>
                <div className="bg-background border border-border/30 p-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/80 tracking-wider select-all">{businessCardId}</span>
                  <CreditCard className="w-3.5 h-3.5 text-primary/30" />
                </div>
              </div>
            </div>

            {/* Column 2: LEI Number & DLT Status */}
            <div className="space-y-4">
              <div>
                <p className="text-[9px] tracking-wider text-muted-foreground uppercase mb-1.5 font-heading">
                  Legal Entity Identifier (LEI) Number
                </p>
                <div className="bg-background border border-border/30 p-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/80 tracking-wider select-all">{leiNumber}</span>
                  <Shield className="w-3.5 h-3.5 text-primary/30" />
                </div>
              </div>

              <div className="border border-primary/10 bg-primary/[0.02] p-3 flex items-center justify-between">
                <div>
                  <p className="text-[9px] tracking-wider text-muted-foreground uppercase">AGENT NODE STATUS</p>
                  <p className="text-[10px] font-heading text-primary mt-0.5 uppercase tracking-widest">ACTIVE &bull; ACCREDITED</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            {/* Column 3: Affiliate Link Console */}
            <div className="flex flex-col justify-between bg-background border border-border/30 p-4">
              <div>
                <p className="text-[10px] tracking-wider text-foreground font-heading uppercase mb-1">Your Affiliate Link</p>
                <p className="text-[11px] text-muted-foreground leading-normal mb-3">
                  Share this link to recruit new members and earn 10% direct override commissions.
                </p>
                <div className="bg-card border border-border/20 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground truncate select-all">
                  {affiliateUrl}
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 border font-heading ${
                    copied
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </>
                  )}
                </button>
                <button
                  onClick={() => setViewQrCode(true)}
                  className="px-3.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 font-heading"
                  title="Generate QR Code"
                >
                  <QrCode className="w-3.5 h-3.5" /> QR Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { IconComp: TrendingUp, label: "TPS Throughput", value: <LiveTPS />, color: "text-primary" },
            { IconComp: Activity, label: "Block Height", value: blockHeight.toLocaleString(), color: "text-amber-400" },
            { IconComp: Vote, label: "Active Proposals", value: proposals.filter(p => p.status === "active").length, color: "text-green-400" },
            { IconComp: Users, label: "Network Nodes", value: "23", color: "text-blue-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border/30 p-5 flex items-center gap-4">
              <stat.IconComp className={`w-6 h-6 ${stat.color} shrink-0`} />
              <div>
                <p className={`font-heading text-lg ${stat.color} tabular-nums`}>{stat.value}</p>
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Governance — 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">S.H.I.E.L.D. Governance</h2>
              </div>
            </div>
            {/* Summary progress bars */}
            {proposals.filter(p => p.status === "active").length > 0 && (
              <div className="border border-primary/15 bg-primary/5 p-4 mb-5">
                <p className="text-[10px] tracking-[0.15em] text-primary uppercase mb-3">Active Proposal Summary</p>
                <div className="space-y-3">
                  {proposals.filter(p => p.status === "active").map(p => {
                    const total = (p.votes_for || 0) + (p.votes_against || 0) + (p.votes_abstain || 0);
                    const forPct = total ? Math.round((p.votes_for / total) * 100) : 0;
                    const againstPct = total ? Math.round((p.votes_against / total) * 100) : 0;
                    return (
                      <div key={p.id}>
                        <p className="text-[10px] text-foreground mb-1.5 truncate">{p.title}</p>
                        <div className="flex h-2 rounded-full overflow-hidden bg-muted gap-0.5">
                          <div className="bg-green-500/80 rounded-l-full transition-all duration-500" style={{ width: `${forPct}%` }} />
                          <div className="bg-destructive/70 transition-all duration-500" style={{ width: `${againstPct}%` }} />
                          <div className="bg-muted-foreground/30 rounded-r-full flex-1" />
                        </div>
                        <div className="flex gap-3 mt-1 text-[9px] text-muted-foreground">
                          <span className="text-green-400">For: {forPct}%</span>
                          <span className="text-destructive">Against: {againstPct}%</span>
                          <span>{total} votes</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="space-y-4">
              {proposals.map(p => (
                <ProposalCard key={p.id} proposal={p} onVote={handleVote} userVotes={userVotes} />
              ))}
            </div>
          </div>

          {/* Right column: feed + marketplace preview */}
          <div className="space-y-8">
            {/* Social Feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Member Feed</h2>
                </div>
              </div>
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.id} className="bg-card border border-border/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-heading text-primary">{(post.author_name || "M").charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-xs font-heading text-foreground">{post.author_name}</p>
                        <p className="text-[9px] text-primary/60">{post.author_tier}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketplace Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Marketplace</h2>
                </div>
                <Link to="/marketplace" className="text-[10px] tracking-[0.1em] uppercase text-primary hover:underline flex items-center gap-1">
                  Browse <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="bg-card border border-border/30 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-primary/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-heading text-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-primary">{item.price?.toLocaleString()} {item.currency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="border border-border/30 p-5 space-y-3">
              <p className="font-heading text-xs tracking-[0.2em] text-primary uppercase mb-4">Quick Access</p>
              {[
                { to: "/marketplace", IconComp: Package, label: "Virtual Marketplace" },
                { to: "/business-network", IconComp: Users, label: "Business Network" },
                { to: "/black-card", IconComp: CreditCard, label: "Onyx Black Card" },
                { to: "/dlt", IconComp: Activity, label: "DLT Network" },
              ].map(({ to, IconComp, label }) => (
                <Link key={to} to={to} className="flex items-center gap-3 p-2 hover:bg-primary/5 transition-colors group">
                  <IconComp className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground/40 ml-auto group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      {/* Modals */}
      <AnimatePresence>
        {/* View Certificate Modal */}
        {viewCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setViewCertificate(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-card border border-[#b87d4b] max-w-2xl w-full p-6 md:p-8 relative my-8 text-center shadow-[0_20px_80px_rgba(184,125,75,0.15)]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setViewCertificate(false)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground z-10"
              >
                <XCircle className="w-5 h-5" />
              </button>

              {/* Certificate Design */}
              <div className="border border-[#b87d4b]/60 p-6 md:p-10 relative bg-black/40">
                {/* Thin dashed inner border */}
                <div className="absolute inset-2 border border-[#d99c62]/30 border-dashed pointer-events-none" />

                <Crown className="w-10 h-10 text-primary mx-auto mb-4" />

                <h3 className="font-heading text-lg tracking-[0.2em] text-[#d99c62] uppercase mb-1">
                  BLANCH ONYX TRUST
                </h3>
                <p className="text-[8px] tracking-[0.3em] text-muted-foreground/60 uppercase mb-8">
                  Sovereign Decentralized Covenant
                </p>

                <h2 className="font-heading text-xl md:text-2xl tracking-[0.1em] text-foreground font-bold mb-1">
                  CERTIFICATE OF STANDING
                </h2>
                <p className="text-[10px] tracking-[0.15em] text-[#d99c62] uppercase mb-6">
                  OFFICIAL CIRCLE AGENT APPOINTMENT
                </p>

                <p className="text-xs text-muted-foreground mb-4">
                  This certifies that the accredited representative
                </p>

                <h4 className="font-heading text-2xl md:text-3xl text-foreground font-semibold italic mb-5 text-[#f5e9c8]">
                  {userName}
                </h4>

                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                  has been duly commissioned as an active and registered Circle Agent of the
                  <span className="block text-[#d99c62] font-semibold mt-1">BLANCH NETWORK & BLANCH ONYX DLT</span>
                </p>

                {/* Credentials list in Certificate */}
                <div className="bg-black/60 border border-border/20 p-4 max-w-sm mx-auto text-left space-y-1.5 font-mono text-[9px] mb-8">
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">AGENT ID:</span>
                    <span className="text-foreground font-bold">{agentId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">CARD ID:</span>
                    <span className="text-foreground font-bold">{businessCardId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">LEI NUMBER:</span>
                    <span className="text-foreground font-bold">{leiNumber}</span>
                  </p>
                </div>

                {/* Footer Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border/10">
                  <div className="text-center">
                    <div className="h-6 font-mono text-[9px] text-[#f5e9c8]/60 italic flex items-center justify-center">Sovereign Council</div>
                    <div className="border-t border-[#b87d4b]/40 pt-1 text-[8px] text-muted-foreground uppercase tracking-wider">
                      Authorizing Signatory
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 font-mono text-[9px] text-green-400 font-bold flex items-center justify-center tracking-wider">✓ LEDGER VERIFIED</div>
                    <div className="border-t border-[#b87d4b]/40 pt-1 text-[8px] text-muted-foreground uppercase tracking-wider">
                      DLT Registry Seal
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons inside certificate viewer */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadCertificate}
                  className="flex-1 py-3 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-heading"
                >
                  <Download className="w-3.5 h-3.5" /> Download SVG Vector
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 border border-border/60 hover:bg-muted text-foreground text-[10px] tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 font-heading"
                >
                  <FileText className="w-3.5 h-3.5" /> Print Credential
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Affiliate Program Details Modal */}
        {viewAffiliateProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setViewAffiliateProgram(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-card border border-border max-w-2xl w-full p-6 md:p-8 relative my-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setViewAffiliateProgram(false)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground z-10"
              >
                <XCircle className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-[0.05em] text-foreground">
                    Blanch Onyx Circle Agent Affiliate Program
                  </h3>
                  <p className="text-xs text-primary font-heading tracking-widest uppercase mt-0.5">
                    Sovereign Commission Protocol
                  </p>
                </div>
              </div>

              <div className="prose prose-invert text-xs text-muted-foreground space-y-4 leading-relaxed mb-6">
                <p>
                  As an accredited <strong className="text-foreground">Circle Agent</strong> of the Blanch Onyx Network, you represent the highest standards of the Royal Priesthood. Your Circle Agent credentials allow you to introduce prospective members and companies to the sovereign trust.
                </p>

                <h4 className="font-heading text-sm text-foreground uppercase tracking-wide border-b border-border/20 pb-2 mt-4">
                  Commission Override Structure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-background border border-border/30 p-3">
                    <p className="font-heading text-xs text-primary uppercase mb-1">Direct Referrals (Tier 1)</p>
                    <p className="text-[20px] font-heading text-foreground font-semibold">10% Override</p>
                    <p className="text-[10px] mt-1">Earned on all initial and recurring membership overrides paid by direct referrals.</p>
                  </div>
                  <div className="bg-background border border-border/30 p-3">
                    <p className="font-heading text-xs text-amber-400 uppercase mb-1">Indirect Referrals (Tier 2)</p>
                    <p className="text-[20px] font-heading text-foreground font-semibold">5% Override</p>
                    <p className="text-[10px] mt-1">Earned on membership overrides generated by network agents you have introduced.</p>
                  </div>
                </div>

                <h4 className="font-heading text-sm text-foreground uppercase tracking-wide border-b border-border/20 pb-2 mt-4">
                  Payout Token &amp; Settlement
                </h4>
                <p>
                  All override commissions are dynamically registered on the <strong>Blanch Onyx DLT Ledger</strong> and paid instantly in <strong className="text-primary">OnyxCoin (BOX)</strong> to your active member wallet. No withdrawal delays, no central processing limits.
                </p>

                <div className="bg-primary/5 border border-primary/20 p-4 space-y-2">
                  <p className="font-heading text-xs text-primary uppercase font-bold">Quick Marketing Best Practices</p>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80">
                    <li>Utilize your personal copyable Affiliate URL for newsletters, personal invites, and portals.</li>
                    <li>Referrals should input your Agent ID <strong className="font-mono text-[10px]">{agentId}</strong> in their membership applications.</li>
                    <li>Coordinate high-net-worth memberships or physical property referral commissions with the Sovereign Council.</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-heading"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? "Copied Link!" : "Copy Affiliate Link"}
                </button>
                <button
                  onClick={() => setViewAffiliateProgram(false)}
                  className="px-6 py-3 border border-border/60 hover:bg-muted text-foreground text-[10px] tracking-[0.15em] uppercase transition-all font-heading"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* QR Code Sharing Modal */}
        {viewQrCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setViewQrCode(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-card border border-border max-w-sm w-full p-6 relative shadow-2xl text-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setViewQrCode(false)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground z-10"
              >
                <XCircle className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base tracking-[0.05em] text-foreground">
                  Circle Agent ID QR Code
                </h3>
                <p className="text-[10px] text-primary font-heading tracking-widest uppercase mt-0.5 mb-5">
                  Blanch Onyx Share Network
                </p>

                {/* QR Code Frame */}
                <div className="bg-[#141416] p-4 border border-primary/20 shadow-inner rounded-lg mb-5 relative group">
                  <div className="absolute inset-1 border border-primary/10 border-dashed rounded pointer-events-none" />
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=d99c62&bgcolor=141416&qzone=1&data=${encodeURIComponent(affiliateUrl)}`}
                    alt="Agent Affiliate QR Code"
                    className="w-48 h-48 mx-auto relative z-10 select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="bg-background border border-border/30 p-2.5 rounded w-full mb-6 font-mono text-[9px] text-left">
                  <p className="flex justify-between mb-1">
                    <span className="text-muted-foreground">AGENT ID:</span>
                    <span className="text-foreground font-bold">{agentId}</span>
                  </p>
                  <p className="truncate text-[9px] text-muted-foreground mt-1 border-t border-border/10 pt-1.5 text-center">
                    {affiliateUrl}
                  </p>
                </div>

                <div className="flex gap-2.5 w-full">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 font-heading"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=d99c62&bgcolor=141416&qzone=1&data=${encodeURIComponent(affiliateUrl)}`;
                      link.target = "_blank";
                      link.download = `Blanch_Onyx_Agent_QR_${agentId}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2.5 border border-border/60 hover:bg-muted text-foreground text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 font-heading"
                  >
                    <Download className="w-3 h-3" /> Save Image
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});