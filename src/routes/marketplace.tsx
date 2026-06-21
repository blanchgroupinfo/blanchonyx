import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, Star, Package, X, SlidersHorizontal } from "lucide-react";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const CATEGORIES = ["all", "digital_asset", "nft", "token", "service", "media", "membership_upgrade"];
const CAT_LABELS = {
  all: "All Items",
  digital_asset: "Digital Assets",
  nft: "NFTs",
  token: "Tokens",
  service: "Services",
  media: "Media",
  membership_upgrade: "Membership",
};
const CAT_COLORS = {
  digital_asset: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  nft: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  token: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  service: "text-green-400 border-green-400/30 bg-green-400/10",
  media: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  membership_upgrade: "text-primary border-primary/30 bg-primary/10",
};

function ItemCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-card border border-border/40 hover:border-primary/30 transition-all duration-400 cursor-pointer overflow-hidden"
      onClick={() => onClick(item)}
    >
      <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
        {item.image_url
          ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
          : <Package className="w-12 h-12 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
        }
        {item.featured && (
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 flex items-center gap-1">
            <Star className="w-2.5 h-2.5" /> Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded ${CAT_COLORS[item.category] || "text-muted-foreground border-border bg-muted"}`}>
            {CAT_LABELS[item.category] || item.category}
          </span>
        </div>
        <h3 className="font-heading text-sm tracking-[0.03em] text-foreground leading-snug mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-base text-primary">{item.price?.toLocaleString()} <span className="text-xs">{item.currency}</span></p>
          </div>
          <span className={`text-[9px] px-2 py-0.5 rounded ${
            item.status === "available" ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ItemModal({ item, onClose }) {
  if (!item) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-card border border-border max-w-lg w-full p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <div className="h-40 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-6">
          {item.image_url
            ? <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
            : <Package className="w-16 h-16 text-primary/30" />
          }
        </div>
        <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded mb-3 inline-block ${CAT_COLORS[item.category] || "text-muted-foreground border-border"}`}>
          {CAT_LABELS[item.category]}
        </span>
        <h2 className="font-heading text-xl tracking-[0.05em] text-foreground mb-3">{item.title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.description}</p>
        <div className="flex items-center justify-between border-t border-border/30 pt-5">
          <div>
            <p className="font-heading text-2xl text-primary">{item.price?.toLocaleString()} <span className="text-sm">{item.currency}</span></p>
            <p className="text-xs text-muted-foreground">Sold by {item.seller_name}</p>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all">
            Acquire Asset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data) setItems(data);
        setLoading(false);
      });
  }, []);

  const sorted = [...items].sort((a, b) => {
    if (sortBy === "price_asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price_desc") return (b.price || 0) - (a.price || 0);
    if (sortBy === "popular") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const filtered = sorted.filter(item => {
    const matchCat = category === "all" || item.category === category;
    const matchSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchFeatured = !featuredOnly || item.featured;
    return matchCat && matchSearch && matchStatus && matchFeatured;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">VIRTUAL MARKETPLACE</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Kingdom-Aligned Commerce</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Virtual Marketplace</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl">
            A sacred digital marketplace for kingdom-aligned goods, services, and creative works.
          </p>
        </motion.div>

        <div className="border border-primary/30 bg-primary/5 px-6 py-4 mb-8 flex items-center gap-3">
          <Star className="w-4 h-4 text-primary shrink-0" />
          <p className="text-sm text-foreground"><span className="text-primary font-heading">Members get Discounts</span> on Products &amp; Services with anyone on the Network and Marketplace.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search marketplace..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40">
            {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 bg-card border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40">
            {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm mt-4">Loading marketplace...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No items found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map(item => <ItemCard key={item.id} item={item} onClick={setSelected} />)}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ItemModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
});
