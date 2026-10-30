import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SRC = '/video/mural.mp4', POSTER = '/video/mural-poster.jpg';

// Full-page three.js backdrop. The painting film fills the screen behind every section and PLAYS as you scroll:
// scrolling down runs the film forward at a speed that follows your scroll speed, scrolling up rewinds it.
// A cinematic dark grade, film grain, a light sweep that travels with the page, liquid ripple on fast scroll,
// and pointer parallax keep it alive even when you stop.
const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes; uniform vec2 uMouse;
uniform float uAspect, uProg, uVel, uTime, uWash, uHero;
vec2 cover(vec2 uv){
  float sa = uRes.x / uRes.y;
  vec2 s = sa > uAspect ? vec2(1.0, uAspect / sa) : vec2(sa / uAspect, 1.0);
  return (uv - 0.5) * s + 0.5;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 uv = vUv;
  float breathe = 0.012 * sin(uTime * 0.35);
  uv = (uv - 0.5) * (0.94 - 0.08 * uProg + breathe) + 0.5;                  // push-in with scroll + slow breathing
  uv += uMouse * 0.014 + vec2(sin(uTime * 0.17), cos(uTime * 0.13)) * 0.004;  // parallax + drift
  float amp = uVel * 0.014;
  uv += vec2(sin(uv.y * 16.0 + uTime * 2.2), cos(uv.x * 12.0 + uTime * 1.7)) * amp;   // liquid ripple on fast scroll
  float ca = uVel * 0.007;
  vec3 col = vec3(
    texture2D(uTex, cover(uv + vec2(ca, 0.0))).r,
    texture2D(uTex, cover(uv)).g,
    texture2D(uTex, cover(uv - vec2(ca, 0.0))).b);

  // cinematic grade: warm highlights, deeper mids
  col = pow(col, vec3(1.08)) * vec3(1.06, 1.0, 0.92);
  // bronze light sweep travelling diagonally as the page scrolls
  float band = (vUv.x * 0.7 + vUv.y * 0.5) - (0.1 + uProg * 1.3);
  col += vec3(0.62, 0.48, 0.3) * 0.16 * exp(-band * band * 18.0);

  // dark veil: heavy on the left in the hero, even once you scroll into the content
  vec3 ink = vec3(0.035, 0.03, 0.026);
  float left = (1.0 - smoothstep(0.0, 0.78, vUv.x)) * 0.8 * uHero;
  float edge = smoothstep(0.84, 1.0, vUv.y) * 0.55 + (1.0 - smoothstep(0.0, 0.18, vUv.y)) * 0.4;
  float vig = smoothstep(0.35, 1.2, length(vUv - 0.5)) * 0.45;
  col = mix(col, ink, clamp(max(uWash, left) + edge + vig, 0.0, 0.94));

  col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.045;                    // film grain
  gl_FragColor = vec4(col, 1.0);
}`;

export default function PaintingScene() {
    const host = useRef(), pct = useRef(), fill = useRef();
    useEffect(() => {
        const box = host.current;
        const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
        let renderer;
        try { renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }) }
        catch { box.style.cssText += `;background:linear-gradient(#0b0a09e6,#0b0a09e6),url(${POSTER}) center/cover`; return }
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
        box.appendChild(renderer.domElement);
        renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

        const U = {
            uTex: { value: null }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2() },
            uAspect: { value: 16 / 9 }, uProg: { value: 0 }, uVel: { value: 0 }, uTime: { value: 0 }, uWash: { value: 0 }, uHero: { value: 1 }
        };
        const scene = new THREE.Scene(), cam = new THREE.Camera();
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: U, depthTest: false, depthWrite: false })));

        let dirty = true, vtex, vReady = false;
        const ptex = new THREE.TextureLoader().load(POSTER, t => { if (!vReady) { U.uTex.value = t; U.uAspect.value = t.image.width / t.image.height; dirty = true } });
        const v = document.createElement('video');
        v.muted = v.defaultMuted = true; v.playsInline = true; v.preload = 'auto'; v.setAttribute('playsinline', ''); v.src = SRC;
        const onLoaded = () => {
            if (vReady || v.readyState < 2) return; vReady = true;
            vtex = new THREE.VideoTexture(v); vtex.minFilter = THREE.LinearFilter; vtex.generateMipmaps = false;
            U.uTex.value = vtex; U.uAspect.value = v.videoWidth / v.videoHeight || 16 / 9;
            v.play().then(() => v.pause()).catch(() => { }); dirty = true
        };
        v.addEventListener('loadeddata', onLoaded); v.addEventListener('canplay', onLoaded); v.addEventListener('seeked', () => { dirty = true });
        v.load();

        const size = () => { renderer.setSize(innerWidth, innerHeight, false); U.uRes.value.set(innerWidth, innerHeight); dirty = true };
        let target = 0, cur = 0, vel = 0, last = 0, raf = 0, mx = 0, my = 0, tx = 0, ty = 0, time = 0;
        const calc = () => {
            const h = document.documentElement.scrollHeight - innerHeight;
            target = reduce ? .95 : h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
            const k = Math.min(1, scrollY / (innerHeight * .8));
            U.uWash.value = k * k * (3 - 2 * k) * .55; U.uHero.value = 1 - k; dirty = true
        };
        const onMove = e => { tx = e.clientX / innerWidth - .5; ty = .5 - e.clientY / innerHeight };
        const frame = now => {
            raf = requestAnimationFrame(frame);
            const dt = Math.min(.05, (now - last) / 1000 || .016); last = now;
            const prev = cur; cur += (target - cur) * (1 - Math.pow(.002, dt));
            vel += (Math.min(1, Math.abs(cur - prev) / dt * 2.5) - vel) * .12;
            mx += (tx - mx) * .06; my += (ty - my) * .06;

            if (vReady && v.duration) {
                // real playback follows the scroll: forward = play at a speed that catches up, back = rewind, far = jump
                const t = cur * (v.duration - .05), d = t - v.currentTime;
                if (Math.abs(d) > .6) { if (!v.seeking) { if (!v.paused) v.pause(); v.currentTime = t } }
                else if (d > .08 || (!v.paused && d > .015)) { v.playbackRate = Math.min(6, Math.max(.25, d * 5)); if (v.paused) v.play().catch(() => { }) }
                else { if (!v.paused) v.pause(); if (d < -.03 && !v.seeking) v.currentTime = t }
            }
            if (reduce && !dirty) return;
            if (!reduce) time += dt;
            U.uTime.value = time; U.uProg.value = cur; U.uVel.value = vel; U.uMouse.value.set(mx, my);
            if (vtex && v.readyState >= 2) vtex.needsUpdate = true;
            renderer.render(scene, cam); dirty = false;
            if (pct.current) { pct.current.textContent = String(Math.round(cur * 100)).padStart(2, '0'); fill.current.style.transform = `scaleY(${cur})` }
        };
        size(); calc(); raf = requestAnimationFrame(frame);
        addEventListener('resize', size); addEventListener('scroll', calc, { passive: true }); addEventListener('pointermove', onMove, { passive: true });
        const ro = new ResizeObserver(calc); ro.observe(document.body);
        return () => {
            cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('resize', size); removeEventListener('scroll', calc); removeEventListener('pointermove', onMove);
            v.pause(); v.removeAttribute('src'); v.load(); vtex?.dispose(); ptex.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
        }
    }, []);
    return <>
        <div ref={host} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[#0b0a09]" />
        <div aria-hidden="true" className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-8">
            <span ref={pct} className="font-serif text-lg tabular-nums text-ivory/90">00</span>
            <div className="h-40 w-px bg-white/20"><div ref={fill} className="h-full w-full origin-top scale-y-0 bg-bronze" /></div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/60 [writing-mode:vertical-rl]">Painted</span>
        </div></>
}