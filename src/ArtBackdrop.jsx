import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const c = (r, y = 500) => `M${400 - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
const rot = (d, n, cy) => Array.from({ length: n }, (_, i) => [d, `rotate(${i * 360 / n} 400 ${cy})`]);
// Line-art per page, drawn in order as the page scrolls (viewBox 800x1000).
const ART = {
    home: ['M150 950H650', 'M200 950V800H600V950', 'M350 950V860Q400 825 450 860V950', 'M232 800L252 690H548L568 800', 'M270 690L290 580H510L530 690', 'M310 580L326 480H474L490 580', 'M346 480L360 400H440L454 480', 'M376 400Q400 340 424 400', 'M400 340V270', 'M388 270Q400 235 412 270', 'M400 235V205', 'M255 780V745Q275 722 295 745V780M365 780V745Q385 722 405 745V780M435 780V745Q455 722 475 745V780M505 780V745Q525 722 545 745V780', 'M290 670V590M510 670V590M326 570V490M474 570V490', 'M120 980H680'],
    tree: ['M400 970C395 820 410 710 400 560', 'M400 700C340 650 280 640 220 560', 'M400 700C460 650 520 640 580 560', 'M400 600C350 540 330 470 280 400', 'M400 600C450 540 470 470 520 400', 'M400 560C395 480 405 400 400 300', 'M280 400C250 380 230 340 240 300', 'M520 400C550 380 570 340 560 300', 'M220 560C190 540 160 500 170 450', 'M580 560C610 540 640 500 630 450', c(18, 282).replace('M382', 'M222'), c(18, 282).replace('M382', 'M542'), c(18, 300).replace('M382', 'M382'), c(18, 432).replace('M382', 'M152'), c(18, 432).replace('M382', 'M612'), 'M200 970H600', 'M260 990C330 1000 470 1000 540 990'],
    trishul: [c(300, 560), 'M400 990V300', 'M385 300L400 190L415 300Z', 'M400 440C300 440 285 340 300 260', 'M400 440C500 440 515 340 500 260', 'M300 260L288 205L312 222Z', 'M500 260L488 205L512 222Z', 'M350 530H450L412 570L450 610H350L388 570Z', 'M330 470A80 80 0 0 0 470 470', 'M345 470A65 65 0 0 0 455 470', 'M382 700H418M382 720H418M382 740H418'],
    lotus: ['M400 800C340 700 340 600 400 520C460 600 460 700 400 800', 'M400 800C300 740 250 650 280 560C350 600 390 700 400 800', 'M400 800C500 740 550 650 520 560C450 600 410 700 400 800', 'M400 800C260 800 170 720 150 640C230 640 340 700 400 800', 'M400 800C540 800 630 720 650 640C570 640 460 700 400 800', c(330, 650), c(380, 650), 'M120 830C250 855 550 855 680 830', 'M200 880C300 895 500 895 600 880'],
    mandala: [c(40), c(110), c(190), c(270), c(340), ...rot('M400 500C370 420 370 340 400 250C430 340 430 420 400 500', 12, 500), ...rot('M400 250L388 205L412 205Z', 12, 500)]
};
export default function ArtBackdrop({ variant }) {
    const ref = useRef(); const art = ART[variant] || ART.lotus;
    useLayoutEffect(() => {
        const ps = ref.current.querySelectorAll('path');
        if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
        const ctx = gsap.context(() => {
            gsap.set(ps, { strokeDasharray: 1, strokeDashoffset: 1 });
            gsap.timeline({ scrollTrigger: { start: 0, end: 'max', scrub: .8, invalidateOnRefresh: true } }).to(ps, { strokeDashoffset: 0, ease: 'none', duration: .3, stagger: { each: .7 / Math.max(ps.length - 1, 1) } }, 0)
        }, ref);
        return () => ctx.revert()
    }, []);
    return <svg ref={ref} aria-hidden="true" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#94754D" strokeWidth="1.4" strokeOpacity=".55" strokeLinejoin="round" className="pointer-events-none fixed inset-0 -z-10 h-svh w-full">
        {art.map((p, i) => Array.isArray(p) ? <path key={i} d={p[0]} transform={p[1]} pathLength="1" /> : <path key={i} d={p} pathLength="1" />)}</svg>
}