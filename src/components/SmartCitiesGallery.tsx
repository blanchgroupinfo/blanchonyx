import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const items = [
  {
    title: "Blanch Corridor",
    subtitle: "Sovereign Trade Spine",
    desc: "A righteous economic corridor linking sacred sites, sovereign zones, and member communities.",
    gradient: "from-primary/30 via-primary/10 to-transparent",
  },
  {
    title: "Smart City Yarawashalam",
    subtitle: "City of the Most High",
    desc: "Eco-sovereign smart city architecture grounded in Torah principles and divine governance.",
    gradient: "from-secondary/30 via-secondary/10 to-transparent",
  },
  {
    title: "H.E.E.D. Districts",
    subtitle: "Health · Education · Enterprise · Development",
    desc: "Mixed-use districts engineered to alleviate poverty and elevate the chosen generation.",
    gradient: "from-primary/30 via-secondary/10 to-transparent",
  },
  {
    title: "Onyx Energy Grid",
    subtitle: "Autonomous · Clean · Sovereign",
    desc: "Decentralized energy mesh powering S.H.I.E.L.D. AI and the Blanch Onyx DLT.",
    gradient: "from-secondary/30 via-primary/10 to-transparent",
  },
];

const SmartCitiesGallery = () => {
  return (
    <section id="smart-cities" className="py-24 md:py-32 relative section-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-sm uppercase tracking-[0.2em] text-secondary font-medium">
              Vision in Motion
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            <span className="text-gradient-gold">Smart Cities</span>
            <span className="text-foreground"> & the Blanch Corridor</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            A sovereign network of sacred, sustainable cities for the Royal Priesthood and global communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="card-sacred rounded-2xl overflow-hidden group hover:border-primary/40 transition-all"
            >
              <div className={`relative aspect-[16/9] bg-gradient-to-br ${it.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(43_74%_55%/0.25),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-secondary mb-2">
                  {it.subtitle}
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  {it.title}
                </h3>
                <p className="text-muted-foreground text-sm">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartCitiesGallery;
