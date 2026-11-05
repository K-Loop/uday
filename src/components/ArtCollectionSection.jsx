import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { artworks, bestArtworks, categories } from '../data/artworks.js';

// ──────────────────────────────────────────────────────────────────
// Smart Dual-Layer Museum Artwork Frame
// Ensures NO vertical sculpture/idol/mural is ever cut in half ("half half gone")
// when placed inside wide or horizontal cards, while filling the card edge-to-edge
// with a rich, color-matched ambient studio backdrop.
// ──────────────────────────────────────────────────────────────────
function ArtworkFramedImage({ artItem, isTallSlot = false }) {
  // Shiva Bust (id: 1) fits the tall vertical left slot (index 0) naturally with object-cover;
  // The Chariot Relief (id: 2) is a horizontal panel inside the photo framed at 50% 82%.
  // All other vertical sculptures/idols use full-height object-contain over an ambient blurred studio fill.
  const useCover =
    artItem.fitMode === 'cover' || (isTallSlot && artItem.id === 1);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0E0B08]">
      {/* Layer 1: Edge-to-Edge Color-Matched Ambient Studio Backdrop (eliminates black bars) */}
      <img
        src={artItem.image}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center scale-110 blur-xl opacity-45 brightness-75"
      />

      {/* Subtle warm studio vignette between backdrop and sharp sculpture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0A0806]/25"
      />

      {/* Layer 2: Crisp, Properly Aligned Artwork (Full Sculpture Visible — Zero Cut Heads/Crowns) */}
      <img
        src={artItem.image}
        alt={artItem.title}
        loading="eager"
        decoding="async"
        style={{
          objectPosition: artItem.objectPosition || '50% 50%',
        }}
        className={`relative z-[1] h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
          useCover ? 'object-cover' : 'object-contain pb-6 pt-2 px-2'
        }`}
      />
    </div>
  );
}

