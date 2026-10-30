import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Progress() {
    const r = useRef();
    useLayoutEffect(() => {
        const t = gsap.to(r.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
        });
        return () => {
            t.scrollTrigger?.kill();
            t.kill();
        };
    }, []);
    return (
        <div
            ref={r}
            aria-hidden
            className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-[#C5A880]"
        />
    );
}

