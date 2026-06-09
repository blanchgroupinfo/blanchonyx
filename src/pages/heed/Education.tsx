import { GraduationCap } from "lucide-react";
import PillarPage from "@/components/PillarPage";

export default function HeedEducation() {
  return (
    <PillarPage
      data={{
        eyebrow: "H.E.E.D. · Pillar II",
        pillar: "Education",
        tagline:
          "Knowledge, wisdom, and understanding rooted in truth — alleviating poverty through righteous learning.",
        icon: GraduationCap,
        programs: [
          { title: "Royal Priesthood Academy", desc: "K-12 sacred curriculum integrating Torah, science, and technology." },
          { title: "S.H.I.E.L.D. AI Literacy", desc: "Training the next generation in sovereign AI and ethics." },
          { title: "Sacred Languages Program", desc: "Ancient Hebrew, Aramaic, and prophetic scripture studies." },
          { title: "Trade & Mastery Guilds", desc: "Apprenticeships in craftsmanship, code, and commerce." },
        ],
        scriptures: [
          { ref: "Proverbs 4:7", text: "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding." },
          { ref: "Hosea 4:6", text: "My people are destroyed for lack of knowledge." },
          { ref: "2 Timothy 2:15", text: "Study to shew thyself approved unto AHAYAH." },
        ],
        outcomes: [
          "100% literacy in sacred and modern disciplines",
          "Generational poverty eradicated through skill and wisdom",
          "A scholar class restored within the Royal House",
          "AI-fluent youth grounded in divine ethics",
        ],
      }}
    />
  );
}
