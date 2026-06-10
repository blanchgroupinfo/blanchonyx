import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, Zap, Globe, Brain, ShieldCheck } from "lucide-react";

const MODELS = [
  { code: "A2X", name: "Account", desc: "Account to Everything" },
  { code: "AD2X", name: "Administration", desc: "Administration to Everything" },
  { code: "AG2X", name: "Agent", desc: "Agent to Everything" },
  { code: "AI2X", name: "Artificial Intelligence", desc: "AI to Everything" },
  { code: "Apps2X", name: "Apps", desc: "Apps to Everything" },
  { code: "AV2X", name: "Avatar", desc: "Avatar to Everything" },
  { code: "B2X", name: "Business", desc: "Business to Everything" },
  { code: "C2X", name: "Consumer", desc: "Consumer to Everything" },
  { code: "D2X", name: "Direct", desc: "Direct to Everything" },
  { code: "DAO2X", name: "DAO / Collective", desc: "DAO to Everything" },
  { code: "DEV2X", name: "Developer", desc: "Developer to Everything" },
  { code: "E2X", name: "Employee", desc: "Employee to Everything" },
  { code: "G2X", name: "Government", desc: "Government to Everything" },
  { code: "I2X", name: "Institution", desc: "Institution to Everything" },
  { code: "ID2X", name: "Identity", desc: "Identity to Everything" },
  { code: "LAW2X", name: "Legal / Compliance Engine", desc: "Legal/Compliance to Everything" },
  { code: "M2X", name: "Machine", desc: "Machine to Everything" },
  { code: "MF2X", name: "Manufacturer", desc: "Manufacturer to Everything" },
  { code: "N2X", name: "Many", desc: "Many to Everything" },
  { code: "P2X", name: "Prosumer", desc: "Prosumer to Everything" },
];

const framework = [
  { icon: Zap, title: "Instant Settlement", desc: "Sub-second transaction finality across all X2X models via distributed ledger technology." },
  { icon: Globe, title: "Cross-Border Native", desc: "Every model supports multi-currency, multi-jurisdiction commerce with built-in compliance." },
  { icon: Brain, title: "AI-Orchestrated", desc: "S.H.I.E.L.D. AI optimizes routing, pricing, and risk assessment for every transaction." },
  { icon: ShieldCheck, title: "Identity-Verified", desc: "All transactions flow through the ID2X identity layer ensuring trust and regulatory compliance." },
];

const stats = [
  { value: "∞", label: "Annual Volume" },
  { value: "99.9%", label: "Success Rate" },
  { value: "0%", label: "Transaction Fees" },
  { value: "Instant", label: "Settlement" },
  { value: "150+", label: "Currencies" },
];

const UniversalCommerce = () => {
  const [query, setQuery] = useState("");
  const [openCode, setOpenCode] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MODELS;
    return MODELS.filter(
      (m) =>
        m.code.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="universal-commerce" className="py-24 md:py-32 relative section-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-sacred pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-secondary font-medium">
            Universal Commerce Models
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-4">
            <span className="text-gradient-gold">X2X Transaction Framework</span>
          </h2>
          <p className="text-white text-lg">
            Every entity connects to every other entity. 20 primary models × 19 target connections ={" "}
            <span className="text-primary font-semibold">380 unique commerce pathways</span> powering the future of
            global transactions.
          </p>
          <div className="sacred-divider w-32 mx-auto mt-6" />
        </motion.div>

        {/* 20 Primary Models grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="font-display text-2xl text-center text-foreground mb-2">
            20 Primary <span className="text-gradient-gold">X2X Models</span>
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Each model connects to all 19 other entity types, creating a fully interconnected commerce mesh.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {MODELS.map((m, i) => (
              <motion.div
                key={m.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="card-sacred rounded-xl p-4 text-center hover:border-primary/60 transition-colors"
              >
                <div className="font-display text-lg text-primary font-semibold">{m.code}</div>
                <div className="text-xs text-foreground mt-1">{m.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {m.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Framework features */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="font-display text-2xl text-center text-foreground mb-2">
            X2X <span className="text-gradient-gold">Transaction Framework</span>
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-8">
            The infrastructure powering every commerce model with speed, compliance, and intelligence.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {framework.map((f) => (
              <div key={f.title} className="card-sacred rounded-xl p-6">
                <f.icon className="w-7 h-7 text-primary mb-3" />
                <h4 className="font-display text-lg text-foreground mb-2">{f.title}</h4>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto mb-20 grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="card-sacred rounded-xl p-5 text-center">
              <div className="font-display text-3xl text-gradient-gold">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 380+ pathways explorer */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="font-display text-2xl text-center text-foreground mb-2">
            <span className="text-gradient-gold">380+ Commerce Pathways</span>
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Search or expand each primary model to explore all its target connections.
          </p>
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models (e.g. B2X, Identity, Government)…"
              className="w-full bg-background/60 border border-border/60 rounded-lg pl-9 pr-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-2">
            {filtered.map((m) => {
              const open = openCode === m.code;
              const targets = MODELS.filter((t) => t.code !== m.code);
              return (
                <div key={m.code} className="card-sacred rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenCode(open ? null : m.code)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-primary/5"
                  >
                    <span className="text-sm text-foreground">
                      <span className="text-primary font-semibold">{m.code}</span> — {m.name} to …
                      <span className="text-muted-foreground ml-2">({targets.length} pathways)</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {targets.map((t) => (
                        <div
                          key={t.code}
                          className="text-xs px-3 py-2 rounded border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        >
                          <span className="text-primary">{m.code}</span> → <span>{t.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Commerce Mesh */}
        <div className="max-w-4xl mx-auto text-center card-sacred rounded-2xl p-10">
          <h3 className="font-display text-3xl text-gradient-gold mb-3">The Commerce Mesh</h3>
          <p className="text-white mb-8">
            Every primary model creates 19 unique pathways. With 20 models, the Universal Commerce framework
            generates 380+ distinct transaction types — the most comprehensive commerce protocol ever designed.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <div className="font-display text-4xl text-gradient-gold">20</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Primary Models</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gradient-gold">19</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Target Connections</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gradient-gold">380+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Commerce Models</div>
            </div>
          </div>
          <p className="font-display italic text-lg text-white">
            "Seest thou a man diligent in his business? he shall stand before kings."
          </p>
          <cite className="text-sm text-primary/80">— Proverbs 22:29</cite>
        </div>
      </div>
    </section>
  );
};

export default UniversalCommerce;
