import { motion } from "framer-motion";
import { LucideIcon, BookOpen, Sparkles, Target } from "lucide-react";
import PageShell from "@/components/PageShell";

export interface Pillar {
  eyebrow: string;
  pillar: string;
  tagline: string;
  icon: LucideIcon;
  programs: { title: string; desc: string }[];
  scriptures: { ref: string; text: string }[];
  outcomes: string[];
}

const PillarPage = ({ data }: { data: Pillar }) => {
  const Icon = data.icon;
  return (
    <PageShell
      eyebrow={data.eyebrow}
      title={
        <>
          <span className="text-gradient-gold">{data.pillar}</span>
        </>
      }
      subtitle={data.tagline}
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="card-sacred rounded-2xl p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center glow-gold shrink-0">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <p className="text-white text-lg leading-relaxed">{data.tagline}</p>
        </div>

        {/* Programs */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-secondary" />
            <h2 className="font-display text-3xl text-foreground">Programs</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {data.programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-sacred rounded-xl p-6"
              >
                <h3 className="font-display text-xl text-primary mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Scriptures */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-secondary" />
            <h2 className="font-display text-3xl text-foreground">Sacred Scriptures</h2>
          </div>
          <div className="space-y-4">
            {data.scriptures.map((s) => (
              <div key={s.ref} className="card-sacred rounded-xl p-6">
                <p className="font-display italic text-lg text-white mb-2">"{s.text}"</p>
                <cite className="text-sm text-primary/80">— {s.ref}</cite>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-secondary" />
            <h2 className="font-display text-3xl text-foreground">Expected Outcomes</h2>
          </div>
          <div className="card-sacred rounded-2xl p-8">
            <ul className="space-y-3">
              {data.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default PillarPage;
