import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Page from '../components/Page.jsx';
import SectionHead from '../components/SectionHead.jsx';
import GlowCard from '../components/GlowCard.jsx';
import { artworks, WHATSAPP } from '../data/artworks.js';
import { getArtworkGlow } from '../utils/glowPalette.js';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const artworkSlug = searchParams.get('artwork') || searchParams.get('similar');
    const referencedArtwork = artworks.find((x) => x.slug === artworkSlug);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        type: referencedArtwork ? referencedArtwork.category : '3D Wall Carving',
        property: 'Private Residence / Villa',
        size: referencedArtwork ? referencedArtwork.dimensions : '',
        budget: '',
        location: '',
        msg: referencedArtwork ? `I am interested in commissioning an artwork inspired by "${referencedArtwork.title}".` : '',
        consent: false
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const updateField = (k) => (e) =>
        setForm({
            ...form,
            [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!form.name.trim()) errs.name = 'Please provide your name';
        if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required';
        if (form.phone.replace(/\D/g, '').length < 8) errs.phone = 'Valid phone / WhatsApp number required';
        if (!form.location.trim()) errs.location = 'City or project location required';
        if (form.msg.trim().length < 8) errs.msg = 'Please provide brief details of your request';
        if (!form.consent) errs.consent = 'Consent is required to submit';

        setErrors(errs);
        if (Object.keys(errs).length) return;

        const messageLines = [
            `✦ *UDAY ARTS COMMISSION ENQUIRY* ✦`,
            `• Name: ${form.name}`,
            `• Email: ${form.email}`,
            `• Phone: ${form.phone}`,
            `• Discipline: ${form.type}`,
            `• Space / Property: ${form.property}`,
            form.size && `• Approx Dimensions: ${form.size}`,
            form.budget && `• Budget Range: ${form.budget}`,
            `• Location: ${form.location}`,
            referencedArtwork && `• Referenced Artwork: ${referencedArtwork.title} (${window.location.origin}/collections/${referencedArtwork.slug})`,
            `• Project Details: ${form.msg}`
        ]
            .filter(Boolean)
            .join('\n');

        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(messageLines)}`, '_blank', 'noopener');
        setSubmitted(true);
    };

    return (
        <Page>
            <div className="mx-auto max-w-[1560px] px-6 py-16 md:px-12 lg:px-16">
                
                <div className="grid gap-14 lg:grid-cols-12 items-start">
                    
                    {/* Left Column: Information */}
                    <div className="lg:col-span-5">
                        <SectionHead
                            eyebrow="Bespoke Commissions"
                            title="Begin a Bespoke Work."
                            italicWord="Direct Studio Inquiry"
                        >
                            We accept commissions for private residences, luxury hospitality, sacred sanctums, and commercial spaces worldwide.
                        </SectionHead>

                        {referencedArtwork && (
                            <GlowCard
                                glowColor={getArtworkGlow(referencedArtwork)}
                                className="mt-8 rounded-sm border border-[#C5A880]/40 bg-[#161616]/90 p-4 flex items-center gap-4"
                            >
                                <img
                                    src={referencedArtwork.image}
                                    alt=""
                                    className="h-16 w-14 rounded-sm object-cover"
                                />
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">Enquiring About</p>
                                    <p className="font-serif text-lg text-[#F4F0E8]">{referencedArtwork.title}</p>
                                    <p className="text-xs text-[#F4F0E8]/50">{referencedArtwork.category}</p>
                                </div>
                            </GlowCard>
                        )}

                        <div className="mt-8 space-y-4 text-xs leading-relaxed text-[#F4F0E8]/60 border-t border-white/10 pt-6">
                            <p>
                                <span className="text-[#C5A880] font-medium">WhatsApp Direct Dispatch:</span> Submitting this form prepares your specifications directly into an official WhatsApp communication with our lead artisan.
                            </p>
                            <p>
                                You can attach architectural floor plans, reference photographs, and wall dimensions directly within the chat.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Luxury Dark Form */}
                    <div className="lg:col-span-7 luxury-card rounded-sm p-8 sm:p-12 bg-[#121212]/85 backdrop-blur-[2px]">
                        <form onSubmit={handleSubmit} noValidate className="grid gap-7 sm:grid-cols-2">
                            
                            {/* Name */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={updateField('name')}
                                    placeholder="Your Name"
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={updateField('email')}
                                    placeholder="email@example.com"
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                            </div>

                            {/* Phone / WhatsApp */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Phone / WhatsApp Number *
                                </label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={updateField('phone')}
                                    placeholder="+91 ..."
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                            </div>

                            {/* Project Type */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Discipline
                                </label>
                                <select
                                    value={form.type}
                                    onChange={updateField('type')}
                                    className="mt-2 w-full border-b border-white/20 bg-[#141414] py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                >
                                    <option>3D Wall Carving</option>
                                    <option>Mythological Mural</option>
                                    <option>Temple Architectural Art</option>
                                    <option>Decorative Botanical Panel</option>
                                    <option>Sculptural Bust / Icon</option>
                                    <option>Custom Architectural Commission</option>
                                </select>
                            </div>

                            {/* Property */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Property Type
                                </label>
                                <input
                                    type="text"
                                    value={form.property}
                                    onChange={updateField('property')}
                                    placeholder="Villa, Penthouse, Temple, Hotel..."
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Project Location (City / State) *
                                </label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={updateField('location')}
                                    placeholder="e.g. Bangalore, Mumbai, Dubai..."
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                                {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location}</p>}
                            </div>

                            {/* Dimensions */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Approximate Dimensions
                                </label>
                                <input
                                    type="text"
                                    value={form.size}
                                    onChange={updateField('size')}
                                    placeholder="e.g. 10 ft × 6 ft"
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Target Budget (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={form.budget}
                                    onChange={updateField('budget')}
                                    placeholder="Optional budget indication"
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                            </div>

                            {/* Project Description */}
                            <div className="sm:col-span-2">
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                                    Project Vision & Architectural Details *
                                </label>
                                <textarea
                                    rows={4}
                                    value={form.msg}
                                    onChange={updateField('msg')}
                                    placeholder="Describe the wall, preferred theme, motifs, or installation environment..."
                                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-[#F4F0E8] outline-none transition-colors focus:border-[#C5A880]"
                                />
                                {errors.msg && <p className="mt-1 text-xs text-red-400">{errors.msg}</p>}
                            </div>

                            {/* Consent */}
                            <div className="sm:col-span-2">
                                <label className="flex items-start gap-3 text-xs text-[#F4F0E8]/70 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.consent}
                                        onChange={updateField('consent')}
                                        className="mt-0.5 rounded border-white/20 bg-transparent accent-[#C5A880]"
                                    />
                                    <span>
                                        I consent to Uday Arts contacting me via WhatsApp or email regarding this architectural commission enquiry.
                                    </span>
                                </label>
                                {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent}</p>}
                            </div>

                            {/* Submit */}
                            <div className="sm:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold text-[#0b0b0b] transition-all duration-300 hover:bg-[#F4F0E8] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)]"
                                >
                                    <MessageCircle size={16} />
                                    Send via Official WhatsApp
                                </button>

                                {submitted && (
                                    <p className="mt-4 text-xs text-[#C5A880]">
                                        WhatsApp opened in a new tab. Press send there to transmit your enquiry directly to the studio.
                                    </p>
                                )}
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </Page>
    );
}

