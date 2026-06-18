import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Package, Search, Filter, X, ExternalLink, Star, Crown, Tag, ArrowLeft, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

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
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] text-muted-foreground/70 border border-border/40 px-2 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        )}
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    base44.entities.MarketplaceItem.list("-created_date", 50)
      .then(setItems)
      .finally(() => setLoading(false));
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
      {/* Header */}
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
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Kingdom-Aligned Commerce</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Virtual Marketplace</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl">
            A sacred digital marketplace for kingdom-aligned goods, services, and creative works — facilitating righteous exchange and community prosperity.
          </p>
        </motion.div>

        {/* Discount banner */}
        <div className="border border-primary/30 bg-primary/5 px-6 py-4 mb-8 flex items-center gap-3">
          <Star className="w-4 h-4 text-primary shrink-0" />
          <p className="text-sm text-foreground"><span className="text-primary font-heading">Members get Discounts</span> on Products &amp; Services with anyone on the Network and Marketplace.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search assets, tokens, services..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-[220px] space-y-6">
                  {/* Sort */}
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Sort By</p>
                    <div className="space-y-1">
                      {SORT_OPTIONS.map(s => (
                        <button key={s.value} onClick={() => setSortBy(s.value)} className={`w-full text-left px-3 py-2 text-xs transition-all ${sortBy === s.value ? "text-primary bg-primary/5 border-l-2 border-primary pl-2" : "text-muted-foreground hover:text-foreground"}`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Category */}
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Category</p>
                    <div className="space-y-1">
                      {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)} className={`w-full text-left px-3 py-2 text-xs transition-all ${category === cat ? "text-primary bg-primary/5 border-l-2 border-primary pl-2" : "text-muted-foreground hover:text-foreground"}`}>
                          {CAT_LABELS[cat]}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Status */}
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Status</p>
                    <div className="space-y-1">
                      {["all", "available", "reserved", "sold"].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)} className={`w-full text-left px-3 py-2 text-xs capitalize transition-all ${statusFilter === s ? "text-primary bg-primary/5 border-l-2 border-primary pl-2" : "text-muted-foreground hover:text-foreground"}`}>
                          {s === "all" ? "All Status" : s}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Featured */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={featuredOnly} onChange={e => setFeaturedOnly(e.target.checked)} className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-muted-foreground">Featured Only</span>
                    </label>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors border border-border/40 px-3 py-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {sidebarOpen ? "Hide Filters" : "Show Filters"}
              </button>
              <p className="text-[10px] text-muted-foreground">{filtered.length} items</p>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-card border border-border/30 animate-pulse">
                    <div className="h-36 bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map(item => (
                    <ItemCard key={item.id} item={item} onClick={setSelected} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-display italic">No assets found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute('/marketplace')({
  component: Marketplace,
});