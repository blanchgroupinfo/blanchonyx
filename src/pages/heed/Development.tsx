import { Sprout } from "lucide-react";
import PillarPage from "@/components/PillarPage";

export default function HeedDevelopment() {
  return (
    <PillarPage
      data={{
        eyebrow: "H.E.E.D. · Pillar IV",
        pillar: "Development",
        tagline:
          "Sustainable growth, eco-sovereign smart cities, and infrastructure for the generations to come.",
        icon: Sprout,
        programs: [
          { title: "Blanch Corridor", desc: "Sovereign trade and transit spine linking sacred zones." },
          { title: "Smart City Yarawashalam", desc: "Eco-sovereign urban architecture grounded in Torah." },
          { title: "Onyx Energy Grid", desc: "Decentralized, clean energy for the Royal Priesthood." },
          { title: "Sacred Land Stewardship", desc: "Agricultural and ecological restoration of tribal lands." },
        ],
        scriptures: [
          { ref: "Genesis 2:15", text: "And AHAYAH took the man, and put him into the garden of Eden to dress it and to keep it." },
          { ref: "Isaiah 58:12", text: "Thou shalt be called, The repairer of the breach, The restorer of paths to dwell in." },
          { ref: "Jeremiah 29:7", text: "Seek the peace of the city... for in the peace thereof shall ye have peace." },
        ],
        outcomes: [
          "Sovereign smart-city districts operational across the Corridor",
          "Clean, autonomous energy for member communities",
          "Regenerated ecosystems on ancestral lands",
          "Infrastructure ready for the New Jerusalem (Yarawashalam)",
        ],
      }}
    />
  );
}
