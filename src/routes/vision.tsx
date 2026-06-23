import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { Button } from "../components/ui/button";
import logoBrown from "../assets/b-logo-brown.png";
import DltShowcase from "@/components/DltShowcase";
import { ReactNode } from "react";
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
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

function VisionPage() {
  return (
    <main className="overflow-hidden bg-background min-h-screen">
      <Navbar />
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
    </main>
  );
}

export const Route = createFileRoute("/vision")({
  component: VisionPage,
});
