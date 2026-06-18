import React from "react";
import logoBrown from "@/assets/b-logo-brown.png";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-zinc-950/80 backdrop-blur-md pt-16 pb-12 text-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 justify-between items-start">
          {/* Logo & Quote */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoBrown} alt="Blanch Onyx" className="h-10 w-auto object-contain" />
              <span className="font-display font-medium text-lg tracking-[0.1em] text-white">BLANCH ONYX</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              “Together, we inspire life, hope, and love through faith, unity, and divine purpose.”
            </p>
            <span className="text-xs text-white/40 tracking-wider">
              — Praise Most High AHAYAH BA SHAM YASHAYA
            </span>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col md:items-end gap-6 h-full justify-between">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-muted-foreground font-heading uppercase text-xs tracking-wider">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/membership" className="hover:text-primary transition-colors">Membership</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/dlt" className="hover:text-primary transition-colors">DLT Network</Link>
            </div>
            
            <div className="md:text-right text-xs text-neutral-500 flex flex-col gap-1">
              <span>Copyright © {new Date().getFullYear()} Blanch Group — Sovereign Trust</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
