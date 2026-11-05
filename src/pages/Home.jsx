import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '../components/Navbar.jsx';
import IntroSplash from '../components/IntroSplash.jsx';
import ArtCollectionSection from '../components/ArtCollectionSection.jsx';
import ArtisticProcessSection from '../components/ArtisticProcessSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';
import { artworks, WHATSAPP } from '../data/artworks.js';

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = [
  { id: 'line-1', content: 'Art, Carved' },
  { id: 'line-2', content: 'with ', highlight: 'Precision' },
];

const STATS = [
  { top: '100+', bottom: 'Projects' },
  { top: 'Homes', bottom: '& Interiors' },
  { top: 'Custom', bottom: '3D Murals & Idols' },
];

// ──────────────────────────────────────────────────────────────────
// Memoized Hardware-Overlay Hero Background Video
// - Keeps <video> at permanent opacity: 1 so Windows DirectComposition
//   never demotes/promotes the hardware video plane (eliminates shaking/glitching)
// - Uses an independent black curtain overlay above the video that fades out
//   smoothly at 0.9s after the founder portrait has appeared
// ──────────────────────────────────────────────────────────────────
const HeroBackgroundVideo = memo(function HeroBackgroundVideo({
  isIntroActive,
}) {
  const videoRef = useRef(null);
  const isHeroVisibleRef = useRef(true);
  const [curtainHidden, setCurtainHidden] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntroActive) {
      video.pause();
      setCurtainHidden(false);
      return;
    }

    // Start decoding/playing silently behind the black curtain so decoder is warm
    if (isHeroVisibleRef.current) {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    }

    // Fade out the black curtain overlay AFTER the founder portrait has appeared
    const timer = setTimeout(() => {
      setCurtainHidden(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [isIntroActive]);

  // Automatically pause Hero video only when completely scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    const heroEl = document.getElementById('hero-section');
    if (!video || !heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !isIntroActive) {
          if (video.paused) {
            const p = video.play();
            if (p !== undefined) p.catch(() => {});
          }
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isIntroActive]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#060504]">
      <video
        ref={videoRef}
        src="/video/herobackground.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-center"
      />

      {/* Directional dark overlay to preserve background sculptures & halo while ensuring crisp left-side text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8, 6, 4, 0.72) 0%, rgba(10, 8, 5, 0.42) 34%, rgba(10, 8, 5, 0.08) 58%, rgba(8, 6, 4, 0.22) 100%)',
        }}
      />
      {/* Top & bottom atmospheric vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6, 5, 3, 0.48) 0%, rgba(6, 5, 3, 0) 20%, rgba(6, 5, 3, 0) 82%, rgba(6, 5, 3, 0.65) 100%)',
        }}
      />

      {/* Independent Black Curtain Overlay — Fades out smoothly without touching <video> opacity */}
      <div
        aria-hidden="true"
        style={{
          opacity: curtainHidden ? 0 : 1,
          transition: 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="absolute inset-0 bg-[#060504] will-change-[opacity]"
      />
    </div>
  );
});

const MemoArtCollectionSection = memo(ArtCollectionSection);
const MemoArtisticProcessSection = memo(ArtisticProcessSection);
const MemoAboutSection = memo(AboutSection);
const MemoContactSection = memo(ContactSection);

// ──────────────────────────────────────────────────────────────────
// Floating Luxury "Back to Top" Button with Live Golden Progress Ring
// ──────────────────────────────────────────────────────────────────
const BackToTopButton = memo(function BackToTopButton({ onScrollToTop }) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const progressCircleRef = useRef(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * 21; // r = 21

    const updateProgress = (scrollY) => {
      const shouldShow = scrollY > 360;
      if (shouldShow !== visibleRef.current) {
        visibleRef.current = shouldShow;
        setVisible(shouldShow);
      }

      if (progressCircleRef.current) {
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
        const offset = circumference * (1 - ratio);
        progressCircleRef.current.style.strokeDashoffset = `${offset}`;
      }
    };

    const handleLenisScroll = (e) => {
      updateProgress(e.detail.scroll);
    };

    window.addEventListener('uday-lenis-scroll', handleLenisScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener('uday-lenis-scroll', handleLenisScroll);
    };
  }, []);

  const circumference = 2 * Math.PI * 21;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.82, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onScrollToTop}
          aria-label="Scroll back to top"
          title="Back to Top"
          className="
            group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50
            flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center
            rounded-full bg-[#110D09]/92
            shadow-[0_10px_28px_rgba(0,0,0,0.75),0_0_18px_rgba(218,165,75,0.2)]
            hover:bg-[#1A130C] hover:shadow-[0_12px_32px_rgba(232,184,96,0.38)]
            transition-colors cursor-pointer select-none
          "
        >
          {/* SVG Circular Golden Scroll Progress Ring */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke="rgba(218, 168, 82, 0.22)"
              strokeWidth="1.5"
            />
            <circle
              ref={progressCircleRef}
              cx="24"
              cy="24"
              r="21"
              stroke="#E8B860"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
            />
          </svg>

          {/* Upward Golden Arrow */}
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FBE39E] transition-transform duration-300 group-hover:-translate-y-0.5"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 14.5V3.5M9 3.5L4.5 8M9 3.5L13.5 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState('/video/mural.mp4');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    category: 'Divine Figures',
    details: '',
  });

  const lenisRef = useRef(null);

  // Pre-warm all gallery & section images in browser memory so category tabs & carousels load in 0ms
  useEffect(() => {
    const urls = [
      '/Background2.png',
      '/Backgroundthree.png',
      '/background4.png',
      '/background5.png',
      ...artworks.map((a) => a.image),
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, []);

  // ──────────────────────────────────────────────────────────────────
  // GSAP + Lenis 120Hz / 144Hz / 240Hz High-Refresh-Rate Smooth Scroll
  // Forces scroll position to top (0, 0) on mount & reload
  // ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: true,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });

    // Broadcast sub-frame scroll telemetry to Navbar & BackToTopButton
    lenis.on('scroll', ({ scroll, direction, velocity }) => {
      ScrollTrigger.update();
      window.dispatchEvent(
        new CustomEvent('uday-lenis-scroll', {
          detail: { scroll, direction, velocity },
        })
      );
    });

    // Bind Lenis directly to GSAP's high-frequency RAF ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause smooth scroll while intro splash or modals are open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (showIntro || processModalOpen || quoteModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [showIntro, processModalOpen, quoteModalOpen]);

  // Automatically sync Navbar active underline as user scrolls between Hero, Section 02, Section 03, Section 04, and Section 05
  useEffect(() => {
    const heroEl = document.getElementById('hero-section');
    const workEl = document.getElementById('art-collection');
    const processEl = document.getElementById('artistic-process');
    const aboutEl = document.getElementById('about-section');
    const contactEl = document.getElementById('contact-section');
    if (!heroEl || !workEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'hero-section') {
              setActiveTab((prev) => (prev === 'home' ? prev : 'home'));
            } else if (entry.target.id === 'art-collection') {
              setActiveTab((prev) => (prev === 'work' ? prev : 'work'));
            } else if (entry.target.id === 'artistic-process') {
              setActiveTab((prev) => (prev === 'process' ? prev : 'process'));
            } else if (entry.target.id === 'about-section') {
              setActiveTab((prev) => (prev === 'about' ? prev : 'about'));
            } else if (entry.target.id === 'contact-section') {
              setActiveTab((prev) => (prev === 'contact' ? prev : 'contact'));
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(heroEl);
    observer.observe(workEl);
    if (processEl) observer.observe(processEl);
    if (aboutEl) observer.observe(aboutEl);
    if (contactEl) observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  const handleScrollToWork = useCallback(() => {
    const el = document.getElementById('art-collection');
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectArtworkForQuote = useCallback((artwork) => {
    setQuoteForm((prev) => ({
      ...prev,
      category: artwork.category || 'Divine Figures',
      details: `Enquiring about "${artwork.title}" (${artwork.medium}, ${artwork.dimensions}).`,
    }));
    setQuoteModalOpen(true);
  }, []);

  const handleOpenQuote = useCallback(() => setQuoteModalOpen(true), []);
  const handleOpenProcess = useCallback(() => setProcessModalOpen(true), []);
  const handleIntroComplete = useCallback(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    setActiveTab('home');
    setShowIntro(false);
  }, []);

  const handleScrollToTop = useCallback(() => {
    setActiveTab('home');
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const text = [
      'UDAY ARTS — QUOTE INQUIRY',
      quoteForm.name && `Name: ${quoteForm.name}`,
      quoteForm.phone && `Phone: ${quoteForm.phone}`,
      `Category: ${quoteForm.category}`,
      quoteForm.details && `Details: ${quoteForm.details}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setQuoteModalOpen(false);
  };

  return (
    <div className="relative w-full min-h-[100svh] bg-[#060504] text-[#F7F4EE] overflow-x-hidden select-none">
      {/* ══════════════════════════════════════════════════════════════════
          FIRST INTRO SPLASH SCREEN (/video/intro.mp4)
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showIntro && (
          <IntroSplash key="intro-splash" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          SCULPTED FLOATING NAVBAR
          Reveals at Step 3 (after Black Background -> Founder Portrait)
          Shortens into Simplified Pill on Scroll Down; Normal on Scroll Up
          ══════════════════════════════════════════════════════════════════ */}
      {!showIntro && (
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenQuote={handleOpenQuote}
          onOpenProcess={handleOpenProcess}
          lenisRef={lenisRef}
          revealDelay={0.98}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 01: HERO (Choreographed 3-Stage Reveal)
          Stage 1 (0.00s): Pure Black Background (#060504)
          Stage 2 (0.15s): Founder Portrait (/artist.png) emerges first
          Stage 3 (0.92s): Hero Video + Left UI Text + Navbar reveal together
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero-section"
        className="relative w-full min-h-[100svh] lg:h-[100svh] flex flex-col justify-between lg:block overflow-hidden bg-[#060504]"
      >
        {/* Stage 1 -> Stage 3: Black Curtain then Smooth Video Reveal at 0.92s */}
        <HeroBackgroundVideo isIntroActive={showIntro} />

        {/* Stage 3 (1.02s+): Left-Side Hero UI Content (Centered on Mobile, Left-Aligned on Desktop) */}
        {!showIntro && (
          <div className="relative z-30 mx-auto w-full max-w-[1720px] px-5 sm:px-10 lg:px-[5.8%] pt-24 sm:pt-28 lg:pt-0 lg:h-full flex items-center justify-center lg:justify-start pointer-events-none">
            <div className="w-full max-w-[560px] xl:max-w-[640px] lg:mt-14 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto">
              {/* Small Eyebrow: 3D CNC CARVINGS + Gold Bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-3.5 sm:mb-4 xl:mb-5 flex flex-col items-center lg:items-start"
              >
                <p className="text-[11px] sm:text-[13px] xl:text-[14px] uppercase tracking-[0.36em] text-[#E5DFD3] font-normal">
                  3D CNC CARVINGS
                </p>
                <div className="mt-2.5 sm:mt-3 h-[2px] w-[56px] bg-gradient-to-r from-[#F7D788] via-[#DDA84E] to-[#B88028]" />
              </motion.div>

              {/* Main Heading: Line-by-Line Reveal */}
              <h1
                className="text-[38px] sm:text-[56px] md:text-[64px] lg:text-[68px] xl:text-[80px] 2xl:text-[88px] leading-[1.06] tracking-[-0.01em] font-normal text-[#F7F4EE]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {HEADING_LINES.map((line, index) => (
                  <span key={line.id} className="block overflow-hidden pb-1">
                    <motion.span
                      initial={{ opacity: 0, y: 42 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.08 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block will-change-transform"
                    >
                      {line.content}
                      {line.highlight && (
                        <span className="gold-italic-text pr-1 sm:pr-2">
                          {line.highlight}
                        </span>
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Description: Divine Murals | God Idols | 3D Sculptures | Interiors */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 sm:mt-5 xl:mt-6 text-[12px] sm:text-[15px] xl:text-[17.5px] font-light tracking-[0.025em] text-[#E4DEC8]/90"
              >
                <span>Divine Murals</span>
                <span className="mx-2 sm:mx-3 text-white/35">|</span>
                <span>God Idols</span>
                <span className="mx-2 sm:mx-3 text-white/35">|</span>
                <span>3D Sculptures</span>
                <span className="mx-2 sm:mx-3 text-white/35">|</span>
                <span>Interiors</span>
              </motion.p>

              {/* CTA Buttons: Get a Quote → & Watch Process */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 sm:mt-7 xl:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-5"
              >
                <button
                  type="button"
                  onClick={handleOpenQuote}
                  className="btn-gold-pill inline-flex items-center gap-2.5 sm:gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[15.5px] font-medium cursor-pointer"
                >
                  <span>Get a Quote</span>
                  <svg
                    className="w-4 h-4"
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

                <button
                  type="button"
                  onClick={handleOpenProcess}
                  className="btn-glass-pill inline-flex items-center gap-2.5 sm:gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[15.5px] font-normal cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#F7F4EE]"
                    viewBox="0 0 14 16"
                    fill="currentColor"
                  >
                    <path d="M2 1.8L12.5 8L2 14.2V1.8Z" />
                  </svg>
                  <span>Watch Process</span>
                </button>
              </motion.div>

              {/* Three Small Statistics Below Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 sm:mt-11 xl:mt-14 flex items-center justify-center lg:justify-start"
              >
                {STATS.map((stat, idx) => (
                  <div key={stat.top} className="flex items-center">
                    <div className="text-center lg:text-left">
                      <p
                        className="text-[18px] sm:text-[23px] xl:text-[26px] leading-tight font-normal text-[#F7F4EE]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {stat.top}
                      </p>
                      <p className="mt-0.5 text-[11px] sm:text-[12.5px] xl:text-[13.5px] font-light text-[#C4BCB0]">
                        {stat.bottom}
                      </p>
                    </div>

                    {idx < STATS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mx-4 sm:mx-7 xl:mx-8 h-8 sm:h-9 w-px bg-white/18"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Stage 2 (0.15s): Founder Portrait (/artist.png) — Reveals FIRST on the Black Background */}
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative lg:absolute z-20
              bottom-0
              mx-auto lg:mx-0
              mt-3 lg:mt-0
              w-[270px] sm:w-[360px] md:w-[430px]
              lg:w-[clamp(560px,41.2vw,790px)]
              lg:left-[52.4%] lg:-translate-x-1/2
              pointer-events-none flex items-end justify-center
              will-change-transform
            "
          >
            <img
              src="/artist.png"
              alt="Uday Arts Founder"
              decoding="async"
              className="founder-portrait-img w-full h-auto max-h-[48svh] sm:max-h-[56svh] lg:max-h-[96.8svh] object-contain object-bottom"
            />
          </motion.div>
        )}

        {/* 4. Soft Bottom Transition Feather Bridge into Section 02 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-20"
          style={{
            background:
              'linear-gradient(180deg, rgba(9, 7, 5, 0) 0%, rgba(9, 7, 5, 0.6) 55%, #090705 100%)',
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 02: THE ART COLLECTION (/Background2.png)
          ══════════════════════════════════════════════════════════════════ */}
      <MemoArtCollectionSection
        onSelectArtworkForQuote={handleSelectArtworkForQuote}
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 03: THE ARTISTIC PROCESS (/Backgroundthree.png)
          ══════════════════════════════════════════════════════════════════ */}
      <MemoArtisticProcessSection />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 04: ABOUT UDAY ARTS (/background4.png + /artist.png)
          ══════════════════════════════════════════════════════════════════ */}
      <MemoAboutSection onDiscoverWork={handleScrollToWork} />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 05: CONTACT (/background5.png)
          ══════════════════════════════════════════════════════════════════ */}
      <MemoContactSection />

      {/* ══════════════════════════════════════════════════════════════════
          LUXURY CHARCOAL & GOLD EDITORIAL FOOTER
          ══════════════════════════════════════════════════════════════════ */}
      <Footer
        lenisRef={lenisRef}
        onSelectTab={setActiveTab}
        onOpenQuote={handleOpenQuote}
        onOpenProcess={handleOpenProcess}
        onScrollToTop={handleScrollToTop}
      />

      {/* ══════════════════════════════════════════════════════════════════
          FLOATING BACK TO TOP BUTTON WITH GOLDEN SCROLL PROGRESS RING
          ══════════════════════════════════════════════════════════════════ */}
      {!showIntro && <BackToTopButton onScrollToTop={handleScrollToTop} />}

      {/* ══════════════════════════════════════════════════════════════════
          WATCH PROCESS VIDEO MODAL (/video/mural.mp4 & /video/intro.mp4)
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {processModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-6 select-text"
            onClick={() => setProcessModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#D8A54B]/45 bg-[#120E0A] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-lg tracking-[0.18em] uppercase text-[#F7F4EE]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Uday Arts — Crafting Process
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveVideo('/video/mural.mp4')}
                    className={`rounded-full px-3.5 py-1 text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      activeVideo === '/video/mural.mp4'
                        ? 'bg-[#D8A54B] text-[#1A1105] font-semibold'
                        : 'border border-white/20 text-[#E5DFD3]'
                    }`}
                  >
                    Mural Showcase
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveVideo('/video/intro.mp4')}
                    className={`rounded-full px-3.5 py-1 text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      activeVideo === '/video/intro.mp4'
                        ? 'bg-[#D8A54B] text-[#1A1105] font-semibold'
                        : 'border border-white/20 text-[#E5DFD3]'
                    }`}
                  >
                    Replay Intro
                  </button>
                  <button
                    type="button"
                    onClick={() => setProcessModalOpen(false)}
                    className="ml-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="aspect-video w-full bg-black">
                <video
                  key={activeVideo}
                  src={activeVideo}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          GET A QUOTE MODAL
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {quoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-6 select-text"
            onClick={() => setQuoteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-lg rounded-2xl border border-[#D8A54B]/45 bg-[#14100B] p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#D8A54B]">
                    3D CNC Carvings &amp; Murals
                  </p>
                  <h2
                    className="mt-1 text-2xl sm:text-3xl font-normal text-[#F7F4EE]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    Request a Custom Quote
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#C4BCB0] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/35 focus:border-[#D8A54B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#C4BCB0] mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, phone: e.target.value })
                    }
                    placeholder="+91"
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/35 focus:border-[#D8A54B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#C4BCB0] mb-1.5">
                    Category
                  </label>
                  <select
                    value={quoteForm.category}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/15 bg-[#120E0A] px-4 py-2.5 text-sm text-white focus:border-[#D8A54B] focus:outline-none"
                  >
                    <option value="Divine Figures">Divine Figures</option>
                    <option value="3D Sculptures">3D Sculptures</option>
                    <option value="Wall Murals">Wall Murals</option>
                    <option value="Interior Panels">Interior Panels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#C4BCB0] mb-1.5">
                    Wall Dimensions &amp; Project Details
                  </label>
                  <textarea
                    rows={3}
                    value={quoteForm.details}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, details: e.target.value })
                    }
                    placeholder="Approximate dimensions, location, or reference..."
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/35 focus:border-[#D8A54B] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold-pill w-full rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer"
                >
                  Send Inquiry on WhatsApp →
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
