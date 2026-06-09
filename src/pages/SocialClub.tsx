import { motion } from "framer-motion";
import { Users, Calendar, Wine, Music } from "lucide-react";
import PageShell from "@/components/PageShell";

const experiences = [
  { icon: Calendar, title: "Sacred Convenings", desc: "Private gatherings of the Royal Priesthood for worship, counsel, and feast." },
  { icon: Wine, title: "Onyx Lounges", desc: "Exclusive member lounges in sovereign cities across the Blanch Corridor." },
  { icon: Music, title: "Cultural Ceremonies", desc: "Heritage music, Levitical liturgy, and ancestral celebrations." },
  { icon: Users, title: "Council Dinners", desc: "Intimate dinners with Trustees, scholars, and sovereign leaders." },
];

const SocialClub = () => {
  return (
    <PageShell
      eyebrow="Private Membership"
      title={
        <>
          <span className="text-gradient-gold">Blanch Onyx</span> Social Club
        </>
      }
      subtitle="A private club for the Royal Priesthood — convened for elite collaboration, cultural leadership, and sacred community."
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
        {experiences.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-sacred rounded-2xl p-8"
          >
            <e.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">{e.title}</h3>
            <p className="text-muted-foreground text-sm">{e.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center card-sacred rounded-2xl p-10">
        <p className="font-display italic text-xl text-white mb-3">
          "Behold, how good and how pleasant it is for brethren to dwell together in unity!"
        </p>
        <cite className="text-sm text-primary/80">— Psalm 133:1</cite>
      </div>
    </PageShell>
  );
};

export default SocialClub;
