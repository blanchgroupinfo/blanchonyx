import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
}

const PageShell = ({ eyebrow, title, subtitle, children }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 section-pattern">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            {eyebrow && (
              <span className="text-sm uppercase tracking-[0.3em] text-secondary font-medium">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 mb-4">{title}</h1>
            {subtitle && <p className="text-white text-lg">{subtitle}</p>}
            <div className="sacred-divider w-32 mx-auto mt-6" />
          </motion.div>

          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageShell;
