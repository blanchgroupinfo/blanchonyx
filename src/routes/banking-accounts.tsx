import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, CreditCard, Send, ArrowDownLeft, ArrowUpRight, Landmark, Shield, Zap, TrendingUp, Lock, Globe, RefreshCw, ChevronRight, Wallet, CheckCircle } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const ACCOUNTS = [
  { name: "Sovereign Checking", number: "••••  ••••  4821", balance: 24850.00, currency: "USD", type: "checking", color: "from-zinc-900 to-neutral-900", accent: "text-primary", border: "border-primary/40" },
  { name: "BOX Digital Wallet", number: "••••  ••••  9033", balance: 12480, currency: "BOX", type: "digital", color: "from-yellow-950 to-amber-950", accent: "text-amber-300", border: "border-amber-400/40" },
  { name: "Kingdom Savings", number: "••••  ••••  2277", balance: 88200.00, currency: "USD", type: "savings", color: "from-zinc-900 to-stone-900", accent: "text-green-400", border: "border-green-500/30" },
];

const TRANSACTIONS = [
  { id: 1, desc: "Blanch Corridor Commerce", amount: +1250.00, currency: "USD", date: "Jun 09", type: "credit", category: "income" },
  { id: 2, desc: "Marketplace — NFT Purchase", amount: -420.00, currency: "USD", date: "Jun 08", type: "debit", category: "shopping" },
  { id: 3, desc: "Governance Reward", amount: +250, currency: "BOX", date: "Jun 07", type: "credit", category: "reward" },
  { id: 4, desc: "Membership Renewal", amount: -500, currency: "BOX", date: "Jun 06", type: "debit", category: "membership" },
  { id: 5, desc: "International Transfer — Partner", amount: +3800.00, currency: "USD", date: "Jun 05", type: "credit", category: "income" },
  { id: 6, desc: "Black Card — Luxury Services", amount: -1100.00, currency: "USD", date: "Jun 04", type: "debit", category: "services" },
  { id: 7, desc: "Exchange — BOX to USD", amount: +640.00, currency: "USD", date: "Jun 03", type: "credit", category: "exchange" },
  { id: 8, desc: "Business Network Subscription", amount: -200.00, currency: "USD", date: "Jun 02", type: "debit", category: "subscription" },
];

const SERVICES = [
  { icon: Send, label: "Send Funds", desc: "Transfer to any member or external account globally" },
  { icon: ArrowDownLeft, label: "Receive", desc: "Generate a receiving address or bank details" },
  { icon: RefreshCw, label: "Exchange", desc: "Swap BOX, USD and other sovereign tokens instantly" },
  { icon: CreditCard, label: "Black Card", desc: "Manage your Blanch Onyx Black Card settings" },
  { icon: TrendingUp, label: "Investments", desc: "Access kingdom-aligned investment opportunities" },
  { icon: Globe, label: "International Wire", desc: "Zero-fee cross-border transfers via DLT" },
];

const FEATURES = [
  { icon: Shield, title: "S.H.I.E.L.D. Protected", desc: "Every transaction monitored by AI Guardian Prime and 5 sovereign DLT networks." },
  { icon: Lock, title: "Multi-Layer Encryption", desc: "Military-grade encryption with biometric verification for all transactions." },
  { icon: Zap, title: "Instant Settlement", desc: "Zero-fee instant settlement powered by the Blanch Onyx DLT." },
  { icon: Landmark, title: "Private Banking", desc: "Dedicated relationship manager and exclusive wealth management services." },
];

