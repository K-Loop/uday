import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Pinned section: the mural is sketched, then painted in by scroll position, then finished.
export default function ScrollPainting({ src, alt }) {
    const root = useRef(), sketch = useRef(), paint = useRef(), brush = useRef(), pct = useRef(), bar = useRef(), done = useRef();
    useLayoutEffect(() => {
        if (matchMedia('(prefers-reduced-motion:reduce)').matches) { paint.current.style.clipPath = 'none'; pct.current.textContent = '100'; return }
        const ctx = gsap.context(() => {
            const o = { p: 0 }; gsap.set(paint.current, { clipPath: 'inset(0 100% 0 0)' }); gsap.set(done.current, { opacity: 0 });
            const stages = root.current.querySelectorAll('[data-s]');
            const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', scrub: .6, pin: true, anticipatePin: 1 } });
            tl.fromTo(sketch.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'none' })
                .to(o, { p: 1, duration: 3.2, ease: 'none', onUpdate() { const v = o.p * 100; paint.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`; brush.current.style.left = v + '%'; brush.current.style.opacity = v > 0 && v < 99.5 ? 1 : 0; pct.current.textContent = Math.round(v); bar.current.style.transform = `scaleX(${o.p})`; stages.forEach((s, i) => s.style.opacity = (i === 0 ? o.p < .02 : i === 1 ? o.p >= .02 && o.p < .96 : o.p >= .96) ? 1 : .28) } }, '>')
                .to(paint.current, { filter: 'brightness(1.12) saturate(1.15)', duration: .5, yoyo: true, repeat: 1, ease: 'sine.inOut' })
                .to(done.current, { opacity: 1, y: 0, duration: .6 }, '<');
        }, root); return () => ctx.revert()
    }, []);
    return <section ref={root} className="relative h-svh overflow-hidden pt-20 text-ivory" aria-label="Mural painting in progress, driven by scroll">
        <div className="relative mx-auto grid h-full max-w-[1400px] items-center gap-8 px-5 md:px-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-[11px] uppercase tracking-[0.28em] text-bronze">A Wall, Completed</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">Watch a wall come to life.</h2>
                <ol className="mt-8 grid gap-3 font-serif text-2xl"><li data-s>01 — Composition sketched</li><li data-s>02 — Colour laid in by hand</li><li data-s>03 — Highlights and finish</li></ol>
                <div className="mt-8 h-px w-full max-w-xs bg-white/20"><div ref={bar} className="h-px origin-left scale-x-0 bg-bronze" /></div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ivory/60">Painted <span ref={pct}>0</span>%</p>
                <p ref={done} className="mt-5 max-w-xs text-sm text-ivory/70">Illustrative sequence of a finished mural, revealed by scroll. Not a record of the actual painting process.</p></div>
            <div className="relative mx-auto aspect-[4/5] h-[min(72svh,100%)] max-h-[72svh] shadow-[0_40px_90px_-30px_rgba(24,24,22,.55)]">
                <img ref={sketch} src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.6)_brightness(1.45)]" />
                <img ref={paint} src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
                <span ref={brush} aria-hidden className="absolute inset-y-0 w-[2px] bg-bronze opacity-0 shadow-[0_0_24px_6px_rgba(148,117,77,.55)]" /></div></div></section>
}