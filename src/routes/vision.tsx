import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  Shield,
  Building,
  Users,
  Tv,
  UtensilsCrossed,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Compass,
  Cpu,
  Car,
  Tv2,
  BookOpen,
  Send,
  CheckCircle2,
  Gem,
  Building2,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import SmartCitySlideshow from "@/components/SmartCitySlideshow";
import { Button } from "../components/ui/button";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center justify-center gap-2">
      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
      {children}
    </p>
  );
}

const visions = [
  [
    "Sovereign Trade Spine",
    "Blanch Corridor",
    "A righteous economic corridor Smart City linking sacred sites, sovereign zones, and member communities. Why it matters — economic spines determine who governs trade; this one is anchored in covenant.",
  ],
  [
    "Blanch the Onyx/Shaham Foundation Fifth Stone, the Blanch Colonnade the Throne City of the Most High AHAYAH.",
    "Throne Center of the City of the Future",
    "Eco-sovereign Richat 8-Ring architecture grounded in Tarah/Torah principles and divine, Digital Museum. Preparing for Holy Days, Sabbaths, Feasts, and the New Jerusalem (Qadash Yarawashalam) Why it matters — a Throne City is a living blueprint for civilization aligned to Divine Law.",
  ],
  [
    "Health · Education · Enterprise · Development",
    "H.E.E.D. Districts",
    "Mixed-use districts engineered to alleviate poverty and elevate the chosen generation. Why it matters — poverty is engineered; so is its reversal — these districts encode the cure.",
  ],
  [
    "Autonomous · Clean · Sovereign",
    "Onyx Energy Grid",
    "A decentralized energy mesh powering S.H.I.E.L.D. AI and Blanch Onyx DLT. Why it matters — true sovereignty requires owning your own light, power, and data.",
  ],
];

interface ColonnadeFeature {
  icon: any;
  title: string;
  desc: string;
}

const colonnadeFeatures: ColonnadeFeature[] = [
  {
    icon: Shield,
    title: "S.H.I.E.L.D. AI-Powered Innovation",
    desc: "Home to the S.H.I.E.L.D. AI ecosystem, providing advanced research facilities, collaborative intelligence networks, and next-generation AI development environments.",
  },
  {
    icon: Building2,
    title: "Global Business Headquarters",
    desc: "Designed for startups, enterprises, venture capital firms, blockchain innovators, and technology leaders seeking a strategic global presence.",
  },
  {
    icon: Users,
    title: "Elite Networking & Private Access",
    desc: "Connect with founders, investors, executives, creators, and innovators through exclusive events, private gatherings, leadership summits, and invitation-only experiences.",
  },
  {
    icon: Tv,
    title: "Convention & Event Destination",
    desc: "Host world-class conferences, technology expos, blockchain conventions, AI showcases, and cultural events in a next-generation digital arena.",
  },
  {
    icon: UtensilsCrossed,
    title: "Luxury Lifestyle & Experiences",
    desc: "Experience fine dining, rooftop clubs, executive lounges, luxury retail, and premium hospitality designed for global leaders and distinguished guests.",
  },
];

interface FloorSection {
  floors: string;
  title: string;
  size: string;
  icon: any;
  items: string[];
}

