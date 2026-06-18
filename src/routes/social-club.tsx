import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Users, Heart, Calendar, Globe, Car, MessageCircle, Sparkles, Crown, Star } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const PILLARS = [
  { icon: Users, title: "Elite Collaboration", desc: "Connect with sovereign-minded leaders across culture, business, and philanthropy." },
  { icon: Sparkles, title: "Cultural Leadership", desc: "Honor Holy Days, Feasts, and divine appointments as a community of royal stewards." },
  { icon: Globe, title: "Strategic Networking", desc: "Access the Blanch Corridor and Universal Business Network for kingdom-aligned partnerships." },
  { icon: Heart, title: "Philanthropic Development", desc: "Channel resources to the H.E.E.D. initiatives, empowering communities worldwide." },
  { icon: Calendar, title: "Sacred Events", desc: "Exclusive summits, quarterly retreats, and intimate mastermind sessions." },
  { icon: Car, title: "Automotive Club", desc: "A premier automotive fellowship for enthusiasts and collectors — curated drives and exclusive events." },
];

export default function SocialClubPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    base44.entities.SocialPost.list("-created_date", 10)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const post = await base44.entities.SocialPost.create({
      content: newPost,
      author_name: "Member",
      author_tier: "Associate",
      likes: 0,
      category: "general"
    });
    setPosts(prev => [post, ...prev]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">SOCIAL CLUB</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Private Membership Network</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Blanch Onyx Social Club</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            An elite private membership Social Club — where sovereign identity meets strategic influence, cultural leadership, and philanthropic purpose.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Club pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all group"
            >
              <p.icon className="w-5 h-5 text-primary/60 mb-3 group-hover:text-primary transition-colors" />
              <h3 className="font-heading text-sm text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Feed */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-6">Member Feed</h2>

          {/* Post composer */}
          <div className="border border-border/30 bg-card p-5 mb-6">
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share with the Royal Membership Network..."
              rows={3}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none mb-3"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground/60">Post will be visible to all Blanch Onyx members</p>
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="px-5 py-2 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-primary/90 transition-all"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-card border border-border/30 p-5 animate-pulse">
                  <div className="flex gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-muted" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-muted rounded w-28" />
                      <div className="h-2.5 bg-muted rounded w-20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                  </div>
                </div>
              ))
            ) : posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border/30 p-5 hover:border-primary/15 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-heading text-primary">{(post.author_name || "M").charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading text-xs text-foreground">{post.author_name}</span>
                      <span className="text-[9px] tracking-[0.1em] text-primary/60 uppercase">{post.author_tier}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button className="flex items-center gap-1 text-muted-foreground/60 hover:text-primary text-xs transition-colors">
                        <Heart className="w-3 h-3" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground/60 hover:text-primary text-xs transition-colors">
                        <MessageCircle className="w-3 h-3" /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/social-club')({
  component: SocialClubPage,
});