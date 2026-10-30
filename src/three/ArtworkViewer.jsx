import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, SRGBColorSpace } from 'three';
import { Suspense, useEffect, useRef } from 'react';
// Relief approximation: the photo drives displacement + bump by luminance, lit by a raking light that follows the pointer.
function Relief({ src, onReady, still }) {
    const tex = useLoader(TextureLoader, src); tex.colorSpace = SRGBColorSpace;
    const mesh = useRef(), light = useRef(); const w = 3, h = w * tex.image.height / tex.image.width;
    useEffect(() => { onReady?.() }, []);
    useFrame(({ pointer, clock }) => {
        const t = still ? 0 : Math.sin(clock.elapsedTime * .45) * .1;
        mesh.current.rotation.y += (pointer.x * .28 + t - mesh.current.rotation.y) * .06; mesh.current.rotation.x += (-pointer.y * .16 - mesh.current.rotation.x) * .06;
        light.current.position.set(pointer.x * 4, pointer.y * 3 + 1, 2.6)
    });
    return <><ambientLight intensity={.5} /><directionalLight ref={light} intensity={2.4} color="#ffe6c4" />
        <mesh ref={mesh}><planeGeometry args={[w, h, 96, 96]} /><meshStandardMaterial map={tex} displacementMap={tex} displacementScale={.16} bumpMap={tex} bumpScale={2} roughness={.9} metalness={0} /></mesh></>
}
export default function ArtworkViewer({ src, onReady }) {
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, powerPreference: 'low-power' }} className="!absolute inset-0"><Suspense fallback={null}><Relief src={src} onReady={onReady} still={still} /></Suspense></Canvas>
}