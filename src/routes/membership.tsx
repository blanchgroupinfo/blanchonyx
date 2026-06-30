import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Crown, Gem, Star, Briefcase, Shield, UserCheck, Sparkles, Users, ChevronDown, ArrowLeft, CheckCircle, Loader2, X, BookOpen } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const TIERS = [
  { icon: Crown, name: "Founder", badge: "FOUNDING TIER", price: "By Invitation", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5", desc: "The highest honor — reserved for those who helped establish the sovereign foundation of Blanch Onyx. Originating stewards of the Blanch Group Sovereign Trust. Permanent voice in governance, full Black Card privileges, and access to every surface of the ecosystem.", perks: ["Lifetime membership", "Governance veto rights", "Direct Elder Council access", "Genesis NFT airdrop", "Black Card — Obsidian Level"] },
  { icon: Gem, name: "Royal · Throne", badge: "ROYAL TIER", price: "10,000 BOX/yr", color: "text-amber-300 border-amber-300/30 bg-amber-300/5", desc: "All Benefits of Onyx Councile plus, Sovereign leadership tier for proven champions of the kingdom mission.", perks: ["Full governance voting rights Reserved for the highest stewards of the Royal House of Judah. Throne-level governance access and presence at every sacred observance.", "Private banking access", "Summit & retreat priority", "Black Card — Royal Level", "Blanch Corridor commerce access"] },
  { icon: Sparkles, name: "Onyx · Council", badge: "COUNCIL TIER", price: "7,500 BOX/yr", color: "text-primary border-primary/20 bg-primary/5", desc: "All Benefits of Elite plus, An elite advisory tier governing cultural standards and community development. The standing council. Advisory voice across H.E.E.D., S.H.I.E.L.D., DLT, and Corridor decisions, with priority Black Card issuance.", perks: ["Council governance seats", "Ethical standards board", "Cultural leadership role", "Exclusive summits", "Lifetime recognition"] },
  { icon: Star, name: "Elite", badge: "ELITE TIER", price: "5,000 BOX/yr", color: "text-primary border-primary/30 bg-primary/5", desc: "All Benefits of Partner plus, Reserved for distinguished members demonstrating cultural leadership.Senior members with full networking, summit, and investment-platform access — the core of the Elite Circle.", perks: ["Governance participation", "Elite networking events", "Business corridor access", "Black Card — Gold Level", "Quarterly retreat invitations"] },
  { icon: Briefcase, name: "Partner", badge: "PARTNER TIER", price: "2,500 BOX/yr", color: "text-primary/80 border-primary/20 bg-primary/5", desc: "All Benefits of Executive plus, Kingdom-aligned business leaders and entrepreneurs. Strategic enterprise partners — kingdom-aligned ventures plugged directly into the Blanch Corridor and Universal Business Network.", perks: ["Business network listing", "Commerce partnerships", "Annual summit access", "Black Card — Partner", "Investment opportunities", "Partner Members can create exclusive Networks and choose which Blanch Onyx membership tiers are eligible to participate in Exclusive Opportunities", ] },
  { icon: Shield, name: "Executive", badge: "EXECUTIVE TIER", price: "1,000 BOX/yr", color: "text-blue-400 border-blue-400/30 bg-blue-400/5", desc: "All Benefits of Associtate plus, Distinguished professionals advancing the H.E.E.D. program pillars. Operating executives and stewards inside member ventures. Black Card business privileges and executive summit access", perks: ["Executive networking events", "Educational resources", "Cultural event access", "Community investment access"] },
  { icon: UserCheck, name: "Associate", badge: "ASSOCIATE TIER", price: "250 BOX/yr", color: "text-muted-foreground border-border bg-muted/20", desc: "All Benefits of Sardonix Initiate plus, more, Entry-level membership for those answering the call. Vetted associates of the network — invited to gatherings, the Creators Calendar, and members-only marketplace access. Vendor Showcase Trade Shows", perks: ["Member directory access", "Digital marketplace access", "Cultural events", "Social feed participation"] },
  { icon: Users, name: "Sardonyx · Initiate", badge: "INITIATE TIER", price: "100 BOX/yr", color: "text-muted-foreground border-border bg-card", desc: "The beginning of the sovereign journey. Entry tier. Default for newly admitted members, Vetted Initiates of the network — full access to public-facing privileges, observances, and the path to elevation. Creators Calendar, Discount Products & Services with anyone on the Network, Business Network Listing, Marketplace Listing, Standalone Electronic Wallets & Black Card", perks: ["Onboarding Materials", "Community Access", "H.E.E.D. Educational Series", "Business Network Listing & Browsing", "Marketplace Listing & Browsing", "Access to public gatherings", "Blessings Access", "Onyx DLT wallet provisioning", ] },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow mb-4 justify-center">
      <span />
      {children}
      <span />
    </div>
  );
}

