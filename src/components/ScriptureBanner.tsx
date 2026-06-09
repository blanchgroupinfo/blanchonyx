import { motion } from "framer-motion";

interface Props {
  verse: string;
  citation: string;
}

const ScriptureBanner = ({ verse, citation }: Props) => {
  return (
    <div className="relative py-10 overflow-hidden border-y border-primary/20 bg-gradient-to-r from-background via-secondary/5 to-background">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-16 items-center"
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-16 items-center shrink-0">
            <span className="font-display italic text-2xl md:text-3xl text-gradient-gold">
              ✦ {verse}
            </span>
            <span className="text-sm text-secondary uppercase tracking-[0.3em]">{citation}</span>
            <span className="font-display italic text-2xl md:text-3xl text-gradient-gold">
              ✦ {verse}
            </span>
            <span className="text-sm text-secondary uppercase tracking-[0.3em]">{citation}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScriptureBanner;
