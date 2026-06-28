<<<<<<< Updated upstream
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
=======
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Search,
  Star,
  Package,
  X,
  SlidersHorizontal,
  Crown,
  Award,
  Coins,
  Database,
  Music,
  Briefcase,
  BookOpen,
  Sparkles,
  Droplet,
  Hammer,
  Sprout,
  Shirt,
  Gem
} from "lucide-react";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const CATEGORIES = [
  "all",
  "digital_asset",
  "nft",
  "token",
  "service",
  "media",
  "membership_upgrade",
  "anointing_oils",
  "craftsmanship",
  "agriculture",
  "fashion",
  "stones_jewelry"
];

const CAT_LABELS: Record<string, string> = {
  all: "All Items",
  digital_asset: "Digital Assets",
  nft: "NFTs",
  token: "Tokens",
  service: "Services",
  media: "Media",
  membership_upgrade: "Membership",
  anointing_oils: "Anointing Oils & Incense",
  craftsmanship: "Craftsmanship & Trades",
  agriculture: "Heritage Agriculture",
  fashion: "Lashawan Qadash Hebrew Fashion",
  stones_jewelry: "Sacred Stones & Jewelry",
};

const CAT_COLORS: Record<string, string> = {
  digital_asset: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  nft: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  token: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  service: "text-green-400 border-green-400/30 bg-green-400/10",
  media: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  membership_upgrade: "text-primary border-primary/30 bg-primary/10",
  anointing_oils: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  craftsmanship: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  agriculture: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  fashion: "text-rose-400 border-rose-400/30 bg-rose-400/10",
  stones_jewelry: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
};

