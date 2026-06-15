import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Gem, Star, Briefcase, Shield, UserCheck, Sparkles, Users, ChevronDown, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

const TIERS = [
  { icon: Crown, name: "Founder", badge: "FOUNDING TIER", price: "By Invitation", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5", desc: "The highest honor — reserved for those who helped establish the sovereign foundation of Blanch Onyx. Original builders of the Royal Priesthood network.", perks: ["Lifetime membership", "Governance veto rights", "Direct Elder Council access", "Genesis NFT airdrop", "Black Card — Obsidian Level"] },
  { icon: Gem, name: "Royal · Throne", badge: "ROYAL TIER", price: "10,000 BOX/yr", color: "text-amber-300 border-amber-300/30 bg-amber-300/5", desc: "Sovereign leadership tier for proven champions of the kingdom mission and divine stewardship excellence.", perks: ["Full governance voting rights", "Private banking access", "Summit & retreat priority", "Black Card — Royal Level", "Blanch Corridor commerce access"] },
  { icon: Star, name: "Elite", badge: "ELITE TIER", price: "5,000 BOX/yr", color: "text-primary border-primary/30 bg-primary/5", desc: "Reserved for distinguished members demonstrating cultural leadership and strategic network influence.", perks: ["Governance participation", "Elite networking events", "Business corridor access", "Black Card — Gold Level", "Quarterly retreat invitations"] },
  { icon: Briefcase, name: "Partner", badge: "PARTNER TIER", price: "2,500 BOX/yr", color: "text-primary/80 border-primary/20 bg-primary/5", desc: "Kingdom-aligned business leaders and entrepreneurs contributing to the Blanch Corridor commerce ecosystem.", perks: ["Business network listing", "Commerce partnerships", "Annual summit access", "Black Card — Standard", "Investment opportunities"] },
  { icon: Shield, name: "Executive", badge: "EXECUTIVE TIER", price: "1,000 BOX/yr", color: "text-blue-400 border-blue-400/30 bg-blue-400/5", desc: "Distinguished professionals advancing the H.E.E.D. program pillars across communities and industries.", perks: ["Executive networking events", "Educational resources", "Cultural event access", "Community investment access", "Universal Business Network"] },
  { icon: Sparkles, name: "Onyx · Council", badge: "COUNCIL TIER", price: "7,500 BOX/yr", color: "text-primary border-primary/20 bg-primary/5", desc: "An elite advisory tier governing cultural standards, ethical compliance, and community development.", perks: ["Council governance seats", "Ethical standards board", "Cultural leadership role", "Exclusive summits", "Lifetime recognition", "Universal Business Network"] },
  { icon: UserCheck, name: "Associate", badge: "ASSOCIATE TIER", price: "250 BOX/yr", color: "text-muted-foreground border-border bg-muted/20", desc: "Entry-level membership for those answering the call to the Royal Priesthood network.", perks: ["Member directory access", "Digital marketplace access", "Cultural events", "Social feed participation", "Universal Business Network"] },
  { icon: Users, name: "Sardonyx · Initiate", badge: "INITIATE TIER", price: "100 BOX/yr", color: "text-muted-foreground border-border bg-card", desc: "The beginning of the sovereign journey — welcome to the Royal Priesthood network as a Sardonyx Initiate.", perks: ["Onboarding materials", "Community access", "H.E.E.D. educational series", "Marketplace browsing"] },
];

export default function MembershipPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", desired_tier: "", purpose: "", referral: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.MemberApplication.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">MEMBERSHIP</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Join the Royal Priesthood Network</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Membership Tiers</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Where sovereign identity meets strategic influence. Select the tier that aligns with your calling and purpose.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Tiers Accordion */}
        <div className="space-y-3 mb-20">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`border ${expanded === i ? "border-primary/40" : "border-border/30"} transition-all duration-300`}
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
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
                        <span className="text-[10px] tracking-wider text-muted-foreground uppercase">Price:</span>
                        <span className="font-heading text-sm text-primary">{tier.price}</span>
                      </div>
                      <button
                        onClick={() => setForm(f => ({ ...f, desired_tier: tier.name }))}
                        className="px-5 py-2 border border-primary/30 text-primary text-[10px] tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        Select This Tier
                      </button>
                    </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Discount Banner */}
        <div className="border border-primary/30 bg-primary/5 px-6 py-4 mb-12 flex items-center gap-3 max-w-2xl mx-auto">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <p className="text-sm text-foreground"><span className="text-primary font-heading">Members get Discounts</span> on Products &amp; Services with anyone on the Network and Marketplace.</p>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Apply for Membership</p>
            <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground">Submit Your Application</h2>
          </motion.div>

          {submitted ? (
            <div className="text-center py-16 border border-primary/20 bg-primary/5">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl text-foreground mb-2">Application Received</h3>
              <p className="text-muted-foreground text-sm">Your application has been recorded on the Blanch Onyx DLT. The Elder Council will review and respond. Shalawam.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 border border-border/30 p-8">
              {[
                { key: "full_name", label: "Full Name", type: "text", required: true },
                { key: "email", label: "Email Address", type: "email", required: true },
                { key: "phone", label: "Phone Number", type: "tel" },
                { key: "referral", label: "Referred By (Member Name)", type: "text" },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">{field.label}{field.required && " *"}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={form[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full bg-card border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">Desired Membership Tier *</label>
                <select
                  required
                  value={form.desired_tier}
                  onChange={e => setForm(f => ({ ...f, desired_tier: e.target.value }))}
                  className="w-full bg-card border border-border/40 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40"
                >
                  <option value="">Select a tier...</option>
                  {TIERS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">Purpose & Vision *</label>
                <textarea
                  required
                  rows={4}
                  value={form.purpose}
                  onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                  placeholder="Describe your purpose for joining and how you align with the kingdom mission..."
                  className="w-full bg-card border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground font-heading text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}