import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { 
  ArrowLeft, Heart, BookOpen, Briefcase, Building2, Globe, Sparkles, 
  Send, Plus, ArrowUpRight, HelpCircle, CheckCircle2, Quote, 
  X, MessageSquare, Landmark, Shield, Scale, Info
} from "lucide-react";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

interface PillarData {
  id: string;
  pillarNum: string;
  title: string;
  tagline: string;
  intro: string;
  highlightTitle: string;
  highlightDesc: string;
  focusAreas: string[];
  investmentApproach: string;
  buttons: { label: string; actionKey: "explore" | "inquire" | "all" | "submit" | "shield" }[];
  scriptures: { text: string; ref: string }[];
  outcomes: string[];
  icon: React.ComponentType<any>;
  themeColor: {
    accent: string;
    border: string;
    bg: string;
    lightBg: string;
    badge: string;
  };
}

const PILLARS_DATA: PillarData[] = [
  {
    id: "health",
    pillarNum: "H.E.E.D. · Pillar I",
    title: "Health",
    tagline: "H.E.E.D. Program Pillar",
    intro: "The Blanch Group is pursuing investments in health ventures on strategic fronts. Promoting holistic wellness and healing through divine principles and community care. Holistic wellness and divine healing — restoring body, soul, and spirit through ancient principles and modern care. Our Health pillar encompasses physical, mental, and spiritual well-being, providing access to clean food systems, wellness programs, and community health initiatives rooted in Torah principles.",
    highlightTitle: "Wellness & Healing",
    highlightDesc: "Comprehensive health initiatives rooted in divine principles. We focus on holistic wellness that addresses body, mind, and spirit.",
    focusAreas: [
      "Innovative healthcare technology solutions",
      "Wellness and preventive care initiatives",
      "Medical research and development partnerships",
      "Global health access programs",
      "Non-GMO Food Systems",
      "Community Wellness Centers",
      "Holistic Healing Programs",
      "Clean Water Access",
      "Mental Health Support",
      "Mental Wellness Programs",
      "Healthcare Technology Innovation",
      "Community Health & Centers",
      "Nutrition & Diet Education",
      "Traditional Healing Integration",
      "Community Wellness Programs",
      "Medical Research Funding",
      "Health Insurance Solutions",
      "Telemedicine Platforms",
      "Sovereign Wellness Clinics",
      "Sacred Nutrition Initiative",
      "Mind & Spirit Restoration",
      "Maternal & Generational Care",
      "Global Health Access"
    ],
    investmentApproach: "We follow a decisive, streamlined investment model backed by a skilled team of global professionals proficient in identifying high-potential opportunities and transforming them into thriving enterprises. We strive to form long-term partnerships and invest across all business stages—with a focus on innovation and impactful development.",
    buttons: [
      { label: "Explore Health", actionKey: "explore" },
      { label: "Inquire About Health", actionKey: "inquire" },
      { label: "All Health Ventures", actionKey: "all" },
      { label: "Submit Health Venture", actionKey: "submit" },
      { label: "Ask S.H.I.E.L.D. AI", actionKey: "shield" }
    ],
    scriptures: [
      { text: "I am Most High AHAYAH that healeth thee.", ref: "Exodus 15:26" },
      { text: "Beloved, I wish above all things that thou mayest prosper and be in health.", ref: "3 John 1:2" },
      { text: "Fear AHAYAH, and depart from evil. It shall be health to thy navel, and marrow to thy bones.", ref: "Proverbs 3:7-8" },
      { text: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", ref: "3 John 1:2" }
    ],
    outcomes: [
      "Measurable reduction in chronic illness within member communities",
      "Sustainable food sovereignty and clean nutrition systems",
      "Restored mental and spiritual wholeness across generations",
      "Trained Levitical healers serving every Blanch district"
    ],
    icon: Heart,
    themeColor: {
      accent: "text-rose-400",
      border: "border-rose-500/20 hover:border-rose-500/40",
      bg: "from-rose-500/5 to-transparent",
      lightBg: "bg-rose-500/5",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/30"
    }
  },
  {
    id: "education",
    pillarNum: "H.E.E.D. · Pillar II",
    title: "Education",
    tagline: "H.E.E.D. Program Pillar",
    intro: "The Blanch Group knows the importance of broadly available educational opportunity.",
    highlightTitle: "Knowledge & Wisdom",
    highlightDesc: "Educational programs that integrate Torah/Biblical principles with modern knowledge. Building foundations for righteous living. The Blanch Group knows the importance of broadly available educational opportunity. We invest in platforms that democratize learning.",
    focusAreas: [
      "Digital learning platforms",
      "Vocational training programs",
      "Financial literacy initiatives",
      "Biblical and spiritual education resources",
      "B.I.T.R.O. Tech University",
      "Online Learning Platforms",
      "Scholarship Programs",
      "Professional Development",
      "Youth Empowerment",
      "Scripture-Based Curriculum",
      "Financial Literacy Training",
      "Technology & Innovation Labs",
      "Cultural Heritage Programs",
      "Financial Literacy",
      "Cultural Heritage Programs",
      "Royal Priesthood Academy",
      "S.H.I.E.L.D. AI Literacy",
      "Sacred Languages Program",
      "Trade & Mastery Guilds"
    ],
    investmentApproach: "We follow a decisive, streamlined investment model backed by a skilled team of global professionals proficient in identifying high-potential opportunities and transforming them into thriving enterprises. We strive to form long-term partnerships and invest across all business stages—with a focus on innovation and impactful development.",
    buttons: [
      { label: "Explore Education", actionKey: "explore" },
      { label: "Inquire About Education", actionKey: "inquire" },
      { label: "All Education Ventures", actionKey: "all" },
      { label: "Submit Education Venture", actionKey: "submit" },
      { label: "Ask S.H.I.E.L.D. AI", actionKey: "shield" }
    ],
    scriptures: [
      { text: "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.", ref: "Proverbs 4:7" },
      { text: "My people are destroyed for lack of knowledge.", ref: "Hosea 4:6" },
      { text: "Study to shew thyself approved unto AHAYAH.", ref: "2 Timothy 2:15" }
    ],
    outcomes: [
      "100% literacy in sacred and modern disciplines",
      "Generational poverty eradicated through skill and wisdom",
      "A scholar class restored within the Royal House",
      "AI-fluent youth grounded in divine ethics"
    ],
    icon: BookOpen,
    themeColor: {
      accent: "text-sky-400",
      border: "border-sky-500/20 hover:border-sky-500/40",
      bg: "from-sky-500/5 to-transparent",
      lightBg: "bg-sky-500/5",
      badge: "bg-sky-500/10 text-sky-400 border-sky-500/30"
    }
  },
  {
    id: "enterprising",
    pillarNum: "H.E.E.D. · Pillar III",
    title: "Enterprising",
    tagline: "H.E.E.D. Program Pillar",
    intro: "Righteous businesses and ventures that create sustainable prosperity for the Royal Priesthood and the nations. The Blanch Group believes the key to success in a variety of Businesses is the apple of the eye for value in a crowded market. Empowering entrepreneurs and businesses aligned with Divine Law. Creating sustainable economic opportunities for communities.",
    highlightTitle: "Empowering Entrepreneurs",
    highlightDesc: "Empowering entrepreneurs and businesses aligned with Divine Law. Creating sustainable economic opportunities for communities.",
    focusAreas: [
      "Small business incubation",
      "Technology startups support",
      "E-commerce platforms",
      "International trade facilitation",
      "Startup Incubation",
      "Business Consulting",
      "Market Expansion",
      "Strategic Partnerships",
      "Innovation Labs",
      "Business Analytics",
      "Growth Strategy",
      "Universal Business Network",
      "Blanch Onyx DLT Commerce",
      "Capital of the Tribes",
      "Heritage Crafts & Goods",
      "Business Incubator Programs",
      "Micro-Lending Initiatives",
      "Cooperative Development",
      "Global Trade Connections"
    ],
    investmentApproach: "We follow a decisive, streamlined investment model backed by a skilled team of global professionals proficient in identifying high-potential opportunities and transforming them into thriving enterprises. We strive to form long-term partnerships and invest across all business stages—with a focus on innovation and impactful development.",
    buttons: [
      { label: "Explore Enterprises", actionKey: "explore" },
      { label: "Inquire About Enterprises", actionKey: "inquire" },
      { label: "All Enterprises Ventures", actionKey: "all" },
      { label: "Submit Enterprises Venture", actionKey: "submit" },
      { label: "Ask S.H.I.E.L.D. AI", actionKey: "shield" }
    ],
    scriptures: [
      { text: "For it is he that giveth thee power to get wealth.", ref: "Deuteronomy 8:18" },
      { text: "He that gathereth by labour shall increase.", ref: "Proverbs 13:11" },
      { text: "Whatsoever thy hand findeth to do, do it with thy might.", ref: "Ecclesiastes 9:10" }
    ],
    outcomes: [
      "A self-sustaining sovereign economy",
      "Member enterprises operating across every continent",
      "Zero-fee, righteous trade settled on Blanch Onyx DLT",
      "Wealth circulating among the chosen generation"
    ],
    icon: Briefcase,
    themeColor: {
      accent: "text-amber-400",
      border: "border-amber-500/20 hover:border-amber-500/40",
      bg: "from-amber-500/5 to-transparent",
      lightBg: "bg-amber-500/5",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    }
  },
  {
    id: "development",
    pillarNum: "H.E.E.D. · Pillar IV",
    title: "Development",
    tagline: "H.E.E.D. Program Pillar",
    intro: "Sustainable growth, eco-sovereign smart cities, and infrastructure for the generations to come. The Blanch Group's acquisition of high-value Commercial and Residential real estate is a long priority for us. HEED Venture Program. The Blanch Group's acquisition of high-value Commercial and Residential real estate, both are a long priority for us.",
    highlightTitle: "HEED Venture Program",
    highlightDesc: "The Blanch Group's acquisition of high-value Commercial and Residential real estate, both are a long priority for us.",
    focusAreas: [
      "Smart city infrastructure",
      "Sustainable housing projects",
      "Commercial real estate development",
      "Green building initiatives",
      "Smart City Development",
      "Commercial Real Estate",
      "Residential Projects",
      "Infrastructure Investment",
      "Sustainable Buildings",
      "PropTech Innovation",
      "Global Development",
      "Blanch Corridor",
      "Throne Council Blanch Colonnade",
      "Onyx Energy Grid",
      "Sacred Land Stewardship"
    ],
    investmentApproach: "We follow a decisive, streamlined investment model backed by a skilled team of global professionals proficient in identifying high-potential opportunities and transforming them into thriving enterprises. We strive to form long-term partnerships and invest across all business stages—with a focus on innovation and impactful development.",
    buttons: [
      { label: "Explore Development", actionKey: "explore" },
      { label: "Inquire About Development", actionKey: "inquire" },
      { label: "All Development Ventures", actionKey: "all" },
      { label: "Submit Development Venture", actionKey: "submit" },
      { label: "Ask S.H.I.E.L.D. AI", actionKey: "shield" }
    ],
    scriptures: [
      { text: "And Most High AHAYAH took the man, and put him into the garden of Eden to dress it and to keep it.", ref: "Genesis 2:15" },
      { text: "Thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.", ref: "Isaiah 58:12" },
      { text: "Seek the peace of the city... for in the peace thereof shall ye have peace.", ref: "Jeremiah 29:7" }
    ],
    outcomes: [
      "Sovereign smart-city districts operational across the Corridor",
      "Clean, autonomous energy for member communities",
      "Regenerated ecosystems on ancestral lands",
      "Infrastructure ready for the New Jerusalem (Qadassh Yarawashalam)"
    ],
    icon: Building2,
    themeColor: {
      accent: "text-emerald-400",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "from-emerald-500/5 to-transparent",
      lightBg: "bg-emerald-500/5",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    }
  }
];

// Interactive mock data for exploration dialog
const MOCK_VENTURES: Record<string, { name: string; tag: string; metric: string; detail: string }[]> = {
  health: [
    { name: "Levitical Herbals & Nutrition", tag: "Wellness", metric: "98% satisfaction", detail: "Traditional preventative recipes crafted from certified organic gardens." },
    { name: "Torah Clean Waters Project", tag: "Infrastructure", metric: "14 target zones", detail: "Deep-well filtration providing pure mineralized water to primary districts." },
    { name: "Sovereign Health Tele-Connect", tag: "MedTech", metric: "24/7 care portal", detail: "A private, zero-surveillance network connecting certified health ministers with families." }
  ],
  education: [
    { name: "B.I.T.R.O. Tech University", tag: "Academic", metric: "500+ Scholars Enrolled", detail: "Curriculum offering blockchain cryptography alongside ancient languages and law." },
    { name: "Royal Priesthood Academy", tag: "K-12 Scripture", metric: "Fully Accredited", detail: "Guiding youth to understand Biblical covenants and advanced computer science." },
    { name: "S.H.I.E.L.D. AI Ethics Institute", tag: "Research", metric: "12 Published Frameworks", detail: "Ethical intelligence alignment with natural law and human sovereignty." }
  ],
  enterprising: [
    { name: "Blanch Onyx DLT Commerce Node", tag: "DLT Infrastructure", metric: "$45M Monthly Trade Volume", detail: "Decentralized business registry and escrow channels for member cooperatives." },
    { name: "Tribal Micro-Lend Guild", tag: "Financial Services", metric: "0% Interest Rates", detail: "Righteous interest-free business startup loans under the Sabbatical release law." },
    { name: "Heritage Guild Craftsmen", tag: "Handicrafts & Arts", metric: "85 active cooperatives", detail: "Preserving global textile and building trades while securing true economic returns." }
  ],
  development: [
    { name: "Smart City Yarawashalam (Phase 1)", tag: "Real Estate", metric: "64% Infrastructure Completed", detail: "Autonomous solar, graywater systems, and smart stone construction." },
    { name: "Onyx Micro-Energy Grid", tag: "Clean Energy", metric: "1.2 Megawatt peak capacity", detail: "Decentralized solar and electromagnetic kinetic generators for community districts." },
    { name: "Blanch Corridor Agriculture Belt", tag: "Land Development", metric: "2,200 acres secured", detail: "Torah-compliant land resting seasons (Shemitah), chemical-free soil transformation." }
  ]
};

// S.H.I.E.L.D. AI responses
const MOCK_SHIELD_ANSWERS: Record<string, { q: string; a: string }[]> = {
  health: [
    { q: "How are health ventures evaluated for alignment with divine law?", a: "Every health venture must respect the natural body as a temple. We strictly verify that all food ventures are 100% Non-GMO, clean according to Torah dietary principles, and that therapeutic clinics integrate holistic methods respecting the divine creation." },
    { q: "What is the timeline for the Levitical Healer Program?", a: "The first cohort of Levitical wellness instructors is active, training 12 district leads. Complete community coverage is projected by restoration year 15." }
  ],
  education: [
    { q: "What is the core mission of B.I.T.R.O. Tech University?", a: "B.I.T.R.O. Tech bridges high-technology skillsets (DLT architecture, cryptographic systems, ethical AI) with absolute truth—specifically Hebrew historical texts, natural law, and agricultural mastery." },
    { q: "Are scholarships available to children of verified member families?", a: "Yes. The Royal Priesthood Foundation funds 100% tuition coverage for youth from communities with an active H.E.E.D. development node." }
  ],
  enterprising: [
    { q: "How does the Blanch Onyx DLT ensure righteous trade?", a: "The ledger utilizes advanced cryptographic rules that ban interest-bearing (usury) smart contracts. Transaction fees are entirely recycled into tribal development grants, ensuring no capital extraction from the community." },
    { q: "How can I launch a venture under the S.H.I.E.L.D. incubation protocol?", a: "You can submit your business blueprint using our Submit Venture portal. The Elder Council reviews proposals for compliance with moral trade guidelines." }
  ],
  development: [
    { q: "What makes smart city districts 'eco-sovereign'?", a: "Our smart cities operate off-grid. They utilize independent solar micro-grids, local deep water wells, and sovereign communication infrastructure, protecting residents from external supply chain shocks." },
    { q: "How is land stewardship handled?", a: "All acquired land is cataloged under the irrevocable Blanch Group Trust. We reserve 30% of all acreage exclusively for reforestation and ancient ecological restoration." }
  ]
};

export default function HeedPage() {
  const [activeModal, setActiveModal] = useState<{
    type: "explore" | "inquire" | "all" | "submit" | "shield";
    pillarId: string;
  } | null>(null);

  // Form states
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [ventureName, setVentureName] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [ventureDesc, setVentureDesc] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Shield AI simulator
  const [shieldQuery, setShieldQuery] = useState("");
  const [shieldChat, setShieldChat] = useState<{ sender: "user" | "shield"; text: string }[]>([
    { sender: "shield", text: "Greetings. I am S.H.I.E.L.D. AI, aligned with community restoration and divine law. Select a question below or enter a custom query." }
  ]);

  const handleOpenModal = (type: "explore" | "inquire" | "all" | "submit" | "shield", pillarId: string) => {
    setActiveModal({ type, pillarId });
    setFormSubmitted(false);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMsg("");
    setVentureName("");
    setFundingAmount("");
    setVentureDesc("");
    setShieldQuery("");
    setShieldChat([
      { sender: "shield", text: `Welcome to the S.H.I.E.L.D. AI Core for ${pillarId.toUpperCase()}. Ask me anything about our strategic vision, righteous investments, or upcoming expected outcomes.` }
    ]);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleVentureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleShieldAsk = (customText?: string) => {
    const textToAsk = customText || shieldQuery;
    if (!textToAsk.trim()) return;

    const updatedChat = [...shieldChat, { sender: "user" as const, text: textToAsk }];
    setShieldChat(updatedChat);
    setShieldQuery("");

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = "Understood. Our council elders and technical stewards review all queries regarding this pillar to maintain righteous alignment. For additional details, please submit an Inquiry form directly.";
      
      if (activeModal) {
        const matchingAnswers = MOCK_SHIELD_ANSWERS[activeModal.pillarId];
        if (matchingAnswers) {
          const matched = matchingAnswers.find(item => 
            textToAsk.toLowerCase().includes(item.q.toLowerCase()) || 
            item.q.toLowerCase().includes(textToAsk.toLowerCase())
          );
          if (matched) {
            responseText = matched.a;
          }
        }
      }

      setShieldChat(prev => [...prev, { sender: "shield" as const, text: responseText }]);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">H.E.E.D. PROGRAM</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">The Framework</p>
          <h1 className="font-heading text-3xl md:text-6xl tracking-[0.15em] text-foreground mb-4">H.E.E.D.</h1>
          <p className="font-heading text-sm tracking-[0.3em] text-primary/60 mb-6">
            Health · Education · Enterprising · Development
          </p>
          <p className="font-display text-lg text-muted-foreground italic max-w-4xl mx-auto leading-relaxed">
            A framework designed to stabilize global communities through digital currencies, emerging ventures, and sustainable development — rooted in divine law and sovereign principles. A comprehensive framework for community transformation rooted in Divine Law. The HEED Program addresses the fundamental pillars of sustainable prosperity, guiding communities from poverty to abundance through righteous principles.
          </p>
          <div className="w-20 h-px bg-primary/40 mx-auto mt-6" />
        </motion.div>

        {/* Strategic Framework Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-border/40 bg-card/60 backdrop-blur-sm p-8 md:p-12 mb-20 relative overflow-hidden rounded-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-primary" />
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">Our Strategy</p>
            </div>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground tracking-wide mb-6">
              Our Strategic Framework
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 font-display italic">
              The H.E.E.D. Program operates as a comprehensive strategy designed to stabilize global communities. Positioned in key markets including tourism and consumer hubs, we aim for long-term worldwide expansion, placing technology, marketing, and capital into projects that deliver both financial return and measurable social impact.
            </p>

            {/* Pillar Badges */}
            <div className="flex flex-wrap gap-2.5 mb-10 pb-8 border-b border-border/20">
              {["Health", "Education", "Enterprising", "Development"].map((p, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "12", title: "Countries", desc: "Global Reach" },
                { value: "150+", title: "Impacted", desc: "Communities" },
                { value: "28", title: "Active", desc: "Projects" },
                { value: "$500M+", title: "Total", desc: "Investment" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="font-heading text-2xl md:text-3xl text-primary font-bold">{stat.value}</span>
                  <span className="text-[11px] font-heading text-foreground uppercase tracking-wide">{stat.title}</span>
                  <span className="text-[10px] text-muted-foreground/80">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PILLARS DETAILS SHOWCASE */}
        <div className="space-y-20 mb-24">
          {PILLARS_DATA.map((p, i) => {
            const IconComponent = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                id={`pillar-${p.id}`}
                className={`border ${p.themeColor.border} bg-card/40 hover:bg-card/70 transition-all duration-500 rounded-2xl p-6 md:p-10 relative overflow-hidden`}
              >
                {/* Decorative background glow */}
                <div className={`absolute -right-24 -top-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none`} />

                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/20 mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-primary font-bold">{p.pillarNum}</p>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${p.themeColor.lightBg}`}>
                        <IconComponent className={`w-6 h-6 ${p.themeColor.accent}`} />
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-wide text-foreground">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-foreground/70">{p.tagline}</p>
                  </div>
                </div>

                {/* Card Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column - Narratives and Focus */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                        {p.intro}
                      </p>
                    </div>

                    {/* Feature Highlight Block */}
                    <div className={`p-5 border ${p.themeColor.border} bg-background/50 rounded-xl space-y-2`}>
                      <h4 className="font-heading text-xs tracking-wider uppercase text-foreground font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {p.highlightTitle}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                        {p.highlightDesc}
                      </p>
                    </div>

                    {/* Key Focus Areas Grid */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-primary font-bold">
                        Key Focus Areas
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {p.focusAreas.map((area, index) => (
                          <div key={index} className="flex items-center gap-2.5 bg-background/30 px-3 py-1.5 rounded border border-border/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-xs text-muted-foreground font-sans line-clamp-1">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Investment Approach */}
                    <div className="space-y-2">
                      <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-primary font-bold">
                        Investment Approach
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-sans bg-background/20 p-4 border border-border/10 rounded-lg">
                        {p.investmentApproach}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Scriptures, Outcomes and Actions */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Scriptures Showcase */}
                    <div className="border border-border/20 bg-background/40 p-5 rounded-xl space-y-4">
                      <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-primary font-bold flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" />
                        Sacred Scriptures
                      </h4>
                      <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
                        {p.scriptures.map((scrip, index) => (
                          <div key={index} className="border-l-2 border-primary/40 pl-3 py-0.5 space-y-1">
                            <p className="font-display italic text-xs text-foreground/90 leading-relaxed">
                              "{scrip.text}"
                            </p>
                            <span className="text-[9px] tracking-wider text-muted-foreground/60 block font-mono">
                              — {scrip.ref}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expected Outcomes */}
                    <div className="border border-border/20 bg-background/40 p-5 rounded-xl space-y-3">
                      <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-primary font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        Expected Outcomes
                      </h4>
                      <div className="space-y-2.5">
                        {p.outcomes.map((out, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-xs text-primary font-mono select-none mt-0.5">✓</span>
                            <span className="text-xs text-muted-foreground leading-normal font-sans">{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Button Panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {p.buttons.map((btn, index) => {
                        const isShield = btn.actionKey === "shield";
                        const isSubmit = btn.actionKey === "submit";
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleOpenModal(btn.actionKey, p.id)}
                            className={`w-full text-left font-mono text-[10px] tracking-wider uppercase px-4 py-2.5 rounded border transition-all duration-300 flex items-center justify-between group
                              ${isShield 
                                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary-foreground/20"
                                : isSubmit
                                ? "bg-background text-foreground border-primary/40 hover:border-primary"
                                : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                              }`}
                          >
                            <span>{btn.label}</span>
                            {isShield ? (
                              <Sparkles className="w-3.5 h-3.5 group-hover:animate-pulse shrink-0 ml-1.5" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0 ml-1.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* POPUP MODAL DIALOGS - Pristine client-side interactivity */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg overflow-hidden border border-border/60 bg-card rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-border/30 flex items-center justify-between bg-background/50">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <p className="font-heading text-xs tracking-[0.20em] uppercase text-foreground">
                    {activeModal.type === "shield" && "S.H.I.E.L.D. AI Portal"}
                    {activeModal.type === "submit" && "Submit Venture Blueprint"}
                    {activeModal.type === "inquire" && "Program Inquiry"}
                    {activeModal.type === "explore" && "Core Ventures"}
                    {activeModal.type === "all" && "All Strategic Assets"}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-border/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-5 font-sans">
                {/* 1. S.H.I.E.L.D. AI Modal */}
                {activeModal.type === "shield" && (
                  <div className="space-y-4">
                    <div className="space-y-3 bg-background/60 border border-border/20 p-4 rounded-lg max-h-[240px] overflow-y-auto">
                      {shieldChat.map((chat, idx) => (
                        <div key={idx} className={`flex gap-2.5 items-start ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
                          {chat.sender === "shield" && (
                            <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          )}
                          <div className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%]
                            ${chat.sender === "user" 
                              ? "bg-primary text-primary-foreground ml-auto" 
                              : "bg-muted text-foreground"
                            }`}
                          >
                            {chat.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preconfigured prompt choices */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] tracking-wider uppercase text-muted-foreground font-mono">Suggested Questions:</p>
                      <div className="flex flex-col gap-1.5">
                        {MOCK_SHIELD_ANSWERS[activeModal.pillarId]?.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleShieldAsk(item.q)}
                            className="w-full text-left text-xs bg-background hover:bg-primary/10 border border-border/20 p-2 rounded transition-colors text-muted-foreground hover:text-foreground line-clamp-1"
                          >
                            {item.q}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="flex gap-2 border-t border-border/20 pt-3">
                      <input
                        type="text"
                        placeholder="Type standard custom query..."
                        value={shieldQuery}
                        onChange={(e) => setShieldQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleShieldAsk()}
                        className="flex-1 bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleShieldAsk()}
                        className="bg-primary text-primary-foreground px-3 py-2 rounded text-xs flex items-center gap-1 font-mono uppercase tracking-wider hover:bg-primary/90 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        Ask
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Submit Venture Modal */}
                {activeModal.type === "submit" && (
                  <div>
                    {formSubmitted ? (
                      <div className="text-center py-8 space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Venture Registered</h4>
                        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                          Thank you. Your proposal has been transmitted securely via S.H.I.E.L.D. protocol. Elder Council reviewers will inspect your model.
                        </p>
                        <button
                          onClick={() => setActiveModal(null)}
                          className="bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs px-4 py-2 rounded hover:bg-primary/90 transition-colors mt-4"
                        >
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleVentureSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Venture Name / Title</label>
                          <input
                            type="text"
                            required
                            value={ventureName}
                            onChange={(e) => setVentureName(e.target.value)}
                            placeholder="e.g. Levitical Agritech Node"
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Target Capital / Support Category</label>
                          <input
                            type="text"
                            required
                            value={fundingAmount}
                            onChange={(e) => setFundingAmount(e.target.value)}
                            placeholder="e.g. Technology Grant / $150K Funding"
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Moral Strategy & Brief Overview</label>
                          <textarea
                            required
                            rows={4}
                            value={ventureDesc}
                            onChange={(e) => setVentureDesc(e.target.value)}
                            placeholder="Describe alignment with Torah principles and sustainable community outcome..."
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs py-2.5 rounded hover:bg-primary/90 transition-colors mt-4 flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Transmit Blueprint
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* 3. Inquire Program Modal */}
                {activeModal.type === "inquire" && (
                  <div>
                    {formSubmitted ? (
                      <div className="text-center py-8 space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Inquiry Logged</h4>
                        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                          Your request was transmitted. A representative aligned with the {activeModal.pillarId.toUpperCase()} board will coordinate via your registered credentials.
                        </p>
                        <button
                          onClick={() => setActiveModal(null)}
                          className="bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs px-4 py-2 rounded hover:bg-primary/90 transition-colors mt-4"
                        >
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Your Name</label>
                          <input
                            type="text"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder="e.g. Elder Caleb"
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Digital Coordinates (Email)</label>
                          <input
                            type="email"
                            required
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            placeholder="e.g. caleb@tribe-coop.org"
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Inquiry message</label>
                          <textarea
                            required
                            rows={3}
                            value={inquiryMsg}
                            onChange={(e) => setInquiryMsg(e.target.value)}
                            placeholder={`How can you help or partner with our ${activeModal.pillarId} initiative?`}
                            className="w-full bg-background border border-border text-xs px-3 py-2 rounded focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs py-2.5 rounded hover:bg-primary/90 transition-colors mt-4"
                        >
                          Transmit Message
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* 4. Explore & All Ventures Modals */}
                {(activeModal.type === "explore" || activeModal.type === "all") && (
                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      Sovereign portfolio allocations supporting the transformation program of the Blanch Onyx Network.
                    </p>
                    <div className="space-y-3">
                      {MOCK_VENTURES[activeModal.pillarId]?.map((item, idx) => (
                        <div key={idx} className="bg-background border border-border/20 p-4 rounded-lg space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-heading text-xs font-bold text-foreground">{item.name}</h5>
                            <span className="text-[8px] font-mono uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{item.detail}</p>
                          <div className="pt-1.5 flex items-center gap-1.5">
                            <span className="text-[8px] font-mono text-primary/80 uppercase">Asset status:</span>
                            <span className="text-[9px] font-mono text-foreground font-bold">{item.metric}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border/30 bg-background/50 flex items-center justify-end gap-2 text-[10px] text-muted-foreground/60 font-mono">
                <span>Secure S.H.I.E.L.D. Session</span>
                <span>•</span>
                <span>Restoration Calendar Year 14</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute('/heed')({
  component: HeedPage,
});
