const imageFiles = [
  "WhatsApp Image 2026-10-29 at 1.56.35 PM.webp",     // 1: Framed Ganesha 3D Relief
  "WhatsApp Image 2026-10-29 at 1.56.36 PM (1).webp", // 2: Shiva Sculpted 3D Bust
  "WhatsApp Image 2026-10-29 at 1.56.36 PM (2).webp", // 3: Meditating Buddha Halo Relief
  "WhatsApp Image 2026-10-29 at 1.56.36 PM.webp",     // 4: Sculpted Stallion Relief
  "WhatsApp Image 2026-10-29 at 1.56.37 PM (1).webp", // 5: Lotus Ganesha & Kamadhenu Interior Wall Panel
  "WhatsApp Image 2026-10-29 at 1.56.37 PM (2).webp", // 6: Golden Lotus Ganesha Relief
  "WhatsApp Image 2026-10-29 at 1.56.37 PM.webp",     // 7: Hanuman Interior Feature Wall Mural
  "WhatsApp Image 2026-10-29 at 1.56.38 PM (1).webp", // 8: Carved Sanctum Relief Wall Panel
  "WhatsApp Image 2026-10-29 at 1.56.38 PM (2).webp", // 9: Living Room Hanuman Wall Mural
  "WhatsApp Image 2026-10-29 at 1.56.38 PM.webp",     // 10: Devotional Carved Figure Relief
  "WhatsApp Image 2026-10-29 at 1.56.39 PM (1).webp", // 11: Pooja Mandir Gopuram Arch (Gold & Black)
  "WhatsApp Image 2026-10-29 at 1.56.39 PM (2).webp", // 12: Pooja Mandir Gopuram Raw CNC Carving
  "WhatsApp Image 2026-10-29 at 1.56.39 PM.webp",     // 13: Hanuman Sculpted Bust
  "WhatsApp Image 2026-10-29 at 1.56.40 PM (1).webp", // 14: Bespoke Carved Relief Figure
  "WhatsApp Image 2026-10-29 at 1.56.40 PM (2).webp", // 15: Custom Figural Sculpture
  "WhatsApp Image 2026-10-29 at 1.56.40 PM.webp",     // 16: Pooja Mandir Gopuram Standalone View
  "WhatsApp Image 2026-10-29 at 1.56.41 PM (1).webp", // 17: Kamadhenu Gold Leaf Interior Panel
  "WhatsApp Image 2026-10-29 at 1.56.41 PM (2).webp", // 18: Tree of Life Raw Sculpted Relief Panel
  "WhatsApp Image 2026-10-29 at 1.56.41 PM.webp",     // 19: Kamadhenu & Tree of Life Panel
  "WhatsApp Image 2026-10-29 at 1.56.42 PM (1).webp", // 20: Kurukshetra Chariot 3D Relief Mural
  "WhatsApp Image 2026-10-29 at 1.56.42 PM (2).webp", // 21: Hanuman & the Golden Sun Mural
  "WhatsApp Image 2026-10-29 at 1.56.42 PM.webp",     // 22: The Chariot Relief (Sculpted Mural)
];

const art = (number) => `/art/${encodeURIComponent(imageFiles[number - 1])}`;

export const categories = [
  "All Creations",
  "Divine Figures",
  "3D Sculptures",
  "Wall Murals",
  "Interior Panels",
];

const base = {
  price: null,
  priceType: "quote",
  dimensions: "Custom Site-Specific Dimensions",
  materials: "Hand-sculpted relief composite, mineral pigments & gold leaf accents",
  year: "2024",
  artist: "Uday Arts",
  medium: "3D CNC Carved Sculpture",
  placeholder: false,
  availability: "Commission by Studio",
  featured: false,
  bestArt: false,
  // Default framing ensures full vertical sculptures are never cut in half
  fitMode: "contain",
  objectPosition: "50% 50%",
};

