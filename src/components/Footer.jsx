import { memo } from 'react';
import { motion } from 'framer-motion';
import { IG, IG3, YT } from '../utils/constants.js';
import { WHATSAPP } from '../data/artworks.js';

const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Hello UDAY ARTS, I would like to discuss a custom artwork project.'
)}`;

const NAV_LINKS = [
  { num: '01', label: 'Home', targetId: 'hero-section', tab: 'home' },
  { num: '02', label: 'Our Work', targetId: 'art-collection', tab: 'work' },
  {
    num: '03',
    label: 'The Process',
    targetId: 'artistic-process',
    tab: 'process',
  },
  { num: '04', label: 'About Studio', targetId: 'about-section', tab: 'about' },
  { num: '05', label: 'Get in Touch', targetId: 'contact-section', tab: 'contact' },
];

const CRAFT_SPECIALTIES = [
  'Divine Figures & God Idols',
  '3D CNC Sculptures',
  'Devotional Wall Murals',
  'Luxury Interior Panels',
  'Custom Home Pooja Art',
];

function Footer({
  lenisRef,
  onSelectTab,
  onOpenQuote,
  onOpenProcess,
  onScrollToTop,
}) {
  const prefersReducedMotion = false;

  const handleSectionScroll = (targetId, tab) => {
    if (onSelectTab && tab) onSelectTab(tab);
    if (targetId === 'hero-section') {
      if (onScrollToTop) {
        onScrollToTop();
        return;
      }
    }
    const el = document.getElementById(targetId);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      aria-label="UDAY ARTS Footer"
      className="relative w-full overflow-hidden bg-[#050403] text-[#F7F4EE] select-none pt-14 sm:pt-18 pb-10 sm:pb-12"
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. SEAMLESS TOP ARCHITECTURAL GOLD FILAMENT & DIAMOND FLARE
          Bridges Section 05 (/background5.png) into the Charcoal-Gold Footer
          ══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{
          background:
            'linear-gradient(180deg, #070504 0%, rgba(5, 4, 3, 0.92) 60%, #050403 100%)',
        }}
      />

      <div
        aria-hidden="true"
        className="relative z-10 mx-auto max-w-[1640px] px-6 sm:px-10 lg:px-[5.5%] mb-12 sm:mb-16"
      >
        <div className="relative flex items-center justify-center">
          {/* Left Sweeping Gold Line */}
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                'linear-gradient(90deg, rgba(216,165,75,0) 0%, rgba(216,165,75,0.45) 55%, #FCE49E 100%)',
            }}
          />

          {/* Center Sculpted Diamond Light Flare (Clean — No Offset Blur Smudge) */}
          <div className="relative mx-3 sm:mx-4 flex items-center justify-center">
            <svg
              className="relative z-10 w-6 h-3 sm:w-7 sm:h-3.5 text-[#FFF2C2] drop-shadow-[0_0_8px_rgba(232,184,96,0.55)]"
              viewBox="0 0 28 14"
              fill="none"
            >
              <polygon
                points="14,1 27,7 14,13 1,7"
                fill="currentColor"
                opacity="0.95"
              />
              <polygon
                points="14,4 21,7 14,10 7,7"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* Right Sweeping Gold Line */}
          <div
            className="h-[1px] flex-1"
            style={{
              background:
                'linear-gradient(270deg, rgba(216,165,75,0) 0%, rgba(216,165,75,0.45) 55%, #FCE49E 100%)',
            }}
          />
        </div>
      </div>

      {/* Subtle Warm Radial Ambient Glow in Footer Center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(216, 165, 75, 0.07) 0%, rgba(12, 9, 6, 0.02) 55%, transparent 80%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          2. MAIN EDITORIAL FOOTER GRID
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
        className="relative z-10 mx-auto max-w-[1640px] px-6 sm:px-10 lg:px-[5.5%]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-8 pb-12 sm:pb-16 border-b border-white/10">
          {/* ── COLUMN 1: BRAND IDENTITY (Full width on mobile, 4 cols on desktop) ── */}
          <div className="col-span-2 lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left pr-0 lg:pr-8">
            <button
              type="button"
              onClick={() => handleSectionScroll('hero-section', 'home')}
              className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
            >
              <div className="relative h-12 w-12 rounded-full p-[1.5px] bg-gradient-to-b from-white/90 via-[#D8A54B] to-white/30 shadow-[0_0_22px_rgba(232,184,96,0.22)]">
                <img
                  src="/logo.png"
                  alt="Uday Arts Official Logo"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <span
                  className="block text-[22px] sm:text-[25px] tracking-[0.22em] uppercase text-[#F7F4EE] group-hover:text-[#FBE39E] transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  UDAY ARTS
                </span>
                <span className="block text-[9.5px] uppercase tracking-[0.32em] text-[#D8A54B]">
                  3D CNC Carvings &amp; Sculptures
                </span>
              </div>
            </button>

            <p className="mt-5 text-[13.5px] sm:text-[14.5px] leading-[1.72] font-light text-[#CFC7B8]/85 max-w-[390px]">
              A bespoke creative studio specializing in 3D CNC figures, divine
              sculptures, carved wall murals, and architectural interior panels
              crafted to endure for generations.
            </p>

            {/* Social Media Icon Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
              {/* Instagram Main */}
              <a
                href={IG}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="UDAY ARTS on Instagram"
                title="Instagram (@udayyy_arts)"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D8A54B]/35 bg-[#110D09] px-4 py-2 text-[11.5px] tracking-[0.12em] uppercase text-[#E6E0D5] hover:border-[#F7D788] hover:text-[#FFF2C2] transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#E5B55F]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                <span>Instagram</span>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with UDAY ARTS on WhatsApp"
                title="WhatsApp Studio Direct"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D8A54B]/35 bg-[#110D09] px-4 py-2 text-[11.5px] tracking-[0.12em] uppercase text-[#E6E0D5] hover:border-[#F7D788] hover:text-[#FFF2C2] transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#E5B55F]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.01 8.49 7.01 9.71C7.01 10.93 7.9 12.11 8.02 12.27C8.14 12.44 9.77 14.94 12.25 16.01C14.34 16.91 14.77 16.73 15.22 16.69C15.67 16.65 16.68 16.09 16.89 15.51C17.1 14.93 17.1 14.43 17.04 14.33C16.97 14.23 16.81 14.16 16.56 14.04C16.31 13.92 15.09 13.31 14.86 13.23C14.63 13.15 14.47 13.11 14.3 13.36C14.14 13.61 13.66 14.16 13.52 14.33C13.38 14.49 13.23 14.51 12.98 14.39C12.73 14.27 11.93 14 10.97 13.15C10.23 12.49 9.73 11.67 9.58 11.42C9.44 11.17 9.56 11.04 9.69 10.91C9.8 10.8 9.94 10.62 10.06 10.48C10.18 10.33 10.22 10.23 10.31 10.06C10.39 9.9 10.35 9.75 10.29 9.63C10.22 9.51 9.73 8.29 9.52 7.79C9.32 7.31 9.11 7.38 8.96 7.37C8.81 7.36 8.65 7.33 8.53 7.33Z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* YouTube Channel */}
              <a
                href={YT}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="UDAY ARTS on YouTube"
                title="YouTube Channel"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D8A54B]/35 bg-[#110D09] px-4 py-2 text-[11.5px] tracking-[0.12em] uppercase text-[#E6E0D5] hover:border-[#F7D788] hover:text-[#FFF2C2] transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#E5B55F]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.6 7.2C21.4 6.3 20.7 5.6 19.8 5.4C18.2 5 12 5 12 5C12 5 5.8 5 4.2 5.4C3.3 5.6 2.6 6.3 2.4 7.2C2 8.8 2 12 2 12C2 12 2 15.2 2.4 16.8C2.6 17.7 3.3 18.4 4.2 18.6C5.8 19 12 19 12 19C12 19 18.2 19 19.8 18.6C20.7 18.4 21.4 17.7 21.6 16.8C22 15.2 22 12 22 12C22 12 22 8.8 21.6 7.2ZM10 15V9L15.2 12L10 15Z" />
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: NAVIGATION (1 col on mobile, 2 cols on desktop) ── */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E5B55F] font-medium mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.num}>
                  <button
                    type="button"
                    onClick={() => handleSectionScroll(item.targetId, item.tab)}
                    className="group flex items-center gap-2.5 text-[13.5px] font-light text-[#D8D0C2] hover:text-[#FFF2C2] transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] tracking-[0.14em] text-[#8E8474] group-hover:text-[#E5B55F] transition-colors">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 3: CRAFT & SPECIALTIES (1 col on mobile, 3 cols on desktop) ── */}
          <div className="col-span-1 lg:col-span-3 flex flex-col items-start">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E5B55F] font-medium mb-4">
              Our Craftsmanship
            </p>
            <ul className="space-y-2.5">
              {CRAFT_SPECIALTIES.map((spec) => (
                <li key={spec}>
                  <button
                    type="button"
                    onClick={() =>
                      handleSectionScroll('art-collection', 'work')
                    }
                    className="group flex items-center gap-2.5 text-[13.5px] font-light text-[#D8D0C2] hover:text-[#FFF2C2] transition-colors cursor-pointer text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[#D8A54B]/70 group-hover:bg-[#FFF0B8] transition-colors"
                    />
                    <span>{spec}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 4: STUDIO COMMISSIONS & DIRECT CONTACT (Full width on mobile, 3 cols on desktop) ── */}
          <div className="col-span-2 lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E5B55F] font-medium mb-4">
              Custom Commissions
            </p>
            <p className="text-[13px] sm:text-[13.5px] leading-[1.68] font-light text-[#CFC7B8]/85 mb-4">
              Every sculpture and wall relief is custom-scaled to your
              architectural space. Reach out for consultations and quotes.
            </p>

            <div className="space-y-1.5 text-[13px] text-[#E6E0D5] mb-5">
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#FBE39E] transition-colors"
              >
                <span className="text-[#9E9585] mr-2">WhatsApp:</span>
                +91 63093 79050
              </a>
              <a
                href={IG3}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#FBE39E] transition-colors"
              >
                <span className="text-[#9E9585] mr-2">3D Studio IG:</span>
                @udayarts_3d_carvings
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={onOpenQuote}
                className="btn-gold-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] cursor-pointer"
              >
                <span>Request a Quote</span>
                <span>→</span>
              </button>

              {onOpenProcess && (
                <button
                  type="button"
                  onClick={onOpenProcess}
                  className="btn-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11.5px] uppercase tracking-[0.12em] cursor-pointer"
                >
                  <span>Watch Process</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            3. BOTTOM COPYRIGHT & BACK-TO-TOP BAR
            ══════════════════════════════════════════════════════════════════ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] sm:text-[12px] font-light tracking-[0.06em] text-[#9E9585]">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="text-[#EAE3D5] font-normal">UDAY ARTS</span>. All
            rights reserved.
          </p>

          <p className="text-center text-[#B8AE9E]">
            Crafted with{' '}
            <span className="gold-italic-text text-[13.5px] px-0.5">
              Precision
            </span>{' '}
            &amp; Devotion
          </p>

          <button
            type="button"
            onClick={onScrollToTop}
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[11px] text-[#E5B55F] hover:text-[#FFF2C2] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#D8A54B]/45 bg-[#120E0A] transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}

export default memo(Footer);

