const imageFiles = [
    "WhatsApp Image 2026-10-29 at 1.56.35 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.36 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.36 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.36 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.37 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.37 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.37 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.38 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.38 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.38 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.39 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.39 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.39 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.40 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.40 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.40 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.41 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.41 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.41 PM.jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.42 PM (1).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.42 PM (2).jpeg",
    "WhatsApp Image 2026-10-29 at 1.56.42 PM.jpeg",
];

const art = (number) =>
    `/art/${encodeURIComponent(imageFiles[number - 1])}`;

export const categories = [
    "All Works",
    "3D Carvings",
    "Mythological Murals",
    "Temple Art",
    "Decorative Panels",
    "Sculptures",
    "Custom Art",
];

const base = {
    price: null,
    priceType: "quote",
    dimensions: "Custom Site-Specific Dimensions",
    materials: "Hand-sculpted relief composite, mineral pigments & gold leaf accents",
    year: "2024",
    artist: "Uday Arts",
    medium: "Hand-Carved Relief",
    placeholder: false,
    availability: "Commission by Studio",
    featured: true,
};

const m = (item) => ({ ...base, ...item });

export const artworks = [
    m({
        id: 1,
        slug: "shiva-relief-bust",
        title: "Shiva, Sculpted Bust",
        category: "Sculptures",
        year: "2024",
        medium: "Sculpted Bas-Relief & Patina",
        dimensions: "4.5 ft × 3.2 ft",
        materials: "High-density relief clay, natural stone powder & antique bronze patina",
        image: art(2),
        gallery: [art(2), art(3)],
        featured: true,
        shortDescription:
            "A sculptural portrait of Lord Shiva with flowing locks and layered sacred beads.",
        fullDescription:
            "A striking sculptural interpretation of Lord Shiva, featuring flowing meditative hair, a crescent moon, and intricate bead details. The carefully modelled contours create profound depth and dramatic raking shadows in interior lighting.",
        customizationOptions: [
            "Proportioned to suit interior feature walls or niches",
            "Surface finish (matte charcoal, antique terracotta, or gilded bronze)",
            "Integrated backlit floating framing or raw edge mounting",
        ],
    }),

    m({
        id: 2,
        slug: "kurukshetra-chariot-relief",
        title: "The Chariot Relief",
        category: "3D Carvings",
        year: "2024",
        medium: "Layered Architectural Relief",
        dimensions: "10 ft × 4.5 ft",
        materials: "Deep relief composite, mineral wash & sealed protective coating",
        image: art(22),
        gallery: [art(22), art(21)],
        featured: true,
        shortDescription:
            "A panoramic mythological scene featuring a sacred chariot and galloping war steeds.",
        fullDescription:
            "An intricate, sweeping sculptural relief depicting an epic chariot scene. Layered figures, galloping steeds, and flowing sacred iconography give the composition tremendous kinetic energy and sculptural depth.",
        customizationOptions: [
            "Panoramic panel proportions from residential foyers to grand halls",
            "Detailed subject variations and contextual Sanskrit inscriptions",
            "Monochrome stone finish or rich warm metallic burnish",
        ],
    }),

    m({
        id: 3,
        slug: "gopuram-temple-tower",
        title: "Gopuram Temple Tower",
        category: "Temple Art",
        year: "2023",
        medium: "Tiered Architectural Sculpture",
        dimensions: "7.2 ft × 3 ft",
        materials: "Architectural lime, carved composite & hand-applied mineral patinas",
        image: art(12),
        gallery: [art(12), art(16)],
        featured: true,
        shortDescription:
            "A tiered South-Indian temple-inspired architectural sculpture with intricate miniature tiers.",
        fullDescription:
            "A monumental temple-inspired tower featuring miniature architectural tiers, ornate pillars, and a distinctive sacred silhouette. Both the green raw working stage and the finished gilded presentation highlight the master sculptor's precision.",
        customizationOptions: [
            "Number of architectural tiers (3 to 7 tiers)",
            "Scale, pedestal integration, and recessed wall niche mounting",
            "Aged antique verdigris, sandstone, or deep granite finish",
        ],
    }),

    m({
        id: 4,
        slug: "meditating-buddha-panel",
        title: "Meditating Buddha",
        category: "3D Carvings",
        year: "2024",
        medium: "Zen Relief in High Relief",
        dimensions: "5 ft × 4 ft",
        materials: "Fine stone composite, organic binders & matte stone patina",
        image: art(3),
        gallery: [art(3), art(2)],
        featured: true,
        shortDescription:
            "A serene seated Buddha sculpture framed by a radiant circular decorative halo.",
        fullDescription:
            "A peaceful sculptural composition featuring a seated Buddha in dhyana mudra, accompanied by an intricately detailed circular halo and delicately carved robe folds. Its restrained palette and balanced symmetry foster quiet contemplation.",
        customizationOptions: [
            "Panel size and depth relief profile (shallow to 4-inch deep projection)",
            "Halo motifs (flame, lotus petal, or minimalist geometric ring)",
            "Monochrome matte ivory or rich deep charcoal tone",
        ],
    }),

    m({
        id: 5,
        slug: "kamadhenu-tree-of-life",
        title: "Kamadhenu & Tree of Life",
        category: "Decorative Panels",
        year: "2024",
        medium: "Ornamental Botanical Relief",
        dimensions: "8 ft × 5 ft",
        materials: "Relief matrix, 24K gold foil accents & warm umber patina",
        image: art(19),
        gallery: [art(19), art(18)],
        featured: true,
        shortDescription:
            "An ornate tree-of-life relief panel featuring sacred cattle and lush floral iconography.",
        fullDescription:
            "A richly detailed decorative relief marrying an expansive branching Kalpavriksha (tree of life) with the sacred Kamadhenu and delicate foliage. Available in warm burnished gold or raw sculpted green-stage finish.",
        customizationOptions: [
            "Custom dimensions for living spaces, prayer areas, and reception halls",
            "Choice of gold leaf leafing, bronze highlights, or natural sandstone",
            "Integration of customized family emblems or specific auspicious flora",
        ],
    }),

    m({
        id: 6,
        slug: "hanuman-sun-mural",
        title: "Hanuman & the Golden Sun",
        category: "Mythological Murals",
        year: "2024",
        medium: "Hand-Painted Fine Fresco & Acrylic",
        dimensions: "12 ft × 8 ft",
        materials: "Lightfast artist acrylics, natural ochres & matte varnish",
        image: art(21),
        gallery: [art(21), art(22)],
        featured: true,
        shortDescription:
            "A vibrant mythological mural capturing Hanuman soaring across an amber celestial sky.",
        fullDescription:
            "A dynamic, heroic wall mural capturing Hanuman in mid-flight against a radiant golden solar disk and swirling atmospheric clouds. Rich amber, fiery vermilion, and deep ochre tones give this bespoke work immense visual power.",
        customizationOptions: [
            "Site-specific wall dimensions for residential or cultural venues",
            "Color temperature calibration to match ambient interior lighting",
            "Direct wall execution or prepared canvas panel installation",
        ],
    }),

    m({
        id: 7,
        slug: "ganesha-framed-artwork",
        title: "Ganesha, Sacred Relief",
        category: "Sculptures",
        year: "2023",
        medium: "Sculpted Devotional Icon",
        dimensions: "3.5 ft × 2.5 ft",
        materials: "Architectural relief, teakwood mounting & antique gold leaf",
        image: art(1),
        gallery: [art(1)],
        featured: false,
        shortDescription:
            "A consecrated Ganesha relief with fine ornamental craftsmanship and deep relief carving.",
        fullDescription:
            "A revered devotional artwork presenting Lord Ganesha enveloped in intricate traditional filigree and floral garlands. The deep sculpted cuts and burnished bronze-gold finish make it an ideal focal centerpiece for sanctums and luxury living spaces.",
        customizationOptions: [
            "Handcrafted teak, brass, or floating minimalist frame",
            "Dimensions tailored to puja rooms or formal entry foyers",
            "Customised iconographic attributes and auspicious symbols",
        ],
    }),

    m({
        id: 8,
        slug: "bespoke-commission",
        title: "Architectural Bespoke Work",
        category: "Custom Art",
        year: "2024",
        medium: "Tailored Site-Specific Artwork",
        dimensions: "Scale to Project Specifications",
        materials: "Selected to harmonise with architectural interior materials",
        image: art(17),
        gallery: [art(17), art(18), art(19)],
        featured: false,
        shortDescription:
            "A bespoke commission conceived collaboratively around your architectural space.",
        fullDescription:
            "Commission a one-of-a-kind artwork tailored precisely to your interior architecture, lighting environment, and thematic vision. The studio oversees every milestone from concept sketching and clay maquettes to final hand-sculpting and on-site placement.",
        customizationOptions: [
            "Full conceptual development and miniature 3D maquette review",
            "Material selection: stone relief, cast bronze, gilded plaster, or fresco",
            "Turnkey delivery and coordinated architectural installation",
        ],
    }),
];

export const price = (a) =>
    a.priceType === "fixed" && a.price != null
        ? `₹${Number(a.price).toLocaleString("en-IN")}`
        : a.priceType === "starting" && a.price != null
            ? `From ₹${Number(a.price).toLocaleString("en-IN")}`
            : "Price on Request";

export const WHATSAPP = "916309379050";
