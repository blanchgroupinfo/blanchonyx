import { motion } from "framer-motion";
import { Crown, BookOpen, Star, Gem } from "lucide-react";
const Heritage = () => {
  return <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
              Our Heritage & Purpose
            </span>
            <Crown className="w-6 h-6 text-primary" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            <span className="text-gradient-gold">Royal House</span>
            <br />
            <span className="text-foreground">of Judah</span>
          </h2>

          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white">We are the Aboriginal Descendants of the Royal House of Tribe of Judah (Yadah), Royal Priesthood of the Tribe of Levi (Lawaya), serving as a Sovereign Divine Law Non-Profit Trustee—rooted in the fundamental ways of life according to the Torah/Tarah/Biblical teachings. Most High AHAYAH & YASHAYA</p>
        </motion.div>

        {/* Scripture Quote */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="card-sacred rounded-2xl p-8 md:p-12 mb-16 text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl italic font-display max-w-4xl mx-auto mb-6 text-white">
            "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; 
            that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light."
          </blockquote>
          <cite className="text-primary/80 font-medium">— 1 Peter 2:9</cite>
        </motion.div>

        {/* Heritage Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* The Blanch Stone */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="card-sacred rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Gem className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">The Blanch Stone</h3>
                <p className="text-sm text-primary/70">Onyx / Sardonyx / Shoham</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Blanch—a Precious Jewel, Fifth Foundation Stone of New Jerusalem (Yarawashalam) City of the Most High AHAYAH. 
              The word "Blanch" derives from the Hebrew "Shoham/Shaham" (שֹׁהַם), meaning "onyx" or "sardonyx," a precious gemstone mentioned in the Bible as one of the foundation stones of the New Jerusalem (Yarashalam). The onyx stone symbolizes strength, protection, and divine connection, reflecting our heritage as descendants of the Royal House of Judah and our commitment to upholding sacred principles. The Blanch Stone represents our identity as a chosen generation, a royal priesthood, and a holy nation, embodying the virtues of purity, resilience, and spiritual enlightenment,
              representing purity and the sacred onyx stone.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Genesis 2:12</span> — "And the gold of that land is good: there is bdellium and the onyx stone."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Exodus 28:9</span> — "And thou shalt take two onyx stones, and grave on them the names of the children of Israel (Yasharahala)."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Revelation 21:20</span> — The sardonyx is named the fifth foundation stone of the New Jerusalem (Yarawashalam).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Royal Lineage */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="card-sacred rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Crown className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">Royal Lineage</h3>
                <p className="text-sm text-primary/70">Levitical Priesthood</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Grand Ancestors of the Royal House of Judah—King David, King Solomon, and King Asa—and 
              the Levites Royal Priesthood, including King/Priest/Prophet Moses and High Priest Aaron.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Exodus 19:6</span> — "And ye shall be unto me a kingdom of priests, and an holy nation."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">1 Peter 2:9</span> — "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Deuteronomy 14:2</span> — "For thou art an holy people unto Most High AHAYAH thy Power."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Isaiah 29:22</span> — "Thus saith Most High AHAYAH, who redeemed Abraham, concerning the house of Jacob, Jacob shall not now be ashamed, neither shall his face now wax pale."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Scriptures */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.5
      }} className="text-center">
          <div className="sacred-divider w-32 mx-auto mb-8" />
          <p className="italic max-w-2xl mx-auto text-white">
            "I am black, but comely, O ye daughters of Jerusalem, as the tents of Kedar, 
            as the curtains of Solomon."
          </p>
          <cite className="text-sm text-primary/70 mt-3 block">— Song of Solomon 1:5</cite>
        </motion.div>
      </div>
    </section>;
};
export default Heritage;