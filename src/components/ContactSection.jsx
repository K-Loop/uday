import { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { IG } from '../utils/constants.js';
import { WHATSAPP } from '../data/artworks.js';

const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

const WHATSAPP_PREFILLED_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Hello UDAY ARTS, I would like to discuss a custom artwork project.'
)}`;

const INSTAGRAM_FEATURES = [
  { id: 'latest-work', label: 'Latest Work' },
  { id: 'studio-updates', label: 'Studio Updates' },
  { id: 'new-creations', label: 'New Creations' },
];

const WHATSAPP_FEATURES = [
  { id: 'quick-reply', label: 'Quick Reply' },
  { id: 'project-discussion', label: 'Project Discussion' },
  { id: 'custom-quote', label: 'Custom Quote' },
];

// ──────────────────────────────────────────────────────────────────
// Feature Line Icons matching the Section 05 Reference Image
// ──────────────────────────────────────────────────────────────────
function FeatureIcon({ id }) {
  switch (id) {
    case 'latest-work':
      // Framed picture / mountain & sun gallery icon
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.5"
            y="3.5"
            width="15"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="7" cy="7.5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M3.5 14.5L7.8 10.5L11.2 13.5L13.8 11.2L16.5 14.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'studio-updates':
      // Clapperboard / studio reel icon
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7.5H17V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V7.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M3 5.2C3 4.37157 3.67157 3.7 4.5 3.7H15.5C16.3284 3.7 17 4.37157 17 5.2V7.5H3V5.2Z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M6.5 3.8L8.2 7.4M11.5 3.8L13.2 7.4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'new-creations':
      // Star with sparkle icon
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2.5L12.1 7.1L17.1 7.7L13.4 11.1L14.4 16.1L10 13.6L5.6 16.1L6.6 11.1L2.9 7.7L7.9 7.1L10 2.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'quick-reply':
      // Chat bubble with 3 dots icon
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 16.5C13.866 16.5 17 13.6944 17 10.2C17 6.70558 13.866 3.9 10 3.9C6.13401 3.9 3 6.70558 3 10.2C3 11.68 3.57 13.04 4.52 14.11L3.4 16.6L6.45 15.68C7.51 16.2 8.72 16.5 10 16.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="7.4" cy="10.2" r="0.9" fill="currentColor" />
          <circle cx="10" cy="10.2" r="0.9" fill="currentColor" />
          <circle cx="12.6" cy="10.2" r="0.9" fill="currentColor" />
        </svg>
      );

    case 'project-discussion':
      // Document with lines icon
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3.2H12.2L15.5 6.5V16.2C15.5 16.7523 15.0523 17.2 14.5 17.2H5C4.44772 17.2 4 16.7523 4 16.2V4.2C4 3.64772 4.44772 3.2 5 3.2Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M12 3.3V6.8H15.4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M6.8 10H12.8M6.8 12.6H12.8M6.8 15H10.4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'custom-quote':
    default:
      // Handshake / partnership icon matching reference
      return (
        <svg
          className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#EAE3D5]/90 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 9.2L6.2 5.8C7.1 5 8.4 5 9.3 5.8L10.3 6.7C11.1 5.9 12.5 5.9 13.4 6.7L17.5 10.2L14.2 14.2C13.2 15.3 11.5 15.5 10.3 14.5L9.8 15C8.7 16 7 15.9 6 14.8L2.5 9.2Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 10.2L9.5 8.4L12.2 10.8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

// ──────────────────────────────────────────────────────────────────
// External Link Arrow Icon (Square with Northeast Arrow matching Reference)
// ──────────────────────────────────────────────────────────────────
function ExternalArrowIcon() {
  return (
    <svg
      className="w-4 h-4 sm:w-[17px] sm:h-[17px] transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 4.5H13.5V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 4.8L5.2 12.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────
// 3D Glossy Sculpted Instagram Badge Icon (Matches Reference)
// ──────────────────────────────────────────────────────────────────
function GlossyInstagramBadge({ hovered }) {
  return (
    <div
      className="relative w-[78px] h-[78px] sm:w-[88px] sm:h-[88px] xl:w-[94px] xl:h-[94px] rounded-[22px] sm:rounded-[25px] select-none transition-transform duration-500 ease-out"
      style={{
        transform: hovered
          ? 'translate3d(0, -3px, 0) scale(1.05)'
          : 'translate3d(0, 0, 0) scale(1)',
        boxShadow: hovered
          ? '0 18px 42px rgba(229, 62, 106, 0.52), 0 0 32px rgba(184, 41, 167, 0.48), inset 0 2px 3px rgba(255, 255, 255, 0.65)'
          : '0 14px 32px rgba(0, 0, 0, 0.72), 0 0 22px rgba(215, 56, 128, 0.28), inset 0 1.5px 2px rgba(255, 255, 255, 0.5)',
        background:
          'radial-gradient(circle at 28% 102%, #FDCF62 0%, #F77737 26%, #E1306C 54%, #B829A7 78%, #5837EB 100%)',
      }}
    >
      {/* Top 3D Glass Bevel Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] rounded-[20px] sm:rounded-[23px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 38%, rgba(0,0,0,0.12) 85%, rgba(0,0,0,0.32) 100%)',
          border: '1px solid rgba(255,255,255,0.34)',
        }}
      />

      {/* Crisp White Instagram Camera Glyph */}
      <svg
        className="relative z-10 w-full h-full p-[18px] sm:p-[20px] xl:p-[21px] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10.5"
          stroke="currentColor"
          strokeWidth="3.6"
        />
        <circle
          cx="24"
          cy="24"
          r="8.2"
          stroke="currentColor"
          strokeWidth="3.6"
        />
        <circle cx="34.2" cy="13.8" r="2.4" fill="currentColor" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// 3D Glossy Sculpted WhatsApp Badge Icon (Matches Reference)
// ──────────────────────────────────────────────────────────────────
function GlossyWhatsAppBadge({ hovered }) {
  return (
    <div
      className="relative w-[78px] h-[78px] sm:w-[88px] sm:h-[88px] xl:w-[94px] xl:h-[94px] rounded-[22px] sm:rounded-[25px] select-none transition-transform duration-500 ease-out"
      style={{
        transform: hovered
          ? 'translate3d(0, -3px, 0) scale(1.05)'
          : 'translate3d(0, 0, 0) scale(1)',
        boxShadow: hovered
          ? '0 18px 42px rgba(31, 175, 80, 0.54), 0 0 32px rgba(46, 218, 102, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.65)'
          : '0 14px 32px rgba(0, 0, 0, 0.72), 0 0 22px rgba(31, 175, 80, 0.28), inset 0 1.5px 2px rgba(255, 255, 255, 0.48)',
        background:
          'radial-gradient(circle at 32% 20%, #48F076 0%, #1FAF50 48%, #0E7A32 82%, #074C1D 100%)',
      }}
    >
      {/* Top 3D Glass Bevel Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] rounded-[20px] sm:rounded-[23px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.35) 100%)',
          border: '1px solid rgba(255,255,255,0.32)',
        }}
      />

      {/* Crisp White Official WhatsApp Speech Bubble + Centered Handset Glyph */}
      <svg
        className="relative z-10 w-full h-full p-[15px] sm:p-[17px] xl:p-[18px] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.38)]"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.01 8.49 7.01 9.71C7.01 10.93 7.9 12.11 8.02 12.27C8.14 12.44 9.77 14.94 12.25 16.01C14.34 16.91 14.77 16.73 15.22 16.69C15.67 16.65 16.68 16.09 16.89 15.51C17.1 14.93 17.1 14.43 17.04 14.33C16.97 14.23 16.81 14.16 16.56 14.04C16.31 13.92 15.09 13.31 14.86 13.23C14.63 13.15 14.47 13.11 14.3 13.36C14.14 13.61 13.66 14.16 13.52 14.33C13.38 14.49 13.23 14.51 12.98 14.39C12.73 14.27 11.93 14 10.97 13.15C10.23 12.49 9.73 11.67 9.58 11.42C9.44 11.17 9.56 11.04 9.69 10.91C9.8 10.8 9.94 10.62 10.06 10.48C10.18 10.33 10.22 10.23 10.31 10.06C10.39 9.9 10.35 9.75 10.29 9.63C10.22 9.51 9.73 8.29 9.52 7.79C9.32 7.31 9.11 7.38 8.96 7.37C8.81 7.36 8.65 7.33 8.53 7.33Z" />
      </svg>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = false;

  // Strictly independent hover state for each contact panel
  const [igHovered, setIgHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  // Subtle GPU-friendly background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-2%', '2%']
  );

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      aria-labelledby="contact-heading"
      className="relative w-full min-h-[100svh] overflow-hidden select-none bg-[#070504] flex flex-col justify-between py-20 sm:py-24 lg:py-28"
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. ACTUAL SUPPLIED SECTION 05 BACKGROUND IMAGE (/background5.png)
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        className="section-bg-feather-top pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.img
          src="/background5.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            y: bgY,
            transform: 'translate3d(0, 0, 0)',
          }}
          className="h-full w-full object-cover object-center will-change-transform"
        />

        {/* Subtle radial dark balance in the center so typography remains crystal-clear while preserving the left bronze carvings, right sculpted face, and bottom gold curves */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 34%, rgba(7, 5, 4, 0.34) 0%, rgba(7, 5, 4, 0.12) 52%, rgba(5, 4, 3, 0.28) 100%)',
          }}
        />
      </motion.div>

      {/* Seamless Top Velvet Transition Bridge from Section 04 into Section 05 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 sm:h-32"
        style={{
          background:
            'linear-gradient(180deg, #080604 0%, rgba(8, 6, 4, 0.72) 40%, rgba(8, 6, 4, 0) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          2. FOREGROUND CONTENT CONTAINER (Header + Interactive Contact Panels)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 my-auto pt-4 sm:pt-6 pb-8 sm:pb-12">
        {/* ── SECTION HEADER (Centred Editorial Identity Matching Reference) ── */}
        <div className="mx-auto max-w-[880px] text-center">
          {/* Editorial Section Identity: 05 | GET IN TOUCH */}
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, delay: 0.1, ease: EASE_EDITORIAL }}
            className="inline-flex items-center justify-center gap-5 sm:gap-7 mb-2 sm:mb-3"
          >
            <span
              className="gold-number-02 text-[44px] sm:text-[54px] lg:text-[62px] leading-none font-normal tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              05
            </span>

            {/* Fine Metallic Gold Vertical Divider */}
            <span
              aria-hidden="true"
              className="h-10 sm:h-12 w-[1px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(247, 215, 136, 0.12) 0%, #E5B55F 50%, rgba(247, 215, 136, 0.12) 100%)',
              }}
            />

            <span className="text-[11.5px] sm:text-[13px] lg:text-[14px] uppercase tracking-[0.34em] text-[#EAE3D5] font-normal">
              GET IN TOUCH
            </span>
          </motion.div>

          {/* Main Heading: "Let's Create Something Unique." */}
          <motion.h2
            id="contact-heading"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EDITORIAL }}
            className="text-[34px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] leading-[1.08] tracking-[-0.01em] font-normal text-[#F7F4EE]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Let’s Create Something{' '}
            <span className="gold-italic-text pr-1">Unique.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.3, ease: EASE_EDITORIAL }}
            className="mt-3.5 sm:mt-4 text-[13.5px] sm:text-[15.5px] lg:text-[16.5px] font-light tracking-[0.015em] text-[#DFD8CA]/90 max-w-[680px] mx-auto"
          >
            Have a custom idea or a space to transform? Reach out to us on your
            preferred platform.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            3. TWO INTERACTIVE CONTACT PANELS (Instagram Left | WhatsApp Right)
            Equal width & height on desktop, separated by the vertical gold
            light filament + 4-point star flare from the reference design.
            ══════════════════════════════════════════════════════════════════ */}
        <div className="relative mt-9 sm:mt-11 lg:mt-13 mx-auto max-w-[1160px] grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-11 items-stretch">
          {/* Center Vertical Golden Light Filament & 4-Point Star Flare (Desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex absolute inset-y-8 left-1/2 -translate-x-1/2 z-20 items-center justify-center"
          >
            {/* Vertical Golden Line */}
            <div
              className="h-full w-[1px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(232,184,96,0) 0%, rgba(232,184,96,0.35) 30%, #FFF2C2 50%, rgba(232,184,96,0.35) 70%, rgba(232,184,96,0) 100%)',
              }}
            />
            {/* Glowing 4-Point Star Flare */}
            <div className="absolute top-[56%] -translate-y-1/2 flex items-center justify-center">
              <div className="h-7 w-7 rounded-full bg-[#F7CA68]/35 blur-[6px]" />
              <svg
                className="absolute w-6 h-6 text-[#FFF6D6]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1C12.5 7.5 14 9.5 21 12C14 14.5 12.5 16.5 12 23C11.5 16.5 10 14.5 3 12C10 9.5 11.5 7.5 12 1Z" />
              </svg>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────────
              LEFT PANEL: INSTAGRAM
              Strictly independent hover state (`igHovered`)
              ──────────────────────────────────────────────────────────────── */}
          <motion.a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with UDAY ARTS on Instagram"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, delay: 0.36, ease: EASE_EDITORIAL }}
            onMouseEnter={() => setIgHovered(true)}
            onMouseLeave={() => setIgHovered(false)}
            onFocus={() => setIgHovered(true)}
            onBlur={() => setIgHovered(false)}
            style={{
              transform:
                igHovered && !prefersReducedMotion
                  ? 'translate3d(0, -6px, 0) scale(1.01)'
                  : 'translate3d(0, 0, 0) scale(1)',
              transition:
                'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: igHovered
                ? '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 42px rgba(216, 46, 138, 0.32), inset 0 0 32px rgba(229, 62, 106, 0.14)'
                : '0 18px 46px rgba(0, 0, 0, 0.75), 0 0 24px rgba(194, 42, 134, 0.14), inset 0 0 18px rgba(194, 42, 134, 0.06)',
            }}
            className="group/card relative flex flex-col items-center justify-between rounded-[26px] sm:rounded-[30px] p-[1.5px] overflow-hidden cursor-pointer focus:outline-none"
          >
            {/* Dynamic Gradient Border Layer (Magenta / Purple / Amber-Gold matching Reference) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[30px] transition-opacity duration-500"
              style={{
                background: igHovered
                  ? 'linear-gradient(135deg, #FF47B6 0%, #B829A7 28%, #FFB957 54%, #E53E6A 80%, #FF55B8 100%)'
                  : 'linear-gradient(135deg, rgba(236, 64, 168, 0.78) 0%, rgba(154, 42, 142, 0.38) 32%, rgba(242, 174, 84, 0.65) 55%, rgba(198, 56, 98, 0.42) 80%, rgba(232, 68, 152, 0.68) 100%)',
              }}
            />

            {/* Top & Bottom Specular Rim Light Flares on Card Frame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-[22%] h-[2px] w-32 bg-gradient-to-r from-transparent via-[#FF7CE5] to-transparent transition-opacity duration-500"
              style={{ opacity: igHovered ? 1 : 0.75 }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-[20%] h-[2px] w-28 bg-gradient-to-r from-transparent via-[#FFD88A] to-transparent transition-opacity duration-500"
              style={{ opacity: igHovered ? 1 : 0.75 }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-48 bg-gradient-to-r from-transparent via-[#FF76A8] to-transparent transition-opacity duration-500"
              style={{ opacity: igHovered ? 1 : 0.7 }}
            />

            {/* Inner Translucent Dark Glass Surface */}
            <div
              className="relative z-10 flex h-full w-full flex-col items-center justify-between rounded-[24.5px] sm:rounded-[28.5px] px-6 sm:px-9 lg:px-10 py-8 sm:py-10 text-center overflow-hidden transition-colors duration-500"
              style={{
                background: igHovered
                  ? 'radial-gradient(circle at 50% 24%, rgba(188, 38, 125, 0.28) 0%, rgba(92, 22, 64, 0.24) 42%, rgba(14, 9, 13, 0.84) 88%)'
                  : 'radial-gradient(circle at 50% 24%, rgba(148, 30, 102, 0.16) 0%, rgba(46, 12, 34, 0.18) 42%, rgba(12, 9, 11, 0.84) 88%)',
              }}
            >
              {/* 1. Large Angled Instagram Watermark in Top-Left Background (Matches Reference) */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -left-6 w-48 h-48 sm:w-56 sm:h-56 -rotate-[14deg] transition-all duration-500"
                style={{
                  opacity: igHovered ? 0.16 : 0.085,
                  transform: igHovered
                    ? 'rotate(-11deg) scale(1.05)'
                    : 'rotate(-14deg) scale(1)',
                }}
                viewBox="0 0 100 100"
                fill="none"
              >
                <rect
                  x="10"
                  y="10"
                  width="80"
                  height="80"
                  rx="22"
                  stroke="#E85CA8"
                  strokeWidth="7"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="19"
                  stroke="#E85CA8"
                  strokeWidth="7"
                />
                <circle cx="72" cy="28" r="5" fill="#E85CA8" />
              </svg>

              {/* 2. Sweeping Magenta / Pink / Orange Light Ribbon Behind Icon (Matches Reference) */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-6 w-full h-48 transition-opacity duration-500"
                style={{ opacity: igHovered ? 1 : 0.72 }}
                viewBox="0 0 520 200"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="igRibbonArc"
                    x1="15%"
                    y1="20%"
                    x2="95%"
                    y2="85%"
                  >
                    <stop offset="0%" stopColor="#9B28B0" stopOpacity="0" />
                    <stop offset="38%" stopColor="#F76B45" stopOpacity="0.88" />
                    <stop offset="68%" stopColor="#E52E8A" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#7A1C6E" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient
                    id="igIconHalo"
                    cx="50%"
                    cy="38%"
                    r="42%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#FF5CA8"
                      stopOpacity={igHovered ? '0.44' : '0.24'}
                    />
                    <stop
                      offset="55%"
                      stopColor="#A8247E"
                      stopOpacity={igHovered ? '0.2' : '0.08'}
                    />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="260" cy="70" rx="170" ry="70" fill="url(#igIconHalo)" />
                <path
                  d="M 190 58 C 300 54, 415 88, 495 168"
                  stroke="url(#igRibbonArc)"
                  strokeWidth={igHovered ? '3.2' : '2.2'}
                  strokeLinecap="round"
                />
                <path
                  d="M 185 64 C 295 64, 405 102, 482 182"
                  stroke="url(#igRibbonArc)"
                  strokeWidth="1.2"
                  opacity="0.55"
                />
              </svg>

              {/* 3. Top Content: 3D Glossy Instagram Icon + Heading + Description */}
              <div className="relative z-10 flex flex-col items-center w-full">
                <GlossyInstagramBadge hovered={igHovered} />

                <p className="mt-5 sm:mt-6 text-[13.5px] sm:text-[15px] font-normal tracking-[0.02em] text-[#EAE3D5]">
                  Connect on
                </p>

                <h3
                  className="mt-0.5 text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.1] font-normal text-[#F7F4EE]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Instagram
                </h3>

                <p className="mt-3.5 sm:mt-4 text-[13px] sm:text-[14.5px] leading-[1.65] font-light text-[#DFD8CA]/90 max-w-[390px]">
                  Explore our latest creations, work-in-progress and
                  behind-the-scenes from our studio.
                </p>
              </div>

              {/* 4. Bottom Content: Feature Labels Row + CTA Pill */}
              <div className="relative z-10 mt-6 sm:mt-7 flex flex-col items-center w-full">
                {/* Feature Labels Row: Latest Work | Studio Updates | New Creations */}
                <div className="flex flex-wrap items-center justify-center gap-y-2 text-[11.5px] sm:text-[12.5px] font-light text-[#EAE3D5]/95">
                  {INSTAGRAM_FEATURES.map((feat, idx) => (
                    <div key={feat.id} className="flex items-center">
                      <div className="flex items-center gap-2 px-2.5 sm:px-3.5">
                        <FeatureIcon id={feat.id} />
                        <span className="whitespace-nowrap">{feat.label}</span>
                      </div>
                      {idx < INSTAGRAM_FEATURES.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="h-4 w-px bg-white/18"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Instagram CTA Pill: Visit Instagram ↗ */}
                <div className="mt-6 sm:mt-7">
                  <span
                    className="group/cta relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 sm:px-10 py-3 sm:py-3.5 text-[13.5px] sm:text-[15px] font-medium text-white transition-all duration-300"
                    style={{
                      background: igHovered
                        ? 'linear-gradient(90deg, #B527A8 0%, #E63976 50%, #F7823B 100%)'
                        : 'linear-gradient(90deg, #9E2492 0%, #D9346E 52%, #EE7635 100%)',
                      boxShadow: igHovered
                        ? '0 10px 30px rgba(230, 57, 118, 0.52), 0 0 18px rgba(247, 130, 59, 0.4), inset 0 1px 1.5px rgba(255, 255, 255, 0.55)'
                        : '0 6px 22px rgba(217, 52, 110, 0.34), inset 0 1px 1px rgba(255, 255, 255, 0.38)',
                      transform: igHovered ? 'translateY(-1.5px)' : 'none',
                    }}
                  >
                    <span>Visit Instagram</span>
                    <ExternalArrowIcon />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>

          {/* ────────────────────────────────────────────────────────────────
              RIGHT PANEL: WHATSAPP
              Strictly independent hover state (`waHovered`)
              ──────────────────────────────────────────────────────────────── */}
          <motion.a
            href={WHATSAPP_PREFILLED_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with UDAY ARTS on WhatsApp"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, delay: 0.46, ease: EASE_EDITORIAL }}
            onMouseEnter={() => setWaHovered(true)}
            onMouseLeave={() => setWaHovered(false)}
            onFocus={() => setWaHovered(true)}
            onBlur={() => setWaHovered(false)}
            style={{
              transform:
                waHovered && !prefersReducedMotion
                  ? 'translate3d(0, -6px, 0) scale(1.01)'
                  : 'translate3d(0, 0, 0) scale(1)',
              transition:
                'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: waHovered
                ? '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 42px rgba(31, 175, 80, 0.34), inset 0 0 32px rgba(31, 175, 80, 0.14)'
                : '0 18px 46px rgba(0, 0, 0, 0.75), 0 0 24px rgba(26, 148, 68, 0.14), inset 0 0 18px rgba(26, 148, 68, 0.06)',
            }}
            className="group/card relative flex flex-col items-center justify-between rounded-[26px] sm:rounded-[30px] p-[1.5px] overflow-hidden cursor-pointer focus:outline-none"
          >
            {/* Dynamic Emerald Green Gradient Border Layer (Matches Reference) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[30px] transition-opacity duration-500"
              style={{
                background: waHovered
                  ? 'linear-gradient(135deg, #25D366 0%, #158C3E 32%, #6BF79A 55%, #179844 78%, #34E875 100%)'
                  : 'linear-gradient(135deg, rgba(37, 211, 102, 0.58) 0%, rgba(21, 128, 58, 0.36) 32%, rgba(86, 232, 136, 0.68) 55%, rgba(21, 128, 58, 0.38) 78%, rgba(46, 214, 108, 0.62) 100%)',
              }}
            />

            {/* Top & Bottom Specular Emerald Light Flares on Card Frame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-[24%] h-[2px] w-36 bg-gradient-to-r from-transparent via-[#88FFAE] to-transparent transition-opacity duration-500"
              style={{ opacity: waHovered ? 1 : 0.78 }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-[22%] h-[2px] w-44 bg-gradient-to-r from-transparent via-[#6FFFA0] to-transparent transition-opacity duration-500"
              style={{ opacity: waHovered ? 1 : 0.75 }}
            />

            {/* Inner Translucent Dark Glass Surface */}
            <div
              className="relative z-10 flex h-full w-full flex-col items-center justify-between rounded-[24.5px] sm:rounded-[28.5px] px-6 sm:px-9 lg:px-10 py-8 sm:py-10 text-center overflow-hidden transition-colors duration-500"
              style={{
                background: waHovered
                  ? 'radial-gradient(circle at 50% 24%, rgba(24, 146, 66, 0.28) 0%, rgba(12, 68, 32, 0.22) 42%, rgba(8, 13, 9, 0.84) 88%)'
                  : 'radial-gradient(circle at 50% 24%, rgba(20, 118, 54, 0.16) 0%, rgba(10, 48, 22, 0.16) 42%, rgba(8, 11, 9, 0.84) 88%)',
              }}
            >
              {/* 1. Large Angled WhatsApp Watermark in Top-Right Background (Matches Reference) */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -top-5 -right-5 w-48 h-48 sm:w-56 sm:h-56 rotate-[12deg] transition-all duration-500"
                style={{
                  opacity: waHovered ? 0.17 : 0.09,
                  transform: waHovered
                    ? 'rotate(9deg) scale(1.05)'
                    : 'rotate(12deg) scale(1)',
                }}
                viewBox="0 0 24 24"
                fill="#2CE66F"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.01 8.49 7.01 9.71C7.01 10.93 7.9 12.11 8.02 12.27C8.14 12.44 9.77 14.94 12.25 16.01C14.34 16.91 14.77 16.73 15.22 16.69C15.67 16.65 16.68 16.09 16.89 15.51C17.1 14.93 17.1 14.43 17.04 14.33C16.97 14.23 16.81 14.16 16.56 14.04C16.31 13.92 15.09 13.31 14.86 13.23C14.63 13.15 14.47 13.11 14.3 13.36C14.14 13.61 13.66 14.16 13.52 14.33C13.38 14.49 13.23 14.51 12.98 14.39C12.73 14.27 11.93 14 10.97 13.15C10.23 12.49 9.73 11.67 9.58 11.42C9.44 11.17 9.56 11.04 9.69 10.91C9.8 10.8 9.94 10.62 10.06 10.48C10.18 10.33 10.22 10.23 10.31 10.06C10.39 9.9 10.35 9.75 10.29 9.63C10.22 9.51 9.73 8.29 9.52 7.79C9.32 7.31 9.11 7.38 8.96 7.37C8.81 7.36 8.65 7.33 8.53 7.33Z" />
              </svg>

              {/* 2. Sweeping Emerald Green Light Ribbon Behind Icon (Matches Reference) */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-6 w-full h-48 transition-opacity duration-500"
                style={{ opacity: waHovered ? 1 : 0.72 }}
                viewBox="0 0 520 200"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="waRibbonArc"
                    x1="85%"
                    y1="20%"
                    x2="5%"
                    y2="85%"
                  >
                    <stop offset="0%" stopColor="#1FAF50" stopOpacity="0" />
                    <stop offset="38%" stopColor="#5FF892" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#18A848" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#0A5222" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient
                    id="waIconHalo"
                    cx="50%"
                    cy="38%"
                    r="42%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#34E875"
                      stopOpacity={waHovered ? '0.42' : '0.24'}
                    />
                    <stop
                      offset="55%"
                      stopColor="#148038"
                      stopOpacity={waHovered ? '0.18' : '0.08'}
                    />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="260" cy="70" rx="170" ry="70" fill="url(#waIconHalo)" />
                <path
                  d="M 330 58 C 220 54, 105 88, 25 168"
                  stroke="url(#waRibbonArc)"
                  strokeWidth={waHovered ? '3.2' : '2.2'}
                  strokeLinecap="round"
                />
                <path
                  d="M 335 64 C 225 64, 115 102, 38 182"
                  stroke="url(#waRibbonArc)"
                  strokeWidth="1.2"
                  opacity="0.55"
                />
              </svg>

              {/* 3. Top Content: 3D Glossy WhatsApp Icon + Heading + Description */}
              <div className="relative z-10 flex flex-col items-center w-full">
                <GlossyWhatsAppBadge hovered={waHovered} />

                <p className="mt-5 sm:mt-6 text-[13.5px] sm:text-[15px] font-normal tracking-[0.02em] text-[#EAE3D5]">
                  Chat on
                </p>

                {/* In the reference image, "WhatsApp" is rendered in warm metallic gold serif */}
                <h3
                  className="mt-0.5 text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.1] font-normal"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    background:
                      'linear-gradient(180deg, #FBE5A5 0%, #E7BA65 52%, #C99137 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  WhatsApp
                </h3>

                <p className="mt-3.5 sm:mt-4 text-[13px] sm:text-[14.5px] leading-[1.65] font-light text-[#DFD8CA]/90 max-w-[380px]">
                  Discuss your ideas, get a custom quote and bring your vision
                  to life.
                </p>
              </div>

              {/* 4. Bottom Content: Feature Labels Row + CTA Pill */}
              <div className="relative z-10 mt-6 sm:mt-7 flex flex-col items-center w-full">
                {/* Feature Labels Row: Quick Reply | Project Discussion | Custom Quote */}
                <div className="flex flex-wrap items-center justify-center gap-y-2 text-[11.5px] sm:text-[12.5px] font-light text-[#EAE3D5]/95">
                  {WHATSAPP_FEATURES.map((feat, idx) => (
                    <div key={feat.id} className="flex items-center">
                      <div className="flex items-center gap-2 px-2.5 sm:px-3.5">
                        <FeatureIcon id={feat.id} />
                        <span className="whitespace-nowrap">{feat.label}</span>
                      </div>
                      {idx < WHATSAPP_FEATURES.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="h-4 w-px bg-white/18"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA Pill: Message on WhatsApp ↗ */}
                <div className="mt-6 sm:mt-7">
                  <span
                    className="group/cta relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-9 py-3 sm:py-3.5 text-[13.5px] sm:text-[15px] font-medium text-white transition-all duration-300"
                    style={{
                      background: waHovered
                        ? 'linear-gradient(90deg, #0E8A38 0%, #22BD56 50%, #11983E 100%)'
                        : 'linear-gradient(90deg, #0B742E 0%, #199E46 50%, #0E8034 100%)',
                      boxShadow: waHovered
                        ? '0 10px 30px rgba(34, 189, 86, 0.5), 0 0 18px rgba(72, 240, 118, 0.38), inset 0 1px 1.5px rgba(255, 255, 255, 0.5)'
                        : '0 6px 22px rgba(25, 158, 70, 0.34), inset 0 1px 1px rgba(255, 255, 255, 0.34)',
                      transform: waHovered ? 'translateY(-1.5px)' : 'none',
                    }}
                  >
                    <span>Message on WhatsApp</span>
                    <ExternalArrowIcon />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

