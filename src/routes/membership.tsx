import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Crown, Gem, Star, Briefcase, Shield, UserCheck, Sparkles, Users, ChevronDown, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const TIERS = [
  { icon: Crown, name: "Founder", badge: "FOUNDING TIER", price: "By Invitation", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5", desc: "The highest honor — reserved for those who helped establish the sovereign foundation of Blanch Onyx.", perks: ["Lifetime membership", "Governance veto rights", "Direct Elder Council access", "Genesis NFT airdrop", "Black Card — Obsidian Level"] },
  { icon: Gem, name: "Royal · Throne", badge: "ROYAL TIER", price: "10,000 BOX/yr", color: "text-amber-300 border-amber-300/30 bg-amber-300/5", desc: "Sovereign leadership tier for proven champions of the kingdom mission.", perks: ["Full governance voting rights", "Private banking access", "Summit & retreat priority", "Black Card — Royal Level", "Blanch Corridor commerce access"] },
  { icon: Sparkles, name: "Onyx · Council", badge: "COUNCIL TIER", price: "7,500 BOX/yr", color: "text-primary border-primary/20 bg-primary/5", desc: "An elite advisory tier governing cultural standards and community development.", perks: ["Council governance seats", "Ethical standards board", "Cultural leadership role", "Exclusive summits", "Lifetime recognition"] },
  { icon: Star, name: "Elite", badge: "ELITE TIER", price: "5,000 BOX/yr", color: "text-primary border-primary/30 bg-primary/5", desc: "Reserved for distinguished members demonstrating cultural leadership.", perks: ["Governance participation", "Elite networking events", "Business corridor access", "Black Card — Gold Level", "Quarterly retreat invitations"] },
  { icon: Briefcase, name: "Partner", badge: "PARTNER TIER", price: "2,500 BOX/yr", color: "text-primary/80 border-primary/20 bg-primary/5", desc: "Kingdom-aligned business leaders and entrepreneurs.", perks: ["Business network listing", "Commerce partnerships", "Annual summit access", "Black Card — Standard", "Investment opportunities"] },
  { icon: Shield, name: "Executive", badge: "EXECUTIVE TIER", price: "1,000 BOX/yr", color: "text-blue-400 border-blue-400/30 bg-blue-400/5", desc: "Distinguished professionals advancing the H.E.E.D. program pillars.", perks: ["Executive networking events", "Educational resources", "Cultural event access", "Community investment access"] },
  { icon: UserCheck, name: "Associate", badge: "ASSOCIATE TIER", price: "250 BOX/yr", color: "text-muted-foreground border-border bg-muted/20", desc: "Entry-level membership for those answering the call.", perks: ["Member directory access", "Digital marketplace access", "Cultural events", "Social feed participation"] },
  { icon: Users, name: "Sardonyx · Initiate", badge: "INITIATE TIER", price: "100 BOX/yr", color: "text-muted-foreground border-border bg-card", desc: "The beginning of the sovereign journey.", perks: ["Onboarding materials", "Community access", "H.E.E.D. educational series", "Marketplace browsing"] },
];

export default function MembershipPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", desired_tier: "", purpose: "", referral: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("member_applications")
      .insert([{ ...form, status: "pending", created_at: new Date().toISOString() }]);
    setLoading(false);
    if (!error) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Join the Royal Priesthood Network</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Membership Tiers</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Where sovereign identity meets strategic influence.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        <div className="space-y-3 mb-20">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className={`border ${expanded === i ? "border-primary/40" : "border-border/30"} transition-all duration-300`}>
              <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${tier.color}`}>
                  <tier.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-heading text-sm tracking-[0.05em] text-foreground">{tier.name}</span>
                    <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${tier.color}`}>{tier.badge}</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{tier.desc}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? "rotate-180" : ""}`} />
              </button>
              {expanded === i && (
                <div className="px-5 pb-5 border-t border-border/20 pt-4">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tier.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {tier.perks.map(perk => (
                      <div key={perk} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-xs text-muted-foreground">{perk}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="border border-primary/20 bg-primary/5 px-3 py-1.5 inline-flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Price:</span>
                      <span className="font-heading text-sm text-primary">{tier.price}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Application form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-6 text-center">Apply for Membership</h2>
          {submitted ? (
            <div className="text-center py-12 border border-primary/30 bg-primary/5">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg text-foreground mb-2">Application Submitted</h3>
              <p className="text-muted-foreground text-sm">Your application is under review. We will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs tracking-wider text-muted-foreground uppercase">Full Name</label>
                <input type="text" required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="text-xs tracking-wider text-muted-foreground uppercase">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="text-xs tracking-wider text-muted-foreground uppercase">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="text-xs tracking-wider text-muted-foreground uppercase">Desired Tier</label>
                <select value={form.desired_tier} onChange={e => setForm(f => ({ ...f, desired_tier: e.target.value }))}
                  className="w-full mt-1 px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40">
                  <option value="">Select a tier...</option>
                  {TIERS.map(t => <option key={t.name} value={t.name}>{t.name} — {t.price}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-wider text-muted-foreground uppercase">Purpose</label>
                <textarea value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} rows={3}
                  className="w-full mt-1 px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Submit Application"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
});