const STATIC_MARKETPLACE_ITEMS = [
  {
    id: "static-onyx-council-upgrade",
    title: "Onyx Council Membership Upgrade",
    description: "Upgrade your membership tier to Onyx Council with full access to governance voting, private summits, and the Black Card tier benefits.",
    price: 7500,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "digital_asset",
    seller_name: "Blanch Onyx Council",
    image_url: null
  },
  {
    id: "static-yarawashalam-land-deed",
    title: "Smart City Yarawashalam Land Deed Token",
    description: "Digital deed token representing reserved residential allocation in the Yarawashalam Smart City development phase.",
    price: 15000,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "nft",
    seller_name: "Blanch Development",
    image_url: null
  },
  {
    id: "static-genesis-nft-001",
    title: "Blanch Onyx Genesis NFT — Royal Seal #001",
    description: "The inaugural NFT of the Blanch Onyx ecosystem. A sovereign digital seal of the Royal House of Judah, anchored on the Blanch Onyx DLT.",
    price: 22000,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "token",
    seller_name: "Royal House of Judah",
    image_url: null
  },
  {
    id: "static-shield-ai-guardian-token",
    title: "S.H.I.E.L.D. AI Guardian Prime Access Token",
    description: "Limited access token granting 12 months of premium S.H.I.E.L.D. AI intelligence and governance tools.",
    price: 5000,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "digital_asset",
    seller_name: "S.H.I.E.L.D. AI Institute",
    image_url: null
  },
  {
    id: "static-blanch-corridor-trade-license",
    title: "Blanch Corridor Digital Trade License",
    description: "Sovereign digital trade license for participation in the Blanch Corridor cross-border commerce network.",
    price: 1200,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "media",
    seller_name: "Blanch Onyx Commerce",
    image_url: null
  },
  {
    id: "static-heed-series-collection",
    title: "H.E.E.D. Educational Series — Digital Collection",
    description: "Complete digital collection of the H.E.E.D. Educational Series covering Health, Education, Enterprising, and Development.",
    price: 350,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "media",
    seller_name: "H.E.E.D. Program",
    image_url: null
  },
  {
    id: "static-genesis-covenant-nft",
    title: "Genesis Covenant NFT",
    description: "A limited-edition NFT representing founding membership in the Blanch Onyx ecosystem. Only 22 will ever be minted.",
    price: 5000,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "digital_asset",
    seller_name: "Blanch Onyx Founders",
    image_url: null
  },
  {
    id: "static-shield-ai-content-pack",
    title: "S.H.I.E.L.D. AI Content Pack",
    description: "Premium AI-generated media content pack including 50 kingdom-aligned social media assets, templates, and broadcast graphics.",
    price: 750,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "service",
    seller_name: "S.H.I.E.L.D. AI Studio",
    image_url: null
  },
  {
    id: "static-heed-mastery-course",
    title: "H.E.E.D. Mastery Course",
    description: "Complete 12-module educational course covering all four H.E.E.D. pillars with certification upon completion.",
    price: 300,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "token",
    seller_name: "H.E.E.D. Academy",
    image_url: null
  },
  {
    id: "static-box-token-bundle",
    title: "1,000 BOX Token Bundle",
    description: "Acquire 1,000 BOX tokens at a discounted rate for marketplace use and membership upgrades.",
    price: 1000,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "service",
    seller_name: "Blanch Onyx Treasury",
    image_url: null
  },
  {
    id: "static-sovereign-business-id",
    title: "Sovereign Business Identity Package",
    description: "Complete sovereign business identity kit including DLT-registered business credentials, digital letterhead, and Blanch Corridor listing.",
    price: 1200,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "media",
    seller_name: "Blanch Corridor Agency",
    image_url: null
  },
  {
    id: "static-sacred-music-vol1",
    title: "Sacred Music Collection Vol. 1",
    description: "Curated collection of 20 original sacred compositions produced by Blanch Onyx member artists.",
    price: 150,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "media",
    seller_name: "Judah Records",
    image_url: null
  },
  {
    id: "static-frankincense-myrrh-oil",
    title: "Frankincense & Myrrh Anointing Oil",
    description: "Sovereign therapeutic-grade anointing oil formulated according to Biblical standards and cold-pressed pure olive oil.",
    price: 120,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "anointing_oils",
    seller_name: "Judah Apothecary",
    image_url: null
  },
  {
    id: "static-temple-incense-blend",
    title: "Sacred Temple Incense Blend",
    description: "A pure blend of sweet spices, stacte, onycha, galbanum, and pure frankincense for prayer devotionals and sanctuary dedication.",
    price: 85,
    currency: "BOX",
    status: "available",
    featured: false,
    category: "anointing_oils",
    seller_name: "Judah Apothecary",
    image_url: null
  },
  {
    id: "static-cedar-keepsake-box",
    title: "Handcrafted Cedar Keepsake Box",
    description: "Premium aromatic cedar wood box, handcrafted with laser-engraved Hebrew emblems by Heritage Guild Craftsmen.",
    price: 450,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "craftsmanship",
    seller_name: "Heritage Guild Craftsmen",
    image_url: null
  },
  {
    id: "static-heirloom-seed-vault",
    title: "Blanch Corridor Heirloom Seed Vault",
    description: "Non-hybrid, non-GMO seed collection selected for Torah-compliant organic farming and sustainable home harvest.",
    price: 200,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "agriculture",
    seller_name: "Blanch Corridor Agriculture Belt",
    image_url: null
  },
  {
    id: "static-royal-linen-fringes",
    title: "Judah Royal Linen Garment with Fringes",
    description: "Fine white linen tunic handcrafted with blue ribband borders and fringes in accordance with natural law.",
    price: 650,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "fashion",
    seller_name: "Lashawan Qadash Hebrew Fashion",
    image_url: null
  },
  {
    id: "static-twelve-stones-breastplate",
    title: "Twelve Stones Breastplate Replica Pendant",
    description: "A handcrafted sterling silver pendant featuring twelve authentic semi-precious stones representing the tribes of Israel.",
    price: 850,
    currency: "BOX",
    status: "available",
    featured: true,
    category: "stones_jewelry",
    seller_name: "Sacred Stones & Jewelry",
    image_url: null
  }
];

function getCategoryIcon(category: string) {
  switch (category) {
    case "membership_upgrade":
      return <Crown className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform duration-500" />;
    case "nft":
      return <Award className="w-12 h-12 text-purple-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "token":
      return <Coins className="w-12 h-12 text-amber-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "digital_asset":
      return <Database className="w-12 h-12 text-blue-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "media":
      return <Music className="w-12 h-12 text-pink-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "service":
      return <Briefcase className="w-12 h-12 text-green-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "anointing_oils":
      return <Droplet className="w-12 h-12 text-teal-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "craftsmanship":
      return <Hammer className="w-12 h-12 text-orange-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "agriculture":
      return <Sprout className="w-12 h-12 text-emerald-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "fashion":
      return <Shirt className="w-12 h-12 text-rose-400/40 group-hover:scale-110 transition-transform duration-500" />;
    case "stones_jewelry":
      return <Gem className="w-12 h-12 text-cyan-400/40 group-hover:scale-110 transition-transform duration-500" />;
    default:
      return <Package className="w-12 h-12 text-primary/30 group-hover:scale-110 transition-transform duration-500" />;
  }
}

