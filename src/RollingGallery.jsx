import { useEffect } from 'react';
import * as THREE from 'three';

// Every element marked  data-roll  (it must contain an <img>) is drawn by three.js instead of the browser.
// As you scroll, the photo ROLLS across the screen like a ball: it slides sideways, spins by exactly the
// distance it travels (rolling without slipping), tilts in 3D, and morphs from a flat photo into a round,
// shaded ball at the edges of the screen. In the middle of the screen it settles back to a normal photo.
// Neighbouring photos roll in opposite directions. The <img> stays in the page for accessibility and as a fallback.
const VERT = `
varying vec2 vUv; uniform vec2 uSize; uniform float uK;
void main(){
  vUv = uv; vec3 p = position;
  vec2 q = p.xy * 2.0;
  p.z += (1.0 - clamp(dot(q, q), 0.0, 1.0)) * 0.22 * min(uSize.x, uSize.y) * uK;   // dome: flat photo -> ball
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;
const FRAG = `
precision highp float;
varying vec2 vUv; uniform sampler2D uTex; uniform vec2 uSize; uniform float uK, uImgAsp, uDir;
float rr(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){
  vec2 b = uSize * 0.5, p = (vUv - 0.5) * uSize;
  float d = rr(p, b, mix(2.0, min(b.x, b.y), uK));                              // corners grow into a ball
  float a = 1.0 - smoothstep(-1.5, 0.5, d);
  float pa = uSize.x / uSize.y; vec2 s = pa > uImgAsp ? vec2(1.0, uImgAsp / pa) : vec2(pa / uImgAsp, 1.0);
  vec2 uv = (vUv - 0.5) * s + 0.5; uv.x += uDir * uK * 0.06;                  // photo slides inside the ball
  vec3 col = texture2D(uTex, uv).rgb;
  float r = length(p / b);
  col *= 1.0 - uK * 0.5 * r * r;                                                // sphere shading
  col += vec3(1.0, 0.92, 0.8) * uK * 0.22 * smoothstep(0.7, 0.0, length(vUv - vec2(0.34, 0.7)));   // soft highlight
  gl_FragColor = vec4(col * a, a);
}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) };

export default function RollingGallery() {
    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
        let renderer; try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' }) } catch { return }
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)); renderer.setClearColor(0x000000, 0);
        const cv = renderer.domElement; cv.setAttribute('aria-hidden', 'true');
        cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-5;pointer-events:none';
        document.body.appendChild(cv);

        const DIST = 1200, scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 10, 5000), loader = new THREE.TextureLoader();
        const size = () => { const W = innerWidth, H = innerHeight; renderer.setSize(W, H, false); cam.aspect = W / H; cam.fov = 2 * Math.atan(H / 2 / DIST) * 180 / Math.PI; cam.position.set(0, 0, DIST); cam.updateProjectionMatrix() };
        size(); addEventListener('resize', size);

        const geo = new THREE.PlaneGeometry(1, 1, 28, 28), items = new Map(); let n = 0;
        const drop = it => { it.img.style.opacity = it.prev; scene.remove(it.mesh); it.mat.dispose(); it.tex?.dispose(); items.delete(it.el) };
        const scan = () => {
            document.querySelectorAll('[data-roll]').forEach(el => {
                if (items.has(el)) return; const img = el.querySelector('img'); if (!img) return;
                const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, side: THREE.DoubleSide, depthWrite: false, uniforms: { uTex: { value: null }, uSize: { value: new THREE.Vector2(1, 1) }, uK: { value: 0 }, uImgAsp: { value: 1 }, uDir: { value: 1 } } });
                const mesh = new THREE.Mesh(geo, mat); mesh.visible = false; scene.add(mesh);
                items.set(el, { el, img, mesh, mat, tex: null, t: 0, dir: n++ % 2 ? -1 : 1, loading: false, loaded: false, prev: img.style.opacity || '' })
            });
            items.forEach(it => { if (!it.el.isConnected) drop(it) })
        };
        scan(); const iv = setInterval(scan, 500);

        let raf = 0, last = 0;
        const frame = now => {
            raf = requestAnimationFrame(frame);
            const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; const W = innerWidth, H = innerHeight;
            items.forEach(it => {
                const r = it.el.getBoundingClientRect();
                if (!it.loading && r.bottom > -H && r.top < H * 2) {
                    it.loading = true;
                    loader.load(it.img.currentSrc || it.img.src, tex => { it.tex = tex; it.mat.uniforms.uTex.value = tex; it.mat.uniforms.uImgAsp.value = tex.image.width / tex.image.height; it.loaded = true; it.img.style.opacity = '0' }, undefined, () => { it.loading = false; it.failed = true })
                }
                const vis = it.loaded && r.bottom > -H * .3 && r.top < H * 1.3 && r.width > 0; it.mesh.visible = vis; if (!vis) return;
                const cy = r.top + r.height / 2, raw = clamp((cy - H / 2) / ((H + r.height) / 2), -1, 1);
                it.t += (raw - it.t) * (1 - Math.pow(.0006, dt));                       // weighty inertia
                const x = it.dir * it.t * W * .22, R = .7 * Math.min(r.width, r.height);
                it.mesh.position.set(r.left + r.width / 2 - W / 2 + x, H / 2 - cy, 0);
                it.mesh.scale.set(r.width, r.height, 1);
                it.mesh.rotation.set(it.t * .12, x / W * 1.1, clamp(-x / R, -1.7, 1.7));  // roll = distance / radius
                const u = it.mat.uniforms; u.uSize.value.set(r.width, r.height); u.uK.value = sm(.2, 1, Math.abs(it.t)) * .92; u.uDir.value = it.dir
            });
            renderer.render(scene, cam)
        };
        raf = requestAnimationFrame(frame);
        return () => { cancelAnimationFrame(raf); clearInterval(iv); removeEventListener('resize', size);[...items.values()].forEach(drop); geo.dispose(); renderer.dispose(); renderer.forceContextLoss(); cv.remove() }
    }, []);
    return null
}