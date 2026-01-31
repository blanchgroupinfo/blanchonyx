import { motion } from "framer-motion";
import { Heart, GraduationCap, Briefcase, Sprout } from "lucide-react";
const pillars = [{
  icon: Heart,
  title: "Health",
  description: "Promoting holistic wellness and healing through divine principles and community care."
}, {
  icon: GraduationCap,
  title: "Education",
  description: "Advancing knowledge, wisdom, and understanding rooted in truth and spiritual enlightenment."
}, {
  icon: Briefcase,
  title: "Enterprising",
  description: "Building righteous businesses and ventures that create sustainable prosperity for all."
}, {
  icon: Sprout,
  title: "Development",
  description: "Fostering sustainable growth and eco-friendly smart cities for future generations."
}];
const HeedProgram = () => {
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
      }} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold mb-6">
            The H.E.E.D. Program
          </h2>
          <div className="sacred-divider w-32 mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-white">
            A framework designed to stabilize global communities through digital currencies, 
            emerging ventures, and sustainable development.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => <motion.div key={pillar.title} initial={{
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
        }}>
              <div className="card-sacred rounded-xl p-8 h-full group hover:border-primary/30 transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                    <pillar.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default HeedProgram;