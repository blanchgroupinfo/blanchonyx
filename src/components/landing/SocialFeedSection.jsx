import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Heart, MessageCircle, Crown, Star, Shield, Gem, Sparkles, Users, UserCheck, Briefcase } from "lucide-react";

const TIER_ICONS = {
  "Founder": Crown,
  "Royal · Throne": Gem,
  "Elite": Star,
  "Partner": Briefcase,
  "Executive": Shield,
  "Associate": UserCheck,
  "Onyx · Council": Sparkles,
  "Sardonyx · Initiate": Users,
};

const TIER_COLORS = {
  "Founder": "text-yellow-400",
  "Royal · Throne": "text-amber-300",
  "Elite": "text-primary",
  "Partner": "text-primary/80",
  "Executive": "text-primary/70",
  "Associate": "text-muted-foreground",
  "Onyx · Council": "text-primary",
  "Sardonyx · Initiate": "text-muted-foreground",
};

const CAT_COLORS = {
  announcement: "bg-primary/10 text-primary border-primary/20",
  discussion: "bg-secondary text-secondary-foreground border-border",
  event: "bg-green-500/10 text-green-400 border-green-500/20",
  achievement: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  general: "bg-muted text-muted-foreground border-border",
};

function PostCard({ post }) {
  const TierIcon = TIER_ICONS[post.author_tier] || Users;
  const tierColor = TIER_COLORS[post.author_tier] || "text-muted-foreground";
  const catColor = CAT_COLORS[post.category] || CAT_COLORS.general;
  const initial = (post.author_name || "M").charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border/30 p-6 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="font-heading text-sm text-primary">{initial}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-heading text-sm text-foreground">{post.author_name}</span>
            <div className={`flex items-center gap-1 ${tierColor}`}>
              <TierIcon className="w-3 h-3" />
              <span className="text-[10px] tracking-[0.1em] uppercase">{post.author_tier}</span>
            </div>
            <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded border ${catColor}`}>
              {post.category}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">{post.content}</p>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-primary transition-colors text-xs">
              <Heart className="w-3.5 h-3.5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-primary transition-colors text-xs">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialFeedSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SocialPost.list("-created_date", 5)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="feed" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Member Activity</p>
          <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em] text-foreground mb-4">
            Social Feed
          </h2>
          <p className="font-display text-base text-muted-foreground italic">
            Latest posts and activity from the Royal Membership Network
          </p>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-5" />
        </motion.div>

        <div className="space-y-4">
          {loading
            ? Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-card border border-border/30 p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)
          }
        </div>
      </div>
    </section>
  );
}