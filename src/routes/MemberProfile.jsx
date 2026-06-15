import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, Coins, Vote, CheckCircle, XCircle, Minus, Activity, Shield, Star } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

const MOCK_TRANSACTIONS = [
  { id: 1, type: "Received", amount: 500, currency: "BOX", desc: "Membership Reward", date: "2026-06-08" },
  { id: 2, type: "Sent", amount: 120, currency: "BOX", desc: "Marketplace Purchase", date: "2026-06-07" },
  { id: 3, type: "Received", amount: 250, currency: "BOX", desc: "Governance Participation Reward", date: "2026-06-05" },
  { id: 4, type: "Sent", amount: 80, currency: "BOX", desc: "Social Club Contribution", date: "2026-06-03" },
  { id: 5, type: "Received", amount: 1000, currency: "BOX", desc: "Network Referral Bonus", date: "2026-06-01" },
];

const MOCK_VOTES = [
  { id: 1, title: "S.H.I.E.L.D. AI Ethics Framework Update", vote: "for", date: "2026-06-09", status: "active" },
  { id: 2, title: "Blanch Corridor Trade Expansion", vote: "for", date: "2026-06-05", status: "passed" },
  { id: 3, title: "H.E.E.D. Health Fund Allocation", vote: "abstain", date: "2026-05-28", status: "passed" },
  { id: 4, title: "DLT Node Upgrade Proposal", vote: "against", date: "2026-05-20", status: "rejected" },
];

export default function MemberProfile() {
  const { user } = useAuth();
  const [boxBalance] = useState(12480);
  const [activeTab, setActiveTab] = useState("overview");

  const voteIcon = (v) => v === "for" ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : v === "against" ? <XCircle className="w-3.5 h-3.5 text-destructive" /> : <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  const voteColor = (v) => v === "for" ? "text-green-400" : v === "against" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">MEMBER PROFILE</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-10 p-8 border border-primary/20 bg-primary/5">
          <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shrink-0">
            <span className="font-heading text-3xl text-primary">{(user?.full_name || "M").charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] text-primary uppercase mb-1">Royal Member</p>
            <h1 className="font-heading text-2xl text-foreground">{user?.full_name || "Royal Member"}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Crown className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-[10px] tracking-[0.15em] text-primary/70 uppercase">{user?.role === "admin" ? "Council Admin" : "Associate Member"}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">BOX Balance</p>
            <p className="font-heading text-2xl text-primary">{boxBalance.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Blanch Onyx Coin</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border/30">
          {["overview", "votes", "transactions"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Vote, label: "Governance Votes", value: MOCK_VOTES.length, color: "text-primary" },
                { icon: Coins, label: "BOX Earned", value: "1,750", color: "text-amber-400" },
                { icon: Activity, label: "Network Activity", value: "Active", color: "text-green-400" },
              ].map((s, i) => (
                <div key={i} className="border border-border/30 bg-card p-5 text-center">
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                  <p className={`font-heading text-lg ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="border border-border/30 bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <h3 className="font-heading text-sm tracking-[0.1em] text-foreground">Membership Status</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Tier", value: user?.role === "admin" ? "Council Admin" : "Associate" },
                  { label: "Member Since", value: "January 2026" },
                  { label: "DLT Wallet", value: "BNX-••••-••••-7A3F" },
                  { label: "Black Card", value: "Standard Issued" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase">{item.label}</span>
                    <span className="text-xs text-foreground font-heading">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Votes */}
        {activeTab === "votes" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {MOCK_VOTES.map(v => (
              <div key={v.id} className="border border-border/30 bg-card p-5 flex items-center gap-4">
                <div className="shrink-0">{voteIcon(v.vote)}</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-heading leading-snug">{v.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{v.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] tracking-[0.1em] uppercase font-heading ${voteColor(v.vote)}`}>{v.vote}</p>
                  <p className={`text-[9px] mt-0.5 ${v.status === "passed" ? "text-green-400" : v.status === "rejected" ? "text-destructive" : "text-primary"}`}>{v.status}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Transactions */}
        {activeTab === "transactions" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {MOCK_TRANSACTIONS.map(tx => (
              <div key={tx.id} className="border border-border/30 bg-card p-5 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === "Received" ? "bg-green-500/10" : "bg-destructive/10"}`}>
                  <Coins className={`w-4 h-4 ${tx.type === "Received" ? "text-green-400" : "text-destructive"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{tx.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-heading text-sm ${tx.type === "Received" ? "text-green-400" : "text-destructive"}`}>
                    {tx.type === "Received" ? "+" : "-"}{tx.amount.toLocaleString()} {tx.currency}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{tx.type}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}