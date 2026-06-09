import { motion } from "framer-motion";
import { Award, Newspaper, Globe } from "lucide-react";
import PageShell from "@/components/PageShell";

const recognitions = [
  { title: "Sovereign Trust Declaration", body: "Recognized as an Indigenous Tribal Association Sovereign Trust under divine law." },
  { title: "S.H.I.E.L.D. AI Ethics Charter", body: "Published framework for multi-sovereign intelligence governance." },
  { title: "Blanch Corridor Memoranda", body: "Cross-border memoranda of understanding with allied sovereign councils." },
  { title: "H.E.E.D. Program Endorsements", body: "Endorsed by elders and councils across multiple continents." },
];

const Press = () => {
  return (
    <PageShell
      eyebrow="Recognition"
      title={
        <>
          <span className="text-gradient-gold">Press</span> & Sovereign Declarations
        </>
      }
      subtitle="A record of declarations, recognitions, and affiliations of the Blanch Group Sovereign Trust."
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
        {recognitions.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-sacred rounded-2xl p-8"
          >
            <Award className="w-7 h-7 text-secondary mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm">{r.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="card-sacred rounded-2xl p-8">
          <Newspaper className="w-7 h-7 text-primary mb-4" />
          <h3 className="font-display text-xl text-foreground mb-2">Media Inquiries</h3>
          <p className="text-muted-foreground text-sm">
            For interviews, press kits, and sovereign correspondence, contact the Office of the Trustee
            through the Contact section of this site.
          </p>
        </div>
        <div className="card-sacred rounded-2xl p-8">
          <Globe className="w-7 h-7 text-primary mb-4" />
          <h3 className="font-display text-xl text-foreground mb-2">Affiliations</h3>
          <p className="text-muted-foreground text-sm">
            Allied with indigenous tribal councils, sovereign trusts, and faith-led economic bodies
            across the diaspora.
          </p>
        </div>
      </div>
    </PageShell>
  );
};

export default Press;
