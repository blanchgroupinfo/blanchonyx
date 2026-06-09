import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sections = [
  { id: "heritage", label: "Heritage" },
  { id: "heed", label: "H.E.E.D." },
  { id: "shield", label: "S.H.I.E.L.D. AI" },
  { id: "dlt", label: "DLT" },
  { id: "vision", label: "Vision" },
  { id: "downloads", label: "Documents" },
  { id: "contact", label: "Contact" },
];

const pageLinks = [
  { to: "/membership", label: "Membership" },
  { to: "/social-club", label: "Social Club" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/universal-business-network", label: "UBN" },
  { to: "/press", label: "Press" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!onHome) return;
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHome]);

  useEffect(() => setOpen(false), [location.pathname]);

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

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
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              alt="Blanch Onyx"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
              src="/lovable-uploads/12ab148e-910d-495f-a5b7-0f1d3bea7f28.png"
            />
            <span className="font-display text-xl font-semibold text-gradient-gold">
              Blanch Onyx
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={sectionHref(s.id)}
                className={`text-sm transition-colors ${
                  active === s.id && onHome
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {s.label}
              </a>
            ))}
            <span className="w-px h-4 bg-border" />
            {pageLinks.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`text-sm transition-colors ${
                  location.pathname.startsWith(p.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-primary"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={sectionHref(s.id)}
                  onClick={() => setOpen(false)}
                  className={`py-3 px-3 rounded-lg text-base border-l-2 ${
                    active === s.id && onHome
                      ? "text-primary border-primary bg-primary/5"
                      : "text-muted-foreground border-transparent hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {s.label}
                </a>
              ))}
              <div className="h-px bg-border my-2" />
              {pageLinks.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className={`py-3 px-3 rounded-lg text-base border-l-2 ${
                    location.pathname.startsWith(p.to)
                      ? "text-primary border-primary bg-primary/5"
                      : "text-muted-foreground border-transparent hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