function AccountCard({ account, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-2xl bg-gradient-to-br ${account.color} border ${account.border} p-6 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.5) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full bg-white/5" style={{ transform: "translate(30%, 30%)" }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className={`font-heading text-[10px] tracking-[0.25em] uppercase ${account.accent}`}>{account.name}</p>
            <p className="text-white/40 text-[9px] tracking-[0.15em] mt-0.5">{account.number}</p>
          </div>
          {account.type === "digital" ? <Wallet className={`w-5 h-5 ${account.accent}`} /> : <Building2 className={`w-5 h-5 ${account.accent}`} />}
        </div>
        <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">Available Balance</p>
        <p className={`font-heading text-2xl ${account.accent}`}>
          {account.currency === "USD" ? "$" : ""}{account.balance.toLocaleString()} <span className="text-sm font-body">{account.currency}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function BankingPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [liveBalance, setLiveBalance] = useState(24850.00);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveBalance(b => parseFloat((b + (Math.random() * 2 - 0.5)).toFixed(2)));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-foreground/40">PRIVATE BANKING</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] tracking-wider text-green-400 uppercase hidden sm:block">Secure</span>
            </div>
            <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Blanch Onyx Private Banking</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Sovereign Banking</h1>
          <p className="font-display text-lg text-foreground/80 italic max-w-2xl">
            A divine financial ecosystem — private banking, DLT-powered settlement, and sovereign wealth management unified.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border/30 mb-10">
          {["overview", "transactions", "services", "security"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-all border-b-2 -mb-px ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Accounts */}
            <div>
              <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-5">My Accounts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ACCOUNTS.map((acc, i) => <AccountCard key={acc.name} account={acc} index={i} />)}
              </div>
            </div>

            {/* Total Net Worth */}
            <motion.div
              className="border border-primary/20 bg-primary/5 p-8 text-center relative overflow-hidden"
              animate={{ boxShadow: ["0 0 20px rgba(197,165,90,0.05)", "0 0 40px rgba(197,165,90,0.15)", "0 0 20px rgba(197,165,90,0.05)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,90,0.05)_0%,_transparent_70%)]" />
              <p className="text-[10px] tracking-[0.3em] text-foreground/60 uppercase mb-2">Total Portfolio Value</p>
              <p className="font-heading text-5xl text-primary mb-1">${(liveBalance + 88200).toLocaleString()}</p>
              <p className="text-xs text-foreground/70">+ 12,480 BOX equivalent</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-xs">+3.2% this month</span>
              </div>
            </motion.div>

            {/* Quick Services */}
            <div>
              <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SERVICES.map((s, i) => (
                  <motion.button
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="border border-border/40 bg-card p-4 text-center hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] tracking-[0.1em] uppercase text-foreground">{s.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Transactions preview */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Recent Activity</h2>
                <button onClick={() => setActiveTab("transactions")} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="border border-border/30 divide-y divide-border/20">
                {TRANSACTIONS.slice(0, 4).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-500/10" : "bg-destructive/10"}`}>
                        {tx.type === "credit"
                          ? <ArrowDownLeft className="w-3.5 h-3.5 text-green-400" />
                          : <ArrowUpRight className="w-3.5 h-3.5 text-destructive" />
                        }
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{tx.desc}</p>
                        <p className="text-[10px] text-foreground/50">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-heading text-sm ${tx.type === "credit" ? "text-green-400" : "text-destructive"}`}>
                      {tx.type === "credit" ? "+" : ""}{tx.amount < 0 ? "" : ""}{Math.abs(tx.amount).toLocaleString()} {tx.currency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === "transactions" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">Transaction History</h2>
              <span className="text-[10px] text-foreground/50">{TRANSACTIONS.length} records</span>
            </div>
            <div className="border border-border/30 divide-y divide-border/20">
              {TRANSACTIONS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-5 py-4 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-green-500/10" : "bg-destructive/10"}`}>
                      {tx.type === "credit"
                        ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                        : <ArrowUpRight className="w-4 h-4 text-destructive" />
                      }
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{tx.desc}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-foreground/50">{tx.date}</p>
                        <span className="text-[9px] px-1.5 py-0.5 border border-border/30 text-foreground/70 capitalize">{tx.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-heading text-sm ${tx.type === "credit" ? "text-green-400" : "text-destructive"}`}>
                      {tx.type === "credit" ? "+" : "-"}{Math.abs(tx.amount).toLocaleString()} {tx.currency}
                    </p>
                    <p className="text-[9px] text-foreground/50 capitalize">{tx.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-6">Banking Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-border/40 bg-card p-6 hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <s.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading text-sm tracking-[0.05em] text-foreground mb-2">{s.label}</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center gap-1 text-primary text-[10px] mt-4 group-hover:gap-2 transition-all">
                    Access Service <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Corridor CTA */}
            <div className="border border-primary/20 bg-primary/5 p-8 mt-10 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div>
                <p className="font-heading text-lg text-foreground mb-2">Blanch Corridor Access</p>
                <p className="text-sm text-foreground/70 max-w-md">Connect your banking to the sovereign commerce corridor for cross-border transactions, kingdom-aligned trade finance, and strategic investment channels.</p>
              </div>
              <Link to="/business-network" className="shrink-0 px-8 py-3 bg-primary text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all">
                Open Corridor
              </Link>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div>
            <h2 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-6">Security & Compliance</h2>
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border/40 bg-card p-6"
                >
                  <f.icon className="w-5 h-5 text-primary mb-3" />
                  <h4 className="font-heading text-sm text-foreground mb-2">{f.title}</h4>
                  <p className="text-xs text-foreground/65 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* DLT Security status */}
            <div className="border border-border/30 bg-card p-6">
              <h3 className="font-heading text-sm tracking-[0.1em] text-foreground mb-5">DLT Security Network Status</h3>
              <div className="space-y-3">
                {["Blanch Onyx DLT", "Blanch Network", "Blanch Infinity DLT", "Blanch Hadash Dabash DLT", "S.H.I.E.L.D. AI Guardian Prime"].map((node, i) => (
                  <div key={node} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm text-foreground">{node}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-[10px] text-green-400 uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/banking-accounts')({
  component: BankingPage,
});