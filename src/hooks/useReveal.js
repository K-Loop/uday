import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
    const r = useRef(null);
    useLayoutEffect(() => {
        if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
        const ctx = gsap.context(() => {
            gsap.utils.toArray('[data-reveal]').forEach((el) => {
                gsap.from(el, {
                    y: 24,
                    opacity: 0,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true }
                });
            });
            gsap.utils.toArray('[data-clip]').forEach((el) => {
                gsap.from(el, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 1.2,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                });
            });
        }, r);
        return () => ctx.revert();
    }, []);
    return r;
}

