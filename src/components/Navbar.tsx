import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ecosystem = [
  { to: "/", label: "Home", desc: "Blanch Onyx — Sovereign Trust" },
  { to: "/membership", label: "Membership", desc: "Tiers · Code of Conduct · Apply" },
  { to: "/social-club", label: "Social Club", desc: "Private Royal Priesthood gatherings" },
  { to: "/marketplace", label: "Marketplace", desc: "Sovereign virtual marketplace" },
  { to: "/universal-business-network", label: "Universal Business Networks", desc: "B2B / B2C / G2G global mesh" },
  { to: "/dlt", label: "Blanch Onyx DLT", desc: "8-layer DAG · 22 sacred nodes" },
  { to: "/tokens", label: "Tokens", desc: "Sovereign token economy" },
  { to: "/coin", label: "Blanch Onyx Coin", desc: "The reserve coin of the Kingdom" },
  { to: "/heritage/judah", label: "Heritage · Royal House of Judah", desc: "Scripture-anchored lineage" },
  { to: "/heed/health", label: "H.E.E.D. · Health", desc: "Sacred wellness pillar" },
  { to: "/heed/education", label: "H.E.E.D. · Education", desc: "Knowledge & wisdom" },
  { to: "/heed/enterprising", label: "H.E.E.D. · Enterprising", desc: "Sovereign enterprise" },
  { to: "/heed/development", label: "H.E.E.D. · Development", desc: "Land & infrastructure" },
  { to: "/press", label: "Press & Recognition", desc: "Sovereign declarations" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [location.pathname]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ecosystem;
    return ecosystem.filter(
      (p) => p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-background/90 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              alt="Blanch Onyx"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
              src="/lovable-uploads/12ab148e-910d-495f-a5b7-0f1d3bea7f28.png"
            />
            <span className="font-display text-xl font-semibold text-gradient-gold hidden sm:block">
              Blanch Onyx
            </span>
          </Link>

          {/* Ecosystem search */}
          <div className="flex-1 max-w-md relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="Search the Blanch Onyx Ecosystem…"
                className="w-full bg-background/60 border border-border/60 rounded-full pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                aria-label="Search the Blanch Onyx Ecosystem"
              />
            </div>
            <AnimatePresence>
              {query && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-full mt-2 left-0 right-0 max-h-80 overflow-y-auto bg-background/95 backdrop-blur-lg border border-border/60 rounded-xl shadow-2xl"
                >
                  {filtered.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">No matching pages.</div>
                  ) : (
                    filtered.map((p) => (
                      <button
                        key={p.to}
                        onClick={() => {
                          navigate(p.to);
                          setQuery("");
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-primary/10 border-b border-border/40 last:border-b-0"
                      >
                        <div className="text-sm text-foreground font-medium">{p.label}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger (always visible) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle ecosystem menu"
            className="p-2 rounded-md border border-border/60 text-primary hover:bg-primary/10 transition-colors shrink-0"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="text-xs uppercase tracking-[0.25em] text-secondary mb-4">
                Blanch Onyx Ecosystem
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filtered.map((p) => {
                  const active = location.pathname === p.to;
                  return (
                    <Link
                      key={p.to}
                      to={p.to}
                      className={`block p-3 rounded-lg border ${
                        active
                          ? "border-primary/60 bg-primary/10"
                          : "border-border/40 hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className={`text-sm font-medium ${active ? "text-primary" : "text-foreground"}`}>
                        {p.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{p.desc}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
