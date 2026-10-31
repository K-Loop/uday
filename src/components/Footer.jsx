import { Link } from 'react-router-dom';
import { AtSign, Play, ArrowRight } from 'lucide-react';
import { nav, IG, IG3, YT } from '../utils/constants.js';
import { artworks } from '../data/artworks.js';

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.08] bg-[#070707] text-[#F4F0E8] overflow-hidden">
            {/* Phase 8: Memorable Grand Final Statement */}
            <div className="relative border-b border-white/[0.08] px-6 py-28 md:px-12 lg:px-16 overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-15">
                    <img
                        src={artworks[0].image}
                        alt=""
                        className="h-full w-full object-cover object-[center_35%] blur-[40px] saturate-150"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-[#070707]" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1560px] text-center">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="h-px w-8 bg-[#C5A880]" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                            An Enduring Commission
                        </span>
                        <span className="h-px w-8 bg-[#C5A880]" />
                    </div>

                    <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F4F0E8] leading-[1.04] max-w-5xl mx-auto">
                        Some Spaces Deserve More <span className="italic text-[#C5A880]">Than Decoration.</span>
                    </h2>

                    <p className="mt-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#F4F0E8]/70 font-light leading-relaxed">
                        Let's create something that becomes part of your space, your story, and your legacy.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#0b0b0b] transition-all duration-300 hover:bg-[#F4F0E8] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)]"
                        >
                            Begin a Bespoke Creation <ArrowRight size={14} />
                        </Link>
                        <Link
                            to="/collections"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-[#F4F0E8] transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                        >
                            Explore Curated Works
                        </Link>
                    </div>
                </div>
            </div>

            {/* Editorial Footer Links & Brand Bar */}
            <div className="mx-auto max-w-[1560px] px-6 py-20 md:px-12 grid gap-12 md:grid-cols-12">
                <div className="md:col-span-5">
                    <p className="font-serif text-3xl tracking-[0.2em] text-[#F4F0E8]">UDAY ARTS</p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F4F0E8]/60">
                        Bespoke hand-sculpted murals, architectural 3D wall carvings, and sacred stone reliefs crafted to belong to enduring architecture.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <span className="h-px w-6 bg-[#C5A880]" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                            India · Global Commissions
                        </span>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] mb-5">Navigation</p>
                    <nav aria-label="Footer" className="grid gap-3 text-sm">
                        {nav.map(([n, p]) => (
                            <Link key={p} to={p} className="text-[#F4F0E8]/65 transition-colors hover:text-[#C5A880]">
                                {n}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="md:col-span-4 content-start">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] mb-5">Connect & Channels</p>
                    <div className="grid gap-3 text-sm text-[#F4F0E8]/65">
                        <a className="flex items-center gap-2.5 transition-colors hover:text-[#C5A880]" href={IG} target="_blank" rel="noreferrer">
                            <AtSign size={15} className="text-[#C5A880]" />
                            <span>@udayyy_arts (Murals & Canvas)</span>
                        </a>
                        <a className="flex items-center gap-2.5 transition-colors hover:text-[#C5A880]" href={IG3} target="_blank" rel="noreferrer">
                            <AtSign size={15} className="text-[#C5A880]" />
                            <span>@udayarts_3d_carvings (Reliefs)</span>
                        </a>
                        <a className="flex items-center gap-2.5 transition-colors hover:text-[#C5A880]" href={YT} target="_blank" rel="noreferrer">
                            <Play size={15} className="text-[#C5A880]" />
                            <span>YouTube Video Archive</span>
                        </a>
                        <div className="mt-4">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#F4F0E8] transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
                            >
                                Direct Commission Enquiry <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/[0.06] py-6 px-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#F4F0E8]/40">
                © {new Date().getFullYear()} Uday Arts. All rights reserved. Architectural and spiritual sculptural commissions.
            </div>
        </footer>
    );
}
