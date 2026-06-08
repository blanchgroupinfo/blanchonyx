import { motion } from "framer-motion";
import blanchLogo from "@/assets/blanch-logo.png";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-pattern">
      {/* Sacred background glow */}
      <div className="absolute inset-0 bg-gradient-sacred pointer-events-none" />
      
      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-primary/30" initial={{
        x: Math.random() * 100 + "%",
        y: "100%",
        opacity: 0
      }} animate={{
        y: "-10%",
        opacity: [0, 0.6, 0]
      }} transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "linear"
      }} />)}
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        ease: "easeOut"
      }} className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 1.2,
          ease: "easeOut"
        }} className="mb-8 glow-divine">
            <img alt="Blanch Group" className="w-32 h-32 md:w-40 md:h-40 object-contain border-0 border-transparent" src="/lovable-uploads/bde02114-cc84-400e-82bd-6888041a67ab.png" />
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6">
            <span className="text-gradient-gold text-yellow-400">Blanch Group</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="font-display text-xl md:text-2xl text-primary/80 italic mb-8">
            A Sovereign Trust
          </motion.p>

          {/* Divider */}
          <motion.div initial={{
          scaleX: 0
        }} animate={{
          scaleX: 1
        }} transition={{
          duration: 1,
          delay: 0.7
        }} className="sacred-divider w-40 md:w-64 mb-8" />

          {/* Description */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.9
        }} className="max-w-3xl text-lg md:text-xl leading-relaxed font-light mb-12 text-white">
           Blanch Onyx is a private membership network focused on elite collaboration, cultural leadership, strategic networking, and philanthropic development. Its managed by the Blanch Group A Sovereign Investment and Indigenous Tribal Association Trust—an irrevocable, 
            tax-exempt charitable entity focused on technology research, financial technology 
            solutions, and educational development aimed at alleviating poverty.
          </motion.p>

          {/* Scripture reference */}
          <motion.blockquote initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1.1
        }} className="max-w-2xl border-l-2 border-primary/50 pl-6 text-muted-foreground italic">
            <p className="text-lg mb-2 text-white">
              "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people..."
            </p>
            <cite className="text-sm text-primary/70">— 1 Peter 2:9</cite>
          </motion.blockquote>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;
