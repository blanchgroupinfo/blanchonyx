import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  {
    title: "Blanch Group Company Overview",
    description: "Complete overview of the Blanch Group, including our mission, vision, H.E.E.D. Program, and spiritual foundation.",
    filename: "Blanch_Group_Company_Overview.pdf",
    icon: FileText,
    size: "PDF Document"
  },
  {
    title: "Blanch S.H.I.E.L.D. AI",
    description: "Comprehensive documentation on the Multi Sovereign Intelligence & Ethics Layer system and its universal capabilities.",
    filename: "Blanch_SHIELD_AI.pdf",
    icon: BookOpen,
    size: "PDF Document"
  }
];

const Downloads = () => {
  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/documents/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-sacred" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Download className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
              Resources
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            <span className="text-gradient-gold">Document</span>
            <br />
            <span className="text-foreground">Downloads</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access our official documents to learn more about the Blanch Group mission, 
            vision, and the S.H.I.E.L.D. AI system.
          </p>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-sacred rounded-2xl p-8 group hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <doc.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {doc.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {doc.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">{doc.size}</span>
                
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`/documents/${doc.filename}`, '_blank')}
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => handleDownload(doc.filename)}
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground/60 italic">
            "Study to shew thyself approved unto AHAYAH, a workman that needeth not to be ashamed."
          </p>
          <cite className="text-xs text-primary/50 mt-2 block">— 2 Timothy 2:15</cite>
        </motion.div>
      </div>
    </section>
  );
};

export default Downloads;
