import { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';

const COMPARISON_PAIRS = [
  {
    id: 'ganesha-sculpture',
    label: 'Ganesha, Sacred 3D Figure',
    subtitle: 'Devotional 3D Carved Sculpture · 4.5 ft × 3.5 ft',
    beforeImg: '/art/WhatsApp%20Image%202026-10-29%20at%201.56.35%20PM.jpeg',
    afterImg:
      '/art/WhatsApp%20Image%202026-10-29%20at%201.56.37%20PM%20(2).jpeg',
    beforeStage: 'Unfinished CNC Carved Idol',
    afterStage: 'Consecrated Gold & Polychrome Finish',
    viewBox: '0 0 680 540',
    beforeCoords: { x: -140, y: -290, width: 960, height: 1280 },
    afterCoords: { x: -140, y: -250, width: 960, height: 1280 },
  },
  {
    id: 'chariot-mural',
    label: 'The Chariot Relief Mural',
    subtitle: 'Mythological 3D Wall Mural · 10 ft × 5 ft',
    beforeImg: '/art/WhatsApp%20Image%202026-10-29%20at%201.56.42%20PM.jpeg',
    afterImg:
      '/art/WhatsApp%20Image%202026-10-29%20at%201.56.42%20PM%20(1).jpeg',
    beforeStage: 'Raw High-Density CNC Relief',
    afterStage: 'Polychrome & Burnished Gold Leaf',
    viewBox: '0 0 740 540',
    beforeCoords: { x: -30, y: -475, width: 960, height: 1280 },
    afterCoords: { x: -24, y: -578, width: 980, height: 1306 },
  },
  {
    id: 'kamadhenu-panel',
    label: 'Kamadhenu & Tree of Life',
    subtitle: '3D CNC Carved Interior Panel · 8 ft × 5 ft',
    beforeImg:
      '/art/WhatsApp%20Image%202026-10-29%20at%201.56.41%20PM%20(2).jpeg',
    afterImg: '/art/WhatsApp%20Image%202026-10-29%20at%201.56.41%20PM.jpeg',
    beforeStage: 'Raw 3D CNC Sculpted Relief',
    afterStage: '24K Gold Patina & Hand-Painted Finish',
    viewBox: '0 0 660 540',
    beforeCoords: { x: -52, y: -235, width: 960, height: 1280 },
    afterCoords: { x: -188, y: -322, width: 1144, height: 1525 },
  },
];

const LEFT_STAGES = [
  {
    num: '01',
    title: 'Concept',
    subtitle: 'Your Vision',
    detail: 'Bespoke composition, wall proportions & sacred iconography.',
  },
  {
    num: '02',
    title: 'Precision',
    subtitle: 'Digital Craft',
    detail: '3D relief sculpting & multi-axis CNC depth programming.',
  },
];

const RIGHT_STAGES = [
  {
    num: '03',
    title: 'Craftsmanship',
    subtitle: 'The Making',
    detail: 'Artisan hand-chisel refinement, sanding & contour detailing.',
  },
  {
    num: '04',
    title: 'Completion',
    subtitle: 'The Masterpiece',
    detail: 'Metallic gold leafing, mineral patinas & protective sealing.',
  },
];

const BOTTOM_PILLARS = [
  {
    id: 'cnc',
    title: 'ADVANCED CNC',
    subtitle: 'Precision in every cut',
  },
  {
    id: 'artisans',
    title: 'SKILLED ARTISANS',
    subtitle: 'Crafted with devotion',
  },
  {
    id: 'materials',
    title: 'PREMIUM MATERIALS',
    subtitle: 'Built to last',
  },
  {
    id: 'designs',
    title: 'TIMELESS DESIGNS',
    subtitle: 'Art for generations',
  },
];

const PROCESS_EMBERS = [
  { id: 1, left: '18%', top: '26%', size: 3, duration: 7.2, delay: 0.4 },
  { id: 2, left: '79%', top: '22%', size: 2.5, duration: 8.5, delay: 1.3 },
  { id: 3, left: '24%', top: '74%', size: 3, duration: 8.0, delay: 0.9 },
  { id: 4, left: '76%', top: '78%', size: 2.5, duration: 7.6, delay: 2.0 },
];

function PillarIcon({ type }) {
  if (type === 'cnc') {
    return (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#E6B65C] shrink-0"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="22"
          cy="22"
          r="19"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.78"
        />
        <circle
          cx="22"
          cy="22"
          r="15.5"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.35"
        />
        <path
          d="M14 14H30V18H25L23.5 23H20.5L19 18H14V14Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M22 23V28"
          stroke="#FFF0B8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 30H29M17 27.5L19.5 30M27 27.5L24.5 30"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === 'artisans') {
    return (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#E6B65C] shrink-0"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 24V13.5C18 12.4 18.9 11.5 20 11.5C21.1 11.5 22 12.4 22 13.5V22"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M22 21V12C22 10.9 22.9 10 24 10C25.1 10 26 10.9 26 12V22"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M26 22V14C26 12.9 26.9 12 28 12C29.1 12 30 12.9 30 14V26.5C30 31.2 26.2 35 21.5 35H19.5C15.8 35 13.2 32.6 11.8 29.2L10.2 25.2C9.7 24.1 10.2 22.8 11.3 22.3C12.3 21.9 13.5 22.3 14.1 23.3L15.5 25.8V16.5C15.5 15.4 16.4 14.5 17.5 14.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="28.5" r="1.5" fill="#FFF0B8" />
      </svg>
    );
  }
  if (type === 'materials') {
    return (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#E6B65C] shrink-0"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 14H30L35 21L22 35L9 21L14 14Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M9 21H35"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          d="M14 14L17.5 21L22 35L26.5 21L30 14"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 21L22 14L26.5 21"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-10 h-10 sm:w-11 sm:h-11 text-[#E6B65C] shrink-0"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 11C24.8 15.2 26.2 19.5 25.5 24.5C24.8 28.5 22 31 22 31C22 31 19.2 28.5 18.5 24.5C17.8 19.5 19.2 15.2 22 11Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M25.6 23.5C28.8 20.5 32.5 19.5 35.5 20.2C34.8 24.5 31.8 28.5 26.5 30.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 23.5C15.2 20.5 11.5 19.5 8.5 20.2C9.2 24.5 12.2 28.5 17.5 30.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M13 33C16.5 31.2 27.5 31.2 31 33"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ArtisticProcessSection() {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const activePair = COMPARISON_PAIRS[activePairIndex];

  // Lightweight scroll-reactive golden sunbeam breathing for /Backgroundthree.png
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sunbeamOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.15, 0.9, 0.9, 0.3]
  );

  const handlePrevPair = () => {
    setActivePairIndex(
      (prev) => (prev - 1 + COMPARISON_PAIRS.length) % COMPARISON_PAIRS.length
    );
    setSliderPos(50);
  };

  const handleNextPair = () => {
    setActivePairIndex((prev) => (prev + 1) % COMPARISON_PAIRS.length);
    setSliderPos(50);
  };

  // Calculate percentage position from clientX (mouse or touch)
  const updateSliderFromClientX = useCallback((clientX) => {
    const container = sliderContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingBoundingClientRect
      ? container.getBoundingClientRect()
      : container.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(96, Math.max(4, rawPct));
    setSliderPos(clamped);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Fallback handled by window listeners
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Global mouse/touch safety listeners when dragging outside bounds
  useEffect(() => {
    if (!isDragging) return;

    const onWindowTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateSliderFromClientX(e.touches[0].clientX);
      }
    };
    const onWindowPointerUp = () => setIsDragging(false);

    window.addEventListener('touchmove', onWindowTouchMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('touchend', onWindowPointerUp);

    return () => {
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('touchend', onWindowPointerUp);
    };
  }, [isDragging, updateSliderFromClientX]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((p) => Math.max(4, p - 4));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((p) => Math.min(96, p + 4));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="artistic-process"
      className="relative w-full min-h-[100svh] -mt-10 pt-24 pb-20 sm:pb-24 lg:pb-28 overflow-hidden select-none bg-[#090705]"
    >
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 03 BACKGROUND (/Backgroundthree.png) — GPU Cached Layer
          With Top-Edge Feather Mask to Eliminate Any Horizontal Seam
          ══════════════════════════════════════════════════════════════════ */}
      <div className="section-bg-feather-top pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Backgroundthree.png"
          alt=""
          decoding="async"
          style={{ transform: 'translate3d(0,0,0)' }}
          className="h-full w-full object-cover object-center"
        />

        {/* Scroll-Reactive Golden Sunbeam & Bottom Wave Aura */}
        <motion.div
          style={{
            opacity: sunbeamOpacity,
            background:
              'radial-gradient(circle at 14% 14%, rgba(242, 192, 98, 0.16) 0%, transparent 45%), radial-gradient(circle at 82% 88%, rgba(235, 182, 86, 0.14) 0%, transparent 44%)',
          }}
          className="absolute inset-0 will-change-[opacity]"
        />

        {/* Subtle dark radial polish to keep comparison slider & typography crisp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(10, 8, 6, 0.1) 0%, rgba(7, 5, 3, 0.42) 100%)',
          }}
        />
      </div>

      {/* Multi-Stop Top Velvet Transition Bridge (Softens Top-Left Sunbeam Entry from Section 02) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44"
        style={{
          background:
            'linear-gradient(180deg, #090705 0%, rgba(9, 7, 5, 0.84) 32%, rgba(9, 7, 5, 0.35) 68%, rgba(9, 7, 5, 0) 100%)',
        }}
      />
      {/* Seamless Bottom Transition Bridge into Section 04 (About) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28"
        style={{
          background:
            'linear-gradient(0deg, #080604 0%, rgba(8, 6, 4, 0.55) 45%, rgba(8, 6, 4, 0) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          FOREGROUND CONTENT CONTAINER
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-5 sm:px-10 lg:px-[5.5%]">
        {/* ── 1. SECTION IDENTITY HEADER — MATCHING SECTION 02 EDITORIAL DESIGN ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7 lg:gap-9"
        >
          {/* Large Standalone "03" + Fine Metallic Gold Vertical Divider */}
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-9">
            <span
              className="gold-number-02 text-[64px] sm:text-[82px] lg:text-[96px] xl:text-[106px] leading-none select-none"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              03
            </span>

            {/* Fine Metallic Gold Vertical Divider */}
            <span
              aria-hidden="true"
              className="h-[62px] sm:h-[78px] lg:h-[90px] w-[1.5px] shrink-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(246, 212, 132, 0.12) 0%, #E8B860 50%, rgba(246, 212, 132, 0.12) 100%)',
              }}
            />
          </div>

          {/* Refined Uppercase Descriptor, Main Heading & Description */}
          <div>
            {/* Descriptor: Gold Line + THE ARTISTIC PROCESS */}
            <div className="flex items-center gap-3.5 mb-1.5">
              <span className="h-[1.5px] w-9 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
              <span className="text-[11px] sm:text-[12.5px] uppercase tracking-[0.34em] text-[#EAE3D5] font-normal">
                THE ARTISTIC PROCESS
              </span>
            </div>

            {/* Main Heading: From Vision to Masterpiece. */}
            <h2
              className="text-[30px] sm:text-[42px] lg:text-[50px] xl:text-[58px] leading-[1.08] tracking-[-0.01em] font-normal text-[#F7F4EE]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              From Vision to{' '}
              <span className="gold-italic-text pr-1">Masterpiece.</span>
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-[780px] text-[13.5px] sm:text-[15.5px] xl:text-[17px] font-light tracking-[0.015em] text-[#D2CBBF]">
              Every creation begins with an idea. Precision and craftsmanship
              transform it into something extraordinary.
            </p>
          </div>
        </motion.div>

        {/* ── Transformation Carousel Controls (Prev/Next + Pill Switcher) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#9E9585] mr-1">
              Featured Transformation:
            </span>
            {COMPARISON_PAIRS.map((pair, idx) => {
              const isSelected = idx === activePairIndex;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    setActivePairIndex(idx);
                    setSliderPos(50);
                  }}
                  className={`relative rounded-full px-3.5 py-1.5 text-[11.5px] sm:text-[12.5px] tracking-[0.04em] transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#FBE39E] font-medium'
                      : 'border border-white/12 bg-black/35 text-[#C9C1B4] hover:border-[#D8A54B]/45 hover:text-[#F7F4EE]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeTransformationPill"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full border border-[#E8B860]/85 bg-[#1B140C] shadow-[0_0_16px_rgba(232,184,96,0.22)] -z-10"
                    />
                  )}
                  <span>{pair.label}</span>
                </button>
              );
            })}
          </div>

          {/* Carousel Prev / Next Arrows & Slide Counter */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] text-[#C9C1B4] mr-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8B860]" />
              Drag divider to compare
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous transformation"
                onClick={handlePrevPair}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-xs text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
              >
                ←
              </button>
              <span className="text-[11px] tracking-[0.2em] text-[#D8D1C4] min-w-[42px] text-center">
                0{activePairIndex + 1} / 0{COMPARISON_PAIRS.length}
              </span>
              <button
                type="button"
                aria-label="Next transformation"
                onClick={handleNextPair}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/90 text-xs text-[#FBE39E] hover:border-[#FFF0B8] hover:bg-[#1C150E] transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 2. THREE-COLUMN COMPOSITION: LEFT TIMELINE | CENTER COMPARISON SLIDER | RIGHT TIMELINE ── */}
        <div className="mt-7 sm:mt-9 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-7 xl:gap-10">
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN: THE PROCESS (Stages 01 & 02)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div>
              <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-[#EAE3D5] font-normal">
                THE PROCESS
              </p>
              <div className="mt-2 h-[1.5px] w-9 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
            </div>

            {/* Subheading */}
            <h3
              className="mt-4 text-[26px] sm:text-[30px] xl:text-[34px] leading-[1.15] font-normal text-[#F7F4EE]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Design &amp; Precision
            </h3>

            {/* Description */}
            <p className="mt-3 text-[13.5px] xl:text-[14.5px] leading-[1.7] font-light text-[#C9C1B4]">
              We begin with sacred proportions and architectural planning,
              translating your vision into high-depth 3D digital relief models.
            </p>

            {/* Vertical Gold Process Timeline: 01 Concept & 02 Precision */}
            <div className="relative mt-7 pl-8 space-y-6">
              {/* Vertical Gold Connector Line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[8px] top-1 bottom-1 w-[1px]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(232,184,96,0.18) 0%, rgba(232,184,96,0.75) 20%, rgba(232,184,96,0.75) 80%, rgba(232,184,96,0.15) 100%)',
                }}
              />

              {LEFT_STAGES.map((stage) => (
                <div key={stage.num} className="relative group">
                  {/* Concentric Gold Node Indicator */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute -left-8 top-1.5
                      flex h-[17px] w-[17px] items-center justify-center
                      rounded-full border border-[#E8B860]/85 bg-[#0E0B08]
                      shadow-[0_0_10px_rgba(232,184,96,0.35)]
                    "
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-[#FFE8A3]" />
                  </span>

                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-medium tracking-[0.16em] text-[#E8B860]">
                      {stage.num} —
                    </span>
                    <h4
                      className="text-[18px] xl:text-[20px] font-normal text-[#F7F4EE]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {stage.title}
                    </h4>
                  </div>

                  <p className="mt-0.5 text-[13px] font-medium tracking-[0.04em] text-[#E8C27A]">
                    {stage.subtitle}
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-[#B8AFA0]">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              CENTER COLUMN: INTERACTIVE DRAGGABLE COMPARISON SLIDER CAROUSEL
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div
              ref={sliderContainerRef}
              data-lenis-prevent
              role="slider"
              tabIndex={0}
              aria-label="Before and after artwork comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              style={{ touchAction: 'pan-y' }}
              className="
                gallery-gold-card relative w-full
                aspect-[660/490] sm:aspect-[660/480]
                rounded-[16px] overflow-hidden
                cursor-ew-resize select-none
                focus:outline-none focus:ring-2 focus:ring-[#E8B860]/60
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePair.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* ── 1. RIGHT LAYER (FULL BASE): FINAL CREATION (AFTER) ── */}
                  <div className="absolute inset-0 w-full h-full bg-[#0E0B08]">
                    <svg
                      className="w-full h-full block pointer-events-none"
                      viewBox={activePair.viewBox}
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <image
                        href={activePair.afterImg}
                        x={activePair.afterCoords.x}
                        y={activePair.afterCoords.y}
                        width={activePair.afterCoords.width}
                        height={activePair.afterCoords.height}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </svg>

                    {/* Subtle warm gallery lighting polish on Final Creation */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10, 8, 6, 0.18) 0%, rgba(10, 8, 6, 0.04) 45%, rgba(8, 6, 4, 0.65) 100%)',
                      }}
                    />
                  </div>

                  {/* ── 2. LEFT LAYER (CLIPPED BY SLIDER): DESIGN PREVIEW (BEFORE) ── */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#0B0907] will-change-[clip-path]"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                      WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                    }}
                  >
                    <svg
                      className="w-full h-full block pointer-events-none"
                      viewBox={activePair.viewBox}
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <image
                        href={activePair.beforeImg}
                        x={activePair.beforeCoords.x}
                        y={activePair.beforeCoords.y}
                        width={activePair.beforeCoords.width}
                        height={activePair.beforeCoords.height}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </svg>

                    {/* Subtle studio charcoal tone overlay on raw preview */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10, 8, 6, 0.24) 0%, rgba(10, 8, 6, 0.08) 45%, rgba(8, 6, 4, 0.68) 100%)',
                      }}
                    />
                  </div>

                  {/* ── 4. BOTTOM CAPTION BAR INSIDE COMPARISON FRAME ── */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3.5 sm:px-6 py-3 sm:py-4 flex items-end justify-between gap-2 sm:gap-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div>
                      <p className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#D8D1C4]/85">
                        {activePair.beforeStage}
                      </p>
                      <p
                        className="text-[14px] sm:text-[17px] text-[#F7F4EE]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {activePair.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#FBE39E]">
                        {activePair.afterStage}
                      </p>
                      <p className="hidden sm:block text-[11.5px] font-light text-[#D2CBBF]">
                        {activePair.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── 3. TOP-LEFT & TOP-RIGHT PILL BADGES (Design Preview / Final Creation) ── */}
              <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-5 z-20">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D8A54B]/55 bg-[#0D0A07]/85 px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
                  <span className="text-[9.5px] sm:text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#F7F4EE]">
                    Design Preview
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-5 z-20">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#E8B860]/65 bg-[#0D0A07]/85 px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
                  <span className="text-[9.5px] sm:text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#FBE39E]">
                    Final Creation
                  </span>
                </div>
              </div>

              {/* ── 5. INTERACTIVE VERTICAL GOLD DIVIDER LINE & CIRCULAR DRAG HANDLE ── */}
              <div
                className="pointer-events-none absolute inset-y-0 z-30"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Luminous Vertical Metallic Gold Divider Line */}
                <div
                  className="absolute inset-y-0 -translate-x-1/2 w-[2px]"
                  style={{
                    background:
                      'linear-gradient(180deg, #FFF3C4 0%, #E8B860 22%, #FFF0B8 50%, #E8B860 78%, #FFF3C4 100%)',
                    boxShadow:
                      '0 0 12px rgba(247, 215, 136, 0.85), 0 0 24px rgba(216, 165, 75, 0.55)',
                  }}
                />

                {/* Top Edge Specular Golden Bloom at Divider Intersection */}
                <div
                  className="
                    absolute top-0 -translate-x-1/2 -translate-y-1/2
                    w-20 h-3 rounded-full
                    bg-[#FFF0B8] blur-[5px] opacity-90
                  "
                />

                {/* Bottom Edge Specular Golden Bloom at Divider Intersection */}
                <div
                  className="
                    absolute bottom-0 -translate-x-1/2 translate-y-1/2
                    w-24 h-4 rounded-full
                    bg-[#FFF0B8] blur-[6px] opacity-95
                  "
                />

                {/* Center Circular Gold Drag Handle with Horizontal Light Flare */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  {/* Horizontal Golden Light Rays Flanking the Handle */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute w-32 sm:w-40 h-[2px]"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(255,240,184,0) 0%, rgba(247,215,136,0.85) 35%, #FFF8DE 50%, rgba(247,215,136,0.85) 65%, rgba(255,240,184,0) 100%)',
                      boxShadow: '0 0 12px rgba(247, 215, 136, 0.8)',
                    }}
                  />

                  {/* Outer Golden Aura */}
                  <span
                    aria-hidden="true"
                    className={`absolute h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#E8B860]/25 blur-md transition-transform duration-200 ${
                      isDragging ? 'scale-125' : 'scale-100'
                    }`}
                  />

                  {/* Circular Dark Obsidian & Metallic Gold Drag Button */}
                  <div
                    className={`
                      relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center
                      rounded-full border-[1.5px] border-[#FCE49E]
                      bg-[#120E09]/95 backdrop-blur-md
                      shadow-[0_0_20px_rgba(247,215,136,0.75),inset_0_0_10px_rgba(247,215,136,0.28)]
                      transition-transform duration-200
                      ${isDragging ? 'scale-110' : 'scale-100'}
                    `}
                  >
                    <svg
                      className="w-5 h-5 text-[#FFF0B8]"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 6.5L4 10L7.5 13.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.5 6.5L16 10L12.5 13.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Specular Gold Rim Highlights on Card Frame */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-[18%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-80"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-[18%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-80"
              />
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: THE RESULT (Stages 03 & 04)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-3 order-3 flex flex-col justify-center lg:pl-2"
          >
            {/* Eyebrow */}
            <div>
              <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-[#EAE3D5] font-normal">
                THE RESULT
              </p>
              <div className="mt-2 h-[1.5px] w-9 bg-gradient-to-r from-[#F7D788] to-[#C88E35]" />
            </div>

            {/* Subheading */}
            <h3
              className="mt-4 text-[26px] sm:text-[30px] xl:text-[34px] leading-[1.15] font-normal text-[#F7F4EE]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Finished Artwork
            </h3>

            {/* Description */}
            <p className="mt-3 text-[13.5px] xl:text-[14.5px] leading-[1.7] font-light text-[#C9C1B4]">
              The final piece is a seamless blend of technology, skill and
              devotion — crafted to last for generations.
            </p>

            {/* Vertical Gold Process Timeline: 03 Craftsmanship & 04 Completion */}
            <div className="relative mt-7 pl-8 space-y-6">
              {/* Vertical Gold Connector Line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[8px] top-1 bottom-1 w-[1px]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(232,184,96,0.18) 0%, rgba(232,184,96,0.75) 20%, rgba(232,184,96,0.75) 80%, rgba(232,184,96,0.15) 100%)',
                }}
              />

              {RIGHT_STAGES.map((stage) => (
                <div key={stage.num} className="relative group">
                  {/* Concentric Gold Node Indicator */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute -left-8 top-1.5
                      flex h-[17px] w-[17px] items-center justify-center
                      rounded-full border border-[#E8B860]/85 bg-[#0E0B08]
                      shadow-[0_0_10px_rgba(232,184,96,0.35)]
                    "
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-[#FFE8A3]" />
                  </span>

                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-medium tracking-[0.16em] text-[#E8B860]">
                      {stage.num} —
                    </span>
                    <h4
                      className="text-[18px] xl:text-[20px] font-normal text-[#F7F4EE]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {stage.title}
                    </h4>
                  </div>

                  <p className="mt-0.5 text-[13px] font-medium tracking-[0.04em] text-[#E8C27A]">
                    {stage.subtitle}
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-[#B8AFA0]">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── 3. BOTTOM 4 CRAFTSMANSHIP PILLARS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 sm:mt-14 lg:mt-16 pt-6 border-t border-white/10 lg:border-t-0"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 items-center max-w-[1320px] mx-auto">
            {BOTTOM_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="relative flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-2.5 sm:gap-4 px-2 sm:px-4 py-2"
              >
                <PillarIcon type={pillar.id} />

                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-medium uppercase tracking-[0.2em] text-[#F7F4EE]">
                    {pillar.title}
                  </h4>
                  <p className="mt-0.5 text-[12px] sm:text-[13px] font-light text-[#C9C1B4]">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Vertical Divider Between Pillars on Desktop */}
                {idx < BOTTOM_PILLARS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/15"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
