import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import blanchLogo from "@/assets/blanch-logo.png";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border/50" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img alt="Blanch Group" className="w-10 h-10 object-contain transition-transform group-hover:scale-105" src="/lovable-uploads/12ab148e-910d-495f-a5b7-0f1d3bea7f28.png" />
            <span className="font-display text-xl font-semibold text-gradient-gold text-yellow-400">
              Blanch Group
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#heritage" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Heritage
            </a>
            <a href="#heed" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              H.E.E.D.
            </a>
            <a href="#shield" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              S.H.I.E.L.D. AI
            </a>
            <a href="#vision" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Vision
            </a>
            <a href="#downloads" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documents
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.nav>;
};
export default Navbar;