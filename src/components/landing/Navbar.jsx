import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoBrown from "@/assets/b-logo-brown.png";

const NAV_GROUPS = [
  {
    label: "Ecosystem",
    links: [
      { label: "Heritage", href: "#heritage" },
      { label: "H.E.E.D.", href: "#heed" },
      { label: "S.H.I.E.L.D. AI", href: "#shield" },
      { label: "DLT Network", href: "#dlt" },
      { label: "Vision", href: "#ourPurpose" },
    ],
  },
  {
    label: "Membership",
    links: [
      { label: "Membership Tiers", href: "/membership", isRoute: true },
      { label: "Royal Priesthood", href: "/royal-priesthood", isRoute: true },
      { label: "Social Club", href: "/social-club", isRoute: true },
    ],
  },
  {
    label: "Finance",
    links: [
      { label: "Tokens", href: "/tokens", isRoute: true },
      { label: "Onyx Coin (BOX)", href: "/coin", isRoute: true },
      { label: "Black Card", href: "/black-card", isRoute: true },
      { label: "Exchange", href: "/exchange", isRoute: true },
      { label: "Trading Hub", href: "/trading-hub", isRoute: true },
      { label: "Banking", href: "/banking", isRoute: true },
    ],
  },
  {
    label: "Network",
    links: [
      { label: "Business Network", href: "/business-network", isRoute: true },
      { label: "Universal Commerce", href: "/universe-commerce", isRoute: true },
      { label: "Marketplace", href: "/marketplace", isRoute: true },
      { label: "H.E.E.D. Program", href: "/heed", isRoute: true },
      { label: "Explorer", href: "/explorer", isRoute: true },
    ],
  },
  {
    label: "Tools",
    links: [
      { label: "Creators Calendar", href: "/creators-calendar", isRoute: true },
      { label: "TPS Live", href: "/tps", isRoute: true },
      { label: "DLT Network", href: "/dlt", isRoute: true },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    setActiveGroup(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Flatten all links for search
  const allLinks = NAV_GROUPS.flatMap(g => g.links);
  const searchResults = searchQuery.length > 1
    ? allLinks.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 group shrink-0">
            <img src={logoBrown} alt="Blanch Onyx" className="w-10 h-12 object-contain group-hover:scale-105 transition-transform duration-300" />
            <div className="hidden sm:block">
              <p className="font-sans text-xs tracking-[0.35em] text-primary leading-tight">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/70 leading-tight">SOVEREIGN SOCIAL CLUB</p>
            </div>
          </button>

          {/* Search bar — desktop center */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Blanch Onyx Ecosystem..."
                className="w-full pl-9 pr-4 py-2 bg-card/60 border border-border/40 text-foreground text-[11px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 rounded-sm"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/40 shadow-xl z-50">
                  {searchResults.map(l => (
                    l.isRoute
                      ? <Link key={l.label} to={l.href} onClick={() => setSearchQuery("")} className="block px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</Link>
                      : <button key={l.label} onClick={() => { scrollTo(l.href); setSearchQuery(""); }} className="block w-full text-left px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop nav groups */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map(group => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)}
                  onMouseEnter={() => setActiveGroup(group.label)}
                  className="flex items-center gap-1 px-3 py-2 text-[11px] tracking-[0.12em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {group.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeGroup === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setActiveGroup(null)}
                      className="absolute top-full left-0 mt-1 w-48 bg-card border border-border/40 shadow-xl z-50 py-1"
                    >
                      {group.links.map(link => (
                        link.isRoute
                          ? <Link key={link.label} to={link.href} onClick={() => setActiveGroup(null)} className="block px-4 py-2.5 text-[11px] tracking-[0.08em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">{link.label}</Link>
                          : <button key={link.label} onClick={() => scrollTo(link.href)} className="block w-full text-left px-4 py-2.5 text-[11px] tracking-[0.08em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">{link.label}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link
              to="/login"
              className="ml-2 px-5 py-2 border border-primary/40 text-primary text-[11px] tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Members
            </Link>
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border/30 bg-background/95 overflow-hidden"
            >
              <div className="px-6 py-3 relative">
                <Search className="absolute left-9 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Blanch Onyx Ecosystem..."
                  className="w-full pl-9 pr-4 py-2.5 bg-card border border-border/40 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-6 right-6 bg-card border border-border/40 shadow-xl z-50">
                    {searchResults.map(l => (
                      l.isRoute
                        ? <Link key={l.label} to={l.href} onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5">{l.label}</Link>
                        : <button key={l.label} onClick={() => { scrollTo(l.href); setSearchQuery(""); setSearchOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5">{l.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto pt-24 pb-10"
          >
            <div className="px-6 space-y-2">
              {NAV_GROUPS.map(group => (
                <div key={group.label} className="border border-border/30">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between px-5 py-4"
                  >
                    <span className="font-sans text-sm tracking-[0.2em] uppercase text-foreground">{group.label}</span>
                    <ChevronDown className={`w-4 h-4 text-primary transition-transform ${mobileExpanded === group.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === group.label && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-border/20"
                      >
                        {group.links.map(link => (
                          link.isRoute
                            ? <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                            : <button key={link.label} onClick={() => scrollTo(link.href)} className="block w-full text-left px-6 py-3 text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center mt-6 px-8 py-4 border border-primary/40 text-primary text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Members Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}