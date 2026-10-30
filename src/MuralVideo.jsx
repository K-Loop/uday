import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SRC = '/video/mural.mp4';
const POSTER = '/video/mural-poster.jpg';

export default function MuralVideo({ mode = 'loop', className = '', pos = '50% 50%' }) {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [failed, setFailed] = useState(false);
    const manual = useRef(false);
    const inView = useRef(false);
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.muted = true;
        el.defaultMuted = true;
        el.playsInline = true;

        if (mode === 'scrub') {
            if (reduce) return;
            let st;
            const init = () => {
                st = ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    scrub: true,
                    onUpdate: (s) => {
                        const t = s.progress * el.duration * 0.999;
                        if (Math.abs(el.currentTime - t) > 0.03) el.currentTime = t;
                    }
                });
            };
            if (el.readyState >= 1) init();
            else el.addEventListener('loadedmetadata', init, { once: true });
            return () => {
                st?.kill();
                el.removeEventListener('loadedmetadata', init);
            };
        }

        const tryPlay = () => {
            if (manual.current || !inView.current || (reduce && !manual.current)) return;
            el.play().catch(() => {});
        };

        const io = new IntersectionObserver(
            ([e]) => {
                inView.current = e.isIntersecting;
                e.isIntersecting ? tryPlay() : el.pause();
            },
            { threshold: 0.1 }
        );
        io.observe(el);

        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        el.addEventListener('play', onPlay);
        el.addEventListener('pause', onPause);
        el.addEventListener('canplay', tryPlay);
        window.addEventListener('pointerdown', tryPlay, { once: true });

        return () => {
            io.disconnect();
            el.removeEventListener('play', onPlay);
            el.removeEventListener('pause', onPause);
            el.removeEventListener('canplay', tryPlay);
            window.removeEventListener('pointerdown', tryPlay);
        };
    }, [mode, reduce]);

    const toggle = () => {
        const el = videoRef.current;
        if (!el) return;
        manual.current = true;
        el.paused ? el.play().catch(() => setFailed(true)) : el.pause();
    };

    if (failed) {
        return <img src={POSTER} alt="Mural Craft" className={className} style={{ objectPosition: pos }} />;
    }

    return (
        <div className="relative h-full w-full">
            <video
                ref={videoRef}
                className={className}
                style={{ objectPosition: pos }}
                src={SRC}
                poster={POSTER}
                muted
                loop={mode === 'loop'}
                playsInline
                preload="auto"
                autoPlay={mode === 'loop' && !reduce}
                aria-hidden="true"
                tabIndex={-1}
                onError={() => setFailed(true)}
            />
            {mode === 'loop' && (
                <button
                    onClick={toggle}
                    aria-label={playing ? 'Pause video' : 'Play video'}
                    className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0b0b0b]/80 p-2 text-[#F4F0E8] backdrop-blur transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                >
                    {playing ? <Pause size={14} /> : <Play size={14} />}
                </button>
            )}
        </div>
    );
}
