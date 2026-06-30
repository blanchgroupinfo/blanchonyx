import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown, Scroll, Star } from "lucide-react";
import PageShell from "@/components/PageShell";

const timeline = [
  {
    era: "Patriarch",
    figure: "Jacob (Israel)",
    note: "Father of the twelve tribes — blessing the scepter upon Judah (Genesis 49:10).",
  },
  {
    era: "Tribe",
    figure: "Judah (Yadah)",
    note: "The Lion's tribe, royal lineage of kings and the Messiah.",
  },
  {
    era: "Priesthood",
    figure: "Tribe of Levi (Lawaya)",
    note: "Set apart for sacred service — Aaron and Moses lead the divine order.",
  },
  {
    era: "Kingdom",
    figure: "King David",
    note: "Anointed shepherd-king, throne everlasting (2 Samuel 7:16).",
  },
  { era: "Wisdom", figure: "King Solomon", note: "Temple builder and emblem of divine wisdom." },
  { era: "Reform", figure: "King Asa", note: "Restorer of true worship in Judah." },
  {
    era: "Prophecy",
    figure: "Isaiah & the Prophets",
    note: "Foretelling the remnant, the Branch, and the gathering of the chosen generation.",
  },
  {
    era: "Diaspora",
    figure: "Scattering of Judah",
    note: "The royal seed dispersed among the nations, awaiting the regathering.",
  },
  {
    era: "Restoration",
    figure: "Blanch Family Lineage",
    note: "Sovereign Trustees of the Royal House, stewarding the Shoham (onyx) inheritance.",
  },
  {
    era: "Fulfillment",
    figure: "New Jerusalem (Yarawashalam)",
    note: "The sardonyx — fifth foundation stone — Revelation 21:20.",
  },
];

const HeritageJudah = () => {
  return (
    <PageShell
      eyebrow="Lineage of the Royal House"
      title={
        <>
          Royal House <br /><em>of Judah</em>
        </>
      }
      subtitle="A scripture-anchored heritage timeline of the Tribe of Judah, the Levitical Priesthood, and the Blanch family lineage."
    >
      <div className="max-w-4xl mx-auto">
        <div className="card-sacred rounded-2xl p-8 mb-12 text-center">
          <Scroll className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="font-display italic text-xl text-stone-900">
            "The sceptre shall not depart from Judah, nor a lawgiver from between his feet, until
            Shiloh come; and unto him shall the gathering of the people be."
          </p>
          <cite className="text-sm text-primary/80 mt-3 block">— Genesis 49:10</cite>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.figure}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative mb-10 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
            >
              <div
                className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
              >
                <div className="card-sacred rounded-xl p-6 inline-block text-left">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-secondary mb-2">
                    <Star className="w-3 h-3" /> {t.era}
                  </div>
                  <h3 className="font-display text-xl text-gradient-gold mb-2">{t.figure}</h3>
                  <p className="text-muted-foreground text-sm">{t.note}</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-gold" />
              <div />
            </motion.div>
          ))}
        </div>

        <div className="card-sacred rounded-2xl p-8 mt-12 text-center">
          <Crown className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="font-display italic text-xl text-stone-900">
            "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people."
          </p>
          <cite className="text-sm text-primary/80 mt-3 block">— 1 Peter 2:9</cite>
        </div>
      </div>
    </PageShell>
  );
};

export const Route = createFileRoute('/heritage-judah')({
  component: HeritageJudah,
});

export default HeritageJudah;
