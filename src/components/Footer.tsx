import { motion } from "framer-motion";
import blanchLogo from "@/assets/blanch-logo.png";
const Footer = () => {
  return <footer className="py-16 border-t border-border/50 relative">
      <div className="absolute inset-0 bg-gradient-sacred pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="flex flex-col items-center text-center">
          {/* Logo */}
          <img alt="Blanch Group" className="w-16 h-16 object-contain mb-6 opacity-80" src="/lovable-uploads/3c3fb404-1ba9-4962-9497-ce221f06a9d1.png" />

          {/* Name */}
          <h3 className="font-display text-2xl text-gradient-gold font-semibold mb-4">
            Blanch Group
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground mb-6 max-w-md">
            A Sovereign Investment and Indigenous Tribal Association Trust
          </p>

          {/* Divider */}
          <div className="sacred-divider w-24 mb-6" />

          {/* Blessing */}
          <p className="text-sm text-muted-foreground/70 italic mb-6">
            All Blessings for Everyone
          </p>

          {/* Scripture */}
          <p className="text-xs text-muted-foreground/50 max-w-lg">
            Praise Most High AHAYAH BA SHAM YASHAYA
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/40 mt-8">
            © {new Date().getFullYear()} Blanch Group. Sovereign Trust.
          </p>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;