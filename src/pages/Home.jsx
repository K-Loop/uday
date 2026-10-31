import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Page from '../components/Page.jsx';
import GlowCard from '../components/GlowCard.jsx';
import ViewerSlot from '../three/ViewerSlot.jsx';
import { artworks, price } from '../data/artworks.js';
import { useReveal } from '../hooks/useReveal.js';

import { ART_GLOW_MAP as ART_GLOW } from '../utils/glowPalette.js';

// Framer Motion variants for guaranteed, visible staggered entrance in Hero on initial page load
const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
};

const heroMediaVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Home() {
    const pageRef = useReveal();
    const [highlightIndex, setHighlightIndex] = useState(0);

    const curatedHighlights = [
        { num: 'N° 01', yearMedium: '2024 · Sculpted Bas-Relief',          title: artworks[0].title, artwork: artworks[0] },
        { num: 'N° 02', yearMedium: '2024 · Layered Architectural Stone',  title: artworks[1].title, artwork: artworks[1] },
        { num: 'N° 03', yearMedium: '2023 · Temple Tower Architectural Relic', title: artworks[2].title, artwork: artworks[2] },
        { num: 'N° 04', yearMedium: '2024 · Zen Meditative Relief',        title: artworks[3].title, artwork: artworks[3] },
        { num: 'N° 05', yearMedium: '2024 · Kalpavriksha Gold-Leaf Relief', title: artworks[4].title, artwork: artworks[4] },
    ];

    const nextHighlight = () => setHighlightIndex((p) => (p + 1) % curatedHighlights.length);
    const prevHighlight = () => setHighlightIndex((p) => (p - 1 + curatedHighlights.length) % curatedHighlights.length);

    const disciplines = [
        { title: '3D Architectural Carvings',   desc: 'Multi-tiered wall reliefs sculpted with dramatic projection so ambient light articulates every curve and shadow.',                                                     art: artworks[1], colSpan: 'lg:col-span-7' },
        { title: 'Sacred Mythological Murals',   desc: 'Expansive wall murals drawn from classical epics, illuminated with natural mineral pigments and burnished gold accents.',                                            art: artworks[5], colSpan: 'lg:col-span-5' },
        { title: 'South Indian Temple Art',      desc: 'Intricate gopurams, sanctum portals, and miniature architectural tiers honoring centuries of stonecraft heritage.',                                                 art: artworks[2], colSpan: 'lg:col-span-5' },
        { title: 'Decorative Flora & Fauna',     desc: 'Sacred Kamadhenu, lotus haloes, and botanical Kalpavriksha panels crafted for contemplative contemporary sanctuaries.',                                            art: artworks[4], colSpan: 'lg:col-span-7' },
    ];

    return (
        <Page>
            <div ref={pageRef} className="relative">

                {/* ═══════════════════════════════════════════════════════════════
                    § 1  HERO — Cinematic editorial grid
                    ─ Staggered entrance via Framer Motion for visible smoothness
                    ─ GSAP Scroll depth: Parallax on thumbs, video drift, ghost drift
                    ═══════════════════════════════════════════════════════════════ */}
                <section
                    data-hero-scroll
                    className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-8 pb-16 border-b border-white/[0.08] overflow-hidden"
                >
                    {/* Subtle ambient glow */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-[#C5A880]/[0.03] blur-[150px]" />
                    </div>

                    {/* Ghost word — SCULPTURE with scroll parallax */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0 hidden lg:block">
                        <span
                            data-ghost-parallax
                            className="text-ghost absolute text-[26vw] leading-none left-[-4%] top-1/2 -translate-y-[48%]"
                        >
                            SCULPTURE
                        </span>
                    </div>

                    <motion.div
                        variants={heroContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 mx-auto w-full max-w-[1560px] grid gap-12 lg:grid-cols-12 items-center"
                    >
                        {/* ── Left column ─────────────────────────────── */}
                        <div data-hero-left className="lg:col-span-6 flex flex-col justify-center">

                            {/* Eyebrow teaser */}
                            <motion.div variants={heroItemVariants} className="flex items-start gap-4 mb-8 max-w-md">
                                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-sm border border-white/20 bg-[#161616]">
                                    <img
                                        src={artworks[3].image}
                                        alt="Teaser"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>
                                <p className="text-xs leading-relaxed text-[#F4F0E8]/60">
                                    Discover exclusive, hand-crafted pieces shaped from raw materials and deep intention at Uday Arts' studio showcase.
                                </p>
                            </motion.div>

                            {/* Main title */}
                            <motion.div variants={heroItemVariants}>
                                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-[#F4F0E8]/90 font-light">
                                    Discover
                                </p>
                                <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-light leading-[0.92] tracking-tight text-[#F4F0E8] mt-1">
                                    Timeless <span className="italic text-[#C5A880] font-normal">Art</span>
                                </h1>
                            </motion.div>

                            {/* Sub heading */}
                            <motion.div variants={heroItemVariants} className="mt-8 border-l border-[#C5A880]/50 pl-5">
                                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F0E8]/90 font-light">
                                    Crafted by <span className="italic text-[#C5A880]">Nature</span>,<br />
                                    Curated with — <span className="italic text-[#C5A880]">Soul</span>
                                </h2>
                            </motion.div>

                            {/* Body copy */}
                            <motion.div variants={heroItemVariants} className="mt-7 max-w-xl text-xs sm:text-sm leading-relaxed text-[#F4F0E8]/65 space-y-3">
                                <div className="text-[#C5A880] text-sm">❖</div>
                                <p>
                                    Each piece in the <span className="italic text-[#F4F0E8]">Uday Arts</span> collection is more than a work of art — it is a story. A moment captured in permanence.
                                </p>
                                <p>
                                    Uday Arts is a sanctuary for rare and meaningful creations born from raw natural elements, refined by master hands, and created for enduring architectural environments. We turn raw stone, clay, and mineral pigments into quiet masterpieces — each one meant to be felt, not just seen.
                                </p>
                            </motion.div>

                            {/* CTAs */}
                            <motion.div variants={heroItemVariants} className="mt-10 flex flex-wrap items-center gap-4">
                                <Link
                                    to="/collections"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#0b0b0b] transition-all duration-300 hover:bg-[#F4F0E8] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:-translate-y-0.5"
                                >
                                    Explore the Collection <ArrowRight size={14} />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-[#F4F0E8] transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880] hover:-translate-y-0.5"
                                >
                                    Commission a Work
                                </Link>
                            </motion.div>

                            {/* Artwork detail fragment — Gopuram temple detail (desktop only) */}
                            <motion.div variants={heroItemVariants} className="hidden lg:flex items-end gap-4 mt-14 pt-6 border-t border-white/[0.07]">
                                <div
                                    data-parallax="0.08"
                                    className="relative w-20 h-24 shrink-0 overflow-hidden rounded-sm border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.7)] group"
                                >
                                    <img
                                        src={artworks[2].image}
                                        alt="Temple architectural detail"
                                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#C5A880]/70 font-medium">Detail Study</p>
                                    <p className="text-[10px] text-[#F4F0E8]/45 mt-0.5 leading-snug max-w-[180px]">Gopuram tier — carved architectural elevation</p>
                                    <p className="text-[9px] text-[#C5A880]/40 mt-1 uppercase tracking-widest">Temple Art · 2023</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right column: video + companions ─────────── */}
                        <div className="lg:col-span-6 relative flex flex-col justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                                {/* Video card — motion.div wrapper handles entrance, inner div handles GSAP scroll translation */}
                                <motion.div variants={heroMediaVariants} className="sm:col-span-12">
                                    <div data-hero-video className="w-full">
                                        <GlowCard
                                            glowColor={ART_GLOW.video}
                                            className="relative w-full aspect-[16/9] rounded-sm border border-white/20 bg-[#121212] p-2.5 sm:p-3 shadow-[0_30px_80px_rgba(0,0,0,0.9)] group hover:border-[#C5A880]/70 transition-all duration-500"
                                        >
                                            <div className="relative h-full w-full overflow-hidden rounded-sm bg-black">
                                                <video
                                                    src="/video/mural.mp4"
                                                    poster="/video/mural-poster.jpg"
                                                    autoPlay muted loop playsInline preload="auto"
                                                    className="h-full w-full object-cover object-[35%_50%] transition-transform duration-1000 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-black/20 to-[#0b0b0b]/40 pointer-events-none" />
                                                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-[#0b0b0b]/85 border border-[#C5A880]/30 px-3 py-1 backdrop-blur">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                                                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A880] font-medium">Living Atelier · Process</span>
                                                </div>
                                                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">Studio Mastercraft</p>
                                                        <h3 className="font-serif text-base sm:text-xl text-[#F4F0E8] font-light mt-0.5">Sacred Bas-Relief Mural in Progress</h3>
                                                    </div>
                                                    <Link to="/craft" className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[9px] uppercase tracking-[0.2em] backdrop-blur hover:bg-[#C5A880] hover:text-[#0b0b0b] hover:border-[#C5A880] transition-all flex items-center gap-1.5 text-[#F4F0E8]">
                                                        Our Craft <ArrowRight size={11} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </div>
                                </motion.div>

                                {/* Companion: Shiva Relief */}
                                <motion.div variants={heroMediaVariants} className="sm:col-span-6">
                                    <div data-hero-thumb-left className="w-full">
                                        <GlowCard glowColor={ART_GLOW[0]} className="relative w-full aspect-[4/3] rounded-sm border border-white/15 bg-[#141414] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#C5A880]/60 transition-colors">
                                            <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#181818]">
                                                <img
                                                    src={artworks[0].image}
                                                    alt="Signature Shiva Relief"
                                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-transparent to-transparent pointer-events-none" />
                                                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">Signature Relief</span>
                                                    <Link to={`/collections/${artworks[0].slug}`} className="text-[9px] uppercase tracking-wider text-white/70 hover:text-[#C5A880]">View →</Link>
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </div>
                                </motion.div>

                                {/* Companion: Kalpavriksha Gold */}
                                <motion.div variants={heroMediaVariants} className="sm:col-span-6">
                                    <div data-hero-thumb-right className="w-full">
                                        <GlowCard glowColor={ART_GLOW[4]} className="relative w-full aspect-[4/3] rounded-sm border border-white/15 bg-[#141414] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#C5A880]/60 transition-colors">
                                            <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#181818]">
                                                <img
                                                    src={artworks[4].image}
                                                    alt="Kalpavriksha Gold Relief"
                                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-transparent to-transparent pointer-events-none" />
                                                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#DFCAAB]">24K Gold Leafing</span>
                                                    <Link to={`/collections/${artworks[4].slug}`} className="text-[9px] uppercase tracking-wider text-white/70 hover:text-[#C5A880]">View →</Link>
                                                </div>
                                            </div>
                                        </GlowCard>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Scroll indicator */}
                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-[#F4F0E8]/50 text-xs uppercase tracking-[0.25em]">
                                <span className="h-5 w-px bg-[#C5A880]" />
                                <span>Scroll Down ↓</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    § 2  HIGHLIGHTS — Curated carousel
                    Ghost: COLLECTION right anchor
                    Image reveal: Progressive vertical clip reveal with scale settle
                    ═══════════════════════════════════════════════════════════════ */}
                <section className="relative px-6 py-28 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#0b0b0b]/60 backdrop-blur-[2px] overflow-hidden">
                    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
                        <span data-ghost-parallax className="text-ghost absolute text-[12vw] top-[52%] -translate-y-1/2 right-[-1%]">COLLECTION</span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1560px]">
                        {/* Header */}
                        <div data-stagger className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/10">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium">Highlights from the Collection</p>
                                <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F4F0E8]">
                                    A curated selection <span className="italic text-[#C5A880]">of</span> exceptional works
                                </h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button onClick={prevHighlight} aria-label="Previous artwork" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880]">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextHighlight} aria-label="Next artwork" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880]">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                                <Link to="/collections" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880]">
                                    View Full Gallery <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>

                        {/* Cards grid */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[0, 1, 2].map((offset) => {
                                const idx = (highlightIndex + offset) % curatedHighlights.length;
                                const item = curatedHighlights[idx];
                                const artIdx = artworks.indexOf(item.artwork);
                                return (
                                    <GlowCard
                                        as="article"
                                        key={item.artwork.slug}
                                        glowColor={ART_GLOW[artIdx] || ART_GLOW[0]}
                                        className="group flex flex-col"
                                        data-reveal
                                    >
                                        <Link to={`/collections/${item.artwork.slug}`} className="block">
                                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10 bg-[#161616]" data-clip>
                                                <img
                                                    loading="lazy"
                                                    src={item.artwork.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                                <div className="absolute top-4 left-4 rounded-sm bg-[#0b0b0b]/80 px-2.5 py-1 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                                                    {item.num}
                                                </div>
                                            </div>
                                            <div className="mt-5 border-t border-white/10 pt-4">
                                                <p className="text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8]/50">{item.yearMedium}</p>
                                                <h3 className="mt-1 font-serif text-2xl text-[#F4F0E8] group-hover:text-[#C5A880] transition-colors">{item.title}</h3>
                                                <p className="mt-1 text-xs text-[#C5A880] italic">{price(item.artwork)}</p>
                                            </div>
                                        </Link>
                                    </GlowCard>
                                );
                            })}
                        </div>

                        <div className="mt-10 sm:hidden text-center">
                            <Link to="/collections" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#F4F0E8]">
                                View Full Gallery <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    § 3  LIVING ARCHIVE — Editorial disciplines grid
                    Image reveal: Alternating horizontal / vertical reveals
                    ═══════════════════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#0b0b0b]/60 backdrop-blur-[2px]">
                    {/* Watermark */}
                    <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 select-none overflow-hidden opacity-30 text-center">
                        <span className="font-serif text-[12vw] font-bold tracking-[0.15em] text-watermark whitespace-nowrap">
                            THE SOUL OF THE GALLERY
                        </span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1560px]">
                        <div data-stagger className="flex items-center gap-4 mb-16">
                            <span className="h-px w-16 bg-[#C5A880]" />
                            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F4F0E8]">
                                The Living Archive <span className="italic text-[#C5A880]">of</span> Uday Arts
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {disciplines.map((d, idx) => {
                                const artIdx = artworks.indexOf(d.art);
                                const isEven = idx % 2 === 0;
                                return (
                                    <GlowCard
                                        as="article"
                                        key={d.title}
                                        glowColor={ART_GLOW[artIdx] || ART_GLOW[1]}
                                        className={`${d.colSpan} luxury-card p-6 md:p-8 rounded-sm group`}
                                        data-reveal
                                    >
                                        <Link to={`/collections?c=${encodeURIComponent(d.art.category)}`} className="block">
                                            <div
                                                {...(isEven ? { 'data-clip': true } : { 'data-clip-horizontal': true })}
                                                className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#181818] border border-white/10"
                                            >
                                                <img
                                                    loading="lazy"
                                                    src={d.art.image}
                                                    alt={d.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <span className="absolute top-4 left-4 rounded-sm bg-[#0b0b0b]/80 border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                                                    Archive 0{idx + 1}
                                                </span>
                                            </div>
                                            <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">{d.art.category}</p>
                                                    <h3 className="mt-1 font-serif text-2xl md:text-3xl text-[#F4F0E8]">{d.title}</h3>
                                                    <p className="mt-2 max-w-lg text-xs md:text-sm text-[#F4F0E8]/65 leading-relaxed">{d.desc}</p>
                                                </div>
                                                <span className="inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] transition-transform duration-300 group-hover:translate-x-1">
                                                    Explore Archive <ArrowRight size={13} />
                                                </span>
                                            </div>
                                        </Link>
                                    </GlowCard>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    § 4  INTERACTIVE SIGNATURE RELIEF
                    Ghost: FORM bottom-right with subtle scrub
                    ═══════════════════════════════════════════════════════════════ */}
                <section className="relative px-6 py-28 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#0b0b0b]/60 backdrop-blur-[2px] overflow-hidden">
                    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
                        <span data-ghost-parallax className="text-ghost absolute text-[20vw] right-[-3%] bottom-[-8%]">FORM</span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1560px] grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6" data-parallax="0.06">
                            <GlowCard glowColor={ART_GLOW[0]} glowRadius="180%">
                                <ViewerSlot src={artworks[0].image} alt={artworks[0].title} />
                            </GlowCard>
                        </div>

                        <div className="lg:col-span-6" data-stagger>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-6 bg-[#C5A880]" />
                                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880]">Interactive Relief Lighting</p>
                            </div>
                            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#F4F0E8]">
                                {artworks[0].title}
                            </h2>
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#F4F0E8]/50">
                                Hand-Carved High Relief · Responsive Gallery Lighting
                            </p>
                            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#F4F0E8]/70 max-w-lg">
                                {artworks[0].fullDescription}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to={`/collections/${artworks[0].slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0b0b] transition-all hover:bg-[#F4F0E8] hover:-translate-y-0.5">
                                    Examine Artwork Details <ArrowRight size={14} />
                                </Link>
                                <Link to={`/contact?artwork=${artworks[0].slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880] hover:-translate-y-0.5">
                                    Commission This Style
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    § 5  ARTISAN STORYTELLING
                    Ghost: HERITAGE left with scrub
                    Artwork fragment: gold-leaf detail strip below portraits
                    ═══════════════════════════════════════════════════════════════ */}
                <section className="relative px-6 py-28 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#090909]/70 backdrop-blur-[2px] overflow-hidden">
                    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
                        <span data-ghost-parallax className="text-ghost absolute text-[16vw] left-[-1%] top-1/2 -translate-y-1/2">HERITAGE</span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1560px] grid lg:grid-cols-12 gap-14 items-center">

                        {/* Left: editorial text */}
                        <div className="lg:col-span-6 space-y-6" data-stagger>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#C5A880]" />
                                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium">The Sculptural Philosophy</p>
                            </div>
                            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F4F0E8] leading-[1.08]">
                                Every Masterpiece <span className="italic text-[#C5A880]">Begins with</span> a Vision.
                            </h2>
                            <p className="text-sm md:text-base leading-relaxed text-[#F4F0E8]/75 pt-2">
                                At Uday Arts, relief sculpting is an intimate dialogue with permanence. From raw unshaped clay and natural mineral pigments to graduated high-relief carvings, each piece is born from architectural intent and classical proportion.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed text-[#F4F0E8]/65">
                                We sculpt tactile sacred geometry, mythological moments, and site-specific wall reliefs that breathe under dynamic room lighting — transforming residential sanctuaries and architectural focal walls into enduring heirlooms.
                            </p>
                            <div className="pt-4 flex flex-wrap items-center gap-4">
                                <Link to="/craft" className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0b0b] transition-all hover:bg-[#F4F0E8] hover:-translate-y-0.5">
                                    Traverse Our Craft <ArrowRight size={13} />
                                </Link>
                                <Link to="/studio" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880] hover:-translate-y-0.5">
                                    Inside The Atelier
                                </Link>
                            </div>
                        </div>

                        {/* Right: portrait grid + material detail */}
                        <div className="lg:col-span-6 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <GlowCard glowColor={ART_GLOW[1]} className="rounded-sm">
                                    <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-[#141414]" data-clip>
                                        <img
                                            loading="lazy"
                                            src={artworks[1].image}
                                            alt="High-relief architectural carving"
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                </GlowCard>
                                <GlowCard glowColor={ART_GLOW[5]} className="rounded-sm mt-8">
                                    <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-[#141414]" data-clip-horizontal>
                                        <img
                                            loading="lazy"
                                            src={artworks[5].image}
                                            alt="Mythological mural detailing"
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                </GlowCard>
                            </div>

                            {/* Gold-leaf material detail fragment (desktop only) */}
                            <div className="hidden lg:flex items-center gap-3 pt-2 border-t border-white/[0.06]" data-reveal>
                                <div className="relative w-16 h-10 shrink-0 overflow-hidden rounded-sm border border-[#C5A880]/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                                    <img
                                        src={artworks[4].image}
                                        alt="24K gold leaf surface detail"
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-[#C5A880]/10" />
                                </div>
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.3em] text-[#C5A880]/60">Material Study — Gold Leaf Application</p>
                                    <p className="text-[9px] text-[#F4F0E8]/35 mt-0.5">24K gold foil, mineral binders · Kalpavriksha panel detail</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    § 6  COMMISSIONS INVITATION
                    Clean card — intentional negative space preserved
                    ═══════════════════════════════════════════════════════════════ */}
                <section className="relative px-6 py-28 md:px-12 lg:px-16 bg-[#0b0b0b]/60 backdrop-blur-[2px]">
                    <div data-stagger className="mx-auto max-w-4xl rounded-sm border border-white/10 bg-[#121212] p-8 md:p-16 text-center shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880]">Private &amp; Architectural Commissions</span>
                        <h2 className="mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F4F0E8]">
                            A Work Created for <span className="italic text-[#C5A880]">Your Space.</span>
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-sm md:text-base text-[#F4F0E8]/70 leading-relaxed">
                            Every wall possesses unique proportions, viewing angles, and natural lighting. We collaborate with architects, interior designers, and collectors to sculpt site-specific masterworks.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#0b0b0b] transition-all hover:bg-[#F4F0E8] hover:-translate-y-0.5">
                                Discuss a Commission <ArrowRight size={14} />
                            </Link>
                            <Link to="/craft" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880] hover:-translate-y-0.5">
                                Explore Our Process
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </Page>
    );
}
