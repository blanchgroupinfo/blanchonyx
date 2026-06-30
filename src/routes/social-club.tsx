import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Heart, Calendar, Globe, Car, MessageCircle, Sparkles, Crown, Star, MapPin, Music, Utensils } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const PILLARS = [
  { icon: Users, title: "Elite Collaboration", desc: "Connect with sovereign-minded leaders across culture, business, and philanthropy." },
  { icon: Sparkles, title: "Cultural Leadership", desc: "Honor Holy Days, Feasts, and divine appointments as a community of royal stewards." },
  { icon: Globe, title: "Strategic Networking", desc: "Access the Blanch Corridor and Universal Business Network for kingdom-aligned partnerships." },
  { icon: Heart, title: "Philanthropic Development", desc: "Channel resources to the H.E.E.D. initiatives, empowering communities worldwide." },
  { icon: Calendar, title: "Sacred Events", desc: "Exclusive summits, quarterly retreats, and intimate mastermind sessions." },
  { icon: Car, title: "Automotive Club", desc: "A premier automotive fellowship for enthusiasts and collectors — curated drives and exclusive events." },
  { icon: Crown, title: "Sacred Convenings", desc: "Private gatherings of the Royal Priesthood for worship, counsel, and feast." },
  { icon: MapPin, title: "Onyx Lounges", desc: "Exclusive member lounges in sovereign cities across the Blanch Corridor." },
  { icon: Music, title: "Cultural Ceremonies", desc: "Heritage music, Levitical liturgy, and ancestral celebrations." },
  { icon: Utensils, title: "Council Dinners", desc: "Intimate dinners with Trustees, scholars, and sovereign leaders." },
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

export default function SocialClubPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    supabase
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data) setPosts(data);
        setLoading(false);
      });
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const { data } = await supabase
      .from("social_posts")
      .insert([{
        content: newPost,
        author_name: "Member",
        author_tier: "Associate",
        likes: 0,
        category: "general",
      }])
      .select()
      .single();
    if (data) {
      setPosts(prev => [data, ...prev]);
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Eyebrow>Private Membership Network</Eyebrow>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">
            Blanch Onyx <br /><em>Social Club</em>
          </h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl mx-auto">
            An elite private membership Social Club — where sovereign identity meets strategic influence.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="border border-border bg-card p-6 card-lift group">
              <p.icon className="w-5 h-5 text-primary/60 mb-3 group-hover:text-primary transition-colors" />
              <h3 className="font-heading text-sm text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="my-20 text-center max-w-2xl mx-auto border-y border-primary/20 py-10 px-6 bg-card/10 backdrop-blur-sm relative"
        >
          <span className="text-3xl text-primary/40 font-serif leading-none block mb-2">“</span>
          <p className="font-display text-lg md:text-xl text-foreground/90 italic tracking-wide leading-relaxed mb-4 px-4">
            Behold, how good and how pleasant it is for brethren to dwell together in unity!
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-px bg-primary/30" />
            <p className="font-heading text-[10px] md:text-xs tracking-[0.25em] text-primary/80 uppercase">
              Psalm 133:1
            </p>
            <div className="w-6 h-px bg-primary/30" />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-xl tracking-[0.1em] text-foreground mb-6">Member Feed</h2>

          <div className="border border-border/30 bg-card p-5 mb-6">
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share with the Royal Membership Network..."
              rows={3}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none mb-3"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Post as Member</span>
              <button onClick={handlePost} disabled={!newPost.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all disabled:opacity-50">
                Post
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground text-sm">Loading feed...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">No posts yet. Be the first to share.</p>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="border border-border/30 bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading text-sm text-foreground">{post.author_name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{post.author_tier}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-muted-foreground/60 hover:text-primary text-xs">
                      <Heart className="w-3.5 h-3.5" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground/60 hover:text-primary text-xs">
                      <MessageCircle className="w-3.5 h-3.5" /> Reply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/social-club")({
  component: SocialClubPage,
});
