import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Page from '../components/Page.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Detail from '../Detail.jsx';
import GlowCard from '../components/GlowCard.jsx';
import { artworks, categories, price } from '../data/artworks.js';
import { getArtworkGlow } from '../utils/glowPalette.js';

function ArtworkCard({ a, index }) {
    const glow = getArtworkGlow(a, index);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
        >
            <GlowCard
                glowColor={glow}
                className="group luxury-card rounded-sm overflow-hidden flex flex-col h-full bg-[#121212]/80 backdrop-blur-[2px]"
            >
                <Link to={`/collections/${a.slug}`} className="block h-full p-4 flex flex-col justify-between">
                    <div>
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#181818] border border-white/10">
                            <img
                                loading="lazy"
                                src={a.image}
                                alt={a.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 rounded-sm bg-[#0b0b0b]/80 border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">
                                {a.year} · {a.category}
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F4F0E8]/50">
                                {a.medium}
                            </p>
                            <h3 className="mt-1 font-serif text-2xl text-[#F4F0E8] group-hover:text-[#C5A880] transition-colors">
                                {a.title}
                            </h3>
                            <p className="mt-2 text-xs text-[#F4F0E8]/60 line-clamp-2">
                                {a.shortDescription}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                        <span className="font-serif text-sm text-[#C5A880] italic">{price(a)}</span>
                        <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.2em] text-[#F4F0E8]/80 group-hover:text-[#C5A880] transition-colors">
                            Details <ArrowRight size={12} />
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
                
                {/* Header */}
                <SectionHead
                    eyebrow="Curated Portfolio"
                    title="The Collections"
                    italicWord="Catalogue"
                >
                    Exemplary works hand-sculpted in our studio. Each composition can be customized in scale, depth relief, and surface patina to harmonize with your architectural space.
                </SectionHead>

                {/* Filter Pills */}
                <div
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
                </div>

                {/* Artworks Grid */}
                <motion.div
                    layout
                    className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredArtworks.map((a, idx) => (
                            <ArtworkCard key={a.slug} a={a} index={idx} />
                        ))}
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

