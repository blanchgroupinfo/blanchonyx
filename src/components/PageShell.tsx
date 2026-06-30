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

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="eyebrow mb-4 justify-center">
    <span />
    {children}
    <span />
  </div>
);

const PageShell = ({ eyebrow, title, subtitle, children }: Props) => {
  return (
    <div id="subpage-root" className="min-h-screen bg-background light-cream-onyx-view">
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
              <Eyebrow>{eyebrow}</Eyebrow>
            )}
            <h1 className="font-heading text-4xl md:text-6xl tracking-wide font-semibold mt-3 mb-4">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
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
