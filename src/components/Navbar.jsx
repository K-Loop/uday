import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEFT_ITEMS = [
  { num: '01', label: 'HOME', id: 'home' },
  { num: '02', label: 'OUR WORK', id: 'work' },
  { num: '03', label: 'PROCESS', id: 'process' },
];

const RIGHT_ITEMS = [
  { num: '04', label: 'ABOUT', id: 'about' },
  { num: '05', label: 'CONTACT', id: 'contact' },
];

const COMPACT_ITEMS = [
  { num: '01', label: 'HOME', id: 'home' },
  { num: '02', label: 'WORK', id: 'work' },
  { num: '03', label: 'PROCESS', id: 'process' },
  { num: '04', label: 'ABOUT', id: 'about' },
  { num: '05', label: 'CONTACT', id: 'contact' },
];

export default function Navbar({
  activeTab = 'home',
  onSelectTab,
  onOpenQuote,
  onOpenProcess,
  lenisRef,
  revealDelay = 0,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // isCompact = true when scrolling down (shortened simplified pill)
  // isCompact = false at top or when scrolling up (full sculpted twin-wing navbar)
  const [isCompact, setIsCompact] = useState(false);

  const isCompactRef = useRef(false);

  // ──────────────────────────────────────────────────────────────────
  // Directional Scroll Tracker:
  // - Scroll Down -> Shorten into Simplified Compact Pill Navbar
  // - Scroll Up (or near top) -> Expand back to Full Normal Sculpted Navbar
  // ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    const processScroll = (currentY) => {
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      // Ignore sub-pixel zero-delta ticks during Lenis deceleration
      if (Math.abs(delta) < 0.4) return;

      // Reset accumulator on direction reversal
      if (
        (delta > 0 && accumulatedDelta < 0) ||
        (delta < 0 && accumulatedDelta > 0)
      ) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      // Always expand to full normal navbar near the top of the Hero
      if (currentY < 60) {
        if (isCompactRef.current) {
          isCompactRef.current = false;
          setIsCompact(false);
        }
        return;
      }

      // Scrolling DOWN -> Shorten into simplified pill navbar (never hides!)
      if (accumulatedDelta > 14 && currentY > 90 && !isCompactRef.current) {
        isCompactRef.current = true;
        setIsCompact(true);
      }
      // Scrolling UP -> Expand back into full normal sculpted navbar
      else if (accumulatedDelta < -10 && isCompactRef.current) {
        isCompactRef.current = false;
        setIsCompact(false);
      }
    };

    const handleLenisScroll = (e) => {
      processScroll(e.detail.scroll);
    };

    window.addEventListener('uday-lenis-scroll', handleLenisScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('uday-lenis-scroll', handleLenisScroll);
    };
  }, []);

  const handleNavClick = (id) => {
    if (onSelectTab) onSelectTab(id);
    const lenis = lenisRef?.current;

    if (id === 'home') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.25 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (id === 'work') {
      const el = document.getElementById('art-collection');
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.25 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (id === 'process') {
      const el = document.getElementById('artistic-process');
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.25 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (onOpenProcess) {
        onOpenProcess();
      }
    } else if (id === 'about') {
      const el = document.getElementById('about-section');
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.25 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (id === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.25 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (onOpenQuote) {
        onOpenQuote();
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        delay: revealDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="gpu-nav-shell fixed top-0 left-0 right-0 z-50 pointer-events-none pt-3 sm:pt-4 lg:pt-[14px] px-4 sm:px-8 lg:px-[5.2%] xl:px-[5.8%]"
    >
      {/* Feathered Top Atmospheric Canopy — Adapts height to Normal vs Shortened Navbar */}
      <div
        aria-hidden="true"
        className={`navbar-blend-canopy pointer-events-none fixed inset-x-0 top-0 -z-10 transition-all duration-500 ${
          isCompact ? 'h-[82px] opacity-85' : 'h-[120px] opacity-65'
        }`}
      />

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP NAVBAR (lg and up):
          Morphs Smoothly Between:
          1) Full Sculpted Twin-Wing Navbar (Normal / Scrolling Up)
          2) Shortened Simplified Pill Navbar (Scrolling Down)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex justify-center w-full pointer-events-none select-none">
        <AnimatePresence mode="wait" initial={false}>
          {!isCompact ? (
            /* ── STATE A: NORMAL FULL SCULPTED TWIN-WING NAVBAR ── */
            <motion.div
              key="full-sculpted-navbar"
              initial={{ opacity: 0, scaleX: 0.86, y: -6 }}
              animate={{ opacity: 1, scaleX: 1, y: 0 }}
              exit={{ opacity: 0, scaleX: 0.88, y: -4 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[1720px] h-[82px] xl:h-[88px] pointer-events-auto origin-top will-change-transform"
            >
              {/* Custom Sculpted SVG Silhouette, Seamless Center Cradle Fill, Gold Contours & Light Flares */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                viewBox="0 0 1680 96"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="navGlassFill"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#120E0A" stopOpacity="0.92" />
                    <stop offset="55%" stopColor="#0A0806" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#16110B" stopOpacity="0.98" />
                  </linearGradient>

                  <radialGradient
                    id="centerCradleDarkShield"
                    cx="50%"
                    cy="38%"
                    r="55%"
                  >
                    <stop offset="0%" stopColor="#0B0907" stopOpacity="0.96" />
                    <stop offset="70%" stopColor="#0E0B08" stopOpacity="0.93" />
                    <stop offset="100%" stopColor="#090705" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient
                    id="navGoldStroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#7A5824" stopOpacity="0.32" />
                    <stop offset="6%" stopColor="#D7A44E" stopOpacity="0.82" />
                    <stop offset="22%" stopColor="#C4913B" stopOpacity="0.62" />
                    <stop offset="35%" stopColor="#FCE49E" stopOpacity="0.98" />
                    <stop offset="42%" stopColor="#C8933C" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#FFF2C2" stopOpacity="1" />
                    <stop offset="58%" stopColor="#C8933C" stopOpacity="0.75" />
                    <stop offset="65%" stopColor="#FCE49E" stopOpacity="0.98" />
                    <stop offset="78%" stopColor="#C4913B" stopOpacity="0.62" />
                    <stop offset="94%" stopColor="#E6B65C" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#7A5824" stopOpacity="0.32" />
                  </linearGradient>

                  <linearGradient
                    id="outerFilamentGold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#C8933C" stopOpacity="0" />
                    <stop offset="3%" stopColor="#E8B860" stopOpacity="0.72" />
                    <stop offset="12%" stopColor="#FAD98B" stopOpacity="0.88" />
                    <stop offset="38%" stopColor="#B8832E" stopOpacity="0.52" />
                    <stop offset="50%" stopColor="#FFEBA8" stopOpacity="0.98" />
                    <stop offset="62%" stopColor="#B8832E" stopOpacity="0.52" />
                    <stop offset="88%" stopColor="#FAD98B" stopOpacity="0.88" />
                    <stop offset="97%" stopColor="#E8B860" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#C8933C" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient
                    id="centerBottomBloom"
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
                    <stop offset="28%" stopColor="#F7CA68" stopOpacity="0.88" />
                    <stop offset="62%" stopColor="#C68A2C" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#C68A2C" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient
                    id="centerCradleWarmth"
                    cx="50%"
                    cy="85%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor="#E5A948" stopOpacity="0.34" />
                    <stop offset="55%" stopColor="#A67120" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 0. Seamless Dark Blended Shield behind the Recessed Center Logo Cradle */}
                <path
                  d="M 550 0 L 1130 0 L 1090 84 L 590 84 Z"
                  fill="url(#centerCradleDarkShield)"
                />

                {/* 1. Ambient outer shadow & golden aura behind the sculpted bar */}
                <path
                  d="
                    M 96 12
                    L 575 12
                    C 618 12, 636 52, 678 66
                    C 708 76, 760 80, 840 80
                    C 920 80, 972 76, 1002 66
                    C 1044 52, 1062 12, 1105 12
                    L 1584 12
                    A 32 32 0 0 1 1616 44
                    A 32 32 0 0 1 1584 76
                    L 1060 76
                    C 1020 76, 998 86, 956 86
                    L 724 86
                    C 682 86, 660 76, 620 76
                    L 96 76
                    A 32 32 0 0 1 64 44
                    A 32 32 0 0 1 96 12
                    Z
                  "
                  fill="url(#navGlassFill)"
                />

                {/* 2. Subtle warm golden inner illumination in the center logo cradle */}
                <ellipse
                  cx="840"
                  cy="74"
                  rx="185"
                  ry="24"
                  fill="url(#centerCradleWarmth)"
                />

                {/* 3. Main Sculpted Wing & Center Cradle Metallic Gold Border */}
                <path
                  d="
                    M 96 12
                    L 575 12
                    C 618 12, 638 56, 682 70
                    C 712 80, 765 82, 840 82
                    C 915 82, 968 80, 998 70
                    C 1042 56, 1062 12, 1105 12
                    L 1584 12
                    A 32 32 0 0 1 1616 44
                    A 32 32 0 0 1 1584 76
                    L 1060 76
                    C 1020 76, 998 86, 956 86
                    L 724 86
                    C 682 86, 660 76, 620 76
                    L 96 76
                    A 32 32 0 0 1 64 44
                    A 32 32 0 0 1 96 12
                    Z
                  "
                  stroke="url(#navGoldStroke)"
                  strokeWidth="1.35"
                />

                {/* 4. Outer Sweeping Golden Architectural Filament with Winged Tips */}
                <g>
                  <path
                    d="
                      M 6 44
                      C 38 44, 48 82, 96 82
                      L 616 82
                      C 656 82, 678 91, 724 91
                      L 956 91
                      C 1002 91, 1024 82, 1064 82
                      L 1584 82
                      C 1632 82, 1642 44, 1674 44
                    "
                    stroke="url(#outerFilamentGold)"
                    strokeWidth="1.25"
                  />

                  {/* 5. Top-Corner Specular Gold Highlights on Wing Shoulders */}
                  <path
                    d="M 545 12 L 575 12 C 602 12, 618 28, 636 46"
                    stroke="#FFF0B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M 1135 12 L 1105 12 C 1078 12, 1062 28, 1044 46"
                    stroke="#FFF0B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* 6. Right-Wing Bottom Golden Specular Highlight */}
                  <ellipse
                    cx="1520"
                    cy="81"
                    rx="52"
                    ry="3"
                    fill="url(#centerBottomBloom)"
                    opacity="0.85"
                  />

                  {/* 7. Center-Bottom Diamond Golden Light Flare (under UDAY ARTS) */}
                  <g>
                    <ellipse
                      cx="840"
                      cy="89"
                      rx="68"
                      ry="6.5"
                      fill="url(#centerBottomBloom)"
                    />
                    <polygon
                      points="840,83 868,89 840,95 812,89"
                      fill="#FFF6D6"
                      opacity="0.95"
                    />
                  </g>
                </g>
              </svg>

              {/* ── Foreground Interactive Navigation Grid ── */}
              <div className="relative z-10 grid grid-cols-12 items-center h-[76px] xl:h-[80px] px-[5.2%]">
                {/* LEFT WING: 01 HOME | 02 OUR WORK | 03 PROCESS */}
                <nav
                  aria-label="Primary Left"
                  className="col-span-4 flex items-center justify-between pr-4 xl:pr-8"
                >
                  {LEFT_ITEMS.map((item, idx) => {
                    const isActive = activeTab === item.id;
                    return (
                      <div key={item.id} className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className="relative py-2 px-1.5 text-[11.5px] xl:text-[13px] tracking-[0.14em] uppercase transition-colors cursor-pointer group"
                        >
                          <span className="text-[#9E9585] font-normal mr-1.5 transition-colors group-hover:text-[#D5C7B2]">
                            {item.num}
                          </span>
                          <span
                            className={`${
                              isActive
                                ? 'text-[#FFFFFF] font-medium'
                                : 'text-[#E6E0D5] font-normal group-hover:text-white'
                            } transition-colors`}
                          >
                            {item.label}
                          </span>

                          {isActive && (
                            <motion.span
                              layoutId="desktopNavUnderline"
                              className="nav-active-underline absolute left-0 right-0 -bottom-[11px] xl:-bottom-[12px] h-[2.5px] rounded-full"
                            />
                          )}
                        </button>

                        {idx < LEFT_ITEMS.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-px bg-white/15 ml-4 xl:ml-7"
                          />
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* CENTRE CRADLE: Official Circular Logo + UDAY ARTS */}
                <div className="col-span-4 flex items-center justify-center -mt-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="flex items-center gap-3.5 xl:gap-4 group cursor-pointer focus:outline-none"
                  >
                    <div className="relative h-[44px] w-[44px] xl:h-[50px] xl:w-[50px] rounded-full p-[1.5px] bg-gradient-to-b from-white/90 via-[#C8C8C8] to-white/40 shadow-[0_0_20px_rgba(255,230,175,0.22)]">
                      <img
                        src="/logo.webp"
                        alt="Uday Arts Official Logo"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <span
                      className="text-[20px] xl:text-[24px] tracking-[0.23em] uppercase text-[#F7F4EE] font-normal transition-colors group-hover:text-[#FBE29D]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      UDAY ARTS
                    </span>
                  </button>
                </div>

                {/* RIGHT WING: 04 ABOUT | 05 CONTACT | GET A QUOTE → */}
                <div className="col-span-4 flex items-center justify-end gap-4 xl:gap-7 pl-4 xl:pl-6">
                  {RIGHT_ITEMS.map((item, idx) => {
                    const isActive = activeTab === item.id;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 xl:gap-7"
                      >
                        <button
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className="relative py-2 px-1 text-[11.5px] xl:text-[13px] tracking-[0.14em] uppercase transition-colors cursor-pointer group"
                        >
                          <span className="text-[#9E9585] font-normal mr-1.5 transition-colors group-hover:text-[#D5C7B2]">
                            {item.num}
                          </span>
                          <span
                            className={`${
                              isActive
                                ? 'text-[#FFFFFF] font-medium'
                                : 'text-[#E6E0D5] font-normal group-hover:text-white'
                            } transition-colors`}
                          >
                            {item.label}
                          </span>

                          {isActive && (
                            <motion.span
                              layoutId="desktopNavUnderline"
                              className="nav-active-underline absolute left-0 right-0 -bottom-[11px] xl:-bottom-[12px] h-[2.5px] rounded-full"
                            />
                          )}
                        </button>

                        {idx === 0 && (
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-px bg-white/15"
                          />
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="btn-gold-pill ml-1 xl:ml-2 inline-flex items-center gap-2 rounded-full px-5 xl:px-6 py-2.5 text-[11.5px] xl:text-[12.5px] font-semibold uppercase tracking-[0.12em] cursor-pointer"
                  >
                    <span>GET A QUOTE</span>
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── STATE B: SHORTENED SIMPLIFIED PILL NAVBAR (When Scrolling Down) ── */
            <motion.div
              key="compact-simplified-navbar"
              initial={{ opacity: 0, scaleX: 1.14, y: -4 }}
              animate={{ opacity: 1, scaleX: 1, y: 0 }}
              exit={{ opacity: 0, scaleX: 1.1, y: -4 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="
                relative mx-auto w-full max-w-[860px] h-[58px]
                rounded-full border border-[#E8B860]/60
                bg-[#0E0B08]/95
                shadow-[0_10px_34px_rgba(0,0,0,0.8),0_0_20px_rgba(218,165,75,0.16)]
                px-5 xl:px-6 flex items-center justify-between
                pointer-events-auto will-change-transform
              "
            >
              {/* Top & Bottom Specular Gold Rim Lines on Compact Pill */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1.5px] w-40 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent opacity-85"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-48 bg-gradient-to-r from-transparent via-[#E8B860] to-transparent opacity-90"
              />

              {/* Left: Compact Brand Logo + UDAY ARTS */}
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none shrink-0"
              >
                <div className="h-[34px] w-[34px] rounded-full p-[1px] bg-gradient-to-b from-white/90 via-[#C8C8C8] to-white/40">
                  <img
                    src="/logo.webp"
                    alt="Uday Arts Logo"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span
                  className="text-[16px] tracking-[0.2em] uppercase text-[#F7F4EE] group-hover:text-[#FBE29D] transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  UDAY ARTS
                </span>
              </button>

              {/* Center: Simplified Navigation Links */}
              <nav
                aria-label="Simplified Primary"
                className="flex items-center gap-4 xl:gap-5"
              >
                {COMPACT_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`relative py-1.5 px-1.5 text-[11px] tracking-[0.15em] uppercase transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#FBE39E] font-medium'
                          : 'text-[#D8D1C4] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="nav-active-underline absolute left-0 right-0 -bottom-[9px] h-[2px] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right: Compact Gold CTA Pill */}
              <button
                type="button"
                onClick={onOpenQuote}
                className="btn-gold-pill inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] cursor-pointer shrink-0"
              >
                <span>Quote</span>
                <span>→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TABLET & MOBILE COMPACT SCULPTED NAVBAR (below lg)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden pointer-events-auto mx-auto max-w-[680px]">
        <div
          className={`relative flex items-center justify-between rounded-full border border-[#D8A54B]/50 bg-[#120E0A]/95 shadow-[0_8px_32px_rgba(0,0,0,0.65)] transition-all duration-300 ${
            isCompact ? 'px-3.5 py-1.5 max-w-[92%] mx-auto' : 'px-4 py-2.5'
          }`}
        >
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left"
          >
            <img
              src="/logo.webp"
              alt="Uday Arts Logo"
              className={`${
                isCompact ? 'h-7 w-7' : 'h-9 w-9'
              } rounded-full border border-white/60 object-cover transition-all`}
            />
            <span
              className={`${
                isCompact ? 'text-sm' : 'text-base sm:text-lg'
              } tracking-[0.2em] uppercase text-[#F7F4EE] transition-all`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              UDAY ARTS
            </span>
          </button>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenQuote}
              className="btn-gold-pill rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]"
            >
              Get a Quote
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#D8A54B]/40 bg-black/50 text-[#F7F4EE]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                {mobileMenuOpen ? (
                  <path d="M5 5L15 15M15 5L5 15" strokeLinecap="round" />
                ) : (
                  <path d="M3 6H17M3 10H17M3 14H17" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden rounded-2xl border border-[#D8A54B]/35 bg-[#120E0A]/95 px-5 py-4 shadow-2xl"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {[...LEFT_ITEMS, ...RIGHT_ITEMS].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center justify-between py-3 text-left text-xs uppercase tracking-[0.18em]"
                  >
                    <span>
                      <span className="text-[#9E9585] mr-2.5">{item.num}</span>
                      <span
                        className={
                          activeTab === item.id
                            ? 'text-[#FBE29D] font-semibold'
                            : 'text-[#F7F4EE]'
                        }
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className="text-[#D8A54B]">→</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
