import { ArrowRight } from 'lucide-react';
import Page from '../components/Page.jsx';
import SectionHead from '../components/SectionHead.jsx';
import GlowCard from '../components/GlowCard.jsx';
import { artworks } from '../data/artworks.js';
import { useReveal } from '../hooks/useReveal.js';
import { IG, IG3, YT } from '../utils/constants.js';
import { getArtworkGlow } from '../utils/glowPalette.js';

export default function Studio() {
    const revealRef = useReveal();

    return (
        <Page>
            <div ref={revealRef} className="mx-auto max-w-[1560px] px-6 py-16 md:px-12 lg:px-16">

                {/* Section header staggered entrance */}
                <div data-stagger>
                    <SectionHead
                        eyebrow="The Atelier"
                        title="Crafted With Intention."
                        italicWord="Artisan Heritage"
                    >
                        Uday Arts is an independent studio of muralists and sculptural artisans dedicated to timeless temple arts, high-relief architectural carvings, and narrative mythology.
                    </SectionHead>
                </div>

                <div className="mt-14 grid gap-14 lg:grid-cols-12 items-start">

                    {/* Story Left — staggered text reveal */}
                    <div className="lg:col-span-6 space-y-6 text-sm md:text-base leading-relaxed text-[#F4F0E8]/75" data-stagger>
                        <p>
                            Founded on a reverence for Indian classical sculpture and sacred geometry, Uday Arts bridges traditional artisan techniques with contemporary architectural interiors.
                        </p>
                        <p>
                            Whether executing an immersive 20-foot mythological mural or a single meditative bas-relief portrait, our philosophy remains anchored in permanence: every piece is entirely hand-modelled, textured, and finished to withstand generations.
                        </p>
                        <p>
                            We regularly document our sculptural work-in-progress, raw clay stages, and final installations across our digital archives on Instagram and YouTube.
                        </p>

                        <div className="mt-10 border-t border-white/10 pt-8" data-reveal>
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] mb-4">Official Digital Channels</p>
                            <div data-stagger className="grid gap-3 text-sm">
                                {[
                                    [IG, 'Instagram — @udayyy_arts (Murals & Canvas)'],
                                    [IG3, 'Instagram — @udayarts_3d_carvings (3D Relics)'],
                                    [YT, 'YouTube Channel — Studio Craft Documentaries']
                                ].map(([link, label]) => (
                                    <a
                                        key={link}
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between rounded-sm border border-white/10 bg-[#141414] px-5 py-3.5 transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880] hover:-translate-x-1"
                                    >
                                        <span>{label}</span>
                                        <ArrowRight size={14} className="text-[#C5A880]" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Workshop Stills Right — each with individual clip-path reveal and optical depth */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <GlowCard glowColor={getArtworkGlow(artworks[2], 2)} className="rounded-sm" data-reveal>
                            <div
                                data-clip
                                data-parallax="0.06"
                                className="overflow-hidden rounded-sm border border-white/10 bg-[#161616]"
                            >
                                <img
                                    loading="lazy"
                                    src={artworks[2].image}
                                    alt="Uday Arts Workshop"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </GlowCard>

                        <div className="grid grid-cols-2 gap-4">
                            <GlowCard glowColor={getArtworkGlow(artworks[4], 4)} className="rounded-sm" data-reveal>
                                <div data-clip className="overflow-hidden rounded-sm border border-white/10 bg-[#161616]">
                                    <img
                                        loading="lazy"
                                        src={artworks[4].gallery[1] || artworks[4].image}
                                        alt="Carving in progress"
                                        className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </GlowCard>
                            <GlowCard glowColor={getArtworkGlow(artworks[1], 1)} className="rounded-sm" data-reveal>
                                <div data-clip-horizontal className="overflow-hidden rounded-sm border border-white/10 bg-[#161616]">
                                    <img
                                        loading="lazy"
                                        src={artworks[1].image}
                                        alt="Detailed sculpture stage"
                                        className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </GlowCard>
                        </div>
                    </div>

                </div>

            </div>
        </Page>
    );
}
