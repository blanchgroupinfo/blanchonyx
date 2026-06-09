import { motion } from "framer-motion";
import { Building2, Users, Globe2, Sparkles } from "lucide-react";
const visionPoints = [{
  icon: Users,
  title: "Social Club",
  description: "An elite private membership network for collaboration, cultural leadership, strategic networking, and philanthropic development—managed by the Blanch Group Sovereign Trust."
}, {
  icon: Building2,
  title: "Blanch Automotive Club",
  description: "A premier automotive fellowship for enthusiasts and collectors—curated drives, exclusive events, and kingdom-aligned stewardship of exceptional vehicles."
}, {
  icon: Globe2,
  title: "Universal Business Network",
  description: "A sovereign business identity and networking platform for connecting members to global commerce, kingdom-aligned partnerships, and divine economy opportunities through the Blanch Corridor."
}, {
  icon: Globe2,
  title: "Virtual Marketplace",
  description: "A sacred digital marketplace for kingdom-aligned goods, services, and creative works—facilitating righteous exchange, fair trade, and community prosperity within the Blanch ecosystem."
}, {
  icon: Building2,
  title: "Smart Cities",
  description: "Developing eco-friendly Spiritual Family House Smart Cities as hubs for health, education, entertainment, infrastructure development, finance, philanthropy, technology, and business development. These cities will serve as models of sustainable living, innovation, and community enrichment, embodying our commitment to divine stewardship and societal advancement. They will integrate cutting-edge technology with ethical principles to create thriving, resilient communities that foster growth, well-being, and prosperity for all divine enlightenment, business, finance, entertainment, vistors, residents."
}, {
  icon: Globe2,
  title: "Blanch Onyx Black Card",
  description: "An exclusive sovereign Business Card and Debit Card and Standalone Electronic Wallet Card & Hardware Ledger Device all Transactions are Moniter by Blanch Network, Blanch Infinity DLT, Blanch Hadash Dabash DLT, and S.H.I.E.L.D. AI Guardian Prime DLT, access tier (not mystical authority) membership privilege system event + benefits access providing access to the Blanch cosystem—private banking, and Blanch Corridor kingdom-aligned investments, and divine stewardship privileges. The Blanch Onyx Black Card is a symbol of elite membership and access to the Blanch Corridor ecosystem, offering exclusive benefits, private banking services, and kingdom-aligned investment opportunities for members of the Blanch Onyx Social Club."
}, {
  icon: Globe2,
  title: "Investment Opportunities",
  description: "A sovereign investment providing access to kingdom-aligned ventures and ventures the benefit humanity, private equity, and divine economy opportunities—curated for members of the Blanch Onyx Social Club. Investment opportunities will focus on ventures that align with our mission and values, fostering prosperity, divine stewardship, and positive impact within the Blanch ecosystem and beyond."
}, {
  icon: Globe2,
  title: "Global Business Directory & Ethical Marketplace",
  description: "A curated directory of kingdom-aligned businesses and services—connecting members to trusted providers, ethical enterprises, and divine economy opportunities worldwide. The Global Business Directory will serve as a resource for members to discover and support businesses that align with our mission and values, fostering a community of ethical commerce and divine stewardship within the Blanch ecosystem."
}, {
  icon: Globe2,
  title: "Exclusive Media, Entertainment & Special Events",
  description: "VIP access to kingdom-aligned media productions, exclusive entertainment, and sacred special events—connecting culture, creativity, and divine purpose. Members will have access to exclusive media content, entertainment experiences, and special events that align with our mission and values, fostering a vibrant cultural community within the Blanch ecosystem."
}, {
  icon: Globe2,
  title: "Televised, Broadcast, Podcast, and Streaming Network",
  description: "A sovereign broadcasting network for kingdom-aligned content—televised teachings, live-streamed events, and divine media reaching global audiences through the Blanch Corridor. Podcasts, television, and streaming content will focus on education, culture, business, philanthropy, and spiritual growth, providing members with valuable insights and entertainment that align with our mission and values."
}, {
  icon: Globe2,
  title: "Global Resource Economy",
  description: "Building a unified network through the Blanch Corridor—connecting Business, Finance, Clean Entertainment, and Philanthropy worldwide. The Blanch Corridor will serve as a bridge for global commerce, ethical business practices, and kingdom-aligned economic opportunities, fostering prosperity and divine stewardship across nations and industries."
}, {
  icon: Users,
  title: "Philanthropy Hub",
  description: "A centralized platform for kingdom-aligned charitable giving, impact investing, and community upliftment—channeling resources to alleviate poverty, advance education, and support divine causes worldwide. The Philanthropy Hub will facilitate transparent, impactful giving and foster a culture of generosity within the Blanch ecosystem with a focus on measurable outcomes and community empowerment, ensuring that resources are directed towards initiatives that align with our mission and values, Humanitarian Fund, Emancipation Bridging Fund, and Educational Development Fund."
}, {
  icon: Users,
  title: "Lashawan Qadash Hebrew Dress Code",
  description: "Dress Modesty for all Members—Garment with Tassels Fringes on hem edge of the Garment with a Ribbon of Blue Border above the Tassels. The Lashawan Qadash Hebrew Dress Code is a sacred guideline for modest attire that reflects our commitment to divine principles and cultural heritage. It emphasizes the importance of dressing with humility and respect, incorporating traditional elements such as tassels and blue borders to honor our spiritual identity and connection to our ancestors. Deuteronomy 22:11-12, Numbers 15:38-41, Romans 3:29-31, 1 Timothy 2:9, 1 Corinthians 11:1-16."
}, {
  icon: Users,
  title: "House of Prayer for All",
  description: "Fostering growth, compassion, and nourishment while enriching our community with shared blessings through faith, unity, and divine purpose. 2 Timothy 3:16-17, Psalms 19:10, Acts 3:19, Psalms 119:142, Psalms 119:151, Proverbs 6:23, John 14:6, 2Timothy 2:15, 2John 2:6, 1John 5:2-3, James 1:26, Isaiah 56:7, 2 Samuel 7:13, 1 Chronicles 17:12, 1 Chronicles 17:14, 1 Chronicles 22:10, 1 Corinthians 10:4, Matthew 7:24-27, Luke 6:48, Ephesians 2:19-22."
}, {
  icon: Sparkles,
  title: "Creators Calendar",
  description: "Aligning sacred rhythms with creative expression—mapping Holy Days, Feasts, and divine appointments for the Royal Priesthood. Members will have access to a calendar and Discounts of Holy Days, Feasts, Special Occasions and Divine appointments to align their lives with sacred rhythms and creative expression."
}, {
  icon: Sparkles,
  title: "Kingdom of Peace",
  description: "Preparing for Holy Days, the Gospel, and the coming Kingdom of Peace—the Kingdom of Jerusalem (Yarawashalam) through righteous enterprise. We are not competitors—we are bridge builders, encouraging collaboration, unity, and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath."
}];
const Vision = () => {
  return <section className="py-24 md:py-32 relative section-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
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
      }} className="text-center mb-20">
          <span className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium mb-4 block">
            Our Purpose
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold mb-6">
            Vision & Expansion
          </h2>
          <div className="sacred-divider w-32 mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-white">
            We are not competitors—we are bssridge builders, encouraging collaboration, unity, 
            and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, 
            peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath.
          </p>
        </motion.div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visionPoints.map((point, index) => <motion.div key={point.title} initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="card-sacred rounded-xl p-8 group hover:border-primary/30 transition-all duration-500">
              <div className="flex gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                    <point.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Closing statement */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="mt-20 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl md:text-3xl text-foreground/90 italic leading-relaxed mb-4">
              "As Elders and descendants of a Royal Priesthood, we honor Sovereign Divine Law 
              above all worldly law, pursuing Peace / Shalawam / Shalam."
            </p>
            <div className="sacred-divider w-20 mx-auto" />
          </blockquote>
        </motion.div>
      </div>
    </section>;
};
export default Vision;