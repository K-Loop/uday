import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Page from '../components/Page.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Detail from '../Detail.jsx';
import GlowCard from '../components/GlowCard.jsx';
import { artworks, categories, price } from '../data/artworks.js';
import { getArtworkGlow } from '../utils/glowPalette.js';

function ExhibitionCard({ a, index, isHeroFeatured = false, isWide = false }) {
    const glow = getArtworkGlow(a, index);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.07 }}
            className={`flex flex-col ${
                isHeroFeatured
                    ? 'lg:col-span-8'
                    : isWide
                    ? 'lg:col-span-7 sm:col-span-12'
                    : 'lg:col-span-4 sm:col-span-6'
            }`}
        >
            <GlowCard
                glowColor={glow}
                className="group luxury-card rounded-sm overflow-hidden flex flex-col h-full bg-[#121212]/85 backdrop-blur-[2px] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-500"
            >
                <Link to={`/collections/${a.slug}`} className="block h-full p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                        {/* Artwork Image Frame */}
                        <div
                            className={`relative w-full overflow-hidden rounded-sm bg-[#181818] border border-white/10 ${
                                isHeroFeatured
                                    ? 'aspect-[16/10]'
                                    : isWide
                                    ? 'aspect-[16/11]'
                                    : 'aspect-[4/5]'
                            }`}
                        >
                            <img
                                loading="lazy"
                                src={a.image}
                                alt={a.title}
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-transparent to-transparent pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                                <span className="rounded-sm bg-[#0b0b0b]/90 border border-white/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-[#C5A880] font-medium backdrop-blur">
                                    N° {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="rounded-sm bg-[#0b0b0b]/80 border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[#F4F0E8]/70 backdrop-blur">
                                    {a.category}
                                </span>
                            </div>

                            {/* Featured Ribbon if large */}
                            {isHeroFeatured && (
                                <div className="absolute top-3 right-3 hidden sm:flex items-center gap-2 rounded-full bg-[#0b0b0b]/85 border border-[#C5A880]/40 px-3 py-1 backdrop-blur">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">
                                        Curator’s Selection
                                    </span>
                                </div>
                            )}

                            {/* Year / Dimensions indicator bottom of frame */}
                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#F4F0E8]/70">
                                <span>{a.year || '2024'}</span>
                                {a.dimensions && <span className="tracking-wider">{a.dimensions}</span>}
                            </div>
                        </div>

                        {/* Caption & Metadata */}
                        <div className="mt-5">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#C5A880] font-medium">
                                {a.medium}
                            </p>
                            <h3
                                className={`mt-1 font-serif text-[#F4F0E8] group-hover:text-[#C5A880] transition-colors leading-tight ${
                                    isHeroFeatured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'
                                }`}
                            >
                                {a.title}
                            </h3>
                            <p className="mt-2.5 text-xs sm:text-sm text-[#F4F0E8]/65 leading-relaxed line-clamp-2">
                                {a.shortDescription || a.fullDescription}
                            </p>
                        </div>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                        <span className="font-serif text-sm text-[#C5A880] italic">{price(a)}</span>
                        <span className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[#F4F0E8]/80 group-hover:text-[#C5A880] group-hover:translate-x-1.5 transition-all">
                            Examine Piece <ArrowRight size={13} />
                        </span>
                    </div>
                </Link>
            </GlowCard>
        </motion.article>
    );
}

export default function Collections() {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('c') || 'All Works';

    const filteredArtworks =
        activeCategory === 'All Works'
            ? artworks
            : artworks.filter((a) => a.category === activeCategory);

    const selectedArtwork = artworks.find((a) => a.slug === slug);

    return (
        <Page>
            <div className="mx-auto max-w-[1560px] px-6 py-16 md:px-12 lg:px-16">
                {/* Header with smooth stagger motion */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionHead
                        eyebrow="Curated Exhibition Archive"
                        title="The Living Collections"
                        italicWord="Catalogue"
                    >
                        Exemplary works hand-sculpted in our studio. Each composition can be customized in scale, projection relief depth, and mineral or 24K leaf patinas to harmonize with architectural space.
                    </SectionHead>
                </motion.div>

                {/* Filter Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 flex flex-wrap gap-2.5 pb-6 border-b border-white/10"
                    role="group"
                    aria-label="Filter by discipline"
                >
                    {categories.map((c) => {
                        const isCurrent = c === activeCategory;
                        return (
                            <button
                                key={c}
                                onClick={() => setSearchParams(c === 'All Works' ? {} : { c })}
                                aria-pressed={isCurrent}
                                className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                                    isCurrent
                                        ? 'bg-[#C5A880] text-[#0b0b0b] font-semibold shadow-[0_0_20px_rgba(197,168,128,0.3)]'
                                        : 'border border-white/15 text-[#F4F0E8]/70 hover:border-white/40 hover:text-[#F4F0E8]'
                                }`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Asymmetric Editorial Artwork Composition */}
                <motion.div
                    layout
                    className="mt-14 grid grid-cols-1 sm:grid-cols-12 gap-8 items-stretch"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredArtworks.map((a, idx) => {
                            // Layout rhythm: first piece is a grand hero showcase; subsequent pieces alternate between wide and gallery columns
                            const isHeroFeatured = idx === 0 && activeCategory === 'All Works';
                            const isWide = !isHeroFeatured && (idx % 5 === 1 || idx % 5 === 4);

                            return (
                                <ExhibitionCard
                                    key={a.slug}
                                    a={a}
                                    index={idx}
                                    isHeroFeatured={isHeroFeatured}
                                    isWide={isWide}
                                />
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredArtworks.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-sm text-[#F4F0E8]/60">
                            No archived works found in this category.
                        </p>
                        <Link
                            to="/contact"
                            className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-[#C5A880] underline"
                        >
                            Commission a custom piece in this style
                        </Link>
                    </div>
                )}
            </div>

            {/* Modal Detail Overlay */}
            <AnimatePresence>
                {selectedArtwork && (
                    <Detail
                        key="detail"
                        a={selectedArtwork}
                        list={filteredArtworks.includes(selectedArtwork) ? filteredArtworks : artworks}
                    />
                )}
            </AnimatePresence>
        </Page>
    );
}
