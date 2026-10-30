import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { price, WHATSAPP } from './data/artworks.js';

export default function Detail({ a, list }) {
    const nav = useNavigate();
    const [i, setI] = useState(0);
    const closeBtn = useRef();

    const idx = list.findIndex(x => x.slug === a.slug);
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];

    useEffect(() => {
        setI(0);
    }, [a.slug]);

    useEffect(() => {
        const origOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeBtn.current?.focus();

        const handleKey = e => {
            if (e.key === 'Escape') nav('/collections');
            if (e.key === 'ArrowLeft') nav(`/collections/${prev.slug}`);
            if (e.key === 'ArrowRight') nav(`/collections/${next.slug}`);
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = origOverflow;
            window.removeEventListener('keydown', handleKey);
        };
    }, [prev.slug, next.slug, nav]);

    const handleWhatsAppEnquiry = () => {
        const text = encodeURIComponent(
            `Hello Uday Arts, I am enquiring about "${a.title}" (${a.category}).\nReference URL: ${window.location.origin}/collections/${a.slug}`
        );
        window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener');
    };

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={a.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#0b0b0b]/95 backdrop-blur-xl text-[#F4F0E8]"
        >
            {/* Ambient background glow from artwork */}
            <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-25">
                <img
                    src={a.image}
                    alt=""
                    className="h-full w-full scale-125 object-cover blur-[100px] saturate-150"
                />
                <div className="absolute inset-0 bg-[#0b0b0b]/80" />
            </div>

            {/* Close button */}
            <button
                ref={closeBtn}
                onClick={() => nav('/collections')}
                aria-label="Close artwork details"
                className="fixed right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#121212]/80 text-[#F4F0E8] backdrop-blur-md transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880] hover:scale-105"
            >
                <X size={18} />
            </button>

            <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] items-center gap-12 px-6 py-20 md:px-12 lg:grid-cols-[1.2fr_1fr]">
                {/* Artwork Imagery Column */}
                <div className="flex flex-col gap-4">
                    <motion.div
                        layoutId={`box-${a.slug}`}
                        className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10 bg-[#141414] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={a.gallery[i]}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                src={a.gallery[i]}
                                alt={`${a.title} - View ${i + 1}`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </AnimatePresence>

                        {/* Museum metadata tag */}
                        <div className="absolute bottom-4 left-4 rounded-sm border border-white/10 bg-[#0b0b0b]/80 px-3 py-1.5 backdrop-blur-md">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                                {a.medium} · {a.year}
                            </span>
                        </div>
                    </motion.div>

                    {/* Gallery Thumbnails */}
                    {a.gallery.length > 1 && (
                        <div className="flex gap-3" role="group" aria-label="Artwork views">
                            {a.gallery.map((imgSrc, idxNum) => (
                                <button
                                    key={imgSrc}
                                    onClick={() => setI(idxNum)}
                                    aria-label={`View ${idxNum + 1}`}
                                    aria-current={idxNum === i}
                                    className={`relative h-20 w-16 overflow-hidden rounded-sm border transition-all duration-300 ${
                                        idxNum === i
                                            ? 'border-[#C5A880] ring-1 ring-[#C5A880]/50 opacity-100'
                                            : 'border-white/15 opacity-40 hover:opacity-80'
                                    }`}
                                >
                                    <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Column */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-[#C5A880]" />
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium">
                            {a.category}
                        </p>
                    </div>

                    <h1 className="mt-4 font-serif text-4xl font-light tracking-wide text-[#F4F0E8] md:text-5xl lg:text-6xl">
                        {a.title}
                    </h1>

                    <p className="mt-4 font-serif text-2xl text-[#C5A880] italic">
                        {price(a)}
                    </p>

                    <p className="mt-6 text-sm leading-relaxed text-[#F4F0E8]/75 md:text-base">
                        {a.fullDescription}
                    </p>

                    {/* Specifications table */}
                    <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.16em]">
                        <div>
                            <dt className="text-[#F4F0E8]/40">Dimensions</dt>
                            <dd className="mt-1 normal-case tracking-normal text-sm text-[#F4F0E8]/90 font-medium">
                                {a.dimensions}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[#F4F0E8]/40">Materials & Medium</dt>
                            <dd className="mt-1 normal-case tracking-normal text-sm text-[#F4F0E8]/90 font-medium">
                                {a.materials}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[#F4F0E8]/40">Availability</dt>
                            <dd className="mt-1 normal-case tracking-normal text-sm text-[#C5A880] font-medium">
                                {a.availability}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[#F4F0E8]/40">Origin</dt>
                            <dd className="mt-1 normal-case tracking-normal text-sm text-[#F4F0E8]/90 font-medium">
                                Uday Arts Studio · Handcrafted
                            </dd>
                        </div>
                    </dl>

                    {/* Customisation options */}
                    {a.customizationOptions && (
                        <div className="mt-8 border-t border-white/10 pt-6">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium">
                                Bespoke Architectural Adaptations
                            </p>
                            <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-[#F4F0E8]/70">
                                {a.customizationOptions.map((opt) => (
                                    <li key={opt} className="flex items-start gap-2">
                                        <span className="text-[#C5A880]">•</span>
                                        <span>{opt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <button
                            onClick={handleWhatsAppEnquiry}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C5A880] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0b0b] transition-all duration-300 hover:bg-[#F4F0E8] hover:shadow-[0_0_25px_rgba(197,168,128,0.3)]"
                        >
                            <MessageCircle size={15} />
                            Enquire on WhatsApp
                        </button>
                        <Link
                            to={`/contact?artwork=${a.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-[#F4F0E8] transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                        >
                            Discuss Custom Dimensions
                        </Link>
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-[#F4F0E8]/60">
                        <Link
                            replace
                            to={`/collections/${prev.slug}`}
                            className="group flex items-center gap-2 transition-colors hover:text-[#C5A880]"
                        >
                            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                            <span>Previous: {prev.title}</span>
                        </Link>
                        <Link
                            replace
                            to={`/collections/${next.slug}`}
                            className="group flex items-center gap-2 transition-colors hover:text-[#C5A880]"
                        >
                            <span>Next: {next.title}</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
