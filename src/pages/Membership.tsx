import { motion } from "framer-motion";
import { Crown, Gem, Sparkles, ShieldCheck, Check } from "lucide-react";
import PageShell from "@/components/PageShell";
import MembershipForm from "@/components/MembershipForm";

const tiers = [
  {
    name: "Sardonyx · Initiate",
    icon: Gem,
    price: "By Application",
    benefits: ["Access to public gatherings", "Scripture & study circles", "Blessings newsletter", "Onyx DLT wallet provisioning"],
  },
  {
    name: "Onyx · Council",
    icon: Sparkles,
    price: "By Council Review",
    featured: true,
    benefits: ["All Sardonyx benefits", "Private Council convenings", "Voting on H.E.E.D. initiatives", "S.H.I.E.L.D. AI member access", "Universal Business Network listing"],
  },
  {
    name: "Royal · Throne",
    icon: Crown,
    price: "By Sovereign Invitation",
    benefits: ["All Onyx benefits", "Throne-level governance seat", "Direct Trustee audience", "Sovereign capital placement", "Heritage Land stewardship rights"],
  },
];

const code = [
  "Honor the Most High AHAYAH in every act and word.",
  "Walk in truth, righteousness, and humility.",
  "Protect the chosen generation — especially mothers and children.",
  "Steward wealth, land, and knowledge for the Kingdom.",
  "Reject deceit, exploitation, and idolatry in all forms.",
  "Serve the H.E.E.D. mission and the Royal Priesthood with sacred intent.",
];

const Membership = () => {
  return (
    <PageShell
      eyebrow="Blanch Onyx"
      title={
        <>
          <span className="text-gradient-gold">Membership</span>
        </>
      }
      subtitle="A private Social Club for the Royal Priesthood — convened for cultural leadership, sovereign collaboration, and divine purpose."
    >
      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`card-sacred rounded-2xl p-8 relative ${t.featured ? "border-primary/60 glow-divine" : ""}`}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Council Tier
              </div>
            )}
            <t.icon className="w-9 h-9 text-primary mb-4" />
            <h3 className="font-display text-2xl text-gradient-gold mb-1">{t.name}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t.price}</p>
            <ul className="space-y-3">
              {t.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Code of Conduct */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="card-sacred rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-secondary" />
            <h2 className="font-display text-3xl text-foreground">Code of Conduct</h2>
          </div>
          <ul className="space-y-3">
            {code.map((c) => (
              <li key={c} className="flex items-start gap-3 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <MembershipForm />
      </div>
    </PageShell>
  );
};

export default Membership;
