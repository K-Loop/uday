import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

const HEADING_LINES = [
  { id: 'about-line-1', text: 'Crafted by Vision.', isGoldItalic: false },
  { id: 'about-line-2', text: 'Defined by Detail.', isGoldItalic: true },
];

const CRAFTSMANSHIP_HIGHLIGHTS = [
  {
    id: 'artisan-precision',
    line1: 'Artisan',
    line2: 'Precision',
  },
  {
    id: 'advanced-cnc',
    line1: 'Advanced',
    line2: 'CNC',
  },
  {
    id: 'made-to-belong',
    line1: 'Made to',
    line2: 'Belong',
  },
];

const TICKER_ITEMS = [
  '3D CNC CARVINGS',
  'SCULPTURES',
  'WALL MURALS',
  'INTERIOR PANELS',
];

function HighlightIcon({ id }) {
  if (id === 'artisan-precision') {
    // Lotus icon matching the reference
    return (
      <svg
        className="w-9 h-9 xl:w-10 xl:h-10 text-[#E5B55F] shrink-0"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 9.5C22.6 13.5 24 17.6 23.3 22.4C22.6 26.2 20 28.6 20 28.6C20 28.6 17.4 26.2 16.7 22.4C16 17.6 17.4 13.5 20 9.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M23.4 21.4C26.5 18.5 30 17.6 33 18.2C32.3 22.4 29.4 26.2 24.3 27.8"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M16.6 21.4C13.5 18.5 10 17.6 7 18.2C7.7 22.4 10.6 26.2 15.7 27.8"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 30.5C15 28.8 25 28.8 28.5 30.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === 'advanced-cnc') {
    // CNC spindle / router bit icon matching the reference
    return (
      <svg
        className="w-9 h-9 xl:w-10 xl:h-10 text-[#E5B55F] shrink-0"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="11"
          y="8.5"
          width="18"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M14 13.5H26V18.5L23 21.5H17L14 18.5V13.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M18.2 21.5H21.8L20.8 27.5H19.2L18.2 21.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 30.5H27.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M15.5 27.8L18 30.5M24.5 27.8L22 30.5"
          stroke="#FFF0B8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Layered diamond / panels icon matching "Made to Belong"
  return (
    <svg
      className="w-9 h-9 xl:w-10 xl:h-10 text-[#E5B55F] shrink-0"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 10.5L32 16.8L20 23.1L8 16.8L20 10.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M8 21.2L20 27.5L32 21.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 25.6L20 31.9L32 25.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutSection({ onDiscoverWork }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = false;

  // Subtle GPU-friendly background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-2.5%', '2.5%']
  );

  const handleDiscoverClick = () => {
    if (onDiscoverWork) {
      onDiscoverWork();
      return;
    }
    const el = document.getElementById('art-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-section"
      aria-labelledby="about-heading"
      className="relative w-full min-h-[100svh] overflow-hidden select-none bg-[#080604] flex flex-col justify-between"
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. ACTUAL SUPPLIED ABOUT BACKGROUND LAYER (/background4.png)
          Includes top-left carved filigree, bottom-left CNC spindle carving,
          diagonal gold divider & right-side blurred studio workshop
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        className="section-bg-feather-top pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.img
          src="/background4.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            y: bgY,
            transform: 'translate3d(0, 0, 0)',
          }}
          className="h-full w-full object-cover object-[28%_center] lg:object-center will-change-transform"
        />

        {/* Subtle directional vignette to ensure crisp editorial contrast in the center-left column while preserving the CNC carving on the bottom-left and studio on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 42% 46%, rgba(8, 6, 4, 0.22) 0%, rgba(8, 6, 4, 0.08) 55%, rgba(6, 5, 3, 0.35) 100%)',
          }}
        />
      </motion.div>

      {/* Seamless Top Velvet Transition Bridge from Section 03 into Section 04 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32"
        style={{
          background:
            'linear-gradient(180deg, #090705 0%, rgba(9, 7, 5, 0.72) 38%, rgba(9, 7, 5, 0) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          2. DECORATIVE GOLDEN EDGE ILLUMINATION (Gradual Entrance Step 2)
          Subtle light sweep along the diagonal workshop divider
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.85 } : { opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, delay: 0.12, ease: EASE_EDITORIAL }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="aboutDiagonalShimmer"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D8A54B" stopOpacity="0" />
              <stop offset="16%" stopColor="#FFF2C2" stopOpacity="0.78" />
              <stop offset="48%" stopColor="#E5B55F" stopOpacity="0.32" />
              <stop offset="78%" stopColor="#FFF0B8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#D8A54B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Subtle golden specular highlight aligned with background4.png's diagonal divider */}
          <line
            x1="1512"
            y1="0"
            x2="1234"
            y2="1035"
            stroke="url(#aboutDiagonalShimmer)"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          3. FOREGROUND MAIN CONTENT AREA (Desktop Reference + Mobile Alignment)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-[1760px] flex-1 flex flex-col lg:flex-row items-center px-5 sm:px-10 lg:px-[5.5%] pt-20 sm:pt-26 lg:pt-24 pb-8 lg:pb-16">
        {/* ── LEFT / CENTER-LEFT EDITORIAL COLUMN ── */}
        <div className="relative w-full lg:w-[64%] xl:w-[62%] flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left">
          {/* Step 3: Oversized Editorial "04" Watermark Numeral */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 14 }
            }
            whileInView={{
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              y: 0,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.16, ease: EASE_EDITORIAL }}
            className="
              lg:w-[190px] xl:w-[235px] 2xl:w-[265px] shrink-0
              mb-1 lg:mb-0 lg:mt-4
              select-none pointer-events-none
            "
          >
            <span
              className="
                block text-[68px] sm:text-[106px] lg:text-[148px] xl:text-[178px] 2xl:text-[196px]
                leading-[0.86] tracking-[-0.03em] font-normal
              "
              style={{
                fontFamily: 'var(--font-serif)',
                background:
                  'linear-gradient(180deg, rgba(214, 178, 116, 0.34) 0%, rgba(168, 134, 78, 0.2) 55%, rgba(98, 76, 42, 0.08) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              04
            </span>
          </motion.div>

          {/* Editorial Copy Block (Eyebrow, Heading, Description, Highlights, Signature & CTA) */}
          <div className="flex-1 max-w-[660px] xl:max-w-[700px] lg:pl-2 xl:pl-4 flex flex-col items-center lg:items-start">
            {/* Step 4: Section Eyebrow & Metallic Gold Divider */}
            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.72, delay: 0.24, ease: EASE_EDITORIAL }}
              className="flex items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mb-3 sm:mb-4"
            >
              <span
                aria-hidden="true"
                className="h-[1.5px] w-11 sm:w-12 bg-gradient-to-r from-[#F7D788] via-[#E5B55F] to-[#B88028]"
              />
              <span className="text-[11px] sm:text-[12.5px] xl:text-[13px] uppercase tracking-[0.34em] text-[#EAE3D5] font-normal">
                THE PEOPLE BEHIND THE ART
              </span>
            </motion.div>

            {/* Step 5: Main Heading — Line-by-Line Reveal */}
            <h2
              id="about-heading"
              className="text-[36px] sm:text-[48px] md:text-[54px] lg:text-[56px] xl:text-[64px] 2xl:text-[70px] leading-[1.08] tracking-[-0.01em] font-normal text-[#F7F4EE]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {HEADING_LINES.map((line, idx) => (
                <span key={line.id} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 38 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.82,
                      delay: 0.32 + idx * 0.13,
                      ease: EASE_EDITORIAL,
                    }}
                    className={`block will-change-transform ${
                      line.isGoldItalic ? 'gold-italic-text pr-2' : ''
                    }`}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Step 6: Description Paragraph — Fades Upward Slightly */}
            <motion.p
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.78, delay: 0.56, ease: EASE_EDITORIAL }}
              className="mt-5 sm:mt-6 text-[13.5px] sm:text-[15px] xl:text-[16.5px] leading-[1.72] font-light tracking-[0.015em] text-[#DFD8CA]/95 max-w-[630px]"
            >
              UDAY ARTS is a creative studio specializing in 3D CNC figures,
              divine sculptures, carved wall murals and decorative interior
              panels. With a passion for craftsmanship and a focus on precision,
              we create timeless art for homes, businesses and meaningful
              spaces.
            </motion.p>

            {/* Step 7: Craftsmanship Highlights (Staggered Timing) */}
            <div className="mt-7 sm:mt-8 xl:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-y-4">
              {CRAFTSMANSHIP_HIGHLIGHTS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 16 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.68,
                    delay: 0.68 + idx * 0.1,
                    ease: EASE_EDITORIAL,
                  }}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-3 pr-4 sm:pr-7 xl:pr-8 text-left">
                    <HighlightIcon id={item.id} />
                    <div
                      className="text-[14px] sm:text-[16px] xl:text-[17px] leading-[1.22] text-[#F4EFE6]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      <span className="block">{item.line1}</span>
                      <span className="block">{item.line2}</span>
                    </div>
                  </div>

                  {idx < CRAFTSMANSHIP_HIGHLIGHTS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mr-4 sm:mr-7 xl:mr-8 h-9 sm:h-10 w-px bg-white/18"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Step 9: Founder Signature ("— Uday") & CTA ("DISCOVER OUR WORK →") */}
            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.78, delay: 0.96, ease: EASE_EDITORIAL }}
              className="mt-7 sm:mt-8 xl:mt-9 flex flex-col items-center lg:items-start gap-5"
            >
              {/* Calligraphic Gold Signature: — Uday */}
              <div className="flex items-center gap-3.5 pl-0.5">
                <span
                  aria-hidden="true"
                  className="h-[1px] w-7 bg-[#C99B49]/75"
                />
                {/* Authentic Calligraphic Script SVG Signature matching reference */}
                <svg
                  aria-label="Uday signature"
                  className="h-11 sm:h-12 w-auto overflow-visible text-[#DFB260]"
                  viewBox="0 0 150 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="udaySigGold"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FBE5A5" />
                      <stop offset="50%" stopColor="#E5B55F" />
                      <stop offset="100%" stopColor="#C89138" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 14 14 C 11 26, 11 36, 19 36 C 28 36, 36 22, 41 11 C 38 23, 37 33, 44 34 C 50 35, 57 27, 61 22 M 72 8 C 67 20, 62 34, 55 34 C 49 34, 51 24, 58 23 C 64 22, 65 31, 70 33 C 76 35, 84 23, 80 22 C 74 21, 72 31, 78 33 C 83 34, 88 28, 91 23 C 89 29, 91 33, 95 32 C 100 31, 104 24, 106 21 C 104 27, 106 32, 111 31 C 116 30, 121 24, 123 20 C 119 30, 112 43, 102 46 C 95 48, 93 43, 101 39 C 112 34, 127 29, 138 26"
                    stroke="url(#udaySigGold)"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Illuminated Gold-Bordered CTA Pill: DISCOVER OUR WORK → */}
              <button
                type="button"
                onClick={handleDiscoverClick}
                className="
                  group relative inline-flex items-center gap-4
                  rounded-full border border-[#E2B059]/65
                  bg-[#110D09]/88 px-7 sm:px-8 py-3.5
                  text-[11.5px] sm:text-[12.5px] font-medium uppercase tracking-[0.22em] text-[#F7F4EE]
                  shadow-[0_10px_28px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,236,185,0.16)]
                  transition-all duration-300
                  hover:border-[#FFF0B8] hover:bg-[#1A140D] hover:text-[#FFF2C2]
                  hover:shadow-[0_12px_32px_rgba(218,165,75,0.24)]
                  cursor-pointer
                "
              >
                <span>DISCOVER OUR WORK</span>
                <svg
                  className="w-4 h-4 text-[#E8B860] transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 8H13.5M13.5 8L9.5 4M13.5 8L9.5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Bottom Specular Golden Glow Flare on Button Rim (Matches Reference) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-90 shadow-[0_0_10px_#F7D788] transition-all duration-300 group-hover:w-36"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          4. FOREGROUND FOUNDER PORTRAIT (/artist.png) — Step 8 Entrance
          Separate foreground layer on the right side; completely stationary
          after entrance; preserves exact facial appearance and proportions
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 22, scale: 0.985 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, delay: 0.82, ease: EASE_EDITORIAL }}
        className="
          relative lg:absolute z-20
          bottom-0 lg:bottom-[42px]
          mx-auto lg:mx-0
          w-[300px] sm:w-[370px] md:w-[420px]
          lg:w-[clamp(420px,32.5vw,595px)]
          lg:right-[2.5%] xl:right-[4%]
          pointer-events-none flex items-end justify-center
          will-change-transform
        "
      >
        <img
          src="/artist.png"
          alt="Uday — Founder of UDAY ARTS"
          loading="lazy"
          decoding="async"
          className="founder-portrait-img w-full h-auto max-h-[58svh] lg:max-h-[86svh] object-contain object-bottom"
        />

        {/* Soft bottom feather so the portrait blends into the bottom service ticker bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{
            background:
              'linear-gradient(180deg, rgba(8, 6, 4, 0) 0%, rgba(8, 6, 4, 0.72) 65%, #080604 100%)',
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          5. BOTTOM SERVICE TICKER BAR (Matches Reference Bottom Strip)
          3D CNC CARVINGS  •  SCULPTURES  •  WALL MURALS  •  INTERIOR PANELS
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, delay: 1.02, ease: EASE_EDITORIAL }}
        className="relative z-30 w-full pb-5 sm:pb-6 pt-3 px-4 sm:px-10 lg:px-[5.5%] bg-gradient-to-t from-[#080604] via-[#080604]/85 to-transparent"
      >
        <div className="mx-auto max-w-[1640px] flex items-center justify-center gap-4 sm:gap-7 lg:gap-9">
          {/* Left Illuminated Gold Line */}
          <span
            aria-hidden="true"
            className="hidden sm:block h-[1px] flex-1 max-w-[180px] lg:max-w-[260px]"
            style={{
              background:
                'linear-gradient(90deg, rgba(216, 165, 75, 0) 0%, rgba(232, 184, 96, 0.65) 65%, #FFF0B8 100%)',
            }}
          />

          {/* Service Ticker Labels */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 lg:gap-x-7 gap-y-1.5 text-[10px] sm:text-[11.5px] lg:text-[12px] uppercase tracking-[0.28em] text-[#EAE3D5]">
            {TICKER_ITEMS.map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-3 sm:gap-5 lg:gap-7"
              >
                <span className="whitespace-nowrap">{item}</span>
                {idx < TICKER_ITEMS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#E8B860]"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Illuminated Gold Line */}
          <span
            aria-hidden="true"
            className="hidden sm:block h-[1px] flex-1 max-w-[180px] lg:max-w-[260px]"
            style={{
              background:
                'linear-gradient(270deg, rgba(216, 165, 75, 0) 0%, rgba(232, 184, 96, 0.65) 65%, #FFF0B8 100%)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

