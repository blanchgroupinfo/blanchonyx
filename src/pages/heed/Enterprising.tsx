import { Briefcase } from "lucide-react";
import PillarPage from "@/components/PillarPage";

export default function HeedEnterprising() {
  return (
    <PillarPage
      data={{
        eyebrow: "H.E.E.D. · Pillar III",
        pillar: "Enterprising",
        tagline:
          "Righteous businesses and ventures that create sustainable prosperity for the Royal Priesthood and the nations.",
        icon: Briefcase,
        programs: [
          { title: "Universal Business Network", desc: "Sovereign marketplace of member-owned enterprises." },
          { title: "Blanch Onyx DLT Commerce", desc: "Zero-fee settlement for member trade across the Corridor." },
          { title: "Capital of the Tribes", desc: "Sovereign funding for righteous ventures." },
          { title: "Heritage Crafts & Goods", desc: "Reviving sacred trades and ancestral craftsmanship." },
        ],
        scriptures: [
          { ref: "Deuteronomy 8:18", text: "For it is he that giveth thee power to get wealth." },
          { ref: "Proverbs 13:11", text: "He that gathereth by labour shall increase." },
          { ref: "Ecclesiastes 9:10", text: "Whatsoever thy hand findeth to do, do it with thy might." },
        ],
        outcomes: [
          "A self-sustaining sovereign economy",
          "Member enterprises operating across every continent",
          "Zero-fee, righteous trade settled on Blanch Onyx DLT",
          "Wealth circulating among the chosen generation",
        ],
      }}
    />
  );
}
