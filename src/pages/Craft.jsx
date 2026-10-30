import { useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Page from '../components/Page.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { artworks } from '../data/artworks.js';
import { useAmbientGlow } from '../context/AmbientGlowContext.jsx';
import { getArtworkGlow } from '../utils/glowPalette.js';

gsap.registerPlugin(ScrollTrigger);

// 6 REAL CRAFT MILESTONES USING ACTUAL PROJECT ARTWORKS
const CRAFT_STAGES = [
    {
        num: '01',
        title: 'Concept & Architectural Dialogue',
        desc: 'Every commission originates with an in-depth understanding of the architectural site, ambient light paths, sightlines, and spiritual or cultural subject matter.',
        img: artworks[7].image
    },
    {
        num: '02',
        title: 'Composition & Layer Proportions',
        desc: 'The composition is drawn and proportioned in accurate scale. Raking angles and sightlines determine the graduated relief depth required for visual drama.',
        img: artworks[1].image
    },
    {
        num: '03',
        title: 'Sculptural Depth & High Relief',
        desc: 'Specialized relief composite and clay layers are built up and hand-carved, moving from subtle background texture to projecting foreground silhouettes.',
        img: artworks[0].image
    },
    {
        num: '04',
        title: 'Surface Patinas & 24K Leafing',
        desc: 'Surfaces receive hand-blended mineral washes, charcoal patinas, or genuine 24-karat gold foil to illuminate contours under directional interior spotlights.',
        img: artworks[5].image
    },
    {
        num: '05',
        title: 'Curing & Museum-Grade Sealants',
        desc: 'Reliefs are treated with specialized lightfast and moisture-resistant sealers ensuring timeless preservation in private residences or religious sanctuaries.',
        img: artworks[3].image
    },
    {
        num: '06',
        title: 'Precision Architectural Installation',
        desc: 'Finished artworks are framed or mounted seamlessly into wall niches, ensuring integrated shadow lines and structural longevity.',
        img: artworks[4].image
    }
];

function CraftScrollShowcase() {
    const pinRef = useRef(null);
    const stageRefs = useRef([]);
    const artRefs = useRef([]);
    const textRefs = useRef([]);
    const { setGlowColor } = useAmbientGlow();

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const pinEl = pinRef.current;
        if (!pinEl) return;

        // Clean up any existing triggers on this element
        ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === pinEl || st.vars?.trigger === pinEl) {
                st.kill();
            }
        });

        // Direct DOM update for tracker dots/counter and background glow
        const updateTracker = (idx) => {
            const counter = pinEl.querySelector('[data-tracker-counter]');
            if (counter) counter.textContent = `Milestone 0${idx + 1} of 0${CRAFT_STAGES.length}`;

            // Update atmospheric background glow for active milestone
            setGlowColor(getArtworkGlow(null, idx));

            const dots = pinEl.querySelectorAll('[data-tracker-dot]');
            const labels = pinEl.querySelectorAll('[data-tracker-label]');
            dots.forEach((dot, dIdx) => {
                if (dIdx === idx) {
                    dot.classList.add('w-6', 'bg-[#C5A880]');
                    dot.classList.remove('w-1.5', 'bg-white/20');
                } else {
                    dot.classList.remove('w-6', 'bg-[#C5A880]');
                    dot.classList.add('w-1.5', 'bg-white/20');
                }
            });
            labels.forEach((lbl, lIdx) => {
                if (lIdx === idx) {
                    lbl.classList.remove('opacity-0');
                    lbl.classList.add('opacity-100');
                } else {
                    lbl.classList.add('opacity-0');
                    lbl.classList.remove('opacity-100');
                }
            });
        };

        // Attach globals for debugging
        window.__GSAP__ = gsap;
        window.__SCROLLTRIGGER__ = ScrollTrigger;

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;
            // Travel distance: ~23% of viewport width on desktop, min 280px, max 360px
            const travelX = isMobile ? 0 : Math.min(Math.max(window.innerWidth * 0.23, 280), 360);
            const n = CRAFT_STAGES.length;

            // Master timeline attached to ScrollTrigger with generous scroll distance (1.5x viewport height per milestone)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinEl,
                    start: 'top top',
                    end: () => `+=${n * window.innerHeight * 1.5}`,
                    pin: true,
                    scrub: 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const idx = Math.min(Math.floor(self.progress * n), n - 1);
                        updateTracker(idx);
                        if (window.__CRAFT_DEBUG_LOG__) {
                            console.log(`[ST UPDATE] progress: ${self.progress.toFixed(3)}, scrollY: ${window.scrollY}, start: ${self.start}, end: ${self.end}, active: ${self.isActive}`);
                        }
                    }
                }
            });

            window.__CRAFT_TL__ = tl;

            console.log('--- [UDAY ARTS CRAFT SCROLL DEBUG] ---');
            console.log('ScrollTrigger Active:', !!tl.scrollTrigger);
            console.log('Pin Element:', pinEl);
            console.log('Milestones Count:', n);
            console.log('Calculated Travel X:', travelX, 'px');
            console.log('Viewport Width:', window.innerWidth, 'isMobile:', isMobile);

            CRAFT_STAGES.forEach((_, i) => {
                const stageEl = stageRefs.current[i];
                const artEl = artRefs.current[i];
                const textEl = textRefs.current[i];
                if (!stageEl || !artEl || !textEl) return;

                const isEven = i % 2 === 0;
                // Even milestones (0, 2, 4 -> 01, 03, 05): art moves LEFT (-travelX), text on RIGHT.
                // Odd milestones (1, 3, 5 -> 02, 04, 06): art moves RIGHT (+travelX), text on LEFT.
                const targetX = isMobile ? 0 : isEven ? -travelX : travelX;
                const targetY = isMobile ? -110 : 0;

                if (i === 0) {
                    // Stage 0: Initial state is DEAD-CENTER. Text is completely invisible.
                    gsap.set(stageEl, { autoAlpha: 1, zIndex: 10 });
                    gsap.set(artEl, {
                        xPercent: -50,
                        yPercent: -50,
                        x: 0,
                        y: 0,
                        scale: 0.94,
                        opacity: 1
                    });
                    // Text is positioned at 50% top with GSAP controlling yPercent to avoid CSS transform conflicts
                    gsap.set(textEl, {
                        autoAlpha: 0,
                        yPercent: -50,
                        y: 20
                    });

                    // 1. Hold center stage as visual focus while user starts scrolling
                    tl.to({}, { duration: 1.0 });

                    // 2. Artwork glides smoothly from center to target side
                    tl.to(artEl, {
                        x: targetX,
                        y: targetY,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power2.inOut'
                    });

                    // 3. Text appears ONLY AFTER artwork has reached its destination
                    tl.to(textEl, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });

                    // 4. Milestone remains stable and readable while scrolling through
                    tl.to({}, { duration: 2.2 });

                    // 5. Exit: text fades out first
                    tl.to(textEl, {
                        autoAlpha: 0,
                        y: -15,
                        duration: 0.45,
                        ease: 'power2.in'
                    });

                    // 6. Artwork retreats and scales down into depth
                    tl.to(artEl, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.55,
                        ease: 'power2.in'
                    });
                    tl.set(stageEl, { autoAlpha: 0 });
                } else {
                    // Subsequent stages: initially hidden in the background
                    gsap.set(stageEl, { autoAlpha: 0, zIndex: 10 + i });
                    gsap.set(artEl, {
                        xPercent: -50,
                        yPercent: -50,
                        x: 0,
                        y: 0,
                        scale: 0.76,
                        opacity: 0
                    });
                    gsap.set(textEl, {
                        autoAlpha: 0,
                        yPercent: -50,
                        y: 20
                    });

                    // 1. Activate stage
                    tl.set(stageEl, { autoAlpha: 1 });

                    // 2. Artwork emerges forward into DEAD-CENTER from depth
                    tl.to(artEl, {
                        scale: 0.94,
                        opacity: 1,
                        duration: 1.0,
                        ease: 'power2.out'
                    });

                    // 3. Holds center briefly
                    tl.to({}, { duration: 0.8 });

                    // 4. Artwork glides to target side (alternating left/right)
                    tl.to(artEl, {
                        x: targetX,
                        y: targetY,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power2.inOut'
                    });

                    // 5. Text materializes on opposite side ONLY after artwork arrives
                    tl.to(textEl, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });

                    // 6. Hold for reading
                    tl.to({}, { duration: 2.2 });

                    // 7. Exit (if not the final milestone)
                    if (i < n - 1) {
                        tl.to(textEl, {
                            autoAlpha: 0,
                            y: -15,
                            duration: 0.45,
                            ease: 'power2.in'
                        });

                        tl.to(artEl, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.55,
                            ease: 'power2.in'
                        });
                        tl.set(stageEl, { autoAlpha: 0 });
                    }
                }
            });
        }, pinEl);

        return () => {
            ctx.revert();
            setGlowColor(null);
        };
    }, []);

    // Refresh ScrollTrigger after component mount and on window resize
    useEffect(() => {
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);
        const t = setTimeout(() => ScrollTrigger.refresh(), 200);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(t);
        };
    }, []);

    return (
        <section
            ref={pinRef}
            className="relative h-screen w-full overflow-hidden bg-[#0b0b0b]/60 backdrop-blur-[2px] border-t border-b border-white/[0.08]"
            aria-label="Interactive Sculptural Craft Milestones"
        >
            {/* Subtle background stage ambience */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#C5A880]/15 blur-[140px]" />
            </div>

            {/* Stage Counter Badge (top-left) */}
            <div className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-3">
                <span className="h-px w-6 bg-[#C5A880]" />
                <span data-tracker-counter className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                    Milestone 01 of 06
                </span>
            </div>

            {/* Minimalist Floating Stage Tracker (right edge on desktop) */}
            <div className="hidden lg:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                {CRAFT_STAGES.map((s, idx) => (
                    <div key={s.num} className="flex items-center gap-2">
                        <span
                            data-tracker-dot
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                idx === 0 ? 'w-6 bg-[#C5A880]' : 'w-1.5 bg-white/20'
                            }`}
                        />
                        <span
                            data-tracker-label
                            className={`text-[9px] uppercase tracking-[0.2em] transition-opacity duration-500 text-[#C5A880] ${
                                idx === 0 ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {s.num}
                        </span>
                    </div>
                ))}
            </div>

            {/* Stage Items Container */}
            <div className="relative z-10 h-full w-full max-w-[1560px] mx-auto px-6 md:px-12 flex items-center justify-center">
                {CRAFT_STAGES.map((st, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div
                            key={st.title}
                            ref={(el) => (stageRefs.current[i] = el)}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Centered Floating Artwork (Centered via top: 50%, left: 50% and GSAP xPercent: -50, yPercent: -50) */}
                            <div
                                ref={(el) => (artRefs.current[i] = el)}
                                className="absolute top-1/2 left-1/2 w-[76vw] max-w-[380px] lg:max-w-[430px] aspect-[4/5] rounded-sm border border-white/15 bg-[#141414] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.95)] z-10 pointer-events-auto"
                            >
                                <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#181818]">
                                    <img
                                        src={st.img}
                                        alt={st.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 rounded-sm bg-[#0b0b0b]/80 border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                                        Milestone {st.num}
                                    </div>
                                </div>
                            </div>

                            {/* Responsive Text Container (Opposite Layout Zone) */}
                            <div
                                ref={(el) => (textRefs.current[i] = el)}
                                className={`absolute z-20 pointer-events-auto flex flex-col justify-center ${
                                    isEven
                                        ? 'md:left-[55%] md:right-auto md:top-1/2 md:w-[35vw] md:max-w-[450px] md:text-left top-[68%] inset-x-6 text-center'
                                        : 'md:right-[55%] md:left-auto md:top-1/2 md:w-[35vw] md:max-w-[450px] md:text-left top-[68%] inset-x-6 text-center'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                                    <span className="font-serif text-3xl md:text-4xl text-[#C5A880] font-light">
                                        {st.num}
                                    </span>
                                    <span className="h-px w-8 bg-[#C5A880]/50" />
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                                        Creation Process
                                    </p>
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#F4F0E8] leading-tight">
                                    {st.title}
                                </h3>
                                <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#F4F0E8]/70">
                                    {st.desc}
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#F4F0E8] transition-all hover:border-[#C5A880] hover:text-[#C5A880]"
                                    >
                                        Commission This Craft <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Scroll cue (bottom-center) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#F4F0E8]/40">
                <span>Scroll to Traverse Milestones</span>
                <span className="text-[#C5A880]">↓</span>
            </div>
        </section>
    );
}

// OUR CRAFT PAGE
export default function Craft() {
    return (
        <Page>
            <div className="mx-auto max-w-[1560px] px-6 pt-6 pb-8 md:px-12 lg:px-16">
                {/* Header */}
                <SectionHead
                    eyebrow="Our Craft"
                    title="From Vision to Form."
                    italicWord="Heritage Techniques"
                >
                    Combining classical relief sculpting, temple stonecraft principles, and contemporary architectural aesthetics. Here is how raw intention transforms into enduring sculpture.
                </SectionHead>
            </div>

            {/* Cinematic Levitating Alternating Artwork Scroll Showcase */}
            <CraftScrollShowcase />

            {/* Bottom Consultation Section */}
            <div className="mx-auto max-w-[1560px] px-6 pt-12 pb-20 md:px-12 lg:px-16">
                <div className="rounded-sm border border-white/10 bg-[#121212] p-10 md:p-14 text-center">
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8]">
                        Ready to conceive a site-specific relief?
                    </h3>
                    <p className="mt-3 text-sm text-[#F4F0E8]/65 max-w-md mx-auto">
                        Share your wall blueprints or photographic references with our master craftsmen.
                    </p>
                    <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0b0b] transition-all hover:bg-[#F4F0E8]"
                    >
                        Initiate Consultation <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </Page>
    );
}
