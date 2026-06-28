<<<<<<< Updated upstream
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Crown, BookOpen, Star } from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const ANCESTRY = [
  { name: "King David", role: "Royal House of Judah", desc: "Shepherd, warrior, and sovereign king of Israel — a man after the Most High's own heart." },
  { name: "King Solomon", role: "Royal House of Judah", desc: "Builder of the First Temple, known for unparalleled wisdom and divine governance." },
  { name: "King Asa", role: "Royal House of Judah", desc: "King who walked in the ways of his ancestor David, pursuing righteousness and divine law." },
  { name: "Moses", role: "Levitical Priesthood", desc: "King, Priest, and Prophet — deliverer of the Law of the Most High from Mount Sinai." },
  { name: "High Priest Aaron", role: "Levitical Priesthood", desc: "First High Priest of Israel, ordained by the Most High to serve in the Tabernacle." },
];

const SCRIPTURES = [
  { ref: "1 Peter 2:9", text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light." },
  { ref: "Exodus 19:6", text: "And ye shall be unto me a kingdom of priests, and an holy nation." },
  { ref: "Deuteronomy 14:2", text: "For thou art an holy people unto Most High AHAYAH thy Power." },
  { ref: "Isaiah 29:22", text: "Thus saith Most High AHAYAH, who redeemed Abraham, concerning the house of Jacob, Jacob shall not now be ashamed, neither shall his face now wax pale." },
  { ref: "Song of Solomon 1:5", text: "I am black, but comely, O ye daughters of Jerusalem, as the tents of Kedar, as the curtains of Solomon." },
];

export default function RoyalPriesthoodPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">ROYAL PRIESTHOOD</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Crown className="w-10 h-10 text-primary/60 mx-auto mb-4" />
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Our Heritage & Identity</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">The Royal Priesthood</h1>
          <p className="text-xs tracking-[0.2em] text-primary/60 uppercase mb-6">Royal House of Judah · Levitical Priesthood</p>
          <p className="font-display text-lg text-muted-foreground italic max-w-3xl mx-auto">
            We are the Aboriginal Descendants of the Royal House of Tribe of Judah (Yadah), Royal Priesthood of the Tribe of Levi (Lawaya), serving as a Sovereign Divine Law Non-Profit Trustee.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Heritage */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">Royal House of Judah</p>
            <div className="space-y-4">
              {ANCESTRY.map((a, i) => (
                <div key={a.name} className="flex gap-4 p-5 border border-border/30 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Crown className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-foreground">{a.name}</p>
                    <p className="text-[10px] tracking-[0.1em] text-primary/60 uppercase mb-1">{a.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">The Blanch Stone (Shoham)</p>
            <div className="border border-primary/20 bg-primary/5 p-8 mb-6">
              <p className="font-heading text-2xl text-primary mb-2">שֹׁהַם</p>
              <p className="font-heading text-sm text-foreground mb-4">Shaham/Shoham / Onyx / Sardonyx</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The word "Blanch" derives from the Hebrew "Shoham/Shaham a Levite" (שֹׁהַם), meaning "onyx" a Precious Jewel or "sardonyx" — the Fifth Foundation Stone of New Jerusalem (Yarawashalam). It symbolizes strength, protection, and divine connection.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { ref: "Genesis 2:12", text: '"And the gold of that land is good: there is bdellium and the onyx stone."' },
                { ref: "Exodus 28:9", text: '"And thou shalt take two onyx stones, and grave on them the names of the children of Israel."' },
                { ref: "Revelation 21:20", text: "The sardonyx — fifth foundation stone of New Jerusalem (Yarawashalam)." },
                { ref: "1 Chronicles 24:27", text: "The sons of Merari by Jaaziah; Beno, and Shoham, and Zaccur, and Ibri." },
              ].map(v => (
                <div key={v.ref} className="flex gap-3">
                  <Star className="w-3 h-3 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] text-primary/70 tracking-wider uppercase">{v.ref}</p>
                    <p className="text-xs text-muted-foreground italic">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scripture wall */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCRIPTURES.map((v, i) => (
            <motion.div
              key={v.ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all"
            >
              <BookOpen className="w-4 h-4 text-primary mb-3" />
              <p className="font-display italic text-foreground/80 text-sm leading-relaxed mb-3">{v.text}</p>
              <cite className="text-primary/60 text-[10px] tracking-wider">— {v.ref}</cite>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/royal-priesthood')({
  component: RoyalPriesthoodPage,
=======
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Crown, BookOpen, Star } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const ANCESTRY = [
  { name: "King David", role: "Royal House of Judah", desc: "Shepherd, warrior, and sovereign king of Israel — a man after the Most High's own heart." },
  { name: "King Solomon", role: "Royal House of Judah", desc: "Builder of the First Temple, known for unparalleled wisdom and divine governance." },
  { name: "King Asa", role: "Royal House of Judah", desc: "King who walked in the ways of his ancestor David, pursuing righteousness and divine law." },
  { name: "Moses", role: "Levitical Priesthood", desc: "King, Priest, and Prophet — deliverer of the Law of the Most High from Mount Sinai." },
  { name: "High Priest Aaron", role: "Levitical Priesthood", desc: "First High Priest of Israel, ordained by the Most High to serve in the Tabernacle." },
];

const SCRIPTURES = [
  { ref: "1 Peter 2:9", text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light." },
  { ref: "Exodus 19:6", text: "And ye shall be unto me a kingdom of priests, and an holy nation." },
  { ref: "Deuteronomy 14:2", text: "For thou art an holy people unto Most High AHAYAH thy Power." },
  { ref: "Isaiah 29:22", text: "Thus saith Most High AHAYAH, who redeemed Abraham, concerning the house of Jacob, Jacob shall not now be ashamed, neither shall his face now wax pale." },
  { ref: "Song of Solomon 1:5", text: "I am black, but comely, O ye daughters of Jerusalem, as the tents of Kedar, as the curtains of Solomon." },
];

export default function RoyalPriesthoodPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Crown className="w-10 h-10 text-primary/60 mx-auto mb-4" />
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Our Heritage & Identity</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">The Royal Priesthood</h1>
          <p className="text-xs tracking-[0.2em] text-primary/60 uppercase mb-6">Royal House of Judah · Levitical Priesthood</p>
          <p className="font-display text-lg text-muted-foreground italic max-w-3xl mx-auto">
            We are the Aboriginal Descendants of the Royal House of Tribe of Judah (Yadah), Royal Priesthood of the Tribe of Levi (Lawaya), serving as a Sovereign Divine Law Non-Profit Trustee.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Heritage */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">Royal House of Judah</p>
            <div className="space-y-4">
              {ANCESTRY.map((a, i) => (
                <div key={a.name} className="flex gap-4 p-5 border border-border/30 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Crown className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-foreground">{a.name}</p>
                    <p className="text-[10px] tracking-[0.1em] text-primary/60 uppercase mb-1">{a.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">The Blanch Stone (Shoham)</p>
            <div className="border border-primary/20 bg-primary/5 p-8 mb-6">
              <p className="font-heading text-2xl text-primary mb-2">שֹׁהַם</p>
              <p className="font-heading text-sm text-foreground mb-4">Shaham/Shoham / Onyx / Sardonyx</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The word "Blanch" derives from the Hebrew "Shoham/Shaham a Levite" (שֹׁהַם), meaning "onyx" a Precious Jewel or "sardonyx" — the Fifth Foundation Stone of New Jerusalem (Yarawashalam). It symbolizes strength, protection, and divine connection.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { ref: "Genesis 2:12", text: '"And the gold of that land is good: there is bdellium and the onyx stone."' },
                { ref: "Exodus 28:9", text: '"And thou shalt take two onyx stones, and grave on them the names of the children of Israel."' },
                { ref: "Revelation 21:20", text: "The sardonyx — fifth foundation stone of New Jerusalem (Yarawashalam)." },
                { ref: "1 Chronicles 24:27", text: "The sons of Merari by Jaaziah; Beno, and Shoham, and Zaccur, and Ibri." },
              ].map(v => (
                <div key={v.ref} className="flex gap-3">
                  <Star className="w-3 h-3 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] text-primary/70 tracking-wider uppercase">{v.ref}</p>
                    <p className="text-xs text-muted-foreground italic">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scripture wall */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCRIPTURES.map((v, i) => (
            <motion.div
              key={v.ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="border border-border/30 bg-card p-6 hover:border-primary/20 transition-all"
            >
              <BookOpen className="w-4 h-4 text-primary mb-3" />
              <p className="font-display italic text-foreground/80 text-sm leading-relaxed mb-3">{v.text}</p>
              <cite className="text-primary/60 text-[10px] tracking-wider">— {v.ref}</cite>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/royal-priesthood')({
  component: RoyalPriesthoodPage,
>>>>>>> Stashed changes
});