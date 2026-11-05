import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroSplash({ onComplete }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const isEndingRef = useRef(false);

  const finishIntro = () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // ignore
      }
    }
    if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay is blocked by browser settings, fallback gracefully
      });
    }
  }, []);

  // Direct DOM transform update — ZERO React re-renders during video playback
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !video.duration || !bar) return;
    const ratio = Math.min(1, Math.max(0, video.currentTime / video.duration));
    bar.style.transform = `scaleX(${ratio})`;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060503] overflow-hidden select-none will-change-[opacity]"
    >
      {/* Subtle warm radial glow behind video on mobile portrait screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(218, 165, 75, 0.12) 0%, rgba(6, 5, 3, 0.98) 70%)',
        }}
      />

      {/* Full-Screen Intro Splash Video (/video/intro.mp4)
          Uses object-contain on mobile portrait so the full 16:9 widescreen intro animation
          is centered and never clipped on the sides; object-cover on desktop */}
      <video
        ref={videoRef}
        src="/video/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishIntro}
        onError={finishIntro}
        style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
        className="h-full w-full object-contain md:object-cover object-center"
      />

      {/* Subtle atmospheric vignette around the splash edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 58%, rgba(5, 4, 2, 0.65) 100%)',
        }}
      />

      {/* Bottom Controls Bar: Brand Signature, Golden Progress Track & Skip Intro CTA */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 sm:p-8 lg:px-[5.8%] lg:pb-9 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between gap-3 sm:gap-4">
          {/* Left: Official Logo + Brand Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src="/logo.webp"
              alt="Uday Arts"
              decoding="async"
              className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full border border-white/50 object-cover"
            />
            <div className="min-w-0">
              <p
                className="text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#F7F4EE] truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                UDAY ARTS
              </p>
              <p className="text-[8.5px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#D8A54B] truncate">
                3D CNC Carvings &amp; Divine Murals
              </p>
            </div>
          </div>

          {/* Right: Skip Intro Pill Button */}
          <button
            type="button"
            onClick={finishIntro}
            className="btn-glass-pill shrink-0 inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#F7F4EE] cursor-pointer"
          >
            <span>Skip Intro</span>
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F6D686]"
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

        {/* Thin Golden Progress Line (GPU scaleX — no layout thrashing) */}
        <div className="mx-auto mt-3 sm:mt-4 h-[2px] w-full max-w-[1720px] overflow-hidden rounded-full bg-white/12">
          <div
            ref={progressBarRef}
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            className="h-full w-full bg-gradient-to-r from-[#C88E35] via-[#F7D788] to-[#FFF2C2] will-change-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}
