import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const Viewer = lazy(() => import('./ArtworkViewer.jsx'));

const hasGL = () => {
    try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
        return false;
    }
};

export default function ViewerSlot({ src, alt }) {
    const ref = useRef();
    const [canLoad, setCanLoad] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!hasGL() || navigator.connection?.saveData) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCanLoad(true);
                    io.disconnect();
                }
            },
            { rootMargin: '200px' }
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10 bg-[#141414] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] touch-pan-y"
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    isReady ? 'opacity-0' : 'opacity-100'
                }`}
            />
            {canLoad && (
                <Suspense fallback={null}>
                    <Viewer src={src} onReady={() => setIsReady(true)} />
                </Suspense>
            )}
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-sm border border-white/10 bg-[#0b0b0b]/80 px-3 py-1.5 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#C5A880]">
                    {isReady ? 'Move cursor to angle light' : 'Interactive 3D Relief'}
                </p>
            </div>
        </div>
    );
}
