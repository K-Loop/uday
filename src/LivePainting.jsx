import { useEffect, useRef } from 'react';
// A real artwork painted live by brush strokes as the page scrolls: broad blurred underpainting, then mid-tone strokes, then fine detail.
// Painting starts at the top of the page and is complete at the bottom of the footer.
const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 };
const PASS = [{ n: 90, w: .2, l: .3, b: 0, e: .25 }, { n: 380, w: .08, l: .18, b: .25, e: .6 }, { n: 1400, w: .03, l: .1, b: .6, e: 1 }];
const OPACITY = 0.4; // how strongly the painting shows through the white page
export default function LivePainting({ src }) {
    const cv = useRef(), tip = useRef();
    useEffect(() => {
        const img = new Image(); img.src = src; const ctx = cv.current.getContext('2d');
        const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
        let raf = 0, cur = reduce ? 1 : 0, target = cur, W = 0, H = 0, dpr = 1, base, bctx, sharp, pats, strokes = [], drawn = 0, ready = false;
        const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c };
        const build = () => {
            dpr = Math.min(devicePixelRatio || 1, 1.25); W = Math.round(innerWidth * dpr); H = Math.round(innerHeight * dpr); cv.current.width = W; cv.current.height = H;
            const s = Math.max(W / img.width, H / img.height), dw = img.width * s, dh = img.height * s;
            sharp = mk(W, H); sharp.getContext('2d').drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
            const lvl = k => { const t = mk(Math.ceil(W / k), Math.ceil(H / k)); t.getContext('2d').drawImage(sharp, 0, 0, t.width, t.height); const o = mk(W, H), c = o.getContext('2d'); c.imageSmoothingQuality = 'high'; c.drawImage(t, 0, 0, W, H); return o };
            base = mk(W, H); bctx = base.getContext('2d'); pats = [lvl(40), lvl(9), sharp].map(l => bctx.createPattern(l, 'no-repeat'));
            const r = rng(7), m = Math.min(W, H); strokes = [];
            PASS.forEach((p, k) => {
                const arr = []; for (let i = 0; i < p.n; i++) {
                    const x = r() * W, y = r() * H, a = .75 + (r() - .5) * .9, L = p.l * m * (.6 + r() * .8), bend = (r() - .5) * L * .4, mx = x + Math.cos(a) * L / 2, my = y + Math.sin(a) * L / 2;
                    arr.push({ x, y, cx: mx - Math.sin(a) * bend, cy: my + Math.cos(a) * bend, ex: x + Math.cos(a) * L, ey: y + Math.sin(a) * L, w: p.w * m * (.7 + r() * .6), k, o: y + (r() - .5) * H * .35 })
                }
                arr.sort((a, b) => a.o - b.o); strokes.push(...arr)
            }); drawn = 0
        };
        const style = (c, s) => { c.strokeStyle = pats[s.k]; c.lineWidth = s.w; c.lineCap = 'round'; c.lineJoin = 'round' };
        const pt = (s, t) => { const u = 1 - t; return [u * u * s.x + 2 * u * t * s.cx + t * t * s.ex, u * u * s.y + 2 * u * t * s.cy + t * t * s.ey] };
        const path = (c, s, f) => { c.beginPath(); c.moveTo(s.x, s.y); if (f >= 1) c.quadraticCurveTo(s.cx, s.cy, s.ex, s.ey); else for (let i = 1; i <= 10; i++) { const q = pt(s, f * i / 10); c.lineTo(q[0], q[1]) } c.stroke() };
        const idxAt = p => { let off = 0; for (const q of PASS) { if (p < q.e) return off + Math.max(0, (p - q.b) / (q.e - q.b)) * q.n; off += q.n } return off };
        const render = p => {
            if (!ready) return; const n = idxAt(p), full = Math.floor(n), f = n - full;
            if (full < drawn) { bctx.clearRect(0, 0, W, H); drawn = 0 }
            for (; drawn < full && drawn < strokes.length; drawn++) { const s = strokes[drawn]; style(bctx, s); path(bctx, s, 1) }
            ctx.clearRect(0, 0, W, H); ctx.drawImage(base, 0, 0);
            const s = strokes[full]; let on = false;
            if (s && p < 1 && p > 0) { style(ctx, s); path(ctx, s, Math.max(f, .03)); const q = pt(s, Math.max(f, .03)); tip.current.style.transform = `translate(${q[0] / dpr}px,${q[1] / dpr}px)`; on = true }
            if (p > .96) { ctx.globalAlpha = Math.min(1, (p - .96) / .04); ctx.drawImage(sharp, 0, 0); ctx.globalAlpha = 1 }
            tip.current.style.opacity = on && p < .985 ? 1 : 0
        };
        const tick = () => { raf = 0; cur += (target - cur) * .08; if (Math.abs(target - cur) < .0005) cur = target; render(cur); if (cur !== target) raf = requestAnimationFrame(tick) };
        const kick = () => { if (!raf) raf = requestAnimationFrame(tick) };
        const onScroll = () => { if (reduce) { target = 1; return kick() } const h = document.documentElement.scrollHeight - innerHeight; target = h > 0 ? Math.min(1, scrollY / h) : 0; kick() };
        img.onload = () => { build(); ready = true; onScroll(); kick() };
        let t; const onResize = () => { clearTimeout(t); t = setTimeout(() => { if (ready) { build(); render(cur) } onScroll() }, 150) };
        addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onResize);
        const ro = new ResizeObserver(onScroll); ro.observe(document.body);
        return () => { cancelAnimationFrame(raf); clearTimeout(t); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); ro.disconnect() }
    }, [src]);
    return <><canvas ref={cv} aria-hidden="true" style={{ opacity: OPACITY }} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        <span ref={tip} aria-hidden="true" style={{ opacity: 0 }} className="pointer-events-none fixed left-0 top-0 z-30 -ml-2 -mt-2 block h-4 w-4 rounded-full border border-bronze bg-bronze/25 transition-opacity duration-300" /></>
}