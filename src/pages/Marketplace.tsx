import { motion } from "framer-motion";
import { Store, Wheat, Gem, Hammer, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";

const collections = [
  { icon: Gem, name: "Sacred Stones & Jewelry", count: "Coming Soon" },
  { icon: Wheat, name: "Heritage Agriculture", count: "Coming Soon" },
  { icon: Hammer, name: "Craftsmanship & Trades", count: "Coming Soon" },
  { icon: Sparkles, name: "Anointing Oils & Incense", count: "Coming Soon" },
];

const Marketplace = () => {
  return (
    <PageShell
      eyebrow="Onyx Commerce"
      title={
        <>
          <span className="text-gradient-gold">Virtual Marketplace</span>
        </>
      }
      subtitle="A sovereign marketplace of righteous goods, sacred crafts, and member enterprises — settled on Blanch Onyx DLT."
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
        {collections.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-sacred rounded-2xl p-8 flex items-center gap-6 group hover:border-primary/40 transition-all"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center shrink-0">
              <c.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-1">{c.name}</h3>
              <p className="text-xs uppercase tracking-widest text-secondary">{c.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto card-sacred rounded-2xl p-8 text-center">
        <Store className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-display text-2xl text-gradient-gold mb-3">Vendor Applications Opening</h2>
        <p className="text-white">
          Member enterprises will soon be invited to list goods on the Onyx Marketplace, with zero-fee
          settlement through Blanch Onyx DLT. Apply for membership to be notified first.
        </p>
      </div>
    </PageShell>
  );
};

export default Marketplace;
