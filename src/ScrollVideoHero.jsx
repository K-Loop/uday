import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const SRC = '/video/mural.mp4', POSTER = '/video/mural-poster.jpg';

// Full-screen pinned hero: the painting video fills the whole page and plays forward as you scroll.
// The text panel fades away first so the finished painting is revealed full screen.
export default function ScrollVideoHero({ children }) {
    const root = useRef(), vid = useRef(), text = useRef(), bar = useRef(), pct = useRef();

    useLayoutEffect(() => {
        const el = vid.current;
        el.muted = true; el.playsInline = true; el.pause();
        if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;

        let ctx, raf = 0, target = 0, cur = 0, started = false;
        const init = () => {
            if (started) return; started = true;
            ctx = gsap.context(() => {
                gsap.set(vid.current, { scale: 1.08 });
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: root.current, start: 'top top', end: '+=400%',
                        pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
                        onUpdate: s => {
                            target = s.progress;
                            bar.current.style.transform = `scaleX(${s.progress})`;
                            pct.current.textContent = Math.round(s.progress * 100);
                        }
                    }
                });
                tl.to(vid.current, { scale: 1, ease: 'none', duration: 1 }, 0)
                    .to(text.current, { y: -60, opacity: 0, ease: 'none', duration: .18 }, 0);
            }, root);

            // smooth seeking: ease currentTime toward the scroll target every frame
            const loop = () => {
                cur += (target - cur) * .12;
                const t = cur * Math.max(0, el.duration - .05);
                if (Math.abs(el.currentTime - t) > .016) el.currentTime = t;
                raf = requestAnimationFrame(loop);
            };
            loop();
        };

        if (el.readyState >= 1) init(); else el.addEventListener('loadedmetadata', init, { once: true });
        return () => { cancelAnimationFrame(raf); ctx?.revert(); el.removeEventListener('loadedmetadata', init) };
    }, []);

    return (
        <section ref={root} aria-label="Mural painting film, driven by scroll" className="relative -mt-20 h-svh overflow-hidden bg-ink">
            {/* full-screen video */}
            <video ref={vid} src={SRC} poster={POSTER} muted playsInline preload="auto"
                aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover will-change-transform" />
            {/* soft light wash on the left so the headline stays readable */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 to-transparent lg:from-white/85 lg:via-white/40" />
            {/* hero copy */}
            <div className="relative z-10 flex h-full items-center pt-20">
                <div ref={text} className="px-5 md:px-10 lg:px-16 lg:max-w-[52%]">{children}</div>
            </div>
            {/* scroll progress */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 px-5 pb-5 md:px-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white drop-shadow">Painted <span ref={pct}>0</span>%</p>
                <div className="h-[2px] flex-1 bg-white/30"><div ref={bar} className="h-full origin-left scale-x-0 bg-bronze" /></div>
                <p className="hidden text-[10px] uppercase tracking-[0.25em] text-white drop-shadow sm:block">Scroll to paint</p>
            </div>
        </section>
    );
}