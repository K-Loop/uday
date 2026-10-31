// Refined luxury palette: restrained ambient luminance (0.12 - 0.16 alpha)
// Subtle, elegant atmospheric tones rather than loud neon saturations.
export const ART_GLOW_MAP = {
    0: 'rgba(95, 140, 180, 0.16)',    // Shiva — calm celestial slate-blue
    1: 'rgba(185, 155, 115, 0.15)',   // Architectural stone — muted champagne sandstone
    2: 'rgba(195, 160, 95, 0.15)',    // Temple tower — antique bronze ochre
    3: 'rgba(155, 140, 120, 0.14)',   // Zen meditative — warm mineral stone
    4: 'rgba(205, 170, 90, 0.18)',    // Kalpavriksha — restrained 24K antique leaf
    5: 'rgba(185, 125, 95, 0.15)',    // Mythological mural — warm terracotta wash
    video: 'rgba(195, 150, 85, 0.16)', // Studio mural — golden atelier light
};

export const CATEGORY_GLOW_MAP = {
    '3D Wall Carving': 'rgba(185, 155, 115, 0.15)',
    'Murals': 'rgba(185, 125, 95, 0.15)',
    'Sculpture': 'rgba(95, 140, 180, 0.16)',
    'Temple Arts': 'rgba(195, 160, 95, 0.15)',
    'default': 'rgba(197, 168, 128, 0.15)',
};

export function getArtworkGlow(artwork, index) {
    if (typeof index === 'number' && ART_GLOW_MAP[index % 6]) {
        return ART_GLOW_MAP[index % 6];
    }
    if (artwork?.category && CATEGORY_GLOW_MAP[artwork.category]) {
        return CATEGORY_GLOW_MAP[artwork.category];
    }
    return CATEGORY_GLOW_MAP['default'];
}
