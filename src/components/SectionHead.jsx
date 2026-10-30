export default function SectionHead({ eyebrow, title, italicWord, children }) {
    return (
        <div data-reveal className="max-w-3xl">
            {eyebrow && (
                <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-6 bg-[#C5A880]" />
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A880] font-medium">
                        {eyebrow}
                    </p>
                </div>
            )}
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-[#F4F0E8]">
                {title} {italicWord && <span className="italic text-[#C5A880] font-normal">{italicWord}</span>}
            </h2>
            {children && (
                <p className="mt-4 text-sm md:text-base text-[#F4F0E8]/70 leading-relaxed">
                    {children}
                </p>
            )}
        </div>
    );
}

