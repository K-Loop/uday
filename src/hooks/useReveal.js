import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useReveal — Reliable, performant GSAP ScrollTrigger engine for luxury editorial storytelling.
 *
 * Capabilities:
 *   [data-reveal]          — Clean upward entrance with subtle fade.
 *   [data-clip]            — Visible vertical bottom-to-top reveal with scale settle.
 *   [data-clip-horizontal] — Visible horizontal left-to-right wipe reveal with scale settle.
 *   [data-stagger]         — Coordinated sequence for editorial headings, paragraphs, and buttons.
 *   [data-ghost-parallax]  — Subtly scrubbed continuous typography drift.
 *   [data-parallax]        — Natural optical depth on photographs.
 *   [data-hero-scroll]     — Continuous cinematic exit scrub for the hero section.
 */
export function useReveal() {
    const r = useRef(null);
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        let ctx;
        // Allow DOM paint & dimensions to settle reliably
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                const isMobile = window.innerWidth < 768;

                /* ── 1. HERO CONTINUOUS EXIT SCROLL DEPTH ──────────── */
                const heroSection = document.querySelector('[data-hero-scroll]');
                if (heroSection) {
                    const videoCard = heroSection.querySelector('[data-hero-video]');
                    const thumbLeft = heroSection.querySelector('[data-hero-thumb-left]');
                    const thumbRight = heroSection.querySelector('[data-hero-thumb-right]');
                    const leftCol = heroSection.querySelector('[data-hero-left]');

                    const heroTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: heroSection,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 1.1,
                            invalidateOnRefresh: true,
                        },
                    });

                    if (videoCard) {
                        heroTl.to(videoCard, { y: isMobile ? 0 : 42, scale: isMobile ? 1 : 0.98, ease: 'none' }, 0);
                    }
                    if (thumbLeft) {
                        heroTl.to(thumbLeft, { y: isMobile ? 0 : 65, ease: 'none' }, 0);
                    }
                    if (thumbRight) {
                        heroTl.to(thumbRight, { y: isMobile ? 0 : 80, ease: 'none' }, 0);
                    }
                    if (leftCol) {
                        heroTl.to(leftCol, { y: isMobile ? 0 : 35, opacity: 0.65, ease: 'none' }, 0);
                    }
                }

                /* ── 2. SECTION & ELEMENT REVEALS [data-reveal] ────── */
                gsap.utils.toArray('[data-reveal]').forEach((el) => {
                    gsap.fromTo(
                        el,
                        { y: 45, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.95,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 88%',
                                once: true,
                            },
                        }
                    );
                });

                /* ── 3. CLIP-PATH ARTWORK IMAGE REVEALS ────────────── */
                // Vertical reveal: progressive wipe from bottom to top with scale settle
                gsap.utils.toArray('[data-clip]').forEach((el) => {
                    const img = el.querySelector('img') || el.querySelector('video');
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    });

                    tl.fromTo(
                        el,
                        { clipPath: 'inset(100% 0 0 0)' },
                        {
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 1.25,
                            ease: 'power3.inOut',
                        }
                    );

                    if (img) {
                        tl.fromTo(
                            img,
                            { scale: 1.15 },
                            { scale: 1, duration: 1.45, ease: 'power2.out' },
                            0
                        );
                    }
                });

                // Horizontal wipe: progressive wipe from left to right with scale settle
                gsap.utils.toArray('[data-clip-horizontal]').forEach((el) => {
                    const img = el.querySelector('img') || el.querySelector('video');
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    });

                    tl.fromTo(
                        el,
                        { clipPath: 'inset(0 100% 0 0)' },
                        {
                            clipPath: 'inset(0 0% 0 0)',
                            duration: 1.25,
                            ease: 'power3.inOut',
                        }
                    );

                    if (img) {
                        tl.fromTo(
                            img,
                            { scale: 1.15 },
                            { scale: 1, duration: 1.45, ease: 'power2.out' },
                            0
                        );
                    }
                });

                /* ── 4. STAGGERED EDITORIAL HEADINGS & CONTENT ──────── */
                gsap.utils.toArray('[data-stagger]').forEach((container) => {
                    const children = Array.from(container.children);
                    if (!children.length) return;
                    gsap.fromTo(
                        children,
                        { y: 38, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.85,
                            ease: 'power2.out',
                            stagger: 0.14,
                            scrollTrigger: {
                                trigger: container,
                                start: 'top 88%',
                                once: true,
                            },
                        }
                    );
                });

                /* ── 5. GHOST TYPOGRAPHY DRIFT [data-ghost-parallax] ── */
                gsap.utils.toArray('[data-ghost-parallax]').forEach((el) => {
                    gsap.to(el, {
                        yPercent: isMobile ? 10 : 25,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el.parentElement || el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.2,
                        },
                    });
                });

                /* ── 6. CURATED ARTWORK DEPTH [data-parallax] ────────── */
                if (!isMobile) {
                    gsap.utils.toArray('[data-parallax]').forEach((el) => {
                        const factor = parseFloat(el.getAttribute('data-parallax')) || 0.08;
                        gsap.to(el, {
                            y: -50 * factor * 10,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el.parentElement || el,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.1,
                            },
                        });
                    });
                }

                // Refresh triggers once all setups finish
                ScrollTrigger.refresh();
            }, r);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, [pathname]);

    return r;
}
