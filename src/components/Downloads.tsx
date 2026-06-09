import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, BookOpen, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Doc {
  title: string;
  description: string;
  filename: string;
  category: string;
  tags: string[];
  icon: typeof FileText;
}

const documents: Doc[] = [
  {
    title: "Blanch Group Company Overview",
    description: "Mission, vision, H.E.E.D. Program, and spiritual foundation of the Sovereign Trust.",
    filename: "Blanch_Group_Company_Overview.pdf",
    category: "Overview",
    tags: ["Trust", "Mission", "H.E.E.D."],
    icon: FileText,
  },
  {
    title: "Blanch S.H.I.E.L.D. AI",
    description: "Multi Sovereign Intelligence & Ethics Layer system and its universal capabilities.",
    filename: "Blanch_SHIELD_AI.pdf",
    category: "S.H.I.E.L.D. AI",
    tags: ["AI", "Governance", "Ethics"],
    icon: BookOpen,
  },
];

const categories = ["All", "Overview", "S.H.I.E.L.D. AI", "Whitepapers"];

const useViews = () => {
  const [views, setViews] = useState<Record<string, number>>({});
  useEffect(() => {
    setViews(JSON.parse(localStorage.getItem("blanch_doc_views") || "{}"));
  }, []);
  const bump = (filename: string) => {
    setViews((prev) => {
      const next = { ...prev, [filename]: (prev[filename] || 0) + 1 };
      localStorage.setItem("blanch_doc_views", JSON.stringify(next));
      return next;
    });
  };
  return { views, bump };
};

const Downloads = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { views, bump } = useViews();

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchesCat = cat === "All" || d.category === cat;
      const text = (d.title + d.description + d.tags.join(" ")).toLowerCase();
      const matchesQ = !q || text.includes(q.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  const handleDownload = (filename: string) => {
    bump(filename);
    const link = document.createElement("a");
    link.href = `/documents/${filename}`;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (filename: string) => {
    bump(filename);
    window.open(`/documents/${filename}`, "_blank");
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-sacred" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Download className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
              Sovereign Library
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            <span className="text-gradient-gold">Document</span>
            <span className="text-foreground"> Library</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Search, browse, and download official documents of the Blanch Group Sovereign Trust.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search documents, tags, themes..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-all ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filtered.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-sacred rounded-2xl p-8 group hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <doc.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3" />
                  {views[doc.filename] || 0}
                </div>
              </div>

              <Badge variant="outline" className="mb-3 text-secondary border-secondary/40">
                {doc.category}
              </Badge>

              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {doc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{doc.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {doc.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => handleView(doc.filename)} className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <ExternalLink className="w-4 h-4 mr-2" /> View
                </Button>
                <Button size="sm" onClick={() => handleDownload(doc.filename)} className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="md:col-span-2 text-center text-muted-foreground py-16">
              No documents match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