const floorSections: FloorSection[] = [
  {
    floors: "Floors 1-20",
    title: "Luxury Retail & Commercial District",
    size: "1,500,000 sq ft",
    icon: Gem,
    items: [
      "Luxury Boutiques & Flagship Retailers",
      "Crypto Banking Lounges & Vaults",
      "Premium Restaurants & Hospitality Suites",
    ],
  },
  {
    floors: "Floors 21-40",
    title: "Startup & Enterprise Innovation Center",
    size: "1,200,000 sq ft",
    icon: Building,
    items: [
      "Startup Accelerators & Scale-up Hubs",
      "Venture Capital & Private Equity Offices",
      "Blockchain & Fintech Enterprises",
    ],
  },
  {
    floors: "Floors 41-60",
    title: "Crypto Incubators & Innovation Labs",
    size: "1,000,000 sq ft",
    icon: Cpu,
    items: [
      "Web3 R&D Laboratories",
      "Smart Contract Auditing Units",
      "Tokenization Development Suites",
      "Digital Asset Research Centers",
    ],
  },
  {
    floors: "Floors 61-80",
    title: "S.H.I.E.L.D. AI Headquarters",
    size: "1,400,000 sq ft",
    icon: Shield,
    items: [
      "AI Deep Learning & Research Labs",
      "Agentic AI Development Chambers",
      "Sovereign AI Operations Centers",
      "Neural Computing Facilities",
    ],
  },
  {
    floors: "Floors 81-95",
    title: "Global Convention & Digital Arena",
    size: "750,000 sq ft",
    icon: Tv2,
    items: [
      "30,000+ Attendee Capacity Arena",
      "AI & DLT Conventions Stage",
      "Immersive Digital Product Launches",
      "Next-gen Esports Championships Arena",
    ],
  },
  {
    floors: "Floors 96-110",
    title: "Executive Offices & Corporate Suites",
    size: "850,000 sq ft",
    icon: Building2,
    items: [
      "Fortune 500 Global Headquarters",
      "Family Offices & Private Trusts",
      "Strategic Sovereign Partner Suites",
    ],
  },
  {
    floors: "Floors 111-118",
    title: "Blanch Onyx Private Club",
    size: "400,000 sq ft",
    icon: Sparkles,
    items: [
      "Sovereign Member-only Private Dining",
      "Exclusive Executive Lounges & Boardrooms",
      "Scenic Sky Gardens & Recreation Decks",
      "Elite Angel & Founder Networking Suites",
    ],
  },
  {
    floors: "Floors 119-120",
    title: "Sovereign Observation Deck",
    size: "100,000 sq ft",
    icon: Compass,
    items: [
      "Panoramic 360° Smart City Views",
      "High-Altitude Observatory & Telescope Array",
      "VIP Private Event Venue",
    ],
  },
  {
    floors: "Special District",
    title: "Blanch Automotive District",
    size: "500,000 sq ft",
    icon: Car,
    items: [
      "Luxury Hypercar Gallery",
      "Electric Vehicle (EV) Innovation Center",
      "Autonomous Mobility Showcase",
      "VIP Delivery & Handover Suites",
    ],
  },
  {
    floors: "Civic Wing",
    title: "Digital Futuristic Museum",
    size: "250,000 sq ft",
    icon: BookOpen,
    items: [
      "S.H.I.E.L.D. AI Chronicles & History",
      "Distributed Ledger Technology (DLT) Evolution",
      "Interactive Holographic Exhibits",
      "Divine Law & Scriptural Heritage Library",
    ],
  },
];