export default function MembershipPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", desired_tier: "", purpose: "", referral: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

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
          <Eyebrow>Join the Royal Priesthood Network</Eyebrow>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">
            Membership <br /><em>Tiers</em>
          </h1>
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

        {/* The Kingdom Mandates & Covenant */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-24 bg-card border border-primary/20 p-8 md:p-12 relative overflow-hidden rounded-sm"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono block mb-2">Sacred Covenant & Pillars</span>
            <h2 className="font-heading text-2xl md:text-3xl tracking-[0.05em] text-foreground mb-4">Sovereign Pillars of the Royal Priesthood</h2>
            <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
              These eternal principles guide every member, family, and enterprise within the Blanch Onyx ecosystem, establishing truth, righteousness, and Kingdom-aligned stewardship.
            </p>
            <div className="w-12 h-px bg-primary/30 mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Pillar 1 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">01 / DIVINE WORSHIP</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Honor, Praise, Serve, Worship the Most High AHAYAH & YASHAYA</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">The true Messiah in Truth — In every act and word.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  John 4:24
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">02 / PROTECTION</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Protect the Chosen Generation</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">Especially mothers and children.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Proverbs 12:17
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">03 / COVENANT STEWARDSHIP</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Steward Wealth, Land, and Knowledge</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">For the dynamic extension and glory of the Kingdom.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  1 Peter 2:9, 1 John 5:2
                </span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">04 / REJECTION OF IDOLATRY</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Reject Deceit, Exploitation, & Idolatry</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">Reject deceit, exploitation, and idolatry in all forms of religion. All nations are supposed to call on the Most High AHAYAH & YASHAYA, Creator of all. Laws & Commandments are truth — the way of life for all.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Proverbs 12:17, Romans 12:11, Romans 3:29
                </span>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">05 / ALLEVATION OF POVERTY</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Save the Poor — Alleviate Poverty</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">Help the poor, invite the poor to the feast.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Deuteronomy 15:4, Luke 14:13
                </span>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">06 / THE SACRED CALL</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Take H.E.E.D. Mission & Royal Priesthood</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">Accept the great charge of the Royal Priesthood with sacred intent and absolute devotion.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Active Mission Mandate
                </span>
              </div>
            </div>

            {/* Pillar 7 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">07 / THE COMMANDMENT OF TASSELS</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Wear Tassels — All Nations Are Required</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">Remember the Laws of the Most High AHAYAH & YASHAYA Commandments.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Numbers 15:38, Deuteronomy 22:11–12
                </span>
              </div>
            </div>

            {/* Pillar 8 */}
            <div className="border border-border/30 p-6 bg-background/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-primary/60 block mb-1">08 / UPRIGHT WALKING</span>
                <h4 className="font-heading text-sm text-foreground mb-2 tracking-[0.05em]">Walk in Truth, Righteousness, and Humility</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">In all walks of life: Personal, Relationships, and Business.</p>
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[9px] font-mono">
                  Proverbs 6:23, Psalms 119:142, Psalms 119:151
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => setIsLearnMoreOpen(true)}
              className="px-8 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:shadow-lg transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Learn More
            </button>
          </div>
        </motion.div>

        {/* Scripture / Mission Covenant Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 p-8 md:p-12 border border-primary/25 bg-card/65 rounded-sm text-center card-lift relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Foundational Mission & Sacred Covenant</p>
          <div className="space-y-6 text-foreground font-display leading-relaxed">
            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Honor, Praise, Serve, Worship the Most High AHAYAH & YASHAYA</p>
              <p className="text-sm italic text-primary/80 mt-1">The true Messiah in Truth — John 4:24</p>
              <p className="text-xs text-foreground/75 mt-0.5">In every act and word.</p>
            </div>
            
            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Protect the Chosen Generation</p>
              <p className="text-sm italic text-primary/80 mt-1">Especially mothers and children. — Proverbs 12:17</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Steward Wealth, Land, and Knowledge for the Kingdom</p>
              <p className="text-sm italic text-primary/80 mt-1">1 Peter 2:9, 1 John 5:2</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Reject Deceit, Exploitation, and Idolatry</p>
              <p className="text-xs text-foreground/75 mt-1.5 leading-relaxed max-w-xl mx-auto">
                Reject deceit, exploitation, and idolatry in all forms of religion. All nations are supposed to call on the Most High AHAYAH & YASHAYA, Creator of all. Laws & Commandments are truth — the way of life for all.
              </p>
              <p className="text-sm italic text-primary/80 mt-2">Proverbs 12:17, Romans 12:11, Romans 3:29</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Save the Poor — Alleviate Poverty</p>
              <p className="text-xs text-foreground/75 mt-1">Help the poor, invite the poor to the feast.</p>
              <p className="text-sm italic text-primary/80 mt-1.5">Deuteronomy 15:4, Luke 14:13</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Take H.E.E.D. Mission & Royal Priesthood</p>
              <p className="text-xs text-foreground/75 mt-1">Take H.E.E.D. mission and the Royal Priesthood with sacred intent.</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Wear Tassels — All Nations Are Required</p>
              <p className="text-xs text-foreground/75 mt-1">Remember the Laws of the Most High AHAYAH & YASHAYA Commandments.</p>
              <p className="text-sm italic text-primary/80 mt-1.5">Numbers 15:38, Deuteronomy 22:11–12</p>
            </div>

            <div className="w-12 h-px bg-primary/20 mx-auto" />

            <div>
              <p className="text-lg md:text-xl font-heading tracking-wide">Walk in Truth, Righteousness, and Humility</p>
              <p className="text-xs text-foreground/75 mt-1">In all walks of life: Personal, Relationships, and Business.</p>
              <p className="text-sm italic text-primary/80 mt-1.5">Proverbs 6:23, Psalms 119:142, Psalms 119:151</p>
            </div>
          </div>
        </motion.div>

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

      {/* Learn More Modal */}
      <AnimatePresence>
        {isLearnMoreOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLearnMoreOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-primary/25 w-full max-w-2xl p-6 md:p-8 relative z-10 shadow-2xl rounded-sm max-h-[85vh] overflow-y-auto scrollbar-none"
            >
              <button 
                onClick={() => setIsLearnMoreOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6">
                <span className="text-[9px] tracking-[0.3em] text-primary uppercase font-mono block mb-1">Covenant Wisdom</span>
                <h3 className="font-heading text-2xl text-foreground">The Law, the Name, and the Priesthood</h3>
                <div className="w-12 h-px bg-primary/30 mt-3" />
              </div>
              
              <div className="space-y-6 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-heading text-foreground uppercase tracking-wider mb-2 text-sm text-primary">I. The Sacred Names</h4>
                  <p className="mb-2">
                    Our Creator's name is <strong>AHAYAH ASHER AHAYAH</strong> (I Am That I Am), and His Son is <strong>YASHAYA</strong> (The Savior). True worship demands seeking and calling upon the Father and Son in spirit and in pure truth, stripping away the traditions and deceit of men.
                  </p>
                  <span className="font-mono text-primary/70 text-[10px]">John 4:24 — "God is a Spirit: and they that worship him must worship him in spirit and in truth."</span>
                </div>

                <div>
                  <h4 className="font-heading text-foreground uppercase tracking-wider mb-2 text-sm text-primary">II. Keeping the Commandments & Tassels</h4>
                  <p className="mb-2">
                    Commandments are the way of life and the light of our path. All nations are invited to enter under the covenant laws. As a constant physical remembrance of these statutes, we wear tassels on the borders of our garments.
                  </p>
                  <span className="font-mono text-primary/70 text-[10px]">Numbers 15:38 — "Speak unto the children of Israel, and bid them that they make them fringes in the borders of their garments..."</span>
                </div>

                <div>
                  <h4 className="font-heading text-foreground uppercase tracking-wider mb-2 text-sm text-primary">III. Protecting the Chosen Generation</h4>
                  <p className="mb-2">
                    Mothers and children are the core structure of our righteous community. Every member pledges absolute support, security, and educational preservation to protect the next generation from exploitation.
                  </p>
                  <span className="font-mono text-primary/70 text-[10px]">Proverbs 12:17 — "He that speaketh truth sheweth forth righteousness..."</span>
                </div>

                <div>
                  <h4 className="font-heading text-foreground uppercase tracking-wider mb-2 text-sm text-primary">IV. Eradicating Poverty & Kingdom Commerce</h4>
                  <p className="mb-2">
                    Under the royal priesthood, we reject exploitation and usury. Wealth, land, and wisdom are stewarded collaboratively. We feed the poor, build interest-free systems, and actively share our tables and opportunities to eliminate systemic lack.
                  </p>
                  <span className="font-mono text-primary/70 text-[10px]">Deuteronomy 15:4 — "Save when there shall be no poor among you; for the LORD shall greatly bless thee..."</span>
                </div>

                <div className="bg-primary/5 p-4 border border-primary/20 text-[11px] italic text-foreground">
                  "Take the H.E.E.D. mission and the Royal Priesthood with sacred intent. For you are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light."
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setIsLearnMoreOpen(false)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase transition-all rounded-sm"
                >
                  Close & Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
});