function getCategoryModalIcon(category: string) {
  switch (category) {
    case "membership_upgrade":
      return <Crown className="w-16 h-16 text-primary/40" />;
    case "nft":
      return <Award className="w-16 h-16 text-purple-400/40" />;
    case "token":
      return <Coins className="w-16 h-16 text-amber-400/40" />;
    case "digital_asset":
      return <Database className="w-16 h-16 text-blue-400/40" />;
    case "media":
      return <Music className="w-16 h-16 text-pink-400/40" />;
    case "service":
      return <Briefcase className="w-16 h-16 text-green-400/40" />;
    case "anointing_oils":
      return <Droplet className="w-16 h-16 text-teal-400/40" />;
    case "craftsmanship":
      return <Hammer className="w-16 h-16 text-orange-400/40" />;
    case "agriculture":
      return <Sprout className="w-16 h-16 text-emerald-400/40" />;
    case "fashion":
      return <Shirt className="w-16 h-16 text-rose-400/40" />;
    case "stones_jewelry":
      return <Gem className="w-16 h-16 text-cyan-400/40" />;
    default:
      return <Package className="w-16 h-16 text-primary/30" />;
  }
}

function ItemCard({ item, onClick }: { item: any; onClick: (item: any) => void }) {
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
          : getCategoryIcon(item.category)
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

function ItemModal({ item, onClose }: { item: any; onClose: () => void }) {
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
            : getCategoryModalIcon(item.category)
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
            <p className="text-xs text-muted-foreground">Sold by {item.seller_name || "Blanch Onyx"}</p>
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
  const [items, setItems] = useState<any[]>(STATIC_MARKETPLACE_ITEMS);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          // Merge database items if any exist, filtering out duplicates
          const dbItems = data || [];
          const combined = [...STATIC_MARKETPLACE_ITEMS];
          dbItems.forEach((dbItem: any) => {
            if (!combined.some(item => item.title.toLowerCase() === dbItem.title.toLowerCase())) {
              combined.push(dbItem);
            }
          });
          setItems(combined);
        } else {
          setItems(STATIC_MARKETPLACE_ITEMS);
        }
        setLoading(false);
      })
      .catch(() => {
        setItems(STATIC_MARKETPLACE_ITEMS);
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Kingdom-Aligned Commerce</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Virtual Marketplace</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl">
            A sacred digital marketplace for kingdom-aligned goods, services, and creative works — righteous exchange, fair trade, and community prosperity. A A sacred digital marketplace for kingdom-aligned goods, services, and creative works. A sovereign marketplace of righteous goods, sacred crafts, and member enterprises — settled on Blanch Onyx DLT.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="card-sacred rounded-xl p-6 border border-border/40 bg-card/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-primary uppercase">01 · Listings</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
              </div>
              <h3 className="font-heading text-base tracking-[0.05em] text-foreground mb-2">Member Listings</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Members list goods, services, and creative works under one compliance umbrella.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="card-sacred rounded-xl p-6 border border-border/40 bg-card/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-primary uppercase">02 · Fulfillment</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              </div>
              <h3 className="font-heading text-base tracking-[0.05em] text-foreground mb-2">Sovereign Fulfillment</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Logistics through member-vetted carriers along the Blanch Corridor.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="card-sacred rounded-xl p-6 border border-border/40 bg-card/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-primary uppercase">03 · Compliance</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              </div>
              <h3 className="font-heading text-base tracking-[0.05em] text-foreground mb-2">Standard of Compliance</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Every listing is screened against Divine-Law product policy.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-sacred rounded-xl p-6 md:p-8 mt-8 border border-primary/25 bg-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-[9px] tracking-[0.2em] font-mono text-primary uppercase block mb-1">Notice</span>
              <h3 className="font-heading text-lg tracking-[0.05em] text-foreground mb-2">Vendor Applications Opening</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Member enterprises will soon be invited to list goods on the Blanch Onyx Marketplace, with zero-fee settlement through Blanch Onyx DLT. Apply for membership to be notified first.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/membership"
                className="px-5 py-3 bg-primary text-primary-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all text-center"
              >
                Apply for Membership
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 bg-card text-foreground border border-border hover:bg-border/20 font-heading text-xs tracking-[0.15em] uppercase transition-all text-center"
              >
                Contact Marketplace Listing
              </Link>
            </div>
          </motion.div>
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
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
});
>>>>>>> Stashed changes
