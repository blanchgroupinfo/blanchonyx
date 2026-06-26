import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeDollarSign,
  Banknote,
  Building2,
  CheckCircle,
  Clock3,
  CreditCard,
  FileCheck2,
  Globe2,
  Landmark,
  LineChart,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Timer,
  WalletCards,
  Zap,
} from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const NETWORK_STATS = [
  { value: "500+", label: "Banks Connected", icon: Landmark },
  { value: "$500T", label: "Daily Transactions", icon: BadgeDollarSign },
  { value: "500M+", label: "Active Accounts", icon: WalletCards },
  { value: "2ms", label: "Avg Settlement Time", icon: Timer },
];

const HERO_BADGES = ["500+ Banks", "RTGS Security", "Zero Fees"];

const BANKING_SERVICES = [
  {
    icon: CreditCard,
    title: "Digital Banking",
    description: "Real-time account management and instant payments",
    points: ["Zero-fee transactions", "Instant settlements", "24/7 operations", "Multi-currency accounts"],
  },
  {
    icon: Globe2,
    title: "Cross-Border Banking",
    description: "International transfers and currency exchange",
    points: ["195+ countries", "150+ currencies", "Real-time conversion", "No hidden fees"],
  },
  {
    icon: LineChart,
    title: "Investment Banking",
    description: "Securities, derivatives, and asset management",
    points: ["T+0 settlement", "Smart contracts", "Automated clearing", "Real-time pricing"],
  },
  {
    icon: Building2,
    title: "Corporate Banking",
    description: "Treasury management and trade finance",
    points: ["Cash management", "Letter of credit", "Supply chain finance", "Escrow services"],
  },
];

const SECURITY_FEATURES = [
  {
    icon: ShieldCheck,
    title: "RTGS-Grade Security",
    description: "Bank-level security with deterministic finality and immutable audit trails",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "2ms transaction finality for real-time banking operations",
  },
  {
    icon: FileCheck2,
    title: "Regulatory Compliance",
    description: "Built-in AML/KYC with automated compliance reporting",
  },
  {
    icon: Network,
    title: "Global Infrastructure",
    description: "147K+ nodes providing worldwide coverage and redundancy",
  },
];

const USE_CASES = [
  {
    title: "Retail Banking",
    metric: "500M+ accounts",
    description: "Consumer banking with instant payments and zero fees",
    points: ["Mobile-first experience", "Real-time balance updates", "Instant P2P transfers"],
  },
  {
    title: "Commercial Banking",
    metric: "50K+ businesses",
    description: "Business accounts with advanced treasury features",
    points: ["Multi-user access", "Automated reconciliation", "API integration"],
  },
  {
    title: "Correspondent Banking",
    metric: "500+ institutions",
    description: "Inter-bank settlement and liquidity management",
    points: ["Instant nostro/vostro updates", "Reduced counterparty risk", "24/7 liquidity"],
  },
  {
    title: "Torah/Tarah Banking",
    metric: "100+ institutions",
    description: "Most High AHAYAH & YASHAYA-compliant banking solutions",
    points: ["Profit-sharing models", "Asset-backed financing", "No interest charge"],
  },
];

function MetricCard({ stat, index }: { stat: (typeof NETWORK_STATS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.06 }}
      className="border border-border/40 bg-card/70 p-5 card-lift"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-heading text-2xl text-primary">{stat.value}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-foreground/60">{stat.label}</p>
        </div>
        <stat.icon className="h-5 w-5 text-primary/70" />
      </div>
    </motion.div>
  );
}

function BankingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-foreground/40">BANKING SOLUTIONS</p>
            </div>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Banking Solutions</p>
            <h1 className="font-heading text-4xl tracking-[0.08em] text-foreground md:text-6xl">
              Next-Generation Sovereign Banking Infrastructure
            </h1>
            <p className="mt-5 max-w-2xl font-display text-lg italic leading-relaxed text-foreground">
              Real-time settlement, compliant digital banking, and institutional-grade payments on Blanch Onyx DLT.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {HERO_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-primary"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="relative overflow-hidden border border-primary/20 bg-card p-6"
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(197,165,90,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.8) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative">
              <div className="mb-8 flex items-center justify-between border-b border-border/30 pb-5">
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-[0.24em] text-primary">Blanch Onyx DLT</p>
                  <p className="mt-1 text-xs text-foreground/50">Institutional Banking Rail</p>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-[10px] uppercase tracking-[0.16em]">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Settlement Layer", "2ms finality"],
                  ["Compliance Rail", "AML/KYC enabled"],
                  ["Fee Model", "Zero transaction fees"],
                  ["Security Status", "RTGS-grade"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-6">
                    <span className="text-xs text-foreground/60">{label}</span>
                    <span className="font-heading text-sm text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-foreground/80">
                    Deterministic settlement and immutable audit trails support bank-grade reconciliation across retail,
                    corporate, investment, and correspondent banking workflows.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NETWORK_STATS.map((stat, index) => (
            <MetricCard key={stat.label} stat={stat} index={index} />
          ))}
        </section>

        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Banking Services</p>
            <h2 className="mt-3 font-heading text-2xl tracking-[0.1em] text-foreground md:text-3xl">
              Comprehensive Banking Solutions
            </h2>
            <p className="mt-3 text-sm text-foreground/60">Comprehensive banking solutions for the digital age</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {BANKING_SERVICES.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="border border-border/40 bg-card p-6 card-lift"
              >
                <service.icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-heading text-sm tracking-[0.08em] text-foreground">{service.title}</h3>
                <p className="mt-3 min-h-10 text-xs leading-relaxed text-foreground/60">{service.description}</p>
                <div className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-xs text-foreground/80">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SECURITY_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
              className="border border-border/30 bg-card/70 p-6 card-lift"
            >
              <feature.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="font-heading text-sm tracking-[0.08em] text-foreground">{feature.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-foreground/60">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Banking Use Cases</p>
            <h2 className="mt-3 font-heading text-2xl tracking-[0.1em] text-foreground md:text-3xl">
              Transforming Traditional Banking Operations
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {USE_CASES.map((useCase, index) => (
              <motion.article
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="border border-border/40 bg-card p-6 card-lift"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-lg tracking-[0.06em] text-foreground">{useCase.title}</h3>
                    <p className="mt-2 text-sm text-foreground/60">{useCase.description}</p>
                  </div>
                  <span className="shrink-0 border border-primary/25 bg-primary/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-primary">
                    {useCase.metric}
                  </span>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {useCase.points.map((point) => (
                    <div key={point} className="border border-border/25 bg-background/35 p-3 text-xs leading-relaxed text-foreground/85">
                      {point}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-20 border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
          <Sparkles className="mx-auto mb-4 h-7 w-7 text-primary" />
          <h2 className="font-heading text-2xl tracking-[0.1em] text-foreground">Deploy Banking on Blanch Onyx DLT</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65">
            Connect institutional banking, treasury, card, and cross-border payment operations to a zero-fee,
            real-time settlement network.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/banking-accounts"
              className="bg-primary px-7 py-3 font-heading text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open Banking Portal
            </Link>
            <Link
              to="/contact"
              className="border border-primary/35 px-7 py-3 font-heading text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
            >
              Contact Banking Team
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/banking")({
  component: BankingPage,
});
