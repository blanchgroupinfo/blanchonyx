import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Car,
  ChevronDown,
  CircleCheck,
  Cpu,
  CreditCard,
  Download,
  Globe2,
  HandHeart,
  Landmark,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Tv,
  Users,
  type LucideIcon,
} from "lucide-react";
import logoBrown from "../assets/b-logo-brown.png";
import logoBlackBrown from "../assets/b-logo-black-brown.png";
import DltShowcase from "@/components/DltShowcase";
import Navbar from "@/components/landing/Navbar";
import { Button } from "../components/ui/button";
import Slideshow from "@/components/Slideshow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blanch Onyx | Prestige Sovereign Social Club" },
      {
        name: "description",
        content:
          "A private sovereign social club and DLT network for elite collaboration, cultural leadership, strategic networking, and philanthropy.",
      },
      { property: "og:title", content: "Blanch Onyx | Prestige Sovereign Social Club" },
      {
        property: "og:description",
        content:
          "Sovereign identity, strategic influence, and a divinely governed distributed network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blanch Onyx" },
      { name: "twitter:description", content: "Prestige Sovereign Social Club and DLT network." },
    ],
  }),
  component: Index,
});

const heed = [
  ["H", "Health", "Holistic wellness, healing, and community care guided by divine principles."],
  [
    "E",
    "Education",
    "Knowledge, wisdom, and understanding rooted in truth and spiritual enlightenment.",
  ],
  [
    "E",
    "Enterprising",
    "Righteous ventures that create sustainable prosperity and enduring opportunity.",
  ],
  ["D", "Development", "Sustainable growth and eco-friendly smart cities for generations to come."],
];
const shieldDomains = [
  [
    Globe2,
    "Governance & Finance",
    "Nations, administrations, banking, settlements, and trading markets.",
  ],
  [
    Cpu,
    "Technology & Infrastructure",
    "DLT, applications, smart cities, transportation, and space exploration.",
  ],
  [
    Building2,
    "Commerce & Industry",
    "Products, services, assets, universal commerce, and virtual marketplaces.",
  ],
  [Sparkles, "Energy & Environment", "Clean energy, crystal energy, and non-GMO food systems."],
  [
    Network,
    "Intelligence & Media",
    "H.I.I. AI agents, LLMs, broadcast, podcast, streaming, and marketing.",
  ],
  [
    ShieldCheck,
    "Ethics & Compliance",
    "Divine Law governing righteous morality across every operation.",
  ],
];
const scriptureFoundation = [
  {
    text: "Thy righteousness is an everlasting righteousness, and thy law is the truth.",
    verse: "Psalms 119:142",
  },
  {
    text: "All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
    verse: "2 Timothy 3:16",
  },
  {
    text: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life.",
    verse: "Proverbs 6:23",
  },
  {
    text: "And ye shall know the truth, and the truth shall make you free.",
    verse: "John 8:32",
  },
  {
    text: "Yashaya saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
    verse: "John 14:6",
  },
  {
    text: "And he said unto him, Why callest thou me good? there is none good but one, that is, Most High AHAYAH: but if thou wilt enter into life, keep the commandments.",
    verse: "Matthew 19:17",
  },
];
const tiers = [
  "Founder",
  "Royal · Throne",
  "Onyx · Council",
  "Elite",
  "Partner",
  "Executive",
  "Associate",
  "Sardonyx · Initiate",
];
const societyPrivileges: [LucideIcon, string, string][] = [
  [
    Users,
    "Exclusive Networking Events",
    "Curated gatherings for elite collaboration and strategic relationship building. Why it matters — relationships precede ventures; access to the right room shortens decades of work."
  ],
  [
    Building2,
    "Summits & Gatherings",
    "Annual summits, quarterly retreats, and intimate mastermind sessions. Why it matters — sustained council with peers turns isolated success into generational momentum.",
  ],
  [
    Sparkles,
    "Cultural Observances",
    "Themed events honoring Holy Days, Feasts, and divine appointments. Why it matters — sacred rhythm anchors the network in covenant, not in seasons of the world.",
  ],
  [
    Globe2,
    "Business Networking Access",
    "Direct access to the Blanch Corridor ecosystem and kingdom-aligned ventures. Why it matters — deal flow inside a vetted sovereign network compounds trust and capital alike.",
  ],
  [
    TrendingUp,
    "Luxury Lifestyle Partnerships",
    "Preferred access to premium brands, travel, and bespoke experiences. Why it matters — stewardship of excellence reflects the dignity of a royal priesthood.",
  ],
  [
    CreditCard,
    '"Black Card" Access System',
    "Tiered membership privileges with the Blanch Onyx Black Card. Why it matters — a single credential moves frictionless across banking, commerce, and member-only doors.",
  ],
  [
    HandHeart,
    "Philanthropy & Community Projects",
    "Direct involvement in humanitarian, educational, and emancipation initiatives. Why it matters — kingdom influence is measured by who is lifted, not only by what is built.",
  ],
  [
    ShieldCheck,
    "Cultural & Social Elite Circle",
    "A private membership network for cultural leadership and divine stewardship. Why it matters — proximity to cultural stewards shapes legacy, taste, and inheritance.",
  ],
];
const ourPurpose: [LucideIcon, string, string][] = [
  [
    Globe2,
    "Vision & Expansion",
    "We are not competitors—we are bridge builders, encouraging collaboration, unity, and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath. Why it matters — bridges outlast walls; alignment to Divine Law is what gives the work permanence.",
  ],
  [
    Users,
    "Social Club",
    "An elite private membership network for collaboration, cultural leadership, strategic networking, and philanthropic development—managed by the Blanch Group Sovereign Trust. Why it matters — bridges outlast walls; alignment to Divine Law is what gives the work permanence.",
  ],
  [
    Car,
    "Blanch Automotive Club",
    "A premier automotive fellowship for enthusiasts and collectors—curated drives, exclusive events, and kingdom-aligned stewardship of exceptional vehicles. Why it matters — bridges outlast walls; alignment to Divine Law is what gives the work permanence.",
  ],
  [
    Network,
    "Universal Business Network",
    "A sovereign business identity and networking platform for connecting members to global commerce, kingdom-aligned partnerships, and divine economy opportunities through the Blanch Corridor. Why it matters — bridges outlast walls; alignment to Divine Law is what gives the work permanence.",
  ],
  [
    Store,
    "Virtual Marketplace",
    "A sacred digital marketplace for kingdom-aligned goods, services, and creative works—facilitating righteous exchange, fair trade, and community prosperity within the Blanch ecosystem. Why it matters — every righteous transaction reroutes capital from extraction to community.",
  ],
  [
    Cpu,
    "S.H.I.E.L.D. AI Creative Media Content Generation",
    "An intelligent, kingdom-aligned media engine powered by S.H.I.E.L.D. AI Guardian Prime—generating sacred content across video, audio, image, and written formats for the Blanch Onyx ecosystem. From cinematic teachings and broadcast segments to social media assets, podcasts, and educational material, S.H.I.E.L.D. AI Media Content Generation produces ethically governed, divinely stewarded media that amplifies the Gospel, supports the Blanch Corridor mission, and equips creators, ministries, and members to share truth, culture, and kingdom-aligned narratives with global audiences. Why it matters — whoever owns the media owns the narrative; this engine returns it to the chosen.",
  ],
  [
    Building2,
    "Smart Cities",
    "Developing eco-friendly Spiritual Family House Smart Cities as hubs for health, education, entertainment, infrastructure development, finance, philanthropy, technology, and business development. These cities will serve as models of sustainable living, innovation, and community enrichment, embodying our commitment to divine stewardship and societal advancement. They will integrate cutting-edge technology with ethical principles to create thriving, resilient communities that foster growth, well-being, and prosperity for all divine enlightenment, business, finance, entertainment, visitors, residents. Why it matters — environment shapes destiny; sovereign cities raise sovereign generations.",
  ],
  [
    Network,
    "Blanch Onyx DLT",
    "The foundational Distributed Ledger Technology powering the Blanch Onyx ecosystem—a sovereign, transparent, and immutable ledger securing every transaction, identity, and asset across the network. Blanch Onyx DLT serves as the backbone of trust within the Blanch Corridor, enabling kingdom-aligned commerce, verifiable records, and divine stewardship of digital and physical assets. It interoperates with Blanch Network, Blanch Infinity DLT, Blanch Hadash Dabash DLT, and S.H.I.E.L.D. AI Guardian Prime DLT to deliver a unified, secure, and ethically governed distributed infrastructure for the global Blanch community. Why it matters — truth at the ledger layer protects truth at every layer above it.",
  ],
  [
    CreditCard,
    "Blanch Onyx Black Card",
    "An exclusive sovereign Business Card and Debit Card and Standalone Electronic Wallet Card & Hardware Ledger Device—all transactions are monitored by Blanch Onyx DLT, Blanch Network, Blanch Infinity DLT, Blanch Hadash Dabash DLT, and S.H.I.E.L.D. AI Guardian Prime DLT. An access tier (not mystical authority) membership privilege system providing event and benefits access to the Blanch ecosystem—private banking, Blanch Corridor kingdom-aligned investments, and divine stewardship privileges. The Blanch Onyx Black Card is a symbol of elite membership and access to the Blanch Corridor ecosystem, offering exclusive benefits, private banking services, and kingdom-aligned investment opportunities for members of the Blanch Onyx Social Club. Why it matters — financial sovereignty in a single instrument — the credential and the rail combined.",
  ],
  [
    TrendingUp,
    "Investment Opportunities",
    "A sovereign investment platform providing access to kingdom-aligned ventures that benefit humanity, private equity, and divine economy opportunities—curated for members of the Blanch Onyx Social Club. Investment opportunities will focus on ventures that align with our mission and values, fostering prosperity, divine stewardship, and positive impact within the Blanch ecosystem and beyond. Members will have access to exclusive investment opportunities in ethical businesses, innovative startups, and kingdom-aligned projects that contribute to the advancement of our shared vision for a better world. Why it matters — pre-vetted access shortens diligence and protects covenant capital from compromise.",
  ],
  [
    Store,
    "Global Business Directory & Ethical Marketplace",
    "A curated directory of kingdom-aligned businesses and services—connecting members to trusted providers, ethical enterprises, and divine economy opportunities worldwide. The Global Business Directory will serve as a resource for members to discover and support businesses that align with our mission and values, fostering a community of ethical commerce and divine stewardship within the Blanch ecosystem. Why it matters — every transaction routed inside the network strengthens the whole network.",
  ],
  [
    Sparkles,
    "Exclusive Media, Entertainment & Special Events",
    "VIP access to kingdom-aligned media productions, exclusive entertainment, and sacred special events—connecting culture, creativity, and divine purpose. Members will have access to exclusive media content, entertainment experiences, and special events that align with our mission and values, fostering a vibrant cultural community within the Blanch ecosystem. Why it matters — sacred culture must be experienced, not merely described; presence is the point.",
  ],
  [
    Tv,
    "Televised, Broadcast, Podcast, and Streaming Network",
    "A sovereign broadcasting network for kingdom-aligned content—televised teachings, live-streamed events, and divine media reaching global audiences through the Blanch Corridor. Podcasts, television, and streaming content will focus on education, culture, business, philanthropy, and spiritual growth, providing members with valuable insights and entertainment that align with our mission and values. Why it matters — distribution is destiny; owning the broadcast is owning the witness.",
  ],
  [
    Globe2,
    "Global Resource Economy",
    "Building a unified network through the Blanch Corridor—connecting Business, Finance, Clean Entertainment, and Philanthropy worldwide. The Blanch Corridor will serve as a bridge for global commerce, ethical business practices, and kingdom-aligned economic opportunities, fostering prosperity and divine stewardship across nations and industries. Why it matters — coordinated resources outperform fragmented ambition by an order of magnitude",
  ],
  [
    Globe2,
    "Hologram & Metaverse",
    "A sovereign metaverse and holographic platform for immersive experiences, virtual collaboration, and divine engagement—integrating cutting-edge technology with ethical principles to create a virtual environment that reflects our mission and values. The Hologram & Metaverse will provide members with opportunities for virtual networking, education, entertainment, and cultural experiences that align with our vision for a better world. Why it matters — the next frontier of human interaction is digital; the first movers shape the culture and the rules.",
  ],
  [
    HandHeart,
    "Philanthropy Hub",
    "A centralized platform for kingdom-aligned charitable giving, impact investing, and community upliftment—channeling resources to alleviate poverty, advance education, and support divine causes worldwide. The Philanthropy Hub will facilitate transparent, impactful giving and foster a culture of generosity within the Blanch ecosystem with a focus on measurable outcomes and community empowerment, ensuring that resources are directed towards initiatives that align with our mission and values—Humanitarian Fund, Emancipation Bridging Fund, and Educational Development Fund, with measurable outcomes. Why it matters — measurable giving turns generosity into compounding generational repair.",
  ],
  [
    BookOpen,
    "Lashawan Qadash Hebrew Dress Code",
    "Dress Modesty for all Members—Garment with Tassels Fringes on hem edge of the Garment with a Ribbon of Blue Border above the Tassels. The Lashawan Qadash Hebrew Dress Code is a sacred guideline for modest attire that reflects our commitment to divine principles and cultural heritage. It emphasizes the importance of dressing with humility and respect, incorporating traditional elements such as tassels and blue borders to honor our spiritual identity and connection to our ancestors. Deuteronomy 22:11-12, Numbers 15:38-41, Romans 3:29-31, 1 Timothy 2:9, 1 Corinthians 11:1-16.",
  ],
  [
    Landmark,
    "House of Prayer for All",
    "Fostering growth, compassion, and nourishment while enriching our community with shared blessings through faith, unity, and divine purpose. 2 Timothy 3:16-17, Psalms 19:10, Acts 3:19, Psalms 119:142, Psalms 119:151, Proverbs 6:23, John 14:6, 2 Timothy 2:15, 2 John 2:6, 1 John 5:2-3, James 1:26, Isaiah 56:7, 2 Samuel 7:13, 1 Chronicles 17:12, 1 Chronicles 17:14, 1 Chronicles 22:10, 1 Corinthians 10:4, Matthew 7:24-27, Luke 6:48, Ephesians 2:19-22. Why it matters — visible covenant carries unspoken authority and unites the priesthood at a glance. Why it matters — prayer is the architecture beneath every structure the network ever builds.",
  ],
  [
    Calendar,
    "Creators Calendar",
    "Aligning sacred rhythms with creative expression—mapping Holy Days, Feasts, and divine appointments for the Royal Priesthood. Members will have access to a calendar and discounts of Holy Days, Feasts, Special Occasions and Divine appointments to align their lives with sacred rhythms and creative expression. Why it matters — life ordered to the sacred calendar bears fruit the secular calendar cannot.",
  ],
  [
    ShieldCheck,
    "Kingdom of Peace",
    "Preparing for Holy Days, the Gospel, and the coming Kingdom of Peace—the Kingdom of Jerusalem (Yarawashalam) through righteous enterprise. We are not competitors—we are bridge builders, encouraging collaboration, unity, and advancement. Our mission is to uphold Divine Law, foster truth, prosperity, peace, and to prepare a foundation for Holy Days, Feasts, and the Sabbath. Why it matters — every pillar above exists to prepare the ground for the Kingdom that is coming",
  ],
];
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
const models = [
  ["A2X", "Account"],
  ["AD2X", "Administration"],
  ["AG2X", "Agent"],
  ["AI2X", "Artificial Intelligence"],
  ["Apps2X", "Apps"],
  ["AV2X", "Avatar"],
  ["B2X", "Business"],
  ["C2X", "Consumer"],
  ["D2X", "Direct"],
  ["DAO2X", "DAO / Collective"],
  ["DEV2X", "Developer"],
  ["E2X", "Employee"],
  ["G2X", "Government"],
  ["I2X", "Institution"],
  ["ID2X", "Identity"],
  ["LAW2X", "Legal / Compliance"],
  ["M2X", "Machine"],
  ["MF2X", "Manufacturer"],
  ["N2X", "Many"],
  ["P2X", "Prosumer"],
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
function ScriptureBand({ text, verse }: { text: string; verse: string }) {
  return (
    <div className="marquee" aria-label={`${text}, ${verse}`}>
      <div className="marquee-track">
        {[0, 1, 2, 3].map((n) => (
          <span key={n}>
            ✦ {text} <em>{verse}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

const heroSlides = [
  { src: logoBlackBrown, alt: "Blanch Onyx — Sovereign Identity" },
  { src: logoBrown, alt: "Blanch Onyx — Royal Mark" },
];

function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hero-slideshow">
      {heroSlides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt={slide.alt}
          className={i === idx ? "slide-active" : "slide-hidden"}
        />
      ))}
      <div className="slide-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={i === idx ? "dot-active" : "dot"}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const filteredModels = useMemo(
    () =>
      models.filter(([code, name]) =>
        `${code} ${name}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <main className="overflow-hidden bg-background">
      <Navbar />

      <section id="hero" className="hero section-shell">
        <div className="hero-copy reveal-up">
          <Eyebrow>Managed by Blanch Group · A Sovereign Trust</Eyebrow>
          <h1>
            Blanch <span>Onyx</span>
          </h1>
          <p className="hero-kicker">Prestige Sovereign Social Club</p>
          <p className="hero-body">
            A private membership society and distributed network focused on elite collaboration,
            cultural leadership, strategic influence, and philanthropic development.
          </p>
          <blockquote>
            “But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people.”
            <cite>— 1 Peter 2:9</cite>
          </blockquote>
          <div className="hero-actions">
            <Button asChild>
              <a href="#membership">
                Join the Network <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="">
              <a href="#vision">
                Explore Purpose <ArrowDownRight />
              </a>
            </Button>
          </div>
        </div>
        <div className="hero-mark" aria-label="Blanch Onyx showcase">
          <HeroSlideshow />
        </div>
        <div className="hero-index">
          <span>EST.</span>
          <strong>2018-Blanch Group</strong>
          <i />
        </div>
      </section>
      <ScriptureBand
        text="But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:"
        verse="1 Peter 2:9"
      />

      <section id="heritage" className="section-shell section-block">
        <div className="section-intro">
          <Eyebrow>Our Heritage & Purpose</Eyebrow>
          <h2>
            Royal House
            <br />
            <em>of Judah (Yadah)</em>
          </h2>
            {/* Slideshow of images and videos placed directly under the heading */}
            <div className="my-8 flex justify-center">
              <Slideshow />
            </div>
        </div>
        <div className="heritage-grid">
          <article className="lead-story">
            <span className="story-number">01</span>
            <h3>A Sovereign Divine Law Non-Profit Trustee</h3>
            <p>
              We are Aboriginal Descendants of the Royal House of the Tribe of Judah (Yadah) and
              Royal Priesthood of the Tribe of Levi (Lawaya)—rooted in the Torah and Biblical
              teachings of Most High AHAYAH & YASHAYA. Our heritage is the foundation of our purpose: to uphold divine law, preserve sacred
              knowledge, and steward the chosen generation through righteous enterprise, cultural
              leadership, and philanthropic development.</p>
            <ul>
              <li><b>Jeremiah 14:2 </b> Judah mourneth, and the gates thereof languish; they are black unto the ground; and the cry of Jerusalem is gone up.</li>
              <li><b>Job 30:30</b> My skin is black upon me, and my bones are burned with heat.</li>
              <li><b>Song of Solomon 1:5</b> I am black, but comely, O ye daughters of Jerusalem, as the tents of Kedar, as the curtains of Solomon.</li>
              <li><b>1 John 5:2-3</b>  By this we know that we love the children of Most High AHAYAH, when we love Most High AHAYAH, and keep his commandments. For this is the love of Most High AHAYAH, that we keep his commandments: and his commandments are not grievous.</li>
              </ul>
            <blockquote>
              “Thou art near, O Most High AHAYAH; and all thy commandments are truth.”<cite>— Psalms 119:151</cite>
            </blockquote>
          </article>
          <article className="heritage-story">
            <span className="story-number">02</span>
            <p className="mini-label">The Blanch Stone</p>
            <h3>Onyx · Sardonyx · Shaham/Shoham</h3>
            <p>
              Blanch derives from the Hebrew “Shaham/Shoham” (שֹׁהַם), meaning onyx—a precious stone
              of strength, protection, purity, and divine connection, named among the foundations of
              New Jerusalem (Yarawashalam). The Shaham/Shoham is the Guardians of Jerusalem
              (Yarawashalam) and The Tarah/Torah Divine Law they are Levites.
              Blanch/Onyx/Sardonyx/Shaham/Shoham a Watchman Descendant the chosen Royal Priesthood.
            </p>
            <ul>
              <li>
                <b>Genesis 2:12</b> — “And the gold of that land is good: there is bdellium and the
                onyx stone.”
              </li>
              <li>
                <b>Revelation 21:20</b> — Sardonyx, the fifth foundation stone.
              </li>
              <li>
                <b>1 Chronicles 24:27</b>  The sons of Merari by Jaaziah; Beno, and Shoham, and
                Zaccur, and Ibri.
              </li>
            </ul>
          </article>
          <article className="heritage-story">
            <span className="story-number">03</span>
            <p className="mini-label">Royal Lineage</p>
            <h3>Levitical Priesthood</h3>
            <p>
              Grand ancestors of the Royal House of Judah—King David, King Solomon, and King Asa—and
              the Levites Royal Priesthood, including Moses and High Priest Aaron.
            </p>
            <ul>
              <li>
                <b>Exodus 19:6</b> — “And ye shall be unto me a kingdom of priests, and an holy
                nation. These are the words which thou shalt speak unto the children of Israel
                (Yasharahala).”
              </li>
              <li>
                <b>Deuteronomy 14:2</b> — “For thou art an holy people unto the Most High AHAYAH thy
                Power, and the Most High AHAYAH hath chosen thee to be a peculiar people unto
                himself, above all the nations that are upon the earth.”
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section id="heed" className="heed-section section-block">
        <div className="section-shell">
          <div className="section-intro light">
            <Eyebrow>The H.E.E.D. Program</Eyebrow>
            <h2>
              Four Pillars.
              <br />
              <em>One Purpose.</em>
            </h2>
            <p>
              A framework designed to stabilize global communities through digital currencies,
              emerging ventures, and sustainable development.
            </p>
          </div>
          <div className="heed-grid">
            {heed.map(([letter, title, text], i) => (
              <article key={title}>
                <span>{letter}</span>
                <div className="pillar-index">0{i + 1}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowDownRight />
              </article>
            ))}
          </div>
        </div>
      </section>
      <ScriptureBand text="My people are destroyed for lack of knowledge" verse="Hosea 4:6" />

      <section id="shield" className="section-shell section-block shield-section">
        <div className="shield-title">
          <div>
            <Eyebrow>Multi Sovereign Intelligence</Eyebrow>
            <p className="mini-label">Blanch</p>
            <h2>
              S.H.I.E.L.D. <em>AI</em>
            </h2>
          </div>
          <p>Spiritual Healing Initiative Economic Light Development</p>
        </div>
        <div className="shield-lead">
          <p>
            A Multi-Strategy Sovereign Intelligence & Ethics Operating System—designed to create,
            manage, market, and automate through the lens of divine law and truth.
          </p>
          <blockquote>
            “Thy righteousness is an everlasting righteousness, and thy law is the truth.”
            <cite>— Psalms 119:142</cite>
          </blockquote>
        </div>
        <div className="domain-grid">
          {shieldDomains.map(([Icon, title, text]) => (
            <article key={String(title)}>
              <Icon />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
            </article>
          ))}
        </div>
        <div className="scriptural-foundation">
          <div className="scriptural-header">
            <Eyebrow>Core Scriptural Foundation</Eyebrow>
            <h3><em>The Foundation of </em><em style={{ color: "var(--primary)", fontStyle: "italic" }}>Truth</em></h3>
          </div>
          <div className="scripture-grid">
            {scriptureFoundation.map(({ text, verse }, i) => (
              <article key={verse} className="scripture-card">
                <span className="scripture-index">0{i + 1}</span>
                <BookOpen aria-hidden="true" />
                <blockquote>
                  &ldquo;{text}&rdquo;
                  <cite>— {verse}</cite>
                </blockquote>
              </article>
            ))}
          </div>
        </div>

        <div className="compliance">
          <div>
            <Eyebrow>The Standard of Compliance</Eyebrow>
            <h3>
              Preserving human
              <br />
              and spiritual purity.
            </h3>
          </div>
          <ul>
            {[
              "No alcohol, tobacco, or illegal substances - Deuteronomy 32:33, Leviticus 10:9, Ephesians 5:18, Galatians 5:19-21, 1 John 2:1, Judges 13:4, Proverbs 4:17, 2 Esdras 13:37",
              "No violence, war, or weapons - Exodus 20:13, Revelation 21:8 ",
              "No biological confusion or species mixing - Deuteronomy 22:10, 1 Corinthians 15:39, Daniel 2:43, Leviticus 11:44",
              "Clean foods and non-GMO only - Leviticus 11:1-47, Judges 13:4, 2 Corinthians 6:17",
            ].map((x) => (
              <li key={x}>
                <CircleCheck />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DltShowcase />

      <section id="membership" className="section-shell section-block membership-section">
        <div className="section-intro">
          <Eyebrow>Elite Membership</Eyebrow>
          <h2>
            Blanch Onyx
            <br />
            <em>Elite Network</em>
          </h2>
          <p>Where sovereign identity meets strategic influence.</p>
        </div>
        <div className="membership-tiers">
          <p className="mini-label">Membership Tiers</p>
          {tiers.map((tier, i) => (
            <a href="#join" key={tier}>
              <span>0{i + 1}</span>
              <strong>{tier}</strong>
              <small>Exclusive privileges & access</small>
              <ArrowRight />
            </a>
          ))}
        </div>

      <div style={{ marginTop: "5rem" }}>
        <Eyebrow>Society Privileges</Eyebrow>
        <h3 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", marginTop: "1rem", lineHeight: 1 }}>Eight pillars of <em style={{ color: "var(--primary)", fontStyle: "italic" }}>access.</em></h3>
          <div className="privilege-grid">
            {societyPrivileges.map(([Icon, title, text]) => (
              <article key={title} className="privilege-card">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <blockquote className="membership-quote">
            &ldquo;A chosen generation, a royal priesthood, an holy nation, a peculiar people — called
            out of darkness into marvellous light.&rdquo;
            <cite>— 1 Peter 2:9</cite>
          </blockquote>
        </div>

        <div className="purpose-block">
          <div className="purpose-header">
            <Eyebrow>Our Purpose</Eyebrow>
            <h2>
              Vision, enterprise &<br />
              <em>divine stewardship.</em>
            </h2>
          </div>
          <div className="purpose-grid">
            {ourPurpose.map(([Icon, title, text]) => (
              <article key={title} className="purpose-card">
                <Icon aria-hidden="true" />
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <blockquote className="membership-quote purpose-quote">
            &ldquo;As Elders and descendants of a Royal Priesthood, we honor Sovereign Divine Law above
            all worldly law, pursuing Peace / Shalawam / Shalam.&rdquo;
          </blockquote>
        </div>
      </section>

    <section id="vision" className="vision-section section-block">
      <div className="section-shell"><div className="vision-heading">
        <Eyebrow>Vision in Motion</Eyebrow>
        <h2>Smart Cities &<br/><em>the Blanch Corridor</em></h2>
        <p>A sovereign network of sacred, sustainable cities for the Royal Priesthood and global communities.</p>
      </div>
        <div className="vision-grid">{visions.map(([label,title,text],i)=><article key={title} className="card-lift"><span>0{i+1}</span>
        <p className="mini-label">{label}</p><h3>{title}</h3><p>{text}</p><ArrowDownRight/></article>)}</div>
        </div>
        </section>
      <ScriptureBand
        text="The wealth of the sinner is laid up for the just"
        verse="Proverbs 13:22"
      />

      <section id="commerce" className="section-shell section-block commerce-section"><div className="commerce-heading"><div><Eyebrow>Universal Commerce Models</Eyebrow><h2>X2X Transaction<br/><em>Framework</em></h2></div><div className="commerce-stat"><strong>380<span>+</span></strong><p>Unique commerce pathways powering the future of global transactions.</p></div></div><div className="commerce-features">{[["Instant Settlement","Sub-second finality"],["Cross-Border Native","Multi-currency commerce"],["AI-Orchestrated","Optimized routing & risk"],["Identity-Verified","Trust at every layer"]].map(([a,b])=><div key={a}><ShieldCheck/><strong>{a}</strong><span>{b}</span></div>)}</div><div className="models-panel"><div className="models-top"><div><p className="mini-label">20 Primary X2X Models</p><h3>Everything connects<br/>to everything.</h3></div><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search models…" aria-label="Search commerce models"/></label></div><div className="model-grid">{filteredModels.map(([code,name])=><article key={code} className="card-lift"><strong>{code}</strong><span>{name}</span><small>{name} to Everything</small><ChevronDown/></article>)}</div></div></section>

    <section id="library" className="library-section section-block"><div className="section-shell library-inner"><div><Eyebrow>Sovereign Library</Eyebrow><h2>Document<br/><em>Library</em></h2><p>Search, browse, and download official documents of the Blanch Group Sovereign Trust.</p></div><div className="document-card card-lift"><BookOpen/><div><p className="mini-label">Official Collection</p><h3>Foundational Documents</h3><span>Charters · Trust Records · Network Protocols</span></div><Button variant="outline" size="icon" aria-label="Download document"><Download/></Button></div></div></section>


      <footer id="join" className="footer">
        <div className="footer-mark">
          <img src={logoBrown} alt="Blanch Onyx mark" />
          <p>
            “Together, we inspire life, hope, and love through faith, unity, and divine purpose.”
          </p>
          <span>— Praise Most High AHAYAH BA SHAM YASHAYA</span>
        </div>
        <div className="footer-join">
          <Eyebrow>Enter the Circle</Eyebrow>
          <h2>
            Become part of
            <br />
            <em>the network.</em>
          </h2>
          <Button>
            Request Membership <ArrowRight />
          </Button>
        </div>
        <div className="footer-bottom">
          <span>Copyright © 2026 Blanch Group — Sovereign Trust</span>
          <span>All Rights Reserved</span>
        </div>
      </footer>
    </main>
  );
}
