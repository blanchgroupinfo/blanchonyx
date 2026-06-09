import { motion } from "framer-motion";
import {
  Crown,
  Users,
  Calendar,
  Handshake,
  Sparkles,
  Gem,
  Heart,
  Building2,
} from "lucide-react";

const membershipTiers = [
  {
    name: "Founder",
    icon: Crown,
    color: "text-gold-400",
    bg: "bg-gold-400/10 border-yellow-400/30",
  },
  {
    name: "Royal · Throne",
    icon: Crown,
    color: "text-amber-300",
    bg: "bg-amber-300/10 border-amber-300/30",
  },
  {
    name: "Elite",
    icon: Gem,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    name: "Partner",
    icon: Handshake,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
  },
  {
    name: "Executive",
    icon: Users,
    color: "text-yello-400",
    bg: "bg-yellow-400/10 border-green-400/30",
  },
  {
    name: "Associate",
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30",
  },
  {
    name: "Onyx · Council",
    icon: Gem,
    color: "text-slate-300",
    bg: "bg-slate-300/10 border-slate-300/30",
  },
  {
    name: "Sardonyx · Initiate",
    icon: Sparkles,
    color: "text-orange-300",
    bg: "bg-orange-300/10 border-orange-300/30",
  },
];

const features = [
  {
    icon: Users,
    title: "Exclusive Networking Events",
    description:
      "Curated gatherings for elite collaboration and strategic relationship building.",
  },
  {
    icon: Calendar,
    title: "Summits & Gatherings",
    description:
      "Annual summits, quarterly retreats, and intimate mastermind sessions.",
  },
  {
    icon: Sparkles,
    title: "Cultural Observances",
    description:
      "Themed events honoring Holy Days, Feasts, and divine appointments.",
  },
  {
    icon: Handshake,
    title: "Business Networking Access",
    description:
      "Direct access to the Blanch Corridor ecosystem and kingdom-aligned ventures.",
  },
  {
    icon: Gem,
    title: "Luxury Lifestyle Partnerships",
    description:
      "Preferred access to premium brands, travel, and bespoke experiences.",
  },
  {
    icon: Crown,
    title: '"Black Card" Access System',
    description:
      "Tiered membership privileges with the Blanch Onyx Black Card.",
  },
  {
    icon: Heart,
    title: "Philanthropy & Community Projects",
    description:
      "Direct involvement in humanitarian, educational, and emancipation initiatives.",
  },
  {
    icon: Building2,
    title: "Cultural & Social Elite Circle",
    description:
      "A private membership network for cultural leadership and divine stewardship.",
  },
];

const EliteNetwork = () => {
  return (
    <section
      className="py-24 md:py-32 relative section-pattern"
      id="elite-network"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium mb-4 block">
            Elite Membership
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold mb-6">
            Blanch Onyx Elite Network
          </h2>
          <h3 className="font-display text-2xl md:text-3xl text-primary/80 font-medium mb-6">
            Membership Society
          </h3>
          <div className="sacred-divider w-32 mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-white">
            Private membership network / cultural & social elite circle — where
            sovereign identity meets strategic influence.
          </p>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h4 className="font-display text-2xl md:text-3xl text-center text-foreground mb-10">
            Membership Tiers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`card-sacred rounded-xl p-6 text-center group hover:border-primary/30 transition-all duration-500 ${tier.bg} border`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                  <tier.icon className={`w-8 h-8 ${tier.color}`} />
                </div>
                <h5 className="font-display text-xl font-semibold text-foreground mb-2">
                  {tier.name}
                </h5>
                <p className="text-muted-foreground text-sm">
                  Exclusive tier privileges & access
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4 className="font-display text-2xl md:text-3xl text-center text-foreground mb-10">
            Society Privileges
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-sacred rounded-xl p-6 group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h5>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl md:text-3xl text-foreground/90 italic leading-relaxed mb-4">
              "A chosen generation, a royal priesthood, an holy nation, a
              peculiar people — called out of darkness into marvellous light."
            </p>
            <cite className="text-sm text-primary/70">— 1 Peter 2:9</cite>
            <div className="sacred-divider w-20 mx-auto mt-6" />
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default EliteNetwork;