const m = (item) => ({ ...base, ...item });

export const artworks = [
  // ── PRIMARY 4 FEATURED CREATIONS (Default "All Creations" Editorial Grid) ──
  m({
    id: 1,
    slug: "shiva-relief-bust",
    title: "Shiva, Sculpted Bust",
    category: "Divine Figures",
    year: "2024",
    medium: "3D CNC Carved Sculpture",
    dimensions: "4.5 ft × 3.2 ft",
    materials: "High-density relief composite, natural stone powder & antique finish",
    image: art(2),
    gallery: [art(2), art(13)],
    featured: true,
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 45%",
    shortDescription:
      "A sculptural portrait of Lord Shiva with flowing locks, crescent moon, and layered rudraksha beads.",
    fullDescription:
      "A striking 3D sculptural interpretation of Lord Shiva featuring meditative contours, a crescent moon, and intricate bead details that cast dramatic raking shadows in interior lighting.",
  }),

  m({
    id: 2,
    slug: "kurukshetra-chariot-relief",
    title: "The Chariot Relief",
    category: "Wall Murals",
    year: "2024",
    medium: "Mythological Relief Artwork",
    dimensions: "10 ft × 4.5 ft",
    materials: "Deep 3D carved relief composite, mineral wash & protective finish",
    image: art(22),
    gallery: [art(22), art(20)],
    featured: true,
    // Focus directly on the horizontal sculpted Chariot panel in the lower half of the photo
    fitMode: "cover",
    objectPosition: "50% 82%",
    shortDescription:
      "A panoramic mythological wall mural featuring a sacred chariot and galloping steeds.",
    fullDescription:
      "An intricate, sweeping sculptural wall mural depicting an epic chariot scene. Layered figures, galloping steeds, and flowing sacred iconography give the composition kinetic energy and deep relief projection.",
  }),

  m({
    id: 3,
    slug: "ganesha-framed-artwork",
    title: "Ganesha, Sacred Relief",
    category: "3D Sculptures",
    year: "2024",
    medium: "CNC Carved Idol",
    dimensions: "3.5 ft × 2.5 ft",
    materials: "3D CNC carved relief, teakwood framing & warm antique gold finish",
    image: art(1),
    gallery: [art(1), art(6)],
    featured: true,
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A consecrated Ganesha 3D relief with fine ornamental craftsmanship and deep carving.",
    fullDescription:
      "A devotional 3D carved sculpture presenting Lord Ganesha enveloped in traditional filigree and floral garlands, finished in warm burnished gold.",
  }),

  m({
    id: 4,
    slug: "kamadhenu-tree-of-life",
    title: "Kamadhenu & Tree of Life",
    category: "Interior Panels",
    year: "2024",
    medium: "Custom Wall Artwork",
    dimensions: "8 ft × 5 ft",
    materials: "Carved relief matrix, 24K gold foil accents & warm umber patina",
    image: art(19),
    gallery: [art(19), art(17), art(18)],
    featured: true,
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 48%",
    shortDescription:
      "An ornate tree-of-life interior wall panel featuring sacred Kamadhenu and lush botanical carving.",
    fullDescription:
      "A richly detailed decorative interior relief marrying an expansive branching Kalpavriksha (tree of life) with the sacred Kamadhenu and carved foliage.",
  }),

  // ── ADDITIONAL DIVINE FIGURES ──
  m({
    id: 5,
    slug: "hanuman-sculpted-bust",
    title: "Hanuman, Devotional Bust",
    category: "Divine Figures",
    year: "2024",
    medium: "Polychrome 3D Carved Figure",
    dimensions: "4 ft × 3 ft",
    image: art(13),
    gallery: [art(13)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A hand-finished 3D sculpted bust of Lord Hanuman with traditional crown and sacred ornaments.",
    fullDescription:
      "Sculpted with expressive devotion and finished in rich natural pigments and metallic accents.",
  }),

  m({
    id: 6,
    slug: "lotus-ganesha-figure",
    title: "Lotus Ganesha Figure",
    category: "Divine Figures",
    year: "2024",
    medium: "Carved Devotional Figure",
    dimensions: "4.5 ft × 3.5 ft",
    image: art(6),
    gallery: [art(6), art(5)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "Lord Ganesha seated upon a blooming golden lotus with carved ceremonial attributes.",
    fullDescription:
      "A radiant wall-mounted divine figure surrounded by sculpted lotus petals and traditional gold detailing.",
  }),

  m({
    id: 7,
    slug: "srinivasa-sanctum-figure",
    title: "Sacred Sanctum Relief",
    category: "Divine Figures",
    year: "2024",
    medium: "Carved Archway Figure",
    dimensions: "6 ft × 4 ft",
    image: art(10),
    gallery: [art(10), art(8)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "An intricately carved devotional deity figure framed by floral torana arches.",
    fullDescription:
      "Crafted for residential prayer rooms and meditative interiors with deep multi-layered relief.",
  }),

  // ── ADDITIONAL 3D SCULPTURES ──
  m({
    id: 8,
    slug: "meditating-buddha-panel",
    title: "Meditating Buddha",
    category: "3D Sculptures",
    year: "2024",
    medium: "High-Relief Halo Sculpture",
    dimensions: "5 ft × 4 ft",
    image: art(3),
    gallery: [art(3)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A serene seated Buddha 3D sculpture framed by a carved circular ornamental halo.",
    fullDescription:
      "A peaceful sculptural composition featuring a seated Buddha in dhyana mudra with finely carved robe folds and a symmetrical mandala halo.",
  }),

  m({
    id: 9,
    slug: "sculpted-stallion-relief",
    title: "Sculpted Stallion",
    category: "3D Sculptures",
    year: "2024",
    medium: "Dynamic 3D Bas-Relief",
    dimensions: "3.5 ft × 3.5 ft",
    image: art(4),
    gallery: [art(4)],
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A high-projection 3D carved stallion emerging from a circular medallion frame.",
    fullDescription:
      "Captures muscular motion and anatomical precision in deep charcoal patina against a circular architectural backing.",
  }),

  m({
    id: 10,
    slug: "bespoke-figural-sculpture",
    title: "Balaji Consecrated Idol",
    category: "3D Sculptures",
    year: "2024",
    medium: "Custom 3D Carved Sculpture",
    dimensions: "4.5 ft × 2.5 ft",
    image: art(14),
    gallery: [art(14), art(15)],
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "Custom-commissioned 3D carved Lord Venkateswara idol finished in black stone patina and burnished gold.",
    fullDescription:
      "Handcrafted for residential prayer sanctuaries and private collections with sacred iconography and gold detailing.",
  }),

  // ── ADDITIONAL WALL MURALS ──
  m({
    id: 11,
    slug: "hanuman-sun-mural",
    title: "Hanuman & the Golden Sun",
    category: "Wall Murals",
    year: "2024",
    medium: "Mythological Wall Mural",
    dimensions: "12 ft × 8 ft",
    image: art(21),
    gallery: [art(21)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A monumental wall mural capturing Hanuman soaring across a radiant golden sky.",
    fullDescription:
      "Combines 3D sculptural relief with atmospheric amber and vermilion brushwork for dramatic feature walls.",
  }),

  m({
    id: 12,
    slug: "chariot-polychrome-mural",
    title: "Kurukshetra Epic Mural",
    category: "Wall Murals",
    year: "2024",
    medium: "3D Carved & Painted Wall Mural",
    dimensions: "10 ft × 5 ft",
    image: art(20),
    gallery: [art(20), art(22)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 68%",
    shortDescription:
      "Full-color gilded and painted version of the sacred chariot relief mural.",
    fullDescription:
      "Detailed with hand-applied mineral pigments, gold leaf accents, and multi-tiered depth.",
  }),

  m({
    id: 13,
    slug: "living-room-hanuman-mural",
    title: "Celestial Arch Wall Mural",
    category: "Wall Murals",
    year: "2024",
    medium: "Interior Feature Wall Mural",
    dimensions: "9 ft × 7 ft",
    image: art(7),
    gallery: [art(7), art(9)],
    fitMode: "contain",
    objectPosition: "50% 45%",
    shortDescription:
      "An arched residential wall mural integrating a 3D carved figure with painted mural backdrops.",
    fullDescription:
      "Designed to anchor contemporary living spaces with warm illumination and sculptural presence.",
  }),

  // ── ADDITIONAL INTERIOR PANELS ──
  m({
    id: 14,
    slug: "kalpavriksha-gold-panel",
    title: "Kalpavriksha Gold Panel",
    category: "Interior Panels",
    year: "2024",
    medium: "Gilded Interior Relief Panel",
    dimensions: "7 ft × 5 ft",
    image: art(17),
    gallery: [art(17), art(19)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 48%",
    shortDescription:
      "A burnished gold interior wall panel showcasing the sacred Tree of Life and Kamadhenu.",
    fullDescription:
      "Carved with deep botanical foliage to catch warm downlighting in luxury residential interiors.",
  }),

  m({
    id: 15,
    slug: "pooja-mandir-gopuram-arch",
    title: "Pooja Mandir Gopuram Arch",
    category: "Interior Panels",
    year: "2024",
    medium: "3D CNC Home Pooja Arch",
    dimensions: "7.5 ft × 4.5 ft",
    image: art(16),
    gallery: [art(16), art(11), art(12)],
    bestArt: true,
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "A multi-tiered traditional Gopuram arch carved in high-density 3D relief for residential pooja rooms.",
    fullDescription:
      "Designed as a bespoke residential pooja mandir backdrop frame featuring classical carved tiers, pillars, and gold-leaf kalashas.",
  }),

  m({
    id: 16,
    slug: "sanctuary-interior-panel",
    title: "Lotus & Nandi Wall Panel",
    category: "Interior Panels",
    year: "2024",
    medium: "Bespoke Interior Wall Panel",
    dimensions: "10 ft × 8 ft",
    image: art(5),
    gallery: [art(5), art(8)],
    fitMode: "contain",
    objectPosition: "50% 50%",
    shortDescription:
      "Full-wall decorative interior panel combining carved arches, lotus motifs, and sacred reliefs.",
    fullDescription:
      "Custom-fitted to interior architectural niches with integrated spotlighting.",
  }),
];

// Curated "Best Arts" order for the top Auto-Playing Showcase Carousel
export const bestArtworks = [
  artworks.find((a) => a.id === 6),  // 1. Lotus Ganesha Figure (Gold & Polychrome)
  artworks.find((a) => a.id === 1),  // 2. Shiva, Sculpted Bust
  artworks.find((a) => a.id === 12), // 3. Kurukshetra Epic Mural (Painted Chariot)
  artworks.find((a) => a.id === 5),  // 4. Hanuman, Devotional Bust
  artworks.find((a) => a.id === 11), // 5. Hanuman & the Golden Sun
  artworks.find((a) => a.id === 15), // 6. Temple Gopuram Sanctum Arch
  artworks.find((a) => a.id === 14), // 7. Kalpavriksha Gold Panel (Kamadhenu)
  artworks.find((a) => a.id === 8),  // 8. Meditating Buddha
].filter(Boolean);

export const price = (a) =>
  a.priceType === "fixed" && a.price != null
    ? `₹${Number(a.price).toLocaleString("en-IN")}`
    : a.priceType === "starting" && a.price != null
      ? `From ₹${Number(a.price).toLocaleString("en-IN")}`
      : "Price on Request";

export const WHATSAPP = "916309379050";
