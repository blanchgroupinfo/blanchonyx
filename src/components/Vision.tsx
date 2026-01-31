import { motion } from "framer-motion";
import { Building2, Users, Globe2, Sparkles } from "lucide-react";
const visionPoints = [{
  icon: Building2,
  title: "Smart Cities",
  description: "Developing eco-friendly Spiritual Family House Smart Cities as hubs for education, entertainment, finance, philanthropy, and business development."
}, {
  icon: Globe2,
  title: "Global Resource Economy",
  description: "Building a unified network through the Blanch Corridor—connecting Business, Finance, Clean Entertainment, and Philanthropy worldwide."
}, {
  icon: Users,
  title: "House of Prayer for All",
  description: "Fostering growth, compassion, and nourishment while enriching our community with shared blessings through faith, unity, and divine purpose."
}, {
  icon: Sparkles,
  title: "Kingdom of Peace",
  description: "Preparing for Holy Days, the Gospel, and the coming Kingdom of Peace—the Kingdom of Jerusalem through righteous enterprise."
}];
const Vision = () => {
  return <section className="py-24 md:py-32 relative section-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-20">
          <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium mb-4 block">
            Our Purpose
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold mb-6">
            Vision & Expansion
          </h2>
          <div className="sacred-divider w-32 mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-white">
            We are not competitors—we are bridge builders, encouraging collaboration, unity, 
            and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, 
            peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath.
          </p>
        </motion.div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visionPoints.map((point, index) => <motion.div key={point.title} initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="card-sacred rounded-xl p-8 group hover:border-primary/30 transition-all duration-500">
              <div className="flex gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                    <point.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Closing statement */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="mt-20 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl md:text-3xl text-foreground/90 italic leading-relaxed mb-4">
              "As Elders and descendants of a Royal Priesthood, we honor Sovereign Divine Law 
              above all worldly law, pursuing Peace / Shalawam / Shalam."
            </p>
            <div className="sacred-divider w-20 mx-auto" />
          </blockquote>
        </motion.div>
      </div>
    </section>;
};
export default Vision;