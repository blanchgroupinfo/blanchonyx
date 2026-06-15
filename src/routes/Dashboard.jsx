import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { Shield, Vote, TrendingUp, Users, ChevronRight, CheckCircle, XCircle, Minus, Clock, Crown, Gem, Star, Package, MessageCircle, Activity, CreditCard } from "lucide-react";

const DLT_IMG = "https://media.base44.com/images/public/6a286093583928e0559f9198/9777cc4f7_blanch-onyx-dl.png";
const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

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

export default function Dashboard() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [blockHeight, setBlockHeight] = useState(1422704);

  useEffect(() => {
    base44.entities.GovernanceProposal.list("-created_date", 4).then(setProposals);
    base44.entities.SocialPost.list("-created_date", 3).then(setPosts);
    base44.entities.MarketplaceItem.filter({ featured: true }, "-created_date", 3).then(setItems);
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
    await base44.entities.GovernanceProposal.update(proposalId, updates);
    base44.entities.GovernanceProposal.list("-created_date", 4).then(setProposals);
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
              onClick={() => base44.auth.logout("/")}
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
      </div>
    </div>
  );
}