export default function ArtCollectionSection({ onSelectArtworkForQuote }) {
  const [activeCategory, setActiveCategory] = useState('All Creations');
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalGalleryIndex, setModalGalleryIndex] = useState(0);

  const sectionRef = useRef(null);

  // Lightweight scroll-reactive golden corner aura
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const auraOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.15, 0.85, 0.85, 0.15]
  );

  // ══════════════════════════════════════════════════════════════════
  // 1. TOP "BEST ARTS" AUTO-PLAYING SHOWCASE CAROUSEL (Above Gallery)
  // Auto-advances every 3.2s with interactive pagination dots
  // ══════════════════════════════════════════════════════════════════
  const [bestEmblaRef, bestEmblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  });
  const [bestSelectedIndex, setBestSelectedIndex] = useState(0);
  const [bestIsHovered, setBestIsHovered] = useState(false);

  const onBestSelect = useCallback((api) => {
    if (!api) return;
    setBestSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!bestEmblaApi) return;
    onBestSelect(bestEmblaApi);
    bestEmblaApi.on('select', onBestSelect);
    bestEmblaApi.on('reInit', onBestSelect);
    return () => {
      bestEmblaApi.off('select', onBestSelect);
      bestEmblaApi.off('reInit', onBestSelect);
    };
  }, [bestEmblaApi, onBestSelect]);

  // Auto-advance ("auto go") timer for the Best Arts Carousel
  useEffect(() => {
    if (!bestEmblaApi || bestIsHovered || selectedArtwork) return;
    const timer = setInterval(() => {
      bestEmblaApi.scrollNext();
    }, 3200);
    return () => clearInterval(timer);
  }, [bestEmblaApi, bestIsHovered, selectedArtwork]);

  // ══════════════════════════════════════════════════════════════════
  // 2. BOTTOM EXPANDABLE ARCHIVE CAROUSEL (When "Explore All Creations" is clicked)
  // ══════════════════════════════════════════════════════════════════
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [carouselProgress, setCarouselProgress] = useState(0);

  const onEmblaScroll = useCallback((api) => {
    if (!api) return;
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setCarouselProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onEmblaScroll(emblaApi);
    emblaApi.on('scroll', onEmblaScroll);
    emblaApi.on('reInit', onEmblaScroll);
    return () => {
      emblaApi.off('scroll', onEmblaScroll);
      emblaApi.off('reInit', onEmblaScroll);
    };
  }, [emblaApi, onEmblaScroll]);

  // Filter artworks based on active category using actual artwork categories
  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'All Creations') {
      const featured = artworks.filter((a) => a.featured);
      const rest = artworks.filter((a) => !a.featured);
      return [...featured, ...rest];
    }
    return artworks.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // Primary 4 cards for the asymmetric editorial masonry grid
  const primaryFour = filteredArtworks.slice(0, 4);
  // Additional works for the interactive Embla Carousel when "Explore All Creations" is toggled
  const extraWorks = filteredArtworks.slice(4);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setShowAllWorks(false);
  };

  const handleOpenArtworkModal = (artItem) => {
    setSelectedArtwork(artItem);
    setModalGalleryIndex(0);
  };

  const modalGalleryImages = useMemo(() => {
    if (!selectedArtwork) return [];
    const list =
      selectedArtwork.gallery && selectedArtwork.gallery.length > 0
        ? selectedArtwork.gallery
        : [selectedArtwork.image];
    return Array.from(new Set(list));
  }, [selectedArtwork]);

  return (
    <section
      ref={sectionRef}
      id="art-collection"
      className="relative w-full min-h-[100svh] py-20 sm:py-24 lg:py-28 overflow-hidden select-none bg-[#090705]"
    >
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 02 BACKGROUND (/Background2.png) — GPU Cached Layer
          With Top & Bottom Feather Mask to Eliminate Any Horizontal Seam
          ══════════════════════════════════════════════════════════════════ */}
      <div className="section-bg-feather-both pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Background2.webp"
          alt=""
          loading="eager"
          decoding="async"
          style={{ transform: 'translate3d(0,0,0)' }}
          className="h-full w-full object-cover object-center"
        />

        {/* Dynamic Scroll-Reactive Golden Corner Sunbeam Aura */}
        <motion.div
          style={{
            opacity: auraOpacity,
            background:
              'radial-gradient(circle at 12% 10%, rgba(238, 185, 92, 0.16) 0%, transparent 42%), radial-gradient(circle at 86% 88%, rgba(232, 178, 84, 0.14) 0%, transparent 42%)',
          }}
          className="absolute inset-0 will-change-[opacity]"
        />

        {/* Subtle dark radial polish to keep cards & typography crisp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(10, 8, 6, 0.14) 0%, rgba(9, 7, 5, 0.5) 100%)',
          }}
        />
      </div>

      {/* Top & Bottom Multi-Stop Atmospheric Velvet Bridges (Zero Seam Guarantee) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36"
        style={{
          background:
            'linear-gradient(180deg, #090705 0%, rgba(9, 7, 5, 0.72) 38%, rgba(9, 7, 5, 0) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            'linear-gradient(0deg, #090705 0%, rgba(9, 7, 5, 0.78) 42%, rgba(9, 7, 5, 0) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          FOREGROUND CONTENT CONTAINER
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-5 sm:px-10 lg:px-[5.5%]">
        {/* ── 1. SECTION IDENTITY HEADER: Standalone "02" | Gold Divider | Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7 lg:gap-9"
        >
          {/* Large Standalone "02" */}
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-9">
            <span
              className="gold-number-02 text-[64px] sm:text-[82px] lg:text-[96px] xl:text-[106px] leading-none select-none"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              02
            </span>

            {/* Sophisticated Gold Vertical Divider */}
            <span
              aria-hidden="true"
              className="h-[62px] sm:h-[78px] lg:h-[90px] w-[1.5px] shrink-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(246, 212, 132, 0.12) 0%, #E8B860 50%, rgba(246, 212, 132, 0.12) 100%)',
              }}
            />
          </div>

          {/* Eyebrow, Main Heading & Description */}
          <div>
            {/* Eyebrow: Gold Line + THE ART COLLECTION */}
            <div className="flex items-center gap-3.5 mb-1.5">
              <span className="h-[1.5px] w-9 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
              <span className="text-[11px] sm:text-[12.5px] uppercase tracking-[0.34em] text-[#EAE3D5] font-normal">
                THE ART COLLECTION
              </span>
            </div>

            {/* Main Heading: Sculpted Stories. Timeless Walls. */}
            <h2
              className="text-[30px] sm:text-[42px] lg:text-[50px] xl:text-[58px] leading-[1.08] tracking-[-0.01em] font-normal text-[#F7F4EE]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Sculpted Stories.{' '}
              <span className="gold-italic-text pr-1">Timeless</span> Walls.
            </h2>

            {/* Description */}
            <p className="mt-2 text-[13.5px] sm:text-[15.5px] xl:text-[17px] font-light tracking-[0.015em] text-[#D2CBBF]">
              Bespoke 3D figures, divine sculptures and intricately carved wall
              art.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            2. TOP "BEST ARTS" AUTO-PLAYING SHOWCASE CAROUSEL (FIRST ABOVE GALLERY)
            Auto-rotates through UDAY ARTS' signature masterpieces with dots
            ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setBestIsHovered(true)}
          onMouseLeave={() => setBestIsHovered(false)}
          className="mt-8 sm:mt-10 mb-10 sm:mb-12"
        >
          {/* Best Arts Header Bar */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#E8B860] shadow-[0_0_10px_#E8B860]" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-[#F5D88E] font-medium">
                Best Arts Showcase · Auto Carousel
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Previous best artwork"
                onClick={() => bestEmblaApi && bestEmblaApi.scrollPrev()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next best artwork"
                onClick={() => bestEmblaApi && bestEmblaApi.scrollNext()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* Best Arts Embla Viewport */}
          <div
            ref={bestEmblaRef}
            data-lenis-prevent
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex -ml-5">
              {bestArtworks.map((artItem, idx) => {
                const badgeNum = String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={`best-${artItem.id}`}
                    className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-1/2 lg:basis-1/3 pl-5"
                  >
                    <article
                      onClick={() => handleOpenArtworkModal(artItem)}
                      className="gallery-gold-card group relative h-[340px] sm:h-[380px] xl:h-[410px] overflow-hidden rounded-[16px] cursor-pointer"
                    >
                      {/* Full Uncropped Dual-Layer Studio Frame */}
                      <ArtworkFramedImage artItem={artItem} />

                      {/* Top-Left "BEST ART" Gold Badge */}
                      <div className="absolute top-3.5 left-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#E8B860]/50 bg-[#100C08]/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#FBE39E]">
                        <span>★ Best Art {badgeNum}</span>
                      </div>

                      {/* Bottom Vignette for Caption Legibility */}
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(8, 6, 4, 0) 0%, rgba(8, 6, 4, 0.72) 48%, rgba(8, 6, 4, 0.94) 100%)',
                        }}
                      />

                      {/* Specular Top & Bottom Rim Highlights */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10 h-[1.5px] w-28 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-85"
                      />

                      {/* Caption Overlay */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex items-end justify-between gap-3">
                        <div>
                          <h3
                            className="text-[19px] sm:text-[21px] leading-snug text-[#F7F4EE] group-hover:text-[#FBE39E] transition-colors"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            {artItem.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2.5">
                            <span className="h-[1.5px] w-6 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
                            <p className="text-[11.5px] font-light text-[#D8D1C4]">
                              {artItem.medium}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full border border-[#D8A54B]/40 bg-black/60 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.16em] text-[#F5D88E]">
                          {artItem.category}
                        </span>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Pagination Dots ("auto go dots") */}
          <div
            role="tablist"
            aria-label="Best Arts Carousel Pagination"
            className="mt-5 flex items-center justify-center gap-2.5"
          >
            {bestArtworks.map((item, idx) => {
              const isSelected = idx === bestSelectedIndex;
              return (
                <button
                  key={`dot-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to Best Art ${idx + 1}: ${item.title}`}
                  onClick={() => bestEmblaApi && bestEmblaApi.scrollTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-8 bg-gradient-to-r from-[#FFF0B8] via-[#E8B860] to-[#C88E35] shadow-[0_0_12px_rgba(232,184,96,0.8)]'
                      : 'w-2.5 bg-white/25 hover:bg-white/55'
                  }`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ── 3. FUNCTIONAL CATEGORY FILTER BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          role="tablist"
          aria-label="Artwork Categories"
          className="mt-6 sm:mt-8 mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-y-3"
        >
          {categories.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <div key={category} className="flex items-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-2 py-1.5 text-[13px] sm:text-[15px] xl:text-[16px] tracking-[0.03em] transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#F7F4EE] font-medium'
                      : 'text-[#C9C1B4] font-light hover:text-[#F7F4EE]'
                  }`}
                >
                  <span>{category}</span>

                  {/* Active Golden Underline */}
                  {isActive && (
                    <motion.span
                      layoutId="artCollectionCategoryUnderline"
                      className="nav-active-underline absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                    />
                  )}
                </button>

                {index < categories.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-3 sm:mx-6 lg:mx-8 xl:mx-10 h-3.5 w-px bg-white/20"
                  />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── 4. ASYMMETRIC EDITORIAL MASONRY GRID (With Zero-Clip Alignment) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-5 xl:gap-6 lg:h-[580px] xl:h-[640px]"
          >
            {primaryFour.map((artItem, index) => {
              const numLabel = String(index + 1).padStart(2, '0');

              let gridSpanClass = '';
              if (index === 0) {
                gridSpanClass =
                  'md:col-span-2 lg:col-span-4 lg:row-span-2 min-h-[380px] sm:min-h-[440px] lg:min-h-0';
              } else if (index === 1) {
                gridSpanClass =
                  'md:col-span-2 lg:col-span-8 lg:row-span-1 min-h-[260px] sm:min-h-[300px] lg:min-h-0';
              } else {
                gridSpanClass =
                  'md:col-span-1 lg:col-span-4 lg:row-span-1 min-h-[250px] sm:min-h-[280px] lg:min-h-0';
              }

              return (
                <motion.article
                  key={artItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleOpenArtworkModal(artItem)}
                  className={`gallery-gold-card group relative overflow-hidden rounded-[14px] cursor-pointer ${gridSpanClass}`}
                >
                  {/* Properly Aligned Dual-Layer Studio Frame — Never Cuts Sculptures in Half */}
                  <ArtworkFramedImage
                    artItem={artItem}
                    isTallSlot={index === 0}
                  />

                  {/* Bottom Vignette for Crisp Caption Readability */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10, 8, 6, 0) 0%, rgba(10, 8, 6, 0.65) 48%, rgba(8, 6, 4, 0.92) 100%)',
                    }}
                  />

                  {/* Specular Golden Rim Highlights on Card Edges */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-[12%] z-10 h-[1.5px] w-28 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-85 shadow-[0_0_12px_#F7D788]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-[28%] z-10 h-[1.5px] w-32 bg-gradient-to-r from-transparent via-[#F7D788] to-transparent opacity-75 shadow-[0_0_12px_#F7D788]"
                  />
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[18%] left-0 z-10 w-[1.5px] h-28 bg-gradient-to-b from-transparent via-[#FFF0B8] to-transparent opacity-85 shadow-[0_0_12px_#F7D788]"
                    />
                  )}

                  {/* Editorial Caption Overlay (Bottom-Left) */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 xl:p-7 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-[19px] sm:text-[22px] xl:text-[25px] leading-snug text-[#F7F4EE]">
                        <span className="font-sans font-light text-[#E5DFD3] mr-1.5">
                          {numLabel} —
                        </span>
                        <span
                          className="font-normal transition-colors group-hover:text-[#FBE39E]"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {artItem.title}
                        </span>
                      </h3>

                      <div className="mt-1.5 flex items-center gap-3">
                        <span className="h-[1.5px] w-7 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
                        <p className="text-[11.5px] sm:text-[13px] font-light tracking-[0.025em] text-[#D8D1C4]">
                          {artItem.medium}
                        </p>
                      </div>
                    </div>

                    {/* Subtle Category Pill on Hover */}
                    <span className="hidden sm:inline-flex items-center rounded-full border border-[#D8A54B]/40 bg-black/65 px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-[#F5D88E] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {artItem.category}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── 5. INTERACTIVE EMBLA ARCHIVE CAROUSEL (When "Explore All Creations" is toggled) ── */}
        <AnimatePresence>
          {showAllWorks && extraWorks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                {/* Carousel Header & Navigation Controls */}
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-[1.5px] w-7 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
                    <span className="text-xs uppercase tracking-[0.26em] text-[#EAE3D5]">
                      Archive Showcase Carousel · Drag or Use Arrows
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous creations"
                      onClick={() => emblaApi && emblaApi.scrollPrev()}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Next creations"
                      onClick={() => emblaApi && emblaApi.scrollNext()}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Embla Viewport */}
                <div
                  ref={emblaRef}
                  data-lenis-prevent
                  className="overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  <div className="flex -ml-5">
                    {extraWorks.map((artItem, idx) => {
                      const numLabel = String(idx + 5).padStart(2, '0');
                      return (
                        <div
                          key={artItem.id}
                          className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5"
                        >
                          <article
                            onClick={() => handleOpenArtworkModal(artItem)}
                            className="gallery-gold-card group relative h-[320px] sm:h-[350px] overflow-hidden rounded-[14px] cursor-pointer"
                          >
                            <ArtworkFramedImage artItem={artItem} />
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24"
                              style={{
                                background:
                                  'linear-gradient(180deg, rgba(10, 8, 6, 0) 0%, rgba(10, 8, 6, 0.7) 50%, rgba(8, 6, 4, 0.94) 100%)',
                              }}
                            />
                            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                              <h3 className="text-[18px] sm:text-[20px] leading-snug text-[#F7F4EE]">
                                <span className="font-sans font-light text-[#E5DFD3] mr-1.5">
                                  {numLabel} —
                                </span>
                                <span
                                  className="font-normal group-hover:text-[#FBE39E] transition-colors"
                                  style={{ fontFamily: 'var(--font-serif)' }}
                                >
                                  {artItem.title}
                                </span>
                              </h3>
                              <div className="mt-1.5 flex items-center gap-2.5">
                                <span className="h-[1.5px] w-6 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
                                <p className="text-[11.5px] font-light text-[#D8D1C4]">
                                  {artItem.medium}
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Golden Progress Track */}
                <div className="mt-5 mx-auto max-w-md h-[2px] rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C88E35] via-[#FBE39E] to-[#FFF0B8] transition-all duration-150"
                    style={{ width: `${Math.max(15, carouselProgress)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. BOTTOM "Explore All Creations →" CTA WITH FLANKING GOLD LINES ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="mt-10 sm:mt-12 xl:mt-14 flex items-center justify-center gap-5 sm:gap-8"
        >
          <span
            aria-hidden="true"
            className="h-[1px] w-20 sm:w-40 lg:w-56"
            style={{
              background:
                'linear-gradient(90deg, rgba(216, 165, 75, 0) 0%, rgba(216, 165, 75, 0.65) 100%)',
            }}
          />

          <button
            type="button"
            onClick={() => {
              if (activeCategory !== 'All Creations') {
                setActiveCategory('All Creations');
                setShowAllWorks(true);
              } else {
                setShowAllWorks((prev) => !prev);
              }
            }}
            className="group inline-flex items-center gap-3 text-[19px] sm:text-[22px] xl:text-[24px] text-[#E8BE69] hover:text-[#FFF0B8] transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <span>
              {showAllWorks ? 'Hide Archive Carousel' : 'Explore All Creations'}
            </span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 not-italic transition-transform duration-300 group-hover:translate-x-1.5"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span
            aria-hidden="true"
            className="h-[1px] w-20 sm:w-40 lg:w-56"
            style={{
              background:
                'linear-gradient(270deg, rgba(216, 165, 75, 0) 0%, rgba(216, 165, 75, 0.65) 100%)',
            }}
          />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ARTWORK DETAIL LIGHTBOX MODAL (WITH MULTI-PHOTO CAROUSEL)
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 select-text"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative grid w-full max-w-4xl grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl border border-[#D8A54B]/45 bg-[#120E0A] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Artwork Full Image Carousel */}
              <div className="relative md:col-span-7 bg-black/85 flex flex-col items-center justify-center min-h-[340px] max-h-[65vh] md:max-h-[78vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modalGalleryImages[modalGalleryIndex]}
                    src={modalGalleryImages[modalGalleryIndex]}
                    alt={selectedArtwork.title}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-contain max-h-[58vh] md:max-h-[70vh]"
                  />
                </AnimatePresence>

                {/* Multi-Photo Carousel Controls (Shown when artwork has multiple studio views) */}
                {modalGalleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={() =>
                        setModalGalleryIndex(
                          (i) =>
                            (i - 1 + modalGalleryImages.length) %
                            modalGalleryImages.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8A54B]/60 bg-black/70 text-[#FBE39E] hover:bg-black cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={() =>
                        setModalGalleryIndex(
                          (i) => (i + 1) % modalGalleryImages.length
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8A54B]/60 bg-black/70 text-[#FBE39E] hover:bg-black cursor-pointer"
                    >
                      →
                    </button>

                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
                      {modalGalleryImages.map((imgUrl, idx) => (
                        <button
                          key={imgUrl}
                          type="button"
                          onClick={() => setModalGalleryIndex(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === modalGalleryIndex
                              ? 'w-7 bg-[#E8B860]'
                              : 'w-2 bg-white/35 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Artwork Specifications */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-[#D8A54B]">
                      {selectedArtwork.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedArtwork(null)}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-white cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  <h3
                    className="mt-3 text-2xl sm:text-3xl font-normal text-[#F7F4EE]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {selectedArtwork.title}
                  </h3>

                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#C4BCB0]">
                    {selectedArtwork.medium}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-[#DFD8CA]/90 font-light">
                    {selectedArtwork.fullDescription ||
                      selectedArtwork.shortDescription}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="uppercase tracking-[0.18em] text-[#9E9585]">
                        Dimensions
                      </span>
                      <span className="text-[#F7F4EE]">
                        {selectedArtwork.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase tracking-[0.18em] text-[#9E9585]">
                        Availability
                      </span>
                      <span className="text-[#F7F4EE]">
                        {selectedArtwork.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const art = selectedArtwork;
                    setSelectedArtwork(null);
                    if (onSelectArtworkForQuote) {
                      onSelectArtworkForQuote(art);
                    }
                  }}
                  className="btn-gold-pill mt-8 w-full rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.16em] cursor-pointer"
                >
                  Enquire About This Creation →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
