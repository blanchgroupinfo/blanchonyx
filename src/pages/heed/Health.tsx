import { Heart } from "lucide-react";
import PillarPage from "@/components/PillarPage";

export default function HeedHealth() {
  return (
    <PillarPage
      data={{
        eyebrow: "H.E.E.D. · Pillar I",
        pillar: "Health",
        tagline:
          "Holistic wellness and divine healing — restoring body, soul, and spirit through ancient principles and modern care.",
        icon: Heart,
        programs: [
          { title: "Sovereign Wellness Clinics", desc: "Faith-anchored, Torah-aligned clinical care in member communities." },
          { title: "Sacred Nutrition Initiative", desc: "Clean-eating curricula rooted in Leviticus dietary wisdom." },
          { title: "Mind & Spirit Restoration", desc: "Trauma healing, prayer therapy, and Levitical counseling." },
          { title: "Maternal & Generational Care", desc: "Protecting mothers and children of the chosen generation." },
        ],
        scriptures: [
          { ref: "Exodus 15:26", text: "I am AHAYAH that healeth thee." },
          { ref: "3 John 1:2", text: "Beloved, I wish above all things that thou mayest prosper and be in health." },
          { ref: "Proverbs 3:7-8", text: "Fear AHAYAH, and depart from evil. It shall be health to thy navel, and marrow to thy bones." },
        ],
        outcomes: [
          "Measurable reduction in chronic illness within member communities",
          "Sustainable food sovereignty and clean nutrition systems",
          "Restored mental and spiritual wholeness across generations",
          "Trained Levitical healers serving every Blanch district",
        ],
      }}
    />
  );
}
