import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artworks, price } from './data/artworks.js';
gsap.registerPlugin(ScrollTrigger);

// Pinned "scroll video": every artwork gets one chapter.
//   enter  -> photo slides in from the side (tilting flat) while the text slides in from the opposite side
//   hold   -> photo slowly pushes in + drifts, the detailed explanation reveals line by line
//   exit   -> photo leaves the other side, text leaves the opposite way
// Even chapters travel left -> right, odd chapters right -> left. Scroll back up and it plays in reverse.
const lbl = 'text-[11px] uppercase tracking-[0.28em] text-bronze';

function Text({ a }) {
    return <div className="grid gap-0">
        <p data-line className={lbl}>{a.category}</p>
        <h2 data-line className="mt-3 font-serif text-4xl leading-tight md:text-6xl">{a.title}</h2>
        <p data-line className="mt-3 text-lg text-ivory/90">{price(a)}</p>
        <p data-line className="mt-5 max-w-xl leading-relaxed text-ivory/75">{a.fullDescription}</p>
        <dl data-line className="mt-6 grid max-w-md grid-cols-2 gap-y-2 border-t border-ivory/15 pt-4 text-sm">
            <dt className="text-ivory/45">Dimensions</dt><dd>{a.dimensions || 'To be confirmed'}</dd>
            <dt className="text-ivory/45">Materials</dt><dd>{a.materials || 'To be confirmed'}</dd>
            <dt className="text-ivory/45">Availability</dt><dd>{a.availability}</dd>
        </dl>
        <ul data-line className="mt-5 grid gap-1 text-sm text-ivory/70">{a.customizationOptions.map(c => <li key={c}>— {c}</li>)}</ul>
        <div data-line className="mt-7"><Link to={`/collections/${a.slug}`} className="inline-flex items-center gap-2 border border-ivory/40 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-ivory hover:text-ink">View Artwork</Link></div>
    </div>
}

export default function ArtworkStory({ list = artworks }) {
    const root = useRef(), bar = useRef(), count = useRef();
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;
    const n = list.length;

    useLayoutEffect(() => {
        if (reduce) return;
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('[data-slide]');
            gsap.set(slides, { autoAlpha: 0 }); gsap.set(slides[0], { autoAlpha: 1 });
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: root.current, start: 'top top', end: `+=${n * 130}%`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
                    onUpdate: s => {
                        bar.current.style.transform = `scaleX(${s.progress})`;
                        count.current.textContent = String(Math.min(n, Math.floor(s.progress * n) + 1)).padStart(2, '0');
                    }
                }
            });
            slides.forEach((s, i) => {
                const dir = i % 2 ? -1 : 1;                       // +1: photo travels left->right, -1: right->left
                const box = s.querySelector('[data-box]'), img = s.querySelector('[data-img]'), txt = s.querySelector('[data-text]'), lines = s.querySelectorAll('[data-line]');
                const t = i;                                      // each chapter = 1 unit of timeline
                tl.set(s, { autoAlpha: 1 }, t);
                // ENTER (0 -> .3)
                tl.fromTo(box, { xPercent: -dir * 130, rotation: -dir * 7, rotationY: dir * 25, opacity: 0 }, { xPercent: 0, rotation: 0, rotationY: 0, opacity: 1, ease: 'power3.out', duration: .3 }, t)
                    .fromTo(txt, { xPercent: dir * 25, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'power2.out', duration: .3 }, t + .05)
                    // HOLD (.3 -> .7): slow push-in + sideways drift, text lines reveal one by one
                    .fromTo(img, { scale: 1.02, xPercent: -dir * 3 }, { scale: 1.16, xPercent: dir * 3, duration: .7 }, t + .3 - .3)
                    .fromTo(lines, { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: .12, stagger: .035 }, t + .12);
                // EXIT (.75 -> 1) — the final chapter stays on screen
                if (i < n - 1) {
                    tl.to(box, { xPercent: dir * 130, rotation: dir * 7, rotationY: -dir * 25, opacity: 0, ease: 'power3.in', duration: .25 }, t + .75)
                        .to(txt, { xPercent: -dir * 25, opacity: 0, ease: 'power2.in', duration: .22 }, t + .75)
                        .set(s, { autoAlpha: 0 }, t + 1);
                }
            });
        }, root);
        return () => ctx.revert();
    }, [n, reduce]);

    // Reduced motion: plain stacked list, no pinning
    if (reduce) return <section className="bg-[#0e0d0b] px-5 py-20 text-ivory md:px-10">{list.map(a => <article key={a.slug} className="mx-auto mb-24 grid max-w-6xl gap-10 lg:grid-cols-2"><img src={a.image} alt={a.title} className="aspect-[4/5] w-full object-cover" /><Text a={a} /></article>)}</section>;

    return <section ref={root} aria-label="Artwork collection story, driven by scroll" className="relative h-svh overflow-hidden bg-[#0e0d0b] pt-20 text-ivory [perspective:1400px]">
        {list.map((a, i) => <div key={a.slug} data-slide className="absolute inset-0 flex items-center pt-16">
            <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
                {/* photo — alternates side so the layout itself swings left/right */}
                <div data-box className={`relative mx-auto aspect-[4/5] h-[min(52svh,100%)] max-h-[70svh] overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,.9)] ring-1 ring-ivory/10 lg:h-[70svh] ${i % 2 ? 'lg:order-2' : ''}`}>
                    <img data-img src={a.image} alt={a.title} className="h-full w-full object-cover will-change-transform" />
                </div>
                <div data-text className={`max-h-[44svh] overflow-hidden lg:max-h-none ${i % 2 ? 'lg:order-1' : ''}`}><Text a={a} /></div>
            </div>
            <span aria-hidden className={`pointer-events-none absolute bottom-6 font-serif text-[22vw] leading-none text-ivory/[.04] ${i % 2 ? 'left-4' : 'right-4'}`}>{String(i + 1).padStart(2, '0')}</span>
        </div>)}
        {/* progress */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 px-5 pb-5 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/80"><span ref={count}>01</span> / {String(n).padStart(2, '0')}</p>
            <div className="h-[2px] flex-1 bg-white/20"><div ref={bar} className="h-full origin-left scale-x-0 bg-bronze" /></div>
            <p className="hidden text-[10px] uppercase tracking-[0.25em] text-ivory/60 sm:block">Scroll to explore</p>
        </div>
    </section>
}