import { memo } from 'react';

/**
 * ArchitecturalLineMap
 *
 * Ultra-refined continuous architectural line-map background.
 * Inspired by architectural blueprint elevations, fine contour drawings,
 * and continuous interconnected geometric pathways.
 *
 * Annotations follow an ARCHIVE / 001 series format — sparse, champagne,
 * barely legible; they read as drawing texture not navigation labels.
 */
function ArchitecturalLineMapComponent() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080808] select-none"
        >
            {/* Subtle atmospheric vignette over dark obsidian */}
            <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-[#080808]/40 to-[#080808] z-0" />

            {/* Continuous Architectural Line Map Vector Canvas */}
            <svg
                className="absolute inset-0 w-full h-full object-cover"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="goldHorizon" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#C5A880" stopOpacity="0.06" />
                        <stop offset="25%"  stopColor="#C5A880" stopOpacity="0.18" />
                        <stop offset="50%"  stopColor="#DFCAAB" stopOpacity="0.22" />
                        <stop offset="75%"  stopColor="#C5A880" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#C5A880" stopOpacity="0.06" />
                    </linearGradient>
                    <linearGradient id="goldVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#C5A880" stopOpacity="0.06" />
                        <stop offset="35%"  stopColor="#C5A880" stopOpacity="0.19" />
                        <stop offset="70%"  stopColor="#DFCAAB" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#C5A880" stopOpacity="0.06" />
                    </linearGradient>
                    <linearGradient id="charcoalFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.04" />
                        <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.11" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
                    </linearGradient>
                </defs>

                {/* ── LAYER 1: HORIZONTAL ARTERIAL PATHS ─────────────────────── */}
                <path d="M-20 140 H 260 V 90 H 520 V 140 H 840 V 210 H 1120 V 140 H 1460 V 80 H 1740 V 140 H 1940"
                    stroke="#ffffff" strokeOpacity="0.11" strokeWidth="0.8" />

                <path d="M-20 320 H 180 V 380 H 420 V 320 H 680 V 260 H 940 V 320 H 1260 V 390 H 1520 V 320 H 1780 V 260 H 1940"
                    stroke="#C5A880" strokeOpacity="0.15" strokeWidth="0.85" />

                <path d="M-20 540 H 340 V 480 H 480 V 540 H 760 V 620 H 980 V 540 H 1180 V 470 H 1380 V 540 H 1640 V 600 H 1820 V 540 H 1940"
                    stroke="url(#goldHorizon)" strokeWidth="0.95" />

                <path d="M-20 740 H 220 V 680 H 560 V 740 H 880 V 820 H 1060 V 740 H 1320 V 670 H 1580 V 740 H 1840 V 800 H 1940"
                    stroke="#ffffff" strokeOpacity="0.11" strokeWidth="0.8" />

                <path d="M-20 920 H 160 V 960 H 440 V 920 H 720 V 860 H 1020 V 920 H 1280 V 970 H 1540 V 920 H 1760 V 870 H 1940"
                    stroke="#C5A880" strokeOpacity="0.14" strokeWidth="0.85" />

                {/* ── LAYER 2: VERTICAL CONDUITS ──────────────────────────────── */}
                <path d="M 260 90 V 480 H 340 V 540"
                    stroke="url(#charcoalFlow)" strokeWidth="0.8" />

                <path d="M 980 -20 V 210 H 940 V 540 H 1020 V 860 H 980 V 1100"
                    stroke="url(#goldVertical)" strokeWidth="0.95" />

                <path d="M 1460 80 V 320 H 1520 V 540 H 1380 V 740 H 1580 V 920"
                    stroke="#C5A880" strokeOpacity="0.15" strokeWidth="0.85" />

                {/* ── LAYER 3: DESKTOP-ONLY SECONDARY PATHS & ANNOTATIONS ─────── */}
                <g className="arch-desktop-only">
                    <path d="M 420 320 V 680 H 560" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="0.75" />
                    <path d="M 680 260 V 420 H 760 V 620 H 880 V 380 H 840 V 210" stroke="#C5A880" strokeOpacity="0.12" strokeWidth="0.8" />
                    <path d="M 1120 140 V 280 H 1180 V 470 H 1260 V 670 H 1280 V 970" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="0.75" />
                    <path d="M 1740 140 V 460 H 1640 V 600 H 1780 V 870" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="0.75" />

                    {/* Junction registration crosshairs */}
                    {[
                        [260, 90], [840, 210], [1460, 80],
                        [980, 540], [340, 540], [1640, 540], [1020, 920]
                    ].map(([cx, cy], i) => (
                        <g key={i} stroke="#C5A880" strokeOpacity="0.22" strokeWidth="0.75">
                            <line x1={cx - 3.5} y1={cy}   x2={cx + 3.5} y2={cy} />
                            <line x1={cx}       y1={cy - 3.5} x2={cx}    y2={cy + 3.5} />
                        </g>
                    ))}

                    {/* ── EDITORIAL ARCHITECTURAL ANNOTATIONS ─────────────────────
                        Format: SERIES / INDEX — reads as drawing notation.
                        4 labels max; opacity 0.20-0.26 for legibility as texture.
                        ─────────────────────────────────────────────────────────── */}

                    {/* Upper-left node: upper arterial branch */}
                    <g transform="translate(270, 76)">
                        <line x1="0" y1="0" x2="42" y2="0" stroke="#C5A880" strokeOpacity="0.18" strokeWidth="0.5" />
                        <text fontSize="5.5" fill="#C5A880" fillOpacity="0.24" fontFamily="monospace" letterSpacing="2" x="0" y="-3">
                            ARCHIVE / 001
                        </text>
                    </g>

                    {/* Upper-right node: right branch origin */}
                    <g transform="translate(1350, 72)">
                        <line x1="0" y1="0" x2="42" y2="0" stroke="#C5A880" strokeOpacity="0.18" strokeWidth="0.5" />
                        <text fontSize="5.5" fill="#C5A880" fillOpacity="0.22" fontFamily="monospace" letterSpacing="2" x="0" y="-3">
                            MATERIAL STUDY / 002
                        </text>
                    </g>

                    {/* Central axis crossing: goldVertical meets goldHorizon */}
                    <g transform="translate(992, 530)">
                        <line x1="0" y1="0" x2="38" y2="0" stroke="#DFCAAB" strokeOpacity="0.20" strokeWidth="0.5" />
                        <text fontSize="5.5" fill="#DFCAAB" fillOpacity="0.26" fontFamily="monospace" letterSpacing="2" x="0" y="-3">
                            STUDIO NOTES / 003
                        </text>
                    </g>

                    {/* Lower-right node: foundation path */}
                    <g transform="translate(1440, 728)">
                        <line x1="0" y1="0" x2="38" y2="0" stroke="#C5A880" strokeOpacity="0.16" strokeWidth="0.5" />
                        <text fontSize="5.5" fill="#C5A880" fillOpacity="0.20" fontFamily="monospace" letterSpacing="2" x="0" y="-3">
                            CRAFT SERIES / 004
                        </text>
                    </g>
                </g>

                {/* ── LAYER 4: CHAMPAGNE LIGHT PULSES (infrequent) ────────────── */}
                <path
                    d="M-20 540 H 340 V 480 H 480 V 540 H 760 V 620 H 980 V 540 H 1180 V 470 H 1380 V 540 H 1640 V 600 H 1820 V 540 H 1940"
                    stroke="#DFCAAB" strokeWidth="1.1" strokeOpacity="0.22"
                    strokeDasharray="70 1450" className="architectural-pulse-slow"
                />
                <path
                    d="M 980 -20 V 210 H 940 V 540 H 1020 V 860 H 980 V 1100"
                    stroke="#DFCAAB" strokeWidth="1.1" strokeOpacity="0.20"
                    strokeDasharray="50 1100" className="architectural-pulse-vertical"
                />
            </svg>
        </div>
    );
}

export const ArchitecturalLineMap = memo(ArchitecturalLineMapComponent);
export default ArchitecturalLineMap;
