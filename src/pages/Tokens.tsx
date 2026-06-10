import { motion } from "framer-motion";
import { Coins, Layers, Lock, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";

const tokens = [
  { symbol: "SARDX", name: "Sardonyx Token", purpose: "Initiate-tier governance and access rights" },
  { symbol: "ONYX", name: "Onyx Council Token", purpose: "Council voting and H.E.E.D. allocation" },
  { symbol: "JUDAH", name: "Royal Judah Token", purpose: "Heritage land stewardship and throne governance" },
  { symbol: "HEED", name: "H.E.E.D. Utility Token", purpose: "Pillar program funding and member rewards" },
  { symbol: "SHIELD", name: "S.H.I.E.L.D. AI Compute", purpose: "Sovereign AI compute and inference credits" },
  { symbol: "MERCY", name: "Mercy Charity Token", purpose: "Philanthropic distribution to the chosen generation" },
];

const features = [
  { icon: Layers, title: "DLT-Native", desc: "Issued and settled directly on Blanch Onyx DLT — zero gas." },
  { icon: Lock, title: "Sovereign Custody", desc: "Members hold keys; the Council holds the covenant." },
  { icon: TrendingUp, title: "Real-Asset Backed", desc: "Backed by sovereign land, enterprise revenue, and divine purpose." },
  { icon: ShieldCheck, title: "Compliance-Built", desc: "ID2X identity gating, regulatory ready across jurisdictions." },
];

const Tokens = () => (
  <PageShell
    eyebrow="Sovereign Token Economy"
    title={<><span className="text-gradient-gold">Tokens</span></>}
    subtitle="The token economy of the Royal Priesthood — governance, access, and stewardship anchored on Blanch Onyx DLT."
  >
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4 mb-16">
      {features.map((f) => (
        <div key={f.title} className="card-sacred rounded-xl p-6">
          <f.icon className="w-7 h-7 text-primary mb-3" />
          <h3 className="font-display text-lg text-foreground mb-2">{f.title}</h3>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5 mb-20">
      {tokens.map((t, i) => (
        <motion.div
          key={t.symbol}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="card-sacred rounded-2xl p-6 flex items-center gap-5"
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center shrink-0">
            <Coins className="w-7 h-7 text-primary" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-secondary">{t.symbol}</div>
            <h3 className="font-display text-xl text-foreground">{t.name}</h3>
            <p className="text-sm text-muted-foreground">{t.purpose}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="max-w-3xl mx-auto text-center card-sacred rounded-2xl p-10">
      <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
      <p className="font-display italic text-lg text-white mb-2">
        "The silver is mine, and the gold is mine, saith the LORD of hosts."
      </p>
      <cite className="text-sm text-primary/80">— Haggai 2:8</cite>
    </div>
  </PageShell>
);

export default Tokens;