function VisionPage() {
  const [activeFloorIdx, setActiveFloorIdx] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 8000);
  };

  return (
    <main className="overflow-hidden bg-background min-h-screen text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section id="vision" className="vision-section section-block">
        <div className="section-shell">
          <div className="vision-heading">
            <Eyebrow>Vision in Motion</Eyebrow>
            <h2>Smart City &<br/><em>the Blanch Corridor</em></h2>
            <p>A sovereign network of sacred, sustainable cities for the Royal Priesthood and global communities.</p>
          </div>
          <div className="vision-grid">
            {visions.map(([label, title, text], i) => (
              <article key={title} className="card-lift">
                <span>0{i + 1}</span>
                <p className="mini-label">{label}</p>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowDownRight />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Slideshow Section */}
      <section className="py-16 bg-muted/10 border-b border-primary/10">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">Visual Proof of Concept</span>
            <h2 className="font-heading text-3xl md:text-5xl text-black dark:text-white tracking-wide mt-2">Smart City Renderings</h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
          </div>

          {/* Rendering the Slideshow */}
          <SmartCitySlideshow />

          {/* Architectural / Vision Philosophy Commentary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 bg-card/40 dark:bg-card/10 p-8 rounded-2xl border border-primary/10 dark:border-primary/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Compass className="w-5 h-5" />
                <h4 className="font-heading tracking-wider uppercase text-sm text-black dark:text-white">Metropolitan Vision Vibe</h4>
              </div>
              <p className="text-neutral-700 dark:text-muted-foreground text-xs md:text-sm leading-relaxed">
                Feels like a fusion of <strong className="text-black dark:text-white font-medium">Dubai Future City</strong>, <strong className="text-black dark:text-white font-medium">Silicon Valley innovation campus</strong>, and <strong className="text-black dark:text-white font-medium">Neo-Tokyo futurism</strong> integrated with <strong className="text-black dark:text-white font-medium">Circular sovereign city planning</strong>.
              </p>
              <p className="text-neutral-700 dark:text-muted-foreground text-xs md:text-sm leading-relaxed">
                The concentric rings create a sense of hierarchy, order, and protection, while the skyline in the background gives the impression that the circular district is the central "brain" of a much larger metropolis. The blue illumination communicates AI, technology, trust, and advanced infrastructure.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-heading tracking-wider uppercase text-sm text-black dark:text-white">Ceremonial Plaza Concept</h4>
              </div>
              <p className="text-neutral-700 dark:text-muted-foreground text-xs md:text-sm leading-relaxed">
                Feels like the ceremonial heart of the city—similar to a fusion of a <strong className="text-black dark:text-white font-medium">World's Fair</strong>, <strong className="text-black dark:text-white font-medium">CES/Expo</strong>, and a <strong className="text-white dark:text-white font-medium">DLT summit</strong> inside a futuristic cultural center.
              </p>
              <p className="text-neutral-700 dark:text-muted-foreground text-xs md:text-sm leading-relaxed">
                The rings suggest unity, interconnected systems, DLT business networks, and knowledge exchange. This acts as the <strong className="text-black dark:text-white font-medium">"Blanch Colonnade Grand Plaza"</strong> where major launches, summits, conventions, and community celebrations occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blanch Colonnade Presentation */}
      <section className="py-20 relative border-b border-primary/10">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-heading text-primary uppercase">The Crown Jewel Tower</span>
              <h2 className="font-heading text-3xl md:text-5xl text-black dark:text-white tracking-tight">
                Secure Your Place <br />
                <em className="text-primary not-italic">in History</em>
              </h2>
              <div className="w-16 h-0.5 bg-primary" />
              <p className="text-black dark:text-white text-base md:text-lg font-display leading-relaxed">
                Welcome to Blanch Corridor and Center Headquarters Commerce, Court, Digital Futuristic Museum: the{" "}
                <span className="text-primary font-medium">Blanch Colonnade</span>.
              </p>
              <p className="text-neutral-700 dark:text-muted-foreground text-sm leading-relaxed">
                The flagship destination within the Blanch Corridor Smart City—a world-class innovation ecosystem
                designed for the next generation of leaders, entrepreneurs, and technology pioneers.
              </p>
              <div className="border-l-2 border-primary/30 pl-4 py-2 italic text-neutral-700 dark:text-muted-foreground text-sm">
                "Blanch Colonnade is more than a tower. It is a living ecosystem where artificial intelligence, digital
                assets, advanced technology, luxury experiences, and global networking converge under one visionary
                destination."
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-heading text-xl text-black dark:text-white tracking-widest uppercase mb-6">Why Blanch Colonnade?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colonnadeFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="p-6 rounded-xl border border-primary/15 dark:border-primary/5 bg-card/40 dark:bg-card/10 hover:border-primary/30 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading text-black dark:text-white text-sm tracking-wide mb-2">{feat.title}</h4>
                      <p className="text-neutral-700 dark:text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architectural Breakdown */}
      <section className="py-20 bg-muted/5 relative border-b border-primary/10">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">Architectural Blueprint</span>
            <h2 className="font-heading text-3xl md:text-5xl text-black dark:text-white tracking-wide mt-2">
              Blanch Colonnade Tower
            </h2>
            <p className="text-neutral-700 dark:text-muted-foreground text-sm mt-3">
              A meticulously designed 120-story AAA-grade commercial mega-project, totaling 8,500,000 sq ft.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-xs font-mono text-neutral-700 dark:text-muted-foreground">
              <div className="flex items-center gap-1.5 border border-primary/10 bg-primary/5 px-3 py-1.5 rounded-full text-primary">
                <span className="text-black dark:text-white font-medium">Height:</span> 2,000+ ft
              </div>
              <div className="flex items-center gap-1.5 border border-primary/10 bg-primary/5 px-3 py-1.5 rounded-full text-primary">
                <span className="text-black dark:text-white font-medium">Floors:</span> 120
              </div>
              <div className="flex items-center gap-1.5 border border-primary/10 bg-primary/5 px-3 py-1.5 rounded-full text-primary">
                <span className="text-black dark:text-white font-medium">Space:</span> 8.5M sq ft
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Tower Stack Visualization */}
            <div className="lg:col-span-5 bg-card/40 dark:bg-card/10 p-6 rounded-2xl border border-primary/15 dark:border-primary/10 flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-sm text-primary tracking-widest uppercase mb-4">Tower Stack</h4>
                <div className="space-y-1.5 flex flex-col-reverse">
                  {floorSections.map((sec, idx) => {
                    const isActive = activeFloorIdx === idx;
                    return (
                      <button
                        key={sec.title}
                        onClick={() => setActiveFloorIdx(idx)}
                        className={`w-full text-left p-3 rounded transition-all duration-200 flex items-center justify-between border ${
                          isActive
                            ? "bg-primary border-primary text-background shadow-lg shadow-primary/20 scale-[1.02]"
                            : "border-primary/10 bg-transparent dark:bg-transparent text-black dark:text-gray-400 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <sec.icon className={`w-4 h-4 ${isActive ? "text-background" : "text-primary"}`} />
                          <span className="text-xs font-mono font-bold">{sec.floors}</span>
                        </div>
                        <span className="text-[10px] truncate max-w-[200px] text-right font-heading uppercase tracking-wider">
                          {sec.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-primary/10 text-center">
                <p className="text-[10px] font-mono text-neutral-600 dark:text-muted-foreground">
                  Click on any floor tier of the 120-story blueprint to explore specifications and core features.
                </p>
              </div>
            </div>

            {/* Active Floor Description Pane */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-primary/15 dark:border-primary/10 bg-card/40 dark:bg-card/10 backdrop-blur-md relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFloorIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-primary/10">
                    <div>
                      <span className="text-xs font-mono text-primary uppercase font-bold tracking-widest">
                        {floorSections[activeFloorIdx].floors}
                      </span>
                      <h3 className="font-heading text-2xl md:text-3xl text-black dark:text-white tracking-wide mt-1">
                        {floorSections[activeFloorIdx].title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-neutral-500 dark:text-muted-foreground">Total Space Alloc.</span>
                      <p className="font-heading text-lg text-primary mt-0.5">{floorSections[activeFloorIdx].size}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-heading text-xs text-black dark:text-white uppercase tracking-wider">Core Specifications & Features:</h4>
                    <ul className="space-y-3">
                      {floorSections[activeFloorIdx].items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aesthetic note */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mt-6">
                    <p className="text-xs text-primary/90 dark:text-primary/80 leading-relaxed italic">
                      This division forms a critical module of the Blanch Corridor infrastructure, fully integrated with smart DLT nodes and automated S.H.I.E.L.D. AI optimization networks.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-primary/10 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    setActiveFloorIdx((prev) => (prev - 1 + floorSections.length) % floorSections.length)
                  }
                  className="border-primary/30 text-primary hover:bg-primary/10 font-mono text-xs"
                >
                  PREVIOUS TIER
                </Button>
                <Button
                  onClick={() => setActiveFloorIdx((prev) => (prev + 1) % floorSections.length)}
                  className="bg-primary text-background hover:bg-primary/90 font-mono text-xs font-bold"
                >
                  NEXT TIER
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        {/* Subtle background effects */}
        <div className="absolute inset-0 bg-radial-at-c from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="section-shell relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <span className="text-xs font-mono text-primary/80 tracking-[0.3em] uppercase">The Heart of Global Innovation</span>
          <h2 className="font-heading text-3xl md:text-6xl text-white tracking-wide">
            Where visionaries, builders, investors, creators, and pioneers unite to shape the future of technology, intelligence, and human collaboration.
          </h2>
          <div className="w-20 h-px bg-primary/40 mx-auto" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Join the Movement. Get Exclusive Updates & Early Access to the Blanch Corridor Smart City ecosystem.
          </p>

          <div className="max-w-md mx-auto p-1 border border-primary/20 rounded-xl bg-card/30 backdrop-blur-md">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <h4 className="font-heading text-lg text-white">Transmission Received</h4>
                <p className="text-xs text-muted-foreground">
                  Your interest is registered. You will receive priority updates as Phase 1 blueprint begins deployments.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email address"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none placeholder:text-gray-500 rounded-lg"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-background font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 flex items-center justify-center gap-2 rounded-lg"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      GET ACCESS <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export const Route = createFileRoute("/vision")({
  component: VisionPage,
});
