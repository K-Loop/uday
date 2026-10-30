import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artworks, price } from './data/artworks.js';
gsap.registerPlugin(ScrollTrigger);

// Product-landing style showcase (like the mango / chocolate / cake-jar video), one "product" per artwork:
//  - the page colour is taken from the artwork itself and tweens when you switch
//  - a GIANT word (the title's first word) sits BEHIND the artwork, which floats in front of it
//  - the artwork bobs, and tilts in 3D following the mouse; small crops of the same artwork orbit around it with depth parallax
//  - switching: artwork flies out, word slides away, bits scatter, colour changes, next one flies in (swinging + spinning)
// Scroll (pinned + snapping), the thumbnails, or the arrow keys all switch artwork. Rendering is three.js, motion is GSAP.
const HVERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const HFRAG = `
precision highp float; varying vec2 vUv;
uniform sampler2D uTex; uniform vec2 uSize, uLight; uniform float uOp;
float rr(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){
  vec2 b = uSize * 0.5, p = (vUv - 0.5) * uSize; float a = 1.0 - smoothstep(-1.5, 0.5, rr(p, b, 14.0));
  vec3 col = texture2D(uTex, vUv).rgb;
  col += vec3(1.0, 0.94, 0.82) * 0.2 * smoothstep(0.65, 0.0, length(vUv - uLight));       // moving sheen
  col *= 0.9 + 0.1 * smoothstep(0.0, 0.5, 1.0 - length((vUv - 0.5) * 1.2));
  gl_FragColor = vec4(col, a * uOp);
}`;
const BFRAG = `
precision highp float; varying vec2 vUv; uniform sampler2D uTex; uniform vec2 uOff; uniform float uCrop, uOp;
void main(){
  float d = length(vUv - 0.5); float a = 1.0 - smoothstep(0.44, 0.5, d);
  vec3 col = texture2D(uTex, uOff + vUv * uCrop).rgb * (1.0 - 0.45 * smoothstep(0.1, 0.5, d)); col += vec3(1.0, 0.95, 0.85) * 0.18 * smoothstep(0.5, 0.0, length(vUv - vec2(0.35, 0.68)));
  gl_FragColor = vec4(col, a * uOp);
}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const hsl2rgb = (h, s, l) => { const a = s * Math.min(l, 1 - l), f = n => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)) }; return [f(0) * 255, f(8) * 255, f(4) * 255] };
// dominant, saturated colour of an artwork -> [dark rgb, light rgb]
const theme = img => {
    const c = document.createElement('canvas'); c.width = c.height = 24; const x = c.getContext('2d'); x.drawImage(img, 0, 0, 24, 24); const d = x.getImageData(0, 0, 24, 24).data; let r = 0, g = 0, b = 0, w = 0;
    for (let i = 0; i < d.length; i += 4) { const s = Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) + 25; r += d[i] * s; g += d[i + 1] * s; b += d[i + 2] * s; w += s }
    r /= w * 255; g /= w * 255; b /= w * 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0; const dl = mx - mn;
    if (dl) h = mx === r ? ((g - b) / dl) % 6 : mx === g ? (b - r) / dl + 2 : (r - g) / dl + 4; h = (h * 60 + 360) % 360;
    const s = clamp(dl / (1 - Math.abs(mx + mn - 1) + .001) * 1.3, .35, .85); return [hsl2rgb(h, s, .24), hsl2rgb(h, s, .44)]
};
const wordOf = a => (a.title.split(/[\s,&]+/)[0] || a.title).replace(/[^\p{L}\p{N}]/gu, '').toUpperCase();
const DEF = [[38, 34, 30], [82, 72, 60]];

export default function ProductShowcase({ list = artworks }) {
    const root = useRef(), bg = useRef(), host = useRef(), word = useRef(), span = useRef(), info = useRef(), st = useRef();
    const [active, setActive] = useState(0), n = list.length;
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;

    // fit the giant word to the screen width every time it changes
    useLayoutEffect(() => {
        if (reduce || !span.current) return; const W = root.current.clientWidth, H = root.current.clientHeight, el = word.current;
        el.style.fontSize = '100px'; const w = span.current.offsetWidth || 1; el.style.fontSize = Math.min(100 * W * (W < 900 ? .98 : 1.02) / w, H * .52) + 'px'
    }, [active, reduce]);

    useEffect(() => {
        if (reduce) return; const box = host.current; let renderer;
        try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }) } catch { return }
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        const cv = renderer.domElement; cv.style.cssText = 'width:100%;height:100%;display:block'; box.appendChild(cv);
        const DIST = 1200, cam = new THREE.PerspectiveCamera(30, 1, 10, 5000), scene = new THREE.Scene(), loader = new THREE.TextureLoader(), geo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const size = () => { const W = box.clientWidth, H = box.clientHeight; renderer.setSize(W, H, false); cam.aspect = W / H; cam.fov = 2 * Math.atan(H / 2 / DIST) * 180 / Math.PI; cam.position.set(0, 0, DIST); cam.updateProjectionMatrix() };
        size(); addEventListener('resize', size);

        // textures + themes
        const items = list.map(() => ({ tex: null, asp: 1, th: DEF }));
        list.forEach((a, k) => loader.load(a.image, t => { items[k].tex = t; items[k].asp = t.image.width / t.image.height; items[k].th = theme(t.image); if (k === shown) { applyHero(k); paint(items[k].th) } }));

        // shadow, hero, bits
        const sc = document.createElement('canvas'); sc.width = sc.height = 128; const g2 = sc.getContext('2d'), gr = g2.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(0,0,0,.7)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g2.fillStyle = gr; g2.fillRect(0, 0, 128, 128);
        const shadow = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false })); scene.add(shadow);
        const hm = new THREE.ShaderMaterial({ vertexShader: HVERT, fragmentShader: HFRAG, transparent: true, side: THREE.DoubleSide, depthWrite: false, uniforms: { uTex: { value: null }, uSize: { value: new THREE.Vector2(1, 1) }, uLight: { value: new THREE.Vector2(.3, .7) }, uOp: { value: 0 } } });
        const hero = new THREE.Mesh(geo, hm); hero.renderOrder = 5; scene.add(hero);
        const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(11);
        const bits = Array.from({ length: 9 }, (_, i) => {
            const m = new THREE.ShaderMaterial({ vertexShader: HVERT, fragmentShader: BFRAG, transparent: true, depthWrite: false, uniforms: { uTex: { value: null }, uOff: { value: new THREE.Vector2() }, uCrop: { value: .2 }, uOp: { value: 0 } } });
            const mesh = new THREE.Mesh(geo, m), ang = i / 9 * Math.PI * 2 + .35, z = -140 + rnd() * 420; mesh.renderOrder = z > 120 ? 8 : 2; scene.add(mesh);
            return { mesh, m, ang, rx: .30 + rnd() * .14, ry: .28 + rnd() * .12, z, sz: 46 + rnd() * 70, ph: rnd() * 6, sp: .4 + rnd() * .5, s: 1 }
        });
        const S = { x: 0, rz: 0, ry: 0, op: 0 }; let shown = 0, want = 0, busy = false, fly = 1, tx = 0, ty = 0, mx = 0, my = 0, time = 0, last = 0, raf = 0;
        const col = { a: [...DEF[0]], b: [...DEF[1]] };
        const paint = th => { th = th || DEF; if (!bg.current) return; gsap.to(col.a, { endArray: th[0], duration: 1.1, ease: 'power2.inOut', overwrite: true }); gsap.to(col.b, { endArray: th[1], duration: 1.1, ease: 'power2.inOut', overwrite: false }) };
        const paintNow = () => { if (bg.current) bg.current.style.background = `radial-gradient(circle at 50% 58%, rgb(${col.b.map(Math.round)}), rgb(${col.a.map(Math.round)}) 78%)` };
        function applyHero(k) {
            const it = items[k]; if (!it.tex) return; hm.uniforms.uTex.value = it.tex;
            bits.forEach((b, i) => { b.m.uniforms.uTex.value = it.tex; b.m.uniforms.uOff.value.set(.05 + ((k * 7 + i * 13) % 60) / 100, .05 + ((k * 11 + i * 17) % 60) / 100); b.m.uniforms.uCrop.value = .14 + (i % 3) * .05 })
        }
        applyHero(0); paint(items[0].th); paintNow();

        const go = to => {
            busy = true; const dir = to > shown ? 1 : -1, W = box.clientWidth, tl = gsap.timeline({ onComplete() { busy = false; if (want !== shown) go(want) } });
            tl.to(S, { x: -dir * W * .9, rz: -dir * .5, ry: dir * .9, duration: .55, ease: 'power3.in' }, 0)
                .call(() => { fly = -dir }, null, 0)
                .to(bits, { s: 1, duration: .5, stagger: .03, ease: 'power2.in' }, 0)
                .to(word.current, { x: -dir * W * 1.15, duration: .55, ease: 'power3.in' }, 0)
                .to(info.current, { opacity: 0, y: 16, duration: .3 }, 0)
                .call(() => {
                    shown = to; flushSync(() => setActive(to)); applyHero(to); paint(items[to].th); fly = dir;
                    S.x = dir * W * .9; S.rz = dir * .5; S.ry = -dir * .9; gsap.set(word.current, { x: dir * W * 1.15 })
                }, null, .56)
                .to(S, { x: 0, rz: 0, ry: 0, duration: 1.05, ease: 'power3.out' }, .6)
                .to(bits, { s: 0, duration: 1.1, stagger: .05, ease: 'back.out(1.3)' }, .62)
                .to(word.current, { x: 0, duration: .95, ease: 'power3.out' }, .6)
                .fromTo(info.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, .95)
        };
        const request = i => { want = clamp(i, 0, n - 1); if (!busy && want !== shown) go(want) };
        // intro: everything flies in once
        S.x = box.clientWidth * .9; S.rz = .5; S.ry = -.9; gsap.set(word.current, { x: box.clientWidth * 1.15 }); fly = 1;
        gsap.timeline({ delay: .2 }).to(S, { x: 0, rz: 0, ry: 0, duration: 1.2, ease: 'power3.out' }, 0).to(bits, { s: 0, duration: 1.2, stagger: .05, ease: 'back.out(1.3)' }, .1).to(word.current, { x: 0, duration: 1, ease: 'power3.out' }, 0).fromTo(info.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, .6);

        // scroll: pinned + snapping, progress picks the artwork
        const ctx = gsap.context(() => {
            st.current = ScrollTrigger.create({
                trigger: root.current, start: 'top top', end: `+=${Math.max(1, n - 1) * 90}%`, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
                snap: n > 1 ? { snapTo: 1 / (n - 1), duration: { min: .2, max: .5 }, delay: .08, ease: 'power1.inOut' } : false,
                onUpdate: s => request(Math.round(s.progress * (n - 1)))
            })
        }, root);
        const onKey = e => { if (e.key === 'ArrowRight') request(want + 1); if (e.key === 'ArrowLeft') request(want - 1) };
        const onMove = e => { tx = e.clientX / innerWidth - .5; ty = .5 - e.clientY / innerHeight };
        addEventListener('keydown', onKey); addEventListener('pointermove', onMove, { passive: true });
        root.current.__go = i => { const s = st.current; if (s) scrollTo({ top: s.start + i / Math.max(1, n - 1) * (s.end - s.start), behavior: 'smooth' }); else request(i) };

        const frame = now => {
            raf = requestAnimationFrame(frame); const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; time += dt; mx += (tx - mx) * .07; my += (ty - my) * .07;
            paintNow(); const W = box.clientWidth, H = box.clientHeight, mob = W < 900, it = items[shown];
            if (!it.tex) { hero.visible = shadow.visible = false } else {
                let ph = mob ? H * .4 : Math.min(H * .66, 700), pw = ph * it.asp; const maxW = W * (mob ? .72 : .34); if (pw > maxW) { pw = maxW; ph = pw / it.asp }
                const bob = Math.sin(time * 1.1) * 10, cy = mob ? H * .08 : H * .02;
                hero.visible = shadow.visible = true; hero.scale.set(pw, ph, 1); hm.uniforms.uSize.value.set(pw, ph); hm.uniforms.uOp.value = 1; hm.uniforms.uLight.value.set(.5 + mx * .9, .5 + my * .9);
                hero.position.set(S.x + mx * 22, cy + bob + my * 14, 40); hero.rotation.set(-my * .3, S.ry + mx * .38, S.rz + Math.sin(time * .8) * .035);
                shadow.scale.set(pw * .95, 70 - bob * 1.2, 1); shadow.position.set(S.x * .98 + mx * 10, cy - ph / 2 - 34, 0); shadow.material.opacity = clamp(1 - Math.abs(S.x) / (W * .4), 0, 1) * .8
            }
            bits.forEach(b => {
                const ax = Math.cos(b.ang + Math.sin(time * b.sp * .6 + b.ph) * .12) * b.rx * W * (mob ? .9 : 1), ay = Math.sin(b.ang + Math.cos(time * b.sp * .5 + b.ph) * .1) * b.ry * H, par = b.z / 300;
                b.mesh.position.set(ax + mx * 70 * par + fly * b.s * W * .95, ay + my * 50 * par + Math.sin(time * b.sp + b.ph) * 14 + (mob ? H * .08 : 0), b.z);
                const sz = b.sz * (mob ? .7 : 1); b.mesh.scale.set(sz, sz, 1); b.mesh.rotation.z = time * b.sp * .5 + b.ph; b.m.uniforms.uOp.value = items[shown].tex ? clamp(1 - b.s * .6, 0, 1) : 0
            });
            renderer.render(scene, cam)
        };
        raf = requestAnimationFrame(frame);
        return () => { cancelAnimationFrame(raf); ctx.revert(); gsap.killTweensOf([S, bits, col.a, col.b]); removeEventListener('resize', size); removeEventListener('keydown', onKey); removeEventListener('pointermove', onMove); items.forEach(i => i.tex?.dispose()); geo.dispose(); hm.dispose(); renderer.dispose(); renderer.forceContextLoss(); cv.remove() }
    }, [n, reduce]);

    const a = list[active];
    if (reduce) return <section className="bg-[#0e0d0b] px-5 py-20 text-ivory md:px-10">{list.map(x => <article key={x.slug} className="mx-auto mb-24 grid max-w-6xl gap-10 lg:grid-cols-2"><img src={x.image} alt={x.title} className="aspect-[4/5] w-full object-cover" /><div><h3 className="font-serif text-4xl">{x.title}</h3><p className="mt-3 text-ivory/75">{x.fullDescription}</p><Link to={`/collections/${x.slug}`} className="mt-6 inline-block border border-ivory/40 px-6 py-3 text-xs uppercase tracking-[0.2em]">View Artwork</Link></div></article>)}</section>;

    return <section ref={root} aria-label="Artwork showcase" className="relative h-svh overflow-hidden text-white">
        <div ref={bg} aria-hidden className="absolute inset-0" style={{ background: '#26221e' }} />
        {/* giant word BEHIND the artwork */}
        <h2 ref={word} aria-hidden className="pointer-events-none absolute inset-x-0 top-[40%] -translate-y-1/2 whitespace-nowrap text-center font-sans font-extrabold leading-none tracking-[-0.04em]"><span ref={span} className="inline-block">{wordOf(a)}</span></h2>
        <div ref={host} aria-hidden className="pointer-events-none absolute inset-0 z-10" />
        {/* name + details (left) */}
        <div ref={info} className="absolute bottom-24 left-5 z-20 max-w-[16rem] md:bottom-16 md:left-10 md:max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">{a.category}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{a.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">{a.shortDescription}</p>
            <Link to={`/collections/${a.slug}`} className="mt-5 inline-flex rounded-full bg-white px-7 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-80">View Artwork</Link>
        </div>
        {/* price (centre) */}
        <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-serif text-2xl md:bottom-14 md:text-3xl">{price(a)}</p>
        {/* thumbnails (right) */}
        <div className="absolute bottom-5 right-4 z-20 flex max-w-[55vw] gap-2 overflow-x-auto md:bottom-12 md:right-10 md:max-w-none" role="group" aria-label="Choose artwork">
            {list.map((x, i) => <button key={x.slug} onClick={() => root.current.__go?.(i)} aria-label={`Show ${x.title}`} aria-current={i === active} className={`h-12 w-10 shrink-0 overflow-hidden rounded-md border-2 transition md:h-14 md:w-12 ${i === active ? 'border-white' : 'border-transparent opacity-55 hover:opacity-100'}`}><img src={x.image} alt="" className="h-full w-full object-cover" /></button>)}
        </div>
        <p aria-hidden className="absolute right-5 top-24 z-20 text-[10px] uppercase tracking-[0.25em] text-white/70 md:right-10">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
    </section>
}